import { Request as ExpressRequest } from "express";
import { Response as ExpressResponse } from "express";

export * as response from "./response";
export * as request from "./request";

export interface Base {
  ok: boolean;
  timestamp: string;
  requestId: string;
}

// Generic Request interface that extends Express Request with masked ResBody
// This interface simplifies Express's Request<P, ResBody, ReqBody, ReqQuery> by:
// - Hiding the ResBody (response body) parameter by fixing it to 'any'
// - Exposing only the parameters relevant for request handling
//
// Generic Parameters:
// @template P - URL path parameters (e.g., { id: string } for route /users/:id)
// @template B - Request body type (e.g., { name: string } for POST/PUT payloads)
// @template Q - Query string parameters (e.g., { page: number } for /api/users?page=1)
//
// Example: Request<{ id: string }, { name: string }, { filter: string }>
// represents a request with path param 'id', body with 'name', and query param 'filter'
export interface Request<P = any, B = any, Q = any>
  extends ExpressRequest<P, any, B, Q> {
  // Additional response-specific properties
}

// Generic Response interface that extends Express Response
// This interface wraps Express's Response type for API responses
//
// Generic Parameters:
// @template R - Response body type that will be sent to the client (e.g., { user: User } or { message: string })
//
// Example: Response<{ users: User[] }>
// represents a response that will send an object containing a users array
export interface Response<R = any> extends ExpressResponse<R> {
  // Additional response-specific properties
}
