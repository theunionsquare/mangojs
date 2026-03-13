import { Request } from "express";
import { IAuthUser, AuthCredentials, GenerateTokenPayload } from "../types";

/**
 * Symbol for multi-inject binding
 * Use this to bind multiple strategies to the container
 * @category Strategies
 * @example
 * ```typescript
 * container.bind(AUTH_STRATEGY_TAG).to(JWTStrategy);
 * container.bind(AUTH_STRATEGY_TAG).to(ApiKeyStrategy);
 * ```
 */
export const AUTH_STRATEGY_TAG = Symbol.for("AuthStrategy");

/**
 * Authentication strategy interface
 *
 * Implement this interface to create custom authentication mechanisms.
 * Strategies are tried in priority order (lower number = higher priority).
 * @category Strategies
 * @example
 * ```typescript
 * @injectable()
 * class MyCustomStrategy implements IAuthStrategy {
 *   readonly name = 'custom';
 *   readonly priority = 50;
 *
 *   async authenticate(req: Request): Promise<IAuthUser | null> {
 *     const token = req.headers['x-custom-token'];
 *     if (!token) return null;
 *
 *     const user = await this.validateToken(token);
 *     return user;
 *   }
 * }
 * ```
 */
export interface IAuthStrategy {
  /**
   * Unique name for this strategy
   * Used for logging and identification
   */
  readonly name: string;

  /**
   * Priority for strategy execution (lower = higher priority)
   * Strategies are tried in priority order until one succeeds
   *
   * Recommended ranges:
   * - 1-10: High priority (API keys, service tokens)
   * - 10-50: Normal priority (JWT, session)
   * - 50-100: Low priority (fallback strategies)
   */
  readonly priority: number;

  /**
   * Attempt to authenticate the request
   *
   * @param req - Express request object
   * @returns IAuthUser if successful, null if this strategy doesn't apply
   * @throws AuthenticationError for explicit failures (invalid token, expired, etc.)
   *
   * Return null when:
   * - The required credentials aren't present (no token, no cookie)
   * - The strategy simply doesn't apply to this request
   *
   * Throw AuthenticationError when:
   * - Credentials are present but invalid
   * - Token is expired
   * - Signature verification fails
   */
  authenticate(req: Request): Promise<IAuthUser | null>;

  /**
   * Optional: Generate credentials/tokens for a user
   * Not all strategies support token generation (e.g., session-based)
   *
   * @param payload - User data to encode in the token
   * @param options - Additional generation options
   * @returns AuthCredentials with token(s) and metadata
   */
  generateToken?(
    payload: GenerateTokenPayload,
    options?: Record<string, any>,
  ): Promise<AuthCredentials>;

  /**
   * Optional: Verify a token without the full request context
   * Useful for token validation in non-HTTP contexts
   *
   * @param token - The raw token string
   * @returns User info if valid, null if invalid
   */
  verifyToken?(token: string): Promise<IAuthUser | null>;

  /**
   * Optional: Revoke/invalidate a token
   * Useful for logout, token rotation, or blacklisting
   *
   * @param token - The token to revoke
   * @returns true if revoked, false if not found or already revoked
   */
  revokeToken?(token: string): Promise<boolean>;

  /**
   * Optional: Check if this strategy can handle this request
   * Use this for early filtering before attempting authentication
   *
   * @param req - Express request object
   * @returns false to skip this strategy entirely
   *
   * @example
   * ```typescript
   * canHandle(req: Request): boolean {
   *   // Only handle requests with X-API-Key header
   *   return !!req.headers['x-api-key'];
   * }
   * ```
   */
  canHandle?(req: Request): boolean;
}
