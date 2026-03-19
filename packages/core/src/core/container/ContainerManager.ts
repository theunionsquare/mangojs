import { Container, GetOptions } from "inversify";
import { ServiceIdentifier } from "./types";

/**
 * Wrapper class for an Inversify container.
 *
 * Provides a clean API for dependency injection operations on a single container.
 *
 * @example
 * ```typescript
 * // Get a service from the container
 * const service = containerManager.get<MyService>(TYPES.MyService);
 *
 * // Check if a service is bound
 * if (containerManager.isBound(TYPES.MyService)) { ... }
 * ```
 */
export class ContainerManager {
  private container: Container;
  private name: string;

  constructor(container: Container, name: string) {
    this.container = container;
    this.name = name;
  }

  /**
   * Get a service from this container
   */
  get<T>(serviceIdentifier: ServiceIdentifier<T>, options?: GetOptions): T {
    return this.container.get<T>(serviceIdentifier, options);
  }

  /**
   * Check if a service is bound
   */
  isBound(serviceIdentifier: ServiceIdentifier): boolean {
    return this.container.isBound(serviceIdentifier);
  }

  /**
   * Get all services bound to an identifier
   */
  getAll<T>(serviceIdentifier: ServiceIdentifier<T>, options?: GetOptions): T[] {
    return this.container.getAll<T>(serviceIdentifier, options);
  }

  /**
   * Get the underlying Inversify container
   */
  getRawContainer(): Container {
    return this.container;
  }

  /**
   * Get the container name
   */
  getName(): string {
    return this.name;
  }

  /**
   * Create a child container
   */
  createChild(childName: string): ContainerManager {
    const childContainer = new Container({ parent: this.container });
    return new ContainerManager(childContainer, childName);
  }
}
