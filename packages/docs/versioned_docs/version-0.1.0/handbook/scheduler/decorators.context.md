---
sidebar_label: "Decorators"
---

# Schedule Decorators

## @Schedule Decorator

The `@Schedule` decorator marks a class as a scheduled task. It registers the class with the `ScheduleRegistry` and configures when and how the task should run.

### Signature

```typescript
@Schedule(cron: string, options?: ScheduleOptions)
```

### Parameters

| Parameter | Type              | Required | Description                                                      |
| --------- | ----------------- | -------- | ---------------------------------------------------------------- |
| `cron`    | `string`          | Yes      | Cron expression defining when the task runs                      |
| `options` | `ScheduleOptions` | No       | Configuration for task behavior                                  |

### Schedule Options

| Option       | Type                  | Default      | Description                                                      |
| ------------ | --------------------- | ------------ | ---------------------------------------------------------------- |
| `name`       | `string`              | Class name   | Custom name for the task (used for start/stop by name)           |
| `timezone`   | `string`              | System TZ    | Timezone for cron expression (e.g., `'UTC'`, `'America/New_York'`) |
| `runOnStart` | `boolean`             | `false`      | Execute task immediately when started, before first cron trigger |
| `execution`  | `'main' \| 'worker'`  | `'main'`     | Execution mode: main thread (DI) or worker thread (isolated)     |

---

## Basic Usage

```typescript
import { Schedule, ScheduledTask } from "@theunionsquare/mangojs-core";
import { injectable } from "inversify";

@Schedule('0 * * * *') // Every hour
@injectable()
export class HourlyCleanupTask extends ScheduledTask {
  async run(): Promise<void> {
    console.log('Running hourly cleanup...');
    // Cleanup logic
  }
}
```

---

## With Options

```typescript
@Schedule('0 0 * * *', {
  name: 'daily-report',
  timezone: 'UTC',
  runOnStart: true,
  execution: 'main',
})
@injectable()
export class DailyReportTask extends ScheduledTask {
  async run(): Promise<void> {
    // Generates report daily at midnight UTC
    // Also runs once immediately on startup
  }
}
```

---

## Decorator Order

The `@Schedule` decorator **must come before** `@injectable()`:

```typescript
// Correct
@Schedule('* * * * *')
@injectable()
export class MyTask extends ScheduledTask {}

// Wrong - will not work
@injectable()
@Schedule('* * * * *')
export class MyTask extends ScheduledTask {}
```

---

## Cron Expression Examples

| Expression       | Description                        |
| ---------------- | ---------------------------------- |
| `* * * * *`      | Every minute                       |
| `*/5 * * * *`    | Every 5 minutes                    |
| `0 * * * *`      | Every hour (at minute 0)           |
| `0 */2 * * *`    | Every 2 hours                      |
| `0 0 * * *`      | Every day at midnight              |
| `0 9 * * *`      | Every day at 9:00 AM               |
| `0 0 * * 0`      | Every Sunday at midnight           |
| `0 0 1 * *`      | First day of every month           |
| `0 0 1 1 *`      | January 1st at midnight (yearly)   |
| `0 9-17 * * 1-5` | Every hour 9-5 on weekdays         |
| `30 4 1,15 * *`  | 4:30 AM on 1st and 15th of month   |

---

## Timezone Examples

```typescript
// Run at midnight in specific timezone
@Schedule('0 0 * * *', { timezone: 'America/New_York' })
export class EasternMidnightTask extends ScheduledTask { ... }

// Run at 9 AM UTC regardless of server location
@Schedule('0 9 * * *', { timezone: 'UTC' })
export class UtcMorningTask extends ScheduledTask { ... }

// Run at 6 PM in Tokyo
@Schedule('0 18 * * *', { timezone: 'Asia/Tokyo' })
export class TokyoEveningTask extends ScheduledTask { ... }
```

---

## Execution Mode Examples

### Main Thread (Default)

```typescript
@Schedule('0 * * * *') // execution: 'main' is default
@injectable()
export class DatabaseCleanupTask extends ScheduledTask {
  @inject(INVERSITY_TYPES.Database)
  private database: IDatabase;

  @inject(INVERSITY_TYPES.LoggerFactory)
  private loggerFactory: ILoggerFactory;

  async run(): Promise<void> {
    const logger = this.loggerFactory.createLogger('DatabaseCleanup');
    logger.info('Starting cleanup...');
    await this.database.deleteExpiredRecords();
  }
}
```

### Worker Thread

```typescript
@Schedule('0 2 * * *', { execution: 'worker' })
@injectable()
export class HeavyComputationTask extends ScheduledTask {
  async run(): Promise<void> {
    // No DI available - self-contained only
    // Good for CPU-intensive work
    const result = await this.performHeavyCalculation();
    console.log('Calculation complete:', result);
  }

  private async performHeavyCalculation(): Promise<number> {
    // CPU-bound work
    let sum = 0;
    for (let i = 0; i < 1000000000; i++) {
      sum += Math.sqrt(i);
    }
    return sum;
  }
}
```

---

## Run On Start

Use `runOnStart: true` to execute the task immediately when `start()` or `startAll()` is called:

```typescript
@Schedule('0 0 * * *', { runOnStart: true })
@injectable()
export class CacheWarmupTask extends ScheduledTask {
  async run(): Promise<void> {
    // Runs immediately on app startup
    // Then runs daily at midnight
    await this.warmUpCache();
  }
}
```

---

## Custom Task Name

```typescript
@Schedule('*/10 * * * *', { name: 'health-check' })
@injectable()
export class SystemHealthCheckTask extends ScheduledTask {
  async run(): Promise<void> {
    // Task registered as 'health-check' instead of 'SystemHealthCheckTask'
  }
}

// Later, control by name:
registry.stop('health-check');
registry.start('health-check');
```

## Related

- [Scheduled Task](./scheduled-task.context.md) - Base class and lifecycle hooks
- [Schedule Registry](./schedule-registry.context.md) - Registering and managing tasks
- [Types Reference](./types.context.md) - Full type definitions
- [Examples](./examples.context.md) - More usage patterns
