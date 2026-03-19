import { injectable } from "inversify";
import { IDatabaseManagerFactory } from "../types";
import { ContainerRegistry } from "../../container";
import { INVERSITY_TYPES } from "../../types/inversifyTypes";
import { Loggers } from "../..";
import { ConnectionError } from "../../errors/databaseErrors";
import { DataSource } from "typeorm";
import { URL } from "url";

import type {
  PostgresUrl,
  PostgresConnection,
} from "../../types/database/postgres";

/**
 * PostgreSQL database manager factory using TypeORM.
 *
 * Supports both URL-based and connection object configuration.
 *
 * @example
 * ```typescript
 * // URL-based connection
 * const factory = new PostgresDBManagerFactory(
 *   { url: 'postgresql://user:pass@host:5432/db' },
 *   [UserEntity, OrderEntity]
 * );
 *
 * // Connection object
 * const factory = new PostgresDBManagerFactory(
 *   { host: 'localhost', port: 5432, username: 'postgres', database: 'mydb' },
 *   [UserEntity],
 *   true,  // synchronize
 *   true   // logging
 * );
 * ```
 */
@injectable()
export class PostgresDBManagerFactory implements IDatabaseManagerFactory {
  private _instance = 0;
  private connection: PostgresUrl | PostgresConnection;
  private entities: any[];
  private synchronize: boolean;
  private logging: boolean;
  private _logger: Loggers.ILogger | null = null;

  /** Cached DataSource instance - reused across all getConnection() calls */
  private _dataSource: DataSource | null = null;
  /** Promise to prevent race conditions during initialization */
  private _initializingPromise: Promise<DataSource> | null = null;

  private get logger(): Loggers.ILogger {
    if (!this._logger) {
      this._logger = ContainerRegistry.getDefault()
        .get<Loggers.ILoggerFactory>(INVERSITY_TYPES.LoggerFactory)
        .getLogger();
    }
    return this._logger;
  }

  constructor(
    connection: PostgresUrl | PostgresConnection,
    entities: any[] = [],
    synchronize: boolean = true,
    logging: boolean = false,
  ) {
    this.connection = connection;
    this.entities = entities;
    this.synchronize = synchronize;
    this.logging = logging;
  }

  dbConnection(): void {}

  async getConnection(): Promise<{}> {
    // Return cached connection if already initialized
    if (this._dataSource?.isInitialized) {
      return this._dataSource.manager;
    }

    // If initialization is in progress, wait for it
    if (this._initializingPromise) {
      const dataSource = await this._initializingPromise;
      return dataSource.manager;
    }

    // Start initialization
    this._initializingPromise = this.initializeDataSource();

    try {
      this._dataSource = await this._initializingPromise;
      return this._dataSource.manager;
    } finally {
      this._initializingPromise = null;
    }
  }

  /**
   * Initialize the DataSource (called only once)
   */
  private async initializeDataSource(): Promise<DataSource> {
    try {
      let dataSource: DataSource;

      if ("url" in this.connection) {
        const dbUrl = new URL(this.connection.url);
        dbUrl.searchParams.delete("options");
        this.logger.debug(`POSTGRES-URL: ${dbUrl.toString()}`);

        dataSource = new DataSource({
          type: "postgres",
          url: this.connection.url,
          ssl: true,
          entities: this.entities,
          synchronize: this.synchronize,
          logging: this.logging,
        });
      } else {
        dataSource = new DataSource({
          ...this.connection,
          ...{
            type: "postgres",
            entities: this.entities,
            synchronize: this.synchronize,
            logging: this.logging,
          },
        });
      }

      await dataSource.initialize();
      //this.logger.info("POSTGRES-DATASOURCE-INITIALIZED");

      return dataSource;
    } catch (e) {
      const message = `Can't connect to ${this.connection["host"]}: ${e}`;
      this.logger.error(message);
      throw new ConnectionError(message);
    }
  }

  async getStatus() {
    return true;
  }
}
