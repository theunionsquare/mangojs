import { IScheduledTask } from './types'

/**
 * Abstract base class for scheduled tasks.
 * Extend this class to create a scheduled task.
 *
 * @example
 * ```typescript
 * @Schedule('0 * * * *')
 * @injectable()
 * export class MyTask extends ScheduledTask {
 *   @inject(INVERSITY_TYPES.LoggerFactory)
 *   private loggerFactory: ILoggerFactory;
 *
 *   async run(): Promise<void> {
 *     const logger = this.loggerFactory.create('MyTask');
 *     logger.info('Task running...');
 *     // Your task logic here
 *   }
 *
 *   onStart(): void {
 *     console.log('Task starting');
 *   }
 *
 *   onComplete(): void {
 *     console.log('Task completed');
 *   }
 *
 *   onError(error: Error): void {
 *     console.error('Task failed:', error);
 *   }
 * }
 * ```
 */
export abstract class ScheduledTask implements IScheduledTask {
    /**
     * Main execution method - called on each scheduled run.
     * Must be implemented by subclasses.
     */
    abstract run(): Promise<void> | void

    /**
     * Lifecycle hook called before task execution starts.
     * Override to add pre-execution logic.
     */
    onStart(): void {
        // Default implementation - no-op
    }

    /**
     * Lifecycle hook called after task execution completes successfully.
     * Override to add post-execution logic.
     */
    onComplete(): void {
        // Default implementation - no-op
    }

    /**
     * Lifecycle hook called when task execution fails.
     * Override to add error handling logic.
     *
     * @param error - The error that occurred during execution
     */
    onError(error: Error): void {
        // Default implementation - no-op
    }
}
