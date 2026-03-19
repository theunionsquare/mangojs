import { inject, injectable } from "inversify";
import { IPersistenceContext, Context } from "./types";
import { IDatabaseManagerFactory } from "../databasemanager/types";
import { INVERSITY_TYPES } from "../types/inversifyTypes";
import { EntityManager } from "typeorm";

const DEBUG = false;
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
class PostgresPersistenceContext implements IPersistenceContext<EntityManager> {
  private _databaseManagerFactory!: IDatabaseManagerFactory;

  public constructor(
    @inject(INVERSITY_TYPES.DatabaseManagerFactory)
    entityManager: IDatabaseManagerFactory,
  ) {
    this._databaseManagerFactory = entityManager;
  }

  /**
   * Execute operations within a transaction context.
   * @typeParam R - The return type of the transaction
   * @param context - Function receiving the EntityManager
   * @returns Result of the transaction
   */
  async inTransaction<R>(context: Context<EntityManager, R>): Promise<R> {
    const connection =
      (await this._databaseManagerFactory.getConnection()) as EntityManager;

    // Get the underlying PostgreSQL connection process ID (PID)
    if (DEBUG) {
      const pidResult = await connection.query(
        "SELECT pg_backend_pid() as pid",
      );
      const pid = pidResult[0]?.pid;
      const dataSourceName = connection.connection?.name || "unknown";
      console.log(
        `[PostgresPersistenceContext] Starting transaction on connection: ${dataSourceName}, PID: ${pid}`,
      );
    }

    const result = await context(connection);

    return result;
  }
}

export { PostgresPersistenceContext };
