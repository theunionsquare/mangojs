/**
 * Generic caching utilities
 *
 * This module provides a generic TTL cache implementation with LRU eviction.
 * The cache can be used for any type of data and supports:
 * - Automatic expiration based on TTL
 * - LRU eviction when max size is reached
 * - Performance metrics and statistics
 * - Pattern-based cache invalidation
 *
 * @example
 * ```typescript
 * import { Cache } from '@giusmento/mangojs-core';
 *
 * // Create a cache for user data
 * const userCache = new Cache<UserData>({
 *   ttl: 300000,  // 5 minutes
 *   maxSize: 10000
 * });
 *
 * // Use the cache
 * userCache.set('user:123', userData);
 * const cached = userCache.get('user:123');
 *
 * // Get statistics
 * const stats = userCache.getStats();
 * console.log(`Cache hit rate: ${stats.hitRate.toFixed(2)}%`);
 * ```
 */

export { Cache, CacheEntry, CacheOptions, CacheStats } from "./Cache";
