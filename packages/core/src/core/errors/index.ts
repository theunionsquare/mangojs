/**
 * @module Errors
 * @description Error classes and error handling utilities.
 */

// Base errors
export { APIError } from './baseErrors.js'

// Database errors
export { ConnectionError } from './databaseErrors.js'

// Error handler
export { errorHandler } from './errorHandler.js'

// Deprecated
/** @deprecated Use AuthorizationError from decorators/auth instead */
export * as DecoratorErrors from './decoratorErrors.js'
/** @deprecated Use native instanceof Error check instead */
export * as utils from './utils.js'

// Legacy namespace export
export * as DatabaseErrors from './databaseErrors.js'
