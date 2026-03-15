---
sidebar_label: WorkerOptions
---

# Interface: WorkerOptions

Defined in: [src/core/queue/types.ts:81](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/queue/types.ts#L81)

Worker configuration options

## Properties

### concurrency?

```ts
optional concurrency: number;
```

Defined in: [src/core/queue/types.ts:83](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/queue/types.ts#L83)

Number of concurrent jobs to process

***

### lockDuration?

```ts
optional lockDuration: number;
```

Defined in: [src/core/queue/types.ts:85](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/queue/types.ts#L85)

Lock duration for a job (ms)

***

### maxStalledCount?

```ts
optional maxStalledCount: number;
```

Defined in: [src/core/queue/types.ts:87](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/queue/types.ts#L87)

Maximum stalled count before failing
