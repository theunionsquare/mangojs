---
sidebar_label: "Strategies"
---

# Authentication Strategies

This document covers built-in strategies (JWT, API Key) and creating custom strategies.

---

## JWT Strategy

The `JWTStrategy` supports both symmetric (secret) and asymmetric (public/private key) JWT authentication.

### Symmetric JWT (Simple Setup)

```typescript
import { Auth, INVERSITY_TYPES } from "@mangojs/core";

container.bind(Auth.AUTH_STRATEGY_TAG).toConstantValue(
  new Auth.JWTStrategy({
    secret: process.env.JWT_SECRET,
    expiresIn: 3600, // 1 hour
  }),
);
```

### Asymmetric JWT via Cookie (More Secure)

```typescript
container.bind(Auth.AUTH_STRATEGY_TAG).toConstantValue(
  new Auth.JWTStrategy({
    publicKey: fs.readFileSync("./keys/public.pem", "utf8"),
    privateKey: fs.readFileSync("./keys/private.pem", "utf8"),
    algorithm: "RS256",
    extractFrom: "cookie",
    cookieName: "session",
    cookie: {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 86400000, // 24 hours
      domain: ".myapp.com",
    },
    refreshToken: {
      enabled: true,
      expiresIn: 604800, // 7 days
    },
  }),
);
```

### JWT Strategy Options

| Option         | Type                        | Default     | Description                           |
| -------------- | --------------------------- | ----------- | ------------------------------------- |
| `secret`       | `string`                    | -           | Symmetric secret key                  |
| `publicKey`    | `string`                    | -           | RSA/EC public key (asymmetric)        |
| `privateKey`   | `string`                    | -           | RSA/EC private key (asymmetric)       |
| `algorithm`    | `string`                    | `'HS256'`   | JWT algorithm                         |
| `expiresIn`    | `number`                    | `3600`      | Token expiration in seconds           |
| `extractFrom`  | `'header' \| 'cookie'`      | `'header'`  | Where to extract token from           |
| `cookieName`   | `string`                    | `'token'`   | Cookie name (if extractFrom=cookie)   |
| `cookie`       | `AuthCookieOptions`         | -           | Cookie options for token generation   |
| `refreshToken` | `{ enabled, expiresIn }`    | -           | Refresh token configuration           |

---

## API Key Strategy

The `ApiKeyStrategy` validates API keys from request headers.

```typescript
container.bind(Auth.AUTH_STRATEGY_TAG).toConstantValue(
  new Auth.ApiKeyStrategy({
    headerName: "X-API-Key",
    validator: async (apiKey, req) => {
      const user = await db.apiKeys.findByKey(apiKey);
      if (!user) return null;

      return {
        id: user.id,
        userType: "API_CLIENT",
        permissions: user.scopes,
      };
    },
  }),
);
```

### API Key Strategy Options

| Option       | Type                                              | Default       | Description                    |
| ------------ | ------------------------------------------------- | ------------- | ------------------------------ |
| `headerName` | `string`                                          | `'X-API-Key'` | Header containing the API key  |
| `validator`  | `(key: string, req: Request) => Promise<IAuthUser \| null>` | - | Validation function |
| `priority`   | `number`                                          | `5`           | Strategy priority              |

---

## Custom Strategy

Create custom strategies by extending `BaseAuthStrategy`.

```typescript
import { BaseAuthStrategy, IAuthUser } from "@mangojs/core";

@injectable()
class OAuth2Strategy extends BaseAuthStrategy {
  readonly name = "oauth2";
  readonly priority = 20;

  constructor(@inject("OAuthClient") private oauth: IOAuthClient) {
    super();
  }

  canHandle(req: Request): boolean {
    return !!req.headers["x-oauth-token"];
  }

  async authenticate(req: Request): Promise<IAuthUser | null> {
    const token = req.headers["x-oauth-token"] as string;
    if (!token) return null;

    try {
      const profile = await this.oauth.getProfile(token);
      return {
        id: profile.sub,
        userType: "OAUTH_USER",
        email: profile.email,
        groups: profile.groups || [],
        metadata: { provider: profile.iss },
      };
    } catch {
      return null;
    }
  }
}

// Register
container.bind(Auth.AUTH_STRATEGY_TAG).to(OAuth2Strategy);
```

### Custom Strategy Requirements

| Method           | Required | Description                                      |
| ---------------- | -------- | ------------------------------------------------ |
| `name`           | Yes      | Strategy identifier (e.g., `'jwt'`, `'oauth2'`)  |
| `priority`       | Yes      | Lower = tried first                              |
| `authenticate`   | Yes      | Returns `IAuthUser` or `null`                    |
| `canHandle`      | No       | Early check before `authenticate` (optimization) |
| `generateToken`  | No       | Token generation for login flows                 |

---

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

## Related

- [Architecture](./architecture.context.md) - System overview
- [Types](./types.context.md) - Type definitions
- [Examples](./examples.context.md) - Complete examples
