---
sidebar_label: "Worker handler"
---

# Worker Handler Interface

## IQueueWorkerHandler

All queue workers **must implement** this interface. It defines the contract for processing jobs and handling lifecycle events.

### Interface Definition

```typescript
interface IQueueWorkerHandler<T = any> {
  // Required: Main job processing logic
  process(job: Job<T>): Promise<any>;

  // Optional: Called after successful processing
  onCompleted?(job: Job<T>, result: any): void;

  // Optional: Called when processing fails
  onFailed?(job: Job<T>, error: Error): void;

  // Optional: Called when job progress is updated
  onProgress?(job: Job<T>, progress: number | object): void;
}
```

### Type Parameter

The `T` type parameter defines the shape of `job.data`. This provides full type safety when accessing job data:

```typescript
interface EmailJobData {
  to: string;
  subject: string;
  body: string;
  attachments?: string[];
}

@QueueWorker("email-queue")
@injectable()
export class EmailWorker implements IQueueWorkerHandler<EmailJobData> {
  async process(job: Job<EmailJobData>): Promise<void> {
    // job.data is typed as EmailJobData
    const { to, subject, body } = job.data;
  }
}
```

---

## Lifecycle Hooks

### process(job) - Required

The main processing method. Called once for each job.

```typescript
async process(job: Job<T>): Promise<any> {
  // Access job data
  const data = job.data;

  // Access job metadata
  const jobId = job.id;
  const jobName = job.name;
  const attempts = job.attemptsMade;

  // Update progress (0-100)
  await job.updateProgress(50);

  // Return value is stored in job.returnvalue
  return { processed: true, timestamp: Date.now() };
}
```

**Error Handling:**

- Throwing an error marks the job as failed
- If `attempts` > 1 in job options, the job will be retried
- Use `job.attemptsMade` to check retry count

```typescript
async process(job: Job<T>): Promise<void> {
  try {
    await this.riskyOperation(job.data);
  } catch (error) {
    if (job.attemptsMade >= 3) {
      // Final attempt, log to dead letter queue or alert
      await this.handleFinalFailure(job, error);
    }
    throw error; // Re-throw to mark as failed and trigger retry
  }
}
```

### onCompleted(job, result) - Optional

Called after `process()` completes successfully.

```typescript
onCompleted(job: Job<EmailJobData>, result: any): void {
  console.log(`Job ${job.id} completed with result:`, result);

  // Common uses:
  // - Send success notifications
  // - Update external systems
  // - Record metrics
  // - Clean up temporary resources
}
```

**Note:** This is a synchronous callback. For async operations, use fire-and-forget patterns or queue another job.

### onFailed(job, error) - Optional

Called when `process()` throws an error (after all retries are exhausted).

```typescript
onFailed(job: Job<EmailJobData>, error: Error): void {
  console.error(`Job ${job.id} failed: ${error.message}`);

  // Common uses:
  // - Send failure alerts
  // - Log to error tracking service
  // - Move to dead letter queue
  // - Update external systems
}
```

**Important:** This is called only after all retry attempts fail. For per-attempt failures, check `job.attemptsMade` in `process()`.

### onProgress(job, progress) - Optional

Called when `job.updateProgress()` is invoked during processing.

```typescript
onProgress(job: Job<FileProcessingData>, progress: number | object): void {
  console.log(`Job ${job.id} progress: ${progress}%`);

  // Common uses:
  // - Update UI via WebSocket
  // - Log progress for long-running jobs
  // - Emit metrics
}
```

---

## Lifecycle Summary

| Method                      | When Called                               | Required | Use Case                        |
| --------------------------- | ----------------------------------------- | -------- | ------------------------------- |
| `process(job)`              | On each job execution                     | Yes      | Main job logic                  |
| `onCompleted(job, result)`  | After successful processing               | No       | Cleanup, notifications, metrics |
| `onFailed(job, error)`      | When processing fails (after all retries) | No       | Error handling, alerts          |
| `onProgress(job, progress)` | When progress is updated                  | No       | Progress tracking, UI updates   |

---

## Complete Worker Example

```typescript
import {
  QueueWorker,
  IQueueWorkerHandler,
  INVERSITY_TYPES,
} from "@theunionsquare/mangojs-core";
import { injectable, inject } from "inversify";
import { Job } from "bullmq";

interface ReportJobData {
  reportId: string;
  userId: string;
  format: "pdf" | "csv" | "xlsx";
  filters: Record<string, any>;
}

@QueueWorker("report-generation", { concurrency: 2 })
@injectable()
export class ReportWorker implements IQueueWorkerHandler<ReportJobData> {
  @inject(INVERSITY_TYPES.LoggerFactory)
  private loggerFactory: ILoggerFactory;

  @inject(INVERSITY_TYPES.ReportService)
  private reportService: IReportService;

  async process(job: Job<ReportJobData>): Promise<{ fileUrl: string }> {
    const logger = this.loggerFactory.createLogger("ReportWorker");
    const { reportId, userId, format, filters } = job.data;

    logger.info(`Starting report generation: ${reportId}`);

    // Step 1: Fetch data (25%)
    await job.updateProgress(10);
    const data = await this.reportService.fetchData(filters);
    await job.updateProgress(25);

    // Step 2: Generate report (75%)
    const report = await this.reportService.generate(data, format);
    await job.updateProgress(75);

    // Step 3: Upload to storage (100%)
    const fileUrl = await this.reportService.upload(report, reportId);
    await job.updateProgress(100);

    logger.info(`Report completed: ${reportId}`);
    return { fileUrl };
  }

  onCompleted(job: Job<ReportJobData>, result: { fileUrl: string }): void {
    // Notify user that report is ready
    this.notifyUser(job.data.userId, result.fileUrl);
  }

  onFailed(job: Job<ReportJobData>, error: Error): void {
    // Alert on failure
    this.alertOps(`Report ${job.data.reportId} failed: ${error.message}`);
  }

  onProgress(job: Job<ReportJobData>, progress: number | object): void {
    // Could emit via WebSocket to update UI
    console.log(`Report ${job.data.reportId}: ${progress}%`);
  }

  private notifyUser(userId: string, fileUrl: string): void {
    // Implementation
  }

  private alertOps(message: string): void {
    // Implementation
  }
}
```

## Related

- [Decorators](./decorators.context.md) - `@QueueWorker` decorator
- [Types Reference](./types.context.md) - Full type definitions
- [Examples](./examples.context.md) - More usage patterns
