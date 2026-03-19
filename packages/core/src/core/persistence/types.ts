/**
 * Persistence layer types for database transactions.
 *
 * The persistence layer works with DatabaseManager to provide
 * transaction support for different database backends.
 */

/**
 * Context function type for transaction execution.
 * Receives an entity manager/connection and executes operations within it.
 *
 * @typeParam T - The connection/entity manager type (e.g., mongoose.Connection, EntityManager)
 * @typeParam R - The return type of the context function
 */
export type Context<T, R = unknown> = (em: T) => R | Promise<R>;

/**
 * Interface for persistence context implementations.
 * Provides transaction management for database operations.
 *
 * @typeParam T - The entity manager type (defaults to unknown for flexibility)
 *
 * @example
 * class MyPersistenceContext implements IPersistenceContext<EntityManager> {
 *   async inTransaction<R>(context: Context<EntityManager, R>): Promise<R> {
 *     const connection = await this.dbManager.getConnection();
 *     return context(connection);
 *   }
 * }
 */
export interface IPersistenceContext<T = unknown> {
  /**
   * Executes operations within a transaction context.
   * @typeParam R - The return type of the transaction
   * @param process - Function receiving the connection/entity manager
   * @returns Result of the transaction
   */
  inTransaction<R>(process: Context<T, R>): Promise<R>;
}
