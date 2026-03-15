import { NextFunction, Request, Response } from "express";

/**
 * @deprecated Use Express types directly from 'express' package.
 */
export interface ExpressDecoratorFunction {
  (req: Request, res: Response, next: NextFunction): any;
}
