import pino, { Logger, LoggerOptions } from "pino";
import { ILoggerFactory } from "./types";
import { injectable } from "inversify";

/**
 * Pino-based logger implementation.
 *
 * @example
 * const logger = new LoggerPino('my-app', 'info');
 * const pino = logger.getLogger();
 * pino.info('Hello world');
 */
@injectable()
export class LoggerPino implements ILoggerFactory {
  private logger: Logger;
  private loggerOptions: LoggerOptions;

  constructor(name: string, logLevel: string) {
    this.loggerOptions = {
      name,
      level: logLevel,
    };
    this.logger = pino(this.loggerOptions);
  }

  getLogger() {
    return this.logger;
  }
}
