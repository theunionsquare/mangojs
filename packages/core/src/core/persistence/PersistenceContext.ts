import { inject, injectable } from "inversify";
import type { IPersistenceContext, Context } from "./types.js";
import type { IDatabaseManagerFactory } from "../databasemanager/types.js";
import { INVERSITY_TYPES } from "../types/inversifyTypes.js";
import mongoose from "mongoose";

/**
 * Generic MongoDB persistence context.
 *
 * @deprecated Use MongoosePersistenceContext instead.
 */
@injectable()
class PersistenceContext2 implements IPersistenceContext<mongoose.Connection> {
  private _entityManagerFactory!: IDatabaseManagerFactory;

  public constructor(
    @inject(INVERSITY_TYPES.DatabaseManagerFactory)
    entityManager: IDatabaseManagerFactory
  ) {
    console.log("Inizialize PersistanceContext");
    this._entityManagerFactory = entityManager;
  }

  /**
   * Execute operations within a transaction context.
   * @typeParam R - The return type of the transaction
   * @param context - Function receiving the mongoose Connection
   * @returns Result of the transaction
   */
  async inTransaction<R>(context: Context<mongoose.Connection, R>): Promise<R> {
    console.log("Start transaction");
    const dbConnection = await this._entityManagerFactory.getConnection() as mongoose.Connection;

    const result = await context(dbConnection);
    console.log("End transaction");
    return result;
  }
}

export { PersistenceContext2 };
