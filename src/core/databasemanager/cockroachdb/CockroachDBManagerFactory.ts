import { injectable } from 'inversify'
import { IDatabaseManagerFactory } from '../IDatabaseManagerFactory'
import { getContainer } from '../../container'
import { INVERSITY_TYPES } from '../../types/inversifyTypes'
import { Loggers } from '../..'
import { ConnectionError } from '../../errors/databaseErrors'
import { DataSource } from 'typeorm'
import { URL } from 'url'

import type {
    CockroachUrl,
    CockroachConnection,
} from '../../types/database/cockroach'

//Get logger
const logger = (
    getContainer().get(INVERSITY_TYPES.LoggerFactory) as Loggers.ILoggerFactory
).getLogger()

@injectable()
export class CockRoachDBManagerFactory implements IDatabaseManagerFactory {
    private _instance = 0
    private connection: CockroachUrl | CockroachConnection
    private entities: any[]
    private synchronize: boolean
    private logging: boolean

    constructor(
        connection: CockroachUrl | CockroachConnection,
        entities: any[] = [],
        synchronize: boolean = true,
        logging: boolean = false
    ) {
        logger.info({ connection }, 'COCKROACH-CONSTRUCTOR')
        this.connection = connection
        this.entities = entities
        this.synchronize = synchronize
        this.logging = logging
    }

    dbConnection(): void {}

    async getConnection(): Promise<{}> {
        try {
            logger.debug(
                { host: this.connection },
                'COCKROACH-START-CONNECTION'
            )

            if ('url' in this.connection) {
                logger.debug('COCKROACH-URL')
                const dbUrl = new URL(this.connection.url)
                const routingId = dbUrl.searchParams.get('options')
                dbUrl.searchParams.delete('options')
                logger.debug({ dbUrl }, 'COCKROACH-URL')
                const AppDataSource = new DataSource({
                    type: 'cockroachdb',
                    url: this.connection.url,
                    ssl: true,
                    timeTravelQueries: false,
                    entities: this.entities,
                    synchronize: true,
                })
                await AppDataSource.initialize()
                logger.debug('COCKROACH-SUCCESSFULLY-CONNECTED')

                return AppDataSource.manager
            } else {
                const AppDataSource = new DataSource({
                    ...this.connection,
                    ...{
                        type: 'cockroachdb',
                        entities: this.entities,
                        synchronize: true,
                        logging: false,
                        timeTravelQueries: true,
                    },
                })
                await AppDataSource.initialize()
                logger.debug('COCKROACH-SUCCESSFULLY-CONNECTED')

                return AppDataSource.manager
            }
        } catch (e) {
            const message = `Can't connect to ${this.connection}`
            logger.error({ e }, message)
            throw new ConnectionError(message)
        }
    }

    async getStatus() {
        return true
    }
}
