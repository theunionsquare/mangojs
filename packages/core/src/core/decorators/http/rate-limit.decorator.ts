import { Middleware } from "./middleware.decorator.js";
import {
  createRateLimiter,
  RateLimitOptions,
} from "../../middlewares/rateLimit.js";

/**
 * Applies a rate limit to a single route, using MangoJS's standard error
 * response shape for the 429.
 *
 * @example
 * class AuthController {
 *   @Post("/login")
 *   @RateLimit({ windowMs: 15 * 60_000, limit: 10, skipSuccessfulRequests: true })
 *   public async login() { ... }
 * }
 */
export function RateLimit(options: RateLimitOptions): MethodDecorator {
  return Middleware(createRateLimiter(options));
}
