import crypto from "crypto";
import { Cache } from "../../../cache";
import { ValidationResult } from "./authOrchestrator";

/**
 * User context for cache key generation
 */
export interface UserCacheContext {
  userId?: string;
  userType?: string;
  groups?: string[];
}

/**
 * Generate cache key for validation result.
 *
 * The cache key is composed of:
 * - User identifier (userId or 'anonymous')
 * - User type
 * - Groups hash (MD5 hash of sorted groups for consistent key)
 * - Method name
 * - Validator name
 *
 * This ensures that:
 * - Different users get different cache entries
 * - Same user with different permissions gets different cache entries
 * - Same validation on different methods uses different cache entries
 *
 * @param userContext - User context information
 * @param methodName - Method/endpoint name
 * @param validatorName - Name of the validator
 * @returns Cache key string
 *
 * @example
 * ```typescript
 * const key = generateCacheKey(
 *   {
 *     userId: '123',
 *     userType: 'PARTNER',
 *     groups: ['partner_admin', 'partner_user']
 *   },
 *   'getPartnerUsers',
 *   'HasUserType([PARTNER])'
 * );
 * // Result: "auth:user:123:PARTNER:a1b2c3d4:getPartnerUsers:HasUserType([PARTNER])"
 * ```
 */
export function generateCacheKey(
  userContext: UserCacheContext,
  methodName: string | symbol,
  validatorName: string
): string {
  // Create user identifier
  const userId = userContext.userId || "anonymous";
  const userType = userContext.userType || "unknown";

  // Hash groups for shorter key (groups can be long)
  // Sort groups to ensure consistent hash regardless of order
  const groupsHash =
    userContext.groups && userContext.groups.length > 0
      ? crypto
          .createHash("md5")
          .update(JSON.stringify(userContext.groups.sort()))
          .digest("hex")
          .substring(0, 8)
      : "none";

  // Combine into cache key
  return `auth:user:${userId}:${userType}:${groupsHash}:${String(
    methodName
  )}:${validatorName}`;
}

/**
 * Clear cache entries for a specific user.
 * Useful when user permissions change.
 *
 * @param cache - Cache instance to clear from
 * @param userId - User identifier
 * @returns Number of entries removed
 */
export function clearUserCache(
  cache: Cache<ValidationResult>,
  userId: string
): number {
  return cache.clearPattern(`user:${userId}:`);
}

/**
 * Singleton cache instance for authorization results.
 * Use this instance throughout your application.
 *
 * @example
 * ```typescript
 * import { authCache } from '@giusmento/mangojs-core';
 *
 * // Get cache statistics
 * const stats = authCache.getStats();
 *
 * // Clear cache for specific user
 * import { clearUserCache } from '@giusmento/mangojs-core';
 * clearUserCache(authCache, 'user-123');
 *
 * // Clear entire cache
 * authCache.clear();
 * ```
 */
export const authCache = new Cache<ValidationResult>();
