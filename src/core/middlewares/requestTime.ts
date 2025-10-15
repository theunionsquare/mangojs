import { NextFunction } from 'express'
/**
 * Populate req.requestTime with the request datetime in ISO format
 */
export const middlewareRequestTime = (
    req: any,
    res: any,
    next: NextFunction
) => {
    req.requestTime = new Date().toISOString()
    next()
}
