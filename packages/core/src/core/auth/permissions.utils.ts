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
 * Checks if user has any permission that matches the required patterns.
 * Handles wildcard patterns in the required patterns.
 *
 * @param userPermissions - Array of permissions the user has
 * @param requiredPatterns - Array of required permission patterns (may include wildcards)
 * @param separator - The separator character (default: ":")
 * @returns true if user has at least one matching permission
 *
 * @example
 * matchesPermissions(["idm:user:read"], ["idm:user:*"], ":") // true
 * matchesPermissions(["idm:user:read"], ["idm:group:*"], ":") // false
 */
export function matchesPermissions(
  userPermissions: string[],
  requiredPatterns: string[],
  separator: string,
): boolean {
  return requiredPatterns.some((pattern) => {
    if (!pattern.includes("*")) {
      return userPermissions.includes(pattern);
    }
    const regex = patternToRegex(pattern, separator);
    return userPermissions.some((userPerm) => regex.test(userPerm));
  });
}
