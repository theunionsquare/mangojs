import { injectable, multiInject, optional } from "inversify";
import { Request } from "express";
import { IAuthStrategy, AUTH_STRATEGY_TAG } from "./strategies/IAuthStrategy";
import { AuthContext } from "./AuthContext";
import { AuthCredentials, GenerateTokenPayload } from "./types";
import { AuthenticationError } from "./errors/AuthenticationError";

/**
 * Registry for authentication strategies
 *
 * Uses Inversify's @multiInject to automatically collect all bound strategies.
 * Strategies are sorted by priority and tried in order during authentication.
 *
 * @module Authentication
 * @group Registry
 *
 * @example
 * ```typescript
 * // Bind strategies in your container
 * container.bind(AUTH_STRATEGY_TAG).to(JWTStrategy);
 * container.bind(AUTH_STRATEGY_TAG).to(ApiKeyStrategy);
 *
 * // Bind the registry
 * container.bind(INVERSITY_TYPES.AuthStrategyRegistry).to(AuthStrategyRegistry);
 *
 * // Use in middleware
 * const registry = container.get<AuthStrategyRegistry>(INVERSITY_TYPES.AuthStrategyRegistry);
 * const authContext = await registry.authenticate(req);
 * ```
 */
@injectable()
export class AuthStrategyRegistry {
  private strategies: IAuthStrategy[];

  constructor(
    @multiInject(AUTH_STRATEGY_TAG)
    @optional()
    strategies: IAuthStrategy[] = [],
  ) {
    // Sort strategies by priority (lower = higher priority)
    this.strategies = [...strategies].sort((a, b) => a.priority - b.priority);

    if (this.strategies.length > 0) {
      console.log(
        `[AuthStrategyRegistry] Registered ${this.strategies.length} strategies: ${this.strategies.map((s) => `${s.name}(${s.priority})`).join(", ")}`,
      );
    }
  }

  /**
   * Get all registered strategies (sorted by priority)
   */
  getStrategies(): readonly IAuthStrategy[] {
    return this.strategies;
  }

  /**
   * Get a strategy by name
   *
   * @param name - Strategy name
   * @returns Strategy or undefined if not found
   */
  getStrategy(name: string): IAuthStrategy | undefined {
    return this.strategies.find((s) => s.name === name);
  }

  /**
   * Check if a strategy is registered
   *
   * @param name - Strategy name
   */
  hasStrategy(name: string): boolean {
    return this.strategies.some((s) => s.name === name);
  }

  /**
   * Authenticate a request by trying strategies in priority order
   *
   * @param req - Express request object
   * @returns AuthContext with user info if authenticated, anonymous otherwise
   * @throws AuthenticationError if a strategy explicitly rejects (invalid token, etc.)
   *
   * @example
   * ```typescript
   * const authContext = await registry.authenticate(req);
   * if (authContext.isAuthenticated) {
   *   console.log(`User ${authContext.user.id} authenticated via ${authContext.strategy}`);
   * }
   * ```
   */
  async authenticate(req: Request): Promise<AuthContext> {
    for (const strategy of this.strategies) {
      // Skip if strategy cannot handle this request
      if (strategy.canHandle && !strategy.canHandle(req)) {
        continue;
      }

      try {
        const user = await strategy.authenticate(req);
        if (user) {
          return AuthContext.authenticated(user, strategy.name);
        }
      } catch (error) {
        // If strategy throws AuthenticationError, propagate it
        // This means credentials were present but invalid
        if (error instanceof AuthenticationError) {
          throw error;
        }

        // Log other errors but continue to next strategy
        console.error(
          `[AuthStrategyRegistry] Strategy ${strategy.name} error:`,
          error instanceof Error ? error.message : error,
        );
      }
    }

    // No strategy matched - return anonymous context
    return AuthContext.anonymous();
  }

  /**
   * Generate credentials using a specific strategy
   *
   * @param strategyName - Name of the strategy to use
   * @param payload - User data to encode
   * @param options - Additional options for token generation
   * @returns AuthCredentials with token(s)
   * @throws Error if strategy not found or doesn't support generation
   *
   * @example
   * ```typescript
   * const credentials = await registry.generateCredentials('jwt', {
   *   id: user.id,
   *   userType: 'ADMIN',
   *   email: user.email
   * });
   *
   * res.cookie(credentials.cookie.name, credentials.cookie.value, credentials.cookie.options);
   * ```
   */
  async generateCredentials(
    strategyName: string,
    payload: GenerateTokenPayload,
    options?: Record<string, any>,
  ): Promise<AuthCredentials> {
    const strategy = this.getStrategy(strategyName);

    if (!strategy) {
      throw new Error(`Strategy '${strategyName}' not found`);
    }

    if (!strategy.generateToken) {
      throw new Error(
        `Strategy '${strategyName}' does not support token generation`,
      );
    }

    return strategy.generateToken(payload, options);
  }

  /**
   * Verify a token using a specific strategy
   *
   * @param strategyName - Name of the strategy to use
   * @param token - Token to verify
   * @returns User info if valid, null if invalid
   */
  async verifyToken(strategyName: string, token: string): Promise<AuthContext> {
    const strategy = this.getStrategy(strategyName);

    if (!strategy) {
      throw new Error(`Strategy '${strategyName}' not found`);
    }

    if (!strategy.verifyToken) {
      throw new Error(
        `Strategy '${strategyName}' does not support token verification`,
      );
    }

    const user = await strategy.verifyToken(token);
    if (user) {
      return AuthContext.authenticated(user, strategyName);
    }

    return AuthContext.anonymous();
  }

  /**
   * Revoke a token using a specific strategy
   *
   * @param strategyName - Name of the strategy to use
   * @param token - Token to revoke
   * @returns true if revoked, false otherwise
   */
  async revokeToken(strategyName: string, token: string): Promise<boolean> {
    const strategy = this.getStrategy(strategyName);

    if (!strategy) {
      throw new Error(`Strategy '${strategyName}' not found`);
    }

    if (!strategy.revokeToken) {
      throw new Error(
        `Strategy '${strategyName}' does not support token revocation`,
      );
    }

    return strategy.revokeToken(token);
  }
}
