import { inject, injectable } from "inversify";
import { IPersistenceContext, Context } from "./types";
import { IDatabaseManagerFactory } from "../databasemanager/types";
import { INVERSITY_TYPES } from "../types/inversifyTypes";
import mongoose from "mongoose";

/**
 * Mongoose persistence context for transaction management.
 *
 * Works with MongooseDBManagerFactory to execute operations
 * within a Mongoose connection context.
 */
@injectable()
class MongoosePersistenceContext implements IPersistenceContext {
    private _databaseManagerFactory!: IDatabaseManagerFactory

    public constructor(
        @inject(INVERSITY_TYPES.DatabaseManagerFactory)
        entityManager: IDatabaseManagerFactory
    ) {
        //console.log({}, "MongoosePersistenceContext: Starting up");
        this._databaseManagerFactory = entityManager
    }

    /**
     *
     * @param context
     * @returns
     */
    async inTransaction(context: Context<mongoose.Connection>): Promise<{}> {
        console.log('Start Mongoose transaction')
        const mongooseConn =
            (await this._databaseManagerFactory.getConnection()) as mongoose.Connection
        const a = context(mongooseConn)
        console.log('End transaction')
        //const response = context.process;
        return a
    }
}

export { MongoosePersistenceContext }
