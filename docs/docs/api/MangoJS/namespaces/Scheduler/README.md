[**MangoJS**](../../../README.md)

***

# Scheduler

## Description

Cron-based task scheduling with node-schedule.

- **@Schedule**: Decorator to define cron schedule for a task
- **ScheduledTask**: Abstract base class for task implementations
- **ScheduleRegistry**: Registry for managing scheduled tasks

## Example

```ts
@Schedule('0 * * * *') // Every hour
@injectable()
export class HourlyCleanup extends ScheduledTask {
  async run(): Promise<void> {
    // Cleanup logic
  }
}

// Register and start
const registry = new ScheduleRegistry();
registry.register(HourlyCleanup);
registry.startAll();
```

## Interfaces

- [IScheduledTask](interfaces/IScheduledTask.md)
- [IScheduleRegistry](interfaces/IScheduleRegistry.md)
- [ScheduledTaskConstructor](interfaces/ScheduledTaskConstructor.md)
- [ScheduleMetadata](interfaces/ScheduleMetadata.md)
- [ScheduleOptions](interfaces/ScheduleOptions.md)
- [SchedulerStatus](interfaces/SchedulerStatus.md)
- [TaskEntry](interfaces/TaskEntry.md)
- [TaskInfo](interfaces/TaskInfo.md)

## Type Aliases

- [TaskStatus](type-aliases/TaskStatus.md)

## References

### Schedule

Re-exports [Schedule](../../../functions/Schedule.md)

***

### ScheduledTask

Re-exports [ScheduledTask](../../../classes/ScheduledTask.md)

***

### ScheduleRegistry

Re-exports [ScheduleRegistry](../../../classes/ScheduleRegistry.md)
