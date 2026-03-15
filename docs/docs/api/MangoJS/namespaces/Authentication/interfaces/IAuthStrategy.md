[**MangoJS**](../../../../README.md)

***

# Interface: IAuthStrategy

Defined in: [src/core/auth/strategies/IAuthStrategy.ts:39](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/auth/strategies/IAuthStrategy.ts#L39)

Authentication strategy interface

Implement this interface to create custom authentication mechanisms.
Strategies are tried in priority order (lower number = higher priority).

## Example

```typescript
@injectable()
class MyCustomStrategy implements IAuthStrategy {
  readonly name = 'custom';
  readonly priority = 50;

  async authenticate(req: Request): Promise<IAuthUser | null> {
    const token = req.headers['x-custom-token'];
    if (!token) return null;

    const user = await this.validateToken(token);
    return user;
  }
}
```

## Properties

### name

```ts
readonly name: string;
```

Defined in: [src/core/auth/strategies/IAuthStrategy.ts:44](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/auth/strategies/IAuthStrategy.ts#L44)

Unique name for this strategy
Used for logging and identification

***

### priority

```ts
readonly priority: number;
```

Defined in: [src/core/auth/strategies/IAuthStrategy.ts:55](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/auth/strategies/IAuthStrategy.ts#L55)

Priority for strategy execution (lower = higher priority)
Strategies are tried in priority order until one succeeds

Recommended ranges:
- 1-10: High priority (API keys, service tokens)
- 10-50: Normal priority (JWT, session)
- 50-100: Low priority (fallback strategies)

## Methods

### authenticate()

```ts
authenticate(req): Promise<IAuthUser>;
```

Defined in: [src/core/auth/strategies/IAuthStrategy.ts:73](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/auth/strategies/IAuthStrategy.ts#L73)

Attempt to authenticate the request

#### Parameters

##### req

`Request`

Express request object

#### Returns

`Promise`\<[`IAuthUser`](IAuthUser.md)\>

IAuthUser if successful, null if this strategy doesn't apply

#### Throws

AuthenticationError for explicit failures (invalid token, expired, etc.)

Return null when:
- The required credentials aren't present (no token, no cookie)
- The strategy simply doesn't apply to this request

Throw AuthenticationError when:
- Credentials are present but invalid
- Token is expired
- Signature verification fails

***

### canHandle()?

```ts
optional canHandle(req): boolean;
```

Defined in: [src/core/auth/strategies/IAuthStrategy.ts:121](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/auth/strategies/IAuthStrategy.ts#L121)

Optional: Check if this strategy can handle this request
Use this for early filtering before attempting authentication

#### Parameters

##### req

`Request`

Express request object

#### Returns

`boolean`

false to skip this strategy entirely

#### Example

```typescript
canHandle(req: Request): boolean {
  // Only handle requests with X-API-Key header
  return !!req.headers['x-api-key'];
}
```

***

### generateToken()?

```ts
optional generateToken(payload, options?): Promise<AuthCredentials>;
```

Defined in: [src/core/auth/strategies/IAuthStrategy.ts:83](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/auth/strategies/IAuthStrategy.ts#L83)

Optional: Generate credentials/tokens for a user
Not all strategies support token generation (e.g., session-based)

#### Parameters

##### payload

[`GenerateTokenPayload`](GenerateTokenPayload.md)

User data to encode in the token

##### options?

`Record`\<`string`, `any`\>

Additional generation options

#### Returns

`Promise`\<[`AuthCredentials`](AuthCredentials.md)\>

AuthCredentials with token(s) and metadata

***

### revokeToken()?

```ts
optional revokeToken(token): Promise<boolean>;
```

Defined in: [src/core/auth/strategies/IAuthStrategy.ts:104](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/auth/strategies/IAuthStrategy.ts#L104)

Optional: Revoke/invalidate a token
Useful for logout, token rotation, or blacklisting

#### Parameters

##### token

`string`

The token to revoke

#### Returns

`Promise`\<`boolean`\>

true if revoked, false if not found or already revoked

***

### verifyToken()?

```ts
optional verifyToken(token): Promise<IAuthUser>;
```

Defined in: [src/core/auth/strategies/IAuthStrategy.ts:95](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/auth/strategies/IAuthStrategy.ts#L95)

Optional: Verify a token without the full request context
Useful for token validation in non-HTTP contexts

#### Parameters

##### token

`string`

The raw token string

#### Returns

`Promise`\<[`IAuthUser`](IAuthUser.md)\>

User info if valid, null if invalid
