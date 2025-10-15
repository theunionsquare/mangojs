import pino, { Logger, LoggerOptions } from 'pino'
import { ILoggerFactory } from './ILoggerFactory'
import { injectable } from 'inversify'

@injectable()
export class LoggerPino implements ILoggerFactory {
    private logger: Logger
    private loggerOptions: LoggerOptions

    constructor(name: string, logLevel: string) {
        this.loggerOptions = {
            name,
            level: logLevel,
        }
        this.logger = pino(this.loggerOptions)
    }

    getLogger() {
        return this.logger
    }
}
