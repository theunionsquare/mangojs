import { inject, injectable } from 'inversify'
import { SetUpDatabaseRecord } from '../../types/database/SetUpDataBaseRecord'
import { INVERSITY_TYPES } from '../../types/inversifyTypes'
import { IDatabaseManagerFactory } from '../../databasemanager/IDatabaseManagerFactory'
import { ILoggerFactory } from '../../loggers'
import { SetUpDatabaseAction } from '../../types/database'
import { Mongoose } from 'mongoose'

@injectable()
export class MongoSetUpDatabaseAction implements SetUpDatabaseAction {
    private _database: IDatabaseManagerFactory
    private _logger: ILoggerFactory

    constructor(
        @inject(INVERSITY_TYPES.DatabaseManagerFactory)
        database: IDatabaseManagerFactory,
        @inject(INVERSITY_TYPES.LoggerFactory)
        logger: ILoggerFactory
    ) {
        this._database = database
        this._logger = logger
    }

    async onFileContent(
        record: SetUpDatabaseRecord,
        content: string,
        dropBeforeInsert: boolean = true
    ): Promise<void> {
        this._logger.getLogger().info({ record }, 'START PROCESS FILE')
        const connection = await this._database.getConnection()
        const mongo = await connection.mongoose.connection.getClient()
        const parsedContent = JSON.parse(content)

        // check if collection exists
        const collectionExists = await mongo
            .db()
            .listCollections({ name: record.collection }, { nameOnly: true })
            .toArray()
        this._logger.getLogger().info({ collectionExists }, `EXISTS`)
        if (collectionExists.length === 0) {
            mongo.db().createCollection(record.collection)
            this._logger.getLogger().info(`${record.collection} CREATED`)
        } else if (dropBeforeInsert) {
            await mongo.db().collection(record.collection).drop()
            this._logger.getLogger().info(`${record.collection} DROPPED`)
        }

        let count = 0
        for (const row of parsedContent) {
            await mongo.db().collection(record.collection).insertOne(row)
            this._logger
                .getLogger()
                .info(`${record.collection}: ROW ${count} ADDED`)
            count = count + 1
        }
    }
    onError(err: Error): void {
        throw new Error('Method not implemented.')
    }
}
