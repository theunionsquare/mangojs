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
