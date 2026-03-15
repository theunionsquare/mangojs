# Interface: WorkerOptions

Defined in: [src/core/queue/types.ts:81](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/queue/types.ts#L81)

Worker configuration options

## Properties

### concurrency?

```ts
optional concurrency: number;
```

Defined in: [src/core/queue/types.ts:83](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/queue/types.ts#L83)

Number of concurrent jobs to process

***

### lockDuration?

```ts
optional lockDuration: number;
```

Defined in: [src/core/queue/types.ts:85](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/queue/types.ts#L85)

Lock duration for a job (ms)

***

### maxStalledCount?

```ts
optional maxStalledCount: number;
```

Defined in: [src/core/queue/types.ts:87](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/queue/types.ts#L87)

Maximum stalled count before failing
