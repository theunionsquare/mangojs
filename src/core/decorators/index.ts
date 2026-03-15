/**
 * @module Decorators
 * @description TypeScript decorators for HTTP routing, authorization, scheduling, and queues.
 */

// AUTHORIZATION
export * as auth from "./auth";

// HTTP ENDPOINTS
export { Controller } from "./http/controller.decorator";
export { Methods, Get, Post, Put, Delete, Use } from "./http/handlers.decorator";
export type { IRouter } from "./http/handlers.decorator";
export { Middleware } from "./http/middleware.decorator";

// SCHEDULER
export { Schedule } from "./scheduler";

// QUEUE
export { QueueWorker, QUEUE_WORKER_METADATA_KEY } from "./queue";

// UTILITIES
/** @deprecated Use Loggers module for proper logging */
export { loggedMethod } from "./logger.decorator";
