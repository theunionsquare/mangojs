import { NextFunction, Request, Response } from "express";

/**
 * Adds request timestamp to the request object.
 *
 * Populates `req.requestTime` with the request datetime in ISO format.
 *
 * @example
 * app.use(middlewareRequestTime);
 * // req.requestTime = "2024-01-15T10:30:00.000Z"
 */
export const middlewareRequestTime = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  (req as Request & { requestTime: string }).requestTime =
    new Date().toISOString();
  next();
};
