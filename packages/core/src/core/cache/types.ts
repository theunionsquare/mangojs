/**
 * Cache entry with expiration timestamp.
 * @template T - The type of the cached value
 */
export interface CacheEntry<T> {
  /** The cached value */
  value: T;
  /** Expiration timestamp in milliseconds */
  expiresAt: number;
}

/**
 * Configuration options for Cache.
 */
export interface CacheOptions {
  /**
   * Default time-to-live in milliseconds.
   * @default 60000 (1 minute)
   */
  ttl?: number;

  /**
   * Maximum number of cache entries (prevents memory leaks).
   * When max is reached, oldest entries are removed (LRU).
   * @default 1000
   */
  maxSize?: number;
}

/**
 * Cache statistics for monitoring and debugging.
 */
export interface CacheStats {
  /** Number of cache hits */
  hits: number;
  /** Number of cache misses */
  misses: number;
  /** Hit rate as a percentage (0-100) */
  hitRate: number;
  /** Current number of entries in cache */
  size: number;
  /** Maximum allowed entries */
  maxSize: number;
}
