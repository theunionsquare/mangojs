import { Worker } from 'worker_threads'
import path from 'path'
import {
    IScheduledTask,
    ScheduledTaskConstructor,
    ScheduleMetadata,
    TaskEntry,
} from './types'

/**
 * Message sent to worker thread
 */
interface WorkerMessage {
    taskName: string
    taskCode: string
}

/**
 * Response from worker thread
 */
interface WorkerResponse {
    success: boolean
    error?: string
}

/**
 * Handles task execution in different modes (main thread or worker thread)
 */
export class TaskRunner {
    private workerPath: string

    constructor() {
        // Path to the worker entry point
        this.workerPath = path.join(__dirname, 'task.worker.js')
    }

    /**
     * Create an instance of a task class
     */
    createInstance(
        taskClass: ScheduledTaskConstructor,
        _metadata: ScheduleMetadata
    ): IScheduledTask {
        return new taskClass()
    }

    /**
     * Run a task in a worker thread
     * Note: Worker execution does not support dependency injection
     */
    async runInWorker(entry: TaskEntry): Promise<void> {
        return new Promise((resolve, reject) => {
            const worker = new Worker(this.workerPath, {
                workerData: {
                    taskName: entry.name,
                    taskCode: this.serializeTaskClass(entry.taskClass),
                } as WorkerMessage,
            })

            worker.on('message', (response: WorkerResponse) => {
                if (response.success) {
                    resolve()
                } else {
                    reject(new Error(response.error ?? 'Unknown worker error'))
                }
            })

            worker.on('error', (error) => {
                reject(error)
            })

            worker.on('exit', (code) => {
                if (code !== 0) {
                    reject(new Error(`Worker stopped with exit code ${code}`))
                }
            })
        })
    }

    /**
     * Serialize a task class to a string for worker execution
     * This extracts the run method as a string to execute in the worker
     */
    private serializeTaskClass(taskClass: ScheduledTaskConstructor): string {
        // Create a temporary instance to get the run method
        const instance = new taskClass()
        const runMethod = instance.run.toString()
        return runMethod
    }
}
