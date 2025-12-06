import { inject, injectable } from "inversify";
import { IPersistenceContext } from "./IPersistenceContext";
import { IDatabaseManagerFactory } from "../databasemanager/IDatabaseManagerFactory";
import { INVERSITY_TYPES } from "../types/inversifyTypes";
import * as mongoDB from "mongodb";
import { Context } from "./Context.generics";
import mongoose from "mongoose";

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
    const dbConnection = await this._entityManagerFactory.getConnection();

    const a = context(dbConnection);
    console.log("End transaction");
    //const response = context.process;
    return {};
  }
}

export { PersistenceContext2 };
