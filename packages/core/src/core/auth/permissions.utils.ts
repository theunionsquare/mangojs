/**
 * Converts a permission pattern with wildcards to a RegExp.
 *
 * @param pattern - Permission pattern (e.g., "idm:user:*" or "idm:*:read")
 * @param separator - The separator character used in permissions (default: ":")
 * @returns RegExp that matches the pattern
 *
 * @example
 * patternToRegex("idm:user:*", ":") // matches "idm:user:read", "idm:user:write"
 * patternToRegex("idm:*:read", ":") // matches "idm:user:read", "idm:group:read"
 * patternToRegex("*", ":") // matches anything
 */
export function patternToRegex(pattern: string, separator: string): RegExp {
  const escapedSeparator = separator.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  const regexPattern = pattern
    .replace(/[.*+?^${}()|[\]\\]/g, "\\$&") // Escape all special chars
    .replace(/\\\*/g, `[^${escapedSeparator}]+`); // Replace \* with "one or more non-separator chars"

  return new RegExp(`^${regexPattern}$`);
}

/**
 * Checks if a user permission (potentially with wildcards) matches a required pattern.
 * The user permission can contain wildcards that grant broader access.
 *
 * @param userPermission - A single user permission (may contain wildcards like "idm:*:*")
 * @param requiredPattern - The required permission pattern
 * @param separator - The separator character (default: ":")
 * @returns true if the user permission grants access to the required pattern
 *
 * @example
 * userPermissionMatchesRequired("idm:*:*", "idm:admins:read", ":") // true
 * userPermissionMatchesRequired("idm:users:*", "idm:admins:read", ":") // false
 * userPermissionMatchesRequired("idm:admins:read", "idm:admins:read", ":") // true
 */
export function userPermissionMatchesRequired(
  userPermission: string,
  requiredPattern: string,
  separator: string,
): boolean {
  // Exact match
  if (userPermission === requiredPattern) {
    return true;
  }

  // If user permission has wildcards, check if it covers the required pattern
  if (userPermission.includes("*")) {
    const regex = patternToRegex(userPermission, separator);
    return regex.test(requiredPattern);
  }

  return false;
}

/**
 * Checks if user has any permission that matches the required patterns.
 * Handles wildcard patterns in BOTH user permissions AND required patterns.
 *
 * @param userPermissions - Array of permissions the user has (may include wildcards)
 * @param requiredPatterns - Array of required permission patterns (may include wildcards)
 * @param separator - The separator character (default: ":")
 * @returns true if user has at least one matching permission
 *
 * @example
 * matchesPermissions(["idm:user:read"], ["idm:user:*"], ":") // true - required pattern has wildcard
 * matchesPermissions(["idm:*:*"], ["idm:admins:read"], ":") // true - user has wildcard permission
 * matchesPermissions(["idm:user:read"], ["idm:group:*"], ":") // false
 */
export function matchesPermissions(
  userPermissions: string[],
  requiredPatterns: string[],
  separator: string,
): boolean {
  return requiredPatterns.some((requiredPattern) => {
    // Check if required pattern (with potential wildcards) matches any user permission
    if (requiredPattern.includes("*")) {
      const regex = patternToRegex(requiredPattern, separator);
      if (userPermissions.some((userPerm) => regex.test(userPerm))) {
        return true;
      }
    }

    // Check if any user permission (with potential wildcards) grants access to required pattern
    return userPermissions.some((userPerm) =>
      userPermissionMatchesRequired(userPerm, requiredPattern, separator),
    );
  });
}
