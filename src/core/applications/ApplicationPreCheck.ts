import { inject, injectable } from 'inversify'
import { IDatabaseManagerFactory } from '../databasemanager/IDatabaseManagerFactory'
import { INVERSITY_TYPES } from '../types/inversifyTypes'
import { IApplicationPreCheck } from '../types'
import { Loggers } from '..'
import { getContainer } from '../container'

// Get logger
const logger = (
    getContainer().get(INVERSITY_TYPES.LoggerFactory) as Loggers.ILoggerFactory
).getLogger()

@injectable()
export class ApplicationPreCheck implements IApplicationPreCheck {
    // database factory
    private _databaseManagerFactory!: IDatabaseManagerFactory

    public constructor(
        @inject(INVERSITY_TYPES.DatabaseManagerFactory)
        entityManager: IDatabaseManagerFactory
    ) {
        console.log('ApplicationPreCheck: Starting up')
        this._databaseManagerFactory = entityManager
    }

    public async startCheck() {
        logger.info('START CHECKLIST')
        console.log('TEST DB CONNECTION')
        const connection = await this._databaseManagerFactory.getConnection()
        const status = await this._databaseManagerFactory.getStatus()
        console.log(`TEST DB CONNECTION: ${status}`)
    }
}
