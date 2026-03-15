[**MangoJS**](../../../../README.md)

***

# Interface: SchedulerStatus

Defined in: [src/core/scheduler/types.ts:55](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/scheduler/types.ts#L55)

Overall scheduler status

## Properties

### active

```ts
active: boolean;
```

Defined in: [src/core/scheduler/types.ts:57](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/scheduler/types.ts#L57)

Whether the scheduler is active

***

### runningTasks

```ts
runningTasks: number;
```

Defined in: [src/core/scheduler/types.ts:61](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/scheduler/types.ts#L61)

Number of running tasks

***

### stoppedTasks

```ts
stoppedTasks: number;
```

Defined in: [src/core/scheduler/types.ts:63](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/scheduler/types.ts#L63)

Number of stopped tasks

***

### tasks

```ts
tasks: TaskInfo[];
```

Defined in: [src/core/scheduler/types.ts:65](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/scheduler/types.ts#L65)

List of all tasks

***

### totalTasks

```ts
totalTasks: number;
```

Defined in: [src/core/scheduler/types.ts:59](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/scheduler/types.ts#L59)

Total number of registered tasks
