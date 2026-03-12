# MangoJS Authentication & Authorization

## Purpose

Provide a flexible, strategy-based authentication system that allows developers to:
- Register custom authentication strategies via dependency injection
- Support multiple authentication methods simultaneously (JWT, API keys, sessions, OAuth)
- Use extensible user types (not limited to hardcoded enum values)
- Generate and validate tokens through a unified API

## Key Concepts

- **IAuthStrategy**: Interface for authentication mechanisms (JWT, API key, session, etc.)
- **AuthStrategyRegistry**: Collects all strategies via `@multiInject` and orchestrates authentication
- **AuthContext**: Immutable context attached to `req.authContext` with helper methods
- **IAuthUser**: Flexible user interface with extensible `userType` (any string)
- **AuthCredentials**: Standardized token generation response

## Architecture

```
Request
    │
    ▼
┌─────────────────────────────────────┐
│     middlewareAuthContext           │
│  (or middlewareUserInfo for legacy) │
└─────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────┐
│      AuthStrategyRegistry           │
│  (collects strategies via DI)       │
└─────────────────────────────────────┘
    │
    │ tries strategies by priority (low → high)
    │
    ├──► JWTStrategy (priority: 10)
    │         │
    │         └──► returns IAuthUser or null
    │
    ├──► ApiKeyStrategy (priority: 5)
    │         │
    │         └──► returns IAuthUser or null
    │
    └──► CustomStrategy (priority: 50)
              │
              └──► returns IAuthUser or null
    │
    ▼
┌─────────────────────────────────────┐
│         AuthContext                 │
│  user: IAuthUser | null             │
│  strategy: string | null            │
│  isAuthenticated: boolean           │
│  hasPermission(), hasUserType()...  │
└─────────────────────────────────────┘
    │
    ▼
req.authContext (new) + req.user (legacy compat)
    │
    ▼
┌─────────────────────────────────────┐
│   Authorization Decorators          │
│  @HasUserType, @HasGroups, etc.     │
└─────────────────────────────────────┘
```

## Type Definitions

```typescript
// User type is any string - fully extensible
type UserType = string;

interface IAuthUser {
  id: string;
  userType: string;        // 'ADMIN', 'CUSTOMER', 'API_CLIENT', etc.
  email?: string;
  groups?: string[];       // ['admins', 'premium_users']
  permissions?: string[];  // ['users:read', 'users:write']
  [key: string]: any;      // Extensible
}

interface IAuthContext {
  readonly user: IAuthUser | null;
  readonly strategy: string | null;
  readonly isAuthenticated: boolean;

  hasPermission(permission: string): boolean;
  hasAnyPermission(permissions: string[]): boolean;
  hasUserType(type: string): boolean;
  hasAnyUserType(types: string[]): boolean;
  belongsToGroup(group: string): boolean;
}

interface IAuthStrategy {
  readonly name: string;
  readonly priority: number;  // Lower = tried first

  authenticate(req: Request): Promise<IAuthUser | null>;
  generateToken?(payload: GenerateTokenPayload): Promise<AuthCredentials>;
  canHandle?(req: Request): boolean;
}

interface AuthCredentials {
  accessToken: string;
  tokenType: 'Bearer' | 'Cookie' | 'ApiKey' | string;
  refreshToken?: string;
  expiresIn?: number;
  expiresAt?: Date;
  cookie?: {
    name: string;
    value: string;
    options: AuthCookieOptions;
  };
}
```

## Configuration

### JWT Strategy

```typescript
import { Auth, INVERSITY_TYPES } from '@mangojs/core';

// Symmetric JWT via header (simple setup)
container.bind(Auth.AUTH_STRATEGY_TAG).toConstantValue(
  new Auth.JWTStrategy({
    secret: process.env.JWT_SECRET,
    expiresIn: 3600,  // 1 hour
  })
);

// Asymmetric JWT via cookie (more secure)
container.bind(Auth.AUTH_STRATEGY_TAG).toConstantValue(
  new Auth.JWTStrategy({
    publicKey: fs.readFileSync('./keys/public.pem', 'utf8'),
    privateKey: fs.readFileSync('./keys/private.pem', 'utf8'),
    algorithm: 'RS256',
    extractFrom: 'cookie',
    cookieName: 'session',
    cookie: {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 86400000,  // 24 hours
      domain: '.myapp.com',
    },
    refreshToken: {
      enabled: true,
      expiresIn: 604800,  // 7 days
    }
  })
);

// Bind the registry
container.bind(INVERSITY_TYPES.AuthStrategyRegistry).to(Auth.AuthStrategyRegistry);
```

### API Key Strategy

```typescript
container.bind(Auth.AUTH_STRATEGY_TAG).toConstantValue(
  new Auth.ApiKeyStrategy({
    headerName: 'X-API-Key',
    validator: async (apiKey, req) => {
      const user = await db.apiKeys.findByKey(apiKey);
      if (!user) return null;

      return {
        id: user.id,
        userType: 'API_CLIENT',
        permissions: user.scopes,
      };
    }
  })
);
```

### Custom Strategy

```typescript
import { BaseAuthStrategy, IAuthUser } from '@mangojs/core';

@injectable()
class OAuth2Strategy extends BaseAuthStrategy {
  readonly name = 'oauth2';
  readonly priority = 20;

  constructor(
    @inject('OAuthClient') private oauth: IOAuthClient
  ) {
    super();
  }

  canHandle(req: Request): boolean {
    return !!req.headers['x-oauth-token'];
  }

  async authenticate(req: Request): Promise<IAuthUser | null> {
    const token = req.headers['x-oauth-token'] as string;
    if (!token) return null;

    try {
      const profile = await this.oauth.getProfile(token);
      return {
        id: profile.sub,
        userType: 'OAUTH_USER',
        email: profile.email,
        groups: profile.groups || [],
        metadata: { provider: profile.iss }
      };
    } catch {
      return null;
    }
  }
}

// Register
container.bind(Auth.AUTH_STRATEGY_TAG).to(OAuth2Strategy);
```

## Usage Examples

### In Controllers

```typescript
import { Request, IAuthContext } from '@mangojs/core';

@Controller('/api/users')
class UserController {

  @Get('/profile')
  async getProfile(req: Request & { authContext: IAuthContext }) {
    if (!req.authContext.isAuthenticated) {
      throw new UnauthorizedError('Authentication required');
    }

    return {
      id: req.authContext.user.id,
      email: req.authContext.user.email,
      type: req.authContext.user.userType,
    };
  }

  @Get('/admin-data')
  @HasUserType(['ADMIN'])
  async getAdminData(req: Request) {
    // Only accessible by ADMIN users
  }

  @Delete('/:id')
  @HasPermission('users:delete')
  async deleteUser(req: Request) {
    // Only accessible by users with 'users:delete' permission
  }
}
```

### Generating Tokens

```typescript
@Controller('/auth')
class AuthController {
  constructor(
    @inject(INVERSITY_TYPES.AuthStrategyRegistry)
    private authRegistry: AuthStrategyRegistry
  ) {}

  @Post('/login')
  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    // Validate credentials
    const user = await this.userService.validateCredentials(email, password);
    if (!user) {
      throw new UnauthorizedError('Invalid credentials');
    }

    // Generate token using JWT strategy
    const credentials = await this.authRegistry.generateCredentials('jwt', {
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
        credentials.cookie.options
      );
    }

    return {
      accessToken: credentials.accessToken,
      expiresIn: credentials.expiresIn,
    };
  }
}
```

## Inversify Binding

```typescript
// inversify.config.ts
import { Container } from 'inversify';
import { Auth, INVERSITY_TYPES } from '@mangojs/core';

const container = new Container();

// Bind strategies (multi-inject)
container.bind(Auth.AUTH_STRATEGY_TAG).toConstantValue(
  new Auth.JWTStrategy({ secret: process.env.JWT_SECRET })
);

container.bind(Auth.AUTH_STRATEGY_TAG).toConstantValue(
  new Auth.ApiKeyStrategy({
    validator: async (key) => validateApiKey(key)
  })
);

// Bind registry (collects all strategies automatically)
container.bind(INVERSITY_TYPES.AuthStrategyRegistry)
  .to(Auth.AuthStrategyRegistry)
  .inSingletonScope();
```

## Error Handling

```typescript
// AuthenticationError (401) - "Who are you?"
throw AuthenticationError.invalidToken();
throw AuthenticationError.tokenExpired();
throw AuthenticationError.invalidApiKey();
throw AuthenticationError.missingCredentials();

// AuthorizationError (403) - "What can you do?"
// (handled by decorators like @HasUserType, @HasGroups)
```

## Backwards Compatibility

The new system maintains backwards compatibility:

1. `middlewareUserInfo` automatically uses new registry if bound
2. `req.user` is populated alongside `req.authContext`
3. Existing decorators (`@HasUserType`, `@HasGroups`) work unchanged
4. Legacy `IAuthorization` interface still works (deprecated)

## Migration from Legacy

```typescript
// OLD (deprecated)
class MyAuth implements IAuthorization {
  validateAdminCredentials(req, res) { ... }
  validatePartnerCredentials(req, res) { ... }
  validateUserCredentials(req, res) { ... }
  generateAdminCredentials(data) { ... }
}
container.bind(INVERSITY_TYPES.AuthorizationContext).to(MyAuth);

// NEW
class MyJWTStrategy extends BaseAuthStrategy {
  readonly name = 'jwt';
  readonly priority = 10;

  async authenticate(req) {
    // Single method handles all user types
    const token = this.extractBearerToken(req);
    if (!token) return null;
    // ... validate and return IAuthUser
  }

  async generateToken(payload) {
    // Single method for all user types
    return { accessToken: '...', tokenType: 'Bearer', ... };
  }
}
container.bind(Auth.AUTH_STRATEGY_TAG).to(MyJWTStrategy);
container.bind(INVERSITY_TYPES.AuthStrategyRegistry).to(Auth.AuthStrategyRegistry);
```

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

- [Decorators](./decorators.context.md) - `@HasUserType`, `@HasGroups`, `@RequiresAccess`
- [Dependency Injection](./injection.context.md) - Container configuration
- [Error Handling](../common/error-handling.context.md) - APIError patterns
