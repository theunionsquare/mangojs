import { Request, Response } from "express";
import { AuthorizationError } from "./authErrors";
import { IAuthContext } from "../../../auth/types";

/**
 * Error handler function type
 */
export type AuthErrorHandler = (
  res: Response,
  error: AuthorizationError
) => void;

/**
 * User context extractor function
 * Allows custom logic for extracting user from request
 */
export type UserContextExtractor = (req: Request) => {
  userType?: string;
  groups?: Array<{ name: string } | string>;
  [key: string]: any;
} | null;

/**
 * Global configuration options
 */
export interface AuthConfigOptions {
  /**
   * Path to user object in request (e.g., "user", "session.user")
   * Default: "user"
   */
  userObjectPath?: string;

  /**
   * Custom function to extract user context from request
   * If provided, overrides userObjectPath
   */
  userContextExtractor?: UserContextExtractor;

  /**
   * Custom error handler
   * Default: uses core error handler
   */
  errorHandler?: AuthErrorHandler;

  /**
   * Enable audit logging for all auth decisions
   * Default: false
   * Note: Logging implementation will be added in future
   */
  enableAuditLog?: boolean;

  /**
   * Enable caching of validation results
   * Default: false
   */
  cacheValidationResults?: boolean;

  /**
   * Cache TTL in milliseconds
   * Default: 60000 (1 minute)
   */
  cacheTTL?: number;

  /**
   * Maximum number of cache entries
   * Default: 1000
   */
  cacheMaxSize?: number;

  /**
   * Environment (used for conditional behavior)
   * Default: process.env.NODE_ENV
   */
  environment?: string;
}

/**
 * Per-decorator configuration options
 */
export interface DecoratorOptions {
  /**
   * Custom error message for this endpoint
   */
  errorMessage?: string;

  /**
   * Enable audit logging for this endpoint
   * Overrides global setting
   */
  auditLog?: boolean;

  /**
   * Enable caching for this endpoint
   * Overrides global setting
   */
  cache?: boolean;

  /**
   * Cache TTL for this endpoint in milliseconds
   * Overrides global setting
   */
  cacheTTL?: number;

  /**
   * Custom error handler for this endpoint
   */
  errorHandler?: AuthErrorHandler;

  /**
   * Disable this auth check (useful for testing)
   */
  disabled?: boolean;
}

/**
 * Default configuration values
 */
const DEFAULT_CONFIG: Required<AuthConfigOptions> = {
  userObjectPath: "user",
  userContextExtractor: undefined as any,
  errorHandler: undefined as any,
  enableAuditLog: true,
  cacheValidationResults: false,
  cacheTTL: 60000,
  cacheMaxSize: 1000,
  environment: process.env.NODE_ENV || "development",
};

/**
 * Global authentication configuration
 */
export class AuthConfig {
  private static config: Required<AuthConfigOptions> = { ...DEFAULT_CONFIG };

  /**
   * Configure global auth settings
   *
   * @example
   * ```typescript
   * AuthConfig.configure({
   *   userObjectPath: "session.user",
   *   enableAuditLog: true,
   *   cacheValidationResults: true,
   *   cacheTTL: 300000
   * });
   * ```
   */
  static configure(options: AuthConfigOptions): void {
    this.config = {
      ...this.config,
      ...options,
    };

    console.log("[AuthConfig] Configuration updated", options);
  }

  /**
   * Get current configuration
   */
  static getConfig(): Readonly<Required<AuthConfigOptions>> {
    return Object.freeze({ ...this.config });
  }

  /**
   * Reset to default configuration (useful for testing)
   */
  static reset(): void {
    this.config = { ...DEFAULT_CONFIG };
  }

  /**
   * Extract user context from request using configured extractor
   *
   * Checks in order:
   * 1. req.authContext (new strategy-based system)
   * 2. Custom userContextExtractor (if configured)
   * 3. Path-based extraction from req[userObjectPath] (legacy)
   *
   * @param req - Express request object
   * @returns User context with userType, groups, and raw user object
   */
  static extractUserContext(req: Request): {
    userType?: string;
    groups?: string[];
    raw?: any;
  } | null {
    // First check for new authContext (strategy-based system)
    const authContext = (req as any).authContext as IAuthContext | undefined;
    if (authContext?.isAuthenticated && authContext.user) {
      return {
        userType: authContext.user.userType,
        groups: authContext.user.groups || [],
        raw: authContext.user,
      };
    }

    // Use custom extractor if provided
    if (this.config.userContextExtractor) {
      const context = this.config.userContextExtractor(req);
      if (!context) return null;

      return {
        userType: context.userType,
        groups: this.normalizeGroups(context.groups),
        raw: context,
      };
    }

    // Use path-based extraction (legacy)
    const user = this.getNestedProperty(req, this.config.userObjectPath);
    if (!user || typeof user !== "object") {
      return null;
    }

    return {
      userType: user.userType,
      groups: this.normalizeGroups(user.groups),
      raw: user,
    };
  }

  /**
   * Normalize groups to string array
   * Handles both string arrays and object arrays with 'name' property
   */
  private static normalizeGroups(groups: any): string[] | undefined {
    if (!groups || !Array.isArray(groups)) {
      return undefined;
    }

    return groups.map((g) => {
      if (typeof g === "string") return g;
      if (typeof g === "object" && g !== null && "name" in g) return g.name;
      return String(g);
    });
  }

  /**
   * Get nested property from object using dot notation
   *
   * @example
   * getNestedProperty(req, "session.user") // returns req.session.user
   */
  private static getNestedProperty(obj: any, path: string): any {
    return path.split(".").reduce((current, prop) => {
      return current?.[prop];
    }, obj);
  }

  /**
   * Check if audit logging is enabled
   *
   * @param decoratorOptions - Optional per-decorator options
   * @returns true if audit logging should be enabled
   */
  static isAuditLogEnabled(decoratorOptions?: DecoratorOptions): boolean {
    if (decoratorOptions?.auditLog !== undefined) {
      return decoratorOptions.auditLog;
    }
    return this.config.enableAuditLog;
  }

  /**
   * Check if caching is enabled
   *
   * @param decoratorOptions - Optional per-decorator options
   * @returns true if caching should be enabled
   */
  static isCachingEnabled(decoratorOptions?: DecoratorOptions): boolean {
    if (decoratorOptions?.cache !== undefined) {
      return decoratorOptions.cache;
    }
    return this.config.cacheValidationResults;
  }

  /**
   * Get cache TTL
   *
   * @param decoratorOptions - Optional per-decorator options
   * @returns Cache TTL in milliseconds
   */
  static getCacheTTL(decoratorOptions?: DecoratorOptions): number {
    if (decoratorOptions?.cacheTTL !== undefined) {
      return decoratorOptions.cacheTTL;
    }
    return this.config.cacheTTL;
  }

  /**
   * Get error handler
   *
   * @param decoratorOptions - Optional per-decorator options
   * @returns Custom error handler if configured
   */
  static getErrorHandler(
    decoratorOptions?: DecoratorOptions
  ): AuthErrorHandler | undefined {
    if (decoratorOptions?.errorHandler) {
      return decoratorOptions.errorHandler;
    }
    return this.config.errorHandler;
  }

  /**
   * Get cache max size
   *
   * @returns Maximum number of cache entries
   */
  static getCacheMaxSize(): number {
    return this.config.cacheMaxSize;
  }
}

/**
 * Default user context extractor
 * Extracts user from req.user (standard Express pattern)
 */
export const defaultUserContextExtractor: UserContextExtractor = (req) => {
  const reqAny = req as any;

  if (
    typeof reqAny === "object" &&
    reqAny !== null &&
    "user" in reqAny &&
    reqAny.user &&
    typeof reqAny.user === "object"
  ) {
    return reqAny.user;
  }

  return null;
};
