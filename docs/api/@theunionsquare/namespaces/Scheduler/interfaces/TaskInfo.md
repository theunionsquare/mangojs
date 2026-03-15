# Interface: TaskInfo

Defined in: [src/core/scheduler/types.ts:33](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/scheduler/types.ts#L33)

Information about a registered task

## Properties

### cron

```ts
cron: string;
```

Defined in: [src/core/scheduler/types.ts:37](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/scheduler/types.ts#L37)

Cron expression

***

### execution

```ts
execution: "main" | "worker";
```

Defined in: [src/core/scheduler/types.ts:41](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/scheduler/types.ts#L41)

Execution mode

***

### lastError?

```ts
optional lastError: Error;
```

Defined in: [src/core/scheduler/types.ts:49](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/scheduler/types.ts#L49)

Last error if any

***

### lastRun?

```ts
optional lastRun: Date;
```

Defined in: [src/core/scheduler/types.ts:45](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/scheduler/types.ts#L45)

Last execution time

***

### name

```ts
name: string;
```

Defined in: [src/core/scheduler/types.ts:35](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/scheduler/types.ts#L35)

Task name

***

### nextRun?

```ts
optional nextRun: Date;
```

Defined in: [src/core/scheduler/types.ts:47](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/scheduler/types.ts#L47)

Next scheduled execution time

***

### status

```ts
status: TaskStatus;
```

Defined in: [src/core/scheduler/types.ts:39](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/scheduler/types.ts#L39)

Current status

***

### timezone?

```ts
optional timezone: string;
```

Defined in: [src/core/scheduler/types.ts:43](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/scheduler/types.ts#L43)

Timezone
