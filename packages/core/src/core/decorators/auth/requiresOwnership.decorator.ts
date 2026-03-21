import { NextFunction, Request, RequestHandler, Response } from "express";
import { Errors } from "../..";
import { MetadataKeys } from "../../utils/metadata.keys";
import { ValidatorMetadata, createAuthOrchestrator, ValidationResult } from "../../authz/authOrchestrator";
import { AuthErrorFactory, AuthorizationError } from "../../authz/authErrors";
import { AuthConfig, DecoratorOptions } from "../../authz/authConfig";

/**
 * Source of the resource identifier in the request
 */
export type ParameterSource = "params" | "query" | "body";

/**
 * Custom ownership validator function
 * @param userValue - The value from the user context
 * @param resourceValue - The value from the request
 * @param req - The full request object for complex logic
 * @returns true if user owns the resource, false otherwise
 */
export type OwnershipValidator = (
  userValue: any,
  resourceValue: any,
  req: Request
) => boolean | Promise<boolean>;

/**
 * Configuration options for the RequiresOwnership decorator
 */
export interface OwnershipOptions extends DecoratorOptions {
  /**
   * Field name in the user context to check
   * @default `${resourceName}Id`
   */
  userField?: string;

  /**
   * Parameter name in the request (params/query/body)
   * @default `${resourceName}Id`
   */
  paramName?: string;

  /**
   * Source of the parameter in the request
   * @default "params"
   */
  paramSource?: ParameterSource;

  /**
   * Whether the user field contains an array of IDs
   * If true, checks if resource ID is in the user's array
   * If false, checks direct equality
   * @default false
   */
  arrayField?: boolean;

  /**
   * Custom validation function for complex ownership logic
   * If provided, overrides the default equality/array checks
   */
  customValidator?: OwnershipValidator;
}

/**
 * Method decorator that validates resource ownership based on user context.
 *
 * This decorator checks if the authenticated user "owns" or has access to a specific
 * resource by comparing a field in the user context with a parameter from the request.
 * Supports both single-value and array-based ownership checks.
 *
 * Common use cases:
 * - Prevent horizontal privilege escalation (users accessing other users' data)
 * - Enforce data isolation in multi-tenant applications
 * - Validate that users can only modify their own resources
 *
 * @param resourceName - Name of the resource (e.g., "partner", "organization")
 * @param options - Configuration options for ownership validation
 * @returns A method decorator that adds ownership validation middleware
 *
 * @example
 * ```typescript
 * class PartnerController {
 *   // Basic ownership check
 *   // Checks: req.user.partnerId === req.params.partnerId
 *   @RequiresOwnership("partner")
 *   async updatePartner(@Param("partnerId") partnerId: string) {
 *     // Only the partner who owns this resource can update it
 *   }
 *
 *   // Admin bypass with OR logic
 *   @OrAuth()
 *   @HasUserType([AuthUserType.ADMIN])
 *   @RequiresOwnership("partner")
 *   async updatePartner(@Param("partnerId") partnerId: string) {
 *     // Admin OR owner can update
 *   }
 *
 *   // Custom field names
 *   @RequiresOwnership("partner", {
 *     userField: "partnerUuid",
 *     paramName: "id"
 *   })
 *   async getPartner(@Param("id") id: string) {
 *     // Checks: req.user.partnerUuid === req.params.id
 *   }
 *
 *   // Multi-organization access (array field)
 *   @RequiresOwnership("organization", {
 *     userField: "organizationIds",
 *     arrayField: true
 *   })
 *   async getOrgData(@Param("organizationId") organizationId: string) {
 *     // Checks: req.user.organizationIds.includes(req.params.organizationId)
 *   }
 *
 *   // Query parameter source
 *   @RequiresOwnership("partner", {
 *     paramSource: "query",
 *     paramName: "partnerId"
 *   })
 *   async getPartnerData(@Query("partnerId") partnerId: string) {
 *     // Checks: req.user.partnerId === req.query.partnerId
 *   }
 *
 *   // Body parameter source
 *   @RequiresOwnership("partner", {
 *     paramSource: "body",
 *     paramName: "targetPartnerId"
 *   })
 *   async transferData(@Body() body: TransferDto) {
 *     // Checks: req.user.partnerId === req.body.targetPartnerId
 *   }
 *
 *   // Custom validation logic
 *   @RequiresOwnership("resource", {
 *     customValidator: (userValue, resourceValue, req) => {
 *       // Complex ownership logic
 *       return userValue.includes(resourceValue) && req.user.isActive;
 *     }
 *   })
 *   async complexOwnership(@Param("resourceId") resourceId: string) {}
 *
 *   // With custom error message
 *   @RequiresOwnership("partner", {
 *     errorMessage: "You can only modify your own partner data"
 *   })
 *   async updatePartner(@Param("partnerId") partnerId: string) {}
 *
 *   // Disabled for testing
 *   @RequiresOwnership("partner", {
 *     disabled: process.env.NODE_ENV === "test"
 *   })
 *   async testEndpoint(@Param("partnerId") partnerId: string) {}
 *
 *   // Complex pattern: Partner admin OR owner
 *   @OrAuth()
 *   @HasGroups(["partner_admin"])
 *   @RequiresOwnership("partner")
 *   async deletePartner(@Param("partnerId") partnerId: string) {
 *     // Partner admins OR the owner can delete
 *   }
 * }
 * ```
 *
 * @remarks
 * - By default, looks for `${resourceName}Id` in both user context and request params
 * - Supports single-value equality checks and array membership checks
 * - Can be combined with other decorators using AND/OR logic
 * - Uses AuthConfig for flexible user context extraction
 * - Provides detailed error messages with actual vs expected values
 *
 * @see {@link HasUserType} for user type validation
 * @see {@link HasGroups} for group validation
 * @see {@link OrAuth} for enabling OR logic between decorators
 */
export function RequiresOwnership(
  resourceName: string,
  options?: OwnershipOptions
): MethodDecorator {
  return function (
    target: any,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    // Check if this decorator is disabled (useful for testing)
    if (options?.disabled) {
      console.warn(
        `[RequiresOwnership] Decorator disabled for ${String(propertyKey)}`
      );
      return descriptor;
    }

    // Default configuration
    const userField = options?.userField || `${resourceName}Id`;
    const paramName = options?.paramName || `${resourceName}Id`;
    const paramSource = options?.paramSource || "params";
    const arrayField = options?.arrayField || false;
    const customValidator = options?.customValidator;

    // Check if OR mode is enabled
    const isOrMode = Reflect.getMetadata(
      MetadataKeys.AUTHORIZATION_OR_MODE,
      target,
      propertyKey
    );

    if (isOrMode) {
      // OR mode: Store validator function
      const validators: ValidatorMetadata[] =
        Reflect.getMetadata(
          MetadataKeys.AUTHORIZATION_VALIDATORS,
          target,
          propertyKey
        ) || [];

      validators.push({
        name: `RequiresOwnership(${resourceName})`,
        validator: async (req: Request): Promise<ValidationResult> => {
          return await validateOwnership(
            req,
            resourceName,
            userField,
            paramName,
            paramSource,
            arrayField,
            customValidator,
            options
          );
        },
        options,
      });

      Reflect.defineMetadata(
        MetadataKeys.AUTHORIZATION_VALIDATORS,
        validators,
        target,
        propertyKey
      );

      // Create orchestrator middleware (will be replaced by @OrAuth if present)
      const orchestratorMiddleware = createAuthOrchestrator(
        validators,
        false,
        propertyKey
      );
      Reflect.defineMetadata(
        MetadataKeys.AUTHORIZATION,
        [orchestratorMiddleware],
        target,
        propertyKey
      );
    } else {
      // AND mode (default): Store validators for potential OR mode
      const validators: ValidatorMetadata[] =
        Reflect.getMetadata(
          MetadataKeys.AUTHORIZATION_VALIDATORS,
          target,
          propertyKey
        ) || [];

      validators.push({
        name: `RequiresOwnership(${resourceName})`,
        validator: async (req: Request): Promise<ValidationResult> => {
          return await validateOwnership(
            req,
            resourceName,
            userField,
            paramName,
            paramSource,
            arrayField,
            customValidator,
            options
          );
        },
        options,
      });

      Reflect.defineMetadata(
        MetadataKeys.AUTHORIZATION_VALIDATORS,
        validators,
        target,
        propertyKey
      );

      // Create AND orchestrator by default
      const orchestratorMiddleware = createAuthOrchestrator(
        validators,
        false,
        propertyKey
      );
      Reflect.defineMetadata(
        MetadataKeys.AUTHORIZATION,
        [orchestratorMiddleware],
        target,
        propertyKey
      );
    }

    return descriptor;
  };
}

/**
 * Validates ownership by comparing user context field with request parameter
 */
async function validateOwnership(
  req: Request,
  resourceName: string,
  userField: string,
  paramName: string,
  paramSource: ParameterSource,
  arrayField: boolean,
  customValidator?: OwnershipValidator,
  options?: OwnershipOptions
): Promise<ValidationResult> {
  // Extract user context
  const userContext = AuthConfig.extractUserContext(req);

  if (!userContext) {
    return {
      passed: false,
      reason:
        options?.errorMessage ||
        `Resource access denied: No user context found`,
    };
  }

  // Get user's ownership field value
  const userValue = (userContext.raw as any)?.[userField];

  if (userValue === undefined || userValue === null) {
    return {
      passed: false,
      reason:
        options?.errorMessage ||
        `Resource access denied: User context does not contain required field '${userField}'`,
    };
  }

  // Get resource identifier from request
  let resourceValue: any;
  switch (paramSource) {
    case "params":
      resourceValue = (req.params as any)?.[paramName];
      break;
    case "query":
      resourceValue = (req.query as any)?.[paramName];
      break;
    case "body":
      resourceValue = (req.body as any)?.[paramName];
      break;
  }

  if (resourceValue === undefined || resourceValue === null) {
    return {
      passed: false,
      reason:
        options?.errorMessage ||
        `Resource access denied: Request does not contain parameter '${paramName}' in ${paramSource}`,
    };
  }

  // Use custom validator if provided
  if (customValidator) {
    try {
      const isValid = await customValidator(userValue, resourceValue, req);
      if (isValid) {
        return { passed: true };
      }
      return {
        passed: false,
        reason:
          options?.errorMessage ||
          `Resource access denied: Custom ownership validation failed for ${resourceName}`,
      };
    } catch (error) {
      return {
        passed: false,
        reason:
          options?.errorMessage ||
          `Resource access denied: Custom ownership validation threw error: ${error}`,
      };
    }
  }

  // Array field check
  if (arrayField) {
    if (!Array.isArray(userValue)) {
      return {
        passed: false,
        reason:
          options?.errorMessage ||
          `Resource access denied: User field '${userField}' is not an array`,
      };
    }

    const hasAccess = userValue.includes(resourceValue);
    if (hasAccess) {
      return { passed: true };
    }

    return {
      passed: false,
      reason:
        options?.errorMessage ||
        `Resource access denied: ${resourceName}Id '${resourceValue}' not in user's accessible ${resourceName}s [${userValue.join(", ")}]`,
    };
  }

  // Simple equality check
  const hasAccess = String(userValue) === String(resourceValue);
  if (hasAccess) {
    return { passed: true };
  }

  return {
    passed: false,
    reason:
      options?.errorMessage ||
      `Resource access denied: User ${userField} '${userValue}' does not match requested ${paramName} '${resourceValue}'`,
  };
}
