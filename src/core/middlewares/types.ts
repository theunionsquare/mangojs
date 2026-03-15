/**
 * Middleware types for MangoJS.
 */
import type { Request } from "../types/api";
import { IAuthContext } from "../auth/types";

/**
 * Extended request type with auth context.
 * Available after middlewareAuthContext runs.
 */
export interface AuthenticatedRequest extends Request {
  authContext?: IAuthContext;
}
