import { injectable } from 'inversify'
import { IDatabaseManagerFactory } from './types'
import * as mongoDB from 'mongodb'
import { ConnectionError } from '../errors/databaseErrors'

/**
 * MongoDB native driver manager factory.
 *
 * @deprecated This class will be removed in a future version.
 * Use PostgresDBManagerFactory or CockRoachDBManagerFactory instead.
 */
@injectable()
export class MongoDBEntityManagerFactory implements IDatabaseManagerFactory {
    private _instance = 0
    private _connectionString: string = `${process.env.MONGODB_CONNECTION_STRING}`
    private _mongoClient: mongoDB.MongoClient
    private _mongoConnection: mongoDB.MongoClient | undefined

    constructor() {
        // check connection
        if (process.env.MONGODB_CONNECTION_STRING == undefined) {
            throw new Error("missing env 'MONGODB_CONNECTION_STRING'")
        }
        this._mongoClient = new mongoDB.MongoClient(this._connectionString)
    }
    getStatus() {
        throw new Error('Method not implemented.')
    }

    async dbConnection(): Promise<mongoDB.MongoClient> {
        this._mongoConnection = await this._mongoClient.connect()
        console.log(`Connection DB started`)
        return this._mongoConnection
    }

    async getConnection(): Promise<mongoDB.MongoClient> {
        try {
            // this is just to count how many times our singleton is called.
            this._instance++
            console.log(`DbConnection called ${this._instance} times`)

            if (this._mongoConnection != undefined) {
                console.log(`db connection is already alive`)
                return this._mongoConnection
            } else {
                console.log(`getting new db connection`)
                this._mongoConnection = await this.dbConnection()
                return this._mongoConnection
            }
        } catch (e) {
            throw new ConnectionError(`${JSON.stringify(e)}`)
        }
    }
}
