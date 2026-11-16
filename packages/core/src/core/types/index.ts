/**
 * @module Types
 * @description Shared type definitions for MangoJS applications.
 */

// API types (recommended)
export * as api from "./api/index.js";

// Entity types
export * as entities from "./entities/index.js";

// Enum types
export * as enums from "./enums/index.js";

// Database types
export * as database from "./database/index.js";

// ============================================================================
// DEPRECATED
// ============================================================================

/**
 * @deprecated Use `api` instead.
 */
export * as apiResponses from "./apiResponses.js";

/**
 * @deprecated Use `api` instead.
 */
export * as v1 from "./v1/index.js";
