import { randomstring } from './randomString'

import type { Response } from 'express'

export class LogRequest {
    public timestamp: string
    public requestId: string
    constructor(res: Response) {
        this.requestId = randomstring(20)
        this.timestamp = new Date().toISOString()
        res.setHeader('x-request-id', this.requestId)
        res.setHeader('x-request-timestamp', this.timestamp)
    }
}
