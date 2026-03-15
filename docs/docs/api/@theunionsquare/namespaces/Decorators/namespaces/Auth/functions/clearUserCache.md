---
sidebar_label: clearUserCache
---

# Function: clearUserCache()

```ts
function clearUserCache(cache, userId): number;
```

Defined in: [src/core/decorators/auth/core/authCacheUtils.ts:82](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/decorators/auth/core/authCacheUtils.ts#L82)

Clear cache entries for a specific user.
Useful when user permissions change.

## Parameters

### cache

[`Cache`](../../../../Cache/classes/Cache.md)\<`ValidationResult`\>

Cache instance to clear from

### userId

`string`

User identifier

## Returns

`number`

Number of entries removed
