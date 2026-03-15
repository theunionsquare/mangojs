---
sidebar_label: ApiKeyStrategy
---

# Class: ApiKeyStrategy

Defined in: [src/core/auth/strategies/ApiKeyStrategy.ts:59](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/auth/strategies/ApiKeyStrategy.ts#L59)

API Key Authentication Strategy

Authenticates requests using an API key provided in a header or query parameter.
You must provide a validator function that verifies the key and returns user info.

## Example

```typescript
// Basic usage with header
const apiKeyStrategy = new ApiKeyStrategy({
  validator: async (apiKey, req) => {
    const user = await db.users.findByApiKey(apiKey);
    if (!user) return null;
    return {
      id: user.id,
      userType: 'API_CLIENT',
      permissions: user.scopes,
    };
  }
});

// With custom header and query fallback
const apiKeyStrategy = new ApiKeyStrategy({
  headerName: 'Authorization',  // Different header
  queryParam: 'api_key',        // Fallback to ?api_key=xxx
  validator: async (apiKey, req) => {
    // Handle "Bearer sk_xxx" format
    const key = apiKey.replace(/^Bearer\s+/i, '');
    return validateAndFetchUser(key);
  }
});

// Register with container
container.bind(AUTH_STRATEGY_TAG).toConstantValue(apiKeyStrategy);
```

## Extends

- [`BaseAuthStrategy`](BaseAuthStrategy.md)

## Constructors

### Constructor

```ts
new ApiKeyStrategy(options): ApiKeyStrategy;
```

Defined in: [src/core/auth/strategies/ApiKeyStrategy.ts:68](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/auth/strategies/ApiKeyStrategy.ts#L68)

#### Parameters

##### options

[`ApiKeyStrategyOptions`](../interfaces/ApiKeyStrategyOptions.md)

#### Returns

`ApiKeyStrategy`

#### Overrides

[`BaseAuthStrategy`](BaseAuthStrategy.md).[`constructor`](BaseAuthStrategy.md#constructor)

## Properties

### name

```ts
readonly name: "apikey" = "apikey";
```

Defined in: [src/core/auth/strategies/ApiKeyStrategy.ts:60](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/auth/strategies/ApiKeyStrategy.ts#L60)

Unique name for this strategy (must be implemented)

#### Overrides

[`BaseAuthStrategy`](BaseAuthStrategy.md).[`name`](BaseAuthStrategy.md#name)

***

### priority

```ts
readonly priority: number;
```

Defined in: [src/core/auth/strategies/ApiKeyStrategy.ts:61](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/auth/strategies/ApiKeyStrategy.ts#L61)

Default priority (can be overridden)
Lower numbers = higher priority

#### Overrides

[`BaseAuthStrategy`](BaseAuthStrategy.md).[`priority`](BaseAuthStrategy.md#priority)

## Methods

### authenticate()

```ts
authenticate(req): Promise<IAuthUser>;
```

Defined in: [src/core/auth/strategies/ApiKeyStrategy.ts:96](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/auth/strategies/ApiKeyStrategy.ts#L96)

Authenticate the request by validating the API key

#### Parameters

##### req

`Request`

#### Returns

`Promise`\<[`IAuthUser`](../interfaces/IAuthUser.md)\>

#### Overrides

[`BaseAuthStrategy`](BaseAuthStrategy.md).[`authenticate`](BaseAuthStrategy.md#authenticate)

***

### canHandle()

```ts
canHandle(req): boolean;
```

Defined in: [src/core/auth/strategies/ApiKeyStrategy.ts:89](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/auth/strategies/ApiKeyStrategy.ts#L89)

Check if this strategy can handle the request
Returns true if an API key is present in header or query

#### Parameters

##### req

`Request`

#### Returns

`boolean`

#### Overrides

[`BaseAuthStrategy`](BaseAuthStrategy.md).[`canHandle`](BaseAuthStrategy.md#canhandle)

***

### extractApiKey()

```ts
protected extractApiKey(req, headerName?): string;
```

Defined in: [src/core/auth/strategies/BaseAuthStrategy.ts:124](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/auth/strategies/BaseAuthStrategy.ts#L124)

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

#### Inherited from

[`BaseAuthStrategy`](BaseAuthStrategy.md).[`extractApiKey`](BaseAuthStrategy.md#extractapikey)

***

### extractBearerToken()

```ts
protected extractBearerToken(
   req, 
   headerName?, 
   scheme?): string;
```

Defined in: [src/core/auth/strategies/BaseAuthStrategy.ts:73](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/auth/strategies/BaseAuthStrategy.ts#L73)

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

#### Inherited from

[`BaseAuthStrategy`](BaseAuthStrategy.md).[`extractBearerToken`](BaseAuthStrategy.md#extractbearertoken)

***

### extractCookieToken()

```ts
protected extractCookieToken(req, cookieName): string;
```

Defined in: [src/core/auth/strategies/BaseAuthStrategy.ts:102](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/auth/strategies/BaseAuthStrategy.ts#L102)

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

#### Inherited from

[`BaseAuthStrategy`](BaseAuthStrategy.md).[`extractCookieToken`](BaseAuthStrategy.md#extractcookietoken)

***

### extractQueryParam()

```ts
protected extractQueryParam(req, paramName): string;
```

Defined in: [src/core/auth/strategies/BaseAuthStrategy.ts:140](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/auth/strategies/BaseAuthStrategy.ts#L140)

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

#### Inherited from

[`BaseAuthStrategy`](BaseAuthStrategy.md).[`extractQueryParam`](BaseAuthStrategy.md#extractqueryparam)

***

### getClientIp()

```ts
protected getClientIp(req): string;
```

Defined in: [src/core/auth/strategies/BaseAuthStrategy.ts:150](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/auth/strategies/BaseAuthStrategy.ts#L150)

Get client IP address from request
Handles common proxy headers

#### Parameters

##### req

`Request`

#### Returns

`string`

#### Inherited from

[`BaseAuthStrategy`](BaseAuthStrategy.md).[`getClientIp`](BaseAuthStrategy.md#getclientip)

***

### getUserAgent()

```ts
protected getUserAgent(req): string;
```

Defined in: [src/core/auth/strategies/BaseAuthStrategy.ts:170](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/auth/strategies/BaseAuthStrategy.ts#L170)

Get user agent from request

#### Parameters

##### req

`Request`

#### Returns

`string`

#### Inherited from

[`BaseAuthStrategy`](BaseAuthStrategy.md).[`getUserAgent`](BaseAuthStrategy.md#getuseragent)
