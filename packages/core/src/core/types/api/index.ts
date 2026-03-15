/**
 * @module Types.api
 * @description API request and response type definitions for MangoJS applications.
 */

import type { Request as ExpressRequest, Response as ExpressResponse } from "express";
import type { MiddlewareUserInfo } from "../entities/middlewareUserInfo.type";

// ============================================================================
// Base Response Types
// ============================================================================

/**
 * Base fields included in all API responses.
 */
export interface BaseResponse {
  ok: boolean;
  timestamp: string;
  requestId: string;
}

/**
 * Successful API response with typed data.
 */
export interface SuccessResponse<T = unknown> extends BaseResponse {
  ok: true;
  data: T;
}

/**
 * Error API response.
 */
export interface ErrorResponse extends BaseResponse {
  ok: false;
  error: {
    message: string;
    code?: string;
  };
}

/**
 * API response - either success or error.
 */
export type ApiResponse<T = unknown> = SuccessResponse<T> | ErrorResponse;

// ============================================================================
// Pagination
// ============================================================================

/**
 * Pagination metadata for list responses.
 */
export interface Pagination {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

/**
 * Paginated data container.
 */
export interface PaginatedData<T> {
  items: T[];
  pagination: Pagination;
}

/**
 * Paginated API response.
 */
export interface PaginatedResponse<T> extends BaseResponse {
  ok: true;
  data: PaginatedData<T>;
}

// ============================================================================
// Request Types
// ============================================================================

/**
 * Generic API request extending Express Request.
 *
 * @template P - URL path parameters (e.g., `{ id: string }` for route `/users/:id`)
 * @template B - Request body type (e.g., `{ name: string }` for POST/PUT payloads)
 * @template Q - Query string parameters (e.g., `{ page: number }` for `/api/users?page=1`)
 *
 * @example
 * // Request with path param 'id', body with 'name', and query param 'filter'
 * type MyRequest = Request<{ id: string }, { name: string }, { filter: string }>;
 */
export interface Request<P = any, B = any, Q = any>
  extends ExpressRequest<P, any, B, Q> {
  /** Request timestamp set by middleware */
  requestTime?: string;
  /** Authenticated user info set by auth middleware */
  user?: MiddlewareUserInfo;
}

/**
 * Generic API response extending Express Response.
 *
 * @template R - Response body type that will be sent to the client
 *
 * @example
 * type MyResponse = Response<SuccessResponse<{ users: User[] }>>;
 */
export interface Response<R = unknown> extends ExpressResponse<R> {}
