/**
 * @module Auth
 * @description Authorization decorators for Express route protection.
 */

// Decorators
export { HasUserType } from "./hasUserType.decorator";
export { HasGroups } from "./hasGroups.decorator";
export { HasPermissions } from "./hasPermissions.decorator";
export { RequiresAccess } from "./requiresAccess.decorator";
export { RequiresOwnership } from "./requiresOwnership.decorator";
export type {
  OwnershipOptions,
  ParameterSource,
  OwnershipValidator,
} from "./requiresOwnership.decorator";
export { ClassHasUserType } from "./classHasUserType.decorator";
export { NoAuth } from "./noAuth.decorator";
export { OrAuth } from "./orAuth.decorator";

// Core
export { AuthorizationError, AuthErrorFactory } from "../../authz/authErrors";
export type { AuthErrorDetails } from "../../authz/authErrors";
export { AuthConfig, defaultUserContextExtractor } from "../../authz/authConfig";
export type {
  AuthConfigOptions,
  DecoratorOptions,
  HasPermissionsOptions,
  AuthErrorHandler,
  UserContextExtractor,
} from "../../authz/authConfig";

// Auth-specific cache utilities
export { authCache, generateCacheKey, clearUserCache } from "../../authz/authCacheUtils";
export type { UserCacheContext } from "../../authz/authCacheUtils";

// Re-export generic cache types from core/cache for convenience
export type { CacheStats, CacheOptions, CacheEntry } from "../../cache";
