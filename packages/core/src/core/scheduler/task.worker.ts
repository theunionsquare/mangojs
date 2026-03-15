import { parentPort, workerData } from 'worker_threads'

/**
 * Worker thread entry point for executing scheduled tasks
 * This runs in an isolated context without dependency injection
 */

interface WorkerMessage {
    taskName: string
    taskCode: string
}

interface WorkerResponse {
    success: boolean
    error?: string
}

async function executeTask(): Promise<void> {
    const data = workerData as WorkerMessage

    try {
        // Create a function from the serialized code
        // The taskCode is the string representation of the run method
        const runFunction = new Function(`return (${data.taskCode})`)()

        // Execute the task
        await runFunction()

        // Send success response
        const response: WorkerResponse = { success: true }
        parentPort?.postMessage(response)
    } catch (error) {
        // Send error response
        const response: WorkerResponse = {
            success: false,
            error: error instanceof Error ? error.message : String(error),
        }
        parentPort?.postMessage(response)
    }
}

// Execute immediately when worker starts
executeTask()
