/**
 * @module Auth
 * @description Authorization decorators for Express route protection.
 */

// Decorators
export { HasUserType } from "./hasUserType.decorator.js";
export { HasGroups } from "./hasGroups.decorator.js";
export { HasPermissions } from "./hasPermissions.decorator.js";
export { RequiresAccess } from "./requiresAccess.decorator.js";
export { RequiresOwnership } from "./requiresOwnership.decorator.js";
export type {
  OwnershipOptions,
  ParameterSource,
  OwnershipValidator,
} from "./requiresOwnership.decorator.js";
export { ClassHasUserType } from "./classHasUserType.decorator.js";
export { NoAuth } from "./noAuth.decorator.js";
export { OrAuth } from "./orAuth.decorator.js";

// Core
export { AuthorizationError, AuthErrorFactory } from "../../authz/authErrors.js";
export type { AuthErrorDetails } from "../../authz/authErrors.js";
export { AuthConfig, defaultUserContextExtractor } from "../../authz/authConfig.js";
export type {
  AuthConfigOptions,
  DecoratorOptions,
  HasPermissionsOptions,
  AuthErrorHandler,
  UserContextExtractor,
} from "../../authz/authConfig.js";

// Auth-specific cache utilities
export { authCache, generateCacheKey, clearUserCache } from "../../authz/authCacheUtils.js";
export type { UserCacheContext } from "../../authz/authCacheUtils.js";

// Re-export generic cache types from core/cache for convenience
export type { CacheStats, CacheOptions, CacheEntry } from "../../cache/index.js";
