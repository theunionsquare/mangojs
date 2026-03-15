---
sidebar_label: ScheduleRegistry
---

# Class: ScheduleRegistry

Defined in: [src/core/scheduler/ScheduleRegistry.ts:19](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/scheduler/ScheduleRegistry.ts#L19)

Registry for managing scheduled tasks.
Handles registration, lifecycle management, and status tracking of all scheduled tasks.

## Implements

- [`IScheduleRegistry`](../@theunionsquare/namespaces/Scheduler/interfaces/IScheduleRegistry.md)

## Constructors

### Constructor

```ts
new ScheduleRegistry(): ScheduleRegistry;
```

Defined in: [src/core/scheduler/ScheduleRegistry.ts:23](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/scheduler/ScheduleRegistry.ts#L23)

#### Returns

`ScheduleRegistry`

## Methods

### getStatus()

```ts
getStatus(): SchedulerStatus;
```

Defined in: [src/core/scheduler/ScheduleRegistry.ts:150](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/scheduler/ScheduleRegistry.ts#L150)

Get overall scheduler status

#### Returns

[`SchedulerStatus`](../@theunionsquare/namespaces/Scheduler/interfaces/SchedulerStatus.md)

#### Implementation of

[`IScheduleRegistry`](../@theunionsquare/namespaces/Scheduler/interfaces/IScheduleRegistry.md).[`getStatus`](../@theunionsquare/namespaces/Scheduler/interfaces/IScheduleRegistry.md#getstatus)

***

### getTask()

```ts
getTask(name): TaskInfo;
```

Defined in: [src/core/scheduler/ScheduleRegistry.ts:142](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/scheduler/ScheduleRegistry.ts#L142)

Get information about a specific task

#### Parameters

##### name

`string`

#### Returns

[`TaskInfo`](../@theunionsquare/namespaces/Scheduler/interfaces/TaskInfo.md)

#### Implementation of

[`IScheduleRegistry`](../@theunionsquare/namespaces/Scheduler/interfaces/IScheduleRegistry.md).[`getTask`](../@theunionsquare/namespaces/Scheduler/interfaces/IScheduleRegistry.md#gettask)

***

### getTasks()

```ts
getTasks(): TaskInfo[];
```

Defined in: [src/core/scheduler/ScheduleRegistry.ts:135](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/scheduler/ScheduleRegistry.ts#L135)

Get information about all registered tasks

#### Returns

[`TaskInfo`](../@theunionsquare/namespaces/Scheduler/interfaces/TaskInfo.md)[]

#### Implementation of

[`IScheduleRegistry`](../@theunionsquare/namespaces/Scheduler/interfaces/IScheduleRegistry.md).[`getTasks`](../@theunionsquare/namespaces/Scheduler/interfaces/IScheduleRegistry.md#gettasks)

***

### register()

```ts
register(taskClass): void;
```

Defined in: [src/core/scheduler/ScheduleRegistry.ts:33](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/scheduler/ScheduleRegistry.ts#L33)

Register a task class with the scheduler.
Reads metadata from the

#### Parameters

##### taskClass

[`ScheduledTaskConstructor`](../@theunionsquare/namespaces/Scheduler/interfaces/ScheduledTaskConstructor.md)

The task class decorated with

#### Returns

`void`

#### Schedule

decorator and sets up the cron job.

#### Schedule

#### Implementation of

[`IScheduleRegistry`](../@theunionsquare/namespaces/Scheduler/interfaces/IScheduleRegistry.md).[`register`](../@theunionsquare/namespaces/Scheduler/interfaces/IScheduleRegistry.md#register)

***

### start()

```ts
start(name): void;
```

Defined in: [src/core/scheduler/ScheduleRegistry.ts:60](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/scheduler/ScheduleRegistry.ts#L60)

Initialize and start a registered task

#### Parameters

##### name

`string`

#### Returns

`void`

#### Implementation of

[`IScheduleRegistry`](../@theunionsquare/namespaces/Scheduler/interfaces/IScheduleRegistry.md).[`start`](../@theunionsquare/namespaces/Scheduler/interfaces/IScheduleRegistry.md#start)

***

### startAll()

```ts
startAll(): void;
```

Defined in: [src/core/scheduler/ScheduleRegistry.ts:117](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/scheduler/ScheduleRegistry.ts#L117)

Start all registered tasks

#### Returns

`void`

#### Implementation of

[`IScheduleRegistry`](../@theunionsquare/namespaces/Scheduler/interfaces/IScheduleRegistry.md).[`startAll`](../@theunionsquare/namespaces/Scheduler/interfaces/IScheduleRegistry.md#startall)

***

### stop()

```ts
stop(name): void;
```

Defined in: [src/core/scheduler/ScheduleRegistry.ts:100](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/scheduler/ScheduleRegistry.ts#L100)

Stop a running task

#### Parameters

##### name

`string`

#### Returns

`void`

#### Implementation of

[`IScheduleRegistry`](../@theunionsquare/namespaces/Scheduler/interfaces/IScheduleRegistry.md).[`stop`](../@theunionsquare/namespaces/Scheduler/interfaces/IScheduleRegistry.md#stop)

***

### stopAll()

```ts
stopAll(): void;
```

Defined in: [src/core/scheduler/ScheduleRegistry.ts:126](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/scheduler/ScheduleRegistry.ts#L126)

Stop all running tasks

#### Returns

`void`

#### Implementation of

[`IScheduleRegistry`](../@theunionsquare/namespaces/Scheduler/interfaces/IScheduleRegistry.md).[`stopAll`](../@theunionsquare/namespaces/Scheduler/interfaces/IScheduleRegistry.md#stopall)
