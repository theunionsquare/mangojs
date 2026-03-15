# Function: generateCacheKey()

```ts
function generateCacheKey(
   userContext, 
   methodName, 
   validatorName): string;
```

Defined in: [src/core/decorators/auth/core/authCacheUtils.ts:48](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/decorators/auth/core/authCacheUtils.ts#L48)

Generate cache key for validation result.

The cache key is composed of:
- User identifier (userId or 'anonymous')
- User type
- Groups hash (MD5 hash of sorted groups for consistent key)
- Method name
- Validator name

This ensures that:
- Different users get different cache entries
- Same user with different permissions gets different cache entries
- Same validation on different methods uses different cache entries

## Parameters

### userContext

[`UserCacheContext`](../interfaces/UserCacheContext.md)

User context information

### methodName

Method/endpoint name

`string` | `symbol`

### validatorName

`string`

Name of the validator

## Returns

`string`

Cache key string

## Example

```typescript
const key = generateCacheKey(
  {
    userId: '123',
    userType: 'PARTNER',
    groups: ['partner_admin', 'partner_user']
  },
  'getPartnerUsers',
  'HasUserType([PARTNER])'
);
// Result: "auth:user:123:PARTNER:a1b2c3d4:getPartnerUsers:HasUserType([PARTNER])"
```
