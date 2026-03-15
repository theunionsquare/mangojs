---
sidebar_label: CacheOptions
---

# Interface: CacheOptions

Defined in: [src/core/cache/types.ts:15](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/cache/types.ts#L15)

Configuration options for Cache.

## Properties

### maxSize?

```ts
optional maxSize: number;
```

Defined in: [src/core/cache/types.ts:27](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/cache/types.ts#L27)

Maximum number of cache entries (prevents memory leaks).
When max is reached, oldest entries are removed (LRU).

#### Default

```ts
1000
```

***

### ttl?

```ts
optional ttl: number;
```

Defined in: [src/core/cache/types.ts:20](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/cache/types.ts#L20)

Default time-to-live in milliseconds.

#### Default

```ts
60000 (1 minute)
```
