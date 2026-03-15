/**
 * @module DatabaseManager
 * @description Database connection management factories for different database types.
 */

// Interface
export type { IDatabaseManagerFactory } from "./types";

// Active implementations
export { CockRoachDBManagerFactory } from "./cockroachdb/CockroachDBManagerFactory";
export { PostgresDBManagerFactory } from "./postgres/PostgresDBManagerFactory";

// Deprecated implementations
/** @deprecated Use PostgresDBManagerFactory or CockRoachDBManagerFactory */
export { DummyDBManagerFactory } from "./DummyDBManagerFactory";
/** @deprecated Use PostgresDBManagerFactory or CockRoachDBManagerFactory */
export { MongoDBEntityManagerFactory } from "./MongoDBEntityManagerFactory";
/** @deprecated Use PostgresDBManagerFactory or CockRoachDBManagerFactory */
export { MongooseDBManagerFactory } from "./MongooseDBManagerFactory";
/** @deprecated Use PostgresDBManagerFactory or CockRoachDBManagerFactory */
export { EmbeddedMongoDBManagerFactory } from "./EmbeddedMongoDBManagerFactory";
