export { AuthorizationError, AuthErrorFactory } from "./authErrors";
export type { AuthErrorDetails } from "./authErrors";

export { AuthConfig, defaultUserContextExtractor } from "./authConfig";
export type {
  AuthConfigOptions,
  DecoratorOptions,
  HasPermissionsOptions,
  AuthErrorHandler,
  UnauthorizedTracker,
  UserContextExtractor,
} from "./authConfig";

export { createAuthOrchestrator } from "./authOrchestrator";
export type {
  ValidationResult,
  AuthValidator,
  ValidatorMetadata,
} from "./authOrchestrator";

export { authCache, generateCacheKey, clearUserCache } from "./authCacheUtils";
export type { UserCacheContext } from "./authCacheUtils";
