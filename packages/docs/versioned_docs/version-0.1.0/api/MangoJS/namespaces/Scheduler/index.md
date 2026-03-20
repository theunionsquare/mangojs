---
sidebar_label: Scheduler
---

# Scheduler

Cron-based task scheduling

## Classes

### `abstract` ScheduledTask

Defined in: [packages/core/src/core/scheduler/ScheduledTask.ts:35](https://github.com/theunionsquare/mangojs/blob/2e89580cb8318934c1d350324df2c6685212ddd9/packages/core/src/core/scheduler/ScheduledTask.ts#L35)

Abstract base class for scheduled tasks.
Extend this class to create a scheduled task.

#### Example

```typescript
@Schedule('0 * * * *')
@injectable()
export class MyTask extends ScheduledTask {
  @inject(INVERSITY_TYPES.LoggerFactory)
  private loggerFactory: ILoggerFactory;

  async run(): Promise<void> {
    const logger = this.loggerFactory.create('MyTask');
    logger.info('Task running...');
    // Your task logic here
  }

  onStart(): void {
    console.log('Task starting');
  }

  onComplete(): void {
    console.log('Task completed');
  }

  onError(error: Error): void {
    console.error('Task failed:', error);
  }
}
```

#### Implements

- [`IScheduledTask`](#ischeduledtask)

#### Constructors

##### Constructor

```ts
new ScheduledTask(): ScheduledTask;
```

###### Returns

[`ScheduledTask`](#abstract-scheduledtask)

#### Methods

##### onComplete()

```ts
onComplete(): void;
```

Defined in: [packages/core/src/core/scheduler/ScheduledTask.ts:54](https://github.com/theunionsquare/mangojs/blob/2e89580cb8318934c1d350324df2c6685212ddd9/packages/core/src/core/scheduler/ScheduledTask.ts#L54)

Lifecycle hook called after task execution completes successfully.
Override to add post-execution logic.

###### Returns

`void`

###### Implementation of

[`IScheduledTask`](#ischeduledtask).[`onComplete`](#oncomplete-1)

##### onError()

```ts
onError(error): void;
```

Defined in: [packages/core/src/core/scheduler/ScheduledTask.ts:64](https://github.com/theunionsquare/mangojs/blob/2e89580cb8318934c1d350324df2c6685212ddd9/packages/core/src/core/scheduler/ScheduledTask.ts#L64)

Lifecycle hook called when task execution fails.
Override to add error handling logic.

###### Parameters

###### error

`Error`

The error that occurred during execution

###### Returns

`void`

###### Implementation of

[`IScheduledTask`](#ischeduledtask).[`onError`](#onerror-1)

##### onStart()

```ts
onStart(): void;
```

Defined in: [packages/core/src/core/scheduler/ScheduledTask.ts:46](https://github.com/theunionsquare/mangojs/blob/2e89580cb8318934c1d350324df2c6685212ddd9/packages/core/src/core/scheduler/ScheduledTask.ts#L46)

Lifecycle hook called before task execution starts.
Override to add pre-execution logic.

###### Returns

`void`

###### Implementation of

[`IScheduledTask`](#ischeduledtask).[`onStart`](#onstart-1)

##### run()

```ts
abstract run(): void | Promise<void>;
```

Defined in: [packages/core/src/core/scheduler/ScheduledTask.ts:40](https://github.com/theunionsquare/mangojs/blob/2e89580cb8318934c1d350324df2c6685212ddd9/packages/core/src/core/scheduler/ScheduledTask.ts#L40)

Main execution method - called on each scheduled run.
Must be implemented by subclasses.

###### Returns

`void` \| `Promise`\<`void`\>

###### Implementation of

[`IScheduledTask`](#ischeduledtask).[`run`](#run-1)

***

### ScheduleRegistry

Defined in: [packages/core/src/core/scheduler/ScheduleRegistry.ts:19](https://github.com/theunionsquare/mangojs/blob/2e89580cb8318934c1d350324df2c6685212ddd9/packages/core/src/core/scheduler/ScheduleRegistry.ts#L19)

Registry for managing scheduled tasks.
Handles registration, lifecycle management, and status tracking of all scheduled tasks.

#### Implements

- [`IScheduleRegistry`](#ischeduleregistry)

#### Constructors

##### Constructor

```ts
new ScheduleRegistry(): ScheduleRegistry;
```

Defined in: [packages/core/src/core/scheduler/ScheduleRegistry.ts:23](https://github.com/theunionsquare/mangojs/blob/2e89580cb8318934c1d350324df2c6685212ddd9/packages/core/src/core/scheduler/ScheduleRegistry.ts#L23)

###### Returns

[`ScheduleRegistry`](#scheduleregistry)

#### Methods

##### getStatus()

```ts
getStatus(): SchedulerStatus;
```

Defined in: [packages/core/src/core/scheduler/ScheduleRegistry.ts:150](https://github.com/theunionsquare/mangojs/blob/2e89580cb8318934c1d350324df2c6685212ddd9/packages/core/src/core/scheduler/ScheduleRegistry.ts#L150)

Get overall scheduler status

###### Returns

[`SchedulerStatus`](#schedulerstatus)

###### Implementation of

[`IScheduleRegistry`](#ischeduleregistry).[`getStatus`](#getstatus-1)

##### getTask()

```ts
getTask(name): TaskInfo;
```

Defined in: [packages/core/src/core/scheduler/ScheduleRegistry.ts:142](https://github.com/theunionsquare/mangojs/blob/2e89580cb8318934c1d350324df2c6685212ddd9/packages/core/src/core/scheduler/ScheduleRegistry.ts#L142)

Get information about a specific task

###### Parameters

###### name

`string`

###### Returns

[`TaskInfo`](#taskinfo)

###### Implementation of

[`IScheduleRegistry`](#ischeduleregistry).[`getTask`](#gettask-1)

##### getTasks()

```ts
getTasks(): TaskInfo[];
```

Defined in: [packages/core/src/core/scheduler/ScheduleRegistry.ts:135](https://github.com/theunionsquare/mangojs/blob/2e89580cb8318934c1d350324df2c6685212ddd9/packages/core/src/core/scheduler/ScheduleRegistry.ts#L135)

Get information about all registered tasks

###### Returns

[`TaskInfo`](#taskinfo)[]

###### Implementation of

[`IScheduleRegistry`](#ischeduleregistry).[`getTasks`](#gettasks-1)

##### register()

```ts
register(taskClass): void;
```

Defined in: [packages/core/src/core/scheduler/ScheduleRegistry.ts:33](https://github.com/theunionsquare/mangojs/blob/2e89580cb8318934c1d350324df2c6685212ddd9/packages/core/src/core/scheduler/ScheduleRegistry.ts#L33)

Register a task class with the scheduler.
Reads metadata from the

###### Parameters

###### taskClass

[`ScheduledTaskConstructor`](#scheduledtaskconstructor-1)

The task class decorated with

###### Returns

`void`

###### Schedule

decorator and sets up the cron job.

###### Schedule

###### Implementation of

[`IScheduleRegistry`](#ischeduleregistry).[`register`](#register-1)

##### start()

```ts
start(name): void;
```

Defined in: [packages/core/src/core/scheduler/ScheduleRegistry.ts:60](https://github.com/theunionsquare/mangojs/blob/2e89580cb8318934c1d350324df2c6685212ddd9/packages/core/src/core/scheduler/ScheduleRegistry.ts#L60)

Initialize and start a registered task

###### Parameters

###### name

`string`

###### Returns

`void`

###### Implementation of

[`IScheduleRegistry`](#ischeduleregistry).[`start`](#start-1)

##### startAll()

```ts
startAll(): void;
```

Defined in: [packages/core/src/core/scheduler/ScheduleRegistry.ts:117](https://github.com/theunionsquare/mangojs/blob/2e89580cb8318934c1d350324df2c6685212ddd9/packages/core/src/core/scheduler/ScheduleRegistry.ts#L117)

Start all registered tasks

###### Returns

`void`

###### Implementation of

[`IScheduleRegistry`](#ischeduleregistry).[`startAll`](#startall-1)

##### stop()

```ts
stop(name): void;
```

Defined in: [packages/core/src/core/scheduler/ScheduleRegistry.ts:100](https://github.com/theunionsquare/mangojs/blob/2e89580cb8318934c1d350324df2c6685212ddd9/packages/core/src/core/scheduler/ScheduleRegistry.ts#L100)

Stop a running task

###### Parameters

###### name

`string`

###### Returns

`void`

###### Implementation of

[`IScheduleRegistry`](#ischeduleregistry).[`stop`](#stop-1)

##### stopAll()

```ts
stopAll(): void;
```

Defined in: [packages/core/src/core/scheduler/ScheduleRegistry.ts:126](https://github.com/theunionsquare/mangojs/blob/2e89580cb8318934c1d350324df2c6685212ddd9/packages/core/src/core/scheduler/ScheduleRegistry.ts#L126)

Stop all running tasks

###### Returns

`void`

###### Implementation of

[`IScheduleRegistry`](#ischeduleregistry).[`stopAll`](#stopall-1)

## Interfaces

### IScheduledTask

Defined in: [packages/core/src/core/scheduler/types.ts:93](https://github.com/theunionsquare/mangojs/blob/2e89580cb8318934c1d350324df2c6685212ddd9/packages/core/src/core/scheduler/types.ts#L93)

Interface for scheduled task implementations

#### Methods

##### onComplete()?

```ts
optional onComplete(): void;
```

Defined in: [packages/core/src/core/scheduler/types.ts:99](https://github.com/theunionsquare/mangojs/blob/2e89580cb8318934c1d350324df2c6685212ddd9/packages/core/src/core/scheduler/types.ts#L99)

Called after task execution completes successfully

###### Returns

`void`

##### onError()?

```ts
optional onError(error): void;
```

Defined in: [packages/core/src/core/scheduler/types.ts:101](https://github.com/theunionsquare/mangojs/blob/2e89580cb8318934c1d350324df2c6685212ddd9/packages/core/src/core/scheduler/types.ts#L101)

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

Defined in: [packages/core/src/core/scheduler/types.ts:97](https://github.com/theunionsquare/mangojs/blob/2e89580cb8318934c1d350324df2c6685212ddd9/packages/core/src/core/scheduler/types.ts#L97)

Called before task execution starts

###### Returns

`void`

##### run()

```ts
run(): void | Promise<void>;
```

Defined in: [packages/core/src/core/scheduler/types.ts:95](https://github.com/theunionsquare/mangojs/blob/2e89580cb8318934c1d350324df2c6685212ddd9/packages/core/src/core/scheduler/types.ts#L95)

Main execution method - called on each scheduled run

###### Returns

`void` \| `Promise`\<`void`\>

***

### IScheduleRegistry

Defined in: [packages/core/src/core/scheduler/types.ts:71](https://github.com/theunionsquare/mangojs/blob/2e89580cb8318934c1d350324df2c6685212ddd9/packages/core/src/core/scheduler/types.ts#L71)

Interface for the Schedule Registry

#### Methods

##### getStatus()

```ts
getStatus(): SchedulerStatus;
```

Defined in: [packages/core/src/core/scheduler/types.ts:87](https://github.com/theunionsquare/mangojs/blob/2e89580cb8318934c1d350324df2c6685212ddd9/packages/core/src/core/scheduler/types.ts#L87)

Get overall scheduler status

###### Returns

[`SchedulerStatus`](#schedulerstatus)

##### getTask()

```ts
getTask(name): TaskInfo;
```

Defined in: [packages/core/src/core/scheduler/types.ts:77](https://github.com/theunionsquare/mangojs/blob/2e89580cb8318934c1d350324df2c6685212ddd9/packages/core/src/core/scheduler/types.ts#L77)

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

Defined in: [packages/core/src/core/scheduler/types.ts:75](https://github.com/theunionsquare/mangojs/blob/2e89580cb8318934c1d350324df2c6685212ddd9/packages/core/src/core/scheduler/types.ts#L75)

Get all registered tasks

###### Returns

[`TaskInfo`](#taskinfo)[]

##### register()

```ts
register(taskClass): void;
```

Defined in: [packages/core/src/core/scheduler/types.ts:73](https://github.com/theunionsquare/mangojs/blob/2e89580cb8318934c1d350324df2c6685212ddd9/packages/core/src/core/scheduler/types.ts#L73)

Register a task class

###### Parameters

###### taskClass

[`ScheduledTaskConstructor`](#scheduledtaskconstructor-1)

###### Returns

`void`

##### start()

```ts
start(name): void;
```

Defined in: [packages/core/src/core/scheduler/types.ts:79](https://github.com/theunionsquare/mangojs/blob/2e89580cb8318934c1d350324df2c6685212ddd9/packages/core/src/core/scheduler/types.ts#L79)

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

Defined in: [packages/core/src/core/scheduler/types.ts:83](https://github.com/theunionsquare/mangojs/blob/2e89580cb8318934c1d350324df2c6685212ddd9/packages/core/src/core/scheduler/types.ts#L83)

Start all tasks

###### Returns

`void`

##### stop()

```ts
stop(name): void;
```

Defined in: [packages/core/src/core/scheduler/types.ts:81](https://github.com/theunionsquare/mangojs/blob/2e89580cb8318934c1d350324df2c6685212ddd9/packages/core/src/core/scheduler/types.ts#L81)

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

Defined in: [packages/core/src/core/scheduler/types.ts:85](https://github.com/theunionsquare/mangojs/blob/2e89580cb8318934c1d350324df2c6685212ddd9/packages/core/src/core/scheduler/types.ts#L85)

Stop all tasks

###### Returns

`void`

***

### ScheduledTaskConstructor

Defined in: [packages/core/src/core/scheduler/types.ts:107](https://github.com/theunionsquare/mangojs/blob/2e89580cb8318934c1d350324df2c6685212ddd9/packages/core/src/core/scheduler/types.ts#L107)

Constructor type for ScheduledTask classes

#### Constructors

##### Constructor

```ts
new ScheduledTaskConstructor(...args): IScheduledTask;
```

Defined in: [packages/core/src/core/scheduler/types.ts:108](https://github.com/theunionsquare/mangojs/blob/2e89580cb8318934c1d350324df2c6685212ddd9/packages/core/src/core/scheduler/types.ts#L108)

###### Parameters

###### args

...`any`[]

###### Returns

[`IScheduledTask`](#ischeduledtask)

***

### ScheduleMetadata

Defined in: [packages/core/src/core/scheduler/types.ts:20](https://github.com/theunionsquare/mangojs/blob/2e89580cb8318934c1d350324df2c6685212ddd9/packages/core/src/core/scheduler/types.ts#L20)

Internal metadata stored by

#### Schedule

decorator

#### Properties

##### cron

```ts
cron: string;
```

Defined in: [packages/core/src/core/scheduler/types.ts:21](https://github.com/theunionsquare/mangojs/blob/2e89580cb8318934c1d350324df2c6685212ddd9/packages/core/src/core/scheduler/types.ts#L21)

##### options

```ts
options: ScheduleOptions;
```

Defined in: [packages/core/src/core/scheduler/types.ts:22](https://github.com/theunionsquare/mangojs/blob/2e89580cb8318934c1d350324df2c6685212ddd9/packages/core/src/core/scheduler/types.ts#L22)

***

### ScheduleOptions

Defined in: [packages/core/src/core/scheduler/types.ts:6](https://github.com/theunionsquare/mangojs/blob/2e89580cb8318934c1d350324df2c6685212ddd9/packages/core/src/core/scheduler/types.ts#L6)

Options for the

#### Schedule

decorator

#### Properties

##### execution?

```ts
optional execution: "main" | "worker";
```

Defined in: [packages/core/src/core/scheduler/types.ts:14](https://github.com/theunionsquare/mangojs/blob/2e89580cb8318934c1d350324df2c6685212ddd9/packages/core/src/core/scheduler/types.ts#L14)

Execution mode: 'main' runs in main thread, 'worker' runs in Worker Thread (no DI support)

##### name?

```ts
optional name: string;
```

Defined in: [packages/core/src/core/scheduler/types.ts:8](https://github.com/theunionsquare/mangojs/blob/2e89580cb8318934c1d350324df2c6685212ddd9/packages/core/src/core/scheduler/types.ts#L8)

Custom name for the task (defaults to class name)

##### runOnStart?

```ts
optional runOnStart: boolean;
```

Defined in: [packages/core/src/core/scheduler/types.ts:12](https://github.com/theunionsquare/mangojs/blob/2e89580cb8318934c1d350324df2c6685212ddd9/packages/core/src/core/scheduler/types.ts#L12)

Execute the task immediately on startup

##### timezone?

```ts
optional timezone: string;
```

Defined in: [packages/core/src/core/scheduler/types.ts:10](https://github.com/theunionsquare/mangojs/blob/2e89580cb8318934c1d350324df2c6685212ddd9/packages/core/src/core/scheduler/types.ts#L10)

Timezone for the cron expression (e.g., 'UTC', 'America/New_York')

***

### SchedulerStatus

Defined in: [packages/core/src/core/scheduler/types.ts:55](https://github.com/theunionsquare/mangojs/blob/2e89580cb8318934c1d350324df2c6685212ddd9/packages/core/src/core/scheduler/types.ts#L55)

Overall scheduler status

#### Properties

##### active

```ts
active: boolean;
```

Defined in: [packages/core/src/core/scheduler/types.ts:57](https://github.com/theunionsquare/mangojs/blob/2e89580cb8318934c1d350324df2c6685212ddd9/packages/core/src/core/scheduler/types.ts#L57)

Whether the scheduler is active

##### runningTasks

```ts
runningTasks: number;
```

Defined in: [packages/core/src/core/scheduler/types.ts:61](https://github.com/theunionsquare/mangojs/blob/2e89580cb8318934c1d350324df2c6685212ddd9/packages/core/src/core/scheduler/types.ts#L61)

Number of running tasks

##### stoppedTasks

```ts
stoppedTasks: number;
```

Defined in: [packages/core/src/core/scheduler/types.ts:63](https://github.com/theunionsquare/mangojs/blob/2e89580cb8318934c1d350324df2c6685212ddd9/packages/core/src/core/scheduler/types.ts#L63)

Number of stopped tasks

##### tasks

```ts
tasks: TaskInfo[];
```

Defined in: [packages/core/src/core/scheduler/types.ts:65](https://github.com/theunionsquare/mangojs/blob/2e89580cb8318934c1d350324df2c6685212ddd9/packages/core/src/core/scheduler/types.ts#L65)

List of all tasks

##### totalTasks

```ts
totalTasks: number;
```

Defined in: [packages/core/src/core/scheduler/types.ts:59](https://github.com/theunionsquare/mangojs/blob/2e89580cb8318934c1d350324df2c6685212ddd9/packages/core/src/core/scheduler/types.ts#L59)

Total number of registered tasks

***

### TaskEntry

Defined in: [packages/core/src/core/scheduler/types.ts:114](https://github.com/theunionsquare/mangojs/blob/2e89580cb8318934c1d350324df2c6685212ddd9/packages/core/src/core/scheduler/types.ts#L114)

Internal task entry in the registry

#### Properties

##### cronJob?

```ts
optional cronJob: Job;
```

Defined in: [packages/core/src/core/scheduler/types.ts:118](https://github.com/theunionsquare/mangojs/blob/2e89580cb8318934c1d350324df2c6685212ddd9/packages/core/src/core/scheduler/types.ts#L118)

##### instance?

```ts
optional instance: IScheduledTask;
```

Defined in: [packages/core/src/core/scheduler/types.ts:117](https://github.com/theunionsquare/mangojs/blob/2e89580cb8318934c1d350324df2c6685212ddd9/packages/core/src/core/scheduler/types.ts#L117)

##### lastError?

```ts
optional lastError: Error;
```

Defined in: [packages/core/src/core/scheduler/types.ts:122](https://github.com/theunionsquare/mangojs/blob/2e89580cb8318934c1d350324df2c6685212ddd9/packages/core/src/core/scheduler/types.ts#L122)

##### lastRun?

```ts
optional lastRun: Date;
```

Defined in: [packages/core/src/core/scheduler/types.ts:121](https://github.com/theunionsquare/mangojs/blob/2e89580cb8318934c1d350324df2c6685212ddd9/packages/core/src/core/scheduler/types.ts#L121)

##### metadata

```ts
metadata: ScheduleMetadata;
```

Defined in: [packages/core/src/core/scheduler/types.ts:119](https://github.com/theunionsquare/mangojs/blob/2e89580cb8318934c1d350324df2c6685212ddd9/packages/core/src/core/scheduler/types.ts#L119)

##### name

```ts
name: string;
```

Defined in: [packages/core/src/core/scheduler/types.ts:115](https://github.com/theunionsquare/mangojs/blob/2e89580cb8318934c1d350324df2c6685212ddd9/packages/core/src/core/scheduler/types.ts#L115)

##### status

```ts
status: TaskStatus;
```

Defined in: [packages/core/src/core/scheduler/types.ts:120](https://github.com/theunionsquare/mangojs/blob/2e89580cb8318934c1d350324df2c6685212ddd9/packages/core/src/core/scheduler/types.ts#L120)

##### taskClass

```ts
taskClass: ScheduledTaskConstructor;
```

Defined in: [packages/core/src/core/scheduler/types.ts:116](https://github.com/theunionsquare/mangojs/blob/2e89580cb8318934c1d350324df2c6685212ddd9/packages/core/src/core/scheduler/types.ts#L116)

***

### TaskInfo

Defined in: [packages/core/src/core/scheduler/types.ts:33](https://github.com/theunionsquare/mangojs/blob/2e89580cb8318934c1d350324df2c6685212ddd9/packages/core/src/core/scheduler/types.ts#L33)

Information about a registered task

#### Properties

##### cron

```ts
cron: string;
```

Defined in: [packages/core/src/core/scheduler/types.ts:37](https://github.com/theunionsquare/mangojs/blob/2e89580cb8318934c1d350324df2c6685212ddd9/packages/core/src/core/scheduler/types.ts#L37)

Cron expression

##### execution

```ts
execution: "main" | "worker";
```

Defined in: [packages/core/src/core/scheduler/types.ts:41](https://github.com/theunionsquare/mangojs/blob/2e89580cb8318934c1d350324df2c6685212ddd9/packages/core/src/core/scheduler/types.ts#L41)

Execution mode

##### lastError?

```ts
optional lastError: Error;
```

Defined in: [packages/core/src/core/scheduler/types.ts:49](https://github.com/theunionsquare/mangojs/blob/2e89580cb8318934c1d350324df2c6685212ddd9/packages/core/src/core/scheduler/types.ts#L49)

Last error if any

##### lastRun?

```ts
optional lastRun: Date;
```

Defined in: [packages/core/src/core/scheduler/types.ts:45](https://github.com/theunionsquare/mangojs/blob/2e89580cb8318934c1d350324df2c6685212ddd9/packages/core/src/core/scheduler/types.ts#L45)

Last execution time

##### name

```ts
name: string;
```

Defined in: [packages/core/src/core/scheduler/types.ts:35](https://github.com/theunionsquare/mangojs/blob/2e89580cb8318934c1d350324df2c6685212ddd9/packages/core/src/core/scheduler/types.ts#L35)

Task name

##### nextRun?

```ts
optional nextRun: Date;
```

Defined in: [packages/core/src/core/scheduler/types.ts:47](https://github.com/theunionsquare/mangojs/blob/2e89580cb8318934c1d350324df2c6685212ddd9/packages/core/src/core/scheduler/types.ts#L47)

Next scheduled execution time

##### status

```ts
status: TaskStatus;
```

Defined in: [packages/core/src/core/scheduler/types.ts:39](https://github.com/theunionsquare/mangojs/blob/2e89580cb8318934c1d350324df2c6685212ddd9/packages/core/src/core/scheduler/types.ts#L39)

Current status

##### timezone?

```ts
optional timezone: string;
```

Defined in: [packages/core/src/core/scheduler/types.ts:43](https://github.com/theunionsquare/mangojs/blob/2e89580cb8318934c1d350324df2c6685212ddd9/packages/core/src/core/scheduler/types.ts#L43)

Timezone

## Type Aliases

### TaskStatus

```ts
type TaskStatus = "running" | "stopped" | "error";
```

Defined in: [packages/core/src/core/scheduler/types.ts:28](https://github.com/theunionsquare/mangojs/blob/2e89580cb8318934c1d350324df2c6685212ddd9/packages/core/src/core/scheduler/types.ts#L28)

Task status enumeration

## References

### Schedule

Re-exports [Schedule](../../../index.md#schedule)
