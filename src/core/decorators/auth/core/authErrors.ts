/**
 * Detailed authorization error information
 */
export interface AuthErrorDetails {
  /** What authorization was required */
  required: string;
  /** What the user actually has */
  actual: string;
  /** Which decorator/validator failed */
  failedValidator: string;
  /** User type if available */
  userType?: string;
  /** User groups if available */
  userGroups?: string[];
  /** Additional context */
  context?: Record<string, any>;
}

/**
 * Authorization error class with detailed information
 */
export class AuthorizationError extends Error {
  public readonly code = "NOT_AUTHORIZED";
  public readonly statusCode = 401;
  public readonly details: AuthErrorDetails;

  constructor(message: string, details: AuthErrorDetails) {
    super(message);
    this.name = "AuthorizationError";
    this.details = details;

    // Maintains proper stack trace for where error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AuthorizationError);
    }
  }

  /**
   * Get a formatted error message for logging
   */
  toLogString(): string {
    return JSON.stringify(
      {
        error: this.name,
        code: this.code,
        message: this.message,
        details: this.details,
      },
      null,
      2
    );
  }

  /**
   * Get a safe error response for client (without sensitive details)
   */
  toClientResponse(): { error: string; message: string; code: string } {
    return {
      error: this.name,
      message: this.message,
      code: this.code,
    };
  }

  /**
   * Get full error details (for internal logging/debugging)
   */
  toFullResponse(): {
    error: string;
    message: string;
    code: string;
    statusCode: number;
    details: AuthErrorDetails;
  } {
    return {
      error: this.name,
      message: this.message,
      code: this.code,
      statusCode: this.statusCode,
      details: this.details,
    };
  }
}

/**
 * Factory functions for creating common authorization errors
 */
export class AuthErrorFactory {
  /**
   * Create error for user type mismatch
   */
  static userTypeMismatch(
    required: string[],
    actual: string | undefined,
    validatorName: string
  ): AuthorizationError {
    return new AuthorizationError("User type authorization failed", {
      required: `User type must be one of: ${required.join(", ")}`,
      actual: actual ? `User type is: ${actual}` : "No user type found",
      failedValidator: validatorName,
      userType: actual,
    });
  }

  /**
   * Create error for group mismatch
   */
  static groupMismatch(
    requiredGroups: string[],
    actualGroups: string[],
    validatorName: string,
    userType?: string
  ): AuthorizationError {
    return new AuthorizationError("Group authorization failed", {
      required: `User must have at least one of these groups: ${requiredGroups.join(", ")}`,
      actual: actualGroups.length > 0
        ? `User has groups: ${actualGroups.join(", ")}`
        : "User has no groups",
      failedValidator: validatorName,
      userType,
      userGroups: actualGroups,
    });
  }

  /**
   * Create error for access requirements mismatch
   */
  static accessDenied(
    requiredAccess: string,
    userType: string | undefined,
    userGroups: string[],
    validatorName: string
  ): AuthorizationError {
    return new AuthorizationError("Access denied", {
      required: requiredAccess,
      actual: userType
        ? `User type: ${userType}, Groups: ${userGroups.join(", ") || "none"}`
        : "No user authentication found",
      failedValidator: validatorName,
      userType,
      userGroups,
    });
  }

  /**
   * Create error for missing user context
   */
  static missingUserContext(validatorName: string): AuthorizationError {
    return new AuthorizationError("User authentication required", {
      required: "Valid authenticated user with user type and groups",
      actual: "No user context found in request",
      failedValidator: validatorName,
    });
  }

  /**
   * Create error for OR mode validation failure
   */
  static orModeFailure(
    validators: Array<{ name: string; reason: string }>,
    userType?: string,
    userGroups?: string[]
  ): AuthorizationError {
    const failedValidators = validators
      .map((v) => `${v.name}: ${v.reason}`)
      .join("; ");

    return new AuthorizationError(
      "Authorization failed - none of the required conditions were met",
      {
        required: "At least one of the authorization conditions must pass",
        actual: userType
          ? `User type: ${userType}, Groups: ${userGroups?.join(", ") || "none"}`
          : "No user context",
        failedValidator: "OrAuth",
        userType,
        userGroups,
        context: {
          failedValidators: validators,
        },
      }
    );
  }

  /**
   * Create error for AND mode validation failure
   */
  static andModeFailure(
    failedValidator: { name: string; reason: string },
    userType?: string,
    userGroups?: string[]
  ): AuthorizationError {
    return new AuthorizationError(
      "Authorization failed - required condition not met",
      {
        required: "All authorization conditions must pass",
        actual: userType
          ? `User type: ${userType}, Groups: ${userGroups?.join(", ") || "none"}`
          : "No user context",
        failedValidator: failedValidator.name,
        userType,
        userGroups,
        context: {
          reason: failedValidator.reason,
        },
      }
    );
  }
}
