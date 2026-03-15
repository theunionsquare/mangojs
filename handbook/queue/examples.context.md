# Queue Examples

This document provides complete, copy-paste-ready examples for common queue patterns.

---

## Project Structure

A typical project using the queue system has separate API and Worker services:

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
        │   └── index.ts          # Export all workers
        ├── inversify.config.ts
        └── index.ts
```

### Workers Index

```typescript
// worker/src/workers/index.ts
import { EmailWorker } from "./email.worker";
import { ReportWorker } from "./report.worker";
import { NotificationWorker } from "./notification.worker";

export const workers = [EmailWorker, ReportWorker, NotificationWorker];

// Re-export for convenience
export { EmailWorker, ReportWorker, NotificationWorker };
```

---

## Complete Email Worker Example

### API Controller (Producer)

```typescript
// api/src/controllers/email.controller.ts
import {
  Controller,
  Post,
  injectable,
  inject,
} from "@theunionsquare/mangojs-core";
import { INVERSITY_TYPES, IQueueClient } from "@theunionsquare/mangojs-core";
import { Request, Response } from "express";

interface SendEmailRequest {
  to: string;
  subject: string;
  body: string;
  templateId?: string;
}

@Controller("/api/v1/emails")
@injectable()
export class EmailController {
  @inject(INVERSITY_TYPES.QueueClient)
  private queueClient: IQueueClient;

  @Post("/send")
  async sendEmail(req: Request, res: Response): Promise<Response> {
    const { to, subject, body, templateId } = req.body as SendEmailRequest;

    const jobId = await this.queueClient.addJob(
      "email-queue",
      "send-email",
      { to, subject, body, templateId },
      {
        attempts: 3,
        backoff: { type: "exponential", delay: 1000 },
        removeOnComplete: 100,
      },
    );

    return res.status(202).json({
      success: true,
      message: "Email queued for delivery",
      jobId,
    });
  }

  @Post("/bulk")
  async sendBulkEmails(req: Request, res: Response): Promise<Response> {
    const { recipients, subject, body } = req.body;

    const jobs = recipients.map((email: string) => ({
      name: "send-email",
      data: { to: email, subject, body },
      options: { attempts: 3 },
    }));

    const jobIds = await this.queueClient.addBulk("email-queue", jobs);

    return res.status(202).json({
      success: true,
      message: `${jobIds.length} emails queued`,
      jobIds,
    });
  }
}
```

### Email Worker (Consumer)

```typescript
// worker/src/workers/email.worker.ts
import {
  QueueWorker,
  IQueueWorkerHandler,
  INVERSITY_TYPES,
} from "@theunionsquare/mangojs-core";
import { injectable, inject } from "inversify";
import { Job } from "bullmq";
import { ILoggerFactory, ILogger } from "@theunionsquare/mangojs-core";

interface EmailJobData {
  to: string;
  subject: string;
  body: string;
  templateId?: string;
}

@QueueWorker("email-queue", { concurrency: 5 })
@injectable()
export class EmailWorker implements IQueueWorkerHandler<EmailJobData> {
  private logger: ILogger;

  @inject(INVERSITY_TYPES.EmailService)
  private emailService: IEmailService;

  constructor(
    @inject(INVERSITY_TYPES.LoggerFactory) loggerFactory: ILoggerFactory,
  ) {
    this.logger = loggerFactory.createLogger("EmailWorker");
  }

  async process(job: Job<EmailJobData>): Promise<{ messageId: string }> {
    const { to, subject, body, templateId } = job.data;

    this.logger.info(`Processing email job ${job.id} to ${to}`);
    await job.updateProgress(10);

    // Render template if provided
    let htmlBody = body;
    if (templateId) {
      htmlBody = await this.emailService.renderTemplate(templateId, { body });
      await job.updateProgress(30);
    }

    // Send email
    const result = await this.emailService.send({
      to,
      subject,
      html: htmlBody,
    });
    await job.updateProgress(100);

    this.logger.info(`Email sent successfully to ${to}`);
    return { messageId: result.messageId };
  }

  onCompleted(job: Job<EmailJobData>, result: { messageId: string }): void {
    this.logger.info(`Email job ${job.id} completed: ${result.messageId}`);
  }

  onFailed(job: Job<EmailJobData>, error: Error): void {
    this.logger.error(`Email job ${job.id} failed: ${error.message}`);
    // Could send to dead letter queue or alert ops
  }
}
```

---

## Common Patterns

### Pattern 1: Job with Retry and Exponential Backoff

Use for unreliable external services.

```typescript
// Producer
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
  },
);
```

### Pattern 2: Delayed Job

Schedule jobs for future execution.

```typescript
// Send reminder in 24 hours
await this.queueClient.addJob(
  "notification-queue",
  "send-reminder",
  { userId: "123", message: "Don't forget to complete your profile" },
  { delay: 24 * 60 * 60 * 1000 }, // 24 hours in ms
);

// Send welcome email in 5 minutes
await this.queueClient.addJob(
  "email-queue",
  "send-welcome",
  { userId: "123" },
  { delay: 5 * 60 * 1000 }, // 5 minutes
);
```

### Pattern 3: Priority Queue

Process important jobs first.

```typescript
// Premium users get priority 1 (processed first)
await this.queueClient.addJob(
  "export-queue",
  "generate-report",
  { userId: premiumUserId, format: "pdf" },
  { priority: 1 },
);

// Free users get priority 10 (processed later)
await this.queueClient.addJob(
  "export-queue",
  "generate-report",
  { userId: freeUserId, format: "pdf" },
  { priority: 10 },
);
```

### Pattern 4: Job Chaining

One job triggers another.

```typescript
@QueueWorker("import-queue", { concurrency: 2 })
@injectable()
export class ImportWorker implements IQueueWorkerHandler<ImportData> {
  @inject(INVERSITY_TYPES.QueueClient)
  private queueClient: IQueueClient;

  async process(job: Job<ImportData>): Promise<void> {
    // Step 1: Import data
    const result = await this.importData(job.data);

    // Step 2: Chain to validation queue
    await this.queueClient.addJob("validation-queue", "validate-import", {
      importId: result.id,
      recordCount: result.count,
    });

    // Step 3: Chain to notification queue
    await this.queueClient.addJob("notification-queue", "import-complete", {
      userId: job.data.userId,
      importId: result.id,
    });
  }

  private async importData(data: ImportData): Promise<{ id: string; count: number }> {
    // Implementation
  }
}
```

### Pattern 5: Progress Tracking for Long Jobs

Report progress for UI updates.

```typescript
@QueueWorker("file-processing", {
  concurrency: 1,
  lockDuration: 300000, // 5 minutes
})
@injectable()
export class FileWorker implements IQueueWorkerHandler<FileData> {
  async process(job: Job<FileData>): Promise<void> {
    const chunks = await this.getFileChunks(job.data.fileUrl);

    for (let i = 0; i < chunks.length; i++) {
      await this.processChunk(chunks[i]);

      // Update progress after each chunk
      const progress = Math.round(((i + 1) / chunks.length) * 100);
      await job.updateProgress(progress);

      // Add log entry
      await job.log(`Processed chunk ${i + 1} of ${chunks.length}`);
    }
  }

  onProgress(job: Job<FileData>, progress: number | object): void {
    // Emit via WebSocket to update UI
    this.websocket.emit(`job:${job.id}:progress`, progress);
  }

  private async getFileChunks(fileUrl: string): Promise<Buffer[]> {
    // Implementation
  }

  private async processChunk(chunk: Buffer): Promise<void> {
    // Implementation
  }
}
```

### Pattern 6: Preventing Duplicate Jobs

Use custom jobId to prevent duplicates.

```typescript
// Only one password reset email per user in the queue
await this.queueClient.addJob(
  "email-queue",
  "password-reset",
  { userId: "123", email: "user@example.com" },
  {
    jobId: `password-reset:${userId}`, // Same ID = won't be added again
    delay: 0,
  },
);

// Idempotent scheduled tasks
await this.queueClient.addJob(
  "cleanup-queue",
  "daily-cleanup",
  { date: "2024-01-15" },
  {
    jobId: `daily-cleanup:2024-01-15`, // Won't duplicate
  },
);
```

### Pattern 7: Dead Letter Queue

Handle permanently failed jobs.

```typescript
@QueueWorker("main-queue", { concurrency: 5 })
@injectable()
export class MainWorker implements IQueueWorkerHandler<TaskData> {
  @inject(INVERSITY_TYPES.QueueClient)
  private queueClient: IQueueClient;

  async process(job: Job<TaskData>): Promise<void> {
    await this.doWork(job.data);
  }

  onFailed(job: Job<TaskData>, error: Error): void {
    // Move to dead letter queue for manual review
    this.queueClient.addJob("dead-letter-queue", "failed-task", {
      originalQueue: "main-queue",
      originalJobId: job.id,
      originalData: job.data,
      error: error.message,
      failedAt: new Date().toISOString(),
    });
  }

  private async doWork(data: TaskData): Promise<void> {
    // Implementation
  }
}
```

### Pattern 8: Batch Processing

Process items in batches efficiently.

```typescript
@QueueWorker("batch-queue", { concurrency: 1 })
@injectable()
export class BatchWorker implements IQueueWorkerHandler<BatchData> {
  async process(job: Job<BatchData>): Promise<{ processed: number }> {
    const { items } = job.data;
    const batchSize = 100;
    let processed = 0;

    for (let i = 0; i < items.length; i += batchSize) {
      const batch = items.slice(i, i + batchSize);

      await this.processBatch(batch);

      processed += batch.length;
      await job.updateProgress(Math.round((processed / items.length) * 100));
    }

    return { processed };
  }

  private async processBatch(items: any[]): Promise<void> {
    // Process batch with Promise.all for parallel execution
    await Promise.all(items.map((item) => this.processItem(item)));
  }

  private async processItem(item: any): Promise<void> {
    // Implementation
  }
}
```

---

## Worker Service Entry Point

Complete worker service setup:

```typescript
// worker/src/index.ts
import { WorkerBuilder } from "@theunionsquare/mangojs-core";
import { workers } from "./workers";
import { container } from "./inversify.config";

async function main() {
  console.log("Starting worker service...");

  const worker = await new WorkerBuilder()
    .setName("background-worker")
    .setRedisConfig({
      host: process.env.REDIS_HOST || "localhost",
      port: parseInt(process.env.REDIS_PORT || "6379"),
      password: process.env.REDIS_PASSWORD,
    })
    .setWorkers(workers)
    .setContainer(container)
    .setCheck(async () => {
      // Pre-flight checks
      console.log("Running pre-flight checks...");
      // Add any necessary health checks here
    })
    .build();

  worker.run();
  console.log("Worker service started");

  // Graceful shutdown
  const shutdown = async (signal: string) => {
    console.log(`Received ${signal}, shutting down...`);
    await worker.shutdown();
    console.log("Worker service stopped");
    process.exit(0);
  };

  process.on("SIGTERM", () => shutdown("SIGTERM"));
  process.on("SIGINT", () => shutdown("SIGINT"));
}

main().catch((error) => {
  console.error("Failed to start worker service:", error);
  process.exit(1);
});
```

---

## Monitoring Job Status

API endpoint to check job status:

```typescript
@Controller("/api/v1/jobs")
@injectable()
export class JobController {
  @inject(INVERSITY_TYPES.QueueClient)
  private queueClient: IQueueClient;

  @Get("/:queueName/:jobId")
  async getJobStatus(req: Request, res: Response): Promise<Response> {
    const { queueName, jobId } = req.params;

    const status = await this.queueClient.getJobStatus(queueName, jobId);

    if (!status) {
      return res.status(404).json({ error: "Job not found" });
    }

    return res.json({
      id: status.id,
      status: status.status,
      progress: status.progress,
      attemptsMade: status.attemptsMade,
      result: status.returnValue,
      error: status.failedReason,
    });
  }

  @Get("/:queueName/stats")
  async getQueueStats(req: Request, res: Response): Promise<Response> {
    const { queueName } = req.params;

    const status = await this.queueClient.getQueueStatus(queueName);

    return res.json({
      queue: status.name,
      waiting: status.waiting,
      active: status.active,
      completed: status.completed,
      failed: status.failed,
      delayed: status.delayed,
      paused: status.paused,
    });
  }
}
```

## Related

- [Architecture](./architecture.context.md) - System architecture overview
- [Decorators](./decorators.context.md) - `@QueueWorker` decorator details
- [WorkerBuilder](./worker-builder.context.md) - Builder and client API
- [Types Reference](./types.context.md) - Complete type definitions
