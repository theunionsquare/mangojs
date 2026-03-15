---
sidebar_label: Scheduler
---

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

### IScheduledTask

Defined in: [src/core/scheduler/types.ts:93](https://github.com/theunionsquare/mangojs/blob/01e44709afb7c4e9e23a1365c81ac6e0d3e87cd1/src/core/scheduler/types.ts#L93)

Interface for scheduled task implementations

#### Methods

##### onComplete()?

```ts
optional onComplete(): void;
```

Defined in: [src/core/scheduler/types.ts:99](https://github.com/theunionsquare/mangojs/blob/01e44709afb7c4e9e23a1365c81ac6e0d3e87cd1/src/core/scheduler/types.ts#L99)

Called after task execution completes successfully

###### Returns

`void`

##### onError()?

```ts
optional onError(error): void;
```

Defined in: [src/core/scheduler/types.ts:101](https://github.com/theunionsquare/mangojs/blob/01e44709afb7c4e9e23a1365c81ac6e0d3e87cd1/src/core/scheduler/types.ts#L101)

Called when task execution fails

###### Parameters

###### error

`Error`

###### Returns

`void`

##### onStart()?

```ts
optional onStart(): void;
```

Defined in: [src/core/scheduler/types.ts:97](https://github.com/theunionsquare/mangojs/blob/01e44709afb7c4e9e23a1365c81ac6e0d3e87cd1/src/core/scheduler/types.ts#L97)

Called before task execution starts

###### Returns

`void`

##### run()

```ts
run(): void | Promise<void>;
```

Defined in: [src/core/scheduler/types.ts:95](https://github.com/theunionsquare/mangojs/blob/01e44709afb7c4e9e23a1365c81ac6e0d3e87cd1/src/core/scheduler/types.ts#L95)

Main execution method - called on each scheduled run

###### Returns

`void` \| `Promise`\<`void`\>

***

### IScheduleRegistry

Defined in: [src/core/scheduler/types.ts:71](https://github.com/theunionsquare/mangojs/blob/01e44709afb7c4e9e23a1365c81ac6e0d3e87cd1/src/core/scheduler/types.ts#L71)

Interface for the Schedule Registry

#### Methods

##### getStatus()

```ts
getStatus(): SchedulerStatus;
```

Defined in: [src/core/scheduler/types.ts:87](https://github.com/theunionsquare/mangojs/blob/01e44709afb7c4e9e23a1365c81ac6e0d3e87cd1/src/core/scheduler/types.ts#L87)

Get overall scheduler status

###### Returns

[`SchedulerStatus`](#schedulerstatus)

##### getTask()

```ts
getTask(name): TaskInfo;
```

Defined in: [src/core/scheduler/types.ts:77](https://github.com/theunionsquare/mangojs/blob/01e44709afb7c4e9e23a1365c81ac6e0d3e87cd1/src/core/scheduler/types.ts#L77)

Get a specific task by name

###### Parameters

###### name

`string`

###### Returns

[`TaskInfo`](#taskinfo)

##### getTasks()

```ts
getTasks(): TaskInfo[];
```

Defined in: [src/core/scheduler/types.ts:75](https://github.com/theunionsquare/mangojs/blob/01e44709afb7c4e9e23a1365c81ac6e0d3e87cd1/src/core/scheduler/types.ts#L75)

Get all registered tasks

###### Returns

[`TaskInfo`](#taskinfo)[]

##### register()

```ts
register(taskClass): void;
```

Defined in: [src/core/scheduler/types.ts:73](https://github.com/theunionsquare/mangojs/blob/01e44709afb7c4e9e23a1365c81ac6e0d3e87cd1/src/core/scheduler/types.ts#L73)

Register a task class

###### Parameters

###### taskClass

[`ScheduledTaskConstructor`](#scheduledtaskconstructor)

###### Returns

`void`

##### start()

```ts
start(name): void;
```

Defined in: [src/core/scheduler/types.ts:79](https://github.com/theunionsquare/mangojs/blob/01e44709afb7c4e9e23a1365c81ac6e0d3e87cd1/src/core/scheduler/types.ts#L79)

Start a specific task

###### Parameters

###### name

`string`

###### Returns

`void`

##### startAll()

```ts
startAll(): void;
```

Defined in: [src/core/scheduler/types.ts:83](https://github.com/theunionsquare/mangojs/blob/01e44709afb7c4e9e23a1365c81ac6e0d3e87cd1/src/core/scheduler/types.ts#L83)

Start all tasks

###### Returns

`void`

##### stop()

```ts
stop(name): void;
```

Defined in: [src/core/scheduler/types.ts:81](https://github.com/theunionsquare/mangojs/blob/01e44709afb7c4e9e23a1365c81ac6e0d3e87cd1/src/core/scheduler/types.ts#L81)

Stop a specific task

###### Parameters

###### name

`string`

###### Returns

`void`

##### stopAll()

```ts
stopAll(): void;
```

Defined in: [src/core/scheduler/types.ts:85](https://github.com/theunionsquare/mangojs/blob/01e44709afb7c4e9e23a1365c81ac6e0d3e87cd1/src/core/scheduler/types.ts#L85)

Stop all tasks

###### Returns

`void`

***

### ScheduledTaskConstructor

Defined in: [src/core/scheduler/types.ts:107](https://github.com/theunionsquare/mangojs/blob/01e44709afb7c4e9e23a1365c81ac6e0d3e87cd1/src/core/scheduler/types.ts#L107)

Constructor type for ScheduledTask classes

#### Constructors

##### Constructor

```ts
new ScheduledTaskConstructor(...args): IScheduledTask;
```

Defined in: [src/core/scheduler/types.ts:108](https://github.com/theunionsquare/mangojs/blob/01e44709afb7c4e9e23a1365c81ac6e0d3e87cd1/src/core/scheduler/types.ts#L108)

###### Parameters

###### args

...`any`[]

###### Returns

[`IScheduledTask`](#ischeduledtask)

***

### ScheduleMetadata

Defined in: [src/core/scheduler/types.ts:20](https://github.com/theunionsquare/mangojs/blob/01e44709afb7c4e9e23a1365c81ac6e0d3e87cd1/src/core/scheduler/types.ts#L20)

Internal metadata stored by

#### Schedule

decorator

#### Properties

##### cron

```ts
cron: string;
```

Defined in: [src/core/scheduler/types.ts:21](https://github.com/theunionsquare/mangojs/blob/01e44709afb7c4e9e23a1365c81ac6e0d3e87cd1/src/core/scheduler/types.ts#L21)

##### options

```ts
options: ScheduleOptions;
```

Defined in: [src/core/scheduler/types.ts:22](https://github.com/theunionsquare/mangojs/blob/01e44709afb7c4e9e23a1365c81ac6e0d3e87cd1/src/core/scheduler/types.ts#L22)

***

### ScheduleOptions

Defined in: [src/core/scheduler/types.ts:6](https://github.com/theunionsquare/mangojs/blob/01e44709afb7c4e9e23a1365c81ac6e0d3e87cd1/src/core/scheduler/types.ts#L6)

Options for the

#### Schedule

decorator

#### Properties

##### execution?

```ts
optional execution: "main" | "worker";
```

Defined in: [src/core/scheduler/types.ts:14](https://github.com/theunionsquare/mangojs/blob/01e44709afb7c4e9e23a1365c81ac6e0d3e87cd1/src/core/scheduler/types.ts#L14)

Execution mode: 'main' runs in main thread, 'worker' runs in Worker Thread (no DI support)

##### name?

```ts
optional name: string;
```

Defined in: [src/core/scheduler/types.ts:8](https://github.com/theunionsquare/mangojs/blob/01e44709afb7c4e9e23a1365c81ac6e0d3e87cd1/src/core/scheduler/types.ts#L8)

Custom name for the task (defaults to class name)

##### runOnStart?

```ts
optional runOnStart: boolean;
```

Defined in: [src/core/scheduler/types.ts:12](https://github.com/theunionsquare/mangojs/blob/01e44709afb7c4e9e23a1365c81ac6e0d3e87cd1/src/core/scheduler/types.ts#L12)

Execute the task immediately on startup

##### timezone?

```ts
optional timezone: string;
```

Defined in: [src/core/scheduler/types.ts:10](https://github.com/theunionsquare/mangojs/blob/01e44709afb7c4e9e23a1365c81ac6e0d3e87cd1/src/core/scheduler/types.ts#L10)

Timezone for the cron expression (e.g., 'UTC', 'America/New_York')

***

### SchedulerStatus

Defined in: [src/core/scheduler/types.ts:55](https://github.com/theunionsquare/mangojs/blob/01e44709afb7c4e9e23a1365c81ac6e0d3e87cd1/src/core/scheduler/types.ts#L55)

Overall scheduler status

#### Properties

##### active

```ts
active: boolean;
```

Defined in: [src/core/scheduler/types.ts:57](https://github.com/theunionsquare/mangojs/blob/01e44709afb7c4e9e23a1365c81ac6e0d3e87cd1/src/core/scheduler/types.ts#L57)

Whether the scheduler is active

##### runningTasks

```ts
runningTasks: number;
```

Defined in: [src/core/scheduler/types.ts:61](https://github.com/theunionsquare/mangojs/blob/01e44709afb7c4e9e23a1365c81ac6e0d3e87cd1/src/core/scheduler/types.ts#L61)

Number of running tasks

##### stoppedTasks

```ts
stoppedTasks: number;
```

Defined in: [src/core/scheduler/types.ts:63](https://github.com/theunionsquare/mangojs/blob/01e44709afb7c4e9e23a1365c81ac6e0d3e87cd1/src/core/scheduler/types.ts#L63)

Number of stopped tasks

##### tasks

```ts
tasks: TaskInfo[];
```

Defined in: [src/core/scheduler/types.ts:65](https://github.com/theunionsquare/mangojs/blob/01e44709afb7c4e9e23a1365c81ac6e0d3e87cd1/src/core/scheduler/types.ts#L65)

List of all tasks

##### totalTasks

```ts
totalTasks: number;
```

Defined in: [src/core/scheduler/types.ts:59](https://github.com/theunionsquare/mangojs/blob/01e44709afb7c4e9e23a1365c81ac6e0d3e87cd1/src/core/scheduler/types.ts#L59)

Total number of registered tasks

***

### TaskEntry

Defined in: [src/core/scheduler/types.ts:114](https://github.com/theunionsquare/mangojs/blob/01e44709afb7c4e9e23a1365c81ac6e0d3e87cd1/src/core/scheduler/types.ts#L114)

Internal task entry in the registry

#### Properties

##### cronJob?

```ts
optional cronJob: Job;
```

Defined in: [src/core/scheduler/types.ts:118](https://github.com/theunionsquare/mangojs/blob/01e44709afb7c4e9e23a1365c81ac6e0d3e87cd1/src/core/scheduler/types.ts#L118)

##### instance?

```ts
optional instance: IScheduledTask;
```

Defined in: [src/core/scheduler/types.ts:117](https://github.com/theunionsquare/mangojs/blob/01e44709afb7c4e9e23a1365c81ac6e0d3e87cd1/src/core/scheduler/types.ts#L117)

##### lastError?

```ts
optional lastError: Error;
```

Defined in: [src/core/scheduler/types.ts:122](https://github.com/theunionsquare/mangojs/blob/01e44709afb7c4e9e23a1365c81ac6e0d3e87cd1/src/core/scheduler/types.ts#L122)

##### lastRun?

```ts
optional lastRun: Date;
```

Defined in: [src/core/scheduler/types.ts:121](https://github.com/theunionsquare/mangojs/blob/01e44709afb7c4e9e23a1365c81ac6e0d3e87cd1/src/core/scheduler/types.ts#L121)

##### metadata

```ts
metadata: ScheduleMetadata;
```

Defined in: [src/core/scheduler/types.ts:119](https://github.com/theunionsquare/mangojs/blob/01e44709afb7c4e9e23a1365c81ac6e0d3e87cd1/src/core/scheduler/types.ts#L119)

##### name

```ts
name: string;
```

Defined in: [src/core/scheduler/types.ts:115](https://github.com/theunionsquare/mangojs/blob/01e44709afb7c4e9e23a1365c81ac6e0d3e87cd1/src/core/scheduler/types.ts#L115)

##### status

```ts
status: TaskStatus;
```

Defined in: [src/core/scheduler/types.ts:120](https://github.com/theunionsquare/mangojs/blob/01e44709afb7c4e9e23a1365c81ac6e0d3e87cd1/src/core/scheduler/types.ts#L120)

##### taskClass

```ts
taskClass: ScheduledTaskConstructor;
```

Defined in: [src/core/scheduler/types.ts:116](https://github.com/theunionsquare/mangojs/blob/01e44709afb7c4e9e23a1365c81ac6e0d3e87cd1/src/core/scheduler/types.ts#L116)

***

### TaskInfo

Defined in: [src/core/scheduler/types.ts:33](https://github.com/theunionsquare/mangojs/blob/01e44709afb7c4e9e23a1365c81ac6e0d3e87cd1/src/core/scheduler/types.ts#L33)

Information about a registered task

#### Properties

##### cron

```ts
cron: string;
```

Defined in: [src/core/scheduler/types.ts:37](https://github.com/theunionsquare/mangojs/blob/01e44709afb7c4e9e23a1365c81ac6e0d3e87cd1/src/core/scheduler/types.ts#L37)

Cron expression

##### execution

```ts
execution: "main" | "worker";
```

Defined in: [src/core/scheduler/types.ts:41](https://github.com/theunionsquare/mangojs/blob/01e44709afb7c4e9e23a1365c81ac6e0d3e87cd1/src/core/scheduler/types.ts#L41)

Execution mode

##### lastError?

```ts
optional lastError: Error;
```

Defined in: [src/core/scheduler/types.ts:49](https://github.com/theunionsquare/mangojs/blob/01e44709afb7c4e9e23a1365c81ac6e0d3e87cd1/src/core/scheduler/types.ts#L49)

Last error if any

##### lastRun?

```ts
optional lastRun: Date;
```

Defined in: [src/core/scheduler/types.ts:45](https://github.com/theunionsquare/mangojs/blob/01e44709afb7c4e9e23a1365c81ac6e0d3e87cd1/src/core/scheduler/types.ts#L45)

Last execution time

##### name

```ts
name: string;
```

Defined in: [src/core/scheduler/types.ts:35](https://github.com/theunionsquare/mangojs/blob/01e44709afb7c4e9e23a1365c81ac6e0d3e87cd1/src/core/scheduler/types.ts#L35)

Task name

##### nextRun?

```ts
optional nextRun: Date;
```

Defined in: [src/core/scheduler/types.ts:47](https://github.com/theunionsquare/mangojs/blob/01e44709afb7c4e9e23a1365c81ac6e0d3e87cd1/src/core/scheduler/types.ts#L47)

Next scheduled execution time

##### status

```ts
status: TaskStatus;
```

Defined in: [src/core/scheduler/types.ts:39](https://github.com/theunionsquare/mangojs/blob/01e44709afb7c4e9e23a1365c81ac6e0d3e87cd1/src/core/scheduler/types.ts#L39)

Current status

##### timezone?

```ts
optional timezone: string;
```

Defined in: [src/core/scheduler/types.ts:43](https://github.com/theunionsquare/mangojs/blob/01e44709afb7c4e9e23a1365c81ac6e0d3e87cd1/src/core/scheduler/types.ts#L43)

Timezone

## Type Aliases

### TaskStatus

```ts
type TaskStatus = "running" | "stopped" | "error";
```

Defined in: [src/core/scheduler/types.ts:28](https://github.com/theunionsquare/mangojs/blob/01e44709afb7c4e9e23a1365c81ac6e0d3e87cd1/src/core/scheduler/types.ts#L28)

Task status enumeration

## References

### Schedule

Re-exports [Schedule](../../../index.md#schedule)

***

### ScheduledTask

Re-exports [ScheduledTask](../../../index.md#abstract-scheduledtask)

***

### ScheduleRegistry

Re-exports [ScheduleRegistry](../../../index.md#scheduleregistry)
