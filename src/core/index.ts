import { ServerBuilder } from "./builders/ServerBuilder";
import { BaseRepository } from "./databases/interfaces/BaseRepository";
import { INVERSITY_TYPES } from "./types/inversifyTypes";
import { IPersistenceContext } from "./persistence/IPersistenceContext";
// import { PersistenceContext } from "./persistence/PersistenceContext";
import { MongoosePersistenceContext } from "./persistence/PersistenceContext.mongoose";
import { PersistenceContext2 } from "./persistence/PersistenceContext";
import { CockroachPersistenceContext } from "./persistence/PersistenceContext.cockroach";
import { IDatabaseManagerFactory } from "./databasemanager/IDatabaseManagerFactory";
import { MongoDBEntityManagerFactory } from "./databasemanager/MongoDBEntityManagerFactory";
import { MongooseDBManagerFactory } from "./databasemanager/MongooseDBManagerFactory";
import { CockRoachDBManagerFactory } from "./databasemanager/cockroachdb/CockroachDBManagerFactory";

export { ApplicationPreCheck } from "./applications/ApplicationPreCheck";

export * as Middlewares from "./middlewares";
export * as Containers from "./container";
export * as Loggers from "./loggers";
export * as Decorators from "./decorators";
// TO DO: Remove it
export * from "./decorators";

// CACHE
export * as cache from "./cache";
export { Cache } from "./cache";

// AUTHENTICATION INTERFACES
export * as Auth from "./auth";

//export * from './auth/authentication'
export * from "./auth/IAuthorization";

// database
export * as databasemanager from "./databasemanager";
export * as databases from "./databases";

// types
//export * from './types'

// utils
export * as utils from "./utils";

// errors
export * as errors from "./errors";

// DATABASE REPO
export { BaseRepository };

// SERVERS CONFIGURATION
export { ServerBuilder };

// CONTEXT
export {
  INVERSITY_TYPES,
  IPersistenceContext,
  PersistenceContext2,
  IDatabaseManagerFactory,
  MongoDBEntityManagerFactory,
  MongooseDBManagerFactory,
  MongoosePersistenceContext,
  CockRoachDBManagerFactory,
  CockroachPersistenceContext,
};
// PERSISTENCE CONTEXT
export * as persistanceContext from "./persistence";

// export Clients
export * as clients from "./clients";

// Export Types
export * as Types from "./types";

export * as Providers from "./providers";

// export Request and REsponse API wrappers
export { Request } from "./types/v1/api";
export { Response } from "./types/v1/api";
