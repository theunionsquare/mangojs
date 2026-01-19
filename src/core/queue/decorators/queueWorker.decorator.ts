import 'reflect-metadata'
import { injectable } from 'inversify'
import { WorkerOptions, QueueWorkerMetadata } from '../types'

export const QUEUE_WORKER_METADATA_KEY = Symbol.for('queue:worker:metadata')

/**
 * @QueueWorker decorator
 * Marks a class as a queue worker handler
 *
 * @param queueName - Name of the queue to consume from
 * @param options - Worker configuration options
 *
 * @example
 * ```typescript
 * @QueueWorker('email-queue', { concurrency: 5 })
 * export class EmailWorker implements IQueueWorkerHandler {
 *   async process(job: Job<EmailPayload>): Promise<void> {
 *     await sendEmail(job.data)
 *   }
 * }
 * ```
 */
export function QueueWorker(queueName: string, options: WorkerOptions = {}) {
    return function <T extends new (...args: any[]) => any>(target: T) {
        const metadata: QueueWorkerMetadata = {
            queueName,
            options: {
                concurrency: options.concurrency ?? 1,
                lockDuration: options.lockDuration,
                maxStalledCount: options.maxStalledCount,
            },
        }

        Reflect.defineMetadata(QUEUE_WORKER_METADATA_KEY, metadata, target)

        // Also make it injectable for DI
        injectable()(target)

        return target
    }
}
