/**
 * Interface for application pre-flight checks.
 * Implementations should verify that all required services (database, etc.) are available
 * before the application starts accepting requests.
 */
export interface IApplicationPreCheck {
  /**
   * Runs all pre-flight checks.
   * Should throw an error if any check fails.
   */
  startCheck(): Promise<void>;
}
