/**
 * @module Persistence
 * @description Transaction management for database operations.
 *
 * PersistenceContext implementations work with their corresponding
 * DatabaseManager factories to provide transaction support.
 *
 * | PersistenceContext | DatabaseManager |
 * |--------------------|-----------------|
 * | PostgresPersistenceContext | PostgresDBManagerFactory |
 * | MongoosePersistenceContext | MongooseDBManagerFactory |
 * | CockroachPersistenceContext | CockRoachDBManagerFactory |
 * | DummyPersistenceContext | DummyDBManagerFactory |
 *
 * @example
 * // Bind in container
 * container.bind<IPersistenceContext>(TYPES.PersistenceContext)
 *   .to(PostgresPersistenceContext);
 *
 * // Use in service
 * const result = await persistenceContext.inTransaction(async (em) => {
 *   return em.getRepository(User).find();
 * });
 */

// Types
export * from "./types.js";

// Implementations
export { CockroachPersistenceContext } from "./PersistenceContext.cockroach.js";
export { MongoosePersistenceContext } from "./PersistenceContext.mongoose.js";
export { PostgresPersistenceContext } from "./PersistenceContext.postgres.js";
export { DummyPersistenceContext } from "./PersistenceContext.dummy.js";

/** @deprecated Use MongoosePersistenceContext instead */
export { PersistenceContext2 } from "./PersistenceContext.js";
