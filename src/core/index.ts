import { BaseRepository } from "./databases/interfaces/BaseRepository";
import { INVERSITY_TYPES } from "./types/inversifyTypes";
import { IPersistenceContext } from "./persistence/IPersistenceContext";
//import { MongoosePersistenceContext } from "./persistence/PersistenceContext.mongoose";
import { PersistenceContext2 } from "./persistence/PersistenceContext";
//import { CockroachPersistenceContext } from "./persistence/PersistenceContext.cockroach";

export * as Applications from "./applications";

export * as Middlewares from "./middlewares";
export * as Container from "./container";
export * as Loggers from "./loggers";
export * as Decorators from "./decorators";

// CACHE
export * as Cache from "./cache";

// AUTHENTICATION
export * as Authentication from "./auth";

// DATABASE
export * as DatabaseManager from "./databasemanager";
/** @deprecated Use DatabaseManager instead */
export * as Databases from "./databases";

// types
//export * from './types'

// utils
export * as utils from "./utils";

// errors
export * as errors from "./errors";

// DATABASE REPO
export { BaseRepository };

// CONTEXT
export {
  INVERSITY_TYPES,
  IPersistenceContext,
  PersistenceContext2,
  //MongoosePersistenceContext,
  //CockroachPersistenceContext,
};
// PERSISTENCE CONTEXT
export * as persistanceContext from "./persistence";

// export Clients
export * as clients from "./clients";

// Export Types
export * as Types from "./types";

// Export Integrations
export * as Integrations from "./integrations";

/** @deprecated Import BaseMapper from utils instead */
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
export * as Builders from "./builders";
