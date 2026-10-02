---
sidebar_label: "Scheduled Task"
---

# Scheduled Task Base Class

## ScheduledTask

All scheduled tasks **must extend** the `ScheduledTask` abstract class. It defines the contract for task execution and provides lifecycle hooks.

### Class Definition

```typescript
abstract class ScheduledTask implements IScheduledTask {
  // Required: Main execution method
  abstract run(): Promise<void> | void;

  // Optional: Called before run()
  onStart(): void;

  // Optional: Called after successful run()
  onComplete(): void;

  // Optional: Called when run() throws an error
  onError(error: Error): void;
}
```

### Interface

```typescript
interface IScheduledTask {
  run(): Promise<void> | void;
  onStart?(): void;
  onComplete?(): void;
  onError?(error: Error): void;
}
```

---

## Lifecycle Hooks

### run() - Required

The main execution method. Called on each scheduled trigger.

```typescript
@Schedule('0 * * * *')
@injectable()
export class MyTask extends ScheduledTask {
  async run(): Promise<void> {
    // Your task logic here
    await this.performWork();
  }
}
```

**Notes:**
- Can be `async` (returning `Promise<void>`) or synchronous (returning `void`)
- Throwing an error triggers the `onError` hook
- The task continues to run on schedule even after errors

### onStart() - Optional

Called immediately before `run()` executes.

```typescript
@Schedule('0 * * * *')
@injectable()
export class MyTask extends ScheduledTask {
  private startTime: Date;

  onStart(): void {
    this.startTime = new Date();
    console.log(`Task starting at ${this.startTime}`);
  }

  async run(): Promise<void> {
    // Task logic
  }
}
```

**Use for:**
- Logging task start
- Initializing timing metrics
- Pre-execution setup

### onComplete() - Optional

Called after `run()` completes successfully (no errors thrown).

```typescript
@Schedule('0 * * * *')
@injectable()
export class MyTask extends ScheduledTask {
  private startTime: Date;

  onStart(): void {
    this.startTime = new Date();
  }

  async run(): Promise<void> {
    await this.performWork();
  }

  onComplete(): void {
    const duration = Date.now() - this.startTime.getTime();
    console.log(`Task completed in ${duration}ms`);
    // Record metrics, send notifications, etc.
  }
}
```

**Use for:**
- Logging completion
- Recording execution metrics
- Cleanup after successful execution
- Sending success notifications

### onError(error) - Optional

Called when `run()` throws an error.

```typescript
@Schedule('0 * * * *')
@injectable()
export class MyTask extends ScheduledTask {
  @inject(INVERSITY_TYPES.AlertService)
  private alertService: IAlertService;

  async run(): Promise<void> {
    await this.riskyOperation();
  }

  onError(error: Error): void {
    console.error(`Task failed: ${error.message}`);

    // Send alert
    this.alertService.sendAlert({
      level: 'error',
      message: `Scheduled task failed: ${error.message}`,
      stack: error.stack,
    });
  }
}
```

**Use for:**
- Error logging
- Sending alerts/notifications
- Recording failure metrics
- Cleanup after failed execution

**Note:** The error is not re-thrown after `onError`. The task status is marked as `'error'` but will still run on the next scheduled trigger.

---

## Lifecycle Flow

```
┌─────────────────────────────────────┐
│         Cron Trigger                │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│         onStart()                   │
│    (if implemented)                 │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│           run()                     │
└──────────────┬──────────────────────┘
               │
       ┌───────┴───────┐
       │               │
   success          error
       │               │
       ▼               ▼
┌─────────────┐  ┌─────────────┐
│ onComplete()│  │  onError()  │
└─────────────┘  └─────────────┘
```

---

## Complete Example

```typescript
import {
  Schedule,
  Scheduler,
  INVERSITY_TYPES,
  Loggers,
} from "@theunionsquare/mangojs-core";
import { injectable, inject } from "inversify";

interface CleanupMetrics {
  recordsDeleted: number;
  durationMs: number;
}

@Schedule('0 2 * * *', { timezone: 'UTC', name: 'nightly-cleanup' })
@injectable()
export class NightlyCleanupTask extends Scheduler.ScheduledTask {
  @inject(INVERSITY_TYPES.LoggerFactory)
  private loggerFactory: Loggers.ILoggerFactory;

  @inject(INVERSITY_TYPES.Database)
  private database: IDatabase;

  @inject(INVERSITY_TYPES.MetricsService)
  private metricsService: IMetricsService;

  private logger: Loggers.ILogger;
  private startTime: Date;
  private metrics: CleanupMetrics;

  onStart(): void {
    this.logger = this.loggerFactory.createLogger('NightlyCleanup');
    this.startTime = new Date();
    this.logger.info('Starting nightly cleanup');
  }

  async run(): Promise<void> {
    // Delete expired sessions
    const sessionsDeleted = await this.database.deleteExpiredSessions();

    // Delete old audit logs
    const logsDeleted = await this.database.deleteOldAuditLogs(30); // 30 days

    // Delete orphaned files
    const filesDeleted = await this.database.deleteOrphanedFiles();

    this.metrics = {
      recordsDeleted: sessionsDeleted + logsDeleted + filesDeleted,
      durationMs: Date.now() - this.startTime.getTime(),
    };
  }

  onComplete(): void {
    this.logger.info('Nightly cleanup completed', this.metrics);

    // Record metrics
    this.metricsService.recordGauge('cleanup.records_deleted', this.metrics.recordsDeleted);
    this.metricsService.recordTimer('cleanup.duration_ms', this.metrics.durationMs);
  }

  onError(error: Error): void {
    this.logger.error('Nightly cleanup failed', { error: error.message });

    // Record failure metric
    this.metricsService.recordCounter('cleanup.failures', 1);
  }
}
```

---

## Synchronous vs Asynchronous

Both patterns are supported:

```typescript
// Async (most common)
@Schedule('* * * * *')
@injectable()
export class AsyncTask extends ScheduledTask {
  async run(): Promise<void> {
    await someAsyncOperation();
  }
}

// Sync (for simple operations)
@Schedule('* * * * *')
@injectable()
export class SyncTask extends ScheduledTask {
  run(): void {
    // Synchronous logic
    console.log('Running sync task');
  }
}
```

---

## Error Handling

Errors in `run()` are caught and passed to `onError()`:

```typescript
@Schedule('*/5 * * * *')
@injectable()
export class RetryAwareTask extends ScheduledTask {
  private consecutiveFailures = 0;

  async run(): Promise<void> {
    try {
      await this.performWork();
      this.consecutiveFailures = 0; // Reset on success
    } catch (error) {
      throw error; // Let onError handle it
    }
  }

  onError(error: Error): void {
    this.consecutiveFailures++;

    if (this.consecutiveFailures >= 3) {
      // Alert after 3 consecutive failures
      this.sendAlert(`Task failing repeatedly: ${error.message}`);
    }
  }
}
```

## Related

- [Decorators](./decorators.context.md) - `@Schedule` decorator
- [Schedule Registry](./schedule-registry.context.md) - Managing tasks
- [Types Reference](./types.context.md) - Full type definitions
- [Examples](./examples.context.md) - More usage patterns
