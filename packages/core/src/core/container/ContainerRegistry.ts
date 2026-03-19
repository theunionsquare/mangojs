import type { ContainerManager } from "./ContainerManager";

/**
 * Singleton registry for managing multiple named containers.
 *
 * Handles container registration, retrieval by name, and default container management.
 * Used internally by ContainerBuilder and ContainerManager.
 *
 * @example
 * ```typescript
 * // Register a container
 * ContainerRegistry.register(manager, true);
 *
 * // Get containers
 * const defaultContainer = ContainerRegistry.getDefault();
 * const namedContainer = ContainerRegistry.getByName("test");
 * ```
 */
class ContainerRegistryImpl {
  private registry = new Map<string, ContainerManager>();
  private defaultContainerName: string | null = null;

  /**
   * Register a container with a name
   * @internal Called by ContainerBuilder.build()
   */
  register(manager: ContainerManager, asDefault: boolean): void {
    const name = manager.getName();

    if (this.registry.has(name)) {
      console.warn(
        `[ContainerRegistry] Container "${name}" already registered. Replacing.`
      );
    }

    this.registry.set(name, manager);

    if (asDefault) {
      this.defaultContainerName = name;
    }
  }

  /**
   * Get the default container
   * @throws Error if no default container is set
   */
  getDefault(): ContainerManager {
    if (!this.defaultContainerName || !this.registry.has(this.defaultContainerName)) {
      throw new Error(
        "[ContainerRegistry] No default container. Use ContainerBuilder.build() first."
      );
    }
    return this.registry.get(this.defaultContainerName)!;
  }

  /**
   * Get a container by name
   * @throws Error if container not found
   */
  getByName(name: string): ContainerManager {
    const manager = this.registry.get(name);
    if (!manager) {
      throw new Error(
        `[ContainerRegistry] Container "${name}" not found. Available: ${Array.from(this.registry.keys()).join(", ") || "none"}`
      );
    }
    return manager;
  }

  /**
   * Check if a named container exists
   */
  has(name: string): boolean {
    return this.registry.has(name);
  }

  /**
   * Check if a default container is set
   */
  hasDefault(): boolean {
    return this.defaultContainerName !== null && this.registry.has(this.defaultContainerName);
  }

  /**
   * List all registered container names
   */
  listContainers(): string[] {
    return Array.from(this.registry.keys());
  }

  /**
   * Clear all registered containers (useful for testing)
   */
  reset(): void {
    for (const manager of this.registry.values()) {
      manager.getRawContainer().unbindAll();
    }
    this.registry.clear();
    this.defaultContainerName = null;
  }
}

/** Singleton instance */
export const ContainerRegistry = new ContainerRegistryImpl();
