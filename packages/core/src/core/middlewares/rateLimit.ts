import type { Request, RequestHandler } from "express";
import { rateLimit } from "express-rate-limit";
import type { IncrementResponse, Options, Store } from "express-rate-limit";
import { Redis } from "ioredis";
import { APIError } from "../errors/baseErrors";
import { errorHandler } from "../errors/errorHandler";
import type { RedisConfig } from "../queue/types";

/**
 * Configuration for a MangoJS rate limiter.
 */
export interface RateLimitOptions {
  /** How long to remember requests, in milliseconds. */
  windowMs: number;
  /** Maximum number of requests allowed per window, per key. */
  limit: number;
  /**
   * Derives the bucket key for a request. Defaults to the client IP.
   * Combine the IP with an account identifier (email, user id) so a single
   * shared IP isn't globally locked out while per-account attempts still
   * stay capped.
   */
  keyGenerator?: (req: Request) => string;
  /** Only count failed (>=400) responses toward the limit. */
  skipFailedRequests?: boolean;
  /** Only count successful (<400) responses toward the limit. */
  skipSuccessfulRequests?: boolean;
  /**
   * Redis connection to share the limit across every instance of a
   * service. Omit to fall back to an in-memory store (per-process only).
   */
  redis?: RedisConfig;
  /** Namespaces the Redis keys when several limiters share one Redis instance. */
  storeKeyPrefix?: string;
}

const redisClients = new Map<string, Redis>();

function getSharedRedisClient(config: RedisConfig): Redis {
  const cacheKey = `${config.host}:${config.port}:${config.db ?? 0}`;
  let client = redisClients.get(cacheKey);
  if (!client) {
    client = new Redis({
      host: config.host,
      port: config.port,
      password: config.password,
      db: config.db,
      maxRetriesPerRequest: 3,
    });
    redisClients.set(cacheKey, client);
  }
  return client;
}

/**
 * express-rate-limit Store backed by Redis, so a limit is shared across
 * every instance of a service instead of tracked per-process.
 */
class RedisStore implements Store {
  windowMs = 60_000;
  client: Redis;
  prefix: string;

  constructor(client: Redis, prefix: string) {
    this.client = client;
    this.prefix = prefix;
  }

  init(options: Options): void {
    this.windowMs = options.windowMs;
  }

  private key(key: string): string {
    return `mangojs:rate-limit:${this.prefix}:${key}`;
  }

  async increment(key: string): Promise<IncrementResponse> {
    const redisKey = this.key(key);
    const totalHits = await this.client.incr(redisKey);
    if (totalHits === 1) {
      await this.client.pexpire(redisKey, this.windowMs);
    }
    const ttl = await this.client.pttl(redisKey);
    return {
      totalHits,
      resetTime: new Date(Date.now() + (ttl > 0 ? ttl : this.windowMs)),
    };
  }

  async decrement(key: string): Promise<void> {
    await this.client.decr(this.key(key));
  }

  async resetKey(key: string): Promise<void> {
    await this.client.del(this.key(key));
  }
}

/**
 * Creates a rate-limiting Express middleware with MangoJS's standard error
 * response shape (via `Errors.errorHandler`, so a 429 looks like every
 * other API error). Use it directly with `.expressUse(...)` for an
 * app-wide limit, or via the `@RateLimit` decorator for a single route.
 *
 * @example
 * // App-wide, in-memory
 * new ServerBuilder().expressUse(
 *   Middlewares.rateLimit.createRateLimiter({ windowMs: 15 * 60_000, limit: 100 }),
 * );
 *
 * @example
 * // Per-route, keyed by account, shared across instances via Redis
 * class AuthController {
 *   @Post("/login")
 *   @RateLimit({
 *     windowMs: 15 * 60_000,
 *     limit: 10,
 *     skipSuccessfulRequests: true,
 *     keyGenerator: (req) => `${req.ip}:${req.body.email}`,
 *     redis: { host: "localhost", port: 6379 },
 *     storeKeyPrefix: "auth-login",
 *   })
 *   public async login() { ... }
 * }
 */
export function createRateLimiter(options: RateLimitOptions): RequestHandler {
  const store = options.redis
    ? new RedisStore(
        getSharedRedisClient(options.redis),
        options.storeKeyPrefix ?? "default",
      )
    : undefined;

  return rateLimit({
    windowMs: options.windowMs,
    limit: options.limit,
    standardHeaders: true,
    legacyHeaders: false,
    skipFailedRequests: options.skipFailedRequests,
    skipSuccessfulRequests: options.skipSuccessfulRequests,
    keyGenerator: options.keyGenerator ?? ((req) => req.ip ?? "unknown"),
    store,
    handler: (_req, res) => {
      errorHandler(
        res,
        new APIError(
          429,
          "RATE_LIMIT_EXCEEDED",
          "Too many requests. Please try again later.",
        ),
      );
    },
  });
}
