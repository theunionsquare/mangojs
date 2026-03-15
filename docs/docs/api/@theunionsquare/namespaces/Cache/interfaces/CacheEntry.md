---
sidebar_label: CacheEntry
---

# Interface: CacheEntry\<T\>

Defined in: [src/core/cache/types.ts:5](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/cache/types.ts#L5)

Cache entry with expiration timestamp.

## Type Parameters

### T

`T`

The type of the cached value

## Properties

### expiresAt

```ts
expiresAt: number;
```

Defined in: [src/core/cache/types.ts:9](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/cache/types.ts#L9)

Expiration timestamp in milliseconds

***

### value

```ts
value: T;
```

Defined in: [src/core/cache/types.ts:7](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/cache/types.ts#L7)

The cached value
