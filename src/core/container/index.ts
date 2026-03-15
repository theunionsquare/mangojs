/**
 * @module Container
 * @description Dependency injection container management using Inversify.
 * Provides utilities for creating and managing IoC containers.
 */

import { ContainerManager } from "./ContainerManager";
import { addCoreModule } from "./modules";

/**
 * Global parent container manager with shared dependencies
 */
const parentContainerManager = new ContainerManager();

/**
 * Get the parent container manager (contains shared dependencies like logger)
 */
export const getContainer = (): ContainerManager => {
  const container = parentContainerManager.getContainer();
  addCoreModule(container);
  return parentContainerManager;
};

export const getContainerManager = (): ContainerManager => {
  addCoreModule(parentContainerManager.getContainer());
  return parentContainerManager;
};

/**
 * Create a child container for a microservice
 * Child containers inherit parent bindings and can override them
 * @param modules - Modules to load into the child container
 */
export const createChild = (parent?: ContainerManager): ContainerManager => {
  return new ContainerManager(
    parent ? parent.getContainer() : parentContainerManager.getContainer()
  );
};

export { ContainerManager } from "./ContainerManager";
export * from "./modules";
export type { ServiceIdentifier } from "./types";
