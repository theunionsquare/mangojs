/**
 * @module Authentication
 * @description Handles all authentication logic including login, JWT, and OAuth strategies.
 */

// Core types and interfaces
export * from "./types.js";

/**
 * @group Context
 */
export { AuthContext } from "./AuthContext.js";

/**
 * @group Registry
 */
export { AuthStrategyRegistry } from "./AuthStrategyRegistry.js";

// Errors
/**
 * @group Errors
 */
export { AuthenticationError } from "./errors/AuthenticationError.js";

// Strategy interfaces and base class
/**
 * @group Strategies
 */
export type { IAuthStrategy } from "./strategies/IAuthStrategy.js";
export { AUTH_STRATEGY_TAG } from "./strategies/IAuthStrategy.js";

/**
 * @group Strategies
 */
export { BaseAuthStrategy } from "./strategies/BaseAuthStrategy.js";

// Built-in strategies
/**
 * @group Strategies
 */
export { JWTStrategy } from "./strategies/JWTStrategy.js";

/**
 * @group Strategies
 */
export { ApiKeyStrategy } from "./strategies/ApiKeyStrategy.js";

// Permission utilities
export { patternToRegex, matchesPermissions } from "./permissions.utils.js";
