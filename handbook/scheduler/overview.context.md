# MangoJS Scheduler

## Purpose

The Scheduler feature enables time-based task execution in MangoJS services using cron expressions. It provides a decorator-based approach for defining scheduled tasks with lifecycle hooks and supports both main thread and worker thread execution modes.

## Key Concepts

- **`@Schedule` Decorator**: Class-level decorator for defining scheduled tasks with cron expressions
- **`ScheduledTask` Base Class**: Abstract class providing lifecycle hooks for task execution
- **`ScheduleRegistry`**: Central registry for managing all scheduled tasks at runtime
- **Worker Thread Support**: Option to run CPU-intensive tasks in isolated worker threads
- **`node-schedule` Library**: Underlying scheduling engine using standard cron expression syntax

## Issue

This is a simple Scheduler version. It runs on the application process and
it has task duplications if you scale the application. Need to migrato to a centralized task service.

---

## Required Dependencies

Install the `node-schedule` library and its type definitions:

```bash
npm install node-schedule
npm install -D @types/node-schedule
```

---

## @Schedule Decorator

The `@Schedule` decorator marks a class as a scheduled task and configures its execution timing.

### Signature

```typescript
@Schedule(cronExpression: string, options?: ScheduleOptions)
```

### Parameters

| Parameter        | Type              | Description                                                   |
| ---------------- | ----------------- | ------------------------------------------------------------- |
| `cronExpression` | `string`          | Standard cron expression (e.g., `'0 * * * *'` for every hour) |
| `options`        | `ScheduleOptions` | Optional configuration object                                 |

### Schedule Options

| Option       | Type                   | Default         | Description                                         |
| ------------ | ---------------------- | --------------- | --------------------------------------------------- |
| `timezone`   | `string`               | System timezone | IANA timezone (e.g., `'UTC'`, `'America/New_York'`) |
| `runOnStart` | `boolean`              | `false`         | Execute immediately when scheduler starts           |
| `execution`  | `'main'` \| `'worker'` | `'main'`        | Execution mode (main thread or worker thread)       |
| `name`       | `string`               | Class name      | Custom task name for registry lookups               |

### Example

```typescript
@Schedule('0 * * * *', {
  timezone: 'UTC',
  runOnStart: true,
  execution: 'main',
  name: 'CustomTaskName'
})
```

---

## ScheduledTask Base Class

All scheduled tasks must extend the `ScheduledTask` base class and implement the `run()` method.

### Lifecycle Hooks

| Method                        | When Called                  | Use Case                         |
| ----------------------------- | ---------------------------- | -------------------------------- |
| `run(): Promise<void>`        | On each scheduled execution  | Main task logic (required)       |
| `onStart(): void`             | Before `run()` executes      | Setup, logging, metrics          |
| `onComplete(): void`          | After successful `run()`     | Cleanup, notifications, metrics  |
| `onError(error: Error): void` | When `run()` throws an error | Error handling, alerts, recovery |

### Complete Example

```typescript
import {
  Schedule,
  ScheduledTask,
  INVERSITY_TYPES,
  ILoggerFactory,
} from "@theunionsquare/mangojs-core";
import { injectable, inject } from "inversify";

@Schedule("0 0 * * *") // Run daily at midnight
@injectable()
export class CleanupTask extends ScheduledTask {
  @inject(INVERSITY_TYPES.LoggerFactory)
  private loggerFactory: ILoggerFactory;

  private logger: ILogger;

  async run(): Promise<void> {
    this.logger = this.loggerFactory.createLogger("CleanupTask");
    this.logger.info("Starting cleanup...");

    // Task logic here
    await this.performCleanup();

    this.logger.info("Cleanup completed");
  }

  onStart(): void {
    console.log("CleanupTask starting...");
  }

  onComplete(): void {
    console.log("CleanupTask completed successfully");
  }

  onError(error: Error): void {
    console.error("CleanupTask failed:", error.message);
    // Send alert, log to monitoring, etc.
  }

  private async performCleanup(): Promise<void> {
    // Implementation
  }
}
```

---

## ServerBuilder Integration

Enable the scheduler by passing tasks to `ServerBuilder.setTasks()`.

### Setup

```typescript
import { ServerBuilder } from "@theunionsquare/mangojs-core";
import { tasks } from "./tasks";
import { routes } from "./routes";

new ServerBuilder()
  .setName("my-service")
  .setRoutes(routes)
  .setTasks(tasks) // Automatically enables scheduler
  .build();
```

### Important Notes

- Calling `setTasks()` automatically enables the scheduler
- Tasks are registered and started when the server builds
- The scheduler runs alongside the HTTP server

---

## Task Organization

Follow the controller pattern for organizing scheduled tasks.

### Directory Structure

```
src/
  tasks/
    cleanup.task.ts
    report.task.ts
    sync.task.ts
    index.ts
```

### Individual Task File

```typescript
// tasks/cleanup.task.ts
import { Schedule, ScheduledTask } from "@theunionsquare/mangojs-core";
import { injectable, inject } from "inversify";

@Schedule("0 0 * * *") // Daily at midnight
@injectable()
export class CleanupTask extends ScheduledTask {
  async run(): Promise<void> {
    // Cleanup logic
  }
}
```

### Tasks Index

```typescript
// tasks/index.ts
import { CleanupTask } from "./cleanup.task";
import { ReportTask } from "./report.task";
import { SyncTask } from "./sync.task";

export const tasks = [CleanupTask, ReportTask, SyncTask];
```

---

## ScheduleRegistry API

Access the registry through `ServerBuilder.getScheduleRegistry()` for runtime task management.

### Getting the Registry

```typescript
const serverBuilder = new ServerBuilder()
  .setName("my-service")
  .setRoutes(routes)
  .setTasks(tasks);

const registry = serverBuilder.getScheduleRegistry();
```

### Available Methods

| Method                  | Return Type                  | Description                  |
| ----------------------- | ---------------------------- | ---------------------------- |
| `getTasks()`            | `ScheduledTask[]`            | Get all registered tasks     |
| `getTask(name: string)` | `ScheduledTask \| undefined` | Get a specific task by name  |
| `start(name: string)`   | `void`                       | Start a specific task        |
| `stop(name: string)`    | `void`                       | Stop a specific task         |
| `startAll()`            | `void`                       | Start all registered tasks   |
| `stopAll()`             | `void`                       | Stop all registered tasks    |
| `getStatus()`           | `SchedulerStatus`            | Get overall scheduler status |

### Example Usage

```typescript
const registry = serverBuilder.getScheduleRegistry();

// List all tasks
const allTasks = registry.getTasks();
console.log(
  "Registered tasks:",
  allTasks.map((t) => t.name),
);

// Get specific task
const cleanupTask = registry.getTask("CleanupTask");

// Control individual tasks
registry.stop("ReportTask");
registry.start("ReportTask");

// Control all tasks
registry.stopAll();
registry.startAll();

// Check status
const status = registry.getStatus();
console.log("Scheduler status:", status);
```

---

## Execution Modes

The scheduler supports two execution modes configured via the `execution` option.

### Main Thread Mode (Default)

```typescript
@Schedule('0 * * * *', { execution: 'main' })
```

- **Full DI Support**: Inject services, repositories, loggers
- **Shared Resources**: Access to application context
- **Best For**: Database operations, API calls, light processing

### Worker Thread Mode

```typescript
@Schedule('0 0 * * *', { execution: 'worker' })
```

- **No DI**: Dependency injection is NOT available
- **Isolated Execution**: Runs in separate Node.js worker thread
- **Best For**: CPU-intensive tasks, heavy computations, file processing

### Important Considerations

| Feature              | Main Thread | Worker Thread |
| -------------------- | ----------- | ------------- |
| Dependency Injection | Yes         | No            |
| Database Access      | Yes         | Manual setup  |
| Shared Memory        | Yes         | No            |
| CPU Blocking         | Yes         | No            |
| Error Isolation      | No          | Yes           |

---

## Cron Expression Reference

Standard cron format: `minute hour day-of-month month day-of-week`

| Expression       | Description                    |
| ---------------- | ------------------------------ |
| `* * * * *`      | Every minute                   |
| `0 * * * *`      | Every hour                     |
| `0 0 * * *`      | Daily at midnight              |
| `0 0 * * 0`      | Weekly on Sunday at midnight   |
| `0 0 1 * *`      | Monthly on the 1st at midnight |
| `*/15 * * * *`   | Every 15 minutes               |
| `0 9-17 * * 1-5` | Hourly 9am-5pm on weekdays     |

---

## Common Patterns

### Daily Report Task

```typescript
@Schedule("0 6 * * *", { timezone: "America/New_York" })
@injectable()
export class DailyReportTask extends ScheduledTask {
  @inject(INVERSITY_TYPES.ReportService)
  private reportService: ReportService;

  async run(): Promise<void> {
    const report = await this.reportService.generateDailyReport();
    await this.reportService.sendReport(report);
  }
}
```

### Data Sync with Error Handling

```typescript
@Schedule("*/30 * * * *") // Every 30 minutes
@injectable()
export class DataSyncTask extends ScheduledTask {
  @inject(INVERSITY_TYPES.SyncService)
  private syncService: SyncService;

  async run(): Promise<void> {
    await this.syncService.syncExternalData();
  }

  onError(error: Error): void {
    // Alert on failure
    this.alertService.sendAlert({
      title: "Data Sync Failed",
      message: error.message,
      severity: "high",
    });
  }
}
```

### CPU-Intensive Task (Worker Mode)

```typescript
@Schedule("0 2 * * *", { execution: "worker" })
export class DataProcessingTask extends ScheduledTask {
  // Note: No DI available in worker mode

  async run(): Promise<void> {
    // Heavy computation runs in isolated worker thread
    const data = await this.loadData();
    const processed = this.processData(data);
    await this.saveResults(processed);
  }

  private processData(data: RawData[]): ProcessedData[] {
    // CPU-intensive processing
    return data.map((item) => this.transform(item));
  }
}
```

---

## Gotchas

- **Worker Mode Has No DI**: Tasks running in worker mode cannot inject services. Set up connections manually.
- **Cron Timezone**: Default is system timezone. Always specify `timezone` for production deployments.
- **Task Names**: If not specified, the class name is used. Ensure unique names for registry lookups.
- **runOnStart**: Use carefully in production - task will execute immediately on server startup.
- **Long-Running Tasks**: Ensure tasks complete before the next scheduled run or implement locking.
- **Error Handling**: Always implement `onError()` for critical tasks to prevent silent failures.

---

## Related

- [Architecture Overview](../architecture/overview.context.md) - Service architecture patterns
- [Dependency Injection](../architecture/injection.context.md) - DI configuration
- [Best Practices](../common/best-practices.context.md) - Coding standards
- [Error Handling](../common/error-handling.context.md) - Error patterns
