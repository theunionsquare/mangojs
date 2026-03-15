import { Newable } from "inversify";

/**
 * Service identifier for dependency injection.
 * Can be a string, symbol, constructor, or function.
 * @template TInstance - The type of the service instance
 */
export type ServiceIdentifier<TInstance = unknown> =
  | string
  | symbol
  | Newable<TInstance>
  | Function;
