import { injectable } from "inversify";
import { Request } from "express";
import { BaseAuthStrategy } from "./BaseAuthStrategy";
import { IAuthUser, ApiKeyStrategyOptions } from "../types";
import { AuthenticationError } from "../errors/AuthenticationError";

/**
 * Default API Key strategy options
 */
const DEFAULT_OPTIONS = {
  headerName: "X-API-Key",
  queryParam: "",
};

/**
 * API Key Authentication Strategy
 *
 * Authenticates requests using an API key provided in a header or query parameter.
 * You must provide a validator function that verifies the key and returns user info.
 *
 * @example
 * ```typescript
 * // Basic usage with header
 * const apiKeyStrategy = new ApiKeyStrategy({
 *   validator: async (apiKey, req) => {
 *     const user = await db.users.findByApiKey(apiKey);
 *     if (!user) return null;
 *     return {
 *       id: user.id,
 *       userType: 'API_CLIENT',
 *       permissions: user.scopes,
 *     };
 *   }
 * });
 *
 * // With custom header and query fallback
 * const apiKeyStrategy = new ApiKeyStrategy({
 *   headerName: 'Authorization',  // Different header
 *   queryParam: 'api_key',        // Fallback to ?api_key=xxx
 *   validator: async (apiKey, req) => {
 *     // Handle "Bearer sk_xxx" format
 *     const key = apiKey.replace(/^Bearer\s+/i, '');
 *     return validateAndFetchUser(key);
 *   }
 * });
 *
 * // Register with container
 * container.bind(AUTH_STRATEGY_TAG).toConstantValue(apiKeyStrategy);
 * ```
 */
@injectable()
export class ApiKeyStrategy extends BaseAuthStrategy {
  readonly name = "apikey";
  readonly priority: number;

  private options: Required<Pick<ApiKeyStrategyOptions, "headerName" | "queryParam">> &
    Pick<ApiKeyStrategyOptions, "validator">;

  constructor(options: ApiKeyStrategyOptions) {
    super();

    if (!options.validator) {
      throw new Error("ApiKeyStrategy requires a 'validator' function");
    }

    this.options = {
      headerName: options.headerName ?? DEFAULT_OPTIONS.headerName,
      queryParam: options.queryParam ?? DEFAULT_OPTIONS.queryParam,
      validator: options.validator,
    };

    // API keys typically have high priority (checked early)
    this.priority = 5;
  }

  /**
   * Check if this strategy can handle the request
   * Returns true if an API key is present in header or query
   */
  canHandle(req: Request): boolean {
    return this.extractApiKeyFromRequest(req) !== null;
  }

  /**
   * Authenticate the request by validating the API key
   */
  async authenticate(req: Request): Promise<IAuthUser | null> {
    const apiKey = this.extractApiKeyFromRequest(req);
    if (!apiKey) return null;

    try {
      const user = await this.options.validator(apiKey, req);

      if (!user) {
        // Key was present but invalid
        throw AuthenticationError.invalidApiKey();
      }

      return user;
    } catch (error) {
      // Re-throw AuthenticationErrors
      if (error instanceof AuthenticationError) {
        throw error;
      }

      // Wrap other errors
      console.error("[ApiKeyStrategy] Validation error:", error);
      throw AuthenticationError.custom(
        "API key validation failed",
        "API_KEY_VALIDATION_ERROR"
      );
    }
  }

  /**
   * Extract API key from request (header or query)
   */
  private extractApiKeyFromRequest(req: Request): string | null {
    // Check header first (case-insensitive)
    const headerValue = req.headers[this.options.headerName.toLowerCase()];
    if (headerValue && typeof headerValue === "string") {
      return headerValue;
    }

    // Check query parameter if configured
    if (this.options.queryParam) {
      const queryValue = req.query[this.options.queryParam];
      if (queryValue && typeof queryValue === "string") {
        return queryValue;
      }
    }

    return null;
  }
}
