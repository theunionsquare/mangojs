# Variable: authCache

```ts
const authCache: Cache<ValidationResult>;
```

Defined in: [src/core/decorators/auth/core/authCacheUtils.ts:108](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/decorators/auth/core/authCacheUtils.ts#L108)

Singleton cache instance for authorization results.
Use this instance throughout your application.

## Example

```typescript
import { authCache } from '@giusmento/mangojs-core';

// Get cache statistics
const stats = authCache.getStats();

// Clear cache for specific user
import { clearUserCache } from '@giusmento/mangojs-core';
clearUserCache(authCache, 'user-123');

// Clear entire cache
authCache.clear();
```
