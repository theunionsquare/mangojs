import { inject, injectable } from "inversify";
import type { IPersistenceContext, Context } from "./types.js";
import type { IDatabaseManagerFactory } from "../databasemanager/types.js";
import { INVERSITY_TYPES } from "../types/inversifyTypes.js";
import mongoose from "mongoose";

/**
 * Mongoose persistence context for transaction management.
 *
 * Works with MongooseDBManagerFactory to execute operations
 * within a Mongoose connection context.
 */
@injectable()
class MongoosePersistenceContext implements IPersistenceContext<mongoose.Connection> {
    private _databaseManagerFactory!: IDatabaseManagerFactory

    public constructor(
        @inject(INVERSITY_TYPES.DatabaseManagerFactory)
        entityManager: IDatabaseManagerFactory
    ) {
        this._databaseManagerFactory = entityManager
    }

    /**
     * Execute operations within a transaction context.
     * @typeParam R - The return type of the transaction
     * @param context - Function receiving the mongoose Connection
     * @returns Result of the transaction
     */
    async inTransaction<R>(context: Context<mongoose.Connection, R>): Promise<R> {
        console.log('Start Mongoose transaction')
        const mongooseConn =
            (await this._databaseManagerFactory.getConnection()) as mongoose.Connection
        const result = await context(mongooseConn)
        console.log('End transaction')
        return result
    }
}

export { MongoosePersistenceContext }
