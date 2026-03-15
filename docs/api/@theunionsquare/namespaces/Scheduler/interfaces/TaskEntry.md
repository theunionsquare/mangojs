# Interface: TaskEntry

Defined in: [src/core/scheduler/types.ts:114](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/scheduler/types.ts#L114)

Internal task entry in the registry

## Properties

### cronJob?

```ts
optional cronJob: Job;
```

Defined in: [src/core/scheduler/types.ts:118](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/scheduler/types.ts#L118)

***

### instance?

```ts
optional instance: IScheduledTask;
```

Defined in: [src/core/scheduler/types.ts:117](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/scheduler/types.ts#L117)

***

### lastError?

```ts
optional lastError: Error;
```

Defined in: [src/core/scheduler/types.ts:122](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/scheduler/types.ts#L122)

***

### lastRun?

```ts
optional lastRun: Date;
```

Defined in: [src/core/scheduler/types.ts:121](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/scheduler/types.ts#L121)

***

### metadata

```ts
metadata: ScheduleMetadata;
```

Defined in: [src/core/scheduler/types.ts:119](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/scheduler/types.ts#L119)

***

### name

```ts
name: string;
```

Defined in: [src/core/scheduler/types.ts:115](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/scheduler/types.ts#L115)

***

### status

```ts
status: TaskStatus;
```

Defined in: [src/core/scheduler/types.ts:120](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/scheduler/types.ts#L120)

***

### taskClass

```ts
taskClass: ScheduledTaskConstructor;
```

Defined in: [src/core/scheduler/types.ts:116](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/scheduler/types.ts#L116)
