import { Job } from 'node-schedule'

/**
 * Options for the @Schedule decorator
 */
export interface ScheduleOptions {
    /** Custom name for the task (defaults to class name) */
    name?: string
    /** Timezone for the cron expression (e.g., 'UTC', 'America/New_York') */
    timezone?: string
    /** Execute the task immediately on startup */
    runOnStart?: boolean
    /** Execution mode: 'main' runs in main thread, 'worker' runs in Worker Thread (no DI support) */
    execution?: 'main' | 'worker'
}

/**
 * Internal metadata stored by @Schedule decorator
 */
export interface ScheduleMetadata {
    cron: string
    options: ScheduleOptions
}

/**
 * Task status enumeration
 */
export type TaskStatus = 'running' | 'stopped' | 'error'

/**
 * Information about a registered task
 */
export interface TaskInfo {
    /** Task name */
    name: string
    /** Cron expression */
    cron: string
    /** Current status */
    status: TaskStatus
    /** Execution mode */
    execution: 'main' | 'worker'
    /** Timezone */
    timezone?: string
    /** Last execution time */
    lastRun?: Date
    /** Next scheduled execution time */
    nextRun?: Date
    /** Last error if any */
    lastError?: Error
}

/**
 * Overall scheduler status
 */
export interface SchedulerStatus {
    /** Whether the scheduler is active */
    active: boolean
    /** Total number of registered tasks */
    totalTasks: number
    /** Number of running tasks */
    runningTasks: number
    /** Number of stopped tasks */
    stoppedTasks: number
    /** List of all tasks */
    tasks: TaskInfo[]
}

/**
 * Interface for the Schedule Registry
 */
export interface IScheduleRegistry {
    /** Register a task class */
    register(taskClass: ScheduledTaskConstructor): void
    /** Get all registered tasks */
    getTasks(): TaskInfo[]
    /** Get a specific task by name */
    getTask(name: string): TaskInfo | undefined
    /** Start a specific task */
    start(name: string): void
    /** Stop a specific task */
    stop(name: string): void
    /** Start all tasks */
    startAll(): void
    /** Stop all tasks */
    stopAll(): void
    /** Get overall scheduler status */
    getStatus(): SchedulerStatus
}

/**
 * Interface for scheduled task implementations
 */
export interface IScheduledTask {
    /** Main execution method - called on each scheduled run */
    run(): Promise<void> | void
    /** Called before task execution starts */
    onStart?(): void
    /** Called after task execution completes successfully */
    onComplete?(): void
    /** Called when task execution fails */
    onError?(error: Error): void
}

/**
 * Constructor type for ScheduledTask classes
 */
export interface ScheduledTaskConstructor {
    new (...args: any[]): IScheduledTask
}

/**
 * Internal task entry in the registry
 */
export interface TaskEntry {
    name: string
    taskClass: ScheduledTaskConstructor
    instance?: IScheduledTask
    cronJob?: Job
    metadata: ScheduleMetadata
    status: TaskStatus
    lastRun?: Date
    lastError?: Error
}
