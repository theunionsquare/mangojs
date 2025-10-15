import { Request, Response } from 'express'
import { Controller, Get, Use, loggedMethod } from '@mangojs/core'

@Controller('/api/iam/v1/health')
export class HealthController {
    /**
     * @swagger
     * /health:
     *  get:
     *    summary: Get health check
     *    description: return a 200 status when server is up and running
     *    tags:
     *      - health
     *    produces:
     *      - application/json
     *    response:
     *      200:
     *        ok: true
     */
    @Get('/')
    @loggedMethod()
    public getStatus(req: Request, res: Response): Response {
        return res.status(200).json({ ok: true })
    }
}
