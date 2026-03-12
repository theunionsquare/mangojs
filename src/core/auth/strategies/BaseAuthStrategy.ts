import { injectable } from "inversify";
import { Request } from "express";
import { IAuthStrategy } from "./IAuthStrategy";
import { IAuthUser, AuthCredentials, GenerateTokenPayload } from "../types";

/**
 * Abstract base class for authentication strategies
 *
 * Provides common functionality and helper methods for extracting
 * credentials from requests. Extend this class to create custom strategies.
 *
 * @example
 * ```typescript
 * @injectable()
 * class MyStrategy extends BaseAuthStrategy {
 *   readonly name = 'my-strategy';
 *   readonly priority = 50;
 *
 *   async authenticate(req: Request): Promise<IAuthUser | null> {
 *     const token = this.extractBearerToken(req);
 *     if (!token) return null;
 *     // validate token...
 *   }
 * }
 * ```
 */
@injectable()
export abstract class BaseAuthStrategy implements IAuthStrategy {
  /**
   * Unique name for this strategy (must be implemented)
   */
  abstract readonly name: string;

  /**
   * Default priority (can be overridden)
   * Lower numbers = higher priority
   */
  readonly priority: number = 100;

  /**
   * Authenticate the request (must be implemented)
   */
  abstract authenticate(req: Request): Promise<IAuthUser | null>;

  /**
   * Default implementation - strategy can handle any request
   * Override to add request filtering for early bailout
   */
  canHandle(req: Request): boolean {
    return true;
  }

  /**
   * Extract Bearer token from Authorization header
   *
   * @param req - Express request
   * @param headerName - Header name (default: 'authorization')
   * @param scheme - Expected scheme (default: 'bearer')
   * @returns Token string or null if not found
   *
   * @example
   * ```typescript
   * // Authorization: Bearer eyJhbGc...
   * const token = this.extractBearerToken(req);
   * ```
   */
  protected extractBearerToken(
    req: Request,
    headerName: string = "authorization",
    scheme: string = "bearer"
  ): string | null {
    const authHeader = req.headers[headerName.toLowerCase()];
    if (!authHeader || typeof authHeader !== "string") return null;

    const parts = authHeader.split(" ");
    if (parts.length !== 2) return null;

    const [headerScheme, token] = parts;
    if (headerScheme.toLowerCase() !== scheme.toLowerCase()) return null;

    return token || null;
  }

  /**
   * Extract token from cookie
   *
   * @param req - Express request
   * @param cookieName - Name of the cookie
   * @returns Cookie value or null if not found
   *
   * @example
   * ```typescript
   * const token = this.extractCookieToken(req, 'auth_token');
   * ```
   */
  protected extractCookieToken(req: Request, cookieName: string): string | null {
    const cookies = (req as any).cookies;
    if (!cookies || typeof cookies !== "object") return null;
    return cookies[cookieName] || null;
  }

  /**
   * Extract API key from header
   *
   * @param req - Express request
   * @param headerName - Header name (default: 'x-api-key')
   * @returns API key or null if not found
   *
   * @example
   * ```typescript
   * // X-API-Key: sk_live_abc123
   * const apiKey = this.extractApiKey(req);
   * ```
   */
  protected extractApiKey(
    req: Request,
    headerName: string = "x-api-key"
  ): string | null {
    const value = req.headers[headerName.toLowerCase()];
    if (!value || typeof value !== "string") return null;
    return value;
  }

  /**
   * Extract value from query parameter
   *
   * @param req - Express request
   * @param paramName - Query parameter name
   * @returns Parameter value or null if not found
   */
  protected extractQueryParam(req: Request, paramName: string): string | null {
    const value = req.query[paramName];
    if (!value || typeof value !== "string") return null;
    return value;
  }

  /**
   * Get client IP address from request
   * Handles common proxy headers
   */
  protected getClientIp(req: Request): string | null {
    const forwardedFor = req.headers["x-forwarded-for"];
    if (forwardedFor) {
      const ips = (typeof forwardedFor === "string" ? forwardedFor : forwardedFor[0]).split(",");
      return ips[0]?.trim() || null;
    }

    const realIp = req.headers["x-real-ip"];
    if (realIp && typeof realIp === "string") {
      return realIp;
    }

    return req.ip || req.socket?.remoteAddress || null;
  }

  /**
   * Get user agent from request
   */
  protected getUserAgent(req: Request): string | null {
    const ua = req.headers["user-agent"];
    return typeof ua === "string" ? ua : null;
  }
}
