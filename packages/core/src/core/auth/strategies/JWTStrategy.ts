import { injectable } from "inversify";
import { Request } from "express";
import { BaseAuthStrategy } from "./BaseAuthStrategy";
import {
  IAuthUser,
  AuthCredentials,
  JWTStrategyOptions,
  GenerateTokenPayload,
  AuthCookieOptions,
} from "../types";
import { AuthenticationError } from "../errors/AuthenticationError";

/**
 * @module Authentication
 * @description Type definitions for authentication module, including user and context interfaces, token generation payload, and strategy configuration options.
 */

// Dynamic import for jsonwebtoken - it's an optional peer dependency
let jwt: typeof import("jsonwebtoken") | null = null;
try {
  jwt = require("jsonwebtoken");
} catch {
  // jsonwebtoken not installed - will throw on first use
}

/**
 * Default JWT strategy options
 */
const DEFAULT_OPTIONS: Required<
  Omit<JWTStrategyOptions, "secret" | "publicKey" | "privateKey" | "validator">
> = {
  algorithm: "HS256",
  expiresIn: 3600,
  issuer: "",
  audience: [],
  extractFrom: "header",
  headerName: "Authorization",
  headerScheme: "Bearer",
  cookieName: "auth_token",
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  },
  refreshToken: {
    enabled: false,
    expiresIn: 604800,
    cookieName: "refresh_token",
  },
  clockTolerance: 0,
  ignoreExpiration: false,
};

/**
 * JWT Authentication Strategy
 *
 * Supports both symmetric (HS256, HS384, HS512) and asymmetric
 * (RS256, RS384, RS512, ES256, ES384, ES512) algorithms.
 *
 * Can extract tokens from:
 * - Authorization header (Bearer scheme)
 * - Cookies
 * - Both (tries header first, then cookie)
 *
 * @category Strategies
 * @example
 * ```typescript
 * // Symmetric JWT via header
 * const jwtStrategy = new JWTStrategy({
 *   secret: process.env.JWT_SECRET,
 *   expiresIn: 3600,
 * });
 *
 * // Asymmetric JWT via cookie
 * const jwtStrategy = new JWTStrategy({
 *   publicKey: fs.readFileSync('./public.pem', 'utf8'),
 *   privateKey: fs.readFileSync('./private.pem', 'utf8'),
 *   algorithm: 'RS256',
 *   extractFrom: 'cookie',
 *   cookieName: 'session',
 *   cookie: {
 *     httpOnly: true,
 *     secure: true,
 *     sameSite: 'strict',
 *     maxAge: 86400000,
 *   }
 * });
 *
 * // Register with container
 * container.bind(AUTH_STRATEGY_TAG).toConstantValue(jwtStrategy);
 * ```
 */
@injectable()
export class JWTStrategy extends BaseAuthStrategy {
  readonly name = "jwt";
  readonly priority: number;

  private options: JWTStrategyOptions & typeof DEFAULT_OPTIONS;

  constructor(options: JWTStrategyOptions = {}) {
    super();

    // Merge with defaults
    this.options = {
      ...DEFAULT_OPTIONS,
      ...options,
      cookie: {
        ...DEFAULT_OPTIONS.cookie,
        ...options.cookie,
      },
      refreshToken: {
        ...DEFAULT_OPTIONS.refreshToken,
        ...options.refreshToken,
      },
    };

    // Default priority
    this.priority = 10;

    // Validate options
    this.validateOptions();
  }

  private validateOptions(): void {
    if (!jwt) {
      throw new Error(
        "JWTStrategy requires 'jsonwebtoken' package. Install it with: npm install jsonwebtoken",
      );
    }

    const algo = this.options.algorithm;
    const isSymmetric = algo.startsWith("HS");
    const isAsymmetric = algo.startsWith("RS") || algo.startsWith("ES");

    if (isSymmetric && !this.options.secret) {
      throw new Error(
        `JWTStrategy: 'secret' is required for symmetric algorithm ${algo}`,
      );
    }

    if (isAsymmetric && !this.options.publicKey) {
      throw new Error(
        `JWTStrategy: 'publicKey' is required for asymmetric algorithm ${algo}`,
      );
    }
  }

  /**
   * Check if this strategy can handle the request
   * Returns true if the expected token source has a value
   */
  canHandle(req: Request): boolean {
    const { extractFrom, headerName, cookieName } = this.options;

    if (extractFrom === "header" || extractFrom === "both") {
      if (req.headers[headerName.toLowerCase()]) {
        return true;
      }
    }

    if (extractFrom === "cookie" || extractFrom === "both") {
      if ((req as any).cookies?.[cookieName]) {
        return true;
      }
    }

    return false;
  }

  /**
   * Authenticate the request by verifying the JWT
   */
  async authenticate(req: Request): Promise<IAuthUser | null> {
    const token = this.extractToken(req);

    if (!token) return null;

    try {
      const verifyOptions: import("jsonwebtoken").VerifyOptions = {
        algorithms: [
          this.options.algorithm as import("jsonwebtoken").Algorithm,
        ],
        clockTolerance: this.options.clockTolerance,
        ignoreExpiration: this.options.ignoreExpiration,
      };

      if (this.options.issuer) {
        verifyOptions.issuer = this.options.issuer;
      }

      if (
        this.options.audience &&
        (Array.isArray(this.options.audience)
          ? this.options.audience.length > 0
          : true)
      ) {
        const audience = this.options.audience;
        if (Array.isArray(audience) && audience.length > 0) {
          verifyOptions.audience = audience as [string, ...string[]];
        } else if (typeof audience === "string") {
          verifyOptions.audience = audience;
        }
      }

      const secret = this.getVerificationKey();
      const decoded = jwt!.verify(
        token,
        secret,
        verifyOptions,
      ) as import("jsonwebtoken").JwtPayload;

      return this.mapPayloadToUser(decoded);
    } catch (error: any) {
      // Handle specific JWT errors
      if (error.name === "TokenExpiredError") {
        throw AuthenticationError.tokenExpired();
      }
      if (error.name === "JsonWebTokenError") {
        if (error.message.includes("signature")) {
          throw AuthenticationError.invalidSignature();
        }
        if (error.message.includes("malformed")) {
          throw AuthenticationError.malformedToken();
        }
        throw AuthenticationError.invalidToken(error.message);
      }
      if (error.name === "NotBeforeError") {
        throw AuthenticationError.custom(
          "Token not yet valid",
          "TOKEN_NOT_ACTIVE",
        );
      }

      // Re-throw AuthenticationErrors
      if (error instanceof AuthenticationError) {
        throw error;
      }

      // Unknown error
      throw AuthenticationError.invalidToken();
    }
  }

  /**
   * Generate a JWT token
   */
  async generateToken(
    payload: GenerateTokenPayload,
    options?: { expiresIn?: number },
  ): Promise<AuthCredentials> {
    if (!jwt) {
      throw new Error("JWTStrategy requires 'jsonwebtoken' package");
    }

    const signingKey = this.getSigningKey();
    const expiresIn = options?.expiresIn ?? this.options.expiresIn;

    // Build JWT payload
    const jwtPayload: Record<string, any> = {
      ...payload,
    };

    // Use 'sub' claim for user ID
    if (payload.id && !payload.sub) {
      jwtPayload.sub = payload.id;
      delete jwtPayload.id;
    }

    const signOptions: import("jsonwebtoken").SignOptions = {
      algorithm: this.options.algorithm as import("jsonwebtoken").Algorithm,
      expiresIn,
    };

    if (this.options.issuer) {
      signOptions.issuer = this.options.issuer;
    }

    if (
      this.options.audience &&
      (Array.isArray(this.options.audience)
        ? this.options.audience.length > 0
        : true)
    ) {
      signOptions.audience = this.options.audience;
    }

    const accessToken = jwt.sign(jwtPayload, signingKey, signOptions);

    const result: AuthCredentials = {
      accessToken,
      tokenType: this.options.extractFrom === "cookie" ? "Cookie" : "Bearer",
      expiresIn,
      expiresAt: new Date(Date.now() + expiresIn * 1000),
    };

    // Generate refresh token if enabled
    if (this.options.refreshToken.enabled) {
      const refreshPayload = {
        sub: jwtPayload.sub,
        type: "refresh",
      };

      result.refreshToken = jwt.sign(refreshPayload, signingKey, {
        algorithm: this.options.algorithm as import("jsonwebtoken").Algorithm,
        expiresIn: this.options.refreshToken.expiresIn,
      });
    }

    // Add cookie configuration if using cookies
    if (
      this.options.extractFrom === "cookie" ||
      this.options.extractFrom === "both"
    ) {
      const cookieOptions: AuthCookieOptions = {
        ...this.options.cookie,
      };

      // Set maxAge if not provided
      if (!cookieOptions.maxAge) {
        cookieOptions.maxAge = expiresIn * 1000;
      }

      result.cookie = {
        name: this.options.cookieName,
        value: accessToken,
        options: cookieOptions,
      };
    }

    return result;
  }

  /**
   * Verify a token without request context
   */
  async verifyToken(token: string): Promise<IAuthUser | null> {
    if (!jwt) {
      throw new Error("JWTStrategy requires 'jsonwebtoken' package");
    }

    try {
      const secret = this.getVerificationKey();
      const decoded = jwt.verify(token, secret, {
        algorithms: [
          this.options.algorithm as import("jsonwebtoken").Algorithm,
        ],
      }) as import("jsonwebtoken").JwtPayload;

      return this.mapPayloadToUser(decoded);
    } catch {
      return null;
    }
  }

  /**
   * Extract token from request based on configuration
   */
  private extractToken(req: Request): string | null {
    const { extractFrom, headerName, headerScheme, cookieName } = this.options;

    // Try header first
    if (extractFrom === "header" || extractFrom === "both") {
      const token = this.extractBearerToken(req, headerName, headerScheme);
      if (token) return token;
    }

    // Try cookie
    if (extractFrom === "cookie" || extractFrom === "both") {
      const token = this.extractCookieToken(req, cookieName);
      if (token) return token;
    }

    return null;
  }

  /**
   * Get the key used for verification
   */
  private getVerificationKey(): string {
    if (this.options.algorithm.startsWith("HS")) {
      return this.options.secret!;
    }
    return this.options.publicKey!;
  }

  /**
   * Get the key used for signing
   */
  private getSigningKey(): string {
    if (this.options.algorithm.startsWith("HS")) {
      return this.options.secret!;
    }
    if (!this.options.privateKey) {
      throw new Error(
        `JWTStrategy: 'privateKey' is required for signing with ${this.options.algorithm}`,
      );
    }
    return this.options.privateKey;
  }

  /**
   * Map JWT payload to IAuthUser
   */
  private mapPayloadToUser(
    payload: import("jsonwebtoken").JwtPayload,
  ): IAuthUser {
    // DEBUG: Log the raw JWT payload
    console.log(
      "[JWTStrategy DEBUG] Raw payload:",
      JSON.stringify(payload, null, 2),
    );
    console.log(
      "[JWTStrategy DEBUG] payload.permissions:",
      payload.permissions,
    );
    console.log("[JWTStrategy DEBUG] payload.roles:", payload.roles);

    return {
      id: payload.sub || payload.id || payload.uid || "",
      userType: payload.userType || payload.type || payload.role || "user",
      email: payload.email,
      groups: payload.groups || [],
      permissions: payload.permissions || payload.scopes || [],
      metadata: {
        iat: payload.iat,
        exp: payload.exp,
        iss: payload.iss,
        aud: payload.aud,
        jti: payload.jti,
      },
      // Preserve any additional claims
      ...Object.fromEntries(
        Object.entries(payload).filter(
          ([key]) =>
            ![
              "sub",
              "id",
              "uid",
              "userType",
              "type",
              "role",
              "email",
              "groups",
              "permissions",
              "scopes",
              "iat",
              "exp",
              "iss",
              "aud",
              "jti",
              "nbf",
            ].includes(key),
        ),
      ),
    };
  }
}
