# Queue Types Reference

This document provides complete type definitions for the MangoJS Queue System.

---

## RedisConfig

Configuration for Redis connection.

```typescript
interface RedisConfig {
  host: string;       // Redis server hostname
  port: number;       // Redis server port (default: 6379)
  password?: string;  // Optional password for authentication
  db?: number;        // Optional database number (default: 0)
}
```

**Usage:**

```typescript
const redisConfig: RedisConfig = {
  host: process.env.REDIS_HOST || "localhost",
  port: parseInt(process.env.REDIS_PORT || "6379"),
  password: process.env.REDIS_PASSWORD,
  db: 0,
};
```

---

## JobOptions

Options when adding a job to a queue.

```typescript
interface JobOptions {
  delay?: number;                    // Delay before processing (milliseconds)
  attempts?: number;                 // Number of retry attempts
  backoff?: {                        // Retry backoff strategy
    type: "fixed" | "exponential";
    delay: number;                   // Base delay in milliseconds
  };
  priority?: number;                 // Job priority (lower = higher priority)
  removeOnComplete?: boolean | number; // Remove after completion
  removeOnFail?: boolean | number;   // Remove after failure
  jobId?: string;                    // Custom job ID (prevents duplicates)
}
```

**Property Details:**

| Property | Description |
|----------|-------------|
| `delay` | Number of milliseconds to wait before the job becomes available for processing. Useful for scheduling future tasks. |
| `attempts` | Total number of attempts including the initial try. If set to 3, the job will be retried twice after the first failure. |
| `backoff.type` | `"fixed"` = same delay between retries. `"exponential"` = delay doubles each retry. |
| `backoff.delay` | Base delay in ms. For exponential: 1st retry = delay, 2nd = delay*2, 3rd = delay*4, etc. |
| `priority` | Jobs with lower priority numbers are processed first. Default is 0. |
| `removeOnComplete` | `true` = remove immediately. `number` = keep last N completed jobs. |
| `removeOnFail` | `true` = remove immediately. `number` = keep last N failed jobs. |
| `jobId` | If a job with this ID already exists in the queue, the new job will not be added. |

**Usage:**

```typescript
await queueClient.addJob("email-queue", "send-email", emailData, {
  attempts: 5,
  backoff: { type: "exponential", delay: 2000 },
  priority: 1,
  removeOnComplete: 100, // Keep last 100 completed
  removeOnFail: 50,      // Keep last 50 failed
});
```

---

## JobData

Structure for bulk job creation.

```typescript
interface JobData<T> {
  name: string;           // Job name
  data: T;                // Job payload
  options?: JobOptions;   // Optional job options
}
```

**Usage:**

```typescript
const jobs: JobData<EmailPayload>[] = [
  { name: "welcome-email", data: { to: "user1@example.com" } },
  { name: "welcome-email", data: { to: "user2@example.com" }, options: { priority: 1 } },
];

await queueClient.addBulk("email-queue", jobs);
```

---

## JobStatus

Status information for a single job.

```typescript
interface JobStatus {
  id: string;                                              // Job ID
  name: string;                                            // Job name
  status: "waiting" | "active" | "completed" | "failed" | "delayed";
  progress: number;                                        // Progress 0-100
  data: any;                                               // Job data
  returnValue?: any;                                       // Result from process()
  failedReason?: string;                                   // Error message if failed
  attemptsMade: number;                                    // Number of attempts so far
  timestamp: number;                                       // Job creation timestamp
}
```

**Status Values:**

| Status | Description |
|--------|-------------|
| `waiting` | Job is queued and waiting to be picked up by a worker |
| `active` | Job is currently being processed by a worker |
| `completed` | Job finished successfully |
| `failed` | Job failed after all retry attempts |
| `delayed` | Job is scheduled to run in the future |

**Usage:**

```typescript
const status = await queueClient.getJobStatus("email-queue", jobId);

switch (status?.status) {
  case "waiting":
    console.log("Job is in queue");
    break;
  case "active":
    console.log(`Processing: ${status.progress}%`);
    break;
  case "completed":
    console.log("Done:", status.returnValue);
    break;
  case "failed":
    console.log("Failed:", status.failedReason);
    break;
  case "delayed":
    console.log("Scheduled for later");
    break;
}
```

---

## QueueStatus

Aggregate statistics for a queue.

```typescript
interface QueueStatus {
  name: string;       // Queue name
  waiting: number;    // Jobs waiting to be processed
  active: number;     // Jobs currently being processed
  completed: number;  // Total completed jobs
  failed: number;     // Total failed jobs
  delayed: number;    // Jobs scheduled for future
  paused: boolean;    // Whether queue is paused
}
```

**Usage:**

```typescript
const status = await queueClient.getQueueStatus("email-queue");

// Check queue health
if (status.waiting > 1000) {
  console.warn("Queue backlog is growing, consider scaling workers");
}

if (status.failed > status.completed * 0.1) {
  console.error("High failure rate detected");
}
```

---

## WorkerOptions

Configuration options for `@QueueWorker` decorator.

```typescript
interface WorkerOptions {
  concurrency?: number;      // Jobs to process concurrently (default: 1)
  lockDuration?: number;     // Lock timeout in ms (default: 30000)
  maxStalledCount?: number;  // Max stalls before failing (default: 1)
}
```

**Property Details:**

| Property | Default | Description |
|----------|---------|-------------|
| `concurrency` | 1 | How many jobs this worker can process simultaneously. Higher = more throughput but more resource usage. |
| `lockDuration` | 30000 | How long a job is locked while processing. If processing exceeds this, the job may be picked up by another worker (stalled). |
| `maxStalledCount` | 1 | Number of times a job can stall before being permanently failed. Stalling occurs when a worker crashes or job exceeds lockDuration. |

**Usage:**

```typescript
// High-throughput I/O-bound worker
@QueueWorker("api-calls", { concurrency: 10 })

// Long-running CPU-bound worker
@QueueWorker("video-processing", {
  concurrency: 1,
  lockDuration: 300000, // 5 minutes
  maxStalledCount: 2,
})
```

---

## IQueueClient

Interface for the queue client (producer).

```typescript
interface IQueueClient {
  addJob<T>(
    queueName: string,
    jobName: string,
    data: T,
    options?: JobOptions,
  ): Promise<string>;

  addBulk<T>(
    queueName: string,
    jobs: JobData<T>[],
  ): Promise<string[]>;

  getJobStatus(
    queueName: string,
    jobId: string,
  ): Promise<JobStatus | null>;

  getQueueStatus(
    queueName: string,
  ): Promise<QueueStatus>;

  close(): Promise<void>;
}
```

---

## IQueueWorkerHandler

Interface that all queue workers must implement.

```typescript
interface IQueueWorkerHandler<T = any> {
  // Required: Process a job
  process(job: Job<T>): Promise<any>;

  // Optional: Called after successful completion
  onCompleted?(job: Job<T>, result: any): void;

  // Optional: Called after all retries exhausted
  onFailed?(job: Job<T>, error: Error): void;

  // Optional: Called when progress is updated
  onProgress?(job: Job<T>, progress: number | object): void;
}
```

**Type Parameter:**

The generic type `T` defines the shape of `job.data`:

```typescript
interface MyJobPayload {
  userId: string;
  action: "sync" | "notify";
  metadata?: Record<string, any>;
}

class MyWorker implements IQueueWorkerHandler<MyJobPayload> {
  async process(job: Job<MyJobPayload>): Promise<void> {
    // job.data is typed as MyJobPayload
    const { userId, action } = job.data;
  }
}
```

---

## QueueWorkerMetadata

Internal metadata stored by `@QueueWorker` decorator.

```typescript
interface QueueWorkerMetadata {
  queueName: string;
  options?: WorkerOptions;
}
```

---

## WorkerStatusInfo

Status information for a registered worker.

```typescript
interface WorkerStatusInfo {
  queueName: string;  // Queue this worker handles
  running: boolean;   // Whether worker is currently running
  paused: boolean;    // Whether worker is paused
}
```

**Usage:**

```typescript
const statuses = queueManager.getWorkersStatus();

statuses.forEach((worker) => {
  console.log(`${worker.queueName}: ${
    worker.paused ? "paused" :
    worker.running ? "running" : "stopped"
  }`);
});
```

---

## Job (from BullMQ)

The job object passed to `process()`. This is the BullMQ Job type.

```typescript
interface Job<T> {
  id: string;                    // Job ID
  name: string;                  // Job name
  data: T;                       // Job payload
  attemptsMade: number;          // Attempts so far
  timestamp: number;             // Creation timestamp
  returnvalue?: any;             // Return value from process()
  failedReason?: string;         // Error message if failed

  // Methods
  updateProgress(progress: number | object): Promise<void>;
  log(row: string): Promise<void>;
  moveToFailed(err: Error, token?: string): Promise<void>;
  remove(): Promise<void>;
  retry(state?: string): Promise<void>;
}
```

**Common Methods:**

```typescript
async process(job: Job<T>): Promise<void> {
  // Update progress (0-100 or object)
  await job.updateProgress(50);
  await job.updateProgress({ step: "parsing", percent: 50 });

  // Add log entry (stored with job)
  await job.log("Started processing...");
  await job.log(`Processed ${count} records`);

  // Access metadata
  console.log(`Attempt ${job.attemptsMade + 1}`);
  console.log(`Job created at ${new Date(job.timestamp)}`);
}
```

## Related

- [Architecture](./architecture.context.md) - System architecture overview
- [Decorators](./decorators.context.md) - Using the types with decorators
- [WorkerBuilder](./worker-builder.context.md) - API reference for client and builder
- [Examples](./examples.context.md) - Types in action
