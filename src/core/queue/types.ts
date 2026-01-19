import { Job } from 'bullmq'

/**
 * Redis connection configuration
 */
export interface RedisConfig {
    host: string
    port: number
    password?: string
    db?: number
}

/**
 * Options for adding a job to a queue
 */
export interface JobOptions {
    /** Delay before the job is processed (ms) */
    delay?: number
    /** Number of retry attempts on failure */
    attempts?: number
    /** Backoff strategy for retries */
    backoff?: {
        type: 'fixed' | 'exponential'
        delay: number
    }
    /** Job priority (lower = higher priority) */
    priority?: number
    /** Remove job from queue after completion */
    removeOnComplete?: boolean | number
    /** Remove job from queue after failure */
    removeOnFail?: boolean | number
    /** Unique job ID (prevents duplicates) */
    jobId?: string
}

/**
 * Job data structure
 */
export interface JobData<T = any> {
    name: string
    data: T
    options?: JobOptions
}

/**
 * Job status information
 */
export interface JobStatus {
    id: string
    name: string
    status: 'waiting' | 'active' | 'completed' | 'failed' | 'delayed'
    progress: number
    data: any
    returnValue?: any
    failedReason?: string
    attemptsMade: number
    timestamp: number
}

/**
 * Queue status information
 */
export interface QueueStatus {
    name: string
    waiting: number
    active: number
    completed: number
    failed: number
    delayed: number
    paused: boolean
}

/**
 * Worker configuration options
 */
export interface WorkerOptions {
    /** Number of concurrent jobs to process */
    concurrency?: number
    /** Lock duration for a job (ms) */
    lockDuration?: number
    /** Maximum stalled count before failing */
    maxStalledCount?: number
}

/**
 * Metadata for @QueueWorker decorator
 */
export interface QueueWorkerMetadata {
    queueName: string
    options: WorkerOptions
}

/**
 * Interface for queue worker handlers
 */
export interface IQueueWorkerHandler<T = any> {
    /**
     * Process a job from the queue
     */
    process(job: Job<T>): Promise<any>

    /**
     * Called when a job completes successfully
     */
    onCompleted?(job: Job<T>, result: any): void

    /**
     * Called when a job fails
     */
    onFailed?(job: Job<T>, error: Error): void

    /**
     * Called when job progress is updated
     */
    onProgress?(job: Job<T>, progress: number | object): void
}

/**
 * Constructor type for queue worker classes
 */
export type QueueWorkerConstructor = new (...args: any[]) => IQueueWorkerHandler
