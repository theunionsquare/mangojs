/**
 * Hashes a password using SHA-256
 * @param password
 * @returns
 */
export const hashedPassword = (password: string) => {
  const crypto = require("crypto");
  return crypto.createHash("sha256").update(password).digest("hex");
};
