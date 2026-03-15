---
sidebar_label: JobOptions
---

# Interface: JobOptions

Defined in: [src/core/queue/types.ts:21](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/queue/types.ts#L21)

Options for adding a job to a queue

## Properties

### attempts?

```ts
optional attempts: number;
```

Defined in: [src/core/queue/types.ts:25](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/queue/types.ts#L25)

Number of retry attempts on failure

***

### backoff?

```ts
optional backoff: object;
```

Defined in: [src/core/queue/types.ts:27](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/queue/types.ts#L27)

Backoff strategy for retries

#### delay

```ts
delay: number;
```

#### type

```ts
type: "fixed" | "exponential";
```

***

### delay?

```ts
optional delay: number;
```

Defined in: [src/core/queue/types.ts:23](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/queue/types.ts#L23)

Delay before the job is processed (ms)

***

### jobId?

```ts
optional jobId: string;
```

Defined in: [src/core/queue/types.ts:38](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/queue/types.ts#L38)

Unique job ID (prevents duplicates)

***

### priority?

```ts
optional priority: number;
```

Defined in: [src/core/queue/types.ts:32](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/queue/types.ts#L32)

Job priority (lower = higher priority)

***

### removeOnComplete?

```ts
optional removeOnComplete: number | boolean;
```

Defined in: [src/core/queue/types.ts:34](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/queue/types.ts#L34)

Remove job from queue after completion

***

### removeOnFail?

```ts
optional removeOnFail: number | boolean;
```

Defined in: [src/core/queue/types.ts:36](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/queue/types.ts#L36)

Remove job from queue after failure
