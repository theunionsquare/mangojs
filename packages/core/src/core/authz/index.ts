export { AuthorizationError, AuthErrorFactory } from "./authErrors.js";
export type { AuthErrorDetails } from "./authErrors.js";

export { AuthConfig, defaultUserContextExtractor } from "./authConfig.js";
export type {
  AuthConfigOptions,
  DecoratorOptions,
  HasPermissionsOptions,
  AuthErrorHandler,
  UnauthorizedTracker,
  UserContextExtractor,
} from "./authConfig.js";

export { createAuthOrchestrator } from "./authOrchestrator.js";
export type {
  ValidationResult,
  AuthValidator,
  ValidatorMetadata,
} from "./authOrchestrator.js";

export { authCache, generateCacheKey, clearUserCache } from "./authCacheUtils.js";
export type { UserCacheContext } from "./authCacheUtils.js";
