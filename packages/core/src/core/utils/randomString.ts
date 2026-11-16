import { generateRandomString } from "./generics.js";

/**
 * @deprecated Use generateRandomString from './generics.js' instead.
 */
export const randomstring = (length: number): string => {
  return generateRandomString(length);
};
