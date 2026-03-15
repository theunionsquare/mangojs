---
sidebar_label: Queue
---

# Queue

## Description

BullMQ-based job queue system with Redis backend.

- **QueueClient**: Producer - adds jobs to queues (used by API services)
- **QueueManager**: Consumer - processes jobs from queues (used by workers)
- **@QueueWorker**: Decorator for worker class registration

## Examples

```ts
// Producer (API Service)
const client = new QueueClient({ host: 'localhost', port: 6379 });
await client.addJob('emails', 'send-welcome', { userId: 123 });
```

```ts
// Consumer (Worker Service)
@QueueWorker('emails', { concurrency: 5 })
class EmailWorker implements IQueueWorkerHandler {
  async process(job: Job) {
    // Process job
  }
}
```

## Interfaces

### IQueueClient

Defined in: packages/core/src/core/queue/types.ts:134

Interface for Queue Client (used by API Service).
Only responsible for adding jobs to queues - never consumes.

#### Methods

##### addBulk()

```ts
addBulk<T>(queueName, jobs): Promise<string[]>;
```

Defined in: packages/core/src/core/queue/types.ts:156

Add multiple jobs to a queue in bulk

###### Type Parameters

###### T

`T`

###### Parameters

###### queueName

`string`

Name of the queue

###### jobs

[`JobData`](#jobdata)\<`T`\>[]

Array of job data

###### Returns

`Promise`\<`string`[]\>

Array of Job IDs

##### addJob()

```ts
addJob<T>(
   queueName, 
   jobName, 
   data, 
options?): Promise<string>;
```

Defined in: packages/core/src/core/queue/types.ts:143

Add a single job to a queue

###### Type Parameters

###### T

`T`

###### Parameters

###### queueName

`string`

Name of the queue

###### jobName

`string`

Name/type of the job

###### data

`T`

Job payload data

###### options?

[`JobOptions`](#joboptions)

Optional job configuration

###### Returns

`Promise`\<`string`\>

Job ID

##### close()

```ts
close(): Promise<void>;
```

Defined in: packages/core/src/core/queue/types.ts:174

Close all connections

###### Returns

`Promise`\<`void`\>

##### getJobStatus()

```ts
getJobStatus(queueName, jobId): Promise<JobStatus>;
```

Defined in: packages/core/src/core/queue/types.ts:163

Get the status of a specific job

###### Parameters

###### queueName

`string`

Name of the queue

###### jobId

`string`

Job ID

###### Returns

`Promise`\<[`JobStatus`](#jobstatus)\>

##### getQueueStatus()

```ts
getQueueStatus(queueName): Promise<QueueStatus>;
```

Defined in: packages/core/src/core/queue/types.ts:169

Get queue statistics

###### Parameters

###### queueName

`string`

Name of the queue

###### Returns

`Promise`\<[`QueueStatus`](#queuestatus)\>

***

### IQueueWorkerHandler

Defined in: packages/core/src/core/queue/types.ts:101

Interface for queue worker handlers

#### Type Parameters

##### T

`T` = `any`

#### Methods

##### onCompleted()?

```ts
optional onCompleted(job, result): void;
```

Defined in: packages/core/src/core/queue/types.ts:110

Called when a job completes successfully

###### Parameters

###### job

[`Job`](../../../index.md#job)\<`T`\>

###### result

`any`

###### Returns

`void`

##### onFailed()?

```ts
optional onFailed(job, error): void;
```

Defined in: packages/core/src/core/queue/types.ts:115

Called when a job fails

###### Parameters

###### job

[`Job`](../../../index.md#job)\<`T`\>

###### error

`Error`

###### Returns

`void`

##### onProgress()?

```ts
optional onProgress(job, progress): void;
```

Defined in: packages/core/src/core/queue/types.ts:120

Called when job progress is updated

###### Parameters

###### job

[`Job`](../../../index.md#job)\<`T`\>

###### progress

`number` | `object`

###### Returns

`void`

##### process()

```ts
process(job): Promise<any>;
```

Defined in: packages/core/src/core/queue/types.ts:105

Process a job from the queue

###### Parameters

###### job

[`Job`](../../../index.md#job)\<`T`\>

###### Returns

`Promise`\<`any`\>

***

### JobData

Defined in: packages/core/src/core/queue/types.ts:44

Job data structure

#### Type Parameters

##### T

`T` = `any`

#### Properties

##### data

```ts
data: T;
```

Defined in: packages/core/src/core/queue/types.ts:46

##### name

```ts
name: string;
```

Defined in: packages/core/src/core/queue/types.ts:45

##### options?

```ts
optional options: JobOptions;
```

Defined in: packages/core/src/core/queue/types.ts:47

***

### JobOptions

Defined in: packages/core/src/core/queue/types.ts:21

Options for adding a job to a queue

#### Properties

##### attempts?

```ts
optional attempts: number;
```

Defined in: packages/core/src/core/queue/types.ts:25

Number of retry attempts on failure

##### backoff?

```ts
optional backoff: object;
```

Defined in: packages/core/src/core/queue/types.ts:27

Backoff strategy for retries

###### delay

```ts
delay: number;
```

###### type

```ts
type: "fixed" | "exponential";
```

##### delay?

```ts
optional delay: number;
```

Defined in: packages/core/src/core/queue/types.ts:23

Delay before the job is processed (ms)

##### jobId?

```ts
optional jobId: string;
```

Defined in: packages/core/src/core/queue/types.ts:38

Unique job ID (prevents duplicates)

##### priority?

```ts
optional priority: number;
```

Defined in: packages/core/src/core/queue/types.ts:32

Job priority (lower = higher priority)

##### removeOnComplete?

```ts
optional removeOnComplete: number | boolean;
```

Defined in: packages/core/src/core/queue/types.ts:34

Remove job from queue after completion

##### removeOnFail?

```ts
optional removeOnFail: number | boolean;
```

Defined in: packages/core/src/core/queue/types.ts:36

Remove job from queue after failure

***

### JobStatus

Defined in: packages/core/src/core/queue/types.ts:53

Job status information

#### Properties

##### attemptsMade

```ts
attemptsMade: number;
```

Defined in: packages/core/src/core/queue/types.ts:61

##### data

```ts
data: any;
```

Defined in: packages/core/src/core/queue/types.ts:58

##### failedReason?

```ts
optional failedReason: string;
```

Defined in: packages/core/src/core/queue/types.ts:60

##### id

```ts
id: string;
```

Defined in: packages/core/src/core/queue/types.ts:54

##### name

```ts
name: string;
```

Defined in: packages/core/src/core/queue/types.ts:55

##### progress

```ts
progress: number;
```

Defined in: packages/core/src/core/queue/types.ts:57

##### returnValue?

```ts
optional returnValue: any;
```

Defined in: packages/core/src/core/queue/types.ts:59

##### status

```ts
status: "waiting" | "active" | "completed" | "failed" | "delayed";
```

Defined in: packages/core/src/core/queue/types.ts:56

##### timestamp

```ts
timestamp: number;
```

Defined in: packages/core/src/core/queue/types.ts:62

***

### QueueStatus

Defined in: packages/core/src/core/queue/types.ts:68

Queue status information

#### Properties

##### active

```ts
active: number;
```

Defined in: packages/core/src/core/queue/types.ts:71

##### completed

```ts
completed: number;
```

Defined in: packages/core/src/core/queue/types.ts:72

##### delayed

```ts
delayed: number;
```

Defined in: packages/core/src/core/queue/types.ts:74

##### failed

```ts
failed: number;
```

Defined in: packages/core/src/core/queue/types.ts:73

##### name

```ts
name: string;
```

Defined in: packages/core/src/core/queue/types.ts:69

##### paused

```ts
paused: boolean;
```

Defined in: packages/core/src/core/queue/types.ts:75

##### waiting

```ts
waiting: number;
```

Defined in: packages/core/src/core/queue/types.ts:70

***

### QueueWorkerMetadata

Defined in: packages/core/src/core/queue/types.ts:93

Metadata for

#### Queue Worker

decorator

#### Properties

##### options

```ts
options: WorkerOptions;
```

Defined in: packages/core/src/core/queue/types.ts:95

##### queueName

```ts
queueName: string;
```

Defined in: packages/core/src/core/queue/types.ts:94

***

### RedisConfig

Defined in: packages/core/src/core/queue/types.ts:6

Redis connection configuration

#### Properties

##### db?

```ts
optional db: number;
```

Defined in: packages/core/src/core/queue/types.ts:10

##### host

```ts
host: string;
```

Defined in: packages/core/src/core/queue/types.ts:7

##### password?

```ts
optional password: string;
```

Defined in: packages/core/src/core/queue/types.ts:9

##### port

```ts
port: number;
```

Defined in: packages/core/src/core/queue/types.ts:8

***

### WorkerOptions

Defined in: packages/core/src/core/queue/types.ts:81

Worker configuration options

#### Properties

##### concurrency?

```ts
optional concurrency: number;
```

Defined in: packages/core/src/core/queue/types.ts:83

Number of concurrent jobs to process

##### lockDuration?

```ts
optional lockDuration: number;
```

Defined in: packages/core/src/core/queue/types.ts:85

Lock duration for a job (ms)

##### maxStalledCount?

```ts
optional maxStalledCount: number;
```

Defined in: packages/core/src/core/queue/types.ts:87

Maximum stalled count before failing

## Type Aliases

### QueueWorkerConstructor()

```ts
type QueueWorkerConstructor = (...args) => IQueueWorkerHandler;
```

Defined in: packages/core/src/core/queue/types.ts:126

Constructor type for queue worker classes

#### Parameters

##### args

...`any`[]

#### Returns

[`IQueueWorkerHandler`](#iqueueworkerhandler)

## References

### Job

Re-exports [Job](../../../index.md#job)

***

### QUEUE\_WORKER\_METADATA\_KEY

Re-exports [QUEUE_WORKER_METADATA_KEY](../Decorators/index.md#queue_worker_metadata_key)

***

### QueueClient

Re-exports [QueueClient](../../../index.md#queueclient)

***

### QueueManager

Re-exports [QueueManager](../../../index.md#queuemanager)

***

### QueueWorker

Re-exports [QueueWorker](../../../index.md#queueworker)
