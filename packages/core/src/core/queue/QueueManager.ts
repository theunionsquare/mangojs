import { Worker, Job, Queue } from 'bullmq'
import { injectable } from 'inversify'
import {
    RedisConfig,
    WorkerOptions,
    QueueStatus,
    QueueWorkerMetadata,
    IQueueWorkerHandler,
    QueueWorkerConstructor,
} from './types'
import { QUEUE_WORKER_METADATA_KEY } from "../decorators/queue";
import { Container } from 'inversify'

/**
 * Worker entry tracking
 */
interface WorkerEntry {
    queueName: string
    worker: Worker
    handler: IQueueWorkerHandler
    options: WorkerOptions
    status: 'running' | 'stopped' | 'error'
    lastError?: Error
}

/**
 * QueueManager - Wrapper for BullMQ Worker (Consumer side)
 * Used by Worker Service to process jobs from queues
 *
 * This class abstracts BullMQ implementation details.
 * No direct BullMQ calls should be made outside this wrapper.
 */
@injectable()
export class QueueManager {
    private workers: Map<string, WorkerEntry> = new Map()
    private queues: Map<string, Queue> = new Map()
    private redisConfig: RedisConfig
    private container: Container | null = null

    constructor(redisConfig: RedisConfig) {
        this.redisConfig = redisConfig
    }

    /**
     * Set the Inversify container for dependency injection
     */
    setContainer(container: Container): void {
        this.container = container
    }

    /**
     * Get or create a queue instance (for management operations)
     */
    private getQueue(queueName: string): Queue {
        if (!this.queues.has(queueName)) {
            const queue = new Queue(queueName, {
                connection: {
                    host: this.redisConfig.host,
                    port: this.redisConfig.port,
                    password: this.redisConfig.password,
                    db: this.redisConfig.db,
                },
            })
            this.queues.set(queueName, queue)
        }
        return this.queues.get(queueName)!
    }

    /**
     * Register a worker class decorated with @QueueWorker
     */
    register(workerClass: QueueWorkerConstructor): void {
        const metadata: QueueWorkerMetadata | undefined = Reflect.getMetadata(
            QUEUE_WORKER_METADATA_KEY,
            workerClass
        )

        if (!metadata) {
            throw new Error(
                `Class ${workerClass.name} is not decorated with @QueueWorker`
            )
        }

        const { queueName, options } = metadata

        if (this.workers.has(queueName)) {
            throw new Error(`Worker for queue "${queueName}" is already registered`)
        }

        // Create handler instance via DI container or direct instantiation
        let handler: IQueueWorkerHandler
        if (this.container) {
            handler = this.container.get(workerClass)
        } else {
            handler = new workerClass()
        }

        // Create the BullMQ worker
        const workerOptions: {
            connection: {
                host: string
                port: number
                password?: string
                db?: number
            }
            concurrency: number
            lockDuration?: number
            maxStalledCount?: number
        } = {
            connection: {
                host: this.redisConfig.host,
                port: this.redisConfig.port,
                password: this.redisConfig.password,
                db: this.redisConfig.db,
            },
            concurrency: options.concurrency ?? 1,
        }

        // Only add optional settings if they are defined
        if (options.lockDuration !== undefined) {
            workerOptions.lockDuration = options.lockDuration
        }
        if (options.maxStalledCount !== undefined) {
            workerOptions.maxStalledCount = options.maxStalledCount
        }

        const worker = new Worker(
            queueName,
            async (job: Job) => {
                return await handler.process(job)
            },
            workerOptions
        )

        // Set up event handlers
        worker.on('completed', (job: Job, result: any) => {
            if (handler.onCompleted) {
                handler.onCompleted(job, result)
            }
        })

        worker.on('failed', (job: Job | undefined, error: Error) => {
            if (job && handler.onFailed) {
                handler.onFailed(job, error)
            }
            const entry = this.workers.get(queueName)
            if (entry) {
                entry.lastError = error
            }
        })

        worker.on('progress', (job: Job, progress: number | object) => {
            if (handler.onProgress) {
                handler.onProgress(job, progress)
            }
        })

        worker.on('error', (error: Error & { code?: string }) => {
            const entry = this.workers.get(queueName)
            if (entry) {
                entry.status = 'error'
                entry.lastError = error
            }

            // Provide user-friendly error messages for common issues
            if (error.code === 'ECONNREFUSED') {
                console.error(
                    `[QueueManager] Redis connection refused for queue "${queueName}". ` +
                    `Please ensure Redis is running at ${this.redisConfig.host}:${this.redisConfig.port}`
                )
            } else {
                console.error(`[QueueManager] Worker error on queue "${queueName}":`, error.message)
            }
        })

        this.workers.set(queueName, {
            queueName,
            worker,
            handler,
            options,
            status: 'running',
        })

        console.log(
            `Worker registered for queue "${queueName}" with concurrency ${options.concurrency ?? 1}`
        )
    }

    /**
     * Start all registered workers
     */
    startAll(): void {
        for (const [queueName, entry] of this.workers) {
            if (entry.status !== 'running') {
                entry.worker.resume()
                entry.status = 'running'
                console.log(`Worker started for queue "${queueName}"`)
            }
        }
    }

    /**
     * Stop all registered workers
     */
    async stopAll(): Promise<void> {
        for (const [queueName, entry] of this.workers) {
            if (entry.status === 'running') {
                await entry.worker.pause()
                entry.status = 'stopped'
                console.log(`Worker stopped for queue "${queueName}"`)
            }
        }
    }

    /**
     * Start a specific worker by queue name
     */
    start(queueName: string): void {
        const entry = this.workers.get(queueName)
        if (!entry) {
            throw new Error(`No worker registered for queue "${queueName}"`)
        }
        if (entry.status !== 'running') {
            entry.worker.resume()
            entry.status = 'running'
            console.log(`Worker started for queue "${queueName}"`)
        }
    }

    /**
     * Stop a specific worker by queue name
     */
    async stop(queueName: string): Promise<void> {
        const entry = this.workers.get(queueName)
        if (!entry) {
            throw new Error(`No worker registered for queue "${queueName}"`)
        }
        if (entry.status === 'running') {
            await entry.worker.pause()
            entry.status = 'stopped'
            console.log(`Worker stopped for queue "${queueName}"`)
        }
    }

    /**
     * Get queue status/statistics
     */
    async getQueueStatus(queueName: string): Promise<QueueStatus> {
        const queue = this.getQueue(queueName)
        const [waiting, active, completed, failed, delayed, isPaused] = await Promise.all([
            queue.getWaitingCount(),
            queue.getActiveCount(),
            queue.getCompletedCount(),
            queue.getFailedCount(),
            queue.getDelayedCount(),
            queue.isPaused(),
        ])

        return {
            name: queueName,
            waiting,
            active,
            completed,
            failed,
            delayed,
            paused: isPaused,
        }
    }

    /**
     * Get status of all registered workers
     */
    getWorkersStatus(): Array<{
        queueName: string
        status: string
        concurrency: number
        lastError?: string
    }> {
        return Array.from(this.workers.values()).map((entry) => ({
            queueName: entry.queueName,
            status: entry.status,
            concurrency: entry.options.concurrency ?? 1,
            lastError: entry.lastError?.message,
        }))
    }

    /**
     * Pause a queue (stops new jobs from being processed)
     */
    async pauseQueue(queueName: string): Promise<void> {
        const queue = this.getQueue(queueName)
        await queue.pause()
    }

    /**
     * Resume a paused queue
     */
    async resumeQueue(queueName: string): Promise<void> {
        const queue = this.getQueue(queueName)
        await queue.resume()
    }

    /**
     * Clean completed/failed jobs from a queue
     */
    async cleanQueue(
        queueName: string,
        grace: number = 0,
        status: 'completed' | 'failed' = 'completed'
    ): Promise<void> {
        const queue = this.getQueue(queueName)
        await queue.clean(grace, 1000, status)
    }

    /**
     * Close all workers and connections
     */
    async close(): Promise<void> {
        const closeWorkers = Array.from(this.workers.values()).map((entry) =>
            entry.worker.close()
        )
        const closeQueues = Array.from(this.queues.values()).map((queue) =>
            queue.close()
        )
        await Promise.all([...closeWorkers, ...closeQueues])
        this.workers.clear()
        this.queues.clear()
    }
}
