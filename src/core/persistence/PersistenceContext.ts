import { inject, injectable } from "inversify";
import { IPersistenceContext, Context } from "./types";
import { IDatabaseManagerFactory } from "../databasemanager/types";
import { INVERSITY_TYPES } from "../types/inversifyTypes";
import mongoose from "mongoose";

/**
 * Generic MongoDB persistence context.
 *
 * @deprecated Use MongoosePersistenceContext instead.
 */
@injectable()
class PersistenceContext2 implements IPersistenceContext {
  private _entityManagerFactory!: IDatabaseManagerFactory;

  public constructor(
    @inject(INVERSITY_TYPES.DatabaseManagerFactory)
    entityManager: IDatabaseManagerFactory
  ) {
    console.log("Inizialize PersistanceContext");
    this._entityManagerFactory = entityManager;
  }

  async inTransaction(context: Context<mongoose.Connection>): Promise<{}> {
    console.log("Start transaction");
    const dbConnection = await this._entityManagerFactory.getConnection() as mongoose.Connection;

    const a = context(dbConnection);
    console.log("End transaction");
    //const response = context.process;
    return {};
  }
}

export { PersistenceContext2 };
