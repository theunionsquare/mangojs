/**
 * @module Auth
 * @description Authorization decorators for Express route protection.
 */

// Decorators
export { HasUserType } from "./hasUserType.decorator";
export { HasGroups } from "./hasGroups.decorator";
export { HasPermissions } from "./hasPermissions.decorator";
export { RequiresAccess } from "./requiresAccess.decorator";
export {
  RequiresOwnership,
  OwnershipOptions,
  ParameterSource,
  OwnershipValidator,
} from "./requiresOwnership.decorator";
export { ClassHasUserType } from "./classHasUserType.decorator";
export { NoAuth } from "./noAuth.decorator";
export { OrAuth } from "./orAuth.decorator";

// Core
export {
  AuthorizationError,
  AuthErrorFactory,
  AuthErrorDetails,
} from "./core/authErrors";
export {
  AuthConfig,
  AuthConfigOptions,
  DecoratorOptions,
  AuthErrorHandler,
  UserContextExtractor,
  defaultUserContextExtractor,
} from "./core/authConfig";

// Auth-specific cache utilities
export {
  authCache,
  generateCacheKey,
  clearUserCache,
  UserCacheContext,
} from "./core/authCacheUtils";

// Re-export generic cache types from core/cache for convenience
export type { CacheStats, CacheOptions, CacheEntry } from "../../cache";
