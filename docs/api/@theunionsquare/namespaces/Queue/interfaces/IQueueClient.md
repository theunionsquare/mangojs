# Interface: IQueueClient

Defined in: [src/core/queue/types.ts:134](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/queue/types.ts#L134)

Interface for Queue Client (used by API Service).
Only responsible for adding jobs to queues - never consumes.

## Methods

### addBulk()

```ts
addBulk<T>(queueName, jobs): Promise<string[]>;
```

Defined in: [src/core/queue/types.ts:156](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/queue/types.ts#L156)

Add multiple jobs to a queue in bulk

#### Type Parameters

##### T

`T`

#### Parameters

##### queueName

`string`

Name of the queue

##### jobs

[`JobData`](JobData.md)\<`T`\>[]

Array of job data

#### Returns

`Promise`\<`string`[]\>

Array of Job IDs

***

### addJob()

```ts
addJob<T>(
   queueName, 
   jobName, 
   data, 
options?): Promise<string>;
```

Defined in: [src/core/queue/types.ts:143](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/queue/types.ts#L143)

Add a single job to a queue

#### Type Parameters

##### T

`T`

#### Parameters

##### queueName

`string`

Name of the queue

##### jobName

`string`

Name/type of the job

##### data

`T`

Job payload data

##### options?

[`JobOptions`](JobOptions.md)

Optional job configuration

#### Returns

`Promise`\<`string`\>

Job ID

***

### close()

```ts
close(): Promise<void>;
```

Defined in: [src/core/queue/types.ts:174](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/queue/types.ts#L174)

Close all connections

#### Returns

`Promise`\<`void`\>

***

### getJobStatus()

```ts
getJobStatus(queueName, jobId): Promise<JobStatus>;
```

Defined in: [src/core/queue/types.ts:163](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/queue/types.ts#L163)

Get the status of a specific job

#### Parameters

##### queueName

`string`

Name of the queue

##### jobId

`string`

Job ID

#### Returns

`Promise`\<[`JobStatus`](JobStatus.md)\>

***

### getQueueStatus()

```ts
getQueueStatus(queueName): Promise<QueueStatus>;
```

Defined in: [src/core/queue/types.ts:169](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/queue/types.ts#L169)

Get queue statistics

#### Parameters

##### queueName

`string`

Name of the queue

#### Returns

`Promise`\<[`QueueStatus`](QueueStatus.md)\>
