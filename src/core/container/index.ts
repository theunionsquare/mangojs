import { Container } from 'inversify'
import { INVERSITY_TYPES } from '..'
import { ILoggerFactory, LoggerPino } from '../loggers'

/**
 * Create binding container
 */

let defaultContainer: Container | undefined = undefined

export const getContainer = (): Container => {
    if (defaultContainer === undefined) {
        defaultContainer = new Container()
        defaultContainer
            .bind<ILoggerFactory>(INVERSITY_TYPES.LoggerFactory)
            .toConstantValue(new LoggerPino('server', 'debug'))
    }
    return defaultContainer
}

//const DefaultContainer = new Container();
//DefaultContainer.bind<ILoggerFactory>(
//  INVERSITY_TYPES.LoggerFactory
//).toConstantValue(new LoggerPino("server", "debug"));

//export { DefaultContainer };
