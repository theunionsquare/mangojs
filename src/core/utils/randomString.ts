import { generateRandomString } from "./generics";

/**
 * @deprecated Use generateRandomString from './generics' instead.
 */
export const randomstring = (length: number): string => {
  return generateRandomString(length);
};
