---
sidebar_label: "Decorators"
---

# Queue Decorators

## @QueueWorker Decorator

The `@QueueWorker` decorator marks a class as a queue worker handler. It registers the class with the `QueueManager` and configures how jobs from a specific queue should be processed.

### Signature

```typescript
@QueueWorker(queueName: string, options?: WorkerOptions)
```

### Parameters

| Parameter   | Type            | Required | Description                                                                     |
| ----------- | --------------- | -------- | ------------------------------------------------------------------------------- |
| `queueName` | `string`        | Yes      | Name of the queue to consume from. Must match the queue name used by producers. |
| `options`   | `WorkerOptions` | No       | Configuration for worker behavior                                               |

### Worker Options

| Option            | Type     | Default | Description                                                                                       |
| ----------------- | -------- | ------- | ------------------------------------------------------------------------------------------------- |
| `concurrency`     | `number` | `1`     | Number of jobs to process concurrently. Higher values increase throughput but use more resources. |
| `lockDuration`    | `number` | `30000` | Lock timeout in milliseconds. If a job takes longer, another worker may pick it up.               |
| `maxStalledCount` | `number` | `1`     | Maximum times a job can stall before being marked as failed.                                      |

---

## Basic Usage

```typescript
import { QueueWorker, IQueueWorkerHandler } from "@theunionsquare/mangojs-core";
import { injectable } from "inversify";
import { Job } from "bullmq";

@QueueWorker("email-queue")
@injectable()
export class EmailWorker implements IQueueWorkerHandler<EmailData> {
  async process(job: Job<EmailData>): Promise<void> {
    await sendEmail(job.data);
  }
}
```

---

## With Options

```typescript
@QueueWorker("heavy-processing", {
  concurrency: 3, // Process 3 jobs at once
  lockDuration: 60000, // 60 second lock (for long jobs)
  maxStalledCount: 2, // Allow 2 stalls before failing
})
@injectable()
export class HeavyWorker implements IQueueWorkerHandler<HeavyData> {
  async process(job: Job<HeavyData>): Promise<void> {
    // Long-running processing
  }
}
```

---

## Decorator Order

The `@QueueWorker` decorator **must come before** `@injectable()`:

```typescript
// Correct
@QueueWorker("my-queue")
@injectable()
export class MyWorker {}

// Wrong - will not work
@injectable()
@QueueWorker("my-queue")
export class MyWorker {}
```

---

## Concurrency Guidelines

| Job Type              | Recommended Concurrency | Reason                         |
| --------------------- | ----------------------- | ------------------------------ |
| CPU-intensive         | 1-2                     | Avoid overloading CPU          |
| I/O-bound (API calls) | 5-10                    | Can wait for I/O in parallel   |
| Database writes       | 2-5                     | Balance throughput vs. DB load |
| Email sending         | 3-5                     | Respect rate limits            |
| File processing       | 1-2                     | Memory and disk I/O limits     |

Adjust based on:

- Available resources (CPU cores, memory)
- External service rate limits
- Database connection pool size
- Job execution time

---

## Lock Duration Guidelines

| Job Duration           | Recommended lockDuration            |
| ---------------------- | ----------------------------------- |
| < 5 seconds            | 30000 (default)                     |
| 5-30 seconds           | 60000                               |
| 30 seconds - 2 minutes | 180000                              |
| 2-5 minutes            | 300000                              |
| > 5 minutes            | Consider breaking into smaller jobs |

If `lockDuration` is exceeded while processing, BullMQ considers the job "stalled" and may assign it to another worker.

## Related

- [Worker Handler](./worker-handler.context.md) - `IQueueWorkerHandler` interface and lifecycle hooks
- [WorkerBuilder](./worker-builder.context.md) - Registering workers with WorkerBuilder
- [Types Reference](./types.context.md) - Full type definitions
- [Examples](./examples.context.md) - More usage patterns
