[**MangoJS**](../README.md)

***

# Function: Schedule()

```ts
function Schedule(cron, options?): ClassDecorator;
```

Defined in: src/core/decorators/scheduler/schedule.decorator.ts:32

Decorator to mark a class as a scheduled task.

## Parameters

### cron

`string`

Cron expression (e.g., '0 * * * *' for every hour)

### options?

[`ScheduleOptions`](../MangoJS/namespaces/Scheduler/interfaces/ScheduleOptions.md)

Optional configuration for the scheduled task

## Returns

`ClassDecorator`

## Examples

```typescript
@Schedule('0 * * * *') // Every hour
@injectable()
export class HourlyTask extends ScheduledTask {
  async run(): Promise<void> {
    // Task logic
  }
}
```

```typescript
@Schedule('0 0 * * *', { timezone: 'UTC', runOnStart: true })
@injectable()
export class DailyTask extends ScheduledTask {
  async run(): Promise<void> {
    // Task logic
  }
}
```
