import { inject, injectable } from "inversify";
import { IDatabaseManagerFactory } from "./IDatabaseManagerFactory";
import mongoose, { Mongoose } from "mongoose";
import * as container from "../container";
import { INVERSITY_TYPES } from "../types/inversifyTypes";
import { Loggers } from "..";
import { ConnectionError } from "../errors/databaseErrors";

@injectable()
export class MongooseDBManagerFactory implements IDatabaseManagerFactory {
  private _instance = 0;
  private mongoURI: string;
  private databaseName: string;
  private connectOptions: mongoose.ConnectOptions = {
    // connectTimeoutMS: 1000,
    // serverSelectionTimeoutMS: 1000,
  };
  private logger;

  constructor(
    mongoURI: string,
    databaseName: string,
    @inject(INVERSITY_TYPES.LoggerFactory)
    loggerFactory: Loggers.ILoggerFactory
  ) {
    this.logger = loggerFactory.getLogger();
    this.logger.info({ mongoURI }, "MONGOOSE-CONSTRUCTOR");
    this.mongoURI = mongoURI;
    this.databaseName = databaseName;
  }

  dbConnection(): void {}

  async getConnection(): Promise<Mongoose> {
    try {
      this.logger.debug(
        { mongoURI: this.mongoURI, mongoDB: this.databaseName },
        "MONGOOSE-START-CONNECTION"
      );
      const connection = await mongoose.connect(
        `${this.mongoURI}/${this.databaseName}`,
        this.connectOptions
      );
      this.logger.debug("SUCCESSFULLY CONNECTED");

      return connection;
    } catch (e) {
      const message = `Can't connect to ${this.mongoURI}/${this.databaseName}`;
      this.logger.error(message);
      throw new ConnectionError(message);
    }
  }

  async getStatus() {
    return mongoose.STATES[mongoose.connection.readyState];
  }
}
