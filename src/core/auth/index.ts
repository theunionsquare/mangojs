// =============================================================================
// NEW: Strategy-based Authentication System
// =============================================================================

// Core types and interfaces
export * from "./types";
export { AuthContext } from "./AuthContext";
export { AuthStrategyRegistry } from "./AuthStrategyRegistry";

// Errors
export { AuthenticationError } from "./errors/AuthenticationError";

// Strategy interfaces and base class
export { IAuthStrategy, AUTH_STRATEGY_TAG } from "./strategies/IAuthStrategy";
export { BaseAuthStrategy } from "./strategies/BaseAuthStrategy";

// Built-in strategies
export { JWTStrategy } from "./strategies/JWTStrategy";
export { ApiKeyStrategy } from "./strategies/ApiKeyStrategy";

// =============================================================================
// LEGACY: Deprecated interfaces (kept for backwards compatibility)
// =============================================================================

/** @deprecated Use IAuthStrategy instead */
export * from "./IAuthorization";

/** @deprecated Use IAuthStrategy instead */
export * from "./IAuthProvider";

/** @deprecated Use IAuthStrategy instead */
export * from "./IAuthValidator";

/** @deprecated Create a custom IAuthStrategy that calls your remote service */
export * from "./RemoteAuthValidator";
