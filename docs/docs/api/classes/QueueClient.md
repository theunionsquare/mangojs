---
sidebar_label: QueueClient
---

# Class: QueueClient

Defined in: [src/core/queue/QueueClient.ts:20](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/queue/QueueClient.ts#L20)

QueueClient - Wrapper for BullMQ Queue (Producer side)
Used by API Service to add jobs to queues

This class abstracts BullMQ implementation details.
No direct BullMQ calls should be made outside this wrapper.

## Implements

- [`IQueueClient`](../@theunionsquare/namespaces/Queue/interfaces/IQueueClient.md)

## Constructors

### Constructor

```ts
new QueueClient(redisConfig): QueueClient;
```

Defined in: [src/core/queue/QueueClient.ts:24](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/queue/QueueClient.ts#L24)

#### Parameters

##### redisConfig

[`RedisConfig`](../@theunionsquare/namespaces/Queue/interfaces/RedisConfig.md)

#### Returns

`QueueClient`

## Methods

### addBulk()

```ts
addBulk<T>(queueName, jobs): Promise<string[]>;
```

Defined in: [src/core/queue/QueueClient.ts:71](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/queue/QueueClient.ts#L71)

Add multiple jobs to a queue in bulk

#### Type Parameters

##### T

`T`

#### Parameters

##### queueName

`string`

##### jobs

[`JobData`](../@theunionsquare/namespaces/Queue/interfaces/JobData.md)\<`T`\>[]

#### Returns

`Promise`\<`string`[]\>

#### Implementation of

[`IQueueClient`](../@theunionsquare/namespaces/Queue/interfaces/IQueueClient.md).[`addBulk`](../@theunionsquare/namespaces/Queue/interfaces/IQueueClient.md#addbulk)

***

### addJob()

```ts
addJob<T>(
   queueName, 
   jobName, 
   data, 
options?): Promise<string>;
```

Defined in: [src/core/queue/QueueClient.ts:49](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/queue/QueueClient.ts#L49)

Add a single job to a queue

#### Type Parameters

##### T

`T`

#### Parameters

##### queueName

`string`

##### jobName

`string`

##### data

`T`

##### options?

[`JobOptions`](../@theunionsquare/namespaces/Queue/interfaces/JobOptions.md)

#### Returns

`Promise`\<`string`\>

#### Implementation of

[`IQueueClient`](../@theunionsquare/namespaces/Queue/interfaces/IQueueClient.md).[`addJob`](../@theunionsquare/namespaces/Queue/interfaces/IQueueClient.md#addjob)

***

### close()

```ts
close(): Promise<void>;
```

Defined in: [src/core/queue/QueueClient.ts:146](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/queue/QueueClient.ts#L146)

Close all queue connections

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`IQueueClient`](../@theunionsquare/namespaces/Queue/interfaces/IQueueClient.md).[`close`](../@theunionsquare/namespaces/Queue/interfaces/IQueueClient.md#close)

***

### getJobStatus()

```ts
getJobStatus(queueName, jobId): Promise<JobStatus>;
```

Defined in: [src/core/queue/QueueClient.ts:95](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/queue/QueueClient.ts#L95)

Get the status of a specific job

#### Parameters

##### queueName

`string`

##### jobId

`string`

#### Returns

`Promise`\<[`JobStatus`](../@theunionsquare/namespaces/Queue/interfaces/JobStatus.md)\>

#### Implementation of

[`IQueueClient`](../@theunionsquare/namespaces/Queue/interfaces/IQueueClient.md).[`getJobStatus`](../@theunionsquare/namespaces/Queue/interfaces/IQueueClient.md#getjobstatus)

***

### getQueueStatus()

```ts
getQueueStatus(queueName): Promise<QueueStatus>;
```

Defined in: [src/core/queue/QueueClient.ts:121](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/queue/QueueClient.ts#L121)

Get queue statistics

#### Parameters

##### queueName

`string`

#### Returns

`Promise`\<[`QueueStatus`](../@theunionsquare/namespaces/Queue/interfaces/QueueStatus.md)\>

#### Implementation of

[`IQueueClient`](../@theunionsquare/namespaces/Queue/interfaces/IQueueClient.md).[`getQueueStatus`](../@theunionsquare/namespaces/Queue/interfaces/IQueueClient.md#getqueuestatus)
