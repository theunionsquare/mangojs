/**
 * @module DatabaseManager
 * @description Database connection management factories for different database types.
 */

// Interface
export type { IDatabaseManagerFactory } from "./types.js";

// Active implementations
export { CockRoachDBManagerFactory } from "./cockroachdb/CockroachDBManagerFactory.js";
export { PostgresDBManagerFactory } from "./postgres/PostgresDBManagerFactory.js";

// Deprecated implementations
/** @deprecated Use PostgresDBManagerFactory or CockRoachDBManagerFactory */
export { DummyDBManagerFactory } from "./DummyDBManagerFactory.js";
/** @deprecated Use PostgresDBManagerFactory or CockRoachDBManagerFactory */
export { MongoDBEntityManagerFactory } from "./MongoDBEntityManagerFactory.js";
/** @deprecated Use PostgresDBManagerFactory or CockRoachDBManagerFactory */
export { MongooseDBManagerFactory } from "./MongooseDBManagerFactory.js";
/** @deprecated Use PostgresDBManagerFactory or CockRoachDBManagerFactory */
export { EmbeddedMongoDBManagerFactory } from "./EmbeddedMongoDBManagerFactory.js";
