---
sidebar_label: PaginatedResponse
---

# Interface: PaginatedResponse\<T\>

Defined in: [src/core/types/api/index.ts:71](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/types/api/index.ts#L71)

Paginated API response.

## Extends

- [`BaseResponse`](BaseResponse.md)

## Type Parameters

### T

`T`

## Properties

### data

```ts
data: PaginatedData<T>;
```

Defined in: [src/core/types/api/index.ts:73](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/types/api/index.ts#L73)

***

### ok

```ts
ok: true;
```

Defined in: [src/core/types/api/index.ts:72](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/types/api/index.ts#L72)

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
