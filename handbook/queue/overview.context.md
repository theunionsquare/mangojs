# MangoJS Queue System

## Purpose

The Queue System enables distributed asynchronous job processing using BullMQ and Redis. It separates job production (API services) from job consumption (worker services), enabling scalable background processing for tasks like email sending, report generation, and long-running operations.

## Key Concepts

- **Producer-Consumer Pattern**: API services enqueue jobs via `QueueClient`, worker services process them via `QueueManager`
- **BullMQ Abstraction**: Framework wraps BullMQ - direct BullMQ usage not allowed (easy to swap in future)
- **Redis as Broker**: Jobs are stored and coordinated through Redis
- **Service Separation**: `QueueClient` for producers (API), `QueueManager` + `WorkerBuilder` for consumers (Workers)
- **`@QueueWorker` Decorator**: Class-level decorator for defining queue workers with concurrency options

---

## Architecture

```
┌─────────────────────────────────────┐
│           API SERVICE               │
│         (ServerBuilder)             │
│                                     │
│  Uses:                              │
│    QueueClient.addJob()             │
│    QueueClient.addBulk()            │
│    QueueClient.getJobStatus()       │
│                                     │
└──────────────┬──────────────────────┘
               │
               │  publish jobs
               ▼
┌─────────────────────────────────────┐
│             REDIS                   │
│                                     │
│   Queues:                           │
│     • email-queue                   │
│     • report-queue                  │
│     • notification-queue            │
│                                     │
└──────────────┬──────────────────────┘
               │
               │  consume jobs
               ▼
┌─────────────────────────────────────┐
│          WORKER SERVICE             │
│         (WorkerBuilder)             │
│                                     │
│  Uses:                              │
│    @QueueWorker decorator           │
│    process(job): Promise<void>      │
│    onCompleted, onFailed hooks      │
│                                     │
└─────────────────────────────────────┘
```

---

## Required Dependencies

Install BullMQ:

```bash
npm install bullmq
```

Ensure Redis is running:

```bash
# macOS
brew install redis && redis-server

# Docker
docker run -d -p 6379:6379 redis
```

---

## QueueClient (Producer - API Service)

The `QueueClient` is used by API services to add jobs to queues. It only produces jobs, never consumes.

### Interface

```typescript
interface IQueueClient {
  addJob<T>(queueName: string, jobName: string, data: T, options?: JobOptions): Promise<string>
  addBulk<T>(queueName: string, jobs: JobData<T>[]): Promise<string[]>
  getJobStatus(queueName: string, jobId: string): Promise<JobStatus | null>
  getQueueStatus(queueName: string): Promise<QueueStatus>
  close(): Promise<void>
}
```

### Job Options

| Option             | Type                                     | Description                        |
| ------------------ | ---------------------------------------- | ---------------------------------- |
| `delay`            | `number`                                 | Delay before processing (ms)       |
| `attempts`         | `number`                                 | Number of retry attempts           |
| `backoff`          | `{ type: 'fixed' \| 'exponential', delay: number }` | Retry backoff strategy |
| `priority`         | `number`                                 | Job priority (lower = higher)      |
| `removeOnComplete` | `boolean \| number`                      | Remove after completion            |
| `removeOnFail`     | `boolean \| number`                      | Remove after failure               |
| `jobId`            | `string`                                 | Unique job ID (prevents duplicates)|

### Usage in Controller

```typescript
import { Controller, Post, injectable, inject } from "@giusmento/mangojs-core";
import { INVERSITY_TYPES, IQueueClient } from "@giusmento/mangojs-core";

@Controller("/api/v1/tasks")
@injectable()
export class TaskController {
  @inject(INVERSITY_TYPES.QueueClient)
  private queueClient: IQueueClient;

  @Post("/")
  async createTask(req: Request, res: Response): Promise<Response> {
    // Add single job
    const jobId = await this.queueClient.addJob(
      "task-queue",
      "process-data",
      { userId: req.body.userId, action: req.body.action },
      {
        attempts: 3,
        backoff: { type: "exponential", delay: 1000 },
      }
    );

    return res.status(202).json({ jobId, status: "queued" });
  }

  @Post("/batch")
  async createBatch(req: Request, res: Response): Promise<Response> {
    // Add multiple jobs
    const jobs = req.body.tasks.map((task) => ({
      name: "process-data",
      data: { taskId: task.id },
      options: { priority: task.priority },
    }));

    const jobIds = await this.queueClient.addBulk("task-queue", jobs);
    return res.status(202).json({ jobIds, count: jobIds.length });
  }
}
```

### Container Setup (API Service)

```typescript
import { QueueClient, INVERSITY_TYPES } from "@giusmento/mangojs-core";
import { Container } from "inversify";

const container = new Container();

// Bind QueueClient
container
  .bind<IQueueClient>(INVERSITY_TYPES.QueueClient)
  .toConstantValue(
    new QueueClient({
      host: process.env.REDIS_HOST || "localhost",
      port: parseInt(process.env.REDIS_PORT || "6379"),
      password: process.env.REDIS_PASSWORD,
    })
  );
```

---

## @QueueWorker Decorator

The `@QueueWorker` decorator marks a class as a queue worker handler.

### Signature

```typescript
@QueueWorker(queueName: string, options?: WorkerOptions)
```

### Parameters

| Parameter   | Type            | Description                              |
| ----------- | --------------- | ---------------------------------------- |
| `queueName` | `string`        | Name of the queue to consume from        |
| `options`   | `WorkerOptions` | Optional configuration object            |

### Worker Options

| Option           | Type     | Default | Description                           |
| ---------------- | -------- | ------- | ------------------------------------- |
| `concurrency`    | `number` | `1`     | Number of jobs to process concurrently|
| `lockDuration`   | `number` | `30000` | Lock timeout in milliseconds          |
| `maxStalledCount`| `number` | `1`     | Max times job can stall before failing|

---

## IQueueWorkerHandler Interface

All workers must implement this interface.

```typescript
interface IQueueWorkerHandler<T = any> {
  process(job: Job<T>): Promise<any>
  onCompleted?(job: Job<T>, result: any): void
  onFailed?(job: Job<T>, error: Error): void
  onProgress?(job: Job<T>, progress: number | object): void
}
```

### Lifecycle Hooks

| Method                    | When Called                 | Use Case                        |
| ------------------------- | --------------------------- | ------------------------------- |
| `process(job)`            | On each job execution       | Main job logic (required)       |
| `onCompleted(job, result)`| After successful processing | Cleanup, notifications, metrics |
| `onFailed(job, error)`    | When processing fails       | Error handling, alerts          |
| `onProgress(job, progress)`| When progress is updated   | Progress tracking               |

---

## Worker Example

```typescript
import { QueueWorker, IQueueWorkerHandler, INVERSITY_TYPES } from "@giusmento/mangojs-core";
import { injectable, inject } from "inversify";
import { Job } from "bullmq";

interface EmailJobData {
  to: string;
  subject: string;
  body: string;
}

@QueueWorker("email-queue", { concurrency: 5 })
@injectable()
export class EmailWorker implements IQueueWorkerHandler<EmailJobData> {
  @inject(INVERSITY_TYPES.LoggerFactory)
  private loggerFactory: ILoggerFactory;

  async process(job: Job<EmailJobData>): Promise<void> {
    const logger = this.loggerFactory.createLogger("EmailWorker");
    const { to, subject, body } = job.data;

    logger.info(`Processing email job ${job.id} to ${to}`);

    // Update progress
    await job.updateProgress(50);

    // Send email (your implementation)
    await this.sendEmail(to, subject, body);

    await job.updateProgress(100);
    logger.info(`Email sent successfully to ${to}`);
  }

  onCompleted(job: Job<EmailJobData>, result: any): void {
    console.log(`Job ${job.id} completed`);
  }

  onFailed(job: Job<EmailJobData>, error: Error): void {
    console.error(`Job ${job.id} failed: ${error.message}`);
  }

  private async sendEmail(to: string, subject: string, body: string): Promise<void> {
    // Email sending implementation
  }
}
```

---

## WorkerBuilder

The `WorkerBuilder` creates and runs worker services, similar to `ServerBuilder` for API services.

### Methods

| Method                          | Description                              |
| ------------------------------- | ---------------------------------------- |
| `setName(name: string)`         | Set worker service name                  |
| `setRedisConfig(config)`        | Set Redis connection configuration       |
| `setWorkers(workers[])`         | Set worker classes to register           |
| `setContainer(container)`       | Set Inversify container for DI           |
| `setCheck(check)`               | Set pre-check handler                    |
| `build()`                       | Build the worker service                 |
| `run()`                         | Start the worker service                 |
| `shutdown()`                    | Gracefully shutdown workers              |
| `getQueueManager()`             | Get QueueManager instance                |

### Worker Service Setup

```typescript
// worker/src/index.ts
import { WorkerBuilder } from "@giusmento/mangojs-core";
import { EmailWorker } from "./workers/email.worker";
import { ReportWorker } from "./workers/report.worker";
import { container } from "./inversify.config";

async function main() {
  const worker = await new WorkerBuilder()
    .setName("background-worker")
    .setRedisConfig({
      host: process.env.REDIS_HOST || "localhost",
      port: parseInt(process.env.REDIS_PORT || "6379"),
      password: process.env.REDIS_PASSWORD,
    })
    .setWorkers([EmailWorker, ReportWorker])
    .setContainer(container)
    .build();

  worker.run();
}

main().catch(console.error);
```

---

## QueueManager API

The `QueueManager` is used internally by `WorkerBuilder` but can be accessed for runtime management.

### Methods

| Method                       | Return Type                        | Description                        |
| ---------------------------- | ---------------------------------- | ---------------------------------- |
| `register(workerClass)`      | `void`                             | Register a worker class            |
| `startAll()`                 | `void`                             | Start all registered workers       |
| `stopAll()`                  | `Promise<void>`                    | Stop all registered workers        |
| `start(queueName)`           | `void`                             | Start a specific worker            |
| `stop(queueName)`            | `Promise<void>`                    | Stop a specific worker             |
| `getQueueStatus(queueName)`  | `Promise<QueueStatus>`             | Get queue statistics               |
| `getWorkersStatus()`         | `WorkerStatusInfo[]`               | Get all workers status             |
| `pauseQueue(queueName)`      | `Promise<void>`                    | Pause a queue                      |
| `resumeQueue(queueName)`     | `Promise<void>`                    | Resume a paused queue              |
| `cleanQueue(queueName, ...)`  | `Promise<void>`                    | Clean completed/failed jobs        |
| `close()`                    | `Promise<void>`                    | Close all connections              |

---

## Directory Structure

```
project/
├── api/                          # API Service (Producer)
│   └── src/
│       ├── controllers/
│       │   └── task.controller.ts
│       ├── inversify.config.ts   # Binds QueueClient
│       └── index.ts
│
└── worker/                       # Worker Service (Consumer)
    └── src/
        ├── workers/
        │   ├── email.worker.ts
        │   ├── report.worker.ts
        │   └── index.ts
        ├── inversify.config.ts
        └── index.ts
```

### Workers Index

```typescript
// worker/src/workers/index.ts
import { EmailWorker } from "./email.worker";
import { ReportWorker } from "./report.worker";

export const workers = [EmailWorker, ReportWorker];
```

---

## Common Patterns

### Pattern 1: Job with Retry and Backoff

```typescript
await this.queueClient.addJob(
  "critical-queue",
  "important-task",
  { data: "value" },
  {
    attempts: 5,
    backoff: {
      type: "exponential",
      delay: 2000, // 2s, 4s, 8s, 16s, 32s
    },
  }
);
```

### Pattern 2: Delayed Job

```typescript
// Process in 5 minutes
await this.queueClient.addJob(
  "notification-queue",
  "send-reminder",
  { userId: "123" },
  { delay: 5 * 60 * 1000 }
);
```

### Pattern 3: Job Chaining

```typescript
@QueueWorker("import-queue", { concurrency: 2 })
@injectable()
export class ImportWorker implements IQueueWorkerHandler<ImportData> {
  @inject(INVERSITY_TYPES.QueueClient)
  private queueClient: IQueueClient;

  async process(job: Job<ImportData>): Promise<void> {
    const result = await this.importData(job.data);

    // Chain to validation queue
    await this.queueClient.addJob("validation-queue", "validate", {
      importId: result.id,
      recordCount: result.count,
    });
  }
}
```

### Pattern 4: Progress Tracking

```typescript
@QueueWorker("file-processing", { concurrency: 1 })
export class FileWorker implements IQueueWorkerHandler<FileData> {
  async process(job: Job<FileData>): Promise<void> {
    const chunks = await this.getChunks(job.data.fileUrl);

    for (let i = 0; i < chunks.length; i++) {
      await this.processChunk(chunks[i]);
      await job.updateProgress(Math.round(((i + 1) / chunks.length) * 100));
    }
  }
}
```

---

## Types Reference

### RedisConfig

```typescript
interface RedisConfig {
  host: string;
  port: number;
  password?: string;
  db?: number;
}
```

### JobStatus

```typescript
interface JobStatus {
  id: string;
  name: string;
  status: "waiting" | "active" | "completed" | "failed" | "delayed";
  progress: number;
  data: any;
  returnValue?: any;
  failedReason?: string;
  attemptsMade: number;
  timestamp: number;
}
```

### QueueStatus

```typescript
interface QueueStatus {
  name: string;
  waiting: number;
  active: number;
  completed: number;
  failed: number;
  delayed: number;
  paused: boolean;
}
```

---

## Gotchas

- **Separate Services**: API and Worker MUST be separate deployments for proper scaling
- **Queue Names Must Match**: Producer and consumer must use identical queue names
- **Job Data Must Be Serializable**: No functions, classes, or circular references in job data
- **Worker Registration**: Workers must have `@QueueWorker` decorator AND `@injectable()` for DI
- **Redis Connection**: Both services need same Redis instance/cluster
- **Graceful Shutdown**: Always handle SIGTERM/SIGINT to close connections properly
- **Concurrency Limits**: Match concurrency to resource availability (CPU, memory, external API limits)
- **Memory Management**: Use `removeOnComplete` and `removeOnFail` options to prevent Redis memory growth

---

## Related

- [Scheduler Overview](../scheduler/overview.context.md) - Cron-based scheduled tasks
- [Dependency Injection](../architecture/injection.context.md) - DI configuration
- [Architecture Overview](../architecture/overview.context.md) - Service architecture patterns
- [Error Handling](../common/error-handling.context.md) - Error patterns
