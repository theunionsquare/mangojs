---
sidebar_label: "Worker builder"
---

# WorkerBuilder & QueueClient

## Overview

This document covers the two main entry points for the queue system:

- **QueueClient** - Producer side (API services), used to add jobs to queues
- **WorkerBuilder** - Consumer side (Worker services), used to run workers that process jobs

---

## QueueClient (Producer)

The `QueueClient` is used by API services to add jobs to queues. It **only produces jobs**, never consumes them.

### Interface

```typescript
interface IQueueClient {
  addJob<T>(
    queueName: string,
    jobName: string,
    data: T,
    options?: JobOptions,
  ): Promise<string>;

  addBulk<T>(queueName: string, jobs: JobData<T>[]): Promise<string[]>;

  getJobStatus(queueName: string, jobId: string): Promise<JobStatus | null>;

  getQueueStatus(queueName: string): Promise<QueueStatus>;

  close(): Promise<void>;
}
```

### Container Setup

Bind `QueueClient` in your API service's container:

```typescript
import {
  Queue,
  INVERSITY_TYPES,
} from "@theunionsquare/mangojs-core";
import { Container } from "inversify";

const container = new Container();

container.bind<Queue.IQueueClient>(INVERSITY_TYPES.QueueClient).toConstantValue(
  new Queue.QueueClient({
    host: process.env.REDIS_HOST || "localhost",
    port: parseInt(process.env.REDIS_PORT || "6379"),
    password: process.env.REDIS_PASSWORD,
  }),
);
```

### addJob()

Add a single job to a queue.

```typescript
const jobId = await queueClient.addJob(
  "email-queue", // Queue name
  "send-welcome", // Job name (for filtering/debugging)
  {
    // Job data (must be serializable)
    to: "user@example.com",
    subject: "Welcome!",
    body: "Thanks for signing up.",
  },
  {
    // Optional: Job options
    attempts: 3,
    backoff: { type: "exponential", delay: 1000 },
  },
);

console.log(`Job queued with ID: ${jobId}`);
```

### addBulk()

Add multiple jobs to a queue in a single operation. More efficient than multiple `addJob()` calls.

```typescript
const jobs = users.map((user) => ({
  name: "send-notification",
  data: { userId: user.id, message: "System maintenance scheduled" },
  options: { priority: user.isPremium ? 1 : 10 },
}));

const jobIds = await queueClient.addBulk("notification-queue", jobs);
console.log(`Queued ${jobIds.length} jobs`);
```

**When to use bulk:**

- Sending notifications to multiple users
- Processing batch imports
- Queueing many related tasks at once

### getJobStatus()

Check the status of a specific job.

```typescript
const status = await queueClient.getJobStatus("email-queue", jobId);

if (status) {
  console.log(`Job ${status.id}: ${status.status}`);
  console.log(`Progress: ${status.progress}%`);
  console.log(`Attempts: ${status.attemptsMade}`);

  if (status.status === "failed") {
    console.log(`Failed reason: ${status.failedReason}`);
  }

  if (status.status === "completed") {
    console.log(`Result: ${status.returnValue}`);
  }
}
```

### getQueueStatus()

Get aggregate statistics for a queue.

```typescript
const status = await queueClient.getQueueStatus("email-queue");

console.log(`Queue: ${status.name}`);
console.log(`Waiting: ${status.waiting}`);
console.log(`Active: ${status.active}`);
console.log(`Completed: ${status.completed}`);
console.log(`Failed: ${status.failed}`);
console.log(`Delayed: ${status.delayed}`);
console.log(`Paused: ${status.paused}`);
```

### close()

Gracefully close all connections. Call this on application shutdown.

```typescript
process.on("SIGTERM", async () => {
  await queueClient.close();
  process.exit(0);
});
```

### Job Options

| Option             | Type                                                | Description                                                 |
| ------------------ | --------------------------------------------------- | ----------------------------------------------------------- |
| `delay`            | `number`                                            | Delay before processing (ms). Use for scheduled jobs.       |
| `attempts`         | `number`                                            | Number of retry attempts on failure.                        |
| `backoff`          | `{ type: 'fixed' \| 'exponential', delay: number }` | Retry backoff strategy.                                     |
| `priority`         | `number`                                            | Job priority. Lower = higher priority. Default is 0.        |
| `removeOnComplete` | `boolean \| number`                                 | Remove job data after completion. Number keeps last N jobs. |
| `removeOnFail`     | `boolean \| number`                                 | Remove job data after failure. Number keeps last N jobs.    |
| `jobId`            | `string`                                            | Custom job ID. Prevents duplicates if same ID exists.       |

---

## WorkerBuilder (Consumer)

The `WorkerBuilder` creates and runs worker services, similar to how `ServerBuilder` works for API services.

### Methods

| Method                                | Description                                          |
| ------------------------------------- | ---------------------------------------------------- |
| `setName(name: string)`               | Set worker service name (for logging/identification) |
| `setRedisConfig(config: RedisConfig)` | Set Redis connection configuration                   |
| `setWorkers(workers: Function[])`     | Set worker classes to register                       |
| `setContainer(container: Container)`  | Set Inversify container for dependency injection     |
| `setCheck(check: Function)`           | Set pre-check handler (e.g., health checks)          |
| `build()`                             | Build the worker service (returns self)              |
| `run()`                               | Start all registered workers                         |
| `shutdown()`                          | Gracefully stop all workers                          |
| `getQueueManager()`                   | Get the underlying `QueueManager` instance           |

### Basic Setup

```typescript
// worker/src/index.ts
import { Builders } from "@theunionsquare/mangojs-core";
import { EmailWorker } from "./workers/email.worker";
import { ReportWorker } from "./workers/report.worker";
import { container } from "./inversify.config";

async function main() {
  const worker = await new Builders.WorkerBuilder()
    .setName("background-worker")
    .setRedisConfig({
      host: process.env.REDIS_HOST || "localhost",
      port: parseInt(process.env.REDIS_PORT || "6379"),
      password: process.env.REDIS_PASSWORD,
    })
    .setWorkers([EmailWorker, ReportWorker])
    .setContainer(container)
    .build();

  // Start processing jobs
  worker.run();

  // Graceful shutdown
  process.on("SIGTERM", async () => {
    console.log("Shutting down workers...");
    await worker.shutdown();
    process.exit(0);
  });

  process.on("SIGINT", async () => {
    console.log("Shutting down workers...");
    await worker.shutdown();
    process.exit(0);
  });
}

main().catch(console.error);
```

### With Pre-Check

Run checks before starting workers (e.g., database connection, external service availability):

```typescript
const worker = await new Builders.WorkerBuilder()
  .setName("background-worker")
  .setRedisConfig({ host: "localhost", port: 6379 })
  .setWorkers([EmailWorker])
  .setContainer(container)
  .setCheck(async () => {
    // Check database connection
    await container.get(INVERSITY_TYPES.Database).ping();

    // Check external services
    await container.get(INVERSITY_TYPES.EmailService).healthCheck();

    console.log("Pre-checks passed");
  })
  .build();
```

---

## QueueManager API

The `QueueManager` is used internally by `WorkerBuilder` but can be accessed for runtime management.

```typescript
const queueManager = worker.getQueueManager();
```

### Methods

| Method                                      | Return Type            | Description                               |
| ------------------------------------------- | ---------------------- | ----------------------------------------- |
| `register(workerClass)`                     | `void`                 | Register a worker class manually          |
| `startAll()`                                | `void`                 | Start all registered workers              |
| `stopAll()`                                 | `Promise<void>`        | Stop all registered workers               |
| `start(queueName)`                          | `void`                 | Start a specific worker by queue name     |
| `stop(queueName)`                           | `Promise<void>`        | Stop a specific worker by queue name      |
| `getQueueStatus(queueName)`                 | `Promise<QueueStatus>` | Get queue statistics                      |
| `getWorkersStatus()`                        | `WorkerStatusInfo[]`   | Get all workers' current status           |
| `pauseQueue(queueName)`                     | `Promise<void>`        | Pause a queue (stops processing new jobs) |
| `resumeQueue(queueName)`                    | `Promise<void>`        | Resume a paused queue                     |
| `cleanQueue(queueName, grace, limit, type)` | `Promise<void>`        | Clean completed/failed jobs               |
| `close()`                                   | `Promise<void>`        | Close all connections                     |

### Runtime Queue Management

```typescript
const queueManager = worker.getQueueManager();

// Pause email processing (for maintenance)
await queueManager.pauseQueue("email-queue");

// Resume when ready
await queueManager.resumeQueue("email-queue");

// Clean up old completed jobs (older than 1 hour)
await queueManager.cleanQueue("email-queue", 3600000, 1000, "completed");

// Get worker status
const statuses = queueManager.getWorkersStatus();
statuses.forEach((s) => {
  console.log(`${s.queueName}: ${s.running ? "running" : "stopped"}`);
});
```

---

## Container Setup Comparison

### API Service (Producer)

```typescript
// api/src/inversify.config.ts
import { Container } from "inversify";
import {
  Queue,
  INVERSITY_TYPES,
} from "@theunionsquare/mangojs-core";

const container = new Container();

// Only needs QueueClient
container.bind<Queue.IQueueClient>(INVERSITY_TYPES.QueueClient).toConstantValue(
  new Queue.QueueClient({
    host: process.env.REDIS_HOST || "localhost",
    port: parseInt(process.env.REDIS_PORT || "6379"),
  }),
);

export { container };
```

### Worker Service (Consumer)

```typescript
// worker/src/inversify.config.ts
import { Container } from "inversify";
import { INVERSITY_TYPES } from "@theunionsquare/mangojs-core";

const container = new Container();

// Bind services that workers need
container.bind(INVERSITY_TYPES.EmailService).to(EmailService);
container.bind(INVERSITY_TYPES.ReportService).to(ReportService);

// Note: QueueClient can also be bound here if workers need to chain jobs

export { container };
```

---

## Error Handling

### Producer Errors

```typescript
try {
  const jobId = await queueClient.addJob("email-queue", "send", emailData);
} catch (error) {
  if (error.message.includes("ECONNREFUSED")) {
    // Redis connection failed
    logger.error("Redis unavailable, job not queued");
    // Fallback: store in database for later retry
  } else {
    throw error;
  }
}
```

### Consumer Errors

Errors in workers are handled by BullMQ's retry mechanism:

```typescript
@QueueWorker("email-queue", { concurrency: 5 })
@injectable()
export class EmailWorker implements Queue.IQueueWorkerHandler<EmailData> {
  async process(job: Job<EmailData>): Promise<void> {
    try {
      await this.emailService.send(job.data);
    } catch (error) {
      // Log but re-throw to trigger retry
      this.logger.error(`Email failed: ${error.message}`, { jobId: job.id });
      throw error;
    }
  }

  onFailed(job: Job<EmailData>, error: Error): void {
    // Called after ALL retries exhausted
    this.alertService.notify(`Email job ${job.id} permanently failed`);
  }
}
```

## Related

- [Architecture](./architecture.context.md) - System architecture overview
- [Decorators](./decorators.context.md) - `@QueueWorker` decorator details
- [Types Reference](./types.context.md) - Full type definitions
- [Examples](./examples.context.md) - Complete implementation examples
