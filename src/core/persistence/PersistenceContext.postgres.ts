import { inject, injectable } from "inversify";
import { IPersistenceContext, Context } from "./types";
import { IDatabaseManagerFactory } from "../databasemanager/types";
import { INVERSITY_TYPES } from "../types/inversifyTypes";
import { EntityManager } from "typeorm";

/**
 * PostgreSQL persistence context for transaction management.
 *
 * Works with PostgresDBManagerFactory to execute operations
 * within a TypeORM EntityManager context.
 *
 * @example
 * const result = await persistenceContext.inTransaction(async (em) => {
 *   return em.getRepository(User).find();
 * });
 */
@injectable()
class PostgresPersistenceContext implements IPersistenceContext {
  private _databaseManagerFactory!: IDatabaseManagerFactory;

  public constructor(
    @inject(INVERSITY_TYPES.DatabaseManagerFactory)
    entityManager: IDatabaseManagerFactory
  ) {
    //console.log({}, "MongoosePersistenceContext: Starting up");
    this._databaseManagerFactory = entityManager;
  }

  /**
   * Start a transaction
   * @param context
   * @returns
   */
  async inTransaction(context: Context<EntityManager>): Promise<{}> {
    console.log("Start postgres transaction");
    //TO DO: Start transaction and close it once done
    const connection =
      (await this._databaseManagerFactory.getConnection()) as EntityManager;
    const a = context(connection);
    console.log("End postgres transaction");
    return a;
  }
}

export { PostgresPersistenceContext };
