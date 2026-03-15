import { Request } from "express";
import { MetadataKeys } from "../../utils/metadata.keys";
import { Types } from "../../";
import { ValidatorMetadata, createAuthOrchestrator, ValidationResult } from "./core/authOrchestrator";
import { AuthConfig, DecoratorOptions } from "./core/authConfig";

/**
 * Method decorator that restricts access to routes based on user type.
 *
 * This decorator creates an authorization middleware that checks if the authenticated
 * user's type matches one of the allowed types. If the user type doesn't match any
 * of the allowed types, the request is rejected with a NOT_AUTHORIZED error.
 *
 * When used with @OrAuth(), this decorator can be combined with other auth decorators
 * using OR logic (at least one must pass). Without @OrAuth(), multiple decorators use
 * AND logic (all must pass).
 *
 * @param userTypes - Array of allowed user types
 * @param options - Optional configuration for this decorator instance
 * @param options.errorMessage - Custom error message for auth failures
 * @param options.disabled - Disable this decorator (useful for testing)
 * @param options.errorHandler - Custom error handler for this endpoint
 * @param options.auditLog - Enable audit logging for this endpoint
 * @param options.cache - Enable caching for this endpoint
 * @param options.cacheTTL - Cache TTL in milliseconds
 * @returns A method decorator that adds authorization middleware to the target method
 *
 * @example
 * ```typescript
 * class UserController {
 *   // Basic usage: User must be ADMIN
 *   @HasUserType([AuthUserType.ADMIN])
 *   async deleteUser(req: Request, res: Response) {
 *     // Only accessible by users with ADMIN type
 *   }
 *
 *   // Multiple user types in one decorator (OR within decorator)
 *   @HasUserType([AuthUserType.ADMIN, AuthUserType.MODERATOR])
 *   async updateUser(req: Request, res: Response) {
 *     // Accessible by users with ADMIN or MODERATOR type
 *   }
 *
 *   // With custom error message
 *   @HasUserType([AuthUserType.ADMIN], {
 *     errorMessage: "Only administrators can access this endpoint"
 *   })
 *   async adminOnlyEndpoint(req: Request, res: Response) {}
 *
 *   // With custom error handler
 *   @HasUserType([AuthUserType.PARTNER], {
 *     errorHandler: (res, error) => {
 *       res.status(403).json({ error: "Partner access required" });
 *     }
 *   })
 *   async partnerEndpoint(req: Request, res: Response) {}
 *
 *   // Disabled for testing
 *   @HasUserType([AuthUserType.ADMIN], {
 *     disabled: process.env.NODE_ENV === "test"
 *   })
 *   async testEndpoint(req: Request, res: Response) {}
 *
 *   // AND logic (default): Must be PARTNER AND have partner_admin group
 *   @HasUserType([AuthUserType.PARTNER])
 *   @HasGroups(["partner_admin"])
 *   async getPartnerData(req: Request, res: Response) {
 *     // User must be PARTNER AND have partner_admin group
 *   }
 *
 *   // OR logic: Must be ADMIN OR PARTNER
 *   @OrAuth()
 *   @HasUserType([AuthUserType.ADMIN])
 *   @HasUserType([AuthUserType.PARTNER])
 *   async flexibleAccess(req: Request, res: Response) {
 *     // User can be ADMIN OR PARTNER (at least one must match)
 *   }
 * }
 * ```
 *
 * @remarks
 * - By default, multiple auth decorators use AND logic (all must pass)
 * - Use @OrAuth() to enable OR logic (at least one must pass)
 * - This decorator only checks user type, not groups
 * - For combined user type and group validation, use @RequiresAccess
 *
 * @see {@link OrAuth} for enabling OR logic between multiple decorators
 * @see {@link RequiresAccess} for combined user type and group validation
 */
export function HasUserType(
  userTypes: Types.enums.AuthUserType[],
  options?: DecoratorOptions
): MethodDecorator {
  return function (
    target: any,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    // Check if this decorator is disabled (useful for testing)
    if (options?.disabled) {
      console.warn(
        `[HasUserType] Decorator disabled for ${String(propertyKey)}`
      );
      return descriptor;
    }

    // ALWAYS store validator function
    // This allows @OrAuth() to use OR orchestrator if present
    const validators: ValidatorMetadata[] =
      Reflect.getMetadata(
        MetadataKeys.AUTHORIZATION_VALIDATORS,
        target,
        propertyKey
      ) || [];

    validators.push({
      name: `HasUserType([${userTypes.join(", ")}])`,
      validator: (req: Request): ValidationResult => {
        // Use AuthConfig to extract user context
        const userContext = AuthConfig.extractUserContext(req);

        if (!userContext || !userContext.userType) {
          return {
            passed: false,
            reason: options?.errorMessage || "No valid user type found in request",
          };
        }

        const actualUserType = userContext.userType as Types.enums.AuthUserType;
        if (userTypes.includes(actualUserType)) {
          return { passed: true };
        }

        return {
          passed: false,
          reason: options?.errorMessage ||
            `User type '${actualUserType}' not in allowed types: ${userTypes.join(", ")}`,
        };
      },
      options,  // Store options for orchestrator
    });

    Reflect.defineMetadata(
      MetadataKeys.AUTHORIZATION_VALIDATORS,
      validators,
      target,
      propertyKey
    );

    // Create AND mode orchestrator by default
    // @OrAuth() will replace this with OR orchestrator if present
    const orchestratorMiddleware = createAuthOrchestrator(
      validators,
      false, // AND mode by default
      propertyKey
    );

    Reflect.defineMetadata(
      MetadataKeys.AUTHORIZATION,
      [orchestratorMiddleware],
      target,
      propertyKey
    );
  };
}
