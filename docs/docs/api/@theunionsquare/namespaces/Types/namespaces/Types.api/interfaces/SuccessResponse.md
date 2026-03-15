---
sidebar_label: SuccessResponse
---

# Interface: SuccessResponse\<T\>

Defined in: [src/core/types/api/index.ts:25](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/types/api/index.ts#L25)

Successful API response with typed data.

## Extends

- [`BaseResponse`](BaseResponse.md)

## Type Parameters

### T

`T` = `unknown`

## Properties

### data

```ts
data: T;
```

Defined in: [src/core/types/api/index.ts:27](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/types/api/index.ts#L27)

***

### ok

```ts
ok: true;
```

Defined in: [src/core/types/api/index.ts:26](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/types/api/index.ts#L26)

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
