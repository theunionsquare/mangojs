import { AbstractNewable, Newable } from "inversify";

/**
 * Service identifier for dependency injection.
 * Can be a string, symbol, constructor, or abstract constructor.
 * @template TInstance - The type of the service instance
 */
export type ServiceIdentifier<TInstance = unknown> =
  | string
  | symbol
  | Newable<TInstance>
  | AbstractNewable<TInstance>;
