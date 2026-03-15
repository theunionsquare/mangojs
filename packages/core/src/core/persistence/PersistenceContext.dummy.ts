import { inject, injectable } from "inversify";
import { IPersistenceContext, Context } from "./types";
import { IDatabaseManagerFactory } from "../databasemanager/types";
import { INVERSITY_TYPES } from "../types/inversifyTypes";
import mongoose from "mongoose";

/**
 * Dummy persistence context for testing without a real database.
 *
 * Returns empty results without executing actual transactions.
 */
@injectable()
class DummyPersistenceContext implements IPersistenceContext {

    public constructor(
        @inject(INVERSITY_TYPES.DatabaseManagerFactory)
        entityManager: IDatabaseManagerFactory
    ) {
    }

    /**
     * Start a transaction
     * @param context
     * @returns
     */
    async inTransaction(context: Context<mongoose.Connection>): Promise<{}> {
        console.log('Start dummy transaction')
        //TO DO: Start transaction and close it once done
        return {}
    }
}

export { DummyPersistenceContext }
