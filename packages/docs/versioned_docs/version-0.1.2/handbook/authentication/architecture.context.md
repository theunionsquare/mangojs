---
sidebar_label: "Architecture"
---

# Authentication System Architecture

## Overview

The MangoJS Authentication System provides a strategy-based authentication mechanism. Multiple authentication methods can coexist (JWT, API keys, OAuth), with strategies tried in priority order until one succeeds.

## System Architecture

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

## Core Components

| Component             | Purpose                                                    |
| --------------------- | ---------------------------------------------------------- |
| `IAuthStrategy`       | Interface for authentication mechanisms                    |
| `BaseAuthStrategy`    | Abstract base class for custom strategies                  |
| `AuthStrategyRegistry`| Collects strategies via DI, orchestrates authentication    |
| `AuthContext`         | Immutable context with user info and helper methods        |
| `JWTStrategy`         | Built-in JWT authentication (symmetric/asymmetric)         |
| `ApiKeyStrategy`      | Built-in API key authentication                            |

## Authentication Flow

```
1. Request arrives at server
2. middlewareAuthContext middleware executes
3. AuthStrategyRegistry.authenticate(req) called
4. Strategies tried in priority order (lowest first)
   - Each strategy's canHandle(req) checked first
   - If canHandle returns true, authenticate(req) called
   - First strategy returning IAuthUser wins
5. AuthContext created with user (or null)
6. req.authContext and req.user populated
7. Controller method executes
8. Authorization decorators check permissions
```

## Priority System

Strategies are tried in priority order (lower number = higher priority).

| Priority | Description                    |
| -------- | ------------------------------ |
| 1-10     | High priority (API keys)       |
| 11-50    | Normal priority (JWT, session) |
| 51+      | Low priority (fallbacks)       |

```typescript
// API key checked first (priority 5)
new ApiKeyStrategy({ ... })  // Default priority: 5

// JWT checked second (priority 10)
new JWTStrategy({ ... })     // Default priority: 10

// Custom strategy last (priority 50)
class CustomStrategy extends BaseAuthStrategy {
  readonly priority = 50;
}
```

## Inversify Binding

```typescript
// inversify.config.ts
import { Container } from "inversify";
import { Auth, INVERSITY_TYPES } from "@mangojs/core";

const container = new Container();

// Bind strategies (multi-inject)
container
  .bind(Auth.AUTH_STRATEGY_TAG)
  .toConstantValue(new Auth.JWTStrategy({ secret: process.env.JWT_SECRET }));

container.bind(Auth.AUTH_STRATEGY_TAG).toConstantValue(
  new Auth.ApiKeyStrategy({
    validator: async (key) => validateApiKey(key),
  }),
);

// Bind registry (collects all strategies automatically)
container
  .bind(INVERSITY_TYPES.AuthStrategyRegistry)
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

## Related

- [Strategies](./strategies.context.md) - JWT, API Key, custom strategy configuration
- [Types](./types.context.md) - Type definitions
- [Examples](./examples.context.md) - Controller usage, token generation
