import { Request } from "express";

/**
 * Cookie options for token storage
 */
export interface AuthCookieOptions {
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: "strict" | "lax" | "none";
  maxAge?: number;
  path?: string;
  domain?: string;
}

/**
 * Extensible user interface - no hardcoded enum
 * Developers can use any string for userType
 */
export interface IAuthUser {
  /** Unique identifier for the user */
  id: string;

  /** User type/role - any string value (e.g., 'ADMIN', 'CUSTOMER', 'API_CLIENT') */
  userType: string;

  /** User email address */
  email?: string;

  /** Groups the user belongs to */
  groups?: string[];

  /** Fine-grained permissions */
  permissions?: string[];

  /** Additional metadata */
  metadata?: Record<string, any>;

  /** Allow extension with custom fields */
  [key: string]: any;
}

/**
 * Authentication context attached to requests
 * Provides helper methods for authorization checks
 */
export interface IAuthContext {
  /** Authenticated user or null */
  readonly user: IAuthUser | null;

  /** Name of the strategy that authenticated the user */
  readonly strategy: string | null;

  /** Whether the user is authenticated */
  readonly isAuthenticated: boolean;

  /** When authentication occurred */
  readonly authenticatedAt?: Date;

  /** Check if user has a specific permission */
  hasPermission(permission: string): boolean;

  /** Check if user has any of the specified permissions */
  hasAnyPermission(permissions: string[]): boolean;

  /** Check if user has all of the specified permissions */
  hasAllPermissions(permissions: string[]): boolean;

  /** Check if user has a specific user type */
  hasUserType(type: string): boolean;

  /** Check if user has any of the specified user types */
  hasAnyUserType(types: string[]): boolean;

  /** Check if user belongs to a specific group */
  belongsToGroup(group: string): boolean;

  /** Check if user belongs to any of the specified groups */
  belongsToAnyGroup(groups: string[]): boolean;

  /** Check if user belongs to all of the specified groups */
  belongsToAllGroups(groups: string[]): boolean;
}

/**
 * Standardized token generation response
 * All strategies return this format for consistency
 */
export interface AuthCredentials {
  /** The access token */
  accessToken: string;

  /** Type of token (Bearer, Cookie, ApiKey, or custom) */
  tokenType: "Bearer" | "Cookie" | "ApiKey" | string;

  /** Optional refresh token */
  refreshToken?: string;

  /** Time until expiration in seconds */
  expiresIn?: number;

  /** Absolute expiration time */
  expiresAt?: Date;

  /** Cookie configuration (for cookie-based tokens) */
  cookie?: {
    name: string;
    value: string;
    options: AuthCookieOptions;
  };

  /** Additional metadata */
  metadata?: Record<string, any>;
}

/**
 * JWT Strategy configuration options
 */
export interface JWTStrategyOptions {
  // --- Signing Keys ---

  /** Secret for symmetric algorithms (HS256, HS384, HS512) */
  secret?: string;

  /** Public key for asymmetric algorithms (RS256, ES256) */
  publicKey?: string;

  /** Private key for asymmetric algorithms (RS256, ES256) */
  privateKey?: string;

  // --- Algorithm ---

  /** JWT algorithm to use */
  algorithm?: "HS256" | "HS384" | "HS512" | "RS256" | "RS384" | "RS512" | "ES256" | "ES384" | "ES512";

  // --- Token Configuration ---

  /** Token expiration time in seconds (default: 3600) */
  expiresIn?: number;

  /** Token issuer (iss claim) */
  issuer?: string;

  /** Token audience (aud claim) */
  audience?: string | string[];

  // --- Token Extraction ---

  /** Where to extract the token from */
  extractFrom?: "header" | "cookie" | "both";

  /** Header name (default: 'Authorization') */
  headerName?: string;

  /** Header scheme (default: 'Bearer') */
  headerScheme?: string;

  /** Cookie name (default: 'auth_token') */
  cookieName?: string;

  // --- Cookie Options (for token generation) ---

  /** Cookie options when generating tokens */
  cookie?: AuthCookieOptions;

  // --- Refresh Token ---

  /** Refresh token configuration */
  refreshToken?: {
    /** Enable refresh token generation */
    enabled: boolean;
    /** Refresh token expiration in seconds (default: 604800 = 7 days) */
    expiresIn?: number;
    /** Refresh token cookie name */
    cookieName?: string;
  };

  // --- Validation Options ---

  /** Clock tolerance for expiration checks in seconds */
  clockTolerance?: number;

  /** Ignore token expiration (not recommended for production) */
  ignoreExpiration?: boolean;
}

/**
 * API Key Strategy configuration options
 */
export interface ApiKeyStrategyOptions {
  /** Header name to extract API key from (default: 'X-API-Key') */
  headerName?: string;

  /** Query parameter name (optional, for fallback) */
  queryParam?: string;

  /**
   * Validation function to verify the API key and return user info
   * @param apiKey - The API key from the request
   * @param req - The Express request object
   * @returns User info if valid, null if invalid
   */
  validator: (apiKey: string, req: Request) => Promise<IAuthUser | null>;
}

/**
 * Payload for generating tokens
 */
export interface GenerateTokenPayload {
  /** User ID (will become 'sub' claim in JWT) */
  id?: string;

  /** Alternative: subject claim directly */
  sub?: string;

  /** User type */
  userType?: string;

  /** User email */
  email?: string;

  /** User groups */
  groups?: string[];

  /** User permissions */
  permissions?: string[];

  /** Additional claims */
  [key: string]: any;
}
