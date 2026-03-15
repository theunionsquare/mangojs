---
sidebar_label: QueueManager
---

# Class: QueueManager

Defined in: [src/core/queue/QueueManager.ts:34](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/queue/QueueManager.ts#L34)

QueueManager - Wrapper for BullMQ Worker (Consumer side)
Used by Worker Service to process jobs from queues

This class abstracts BullMQ implementation details.
No direct BullMQ calls should be made outside this wrapper.

## Constructors

### Constructor

```ts
new QueueManager(redisConfig): QueueManager;
```

Defined in: [src/core/queue/QueueManager.ts:40](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/queue/QueueManager.ts#L40)

#### Parameters

##### redisConfig

[`RedisConfig`](../@theunionsquare/namespaces/Queue/interfaces/RedisConfig.md)

#### Returns

`QueueManager`

## Methods

### cleanQueue()

```ts
cleanQueue(
   queueName, 
   grace?, 
status?): Promise<void>;
```

Defined in: [src/core/queue/QueueManager.ts:306](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/queue/QueueManager.ts#L306)

Clean completed/failed jobs from a queue

#### Parameters

##### queueName

`string`

##### grace?

`number` = `0`

##### status?

`"completed"` | `"failed"`

#### Returns

`Promise`\<`void`\>

***

### close()

```ts
close(): Promise<void>;
```

Defined in: [src/core/queue/QueueManager.ts:318](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/queue/QueueManager.ts#L318)

Close all workers and connections

#### Returns

`Promise`\<`void`\>

***

### getQueueStatus()

```ts
getQueueStatus(queueName): Promise<QueueStatus>;
```

Defined in: [src/core/queue/QueueManager.ts:248](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/queue/QueueManager.ts#L248)

Get queue status/statistics

#### Parameters

##### queueName

`string`

#### Returns

`Promise`\<[`QueueStatus`](../@theunionsquare/namespaces/Queue/interfaces/QueueStatus.md)\>

***

### getWorkersStatus()

```ts
getWorkersStatus(): object[];
```

Defined in: [src/core/queue/QueueManager.ts:273](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/queue/QueueManager.ts#L273)

Get status of all registered workers

#### Returns

`object`[]

***

### pauseQueue()

```ts
pauseQueue(queueName): Promise<void>;
```

Defined in: [src/core/queue/QueueManager.ts:290](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/queue/QueueManager.ts#L290)

Pause a queue (stops new jobs from being processed)

#### Parameters

##### queueName

`string`

#### Returns

`Promise`\<`void`\>

***

### register()

```ts
register(workerClass): void;
```

Defined in: [src/core/queue/QueueManager.ts:72](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/queue/QueueManager.ts#L72)

Register a worker class decorated with

#### Parameters

##### workerClass

[`QueueWorkerConstructor`](../@theunionsquare/namespaces/Queue/type-aliases/QueueWorkerConstructor.md)

#### Returns

`void`

#### Queue Worker

***

### resumeQueue()

```ts
resumeQueue(queueName): Promise<void>;
```

Defined in: [src/core/queue/QueueManager.ts:298](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/queue/QueueManager.ts#L298)

Resume a paused queue

#### Parameters

##### queueName

`string`

#### Returns

`Promise`\<`void`\>

***

### setContainer()

```ts
setContainer(container): void;
```

Defined in: [src/core/queue/QueueManager.ts:47](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/queue/QueueManager.ts#L47)

Set the Inversify container for dependency injection

#### Parameters

##### container

`Container`

#### Returns

`void`

***

### start()

```ts
start(queueName): void;
```

Defined in: [src/core/queue/QueueManager.ts:218](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/queue/QueueManager.ts#L218)

Start a specific worker by queue name

#### Parameters

##### queueName

`string`

#### Returns

`void`

***

### startAll()

```ts
startAll(): void;
```

Defined in: [src/core/queue/QueueManager.ts:192](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/queue/QueueManager.ts#L192)

Start all registered workers

#### Returns

`void`

***

### stop()

```ts
stop(queueName): Promise<void>;
```

Defined in: [src/core/queue/QueueManager.ts:233](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/queue/QueueManager.ts#L233)

Stop a specific worker by queue name

#### Parameters

##### queueName

`string`

#### Returns

`Promise`\<`void`\>

***

### stopAll()

```ts
stopAll(): Promise<void>;
```

Defined in: [src/core/queue/QueueManager.ts:205](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/queue/QueueManager.ts#L205)

Stop all registered workers

#### Returns

`Promise`\<`void`\>
