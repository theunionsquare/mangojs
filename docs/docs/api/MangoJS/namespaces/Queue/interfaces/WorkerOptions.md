[**MangoJS**](../../../../README.md)

***

# Interface: WorkerOptions

Defined in: [src/core/queue/types.ts:81](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/queue/types.ts#L81)

Worker configuration options

## Properties

### concurrency?

```ts
optional concurrency: number;
```

Defined in: [src/core/queue/types.ts:83](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/queue/types.ts#L83)

Number of concurrent jobs to process

***

### lockDuration?

```ts
optional lockDuration: number;
```

Defined in: [src/core/queue/types.ts:85](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/queue/types.ts#L85)

Lock duration for a job (ms)

***

### maxStalledCount?

```ts
optional maxStalledCount: number;
```

Defined in: [src/core/queue/types.ts:87](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/queue/types.ts#L87)

Maximum stalled count before failing
