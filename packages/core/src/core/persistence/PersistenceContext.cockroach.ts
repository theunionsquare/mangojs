import { inject, injectable } from "inversify";
import { IPersistenceContext, Context } from "./types";
import { IDatabaseManagerFactory } from "../databasemanager/types";
import { INVERSITY_TYPES } from "../types/inversifyTypes";
import mongoose from "mongoose";

/**
 * CockroachDB persistence context for transaction management.
 *
 * Works with CockRoachDBManagerFactory to execute operations
 * within a transaction context.
 */
@injectable()
class CockroachPersistenceContext implements IPersistenceContext<mongoose.Connection> {
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
        console.log('Start Cockroach transaction')
        //TO DO: Start transaction and close it once done
        const connection =
            (await this._databaseManagerFactory.getConnection()) as mongoose.Connection
        const result = await context(connection)
        console.log('End Cockroach transaction')
        return result
    }
}

export { CockroachPersistenceContext }
