import { inject, injectable } from "inversify";
import { IDatabaseManagerFactory } from "../databasemanager/IDatabaseManagerFactory";
import { INVERSITY_TYPES } from "../types/inversifyTypes";
import { IApplicationPreCheck } from "../types";
import { Loggers } from "..";

@injectable()
export class ApplicationPreCheck implements IApplicationPreCheck {
  // database factory
  private _databaseManagerFactory!: IDatabaseManagerFactory;
  private logger;

  public constructor(
    @inject(INVERSITY_TYPES.DatabaseManagerFactory)
    entityManager: IDatabaseManagerFactory,
    @inject(INVERSITY_TYPES.LoggerFactory)
    loggerFactory: Loggers.ILoggerFactory
  ) {
    console.log("ApplicationPreCheck: Starting up");
    this._databaseManagerFactory = entityManager;
    this.logger = loggerFactory.getLogger();
  }

  public async startCheck() {
    this.logger.info("START CHECKLIST");
    console.log("TEST DB CONNECTION");
    const connection = await this._databaseManagerFactory.getConnection();
    const status = await this._databaseManagerFactory.getStatus();
    console.log(`TEST DB CONNECTION: ${status}`);
  }
}
