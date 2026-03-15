import { v4 as uuidv4 } from "uuid";

/**
 * Generates a UUID v4 string.
 *
 * @returns A unique UUID string
 *
 * @example
 * const id = generateUUID();
 * // Returns: '550e8400-e29b-41d4-a716-446655440000'
 */
export const generateUUID = (): string => {
  return uuidv4();
};

/**
 * Generates a random alphanumeric string.
 *
 * @param length - Length of the string (default: 10)
 * @returns Random alphanumeric string
 *
 * @example
 * const token = generateRandomString(20);
 */
export function generateRandomString(length: number = 10): string {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

/**
 * Generates a random password.
 *
 * @param length - Length of the password (default: 12)
 * @returns Random alphanumeric password
 */
export function generateRandomPassword(length: number = 12): string {
  return generateRandomString(length);
}

/**
 * Generates a magic link token for passwordless authentication.
 *
 * @param size - Length of the token (default: 95)
 * @returns Random token string
 */
export function generateMagicLink(size: number = 95): string {
  return generateRandomString(size);
}
