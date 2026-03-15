/**
 * @module Types
 * @description Shared type definitions for MangoJS applications.
 */

// API types (recommended)
export * as api from "./api";

// Entity types
export * as entities from "./entities";

// Enum types
export * as enums from "./enums";

// Database types
export * as database from "./database";

// ============================================================================
// DEPRECATED
// ============================================================================

/**
 * @deprecated Use `api` instead.
 */
export * as apiResponses from "./apiResponses";

/**
 * @deprecated Use `api` instead.
 */
export * as v1 from "./v1";
