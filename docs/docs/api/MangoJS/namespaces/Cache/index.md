---
sidebar_label: Cache
---

# Cache

## Classes

### Cache

Defined in: [src/core/cache/Cache.ts:43](https://github.com/theunionsquare/mangojs/blob/01e44709afb7c4e9e23a1365c81ac6e0d3e87cd1/src/core/cache/Cache.ts#L43)

Generic TTL cache with LRU eviction.

This cache stores any type of data with configurable expiration time (TTL).
Each entry has automatic expiration and the cache implements LRU eviction
when the maximum size is reached.

Features:
- Automatic expiration based on TTL
- LRU eviction when max size is reached
- Performance metrics (hit rate, cache size)
- Periodic cleanup of expired entries
- Generic type support for any cached value

#### Example

```typescript
// Create cache for validation results
interface ValidationResult {
  passed: boolean;
  reason?: string;
}

const cache = new Cache<ValidationResult>({
  ttl: 120000,  // 2 minutes
  maxSize: 5000
});

// Get cached result
const result = cache.get('cache-key');

// Set with custom TTL
cache.set('cache-key', { passed: true }, 300000); // 5 minutes

// Get statistics
const stats = cache.getStats();
console.log(`Hit rate: ${stats.hitRate.toFixed(2)}%`);
```

#### Type Parameters

##### T

`T` = `any`

The type of values stored in the cache

#### Constructors

##### Constructor

```ts
new Cache<T>(options?): Cache<T>;
```

Defined in: [src/core/cache/Cache.ts:50](https://github.com/theunionsquare/mangojs/blob/01e44709afb7c4e9e23a1365c81ac6e0d3e87cd1/src/core/cache/Cache.ts#L50)

###### Parameters

###### options?

[`CacheOptions`](#cacheoptions) = `{}`

###### Returns

[`Cache`](#cache)\<`T`\>

#### Accessors

##### size

###### Get Signature

```ts
get size(): number;
```

Defined in: [src/core/cache/Cache.ts:226](https://github.com/theunionsquare/mangojs/blob/01e44709afb7c4e9e23a1365c81ac6e0d3e87cd1/src/core/cache/Cache.ts#L226)

Get the current size of the cache.

###### Returns

`number`

Number of entries in cache

#### Methods

##### cleanExpired()

```ts
cleanExpired(): number;
```

Defined in: [src/core/cache/Cache.ts:189](https://github.com/theunionsquare/mangojs/blob/01e44709afb7c4e9e23a1365c81ac6e0d3e87cd1/src/core/cache/Cache.ts#L189)

Clean up expired entries.
Should be run periodically to prevent memory leaks.

###### Returns

`number`

Number of expired entries removed

##### clear()

```ts
clear(): void;
```

Defined in: [src/core/cache/Cache.ts:134](https://github.com/theunionsquare/mangojs/blob/01e44709afb7c4e9e23a1365c81ac6e0d3e87cd1/src/core/cache/Cache.ts#L134)

Clear all cached entries and reset statistics.

###### Returns

`void`

##### clearPattern()

```ts
clearPattern(pattern): number;
```

Defined in: [src/core/cache/Cache.ts:156](https://github.com/theunionsquare/mangojs/blob/01e44709afb7c4e9e23a1365c81ac6e0d3e87cd1/src/core/cache/Cache.ts#L156)

Clear cache entries matching a pattern.
Useful when specific data changes and related cache entries should be invalidated.

###### Parameters

###### pattern

`string`

String pattern to match keys (uses includes())

###### Returns

`number`

Number of entries removed

###### Example

```typescript
// Clear all entries for a specific user
cache.clearPattern('user:123:');

// Clear all entries for a specific resource
cache.clearPattern(':resource:posts');
```

##### delete()

```ts
delete(key): boolean;
```

Defined in: [src/core/cache/Cache.ts:127](https://github.com/theunionsquare/mangojs/blob/01e44709afb7c4e9e23a1365c81ac6e0d3e87cd1/src/core/cache/Cache.ts#L127)

Delete a specific cache entry.

###### Parameters

###### key

`string`

Cache key

###### Returns

`boolean`

true if entry was deleted, false if it didn't exist

##### get()

```ts
get(key): T;
```

Defined in: [src/core/cache/Cache.ts:63](https://github.com/theunionsquare/mangojs/blob/01e44709afb7c4e9e23a1365c81ac6e0d3e87cd1/src/core/cache/Cache.ts#L63)

Get cached value.
Returns undefined if not found or expired.

###### Parameters

###### key

`string`

Cache key

###### Returns

`T`

Cached value or undefined

##### getStats()

```ts
getStats(): CacheStats;
```

Defined in: [src/core/cache/Cache.ts:172](https://github.com/theunionsquare/mangojs/blob/01e44709afb7c4e9e23a1365c81ac6e0d3e87cd1/src/core/cache/Cache.ts#L172)

Get cache statistics including hit rate.

###### Returns

[`CacheStats`](#cachestats)

Cache statistics object

##### has()

```ts
has(key): boolean;
```

Defined in: [src/core/cache/Cache.ts:109](https://github.com/theunionsquare/mangojs/blob/01e44709afb7c4e9e23a1365c81ac6e0d3e87cd1/src/core/cache/Cache.ts#L109)

Check if a key exists in the cache and is not expired.

###### Parameters

###### key

`string`

Cache key

###### Returns

`boolean`

true if key exists and is not expired

##### keys()

```ts
keys(): string[];
```

Defined in: [src/core/cache/Cache.ts:217](https://github.com/theunionsquare/mangojs/blob/01e44709afb7c4e9e23a1365c81ac6e0d3e87cd1/src/core/cache/Cache.ts#L217)

Get all cache keys.
Useful for debugging and testing.

###### Returns

`string`[]

Array of all cache keys

##### resetStats()

```ts
resetStats(): void;
```

Defined in: [src/core/cache/Cache.ts:206](https://github.com/theunionsquare/mangojs/blob/01e44709afb7c4e9e23a1365c81ac6e0d3e87cd1/src/core/cache/Cache.ts#L206)

Reset statistics without clearing cache.

###### Returns

`void`

##### set()

```ts
set(
   key, 
   value, 
   ttl?): void;
```

Defined in: [src/core/cache/Cache.ts:90](https://github.com/theunionsquare/mangojs/blob/01e44709afb7c4e9e23a1365c81ac6e0d3e87cd1/src/core/cache/Cache.ts#L90)

Set cached value with TTL.
If cache is at max size, oldest entry is removed (LRU).

###### Parameters

###### key

`string`

Cache key

###### value

`T`

Value to cache

###### ttl?

`number`

Optional TTL in milliseconds (overrides default)

###### Returns

`void`

## Interfaces

### CacheEntry

Defined in: [src/core/cache/types.ts:5](https://github.com/theunionsquare/mangojs/blob/01e44709afb7c4e9e23a1365c81ac6e0d3e87cd1/src/core/cache/types.ts#L5)

Cache entry with expiration timestamp.

#### Type Parameters

##### T

`T`

The type of the cached value

#### Properties

##### expiresAt

```ts
expiresAt: number;
```

Defined in: [src/core/cache/types.ts:9](https://github.com/theunionsquare/mangojs/blob/01e44709afb7c4e9e23a1365c81ac6e0d3e87cd1/src/core/cache/types.ts#L9)

Expiration timestamp in milliseconds

##### value

```ts
value: T;
```

Defined in: [src/core/cache/types.ts:7](https://github.com/theunionsquare/mangojs/blob/01e44709afb7c4e9e23a1365c81ac6e0d3e87cd1/src/core/cache/types.ts#L7)

The cached value

***

### CacheOptions

Defined in: [src/core/cache/types.ts:15](https://github.com/theunionsquare/mangojs/blob/01e44709afb7c4e9e23a1365c81ac6e0d3e87cd1/src/core/cache/types.ts#L15)

Configuration options for Cache.

#### Properties

##### maxSize?

```ts
optional maxSize: number;
```

Defined in: [src/core/cache/types.ts:27](https://github.com/theunionsquare/mangojs/blob/01e44709afb7c4e9e23a1365c81ac6e0d3e87cd1/src/core/cache/types.ts#L27)

Maximum number of cache entries (prevents memory leaks).
When max is reached, oldest entries are removed (LRU).

###### Default

```ts
1000
```

##### ttl?

```ts
optional ttl: number;
```

Defined in: [src/core/cache/types.ts:20](https://github.com/theunionsquare/mangojs/blob/01e44709afb7c4e9e23a1365c81ac6e0d3e87cd1/src/core/cache/types.ts#L20)

Default time-to-live in milliseconds.

###### Default

```ts
60000 (1 minute)
```

***

### CacheStats

Defined in: [src/core/cache/types.ts:33](https://github.com/theunionsquare/mangojs/blob/01e44709afb7c4e9e23a1365c81ac6e0d3e87cd1/src/core/cache/types.ts#L33)

Cache statistics for monitoring and debugging.

#### Properties

##### hitRate

```ts
hitRate: number;
```

Defined in: [src/core/cache/types.ts:39](https://github.com/theunionsquare/mangojs/blob/01e44709afb7c4e9e23a1365c81ac6e0d3e87cd1/src/core/cache/types.ts#L39)

Hit rate as a percentage (0-100)

##### hits

```ts
hits: number;
```

Defined in: [src/core/cache/types.ts:35](https://github.com/theunionsquare/mangojs/blob/01e44709afb7c4e9e23a1365c81ac6e0d3e87cd1/src/core/cache/types.ts#L35)

Number of cache hits

##### maxSize

```ts
maxSize: number;
```

Defined in: [src/core/cache/types.ts:43](https://github.com/theunionsquare/mangojs/blob/01e44709afb7c4e9e23a1365c81ac6e0d3e87cd1/src/core/cache/types.ts#L43)

Maximum allowed entries

##### misses

```ts
misses: number;
```

Defined in: [src/core/cache/types.ts:37](https://github.com/theunionsquare/mangojs/blob/01e44709afb7c4e9e23a1365c81ac6e0d3e87cd1/src/core/cache/types.ts#L37)

Number of cache misses

##### size

```ts
size: number;
```

Defined in: [src/core/cache/types.ts:41](https://github.com/theunionsquare/mangojs/blob/01e44709afb7c4e9e23a1365c81ac6e0d3e87cd1/src/core/cache/types.ts#L41)

Current number of entries in cache
