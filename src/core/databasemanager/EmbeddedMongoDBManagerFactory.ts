import { injectable } from 'inversify'
import { IDatabaseManagerFactory } from './IDatabaseManagerFactory'
import mongoose from 'mongoose'
import { ConnectionError } from '../errors/databaseErrors'

@injectable()
export class EmbeddedMongoDBManagerFactory implements IDatabaseManagerFactory {
    private _instance = 0
    private signature = 'EMBEDDED-MONGODB'

    constructor() {
        console.log(`${this.signature}-CONSTRUCTOR`)
    }
    getStatus() {
        throw new Error('Method not implemented.')
    }

    async dbConnection(): Promise<void> {
        console.log(`MONGOOSE-START-CONNECTION`)
        // const tingoDB = tingoDb().Db;
        // var db = new tingoDB("./tmp/embeddeddb/", {});

        // return this._mongooseConn;
    }

    async getConnection(): Promise<typeof mongoose> {
        try {
            console.log(`${this.signature}-GET-CONNECTION`)
            const connection = await mongoose.connect('')
            console.log(
                `${this.signature}:Successfully connected to ${'asdas'}`
            )
            return connection
        } catch (e) {
            throw new ConnectionError(`${JSON.stringify(e)}`)
        }
    }
}
