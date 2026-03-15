/**
 * Interface for database manager factories.
 * Implementations provide database connection management for different database types.
 */
export interface IDatabaseManagerFactory {
  /**
   * Initialize the database connection.
   */
  dbConnection(): void | Promise<void> | Promise<unknown>;

  /**
   * Get or create a database connection.
   * @returns The database connection/manager instance
   */
  getConnection(): Promise<unknown>;

  /**
   * Get the current connection status.
   * @returns Connection status
   */
  getStatus(): unknown;
}
