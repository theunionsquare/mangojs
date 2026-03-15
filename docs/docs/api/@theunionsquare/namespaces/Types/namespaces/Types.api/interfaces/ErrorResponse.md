---
sidebar_label: ErrorResponse
---

# Interface: ErrorResponse

Defined in: [src/core/types/api/index.ts:33](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/types/api/index.ts#L33)

Error API response.

## Extends

- [`BaseResponse`](BaseResponse.md)

## Properties

### error

```ts
error: object;
```

Defined in: [src/core/types/api/index.ts:35](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/types/api/index.ts#L35)

#### code?

```ts
optional code: string;
```

#### message

```ts
message: string;
```

***

### ok

```ts
ok: false;
```

Defined in: [src/core/types/api/index.ts:34](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/types/api/index.ts#L34)

#### Overrides

[`BaseResponse`](BaseResponse.md).[`ok`](BaseResponse.md#ok)

***

### requestId

```ts
requestId: string;
```

Defined in: [src/core/types/api/index.ts:19](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/types/api/index.ts#L19)

#### Inherited from

[`BaseResponse`](BaseResponse.md).[`requestId`](BaseResponse.md#requestid)

***

### timestamp

```ts
timestamp: string;
```

Defined in: [src/core/types/api/index.ts:18](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/types/api/index.ts#L18)

#### Inherited from

[`BaseResponse`](BaseResponse.md).[`timestamp`](BaseResponse.md#timestamp)
