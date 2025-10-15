import { Request, Response } from 'express'
import { Controller, Get, loggedMethod } from '@mangojs/core'

@Controller('/health')
export class HealthController {
    /**
     * @swagger
     * /health:
     *  get:
     *    summary: Get health check
     *    description: Return a 200 status when server is up and running
     *    tags:
     *      - health
     *    produces:
     *      - application/json
     *    responses:
     *      200:
     *        description: Service is healthy
     */
    @Get('/')
    @loggedMethod()
    public getStatus(req: Request, res: Response): Response {
        return res.status(200).json({ 
            ok: true, 
            service: 'subscription_server',
            timestamp: new Date().toISOString()
        })
    }
}