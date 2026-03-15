import { injectable } from "inversify";
import { IDatabaseManagerFactory } from "../types";
import { getContainer } from "../../container";
import { INVERSITY_TYPES } from "../../types/inversifyTypes";
import { Loggers } from "../..";
import { ConnectionError } from "../../errors/databaseErrors";
import { DataSource } from "typeorm";
import { URL } from "url";

import type {
  CockroachUrl,
  CockroachConnection,
} from "../../types/database/cockroach";

/**
 * CockroachDB database manager factory using TypeORM.
 *
 * Supports both URL-based and connection object configuration.
 *
 * @example
 * ```typescript
 * // URL-based connection
 * const factory = new CockRoachDBManagerFactory(
 *   { url: 'postgresql://user:pass@host:26257/db?sslmode=verify-full' },
 *   [UserEntity, OrderEntity]
 * );
 *
 * // Connection object
 * const factory = new CockRoachDBManagerFactory(
 *   { host: 'localhost', port: 26257, username: 'root', database: 'mydb' },
 *   [UserEntity]
 * );
 * ```
 */
@injectable()
export class CockRoachDBManagerFactory implements IDatabaseManagerFactory {
  private _instance = 0;
  private connection: CockroachUrl | CockroachConnection;
  private entities: any[];
  private synchronize: boolean;
  private logging: boolean;
  private logger = (
    getContainer().get(INVERSITY_TYPES.LoggerFactory) as Loggers.ILoggerFactory
  ).getLogger();

  constructor(
    connection: CockroachUrl | CockroachConnection,
    entities: any[] = [],
    synchronize: boolean = true,
    logging: boolean = false
  ) {
    this.logger.info({ connection }, "COCKROACH-CONSTRUCTOR");
    this.connection = connection;
    this.entities = entities;
    this.synchronize = synchronize;
    this.logging = logging;
  }

  dbConnection(): void {}

  async getConnection(): Promise<{}> {
    try {
      this.logger.debug(
        { host: this.connection },
        "COCKROACH-START-CONNECTION"
      );

      if ("url" in this.connection) {
        this.logger.debug("COCKROACH-URL");
        const dbUrl = new URL(this.connection.url);
        const routingId = dbUrl.searchParams.get("options");
        dbUrl.searchParams.delete("options");
        this.logger.debug({ dbUrl }, "COCKROACH-URL");
        const AppDataSource = new DataSource({
          type: "cockroachdb",
          url: this.connection.url,
          ssl: true,
          timeTravelQueries: false,
          entities: this.entities,
          synchronize: true,
        });
        await AppDataSource.initialize();
        this.logger.debug("COCKROACH-SUCCESSFULLY-CONNECTED");

        return AppDataSource.manager;
      } else {
        const AppDataSource = new DataSource({
          ...this.connection,
          ...{
            type: "cockroachdb",
            entities: this.entities,
            synchronize: true,
            logging: false,
            timeTravelQueries: true,
          },
        });
        await AppDataSource.initialize();
        this.logger.debug("COCKROACH-SUCCESSFULLY-CONNECTED");

        return AppDataSource.manager;
      }
    } catch (e) {
      const message = `Can't connect to ${this.connection}`;
      this.logger.error({ e }, message);
      throw new ConnectionError(message);
    }
  }

  async getStatus() {
    return true;
  }
}
