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

// New auth types (direct exports for convenience)
export type {
  IAuthUser,
  IAuthContext,
  AuthCredentials,
  JWTStrategyOptions,
  ApiKeyStrategyOptions,
  AuthCookieOptions,
  GenerateTokenPayload,
} from "./auth/types";
export { AuthContext } from "./auth/AuthContext";
export { AuthStrategyRegistry } from "./auth/AuthStrategyRegistry";
export { AuthenticationError } from "./auth/errors/AuthenticationError";
export { AUTH_STRATEGY_TAG } from "./auth/strategies/IAuthStrategy";
export type { IAuthStrategy } from "./auth/strategies/IAuthStrategy";

// Legacy auth exports (deprecated)
/** @deprecated Use IAuthStrategy instead */
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

// Export Integrations
export * as Integrations from "./integrations";

export * as mappers from "./mappers";

// export Request and REsponse API wrappers
export { Request } from "./types/v1/api";
export { Response } from "./types/v1/api";

// SCHEDULER
export * as Scheduler from "./scheduler";
export { Schedule, ScheduledTask, ScheduleRegistry } from "./scheduler";

// QUEUE
export * as Queue from "./queue";
export { QueueClient, QueueManager, QueueWorker } from "./queue";
export type {
  IQueueClient,
  IQueueWorkerHandler,
  RedisConfig,
  Job,
  JobOptions,
  JobData,
  WorkerOptions,
  QueueWorkerConstructor,
} from "./queue";

// BUILDERS
export { WorkerBuilder } from "./builders/WorkerBuilder";
