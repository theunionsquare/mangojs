/**
 * @module Core
 * @description MangoJS Core - Framework utilities and patterns for Node.js applications.
 */

// =============================================================================
// CORE INFRASTRUCTURE
// =============================================================================

/** Application bootstrapping and lifecycle management */
export * as Applications from "./applications";

/** Dependency injection container (Inversify) */
export * as Container from "./container";

/** Logging utilities */
export * as Loggers from "./loggers";

/** Middleware patterns */
export * as Middlewares from "./middlewares";

/** Decorator utilities for HTTP, auth, queue, and scheduler */
export * as Decorators from "./decorators";

// =============================================================================
// DATA & PERSISTENCE
// =============================================================================

/** Database connection factories (PostgreSQL, CockroachDB, MongoDB) */
export * as DatabaseManager from "./databasemanager";

/** Transaction management for database operations */
export * as Persistence from "./persistence";

// =============================================================================
// ASYNC PROCESSING
// =============================================================================

/** BullMQ-based job queue system */
export * as Queue from "./queue";

/** Cron-based task scheduling */
export * as Scheduler from "./scheduler";

// =============================================================================
// CACHING & AUTHENTICATION
// =============================================================================

/** Caching utilities */
export * as Cache from "./cache";

/** Authentication strategies and middleware */
export * as Authentication from "./auth";

/** Authorization configuration and utilities */
export * as Authorization from "./authz";

// =============================================================================
// INTEGRATIONS & UTILITIES
// =============================================================================

/** External service integrations (email, etc.) */
export * as Integrations from "./integrations";

/** HTTP and external service clients */
export * as Clients from "./clients";

/** Utility functions and base classes */
export * as Utils from "./utils";

/** Error types and handling */
export * as Errors from "./errors";

/** Type definitions */
export * as Types from "./types";

/** Builder patterns */
export * as Builders from "./builders";

// =============================================================================
// COMMONLY USED DECORATORS (direct exports for convenience)
// =============================================================================

// HTTP Decorators
export { Controller } from "./decorators/http/controller.decorator";
export { Get, Post, Put, Delete, Use, Methods } from "./decorators/http/handlers.decorator";
export type { IRouter } from "./decorators/http/handlers.decorator";
export { Middleware } from "./decorators/http/middleware.decorator";

// Scheduler & Queue Decorators
export { Schedule } from "./decorators/scheduler";
export { QueueWorker } from "./decorators/queue";

// =============================================================================
// DEPRECATED EXPORTS
// =============================================================================

/**
 * @deprecated Use DatabaseManager instead.
 * This module will be removed in a future version.
 */
export * as Databases from "./databases";

/**
 * @deprecated Import BaseMapper from Utils instead.
 * @see Utils
 */
export * as Mappers from "./mappers";

/**
 * @deprecated Use Persistence namespace instead.
 * Individual persistence exports maintained for backwards compatibility.
 */
export {
  IPersistenceContext,
  PersistenceContext2,
} from "./persistence";

/**
 * @deprecated Use Container.INVERSITY_TYPES or import from types directly.
 */
export { INVERSITY_TYPES } from "./types/inversifyTypes";

/**
 * @deprecated Use Types.api.Request instead.
 */
export { Request } from "./types/v1/api";

/**
 * @deprecated Use Types.api.Response instead.
 */
export { Response } from "./types/v1/api";

/**
 * @deprecated Use Databases namespace instead.
 */
export { BaseRepository } from "./databases/interfaces/BaseRepository";
