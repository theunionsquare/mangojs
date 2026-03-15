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
 */
export type Context<T> = (em: T) => unknown;

/**
 * Interface for persistence context implementations.
 * Provides transaction management for database operations.
 *
 * @example
 * class MyPersistenceContext implements IPersistenceContext {
 *   async inTransaction(context) {
 *     const connection = await this.dbManager.getConnection();
 *     return context(connection);
 *   }
 * }
 */
export interface IPersistenceContext {
  /**
   * Executes operations within a transaction context.
   * @param process - Function receiving the connection/entity manager
   * @returns Result of the transaction
   */
  inTransaction(process: Context<unknown>): Promise<unknown>;
}
