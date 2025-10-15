import { NextFunction, Request, Response } from 'express'

export interface ExpressDecoratorFunction {
    (req: Request, res: Response, next: NextFunction): any
}
