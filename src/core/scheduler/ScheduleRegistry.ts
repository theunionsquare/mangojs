import { injectable } from 'inversify'
import * as schedule from 'node-schedule'
import { MetadataKeys } from '../utils/metadata.keys'
import {
    IScheduleRegistry,
    ScheduledTaskConstructor,
    ScheduleMetadata,
    TaskEntry,
    TaskInfo,
    SchedulerStatus,
} from './types'
import { TaskRunner } from './TaskRunner'

/**
 * Registry for managing scheduled tasks.
 * Handles registration, lifecycle management, and status tracking of all scheduled tasks.
 */
@injectable()
export class ScheduleRegistry implements IScheduleRegistry {
    private tasks: Map<string, TaskEntry> = new Map()
    private taskRunner: TaskRunner

    constructor() {
        this.taskRunner = new TaskRunner()
    }

    /**
     * Register a task class with the scheduler.
     * Reads metadata from the @Schedule decorator and sets up the cron job.
     *
     * @param taskClass - The task class decorated with @Schedule
     */
    register(taskClass: ScheduledTaskConstructor): void {
        const metadata = this.getTaskMetadata(taskClass)
        if (!metadata) {
            throw new Error(
                `Task class ${taskClass.name} is not decorated with @Schedule`
            )
        }

        const taskName = metadata.options.name ?? taskClass.name

        if (this.tasks.has(taskName)) {
            throw new Error(`Task with name "${taskName}" is already registered`)
        }

        const entry: TaskEntry = {
            name: taskName,
            taskClass,
            metadata,
            status: 'stopped',
        }

        this.tasks.set(taskName, entry)
    }

    /**
     * Initialize and start a registered task
     */
    start(name: string): void {
        const entry = this.tasks.get(name)
        if (!entry) {
            throw new Error(`Task "${name}" not found`)
        }

        if (entry.status === 'running') {
            return // Already running
        }

        // Create instance if not exists
        if (!entry.instance) {
            entry.instance = this.taskRunner.createInstance(entry.taskClass, entry.metadata)
        }

        // Create cron job using node-schedule
        const jobOptions: schedule.RecurrenceSpecObjLit = {}
        if (entry.metadata.options.timezone) {
            jobOptions.tz = entry.metadata.options.timezone
        }

        entry.cronJob = schedule.scheduleJob(
            entry.name,
            { rule: entry.metadata.cron, ...jobOptions },
            async () => {
                await this.executeTask(entry)
            }
        )

        entry.status = 'running'

        // Run immediately if configured
        if (entry.metadata.options.runOnStart) {
            this.executeTask(entry)
        }
    }

    /**
     * Stop a running task
     */
    stop(name: string): void {
        const entry = this.tasks.get(name)
        if (!entry) {
            throw new Error(`Task "${name}" not found`)
        }

        if (entry.cronJob) {
            entry.cronJob.cancel()
            entry.cronJob = undefined
        }

        entry.status = 'stopped'
    }

    /**
     * Start all registered tasks
     */
    startAll(): void {
        for (const name of this.tasks.keys()) {
            this.start(name)
        }
    }

    /**
     * Stop all running tasks
     */
    stopAll(): void {
        for (const name of this.tasks.keys()) {
            this.stop(name)
        }
    }

    /**
     * Get information about all registered tasks
     */
    getTasks(): TaskInfo[] {
        return Array.from(this.tasks.values()).map((entry) => this.toTaskInfo(entry))
    }

    /**
     * Get information about a specific task
     */
    getTask(name: string): TaskInfo | undefined {
        const entry = this.tasks.get(name)
        return entry ? this.toTaskInfo(entry) : undefined
    }

    /**
     * Get overall scheduler status
     */
    getStatus(): SchedulerStatus {
        const tasks = this.getTasks()
        const runningTasks = tasks.filter((t) => t.status === 'running').length
        const stoppedTasks = tasks.filter((t) => t.status === 'stopped').length

        return {
            active: runningTasks > 0,
            totalTasks: tasks.length,
            runningTasks,
            stoppedTasks,
            tasks,
        }
    }

    /**
     * Execute a task with lifecycle hooks
     */
    private async executeTask(entry: TaskEntry): Promise<void> {
        if (!entry.instance) {
            return
        }

        const instance = entry.instance

        try {
            // Call onStart hook
            if (instance.onStart) {
                instance.onStart()
            }

            // Execute task based on execution mode
            if (entry.metadata.options.execution === 'worker') {
                await this.taskRunner.runInWorker(entry)
            } else {
                await instance.run()
            }

            entry.lastRun = new Date()
            entry.lastError = undefined

            // Call onComplete hook
            if (instance.onComplete) {
                instance.onComplete()
            }
        } catch (error) {
            entry.lastError = error instanceof Error ? error : new Error(String(error))
            entry.status = 'error'

            // Call onError hook
            if (instance.onError) {
                instance.onError(entry.lastError)
            }
        }
    }

    /**
     * Extract schedule metadata from a task class
     */
    private getTaskMetadata(taskClass: ScheduledTaskConstructor): ScheduleMetadata | undefined {
        return Reflect.getMetadata(MetadataKeys.SCHEDULE_METADATA, taskClass)
    }

    /**
     * Convert internal TaskEntry to public TaskInfo
     */
    private toTaskInfo(entry: TaskEntry): TaskInfo {
        return {
            name: entry.name,
            cron: entry.metadata.cron,
            status: entry.status,
            execution: entry.metadata.options.execution ?? 'main',
            timezone: entry.metadata.options.timezone,
            lastRun: entry.lastRun,
            nextRun: entry.cronJob?.nextInvocation() ?? undefined,
            lastError: entry.lastError,
        }
    }
}
