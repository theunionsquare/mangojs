[**MangoJS**](../../../../README.md)

***

# Class: AuthStrategyRegistry

Defined in: [src/core/auth/AuthStrategyRegistry.ts:32](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/auth/AuthStrategyRegistry.ts#L32)

## Constructors

### Constructor

```ts
new AuthStrategyRegistry(strategies?): AuthStrategyRegistry;
```

Defined in: [src/core/auth/AuthStrategyRegistry.ts:35](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/auth/AuthStrategyRegistry.ts#L35)

#### Parameters

##### strategies?

[`IAuthStrategy`](../interfaces/IAuthStrategy.md)[] = `[]`

#### Returns

`AuthStrategyRegistry`

## Methods

### authenticate()

```ts
authenticate(req): Promise<AuthContext>;
```

Defined in: [src/core/auth/AuthStrategyRegistry.ts:91](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/auth/AuthStrategyRegistry.ts#L91)

Authenticate a request by trying strategies in priority order

#### Parameters

##### req

`Request`

Express request object

#### Returns

`Promise`\<[`AuthContext`](AuthContext.md)\>

AuthContext with user info if authenticated, anonymous otherwise

#### Throws

AuthenticationError if a strategy explicitly rejects (invalid token, etc.)

#### Example

```typescript
const authContext = await registry.authenticate(req);
if (authContext.isAuthenticated) {
  console.log(`User ${authContext.user.id} authenticated via ${authContext.strategy}`);
}
```

***

### generateCredentials()

```ts
generateCredentials(
   strategyName, 
   payload, 
options?): Promise<AuthCredentials>;
```

Defined in: [src/core/auth/AuthStrategyRegistry.ts:142](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/auth/AuthStrategyRegistry.ts#L142)

Generate credentials using a specific strategy

#### Parameters

##### strategyName

`string`

Name of the strategy to use

##### payload

[`GenerateTokenPayload`](../interfaces/GenerateTokenPayload.md)

User data to encode

##### options?

`Record`\<`string`, `any`\>

Additional options for token generation

#### Returns

`Promise`\<[`AuthCredentials`](../interfaces/AuthCredentials.md)\>

AuthCredentials with token(s)

#### Throws

Error if strategy not found or doesn't support generation

#### Example

```typescript
const credentials = await registry.generateCredentials('jwt', {
  id: user.id,
  userType: 'ADMIN',
  email: user.email
});

res.cookie(credentials.cookie.name, credentials.cookie.value, credentials.cookie.options);
```

***

### getStrategies()

```ts
getStrategies(): readonly IAuthStrategy[];
```

Defined in: [src/core/auth/AuthStrategyRegistry.ts:53](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/auth/AuthStrategyRegistry.ts#L53)

Get all registered strategies (sorted by priority)

#### Returns

readonly [`IAuthStrategy`](../interfaces/IAuthStrategy.md)[]

***

### getStrategy()

```ts
getStrategy(name): IAuthStrategy;
```

Defined in: [src/core/auth/AuthStrategyRegistry.ts:63](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/auth/AuthStrategyRegistry.ts#L63)

Get a strategy by name

#### Parameters

##### name

`string`

Strategy name

#### Returns

[`IAuthStrategy`](../interfaces/IAuthStrategy.md)

Strategy or undefined if not found

***

### hasStrategy()

```ts
hasStrategy(name): boolean;
```

Defined in: [src/core/auth/AuthStrategyRegistry.ts:72](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/auth/AuthStrategyRegistry.ts#L72)

Check if a strategy is registered

#### Parameters

##### name

`string`

Strategy name

#### Returns

`boolean`

***

### revokeToken()

```ts
revokeToken(strategyName, token): Promise<boolean>;
```

Defined in: [src/core/auth/AuthStrategyRegistry.ts:197](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/auth/AuthStrategyRegistry.ts#L197)

Revoke a token using a specific strategy

#### Parameters

##### strategyName

`string`

Name of the strategy to use

##### token

`string`

Token to revoke

#### Returns

`Promise`\<`boolean`\>

true if revoked, false otherwise

***

### verifyToken()

```ts
verifyToken(strategyName, token): Promise<AuthContext>;
```

Defined in: [src/core/auth/AuthStrategyRegistry.ts:169](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/auth/AuthStrategyRegistry.ts#L169)

Verify a token using a specific strategy

#### Parameters

##### strategyName

`string`

Name of the strategy to use

##### token

`string`

Token to verify

#### Returns

`Promise`\<[`AuthContext`](AuthContext.md)\>

User info if valid, null if invalid
