[**MangoJS**](../../../../README.md)

***

# Interface: IScheduleRegistry

Defined in: [src/core/scheduler/types.ts:71](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/scheduler/types.ts#L71)

Interface for the Schedule Registry

## Methods

### getStatus()

```ts
getStatus(): SchedulerStatus;
```

Defined in: [src/core/scheduler/types.ts:87](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/scheduler/types.ts#L87)

Get overall scheduler status

#### Returns

[`SchedulerStatus`](SchedulerStatus.md)

***

### getTask()

```ts
getTask(name): TaskInfo;
```

Defined in: [src/core/scheduler/types.ts:77](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/scheduler/types.ts#L77)

Get a specific task by name

#### Parameters

##### name

`string`

#### Returns

[`TaskInfo`](TaskInfo.md)

***

### getTasks()

```ts
getTasks(): TaskInfo[];
```

Defined in: [src/core/scheduler/types.ts:75](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/scheduler/types.ts#L75)

Get all registered tasks

#### Returns

[`TaskInfo`](TaskInfo.md)[]

***

### register()

```ts
register(taskClass): void;
```

Defined in: [src/core/scheduler/types.ts:73](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/scheduler/types.ts#L73)

Register a task class

#### Parameters

##### taskClass

[`ScheduledTaskConstructor`](ScheduledTaskConstructor.md)

#### Returns

`void`

***

### start()

```ts
start(name): void;
```

Defined in: [src/core/scheduler/types.ts:79](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/scheduler/types.ts#L79)

Start a specific task

#### Parameters

##### name

`string`

#### Returns

`void`

***

### startAll()

```ts
startAll(): void;
```

Defined in: [src/core/scheduler/types.ts:83](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/scheduler/types.ts#L83)

Start all tasks

#### Returns

`void`

***

### stop()

```ts
stop(name): void;
```

Defined in: [src/core/scheduler/types.ts:81](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/scheduler/types.ts#L81)

Stop a specific task

#### Parameters

##### name

`string`

#### Returns

`void`

***

### stopAll()

```ts
stopAll(): void;
```

Defined in: [src/core/scheduler/types.ts:85](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/scheduler/types.ts#L85)

Stop all tasks

#### Returns

`void`
