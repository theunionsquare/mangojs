---
sidebar_label: "Types"
---

# Authentication Types Reference

This document provides complete type definitions for the MangoJS Authentication System.

---

## IAuthUser

Flexible user interface with extensible properties.

```typescript
interface IAuthUser {
  id: string;
  userType: string; // 'ADMIN', 'CUSTOMER', 'API_CLIENT', etc.
  email?: string;
  groups?: string[]; // ['admins', 'premium_users']
  permissions?: string[]; // ['users:read', 'users:write']
  [key: string]: any; // Extensible
}
```

**Property Details:**

| Property      | Type       | Required | Description                              |
| ------------- | ---------- | -------- | ---------------------------------------- |
| `id`          | `string`   | Yes      | Unique user identifier                   |
| `userType`    | `string`   | Yes      | User type (extensible, any string value) |
| `email`       | `string`   | No       | User email address                       |
| `groups`      | `string[]` | No       | Group memberships                        |
| `permissions` | `string[]` | No       | Permission strings                       |

---

## IAuthContext

Immutable authentication context attached to requests.

```typescript
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
```

**Methods:**

| Method              | Returns   | Description                                |
| ------------------- | --------- | ------------------------------------------ |
| `hasPermission`     | `boolean` | Check if user has specific permission      |
| `hasAnyPermission`  | `boolean` | Check if user has any of the permissions   |
| `hasUserType`       | `boolean` | Check if user is of specific type          |
| `hasAnyUserType`    | `boolean` | Check if user is any of the types          |
| `belongsToGroup`    | `boolean` | Check if user belongs to group             |

---

## IAuthStrategy

Interface for authentication mechanisms.

```typescript
interface IAuthStrategy {
  readonly name: string;
  readonly priority: number; // Lower = tried first

  authenticate(req: Request): Promise<IAuthUser | null>;
  generateToken?(payload: GenerateTokenPayload): Promise<AuthCredentials>;
  canHandle?(req: Request): boolean;
}
```

**Property Details:**

| Property   | Type     | Description                           |
| ---------- | -------- | ------------------------------------- |
| `name`     | `string` | Strategy identifier (e.g., `'jwt'`)   |
| `priority` | `number` | Execution order (lower = first)       |

**Methods:**

| Method         | Required | Description                                |
| -------------- | -------- | ------------------------------------------ |
| `authenticate` | Yes      | Validate request, return user or null      |
| `generateToken`| No       | Generate tokens for login flows            |
| `canHandle`    | No       | Quick check if strategy applies to request |

---

## AuthCredentials

Token generation response.

```typescript
interface AuthCredentials {
  accessToken: string;
  tokenType: "Bearer" | "Cookie" | "ApiKey" | string;
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

**Property Details:**

| Property       | Type                | Required | Description                    |
| -------------- | ------------------- | -------- | ------------------------------ |
| `accessToken`  | `string`            | Yes      | The access token               |
| `tokenType`    | `string`            | Yes      | Token type identifier          |
| `refreshToken` | `string`            | No       | Refresh token if enabled       |
| `expiresIn`    | `number`            | No       | Expiration in seconds          |
| `expiresAt`    | `Date`              | No       | Expiration timestamp           |
| `cookie`       | `object`            | No       | Cookie configuration if used   |

---

## AuthCookieOptions

Cookie configuration for token-based authentication.

```typescript
interface AuthCookieOptions {
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: "strict" | "lax" | "none";
  maxAge?: number;
  domain?: string;
  path?: string;
}
```

---

## GenerateTokenPayload

Payload for token generation.

```typescript
interface GenerateTokenPayload {
  id: string;
  userType: string;
  email?: string;
  permissions?: string[];
  groups?: string[];
  [key: string]: any;
}
```

---

## JWTStrategyOptions

Configuration options for JWT strategy.

```typescript
interface JWTStrategyOptions {
  secret?: string;
  publicKey?: string;
  privateKey?: string;
  algorithm?: string;
  expiresIn?: number;
  extractFrom?: "header" | "cookie";
  cookieName?: string;
  cookie?: AuthCookieOptions;
  refreshToken?: {
    enabled: boolean;
    expiresIn: number;
  };
}
```

---

## ApiKeyStrategyOptions

Configuration options for API key strategy.

```typescript
interface ApiKeyStrategyOptions {
  headerName?: string;
  validator: (apiKey: string, req: Request) => Promise<IAuthUser | null>;
  priority?: number;
}
```

---

## Common Type Patterns

### User Type Constants

```typescript
// Define as constants (not enum)
const UserTypes = {
  ADMIN: "ADMIN",
  CUSTOMER: "CUSTOMER",
  API_CLIENT: "API_CLIENT",
  PARTNER: "PARTNER",
} as const;

type UserType = (typeof UserTypes)[keyof typeof UserTypes];
```

### Permission Constants

```typescript
const Permissions = {
  USERS_READ: "users:read",
  USERS_WRITE: "users:write",
  USERS_DELETE: "users:delete",
  ORDERS_READ: "orders:read",
  ORDERS_WRITE: "orders:write",
} as const;

type Permission = (typeof Permissions)[keyof typeof Permissions];
```

### Typed Request

```typescript
import { Request, IAuthContext } from "@mangojs/core";

type AuthenticatedRequest = Request & {
  authContext: IAuthContext;
};

// Usage in controller
@Get("/profile")
async getProfile(req: AuthenticatedRequest) {
  const user = req.authContext.user;
  // user is typed as IAuthUser | null
}
```

## Related

- [Architecture](./architecture.context.md) - System overview
- [Strategies](./strategies.context.md) - Strategy configuration
- [Examples](./examples.context.md) - Types in action
