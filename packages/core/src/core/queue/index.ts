/**
 * @module Queue
 * @description BullMQ-based job queue system with Redis backend.
 *
 * - **QueueClient**: Producer - adds jobs to queues (used by API services)
 * - **QueueManager**: Consumer - processes jobs from queues (used by workers)
 * - **@QueueWorker**: Decorator for worker class registration
 *
 * @example
 * // Producer (API Service)
 * const client = new QueueClient({ host: 'localhost', port: 6379 });
 * await client.addJob('emails', 'send-welcome', { userId: 123 });
 *
 * @example
 * // Consumer (Worker Service)
 * @QueueWorker('emails', { concurrency: 5 })
 * class EmailWorker implements IQueueWorkerHandler {
 *   async process(job: Job) {
 *     // Process job
 *   }
 * }
 */

// Types
export * from "./types";

// Implementations
export { QueueClient } from "./QueueClient";
export { QueueManager } from "./QueueManager";

// Decorators
export { QueueWorker, QUEUE_WORKER_METADATA_KEY } from "../decorators/queue";
