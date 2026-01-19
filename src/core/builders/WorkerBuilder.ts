import { Container } from 'inversify'
import { QueueManager } from '../queue/QueueManager'
import { RedisConfig, QueueWorkerConstructor } from '../queue/types'
import { IApplicationPreCheck } from '../types'

/**
 * WorkerBuilder - Builder for Worker Service
 * Similar to ServerBuilder but for queue workers
 *
 * @example
 * ```typescript
 * const workerBuilder = new WorkerBuilder()
 *   .setName('email-worker')
 *   .setRedisConfig({ host: 'localhost', port: 6379 })
 *   .setWorkers([EmailWorker, NotificationWorker])
 *   .setContainer(container)
 *   .build()
 *
 * workerBuilder.run()
 * ```
 */
export class WorkerBuilder {
    private __name: string = 'worker'
    private __redisConfig: RedisConfig | undefined
    private __workers: QueueWorkerConstructor[] = []
    private __container: Container | undefined
    private __check: IApplicationPreCheck | undefined
    private __queueManager: QueueManager | undefined

    constructor() {}

    /**
     * Start the worker service
     */
    public run(): void {
        if (!this.__queueManager) {
            throw new Error('WorkerBuilder must be built before running')
        }

        console.log(`Worker service "${this.__name}" is running`)
        console.log(`Registered ${this.__workers.length} worker(s)`)

        // Handle graceful shutdown
        process.on('SIGTERM', async () => {
            console.log('SIGTERM received, shutting down workers...')
            await this.shutdown()
            process.exit(0)
        })

        process.on('SIGINT', async () => {
            console.log('SIGINT received, shutting down workers...')
            await this.shutdown()
            process.exit(0)
        })
    }

    /**
     * Build the worker service
     */
    public async build(): Promise<this> {
        if (!this.__redisConfig) {
            throw new Error('Redis configuration is required. Call setRedisConfig()')
        }

        // Run pre-checks if configured
        if (this.__check !== undefined) {
            await this.__check.startCheck()
        }

        // Create queue manager
        this.__queueManager = new QueueManager(this.__redisConfig)

        // Set container for dependency injection
        if (this.__container) {
            this.__queueManager.setContainer(this.__container)
        }

        // Register all workers
        for (const workerClass of this.__workers) {
            this.__queueManager.register(workerClass)
        }

        return this
    }

    /**
     * Gracefully shutdown all workers
     */
    public async shutdown(): Promise<void> {
        if (this.__queueManager) {
            await this.__queueManager.close()
            console.log('All workers shut down')
        }
    }

    /**
     * Set pre-check handler
     */
    public setCheck(check: IApplicationPreCheck): this {
        this.__check = check
        return this
    }

    /**
     * Set the worker service name
     */
    public setName(name: string): this {
        this.__name = name
        return this
    }

    /**
     * Set Redis configuration
     */
    public setRedisConfig(config: RedisConfig): this {
        this.__redisConfig = config
        return this
    }

    /**
     * Set worker classes to register
     */
    public setWorkers(workers: QueueWorkerConstructor[]): this {
        this.__workers = workers
        return this
    }

    /**
     * Set Inversify container for dependency injection
     */
    public setContainer(container: Container): this {
        this.__container = container
        return this
    }

    /**
     * Get the queue manager instance
     */
    public getQueueManager(): QueueManager | undefined {
        return this.__queueManager
    }
}
