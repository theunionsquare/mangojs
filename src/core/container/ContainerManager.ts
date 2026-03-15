import { Container } from "inversify";
import { ServiceIdentifier } from "./types";

/**
 * Wrapper class to manage Inversify containers with a cleaner API.
 *
 * Provides a simplified interface for dependency injection using Inversify,
 * with support for parent-child container hierarchies.
 *
 * @example
 * ```typescript
 * const manager = new ContainerManager();
 * const service = manager.get<MyService>(TYPES.MyService);
 * ```
 */
export class ContainerManager {
  private container: Container;

  constructor(parent?: Container) {
    this.container = parent ? new Container({ parent }) : new Container();
  }

  /**
   * Get a service from the container
   */
  get<T>(serviceIdentifier: ServiceIdentifier<T>, options = {}): T {
    // Apply options for future use
    return this.container.get<T>(serviceIdentifier);
  }

  /**
   * Check if a service is bound
   */
  isBound(serviceIdentifier: ServiceIdentifier): boolean {
    return this.container.isBound(serviceIdentifier);
  }

  /**
   * Unbind a service from the container
   */
  unbind(serviceIdentifier: ServiceIdentifier): void {
    this.container.unbind(serviceIdentifier);
  }

  /**
   * Get the underlying Inversify container (for advanced use)
   */
  getContainer(): Container {
    return this.container;
  }

  /**
   * Reset the container (useful for testing)
   */
  reset(): void {
    this.container.unbindAll();
  }
}
