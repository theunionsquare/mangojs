# Abstract Class: BaseAuthStrategy

Defined in: [src/core/auth/strategies/BaseAuthStrategy.ts:34](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/auth/strategies/BaseAuthStrategy.ts#L34)

Abstract base class for authentication strategies

Provides common functionality and helper methods for extracting
credentials from requests. Extend this class to create custom strategies.

## Example

```typescript
@injectable()
class MyStrategy extends BaseAuthStrategy {
  readonly name = 'my-strategy';
  readonly priority = 50;

  async authenticate(req: Request): Promise<IAuthUser | null> {
    const token = this.extractBearerToken(req);
    if (!token) return null;
    // validate token...
  }
}
```

## Extended by

- [`JWTStrategy`](JWTStrategy.md)
- [`ApiKeyStrategy`](ApiKeyStrategy.md)

## Implements

- [`IAuthStrategy`](../interfaces/IAuthStrategy.md)

## Constructors

### Constructor

```ts
new BaseAuthStrategy(): BaseAuthStrategy;
```

#### Returns

`BaseAuthStrategy`

## Properties

### name

```ts
abstract readonly name: string;
```

Defined in: [src/core/auth/strategies/BaseAuthStrategy.ts:38](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/auth/strategies/BaseAuthStrategy.ts#L38)

Unique name for this strategy (must be implemented)

#### Implementation of

[`IAuthStrategy`](../interfaces/IAuthStrategy.md).[`name`](../interfaces/IAuthStrategy.md#name)

***

### priority

```ts
readonly priority: number = 100;
```

Defined in: [src/core/auth/strategies/BaseAuthStrategy.ts:44](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/auth/strategies/BaseAuthStrategy.ts#L44)

Default priority (can be overridden)
Lower numbers = higher priority

#### Implementation of

[`IAuthStrategy`](../interfaces/IAuthStrategy.md).[`priority`](../interfaces/IAuthStrategy.md#priority)

## Methods

### authenticate()

```ts
abstract authenticate(req): Promise<IAuthUser>;
```

Defined in: [src/core/auth/strategies/BaseAuthStrategy.ts:49](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/auth/strategies/BaseAuthStrategy.ts#L49)

Authenticate the request (must be implemented)

#### Parameters

##### req

`Request`

#### Returns

`Promise`\<[`IAuthUser`](../interfaces/IAuthUser.md)\>

#### Implementation of

[`IAuthStrategy`](../interfaces/IAuthStrategy.md).[`authenticate`](../interfaces/IAuthStrategy.md#authenticate)

***

### canHandle()

```ts
canHandle(req): boolean;
```

Defined in: [src/core/auth/strategies/BaseAuthStrategy.ts:55](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/auth/strategies/BaseAuthStrategy.ts#L55)

Default implementation - strategy can handle any request
Override to add request filtering for early bailout

#### Parameters

##### req

`Request`

#### Returns

`boolean`

#### Implementation of

[`IAuthStrategy`](../interfaces/IAuthStrategy.md).[`canHandle`](../interfaces/IAuthStrategy.md#canhandle)

***

### extractApiKey()

```ts
protected extractApiKey(req, headerName?): string;
```

Defined in: [src/core/auth/strategies/BaseAuthStrategy.ts:124](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/auth/strategies/BaseAuthStrategy.ts#L124)

Extract API key from header

#### Parameters

##### req

`Request`

Express request

##### headerName?

`string` = `"x-api-key"`

Header name (default: 'x-api-key')

#### Returns

`string`

API key or null if not found

#### Example

```typescript
// X-API-Key: sk_live_abc123
const apiKey = this.extractApiKey(req);
```

***

### extractBearerToken()

```ts
protected extractBearerToken(
   req, 
   headerName?, 
   scheme?): string;
```

Defined in: [src/core/auth/strategies/BaseAuthStrategy.ts:73](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/auth/strategies/BaseAuthStrategy.ts#L73)

Extract Bearer token from Authorization header

#### Parameters

##### req

`Request`

Express request

##### headerName?

`string` = `"authorization"`

Header name (default: 'authorization')

##### scheme?

`string` = `"bearer"`

Expected scheme (default: 'bearer')

#### Returns

`string`

Token string or null if not found

#### Example

```typescript
// Authorization: Bearer eyJhbGc...
const token = this.extractBearerToken(req);
```

***

### extractCookieToken()

```ts
protected extractCookieToken(req, cookieName): string;
```

Defined in: [src/core/auth/strategies/BaseAuthStrategy.ts:102](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/auth/strategies/BaseAuthStrategy.ts#L102)

Extract token from cookie

#### Parameters

##### req

`Request`

Express request

##### cookieName

`string`

Name of the cookie

#### Returns

`string`

Cookie value or null if not found

#### Example

```typescript
const token = this.extractCookieToken(req, 'auth_token');
```

***

### extractQueryParam()

```ts
protected extractQueryParam(req, paramName): string;
```

Defined in: [src/core/auth/strategies/BaseAuthStrategy.ts:140](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/auth/strategies/BaseAuthStrategy.ts#L140)

Extract value from query parameter

#### Parameters

##### req

`Request`

Express request

##### paramName

`string`

Query parameter name

#### Returns

`string`

Parameter value or null if not found

***

### getClientIp()

```ts
protected getClientIp(req): string;
```

Defined in: [src/core/auth/strategies/BaseAuthStrategy.ts:150](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/auth/strategies/BaseAuthStrategy.ts#L150)

Get client IP address from request
Handles common proxy headers

#### Parameters

##### req

`Request`

#### Returns

`string`

***

### getUserAgent()

```ts
protected getUserAgent(req): string;
```

Defined in: [src/core/auth/strategies/BaseAuthStrategy.ts:170](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/auth/strategies/BaseAuthStrategy.ts#L170)

Get user agent from request

#### Parameters

##### req

`Request`

#### Returns

`string`
