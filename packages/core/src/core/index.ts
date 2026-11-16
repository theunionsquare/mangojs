/**
 * @module Core
 * @description MangoJS Core - Framework utilities and patterns for Node.js applications.
 */

// =============================================================================
// CORE INFRASTRUCTURE
// =============================================================================

/** Application bootstrapping and lifecycle management */
export * as Applications from "./applications/index.js";

/** Dependency injection container (Inversify) */
export * as Container from "./container/index.js";

/** Logging utilities */
export * as Loggers from "./loggers/index.js";

/** Middleware patterns */
export * as Middlewares from "./middlewares/index.js";

/** Decorator utilities for HTTP, auth, queue, and scheduler */
export * as Decorators from "./decorators/index.js";

// =============================================================================
// DATA & PERSISTENCE
// =============================================================================

/** Database connection factories (PostgreSQL, CockroachDB, MongoDB) */
export * as DatabaseManager from "./databasemanager/index.js";

/** Transaction management for database operations */
export * as Persistence from "./persistence/index.js";

// =============================================================================
// ASYNC PROCESSING
// =============================================================================

/** BullMQ-based job queue system */
export * as Queue from "./queue/index.js";

/** Cron-based task scheduling */
export * as Scheduler from "./scheduler/index.js";

// =============================================================================
// CACHING & AUTHENTICATION
// =============================================================================

/** Caching utilities */
export * as Cache from "./cache/index.js";

/** Authentication strategies and middleware */
export * as Authentication from "./auth/index.js";

/** Authorization configuration and utilities */
export * as Authorization from "./authz/index.js";

// =============================================================================
// INTEGRATIONS & UTILITIES
// =============================================================================

/** External service integrations (email, etc.) */
export * as Integrations from "./integrations/index.js";

/** HTTP and external service clients */
export * as Clients from "./clients/index.js";

/** Utility functions and base classes */
export * as Utils from "./utils/index.js";

/** Error types and handling */
export * as Errors from "./errors/index.js";

/** Type definitions */
export * as Types from "./types/index.js";

/** Builder patterns */
export * as Builders from "./builders/index.js";

// =============================================================================
// COMMONLY USED DECORATORS (direct exports for convenience)
// =============================================================================

// HTTP Decorators
export { Controller } from "./decorators/http/controller.decorator.js";
export { Get, Post, Put, Delete, Use, Methods } from "./decorators/http/handlers.decorator.js";
export type { IRouter } from "./decorators/http/handlers.decorator.js";
export { Middleware } from "./decorators/http/middleware.decorator.js";

// Scheduler & Queue Decorators
export { Schedule } from "./decorators/scheduler/index.js";
export { QueueWorker } from "./decorators/queue/index.js";

// =============================================================================
// DEPRECATED EXPORTS
// =============================================================================

/**
 * @deprecated Use DatabaseManager instead.
 * This module will be removed in a future version.
 */
export * as Databases from "./databases/index.js";

/**
 * @deprecated Import BaseMapper from Utils instead.
 * @see Utils
 */
export * as Mappers from "./mappers/index.js";

/**
 * @deprecated Use Persistence namespace instead.
 * Individual persistence exports maintained for backwards compatibility.
 */
export type { IPersistenceContext } from "./persistence/index.js";
export { PersistenceContext2 } from "./persistence/index.js";

/**
 * @deprecated Use Container.INVERSITY_TYPES or import from types directly.
 */
export { INVERSITY_TYPES } from "./types/inversifyTypes.js";

/**
 * @deprecated Use Types.api.Request instead.
 */
export type { Request } from "./types/v1/api/index.js";

/**
 * @deprecated Use Types.api.Response instead.
 */
export type { Response } from "./types/v1/api/index.js";

/**
 * @deprecated Use Databases namespace instead.
 */
export { BaseRepository } from "./databases/interfaces/BaseRepository.js";
