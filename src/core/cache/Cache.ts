/**
 * Cache entry with expiration timestamp
 */
export interface CacheEntry<T> {
  value: T;
  expiresAt: number; // Timestamp in milliseconds
}

/**
 * Configuration options for Cache
 */
export interface CacheOptions {
  /**
   * Default time-to-live in milliseconds
   * @default 60000 (1 minute)
   */
  ttl?: number;

  /**
   * Maximum number of cache entries (prevents memory leaks)
   * When max is reached, oldest entries are removed (LRU)
   * @default 1000
   */
  maxSize?: number;
}

/**
 * Cache statistics
 */
export interface CacheStats {
  hits: number;
  misses: number;
  hitRate: number;
  size: number;
  maxSize: number;
}

/**
 * Generic TTL cache with LRU eviction.
 *
 * This cache stores any type of data with configurable expiration time (TTL).
 * Each entry has automatic expiration and the cache implements LRU eviction
 * when the maximum size is reached.
 *
 * Features:
 * - Automatic expiration based on TTL
 * - LRU eviction when max size is reached
 * - Performance metrics (hit rate, cache size)
 * - Periodic cleanup of expired entries
 * - Generic type support for any cached value
 *
 * @template T - The type of values stored in the cache
 *
 * @example
 * ```typescript
 * // Create cache for validation results
 * interface ValidationResult {
 *   passed: boolean;
 *   reason?: string;
 * }
 *
 * const cache = new Cache<ValidationResult>({
 *   ttl: 120000,  // 2 minutes
 *   maxSize: 5000
 * });
 *
 * // Get cached result
 * const result = cache.get('cache-key');
 *
 * // Set with custom TTL
 * cache.set('cache-key', { passed: true }, 300000); // 5 minutes
 *
 * // Get statistics
 * const stats = cache.getStats();
 * console.log(`Hit rate: ${stats.hitRate.toFixed(2)}%`);
 * ```
 */
export class Cache<T = any> {
  private cache: Map<string, CacheEntry<T>>;
  private defaultTTL: number;
  private maxSize: number;
  private hits: number = 0;
  private misses: number = 0;

  constructor(options: CacheOptions = {}) {
    this.cache = new Map();
    this.defaultTTL = options.ttl || 60000; // Default 1 minute
    this.maxSize = options.maxSize || 1000; // Default max 1000 entries
  }

  /**
   * Get cached value.
   * Returns undefined if not found or expired.
   *
   * @param key - Cache key
   * @returns Cached value or undefined
   */
  get(key: string): T | undefined {
    const entry = this.cache.get(key);

    if (!entry) {
      this.misses++;
      return undefined;
    }

    // Check if expired
    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      this.misses++;
      return undefined;
    }

    this.hits++;
    return entry.value;
  }

  /**
   * Set cached value with TTL.
   * If cache is at max size, oldest entry is removed (LRU).
   *
   * @param key - Cache key
   * @param value - Value to cache
   * @param ttl - Optional TTL in milliseconds (overrides default)
   */
  set(key: string, value: T, ttl?: number): void {
    // Enforce max size (simple LRU: remove oldest)
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      if (firstKey) {
        this.cache.delete(firstKey);
      }
    }

    const expiresAt = Date.now() + (ttl || this.defaultTTL);
    this.cache.set(key, { value, expiresAt });
  }

  /**
   * Check if a key exists in the cache and is not expired.
   *
   * @param key - Cache key
   * @returns true if key exists and is not expired
   */
  has(key: string): boolean {
    const entry = this.cache.get(key);
    if (!entry) return false;

    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return false;
    }

    return true;
  }

  /**
   * Delete a specific cache entry.
   *
   * @param key - Cache key
   * @returns true if entry was deleted, false if it didn't exist
   */
  delete(key: string): boolean {
    return this.cache.delete(key);
  }

  /**
   * Clear all cached entries and reset statistics.
   */
  clear(): void {
    this.cache.clear();
    this.hits = 0;
    this.misses = 0;
  }

  /**
   * Clear cache entries matching a pattern.
   * Useful when specific data changes and related cache entries should be invalidated.
   *
   * @param pattern - String pattern to match keys (uses includes())
   * @returns Number of entries removed
   *
   * @example
   * ```typescript
   * // Clear all entries for a specific user
   * cache.clearPattern('user:123:');
   *
   * // Clear all entries for a specific resource
   * cache.clearPattern(':resource:posts');
   * ```
   */
  clearPattern(pattern: string): number {
    let removed = 0;
    for (const [key, _] of this.cache) {
      if (key.includes(pattern)) {
        this.cache.delete(key);
        removed++;
      }
    }
    return removed;
  }

  /**
   * Get cache statistics including hit rate.
   *
   * @returns Cache statistics object
   */
  getStats(): CacheStats {
    const total = this.hits + this.misses;
    return {
      hits: this.hits,
      misses: this.misses,
      hitRate: total > 0 ? (this.hits / total) * 100 : 0,
      size: this.cache.size,
      maxSize: this.maxSize,
    };
  }

  /**
   * Clean up expired entries.
   * Should be run periodically to prevent memory leaks.
   *
   * @returns Number of expired entries removed
   */
  cleanExpired(): number {
    const now = Date.now();
    let removed = 0;

    for (const [key, entry] of this.cache) {
      if (now > entry.expiresAt) {
        this.cache.delete(key);
        removed++;
      }
    }

    return removed;
  }

  /**
   * Reset statistics without clearing cache.
   */
  resetStats(): void {
    this.hits = 0;
    this.misses = 0;
  }

  /**
   * Get all cache keys.
   * Useful for debugging and testing.
   *
   * @returns Array of all cache keys
   */
  keys(): string[] {
    return Array.from(this.cache.keys());
  }

  /**
   * Get the current size of the cache.
   *
   * @returns Number of entries in cache
   */
  get size(): number {
    return this.cache.size;
  }
}
