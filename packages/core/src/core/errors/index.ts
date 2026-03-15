/**
 * @module Errors
 * @description Error classes and error handling utilities.
 */

// Base errors
export { APIError } from './baseErrors'

// Database errors
export { ConnectionError } from './databaseErrors'

// Error handler
export { errorHandler } from './errorHandler'

// Deprecated
/** @deprecated Use AuthorizationError from decorators/auth instead */
export * as DecoratorErrors from './decoratorErrors'
/** @deprecated Use native instanceof Error check instead */
export * as utils from './utils'

// Legacy namespace export
export * as DatabaseErrors from './databaseErrors'
