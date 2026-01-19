import { JobOptions, JobData, JobStatus, QueueStatus } from './types'

/**
 * Interface for Queue Client (used by API Service)
 * Only responsible for adding jobs to queues - never consumes
 */
export interface IQueueClient {
    /**
     * Add a single job to a queue
     * @param queueName - Name of the queue
     * @param jobName - Name/type of the job
     * @param data - Job payload data
     * @param options - Optional job configuration
     * @returns Job ID
     */
    addJob<T>(
        queueName: string,
        jobName: string,
        data: T,
        options?: JobOptions
    ): Promise<string>

    /**
     * Add multiple jobs to a queue in bulk
     * @param queueName - Name of the queue
     * @param jobs - Array of job data
     * @returns Array of Job IDs
     */
    addBulk<T>(queueName: string, jobs: JobData<T>[]): Promise<string[]>

    /**
     * Get the status of a specific job
     * @param queueName - Name of the queue
     * @param jobId - Job ID
     */
    getJobStatus(queueName: string, jobId: string): Promise<JobStatus | null>

    /**
     * Get queue statistics
     * @param queueName - Name of the queue
     */
    getQueueStatus(queueName: string): Promise<QueueStatus>

    /**
     * Close all connections
     */
    close(): Promise<void>
}
