import { NextFunction, Request, Response } from "express";
import { Errors } from "..";
import { AuthorizationError, AuthErrorFactory } from "./authErrors";
import { AuthConfig, DecoratorOptions } from "./authConfig";
import { authCache, generateCacheKey } from "./authCacheUtils";

/**
 * Result from an authorization validator
 */
export interface ValidationResult {
  passed: boolean;
  reason?: string; // Why it failed (if it failed)
}

/**
 * Type definition for an authorization validator function.
 * Returns validation result with pass/fail and optional reason.
 * Can be async for validators that need to perform async operations.
 */
export type AuthValidator = (
  req: Request,
) => ValidationResult | Promise<ValidationResult>;

/**
 * Type definition for validator metadata stored on methods.
 */
export interface ValidatorMetadata {
  name: string; // Name of the decorator (for debugging)
  validator: AuthValidator;
  options?: DecoratorOptions; // Per-decorator options
}

/**
 * Creates an orchestrator middleware that runs multiple authorization validators
 * with either AND or OR logic.
 *
 * @param validators - Array of validator functions to run
 * @param useOrMode - If true, use OR logic (at least one passes); if false, use AND logic (all must pass)
 * @param methodName - Name of the method being protected (for logging)
 * @returns Express middleware function
 */
export function createAuthOrchestrator(
  validators: ValidatorMetadata[],
  useOrMode: boolean,
  methodName: string | symbol,
): (req: Request, res: Response, next: NextFunction) => Promise<void> {
  return async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    if (validators.length === 0) {
      // No validators - allow access
      next();
      return;
    }

    // Extract user info using AuthConfig
    const userContext = AuthConfig.extractUserContext(req);
    const userType = userContext?.userType;
    const userGroups = userContext?.groups || [];

    if (useOrMode) {
      // OR logic: At least one validator must pass
      const results = await Promise.all(
        validators.map(async (v) => {
          // Check if caching is enabled for this validator
          const cachingEnabled = AuthConfig.isCachingEnabled(v.options);
          let result: ValidationResult;
          let cacheSource = "";

          if (cachingEnabled && userContext) {
            const cacheKey = generateCacheKey(
              {
                userId: userContext.raw?.id || userContext.raw?.userId,
                userType: userContext.userType,
                groups: userContext.groups,
              },
              methodName,
              v.name,
            );

            const cachedResult = authCache.get(cacheKey);
            if (cachedResult) {
              result = cachedResult;
              cacheSource = " [CACHED]";
            } else {
              result = await v.validator(req);
              cacheSource = " [COMPUTED]";

              const ttl = AuthConfig.getCacheTTL(v.options);
              authCache.set(cacheKey, result, ttl);
            }
          } else {
            result = await v.validator(req);
            cacheSource = "";
          }

          if (AuthConfig.isAuditLogEnabled(v.options)) {
            console.log(
              `[OrAuth] ${String(methodName)} - ${v.name}: ${
                result.passed ? "PASS" : "FAIL"
              }${cacheSource}${result.reason ? ` (${result.reason})` : ""}`,
            );
          }

          return {
            name: v.name,
            passed: result.passed,
            reason: result.reason || "Validation failed",
          };
        }),
      );

      const anyPassed = results.some((r) => r.passed);

      if (anyPassed) {
        const passedValidators = results
          .filter((r) => r.passed)
          .map((r) => r.name);

        if (validators.some((v) => AuthConfig.isAuditLogEnabled(v.options))) {
          console.log(
            `[OrAuth] ${String(
              methodName,
            )} - Access granted via: ${passedValidators.join(", ")}`,
          );
        }
        next();
      } else {
        const authError = AuthErrorFactory.orModeFailure(
          results,
          userType,
          userGroups,
        );

        if (validators.some((v) => AuthConfig.isAuditLogEnabled(v.options))) {
          console.error(
            `[OrAuth] ${String(methodName)} - Access denied:\n${authError.toLogString()}`,
          );
        }

        AuthConfig.trackUnauthorized(req, authError);

        const customErrorHandler = AuthConfig.getErrorHandler(
          validators[0]?.options,
        );

        if (customErrorHandler) {
          customErrorHandler(res, authError);
        } else {
          Errors.errorHandler(res, authError);
        }
      }
    } else {
      // AND logic: All validators must pass
      for (const v of validators) {
        const cachingEnabled = AuthConfig.isCachingEnabled(v.options);
        let result: ValidationResult;
        let cacheSource = "";

        if (cachingEnabled && userContext) {
          const cacheKey = generateCacheKey(
            {
              userId: userContext.raw?.id || userContext.raw?.userId,
              userType: userContext.userType,
              groups: userContext.groups,
            },
            methodName,
            v.name,
          );

          const cachedResult = authCache.get(cacheKey);
          if (cachedResult) {
            result = cachedResult;
            cacheSource = " [CACHED]";
          } else {
            result = await v.validator(req);
            cacheSource = " [COMPUTED]";

            const ttl = AuthConfig.getCacheTTL(v.options);
            authCache.set(cacheKey, result, ttl);
          }
        } else {
          result = await v.validator(req);
          cacheSource = "";
        }

        if (AuthConfig.isAuditLogEnabled(v.options)) {
          console.log(
            `[AndAuth] ${String(methodName)} - ${v.name}: ${
              result.passed ? "PASS" : "FAIL"
            }${cacheSource}${result.reason ? ` (${result.reason})` : ""}`,
          );
        }

        if (!result.passed) {
          const authError = AuthErrorFactory.andModeFailure(
            { name: v.name, reason: result.reason || "Validation failed" },
            userType,
            userGroups,
          );

          if (AuthConfig.isAuditLogEnabled(v.options)) {
            console.error(
              `[AndAuth] ${String(methodName)} - Access denied by ${
                v.name
              }:\n${authError.toLogString()}`,
            );
          }

          AuthConfig.trackUnauthorized(req, authError);

          const customErrorHandler = AuthConfig.getErrorHandler(v.options);

          if (customErrorHandler) {
            customErrorHandler(res, authError);
          } else {
            Errors.errorHandler(res, authError);
          }
          return;
        }
      }

      if (validators.some((v) => AuthConfig.isAuditLogEnabled(v.options))) {
        console.log(
          `[AndAuth] ${String(
            methodName,
          )} - Access granted. All validators passed.`,
        );
      }
      next();
    }
  };
}
