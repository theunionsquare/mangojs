/**
 * @deprecated Use string user types instead for flexibility.
 * The new auth system accepts any string as userType, allowing
 * custom roles like 'MODERATOR', 'SUPPORT', 'API_CLIENT', etc.
 *
 * This enum is maintained for backwards compatibility with existing code.
 *
 * @example
 * ```typescript
 * // Old way (deprecated)
 * if (user.userType === AuthUserType.ADMIN) { ... }
 *
 * // New way - use string literals or your own constants
 * if (authContext.hasUserType('ADMIN')) { ... }
 * if (authContext.hasAnyUserType(['ADMIN', 'MODERATOR'])) { ... }
 * ```
 */
export enum AuthUserType {
  ADMIN = "ADMIN",
  PARTNER = "PARTNER",
  USER = "USER",
}

export enum PartnerUserStatus {
  PENDING = "PENDING",
  ACTIVE = "ACTIVE",
  DISABLED = "DISABLED",
}

export enum PartnerStatus {
  PENDING = "PENDING",
  UNDER_REVIEW = "UNDER_REVIEW",
  ACTIVE = "ACTIVE",
  DISABLED = "DISABLED",
}

export enum UserStatus {
  PENDING = "PENDING",
  ACTIVE = "ACTIVE",
  DISABLED = "DISABLED",
}

export enum AdminUserStatus {
  PENDING = "PENDING",
  ACTIVE = "ACTIVE",
  DISABLED = "DISABLED",
}
