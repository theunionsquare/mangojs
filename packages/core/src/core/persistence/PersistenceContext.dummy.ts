import { inject, injectable } from "inversify";
import { IPersistenceContext, Context } from "./types";
import { IDatabaseManagerFactory } from "../databasemanager/types";
import { INVERSITY_TYPES } from "../types/inversifyTypes";

/**
 * Dummy persistence context for testing without a real database.
 *
 * Returns empty results without executing actual transactions.
 */
@injectable()
class DummyPersistenceContext implements IPersistenceContext<unknown> {

    public constructor(
        @inject(INVERSITY_TYPES.DatabaseManagerFactory)
        entityManager: IDatabaseManagerFactory
    ) {
    }

    /**
     * Execute operations within a transaction context.
     * @typeParam R - The return type of the transaction
     * @param context - Function receiving the connection (unused in dummy)
     * @returns Empty object
     */
    async inTransaction<R>(context: Context<unknown, R>): Promise<R> {
        console.log('Start dummy transaction')
        //TO DO: Start transaction and close it once done
        return {} as R
    }
}

export { DummyPersistenceContext }
