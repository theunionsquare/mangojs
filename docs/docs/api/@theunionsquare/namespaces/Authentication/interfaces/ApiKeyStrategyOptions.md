---
sidebar_label: ApiKeyStrategyOptions
---

# Interface: ApiKeyStrategyOptions

Defined in: [src/core/auth/types.ts:204](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/auth/types.ts#L204)

API Key Strategy configuration options

## Properties

### headerName?

```ts
optional headerName: string;
```

Defined in: [src/core/auth/types.ts:206](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/auth/types.ts#L206)

Header name to extract API key from (default: 'X-API-Key')

***

### queryParam?

```ts
optional queryParam: string;
```

Defined in: [src/core/auth/types.ts:209](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/auth/types.ts#L209)

Query parameter name (optional, for fallback)

***

### validator()

```ts
validator: (apiKey, req) => Promise<IAuthUser>;
```

Defined in: [src/core/auth/types.ts:217](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/auth/types.ts#L217)

Validation function to verify the API key and return user info

#### Parameters

##### apiKey

`string`

The API key from the request

##### req

`Request`

The Express request object

#### Returns

`Promise`\<[`IAuthUser`](IAuthUser.md)\>

User info if valid, null if invalid
