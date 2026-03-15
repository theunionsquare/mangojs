[**MangoJS**](../../../../../../README.md)

***

# Function: clearUserCache()

```ts
function clearUserCache(cache, userId): number;
```

Defined in: [src/core/decorators/auth/core/authCacheUtils.ts:82](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/decorators/auth/core/authCacheUtils.ts#L82)

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
