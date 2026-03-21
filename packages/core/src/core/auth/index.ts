/**
 * @module Authentication
 * @description Handles all authentication logic including login, JWT, and OAuth strategies.
 */

// Core types and interfaces
export * from "./types";

/**
 * @group Context
 */
export { AuthContext } from "./AuthContext";

/**
 * @group Registry
 */
export { AuthStrategyRegistry } from "./AuthStrategyRegistry";

// Errors
/**
 * @group Errors
 */
export { AuthenticationError } from "./errors/AuthenticationError";

// Strategy interfaces and base class
/**
 * @group Strategies
 */
export { IAuthStrategy, AUTH_STRATEGY_TAG } from "./strategies/IAuthStrategy";

/**
 * @group Strategies
 */
export { BaseAuthStrategy } from "./strategies/BaseAuthStrategy";

// Built-in strategies
/**
 * @group Strategies
 */
export { JWTStrategy } from "./strategies/JWTStrategy";

/**
 * @group Strategies
 */
export { ApiKeyStrategy } from "./strategies/ApiKeyStrategy";

// Permission utilities
export { patternToRegex, matchesPermissions } from "./permissions.utils";
