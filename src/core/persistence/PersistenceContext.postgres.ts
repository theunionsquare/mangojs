import { inject, injectable } from "inversify";
import { IPersistenceContext } from "./IPersistenceContext";
import { IDatabaseManagerFactory } from "../databasemanager/IDatabaseManagerFactory";
import { INVERSITY_TYPES } from "../types/inversifyTypes";
import { Context } from "./Context.generics";
import mongoose from "mongoose";
import { EntityManager } from "typeorm";

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
