[**MangoJS**](../../../../README.md)

***

# Variable: AUTH\_STRATEGY\_TAG

```ts
const AUTH_STRATEGY_TAG: typeof AUTH_STRATEGY_TAG;
```

Defined in: [src/core/auth/strategies/IAuthStrategy.ts:14](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/auth/strategies/IAuthStrategy.ts#L14)

Symbol for multi-inject binding
Use this to bind multiple strategies to the container

## Example

```typescript
container.bind(AUTH_STRATEGY_TAG).to(JWTStrategy);
container.bind(AUTH_STRATEGY_TAG).to(ApiKeyStrategy);
```
