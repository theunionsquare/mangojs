/**
 * Logger types for the MangoJS framework.
 */

/**
 * Base logger interface with common logging methods.
 */
export interface ILogger {
  info(msg: string, ...args: unknown[]): void;
  debug(msg: string, ...args: unknown[]): void;
  error(msg: string, ...args: unknown[]): void;
  warn(msg: string, ...args: unknown[]): void;
}

/**
 * Factory interface for creating logger instances.
 *
 * @example
 * class MyLogger implements ILoggerFactory {
 *   getLogger() {
 *     return console;
 *   }
 * }
 */
export interface ILoggerFactory {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getLogger(): any;
}
