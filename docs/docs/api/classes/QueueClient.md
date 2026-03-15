[**MangoJS**](../README.md)

***

# Class: QueueClient

Defined in: [src/core/queue/QueueClient.ts:20](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/queue/QueueClient.ts#L20)

QueueClient - Wrapper for BullMQ Queue (Producer side)
Used by API Service to add jobs to queues

This class abstracts BullMQ implementation details.
No direct BullMQ calls should be made outside this wrapper.

## Implements

- [`IQueueClient`](../MangoJS/namespaces/Queue/interfaces/IQueueClient.md)

## Constructors

### Constructor

```ts
new QueueClient(redisConfig): QueueClient;
```

Defined in: [src/core/queue/QueueClient.ts:24](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/queue/QueueClient.ts#L24)

#### Parameters

##### redisConfig

[`RedisConfig`](../MangoJS/namespaces/Queue/interfaces/RedisConfig.md)

#### Returns

`QueueClient`

## Methods

### addBulk()

```ts
addBulk<T>(queueName, jobs): Promise<string[]>;
```

Defined in: [src/core/queue/QueueClient.ts:71](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/queue/QueueClient.ts#L71)

Add multiple jobs to a queue in bulk

#### Type Parameters

##### T

`T`

#### Parameters

##### queueName

`string`

##### jobs

[`JobData`](../MangoJS/namespaces/Queue/interfaces/JobData.md)\<`T`\>[]

#### Returns

`Promise`\<`string`[]\>

#### Implementation of

[`IQueueClient`](../MangoJS/namespaces/Queue/interfaces/IQueueClient.md).[`addBulk`](../MangoJS/namespaces/Queue/interfaces/IQueueClient.md#addbulk)

***

### addJob()

```ts
addJob<T>(
   queueName, 
   jobName, 
   data, 
options?): Promise<string>;
```

Defined in: [src/core/queue/QueueClient.ts:49](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/queue/QueueClient.ts#L49)

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

[`JobOptions`](../MangoJS/namespaces/Queue/interfaces/JobOptions.md)

#### Returns

`Promise`\<`string`\>

#### Implementation of

[`IQueueClient`](../MangoJS/namespaces/Queue/interfaces/IQueueClient.md).[`addJob`](../MangoJS/namespaces/Queue/interfaces/IQueueClient.md#addjob)

***

### close()

```ts
close(): Promise<void>;
```

Defined in: [src/core/queue/QueueClient.ts:146](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/queue/QueueClient.ts#L146)

Close all queue connections

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`IQueueClient`](../MangoJS/namespaces/Queue/interfaces/IQueueClient.md).[`close`](../MangoJS/namespaces/Queue/interfaces/IQueueClient.md#close)

***

### getJobStatus()

```ts
getJobStatus(queueName, jobId): Promise<JobStatus>;
```

Defined in: [src/core/queue/QueueClient.ts:95](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/queue/QueueClient.ts#L95)

Get the status of a specific job

#### Parameters

##### queueName

`string`

##### jobId

`string`

#### Returns

`Promise`\<[`JobStatus`](../MangoJS/namespaces/Queue/interfaces/JobStatus.md)\>

#### Implementation of

[`IQueueClient`](../MangoJS/namespaces/Queue/interfaces/IQueueClient.md).[`getJobStatus`](../MangoJS/namespaces/Queue/interfaces/IQueueClient.md#getjobstatus)

***

### getQueueStatus()

```ts
getQueueStatus(queueName): Promise<QueueStatus>;
```

Defined in: [src/core/queue/QueueClient.ts:121](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/queue/QueueClient.ts#L121)

Get queue statistics

#### Parameters

##### queueName

`string`

#### Returns

`Promise`\<[`QueueStatus`](../MangoJS/namespaces/Queue/interfaces/QueueStatus.md)\>

#### Implementation of

[`IQueueClient`](../MangoJS/namespaces/Queue/interfaces/IQueueClient.md).[`getQueueStatus`](../MangoJS/namespaces/Queue/interfaces/IQueueClient.md#getqueuestatus)
