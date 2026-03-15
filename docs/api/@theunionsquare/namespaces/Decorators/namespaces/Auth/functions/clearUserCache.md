# Function: clearUserCache()

```ts
function clearUserCache(cache, userId): number;
```

Defined in: [src/core/decorators/auth/core/authCacheUtils.ts:82](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/decorators/auth/core/authCacheUtils.ts#L82)

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
