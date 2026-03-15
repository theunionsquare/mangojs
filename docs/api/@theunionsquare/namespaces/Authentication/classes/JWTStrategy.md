# Class: JWTStrategy

Defined in: [src/core/auth/strategies/JWTStrategy.ts:95](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/auth/strategies/JWTStrategy.ts#L95)

JWT Authentication Strategy

Supports both symmetric (HS256, HS384, HS512) and asymmetric
(RS256, RS384, RS512, ES256, ES384, ES512) algorithms.

Can extract tokens from:
- Authorization header (Bearer scheme)
- Cookies
- Both (tries header first, then cookie)

## Example

```typescript
// Symmetric JWT via header
const jwtStrategy = new JWTStrategy({
  secret: process.env.JWT_SECRET,
  expiresIn: 3600,
});

// Asymmetric JWT via cookie
const jwtStrategy = new JWTStrategy({
  publicKey: fs.readFileSync('./public.pem', 'utf8'),
  privateKey: fs.readFileSync('./private.pem', 'utf8'),
  algorithm: 'RS256',
  extractFrom: 'cookie',
  cookieName: 'session',
  cookie: {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 86400000,
  }
});

// Register with container
container.bind(AUTH_STRATEGY_TAG).toConstantValue(jwtStrategy);
```

## Extends

- [`BaseAuthStrategy`](BaseAuthStrategy.md)

## Constructors

### Constructor

```ts
new JWTStrategy(options?): JWTStrategy;
```

Defined in: [src/core/auth/strategies/JWTStrategy.ts:101](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/auth/strategies/JWTStrategy.ts#L101)

#### Parameters

##### options?

[`JWTStrategyOptions`](../interfaces/JWTStrategyOptions.md) = `{}`

#### Returns

`JWTStrategy`

#### Overrides

[`BaseAuthStrategy`](BaseAuthStrategy.md).[`constructor`](BaseAuthStrategy.md#constructor)

## Properties

### name

```ts
readonly name: "jwt" = "jwt";
```

Defined in: [src/core/auth/strategies/JWTStrategy.ts:96](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/auth/strategies/JWTStrategy.ts#L96)

Unique name for this strategy (must be implemented)

#### Overrides

[`BaseAuthStrategy`](BaseAuthStrategy.md).[`name`](BaseAuthStrategy.md#name)

***

### priority

```ts
readonly priority: number;
```

Defined in: [src/core/auth/strategies/JWTStrategy.ts:97](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/auth/strategies/JWTStrategy.ts#L97)

Default priority (can be overridden)
Lower numbers = higher priority

#### Overrides

[`BaseAuthStrategy`](BaseAuthStrategy.md).[`priority`](BaseAuthStrategy.md#priority)

## Methods

### authenticate()

```ts
authenticate(req): Promise<IAuthUser>;
```

Defined in: [src/core/auth/strategies/JWTStrategy.ts:174](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/auth/strategies/JWTStrategy.ts#L174)

Authenticate the request by verifying the JWT

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

Defined in: [src/core/auth/strategies/JWTStrategy.ts:153](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/auth/strategies/JWTStrategy.ts#L153)

Check if this strategy can handle the request
Returns true if the expected token source has a value

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

#### Inherited from

[`BaseAuthStrategy`](BaseAuthStrategy.md).[`extractBearerToken`](BaseAuthStrategy.md#extractbearertoken)

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

#### Inherited from

[`BaseAuthStrategy`](BaseAuthStrategy.md).[`extractCookieToken`](BaseAuthStrategy.md#extractcookietoken)

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

#### Inherited from

[`BaseAuthStrategy`](BaseAuthStrategy.md).[`extractQueryParam`](BaseAuthStrategy.md#extractqueryparam)

***

### generateToken()

```ts
generateToken(payload, options?): Promise<AuthCredentials>;
```

Defined in: [src/core/auth/strategies/JWTStrategy.ts:247](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/auth/strategies/JWTStrategy.ts#L247)

Generate a JWT token

#### Parameters

##### payload

[`GenerateTokenPayload`](../interfaces/GenerateTokenPayload.md)

##### options?

###### expiresIn?

`number`

#### Returns

`Promise`\<[`AuthCredentials`](../interfaces/AuthCredentials.md)\>

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

#### Inherited from

[`BaseAuthStrategy`](BaseAuthStrategy.md).[`getClientIp`](BaseAuthStrategy.md#getclientip)

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

#### Inherited from

[`BaseAuthStrategy`](BaseAuthStrategy.md).[`getUserAgent`](BaseAuthStrategy.md#getuseragent)

***

### verifyToken()

```ts
verifyToken(token): Promise<IAuthUser>;
```

Defined in: [src/core/auth/strategies/JWTStrategy.ts:336](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/auth/strategies/JWTStrategy.ts#L336)

Verify a token without request context

#### Parameters

##### token

`string`

#### Returns

`Promise`\<[`IAuthUser`](../interfaces/IAuthUser.md)\>
