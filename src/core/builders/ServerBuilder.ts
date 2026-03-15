import http from 'http'
import express, { Handler } from 'express'
import { ApplicationExpress } from '../applications/ApplicationExpress'
import { IApplicationPreCheck } from '../applications/types'
import swaggerUi from 'swagger-ui-express'
import { middlewareRequestTime } from '../middlewares/requestTime'
import { middlewareAuthContext } from '../middlewares/userInfo'
import { ScheduleRegistry } from '../scheduler/ScheduleRegistry'
import { ScheduledTaskConstructor } from '../scheduler/types'

/**
 * ServerBuilder - Builder pattern for Express HTTP server configuration.
 *
 * Provides a fluent API for configuring and starting an Express server
 * with support for routes, middleware, scheduled tasks, and Swagger documentation.
 *
 * @example
 * ```typescript
 * const server = await new ServerBuilder()
 *   .setName('api-server')
 *   .setPort(3000)
 *   .setRoutes([UserController, ProductController])
 *   .setUserAuthentication(true)
 *   .enableSwagger(true)
 *   .setSwaggerSpec(swaggerSpec)
 *   .build()
 *
 * server.run()
 * ```
 */
export class ServerBuilder {
    private __port: number = 3000
    private __name: string = 'default'
    private __routes: unknown[] = []
    private __tasks: ScheduledTaskConstructor[] = []
    private __userAuthentication: boolean = false
    private __expressUseHandlers: Handler[] = []
    private __check: IApplicationPreCheck | undefined
    private __enableSwagger: boolean = false
    private __swaggerSpec: Record<string, unknown> = {}
    private __scheduleRegistry: ScheduleRegistry | undefined
    express: ApplicationExpress | undefined

    constructor() {
        this.express = undefined
    }

    /**
     * Start the HTTP server and begin listening for requests.
     */
    public run(): void {
        const server = http.createServer(this.express?.instance)
        server.listen(this.__port, () => {
            console.log(`Server is listening on :${this.__port}`)
        })
    }

    /**
     * Add an Express middleware handler.
     * @param handler - Express middleware function
     */
    public expressUse(handler: Handler): this {
        this.__expressUseHandlers.push(handler)
        return this
    }

    /**
     * Build the server with all configured options.
     * Must be called before run().
     */
    public async build(): Promise<this> {
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
            this.express.instance.use(middlewareAuthContext)
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

    /**
     * Set pre-flight check handler.
     * @param check - Application pre-check instance
     */
    public setCheck(check: IApplicationPreCheck): this {
        this.__check = check
        return this
    }

    /**
     * Set the server port.
     * @param port - Port number to listen on
     */
    public setPort(port: number): this {
        this.__port = port
        return this
    }

    /**
     * Set the server name for logging.
     * @param name - Server name
     */
    public setName(name: string): this {
        this.__name = name
        return this
    }

    /**
     * Set controller classes for route registration.
     * @param routes - Array of controller classes decorated with @Controller
     */
    public setRoutes(routes: unknown[]): this {
        this.__routes = routes
        return this
    }

    /**
     * Set scheduled task classes.
     * @param tasks - Array of task classes decorated with @Schedule
     */
    public setTasks(tasks: ScheduledTaskConstructor[]): this {
        this.__tasks = tasks
        return this
    }

    /**
     * Get the schedule registry instance.
     */
    public getScheduleRegistry(): ScheduleRegistry | undefined {
        return this.__scheduleRegistry
    }

    /**
     * Enable or disable user authentication middleware.
     * @param enable - Whether to enable authentication
     */
    public setUserAuthentication(enable: boolean): this {
        this.__userAuthentication = enable
        return this
    }

    /**
     * Enable or disable Swagger documentation.
     * @param enable - Whether to enable Swagger UI at /docs
     */
    public enableSwagger(enable: boolean): this {
        this.__enableSwagger = enable
        return this
    }

    /**
     * Set the Swagger/OpenAPI specification.
     * @param swaggerSpec - OpenAPI specification object
     */
    public setSwaggerSpec(swaggerSpec: Record<string, unknown>): this {
        this.__swaggerSpec = swaggerSpec
        return this
    }
}
