/**
 * Middleware types for MangoJS.
 */
import type { Request } from "../types/api/index.js";
import { IAuthContext } from "../auth/types.js";

/**
 * Extended request type with auth context.
 * Available after middlewareAuthContext runs.
 */
export interface AuthenticatedRequest extends Request {
  authContext?: IAuthContext;
}
