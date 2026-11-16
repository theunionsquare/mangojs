/**
 * @module Decorators
 * @description TypeScript decorators for HTTP routing, authorization, scheduling, and queues.
 */

// AUTHORIZATION
export * as auth from "./auth/index.js";

// HTTP ENDPOINTS
export { Controller } from "./http/controller.decorator.js";
export { Methods, Get, Post, Put, Delete, Use } from "./http/handlers.decorator.js";
export type { IRouter } from "./http/handlers.decorator.js";
export { Middleware } from "./http/middleware.decorator.js";
export { RateLimit } from "./http/rate-limit.decorator.js";
export type { RateLimitOptions } from "../middlewares/rateLimit.js";

// AUDIT
export { Audit } from "./audit/audit.decorator.js";
export type { AuditOptions } from "./audit/audit.decorator.js";
export { AuditConfig } from "./audit/auditConfig.js";
export type { AuditConfigOptions, AuditEvent, AuditTracker } from "./audit/auditConfig.js";

// SCHEDULER
export { Schedule } from "./scheduler/index.js";

// QUEUE
export { QueueWorker, QUEUE_WORKER_METADATA_KEY } from "./queue/index.js";

// UTILITIES
/** @deprecated Use Loggers module for proper logging */
export { loggedMethod } from "./logger.decorator.js";
