// Decorators
export { HasUserType } from "./decorators/hasUserType.decorator";
export { HasGroups } from "./decorators/hasGroups.decorator";
export { RequiresAccess } from "./decorators/requiresAccess.decorator";
export {
  RequiresOwnership,
  OwnershipOptions,
  ParameterSource,
  OwnershipValidator,
} from "./decorators/requiresOwnership.decorator";
export { ClassHasUserType } from "./decorators/classHasUserType.decorator";
export { NoAuth } from "./decorators/noAuth.decorator";
export { OrAuth } from "./decorators/orAuth.decorator";

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
// Note: The generic Cache class is available from '@giusmento/mangojs-core' root exports
