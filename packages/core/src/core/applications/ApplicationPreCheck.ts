import { inject, injectable } from "inversify";
import { IDatabaseManagerFactory } from "../databasemanager/types";
import { INVERSITY_TYPES } from "../types/inversifyTypes";
import { IApplicationPreCheck } from "./types";
import { Loggers } from "..";

/**
 * Default implementation of application pre-flight checks.
 * Verifies database connectivity before the application starts.
 *
 * @example
 * ```typescript
 * const preCheck = container.get<IApplicationPreCheck>(INVERSITY_TYPES.ApplicationPreCheck);
 * await preCheck.startCheck();
 * ```
 */
@injectable()
export class ApplicationPreCheck implements IApplicationPreCheck {
  private _databaseManagerFactory: IDatabaseManagerFactory;
  private logger: ReturnType<Loggers.ILoggerFactory["getLogger"]>;

  public constructor(
    @inject(INVERSITY_TYPES.DatabaseManagerFactory)
    entityManager: IDatabaseManagerFactory,
    @inject(INVERSITY_TYPES.LoggerFactory)
    loggerFactory: Loggers.ILoggerFactory
  ) {
    this._databaseManagerFactory = entityManager;
    this.logger = loggerFactory.getLogger();
  }

  /**
   * Runs all pre-flight checks including database connectivity.
   * Logs the status of each check.
   */
  public async startCheck(): Promise<void> {
    this.logger.info("Starting application pre-flight checks");

    await this._databaseManagerFactory.getConnection();
    const status = await this._databaseManagerFactory.getStatus();

    this.logger.info(`Database connection status: ${status}`);
  }
}
