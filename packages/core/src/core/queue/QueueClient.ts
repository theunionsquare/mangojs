import { Queue } from "bullmq";
import { injectable } from "inversify";
import {
  IQueueClient,
  RedisConfig,
  JobOptions,
  JobData,
  JobStatus,
  QueueStatus,
} from "./types";

/**
 * QueueClient - Wrapper for BullMQ Queue (Producer side)
 * Used by API Service to add jobs to queues
 *
 * This class abstracts BullMQ implementation details.
 * No direct BullMQ calls should be made outside this wrapper.
 */
@injectable()
export class QueueClient implements IQueueClient {
    private queues: Map<string, Queue> = new Map()
    private redisConfig: RedisConfig

    constructor(redisConfig: RedisConfig) {
        this.redisConfig = redisConfig
    }

    /**
     * Get or create a queue instance
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
     * Add a single job to a queue
     */
    async addJob<T>(
        queueName: string,
        jobName: string,
        data: T,
        options?: JobOptions
    ): Promise<string> {
        const queue = this.getQueue(queueName)
        const job = await queue.add(jobName, data, {
            delay: options?.delay,
            attempts: options?.attempts,
            backoff: options?.backoff,
            priority: options?.priority,
            removeOnComplete: options?.removeOnComplete,
            removeOnFail: options?.removeOnFail,
            jobId: options?.jobId,
        })
        return job.id!
    }

    /**
     * Add multiple jobs to a queue in bulk
     */
    async addBulk<T>(queueName: string, jobs: JobData<T>[]): Promise<string[]> {
        const queue = this.getQueue(queueName)
        const bulkJobs = jobs.map((job) => ({
            name: job.name,
            data: job.data,
            opts: job.options
                ? {
                      delay: job.options.delay,
                      attempts: job.options.attempts,
                      backoff: job.options.backoff,
                      priority: job.options.priority,
                      removeOnComplete: job.options.removeOnComplete,
                      removeOnFail: job.options.removeOnFail,
                      jobId: job.options.jobId,
                  }
                : undefined,
        }))
        const addedJobs = await queue.addBulk(bulkJobs)
        return addedJobs.map((job) => job.id!)
    }

    /**
     * Get the status of a specific job
     */
    async getJobStatus(queueName: string, jobId: string): Promise<JobStatus | null> {
        const queue = this.getQueue(queueName)
        const job = await queue.getJob(jobId)

        if (!job) {
            return null
        }

        const state = await job.getState()

        return {
            id: job.id!,
            name: job.name,
            status: state as JobStatus['status'],
            progress: typeof job.progress === 'number' ? job.progress : 0,
            data: job.data,
            returnValue: job.returnvalue,
            failedReason: job.failedReason,
            attemptsMade: job.attemptsMade,
            timestamp: job.timestamp,
        }
    }

    /**
     * Get queue statistics
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
     * Close all queue connections
     */
    async close(): Promise<void> {
        const closePromises = Array.from(this.queues.values()).map((queue) => queue.close())
        await Promise.all(closePromises)
        this.queues.clear()
    }
}
