---
sidebar_label: JWTStrategyOptions
---

# Interface: JWTStrategyOptions

Defined in: [src/core/auth/types.ts:124](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/auth/types.ts#L124)

JWT Strategy configuration options

## Properties

### algorithm?

```ts
optional algorithm: 
  | "HS256"
  | "HS384"
  | "HS512"
  | "RS256"
  | "RS384"
  | "RS512"
  | "ES256"
  | "ES384"
  | "ES512";
```

Defined in: [src/core/auth/types.ts:139](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/auth/types.ts#L139)

JWT algorithm to use

***

### audience?

```ts
optional audience: string | string[];
```

Defined in: [src/core/auth/types.ts:159](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/auth/types.ts#L159)

Token audience (aud claim)

***

### clockTolerance?

```ts
optional clockTolerance: number;
```

Defined in: [src/core/auth/types.ts:195](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/auth/types.ts#L195)

Clock tolerance for expiration checks in seconds

***

### cookie?

```ts
optional cookie: AuthCookieOptions;
```

Defined in: [src/core/auth/types.ts:178](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/auth/types.ts#L178)

Cookie options when generating tokens

***

### cookieName?

```ts
optional cookieName: string;
```

Defined in: [src/core/auth/types.ts:173](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/auth/types.ts#L173)

Cookie name (default: 'auth_token')

***

### expiresIn?

```ts
optional expiresIn: number;
```

Defined in: [src/core/auth/types.ts:153](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/auth/types.ts#L153)

Token expiration time in seconds (default: 3600)

***

### extractFrom?

```ts
optional extractFrom: "header" | "cookie" | "both";
```

Defined in: [src/core/auth/types.ts:164](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/auth/types.ts#L164)

Where to extract the token from

***

### headerName?

```ts
optional headerName: string;
```

Defined in: [src/core/auth/types.ts:167](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/auth/types.ts#L167)

Header name (default: 'Authorization')

***

### headerScheme?

```ts
optional headerScheme: string;
```

Defined in: [src/core/auth/types.ts:170](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/auth/types.ts#L170)

Header scheme (default: 'Bearer')

***

### ignoreExpiration?

```ts
optional ignoreExpiration: boolean;
```

Defined in: [src/core/auth/types.ts:198](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/auth/types.ts#L198)

Ignore token expiration (not recommended for production)

***

### issuer?

```ts
optional issuer: string;
```

Defined in: [src/core/auth/types.ts:156](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/auth/types.ts#L156)

Token issuer (iss claim)

***

### privateKey?

```ts
optional privateKey: string;
```

Defined in: [src/core/auth/types.ts:134](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/auth/types.ts#L134)

Private key for asymmetric algorithms (RS256, ES256)

***

### publicKey?

```ts
optional publicKey: string;
```

Defined in: [src/core/auth/types.ts:131](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/auth/types.ts#L131)

Public key for asymmetric algorithms (RS256, ES256)

***

### refreshToken?

```ts
optional refreshToken: object;
```

Defined in: [src/core/auth/types.ts:183](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/auth/types.ts#L183)

Refresh token configuration

#### cookieName?

```ts
optional cookieName: string;
```

Refresh token cookie name

#### enabled

```ts
enabled: boolean;
```

Enable refresh token generation

#### expiresIn?

```ts
optional expiresIn: number;
```

Refresh token expiration in seconds (default: 604800 = 7 days)

***

### secret?

```ts
optional secret: string;
```

Defined in: [src/core/auth/types.ts:128](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/auth/types.ts#L128)

Secret for symmetric algorithms (HS256, HS384, HS512)
