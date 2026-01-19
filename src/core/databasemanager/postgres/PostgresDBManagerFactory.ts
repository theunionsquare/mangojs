import { injectable } from "inversify";
import { IDatabaseManagerFactory } from "../IDatabaseManagerFactory";
import * as containers from "../../container";
import { INVERSITY_TYPES } from "../../types/inversifyTypes";
import { Loggers } from "../..";
import { ConnectionError } from "../../errors/databaseErrors";
import { DataSource } from "typeorm";
import { URL } from "url";

import type {
  PostgresUrl,
  PostgresConnection,
} from "../../types/database/postgres";

@injectable()
export class PostgresDBManagerFactory implements IDatabaseManagerFactory {
  private _instance = 0;
  private connection: PostgresUrl | PostgresConnection;
  private entities: any[];
  private synchronize: boolean;
  private logging: boolean;
  private logger = (
    containers
      .getContainer()
      .get(INVERSITY_TYPES.LoggerFactory) as Loggers.ILoggerFactory
  ).getLogger();

  constructor(
    connection: PostgresUrl | PostgresConnection,
    entities: any[] = [],
    synchronize: boolean = true,
    logging: boolean = false
  ) {
    this.logger.info({ connection }, "POSTGRES-CONSTRUCTOR");
    this.connection = connection;
    this.entities = entities;
    this.synchronize = synchronize;
    this.logging = logging;
  }

  dbConnection(): void {}

  async getConnection(): Promise<{}> {
    try {
      this.logger.debug("POSTGRES-START-CONNECTION");

      if ("url" in this.connection) {
        this.logger.debug("POSTGRES-URL");
        const dbUrl = new URL(this.connection.url);
        const routingId = dbUrl.searchParams.get("options");
        dbUrl.searchParams.delete("options");
        this.logger.debug({ dbUrl }, "POSTGRES-URL");
        const AppDataSource = new DataSource({
          type: "postgres",
          url: this.connection.url,
          ssl: true,
          entities: this.entities,
          synchronize: this.synchronize,
          logging: this.logging,
        });
        await AppDataSource.initialize();
        this.logger.debug("POSTGRES-SUCCESSFULLY-CONNECTED");

        return AppDataSource.manager;
      } else {
        const AppDataSource = new DataSource({
          ...this.connection,
          ...{
            type: "postgres",
            entities: this.entities,
            synchronize: this.synchronize,
            logging: this.logging,
          },
        });
        await AppDataSource.initialize();
        this.logger.debug("POSTGRES-SUCCESSFULLY-CONNECTED");

        return AppDataSource.manager;
      }
    } catch (e) {
      const message = `Can't connect to ${this.connection["host"]}: ${e}`;
      this.logger.error({ e }, message);
      throw new ConnectionError(message);
    }
  }

  async getStatus() {
    return true;
  }
}
