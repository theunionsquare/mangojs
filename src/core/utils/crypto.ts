import crypto from "crypto";

/**
 * Hashes a password using SHA-256.
 *
 * @param password - The plaintext password to hash
 * @returns The SHA-256 hash as a hex string
 *
 * @example
 * const hash = hashedPassword('mypassword');
 */
export const hashedPassword = (password: string): string => {
  return crypto.createHash("sha256").update(password).digest("hex");
};
