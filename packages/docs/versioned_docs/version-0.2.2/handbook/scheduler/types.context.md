# Scheduler Types Reference

This document provides complete type definitions for the MangoJS Scheduler System.

---

## ScheduleOptions

Configuration options for the `@Schedule` decorator.

```typescript
interface ScheduleOptions {
  name?: string;                    // Custom task name (defaults to class name)
  timezone?: string;                // Timezone for cron (e.g., 'UTC', 'America/New_York')
  runOnStart?: boolean;             // Execute immediately on start (default: false)
  execution?: 'main' | 'worker';    // Execution mode (default: 'main')
}
```

**Property Details:**

| Property     | Default      | Description |
|--------------|--------------|-------------|
| `name`       | Class name   | Custom identifier for the task. Used with `start(name)` and `stop(name)`. |
| `timezone`   | System TZ    | IANA timezone string. Cron expressions are evaluated in this timezone. |
| `runOnStart` | `false`      | If `true`, task executes immediately when `start()` is called, before first cron trigger. |
| `execution`  | `'main'`     | `'main'` = run in main thread with DI. `'worker'` = run in isolated Worker Thread (no DI). |

**Usage:**

```typescript
@Schedule('0 0 * * *', {
  name: 'daily-cleanup',
  timezone: 'UTC',
  runOnStart: true,
  execution: 'main',
})
@injectable()
export class DailyCleanupTask extends ScheduledTask { }
```

---

## ScheduleMetadata

Internal metadata stored by the `@Schedule` decorator.

```typescript
interface ScheduleMetadata {
  cron: string;
  options: ScheduleOptions;
}
```

---

## TaskStatus

Status of a scheduled task.

```typescript
type TaskStatus = 'running' | 'stopped' | 'error';
```

| Status    | Description |
|-----------|-------------|
| `running` | Task is scheduled and will execute on cron triggers |
| `stopped` | Task is registered but not scheduled (won't execute) |
| `error`   | Last execution threw an error (still scheduled to run) |

---

## TaskInfo

Information about a registered task.

```typescript
interface TaskInfo {
  name: string;                     // Task name
  cron: string;                     // Cron expression
  status: TaskStatus;               // Current status
  execution: 'main' | 'worker';     // Execution mode
  timezone?: string;                // Timezone if set
  lastRun?: Date;                   // Last execution time
  nextRun?: Date;                   // Next scheduled execution
  lastError?: Error;                // Last error if status is 'error'
}
```

**Usage:**

```typescript
const task = registry.getTask('my-task');

if (task) {
  console.log(`Task: ${task.name}`);
  console.log(`Status: ${task.status}`);
  console.log(`Cron: ${task.cron}`);
  console.log(`Next run: ${task.nextRun?.toISOString()}`);

  if (task.status === 'error' && task.lastError) {
    console.log(`Error: ${task.lastError.message}`);
  }
}
```

---

## SchedulerStatus

Overall scheduler status.

```typescript
interface SchedulerStatus {
  active: boolean;          // Whether any task is running
  totalTasks: number;       // Total registered tasks
  runningTasks: number;     // Number of running tasks
  stoppedTasks: number;     // Number of stopped tasks
  tasks: TaskInfo[];        // All task information
}
```

**Usage:**

```typescript
const status = registry.getStatus();

console.log(`Active: ${status.active}`);
console.log(`Total: ${status.totalTasks}`);
console.log(`Running: ${status.runningTasks}`);
console.log(`Stopped: ${status.stoppedTasks}`);

// Health check
if (!status.active && status.totalTasks > 0) {
  console.warn('Warning: No tasks are running');
}
```

---

## IScheduledTask

Interface for scheduled task implementations.

```typescript
interface IScheduledTask {
  // Required: Main execution method
  run(): Promise<void> | void;

  // Optional: Called before run()
  onStart?(): void;

  // Optional: Called after successful run()
  onComplete?(): void;

  // Optional: Called when run() throws
  onError?(error: Error): void;
}
```

**Usage:**

```typescript
@Schedule('0 * * * *')
@injectable()
export class MyTask implements IScheduledTask {
  async run(): Promise<void> {
    // Required
  }

  onStart(): void {
    // Optional
  }

  onComplete(): void {
    // Optional
  }

  onError(error: Error): void {
    // Optional
  }
}
```

---

## ScheduledTaskConstructor

Constructor type for task classes.

```typescript
interface ScheduledTaskConstructor {
  new (...args: any[]): IScheduledTask;
}
```

**Usage:**

```typescript
function registerTasks(
  registry: IScheduleRegistry,
  tasks: ScheduledTaskConstructor[]
): void {
  tasks.forEach(task => registry.register(task));
}

// Usage
registerTasks(registry, [CleanupTask, ReportTask, NotificationTask]);
```

---

## IScheduleRegistry

Interface for the schedule registry.

```typescript
interface IScheduleRegistry {
  // Register a task class
  register(taskClass: ScheduledTaskConstructor): void;

  // Get all registered tasks
  getTasks(): TaskInfo[];

  // Get a specific task by name
  getTask(name: string): TaskInfo | undefined;

  // Start a specific task
  start(name: string): void;

  // Stop a specific task
  stop(name: string): void;

  // Start all tasks
  startAll(): void;

  // Stop all tasks
  stopAll(): void;

  // Get overall scheduler status
  getStatus(): SchedulerStatus;
}
```

---

## TaskEntry

Internal task entry in the registry (not exported for external use).

```typescript
interface TaskEntry {
  name: string;
  taskClass: ScheduledTaskConstructor;
  instance?: IScheduledTask;
  cronJob?: Job;                    // node-schedule Job
  metadata: ScheduleMetadata;
  status: TaskStatus;
  lastRun?: Date;
  lastError?: Error;
}
```

---

## Common Type Patterns

### Task Array Export

```typescript
// tasks/index.ts
import { Scheduler } from "@theunionsquare/mangojs-core";
import { CleanupTask } from "./cleanup.task";
import { ReportTask } from "./report.task";
import { NotificationTask } from "./notification.task";

export const scheduledTasks: Scheduler.ScheduledTaskConstructor[] = [
  CleanupTask,
  ReportTask,
  NotificationTask,
];
```

### Status Response Type

```typescript
// For API responses
interface SchedulerStatusResponse {
  scheduler: SchedulerStatus;
  timestamp: string;
}

@Get('/scheduler/status')
getStatus(req: Request, res: Response): Response {
  const response: SchedulerStatusResponse = {
    scheduler: this.registry.getStatus(),
    timestamp: new Date().toISOString(),
  };
  return res.json(response);
}
```

### Task Control Request

```typescript
interface TaskControlRequest {
  action: 'start' | 'stop';
}

@Post('/scheduler/tasks/:name')
controlTask(req: Request, res: Response): Response {
  const { name } = req.params;
  const { action } = req.body as TaskControlRequest;

  if (action === 'start') {
    this.registry.start(name);
  } else {
    this.registry.stop(name);
  }

  return res.json(this.registry.getTask(name));
}
```

## Related

- [Architecture](./architecture.context.md) - System architecture overview
- [Decorators](./decorators.context.md) - Using types with decorators
- [Schedule Registry](./schedule-registry.context.md) - Registry API reference
- [Examples](./examples.context.md) - Types in action
