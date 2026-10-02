---
sidebar_label: rateLimit
---

# rateLimit

## Interfaces

### RateLimitOptions

Defined in: [packages/core/src/core/middlewares/rateLimit.ts:12](https://github.com/theunionsquare/mangojs/blob/43379e6b8ea215df9ec2c15fdcb010f216ceb499/packages/core/src/core/middlewares/rateLimit.ts#L12)

Configuration for a MangoJS rate limiter.

#### Properties

##### keyGenerator()?

```ts
optional keyGenerator: (req) => string;
```

Defined in: [packages/core/src/core/middlewares/rateLimit.ts:23](https://github.com/theunionsquare/mangojs/blob/43379e6b8ea215df9ec2c15fdcb010f216ceb499/packages/core/src/core/middlewares/rateLimit.ts#L23)

Derives the bucket key for a request. Defaults to the client IP.
Combine the IP with an account identifier (email, user id) so a single
shared IP isn't globally locked out while per-account attempts still
stay capped.

###### Parameters

###### req

`Request`

###### Returns

`string`

##### limit

```ts
limit: number;
```

Defined in: [packages/core/src/core/middlewares/rateLimit.ts:16](https://github.com/theunionsquare/mangojs/blob/43379e6b8ea215df9ec2c15fdcb010f216ceb499/packages/core/src/core/middlewares/rateLimit.ts#L16)

Maximum number of requests allowed per window, per key.

##### redis?

```ts
optional redis: RedisConfig;
```

Defined in: [packages/core/src/core/middlewares/rateLimit.ts:32](https://github.com/theunionsquare/mangojs/blob/43379e6b8ea215df9ec2c15fdcb010f216ceb499/packages/core/src/core/middlewares/rateLimit.ts#L32)

Redis connection to share the limit across every instance of a
service. Omit to fall back to an in-memory store (per-process only).

##### skipFailedRequests?

```ts
optional skipFailedRequests: boolean;
```

Defined in: [packages/core/src/core/middlewares/rateLimit.ts:25](https://github.com/theunionsquare/mangojs/blob/43379e6b8ea215df9ec2c15fdcb010f216ceb499/packages/core/src/core/middlewares/rateLimit.ts#L25)

Only count failed (\>=400) responses toward the limit.

##### skipSuccessfulRequests?

```ts
optional skipSuccessfulRequests: boolean;
```

Defined in: [packages/core/src/core/middlewares/rateLimit.ts:27](https://github.com/theunionsquare/mangojs/blob/43379e6b8ea215df9ec2c15fdcb010f216ceb499/packages/core/src/core/middlewares/rateLimit.ts#L27)

Only count successful (\<400) responses toward the limit.

##### storeKeyPrefix?

```ts
optional storeKeyPrefix: string;
```

Defined in: [packages/core/src/core/middlewares/rateLimit.ts:34](https://github.com/theunionsquare/mangojs/blob/43379e6b8ea215df9ec2c15fdcb010f216ceb499/packages/core/src/core/middlewares/rateLimit.ts#L34)

Namespaces the Redis keys when several limiters share one Redis instance.

##### windowMs

```ts
windowMs: number;
```

Defined in: [packages/core/src/core/middlewares/rateLimit.ts:14](https://github.com/theunionsquare/mangojs/blob/43379e6b8ea215df9ec2c15fdcb010f216ceb499/packages/core/src/core/middlewares/rateLimit.ts#L14)

How long to remember requests, in milliseconds.

## Functions

### createRateLimiter()

```ts
function createRateLimiter(options): RequestHandler;
```

Defined in: [packages/core/src/core/middlewares/rateLimit.ts:126](https://github.com/theunionsquare/mangojs/blob/43379e6b8ea215df9ec2c15fdcb010f216ceb499/packages/core/src/core/middlewares/rateLimit.ts#L126)

Creates a rate-limiting Express middleware with MangoJS's standard error
response shape (via `Errors.errorHandler`, so a 429 looks like every
other API error). Use it directly with `.expressUse(...)` for an
app-wide limit, or via the `@RateLimit` decorator for a single route.

#### Parameters

##### options

[`RateLimitOptions`](#ratelimitoptions)

#### Returns

`RequestHandler`

#### Examples

```ts
// App-wide, in-memory
new ServerBuilder().expressUse(
  Middlewares.rateLimit.createRateLimiter({ windowMs: 15 * 60_000, limit: 100 }),
);
```

```ts
// Per-route, keyed by account, shared across instances via Redis
class AuthController {
  @Post("/login")
  @RateLimit({
    windowMs: 15 * 60_000,
    limit: 10,
    skipSuccessfulRequests: true,
    keyGenerator: (req) => `${req.ip}:${req.body.email}`,
    redis: { host: "localhost", port: 6379 },
    storeKeyPrefix: "auth-login",
  })
  public async login() { ... }
}
```
