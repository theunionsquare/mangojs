[**MangoJS**](../../../../README.md)

***

# Interface: AuthCredentials

Defined in: [src/core/auth/types.ts:94](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/auth/types.ts#L94)

Standardized token generation response
All strategies return this format for consistency

## Properties

### accessToken

```ts
accessToken: string;
```

Defined in: [src/core/auth/types.ts:96](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/auth/types.ts#L96)

The access token

***

### cookie?

```ts
optional cookie: object;
```

Defined in: [src/core/auth/types.ts:111](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/auth/types.ts#L111)

Cookie configuration (for cookie-based tokens)

#### name

```ts
name: string;
```

#### options

```ts
options: AuthCookieOptions;
```

#### value

```ts
value: string;
```

***

### expiresAt?

```ts
optional expiresAt: Date;
```

Defined in: [src/core/auth/types.ts:108](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/auth/types.ts#L108)

Absolute expiration time

***

### expiresIn?

```ts
optional expiresIn: number;
```

Defined in: [src/core/auth/types.ts:105](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/auth/types.ts#L105)

Time until expiration in seconds

***

### metadata?

```ts
optional metadata: Record<string, any>;
```

Defined in: [src/core/auth/types.ts:118](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/auth/types.ts#L118)

Additional metadata

***

### refreshToken?

```ts
optional refreshToken: string;
```

Defined in: [src/core/auth/types.ts:102](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/auth/types.ts#L102)

Optional refresh token

***

### tokenType

```ts
tokenType: string;
```

Defined in: [src/core/auth/types.ts:99](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/auth/types.ts#L99)

Type of token (Bearer, Cookie, ApiKey, or custom)
