---
sidebar_label: AUTH_STRATEGY_TAG
---

# Variable: AUTH\_STRATEGY\_TAG

```ts
const AUTH_STRATEGY_TAG: typeof AUTH_STRATEGY_TAG;
```

Defined in: [src/core/auth/strategies/IAuthStrategy.ts:14](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/auth/strategies/IAuthStrategy.ts#L14)

Symbol for multi-inject binding
Use this to bind multiple strategies to the container

## Example

```typescript
container.bind(AUTH_STRATEGY_TAG).to(JWTStrategy);
container.bind(AUTH_STRATEGY_TAG).to(ApiKeyStrategy);
```
