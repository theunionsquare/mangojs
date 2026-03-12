import { IAuthContext, IAuthUser } from "./types";

/**
 * Immutable authentication context
 *
 * Attached to requests after authentication middleware runs.
 * Provides helper methods for authorization checks.
 *
 * @example
 * ```typescript
 * // In middleware
 * req.authContext = AuthContext.authenticated(user, 'jwt');
 *
 * // In controller
 * if (req.authContext.hasUserType('ADMIN')) {
 *   // admin logic
 * }
 *
 * if (req.authContext.hasPermission('users:delete')) {
 *   // delete user
 * }
 * ```
 */
export class AuthContext implements IAuthContext {
  readonly user: IAuthUser | null;
  readonly strategy: string | null;
  readonly isAuthenticated: boolean;
  readonly authenticatedAt?: Date;

  constructor(
    user: IAuthUser | null,
    strategy: string | null,
    authenticatedAt?: Date
  ) {
    this.user = user;
    this.strategy = strategy;
    this.isAuthenticated = user !== null;
    this.authenticatedAt = authenticatedAt;

    // Freeze the object to ensure immutability
    Object.freeze(this);
  }

  /**
   * Create an unauthenticated context
   *
   * @example
   * ```typescript
   * req.authContext = AuthContext.anonymous();
   * ```
   */
  static anonymous(): AuthContext {
    return new AuthContext(null, null);
  }

  /**
   * Create an authenticated context
   *
   * @param user - Authenticated user info
   * @param strategy - Name of the strategy that authenticated
   *
   * @example
   * ```typescript
   * req.authContext = AuthContext.authenticated(user, 'jwt');
   * ```
   */
  static authenticated(user: IAuthUser, strategy: string): AuthContext {
    return new AuthContext(user, strategy, new Date());
  }

  /**
   * Check if user has a specific permission
   *
   * @example
   * ```typescript
   * if (authContext.hasPermission('users:delete')) { ... }
   * ```
   */
  hasPermission(permission: string): boolean {
    if (!this.user?.permissions) return false;
    return this.user.permissions.includes(permission);
  }

  /**
   * Check if user has any of the specified permissions
   *
   * @example
   * ```typescript
   * if (authContext.hasAnyPermission(['users:read', 'users:write'])) { ... }
   * ```
   */
  hasAnyPermission(permissions: string[]): boolean {
    if (!this.user?.permissions || permissions.length === 0) return false;
    return permissions.some((p) => this.user!.permissions!.includes(p));
  }

  /**
   * Check if user has all of the specified permissions
   *
   * @example
   * ```typescript
   * if (authContext.hasAllPermissions(['users:read', 'users:write'])) { ... }
   * ```
   */
  hasAllPermissions(permissions: string[]): boolean {
    if (!this.user?.permissions) return false;
    if (permissions.length === 0) return true;
    return permissions.every((p) => this.user!.permissions!.includes(p));
  }

  /**
   * Check if user has a specific user type
   *
   * @example
   * ```typescript
   * if (authContext.hasUserType('ADMIN')) { ... }
   * ```
   */
  hasUserType(type: string): boolean {
    return this.user?.userType === type;
  }

  /**
   * Check if user has any of the specified user types
   *
   * @example
   * ```typescript
   * if (authContext.hasAnyUserType(['ADMIN', 'MODERATOR'])) { ... }
   * ```
   */
  hasAnyUserType(types: string[]): boolean {
    if (!this.user) return false;
    return types.includes(this.user.userType);
  }

  /**
   * Check if user belongs to a specific group
   *
   * @example
   * ```typescript
   * if (authContext.belongsToGroup('premium_users')) { ... }
   * ```
   */
  belongsToGroup(group: string): boolean {
    if (!this.user?.groups) return false;
    return this.user.groups.includes(group);
  }

  /**
   * Check if user belongs to any of the specified groups
   *
   * @example
   * ```typescript
   * if (authContext.belongsToAnyGroup(['admins', 'moderators'])) { ... }
   * ```
   */
  belongsToAnyGroup(groups: string[]): boolean {
    if (!this.user?.groups || groups.length === 0) return false;
    return groups.some((g) => this.user!.groups!.includes(g));
  }

  /**
   * Check if user belongs to all of the specified groups
   *
   * @example
   * ```typescript
   * if (authContext.belongsToAllGroups(['verified', 'premium'])) { ... }
   * ```
   */
  belongsToAllGroups(groups: string[]): boolean {
    if (!this.user?.groups) return false;
    if (groups.length === 0) return true;
    return groups.every((g) => this.user!.groups!.includes(g));
  }

  /**
   * Get a user metadata field
   *
   * @example
   * ```typescript
   * const tenantId = authContext.getMetadata<string>('tenantId');
   * ```
   */
  getMetadata<T = any>(key: string): T | undefined {
    return this.user?.metadata?.[key] as T | undefined;
  }

  /**
   * Get a custom user field
   *
   * @example
   * ```typescript
   * const organizationId = authContext.getUserField<string>('organizationId');
   * ```
   */
  getUserField<T = any>(key: string): T | undefined {
    if (!this.user) return undefined;
    return this.user[key] as T | undefined;
  }

  /**
   * Create a JSON-serializable representation
   */
  toJSON(): Record<string, any> {
    return {
      user: this.user,
      strategy: this.strategy,
      isAuthenticated: this.isAuthenticated,
      authenticatedAt: this.authenticatedAt?.toISOString(),
    };
  }

  /**
   * Create a log-friendly string representation
   */
  toString(): string {
    if (!this.isAuthenticated) {
      return "[AuthContext: anonymous]";
    }
    return `[AuthContext: ${this.user?.userType}:${this.user?.id} via ${this.strategy}]`;
  }
}
