[**MangoJS**](../../../../README.md)

***

# Interface: CacheOptions

Defined in: src/core/cache/types.ts:15

Configuration options for Cache.

## Properties

### maxSize?

```ts
optional maxSize: number;
```

Defined in: src/core/cache/types.ts:27

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

Defined in: src/core/cache/types.ts:20

Default time-to-live in milliseconds.

#### Default

```ts
60000 (1 minute)
```
