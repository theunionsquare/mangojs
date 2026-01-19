import http from 'http'
import express from 'express'
import { ApplicationExpress } from '../applications/ApplicationExpress'
import { IApplicationPreCheck } from '../types'
import swaggerUi from 'swagger-ui-express'
import { middlewareRequestTime } from '../middlewares/requestTime'
import { middlewareUserInfo } from '../middlewares/userInfo'
import { ScheduleRegistry } from '../scheduler/ScheduleRegistry'
import { ScheduledTaskConstructor } from '../scheduler/types'

export class ServerBuilder {
    private __port: number = 3000
    private __name: string = 'default'
    private __routes: any[] = []
    private __tasks: ScheduledTaskConstructor[] = []
    private __userAuthentication: boolean = false
    private __expressUseHandlers: any[] = []
    private __check: IApplicationPreCheck | undefined
    private __enableSwagger: boolean = false
    private __swaggerSpec: {} = {}
    private __scheduleRegistry: ScheduleRegistry | undefined
    express: ApplicationExpress | undefined

    constructor() {
        this.express = undefined
    }

    public run() {
        const server = http.createServer(this.express?.instance)
        server.listen(this.__port, () => {
            console.log(`Server is listening on :${this.__port}`)
        })
    }

    public expressUse(handler: any) {
        this.__expressUseHandlers.push(handler)
        return this
    }

    public async build() {
        if (this.__check !== undefined) {
            await this.__check.startCheck()
        }
        this.express = new ApplicationExpress(this.__routes)

        // default config
        this.express.instance.use(express.json())

        // Load Uses
        for (const handler of this.__expressUseHandlers) {
            this.express.instance.use(handler)
        }
        // Add Default uses
        if (this.__userAuthentication) {
            this.express.instance.use(middlewareUserInfo)
        }
        this.express.instance.use(middlewareRequestTime)
        // Load routes
        this.express.registerRouters()

        // enable Swagger
        if (this.__enableSwagger && 'info' in this.__swaggerSpec) {
            this.express.instance.use(
                '/docs',
                swaggerUi.serve,
                swaggerUi.setup(this.__swaggerSpec)
            )
        }

        // Initialize and start scheduled tasks
        if (this.__tasks.length > 0) {
            this.__scheduleRegistry = new ScheduleRegistry()
            for (const taskClass of this.__tasks) {
                this.__scheduleRegistry.register(taskClass)
            }
            this.__scheduleRegistry.startAll()
            console.log(`Scheduler started with ${this.__tasks.length} task(s)`)
        }

        return this
    }
    public setCheck(check: IApplicationPreCheck) {
        this.__check = check
        return this
    }

    public setPort(port: number) {
        this.__port = port
        return this
    }

    public setName(name: string) {
        this.__name = name
        return this
    }

    public setRoutes(routes: any[]) {
        this.__routes = routes
        return this
    }

    public setTasks(tasks: ScheduledTaskConstructor[]) {
        this.__tasks = tasks
        return this
    }

    public getScheduleRegistry(): ScheduleRegistry | undefined {
        return this.__scheduleRegistry
    }

    public setUserAuthentication(enable: boolean) {
        this.__userAuthentication = enable
        return this
    }

    public enableSwagger(enable: boolean) {
        this.__enableSwagger = enable
        return this
    }
    public setSwaggerSpec(swaggerSpec: {}) {
        this.__swaggerSpec = swaggerSpec
        return this
    }
}
