import { injectable } from 'inversify'
import { IDatabaseManagerFactory } from './IDatabaseManagerFactory'
import mongoose, { Mongoose } from 'mongoose'
import { getContainer } from '../container'
import { INVERSITY_TYPES } from '../types/inversifyTypes'
import { Loggers } from '..'
import { ConnectionError } from '../errors/databaseErrors'

//Get logger
const logger = (
    getContainer().get(INVERSITY_TYPES.LoggerFactory) as Loggers.ILoggerFactory
).getLogger()

@injectable()
export class MongooseDBManagerFactory implements IDatabaseManagerFactory {
    private _instance = 0
    private mongoURI: string
    private databaseName: string
    private connectOptions: mongoose.ConnectOptions = {
        // connectTimeoutMS: 1000,
        // serverSelectionTimeoutMS: 1000,
    }

    constructor(mongoURI: string, databaseName: string) {
        logger.info({ mongoURI }, 'MONGOOSE-CONSTRUCTOR')
        this.mongoURI = mongoURI
        this.databaseName = databaseName
    }

    dbConnection(): void {}

    async getConnection(): Promise<Mongoose> {
        try {
            logger.debug(
                { mongoURI: this.mongoURI, mongoDB: this.databaseName },
                'MONGOOSE-START-CONNECTION'
            )
            const connection = await mongoose.connect(
                `${this.mongoURI}/${this.databaseName}`,
                this.connectOptions
            )
            logger.debug('SUCCESSFULLY CONNECTED')

            return connection
        } catch (e) {
            const message = `Can't connect to ${this.mongoURI}/${this.databaseName}`
            logger.error(message)
            throw new ConnectionError(message)
        }
    }

    async getStatus() {
        return mongoose.STATES[mongoose.connection.readyState]
    }
}
