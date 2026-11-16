---
sidebar_label: "Examples"
---

# Authentication Examples

This document provides complete examples for implementing authentication in MangoJS.

---

## Controller Usage

### Accessing Auth Context

```typescript
import { Request, IAuthContext } from "@mangojs/core";

@Controller("/api/users")
class UserController {
  @Get("/profile")
  async getProfile(req: Request & { authContext: IAuthContext }) {
    if (!req.authContext.isAuthenticated) {
      throw new UnauthorizedError("Authentication required");
    }

    return {
      id: req.authContext.user.id,
      email: req.authContext.user.email,
      type: req.authContext.user.userType,
    };
  }
}
```

### Using Authorization Decorators

```typescript
@Controller("/api/users")
class UserController {
  @Get("/admin-data")
  @HasUserType(["ADMIN"])
  async getAdminData(req: Request) {
    // Only accessible by ADMIN users
  }

  @Delete("/:id")
  @HasPermission("users:delete")
  async deleteUser(req: Request) {
    // Only accessible by users with 'users:delete' permission
  }

  @Get("/team-data")
  @HasGroups(["managers", "team-leads"])
  async getTeamData(req: Request) {
    // Only accessible by users in specified groups
  }
}
```

---

## Token Generation

### Login Controller

```typescript
@Controller("/auth")
class AuthController {
  constructor(
    @inject(INVERSITY_TYPES.AuthStrategyRegistry)
    private authRegistry: AuthStrategyRegistry,
  ) {}

  @Post("/login")
  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    // Validate credentials
    const user = await this.userService.validateCredentials(email, password);
    if (!user) {
      throw new UnauthorizedError("Invalid credentials");
    }

    // Generate token using JWT strategy
    const credentials = await this.authRegistry.generateCredentials("jwt", {
      id: user.id,
      userType: user.role,
      email: user.email,
      permissions: user.permissions,
    });

    // Set cookie if configured
    if (credentials.cookie) {
      res.cookie(
        credentials.cookie.name,
        credentials.cookie.value,
        credentials.cookie.options,
      );
    }

    return {
      accessToken: credentials.accessToken,
      expiresIn: credentials.expiresIn,
    };
  }
}
```

---

## Complete Setup Example

### Container Configuration

```typescript
// inversify.config.ts
import { Container } from "inversify";
import { Auth, INVERSITY_TYPES } from "@mangojs/core";

const container = new Container();

// JWT Strategy
container.bind(Auth.AUTH_STRATEGY_TAG).toConstantValue(
  new Auth.JWTStrategy({
    secret: process.env.JWT_SECRET,
    expiresIn: 3600,
    extractFrom: "header",
  }),
);

// API Key Strategy
container.bind(Auth.AUTH_STRATEGY_TAG).toConstantValue(
  new Auth.ApiKeyStrategy({
    headerName: "X-API-Key",
    validator: async (apiKey) => {
      const client = await db.apiClients.findByKey(apiKey);
      if (!client) return null;
      return {
        id: client.id,
        userType: "API_CLIENT",
        permissions: client.scopes,
      };
    },
  }),
);

// Bind registry
container
  .bind(INVERSITY_TYPES.AuthStrategyRegistry)
  .to(Auth.AuthStrategyRegistry)
  .inSingletonScope();

export { container };
```

### Server Setup

```typescript
// server.ts
import { ServerBuilder } from "@mangojs/core";
import { middlewareAuthContext } from "@mangojs/core";

const server = new ServerBuilder()
  .useContainer(container)
  .useMiddleware(middlewareAuthContext)
  .build();

server.listen(3000);
```

---

## Development Checklist

- [ ] Define user types as string constants (not enum)
- [ ] Create strategy class extending `BaseAuthStrategy`
- [ ] Set appropriate priority (lower = checked first)
- [ ] Implement `canHandle()` for early filtering
- [ ] Bind strategy to `AUTH_STRATEGY_TAG`
- [ ] Bind `AuthStrategyRegistry` to container
- [ ] Use `middlewareAuthContext` in server setup
- [ ] Access user via `req.authContext` in controllers
- [ ] Use decorators for authorization checks

## Related

- [Architecture](./architecture.context.md) - System overview
- [Strategies](./strategies.context.md) - Strategy configuration
- [Types](./types.context.md) - Type definitions
- [Decorators](../architecture/decorators.context.md) - `@HasUserType`, `@HasGroups`, `@RequiresAccess`
