/**
 * Authentication error (distinct from AuthorizationError)
 *
 * Authentication = "Who are you?" (401 Unauthorized)
 * Authorization = "What can you do?" (403 Forbidden)
 *
 * Use this error when:
 * - Token is missing, expired, or invalid
 * - Credentials are incorrect
 * - API key is invalid
 * - Session has expired
 */
export class AuthenticationError extends Error {
  public readonly code: string;
  public readonly statusCode: number = 401;
  public readonly name = "AuthenticationError";

  constructor(message: string, code: string = "AUTHENTICATION_FAILED") {
    super(message);
    this.code = code;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AuthenticationError);
    }
  }

  /**
   * Create error for expired token
   */
  static tokenExpired(): AuthenticationError {
    return new AuthenticationError("Token has expired", "TOKEN_EXPIRED");
  }

  /**
   * Create error for invalid token
   */
  static invalidToken(details?: string): AuthenticationError {
    const message = details ? `Invalid token: ${details}` : "Invalid token";
    return new AuthenticationError(message, "INVALID_TOKEN");
  }

  /**
   * Create error for missing credentials
   */
  static missingCredentials(): AuthenticationError {
    return new AuthenticationError(
      "No authentication credentials provided",
      "MISSING_CREDENTIALS"
    );
  }

  /**
   * Create error for invalid credentials
   */
  static invalidCredentials(): AuthenticationError {
    return new AuthenticationError("Invalid credentials", "INVALID_CREDENTIALS");
  }

  /**
   * Create error for invalid API key
   */
  static invalidApiKey(): AuthenticationError {
    return new AuthenticationError("Invalid API key", "INVALID_API_KEY");
  }

  /**
   * Create error for invalid signature
   */
  static invalidSignature(): AuthenticationError {
    return new AuthenticationError(
      "Token signature verification failed",
      "INVALID_SIGNATURE"
    );
  }

  /**
   * Create error for malformed token
   */
  static malformedToken(): AuthenticationError {
    return new AuthenticationError(
      "Token is malformed or corrupted",
      "MALFORMED_TOKEN"
    );
  }

  /**
   * Create a custom authentication error
   */
  static custom(message: string, code: string): AuthenticationError {
    return new AuthenticationError(message, code);
  }

  /**
   * Get safe response for client (no internal details)
   */
  toClientResponse(): { error: string; code: string; message: string } {
    return {
      error: this.name,
      code: this.code,
      message: this.message,
    };
  }

  /**
   * Get detailed log string
   */
  toLogString(): string {
    return `[${this.name}] ${this.code}: ${this.message}`;
  }
}
