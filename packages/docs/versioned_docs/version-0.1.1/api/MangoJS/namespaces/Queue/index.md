---
sidebar_label: Queue
---

# Queue

BullMQ-based job queue system

## Classes

### Job

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:15

Job

This class represents a Job in the queue. Normally job are implicitly created when
you add a job to the queue with methods such as Queue.addJob( ... )

A Job instance is also passed to the Worker's process function.

#### Type Parameters

##### DataType

`DataType` = `any`

##### ReturnType

`ReturnType` = `any`

##### NameType

`NameType` *extends* `string` = `string`

#### Implements

- `MinimalJob`\<`DataType`, `ReturnType`, `NameType`\>

#### Constructors

##### Constructor

```ts
new Job<DataType, ReturnType, NameType>(
   queue, 
   name, 
   data, 
   opts?, 
id?): Job<DataType, ReturnType, NameType>;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:138

###### Parameters

###### queue

`MinimalQueue`

###### name

`NameType`

The name of the Job

###### data

`DataType`

The payload for this job.

###### opts?

`JobsOptions`

The options object for this job.

###### id?

`string`

###### Returns

[`Job`](#job)\<`DataType`, `ReturnType`, `NameType`\>

#### Properties

##### attemptsMade

```ts
attemptsMade: number;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:75

Number of attempts after the job has failed.

###### Default Value

```ts
0
```

###### Implementation of

```ts
MinimalJob.attemptsMade
```

##### attemptsStarted

```ts
attemptsStarted: number;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:70

Number of attempts when job is moved to active.

###### Default Value

```ts
0
```

##### data

```ts
data: DataType;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:24

The payload for this job.

###### Implementation of

```ts
MinimalJob.data
```

##### ~~debounceId?~~

```ts
optional debounceId: string;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:110

Debounce identifier.

###### Deprecated

use deduplicationId

##### deduplicationId?

```ts
optional deduplicationId: string;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:114

Deduplication identifier.

##### deferredFailure

```ts
deferredFailure: string;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:89

Deferred failure. Stores a failed message and marks this job to be failed directly
as soon as the job is picked up by a worker, and using this string as the failed reason.

##### delay

```ts
delay: number;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:54

An amount of milliseconds to wait until this job can be processed.

###### Default Value

```ts
0
```

###### Implementation of

```ts
MinimalJob.delay
```

##### ~~discarded~~

```ts
protected discarded: boolean;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:136

###### Deprecated

use UnrecoverableError

##### failedReason

```ts
failedReason: string;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:84

Reason for failing.

###### Implementation of

```ts
MinimalJob.failedReason
```

##### finishedOn?

```ts
optional finishedOn: number;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:93

Timestamp for when the job finished (completed or failed).

###### Implementation of

```ts
MinimalJob.finishedOn
```

##### id?

```ts
optional id: string;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:29

###### Implementation of

```ts
MinimalJob.id
```

##### name

```ts
name: NameType;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:20

The name of the Job

###### Implementation of

```ts
MinimalJob.name
```

##### nextRepeatableJobId?

```ts
optional nextRepeatableJobId: string;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:123

Produced next repetable job Id.

##### opts

```ts
opts: JobsOptions;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:28

The options object for this job.

###### Implementation of

```ts
MinimalJob.opts
```

##### parent?

```ts
optional parent: ParentKeys;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:105

Object that contains parentId (id) and parent queueKey.

###### Implementation of

```ts
MinimalJob.parent
```

##### parentKey?

```ts
optional parentKey: string;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:101

Fully qualified key (including the queue prefix) pointing to the parent of this job.

###### Implementation of

```ts
MinimalJob.parentKey
```

##### priority

```ts
priority: number;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:61

Ranges from 0 (highest priority) to 2 097 152 (lowest priority). Note that
using priorities has a slight impact on performance,
so do not use it if not required.

###### Default Value

```ts
0
```

##### processedBy?

```ts
optional processedBy: string;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:131

The worker name that is processing or processed this job.

##### processedOn?

```ts
optional processedOn: number;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:97

Timestamp for when the job was processed.

###### Implementation of

```ts
MinimalJob.processedOn
```

##### progress

```ts
progress: JobProgress;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:39

The progress a job has performed so far.

###### Default Value

```ts
0
```

###### Implementation of

```ts
MinimalJob.progress
```

##### queue

```ts
protected queue: MinimalQueue;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:16

##### queueQualifiedName

```ts
readonly queueQualifiedName: string;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:34

It includes the prefix, the namespace separator :, and queue name.

###### See

[https://www.gnu.org/software/gawk/manual/html\_node/Qualified-Names.html](https://www.gnu.org/software/gawk/manual/html_node/Qualified-Names.html)

###### Implementation of

```ts
MinimalJob.queueQualifiedName
```

##### repeatJobKey?

```ts
optional repeatJobKey: string;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:118

Base repeat job key.

###### Implementation of

```ts
MinimalJob.repeatJobKey
```

##### returnvalue

```ts
returnvalue: ReturnType;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:44

The value returned by the processor when processing this job.

###### Default Value

```ts
null
```

###### Implementation of

```ts
MinimalJob.returnvalue
```

##### scripts

```ts
protected scripts: Scripts;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:137

##### stacktrace

```ts
stacktrace: string[];
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:49

Stacktrace for the error (for failed jobs).

###### Default Value

```ts
null
```

###### Implementation of

```ts
MinimalJob.stacktrace
```

##### stalledCounter

```ts
stalledCounter: number;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:80

Number of times where job has stalled.

###### Default Value

```ts
0
```

##### timestamp

```ts
timestamp: number;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:65

Timestamp when the job was created (unless overridden with job options).

###### Implementation of

```ts
MinimalJob.timestamp
```

##### token?

```ts
optional token: string;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:127

The token used for locking this job.

##### toKey()

```ts
protected toKey: (type) => string;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:132

###### Parameters

###### type

`string`

###### Returns

`string`

#### Accessors

##### prefix

###### Get Signature

```ts
get prefix(): string;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:331

###### Returns

`string`

the prefix that is used.

###### Implementation of

```ts
MinimalJob.prefix
```

##### queueName

###### Get Signature

```ts
get queueName(): string;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:327

###### Returns

`string`

the queue name this job belongs to.

###### Implementation of

```ts
MinimalJob.queueName
```

#### Methods

##### addJob()

```ts
addJob(client, parentOpts?): Promise<string>;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:481

Adds the job to Redis.

###### Parameters

###### client

`RedisClient`

###### parentOpts?

`ParentKeyOpts`

###### Returns

`Promise`\<`string`\>

##### asJSON()

```ts
asJSON(): JobJson;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:208

Prepares a job to be serialized for storage in Redis.

###### Returns

`JobJson`

###### Implementation of

```ts
MinimalJob.asJSON
```

##### asJSONSandbox()

```ts
asJSONSandbox(): JobJsonSandbox;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:214

Prepares a job to be passed to Sandbox.

###### Returns

`JobJsonSandbox`

###### Implementation of

```ts
MinimalJob.asJSONSandbox
```

##### changeDelay()

```ts
changeDelay(delay): Promise<void>;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:353

Change delay of a delayed job.

Reschedules a delayed job by setting a new delay from the current time.
For example, calling changeDelay(5000) will reschedule the job to execute
5000 milliseconds (5 seconds) from now, regardless of the original delay.

###### Parameters

###### delay

`number`

milliseconds from now when the job should be processed.

###### Returns

`Promise`\<`void`\>

void

###### Throws

JobNotExist
This exception is thrown if jobId is missing.

###### Throws

JobNotInState
This exception is thrown if job is not in delayed state.

##### changePriority()

```ts
changePriority(opts): Promise<void>;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:360

Change job priority.

###### Parameters

###### opts

options containing priority and lifo values.

###### lifo?

`boolean`

###### priority?

`number`

###### Returns

`Promise`\<`void`\>

void

##### clearLogs()

```ts
clearLogs(keepLogs?): Promise<void>;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:245

Clears job's logs

###### Parameters

###### keepLogs?

`number`

the amount of log entries to preserve

###### Returns

`Promise`\<`void`\>

##### createScripts()

```ts
protected createScripts(): void;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:182

###### Returns

`void`

##### ~~discard()~~

```ts
discard(): void;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:471

Marks a job to not be retried if it fails (even if attempts has been configured)

###### Returns

`void`

###### Deprecated

use UnrecoverableError

##### extendLock()

```ts
extendLock(token, duration): Promise<number>;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:271

Extend the lock for this job.

###### Parameters

###### token

`string`

unique token for the lock

###### duration

`number`

lock duration in milliseconds

###### Returns

`Promise`\<`number`\>

##### getChildrenValues()

```ts
getChildrenValues<CT>(): Promise<{
[jobKey: string]: CT;
}>;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:369

Get this jobs children result values if any.

###### Type Parameters

###### CT

`CT` = `any`

###### Returns

`Promise`\<\{
\[`jobKey`: `string`\]: `CT`;
\}\>

Object mapping children job keys with their values.

##### getDependencies()

```ts
getDependencies(opts?): Promise<{
  failed?: string[];
  ignored?: Record<string, any>;
  nextFailedCursor?: number;
  nextIgnoredCursor?: number;
  nextProcessedCursor?: number;
  nextUnprocessedCursor?: number;
  processed?: Record<string, any>;
  unprocessed?: string[];
}>;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:403

Get children job keys if this job is a parent and has children.

###### Parameters

###### opts?

`DependenciesOpts`

###### Returns

`Promise`\<\{
  `failed?`: `string`[];
  `ignored?`: `Record`\<`string`, `any`\>;
  `nextFailedCursor?`: `number`;
  `nextIgnoredCursor?`: `number`;
  `nextProcessedCursor?`: `number`;
  `nextUnprocessedCursor?`: `number`;
  `processed?`: `Record`\<`string`, `any`\>;
  `unprocessed?`: `string`[];
\}\>

dependencies separated by processed, unprocessed, ignored and failed.

###### Remarks

Count options before Redis v7.2 works as expected with any quantity of entries
on processed/unprocessed dependencies, since v7.2 you must consider that count
won't have any effect until processed/unprocessed dependencies have a length
greater than 127

###### See

 - [https://redis.io/docs/management/optimization/memory-optimization/#redis--72](https://redis.io/docs/management/optimization/memory-optimization/#redis--72)
 - [https://docs.bullmq.io/guide/flows#getters](https://docs.bullmq.io/guide/flows#getters)

##### getDependenciesCount()

```ts
getDependenciesCount(opts?): Promise<{
  failed?: number;
  ignored?: number;
  processed?: number;
  unprocessed?: number;
}>;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:418

Get children job counts if this job is a parent and has children.

###### Parameters

###### opts?

###### failed?

`boolean`

###### ignored?

`boolean`

###### processed?

`boolean`

###### unprocessed?

`boolean`

###### Returns

`Promise`\<\{
  `failed?`: `number`;
  `ignored?`: `number`;
  `processed?`: `number`;
  `unprocessed?`: `number`;
\}\>

dependencies count separated by processed, unprocessed, ignored and failed.

##### ~~getFailedChildrenValues()~~

```ts
getFailedChildrenValues(): Promise<{
[jobKey: string]: string;
}>;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:389

Get job's children failure values that were ignored if any.

###### Returns

`Promise`\<\{
\[`jobKey`: `string`\]: `string`;
\}\>

Object mapping children job keys with their failure values.

###### Deprecated

This method is deprecated and will be removed in v6. Use getIgnoredChildrenFailures instead.

##### getIgnoredChildrenFailures()

```ts
getIgnoredChildrenFailures(): Promise<{
[jobKey: string]: string;
}>;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:379

Retrieves the failures of child jobs that were explicitly ignored while using ignoreDependencyOnFailure option.
This method is useful for inspecting which child jobs were intentionally ignored when an error occured.

###### Returns

`Promise`\<\{
\[`jobKey`: `string`\]: `string`;
\}\>

Object mapping children job keys with their failure values.

###### See

[https://docs.bullmq.io/guide/flows/ignore-dependency](https://docs.bullmq.io/guide/flows/ignore-dependency)

##### getState()

```ts
getState(): Promise<JobState | "unknown">;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:338

Get current state.

###### Returns

`Promise`\<`JobState` \| `"unknown"`\>

Returns one of these values:
'completed', 'failed', 'delayed', 'active', 'waiting', 'waiting-children', 'unknown'.

##### isActive()

```ts
isActive(): Promise<boolean>;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:319

###### Returns

`Promise`\<`boolean`\>

true of the job is active.

##### isCompleted()

```ts
isCompleted(): Promise<boolean>;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:303

###### Returns

`Promise`\<`boolean`\>

true if the job has completed.

##### isDelayed()

```ts
isDelayed(): Promise<boolean>;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:311

###### Returns

`Promise`\<`boolean`\>

true if the job is delayed.

##### isFailed()

```ts
isFailed(): Promise<boolean>;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:307

###### Returns

`Promise`\<`boolean`\>

true if the job has failed.

##### isWaiting()

```ts
isWaiting(): Promise<boolean>;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:323

###### Returns

`Promise`\<`boolean`\>

true if the job is waiting.

##### isWaitingChildren()

```ts
isWaitingChildren(): Promise<boolean>;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:315

###### Returns

`Promise`\<`boolean`\>

true if the job is waiting for children.

##### log()

```ts
log(logRow): Promise<number>;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:233

Logs one row of log data.

###### Parameters

###### logRow

`string`

string with log data to be logged.

###### Returns

`Promise`\<`number`\>

The total number of log entries for this job so far.

###### Implementation of

```ts
MinimalJob.log
```

##### moveToCompleted()

```ts
moveToCompleted(
   returnValue, 
   token, 
fetchNext?): Promise<void | any[]>;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:281

Moves a job to the completed queue.
Returned job to be used with Queue.prototype.nextJobFromJobData.

###### Parameters

###### returnValue

`ReturnType`

The jobs success message.

###### token

`string`

Worker token used to acquire completed job.

###### fetchNext?

`boolean`

True when wanting to fetch the next job.

###### Returns

`Promise`\<`void` \| `any`[]\>

Returns the jobData of the next job in the waiting queue or void.

##### moveToDelayed()

```ts
moveToDelayed(timestamp, token?): Promise<void>;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:444

Moves the job to the delay set.

###### Parameters

###### timestamp

`number`

timestamp when the job should be moved back to "wait"

###### token?

`string`

token to check job is locked by current worker

###### Returns

`Promise`\<`void`\>

##### moveToFailed()

```ts
moveToFailed<E>(
   err, 
   token, 
fetchNext?): Promise<void | any[]>;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:298

Moves a job to the failed queue.

###### Type Parameters

###### E

`E` *extends* `Error`

###### Parameters

###### err

`E`

the jobs error message.

###### token

`string`

token to check job is locked by current worker

###### fetchNext?

`boolean`

true when wanting to fetch the next job

###### Returns

`Promise`\<`void` \| `any`[]\>

Returns the jobData of the next job in the waiting queue or void.

##### moveToWait()

```ts
moveToWait(token?): Promise<number>;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:288

Moves a job to the wait or prioritized state.

###### Parameters

###### token?

`string`

Worker token used to acquire completed job.

###### Returns

`Promise`\<`number`\>

Returns pttl.

##### moveToWaitingChildren()

```ts
moveToWaitingChildren(token, opts?): Promise<boolean>;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:452

Moves the job to the waiting-children set.

###### Parameters

###### token

`string`

Token to check job is locked by current worker

###### opts?

`MoveToWaitingChildrenOpts`

The options bag for moving a job to waiting-children.

###### Returns

`Promise`\<`boolean`\>

true if the job was moved

##### promote()

```ts
promote(): Promise<void>;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:456

Promotes a delayed job so that it starts to be processed as soon as possible.

###### Returns

`Promise`\<`void`\>

##### remove()

```ts
remove(opts?): Promise<void>;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:253

Completely remove the job from the queue.
Note, this call will throw an exception if the job
is being processed when the call is performed.

###### Parameters

###### opts?

Options to remove a job

###### removeChildren?

`boolean`

###### Returns

`Promise`\<`void`\>

##### removeChildDependency()

```ts
removeChildDependency(): Promise<boolean>;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:239

Removes child dependency from parent when child is not yet finished

###### Returns

`Promise`\<`boolean`\>

True if the relationship existed and if it was removed.

##### removeDeduplicationKey()

```ts
removeDeduplicationKey(): Promise<boolean>;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:486

Removes a deduplication key if job is still the cause of deduplication.

###### Returns

`Promise`\<`boolean`\>

true if the deduplication key was removed.

##### removeUnprocessedChildren()

```ts
removeUnprocessedChildren(): Promise<void>;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:264

Remove all children from this job that are not yet processed,
in other words that are in any other state than completed, failed or active.

###### Returns

`Promise`\<`void`\>

###### Remarks

- Jobs with locks (most likely active) are ignored.
 - This method can be slow if the number of children is large (\\> 1000).

##### retry()

```ts
retry(state?, opts?): Promise<void>;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:466

Attempts to retry the job. Only a job that has failed or completed can be retried.

###### Parameters

###### state?

`FinishedStatus`

completed / failed

###### opts?

`RetryOptions`

options to retry a job

###### Returns

`Promise`\<`void`\>

A promise that resolves when the job has been successfully moved to the wait queue.
The queue emits a waiting event when the job is successfully moved.

###### Throws

Will throw an error if the job does not exist, is locked, or is not in the expected state.

##### toJSON()

```ts
toJSON(): Omit<this, 
  | "queue"
  | "scripts"
  | "toJSON"
  | "asJSON"
  | "asJSONSandbox"
  | "updateData"
  | "updateProgress"
  | "log"
  | "removeChildDependency"
  | "clearLogs"
  | "remove"
  | "removeUnprocessedChildren"
  | "extendLock"
  | "moveToCompleted"
  | "moveToWait"
  | "moveToFailed"
  | "isCompleted"
  | "isFailed"
  | "isDelayed"
  | "isWaitingChildren"
  | "isActive"
  | "isWaiting"
  | "queueName"
  | "prefix"
  | "getState"
  | "changeDelay"
  | "changePriority"
  | "getChildrenValues"
  | "getIgnoredChildrenFailures"
  | "getFailedChildrenValues"
  | "getDependencies"
  | "getDependenciesCount"
  | "waitUntilFinished"
  | "moveToDelayed"
  | "moveToWaitingChildren"
  | "promote"
  | "retry"
  | "discard"
  | "addJob"
| "removeDeduplicationKey">;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:203

###### Returns

`Omit`\<`this`, 
  \| `"queue"`
  \| `"scripts"`
  \| `"toJSON"`
  \| `"asJSON"`
  \| `"asJSONSandbox"`
  \| `"updateData"`
  \| `"updateProgress"`
  \| `"log"`
  \| `"removeChildDependency"`
  \| `"clearLogs"`
  \| `"remove"`
  \| `"removeUnprocessedChildren"`
  \| `"extendLock"`
  \| `"moveToCompleted"`
  \| `"moveToWait"`
  \| `"moveToFailed"`
  \| `"isCompleted"`
  \| `"isFailed"`
  \| `"isDelayed"`
  \| `"isWaitingChildren"`
  \| `"isActive"`
  \| `"isWaiting"`
  \| `"queueName"`
  \| `"prefix"`
  \| `"getState"`
  \| `"changeDelay"`
  \| `"changePriority"`
  \| `"getChildrenValues"`
  \| `"getIgnoredChildrenFailures"`
  \| `"getFailedChildrenValues"`
  \| `"getDependencies"`
  \| `"getDependenciesCount"`
  \| `"waitUntilFinished"`
  \| `"moveToDelayed"`
  \| `"moveToWaitingChildren"`
  \| `"promote"`
  \| `"retry"`
  \| `"discard"`
  \| `"addJob"`
  \| `"removeDeduplicationKey"`\>

##### updateData()

```ts
updateData(data): Promise<void>;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:220

Updates a job's data

###### Parameters

###### data

`DataType`

the data that will replace the current jobs data.

###### Returns

`Promise`\<`void`\>

###### Implementation of

```ts
MinimalJob.updateData
```

##### updateProgress()

```ts
updateProgress(progress): Promise<void>;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:226

Updates a job's progress

###### Parameters

###### progress

`JobProgress`

number or object to be saved as progress.

###### Returns

`Promise`\<`void`\>

###### Implementation of

```ts
MinimalJob.updateProgress
```

##### updateStacktrace()

```ts
protected updateStacktrace(err): void;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:488

###### Parameters

###### err

`Error`

###### Returns

`void`

##### validateOptions()

```ts
protected validateOptions(jobData): void;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:487

###### Parameters

###### jobData

`JobJson`

###### Returns

`void`

##### waitUntilFinished()

```ts
waitUntilFinished(queueEvents, ttl?): Promise<ReturnType>;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:436

Returns a promise the resolves when the job has completed (containing the return value of the job),
or rejects when the job has failed (containing the failedReason).

###### Parameters

###### queueEvents

`QueueEvents`

Instance of QueueEvents.

###### ttl?

`number`

Time in milliseconds to wait for job to finish before timing out.

###### Returns

`Promise`\<`ReturnType`\>

##### addJobLog()

```ts
static addJobLog(
   queue, 
   jobId, 
   logRow, 
keepLogs?): Promise<number>;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:202

addJobLog

###### Parameters

###### queue

`MinimalQueue`

A minimal queue instance

###### jobId

`string`

Job id

###### logRow

`string`

String with a row of log data to be logged

###### keepLogs?

`number`

The optional amount of log entries to preserve

###### Returns

`Promise`\<`number`\>

The total number of log entries for this job so far.

##### create()

```ts
static create<T, R, N>(
   queue, 
   name, 
   data, 
opts?): Promise<Job<T, R, N>>;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:160

Creates a new job and adds it to the queue.

###### Type Parameters

###### T

`T` = `any`

###### R

`R` = `any`

###### N

`N` *extends* `string` = `string`

###### Parameters

###### queue

`MinimalQueue`

the queue where to add the job.

###### name

`N`

the name of the job.

###### data

`T`

the payload of the job.

###### opts?

`JobsOptions`

the options bag for this job.

###### Returns

`Promise`\<[`Job`](#job)\<`T`, `R`, `N`\>\>

##### createBulk()

```ts
static createBulk<T, R, N>(queue, jobs): Promise<Job<T, R, N>[]>;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:168

Creates a bulk of jobs and adds them atomically to the given queue.

###### Type Parameters

###### T

`T` = `any`

###### R

`R` = `any`

###### N

`N` *extends* `string` = `string`

###### Parameters

###### queue

`MinimalQueue`

the queue were to add the jobs.

###### jobs

`object`[]

an array of jobs to be added to the queue.

###### Returns

`Promise`\<[`Job`](#job)\<`T`, `R`, `N`\>[]\>

##### fromId()

```ts
static fromId<T, R, N>(queue, jobId): Promise<Job<T, R, N>>;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:191

Fetches a Job from the queue given the passed job id.

###### Type Parameters

###### T

`T` = `any`

###### R

`R` = `any`

###### N

`N` *extends* `string` = `string`

###### Parameters

###### queue

`MinimalQueue`

the queue where the job belongs to.

###### jobId

`string`

the job id.

###### Returns

`Promise`\<[`Job`](#job)\<`T`, `R`, `N`\>\>

##### fromJSON()

```ts
static fromJSON<T, R, N>(
   queue, 
   json, 
jobId?): Job<T, R, N>;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:181

Instantiates a Job from a JobJsonRaw object (coming from a deserialized JSON object)

###### Type Parameters

###### T

`T` = `any`

###### R

`R` = `any`

###### N

`N` *extends* `string` = `string`

###### Parameters

###### queue

`MinimalQueue`

the queue where the job belongs to.

###### json

`JobJsonRaw`

the plain object containing the job.

###### jobId?

`string`

an optional job id (overrides the id coming from the JSON object)

###### Returns

[`Job`](#job)\<`T`, `R`, `N`\>

##### optsAsJSON()

```ts
static optsAsJSON(opts?, optsEncode?): RedisJobOptions;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:209

###### Parameters

###### opts?

`JobsOptions`

###### optsEncode?

`Record`\<`string`, `string`\>

###### Returns

`RedisJobOptions`

##### optsFromJSON()

```ts
static optsFromJSON(rawOpts?, optsDecode?): JobsOptions;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:183

###### Parameters

###### rawOpts?

`string`

###### optsDecode?

`Record`\<`string`, `string`\>

###### Returns

`JobsOptions`

***

### QueueClient

Defined in: [packages/core/src/core/queue/QueueClient.ts:20](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/queue/QueueClient.ts#L20)

QueueClient - Wrapper for BullMQ Queue (Producer side)
Used by API Service to add jobs to queues

This class abstracts BullMQ implementation details.
No direct BullMQ calls should be made outside this wrapper.

#### Implements

- [`IQueueClient`](#iqueueclient)

#### Constructors

##### Constructor

```ts
new QueueClient(redisConfig): QueueClient;
```

Defined in: [packages/core/src/core/queue/QueueClient.ts:24](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/queue/QueueClient.ts#L24)

###### Parameters

###### redisConfig

[`RedisConfig`](#redisconfig)

###### Returns

[`QueueClient`](#queueclient)

#### Methods

##### addBulk()

```ts
addBulk<T>(queueName, jobs): Promise<string[]>;
```

Defined in: [packages/core/src/core/queue/QueueClient.ts:71](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/queue/QueueClient.ts#L71)

Add multiple jobs to a queue in bulk

###### Type Parameters

###### T

`T`

###### Parameters

###### queueName

`string`

###### jobs

[`JobData`](#jobdata-1)\<`T`\>[]

###### Returns

`Promise`\<`string`[]\>

###### Implementation of

[`IQueueClient`](#iqueueclient).[`addBulk`](#addbulk-1)

##### addJob()

```ts
addJob<T>(
   queueName, 
   jobName, 
   data, 
options?): Promise<string>;
```

Defined in: [packages/core/src/core/queue/QueueClient.ts:49](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/queue/QueueClient.ts#L49)

Add a single job to a queue

###### Type Parameters

###### T

`T`

###### Parameters

###### queueName

`string`

###### jobName

`string`

###### data

`T`

###### options?

[`JobOptions`](#joboptions)

###### Returns

`Promise`\<`string`\>

###### Implementation of

[`IQueueClient`](#iqueueclient).[`addJob`](#addjob-2)

##### close()

```ts
close(): Promise<void>;
```

Defined in: [packages/core/src/core/queue/QueueClient.ts:146](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/queue/QueueClient.ts#L146)

Close all queue connections

###### Returns

`Promise`\<`void`\>

###### Implementation of

[`IQueueClient`](#iqueueclient).[`close`](#close-2)

##### getJobStatus()

```ts
getJobStatus(queueName, jobId): Promise<JobStatus>;
```

Defined in: [packages/core/src/core/queue/QueueClient.ts:95](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/queue/QueueClient.ts#L95)

Get the status of a specific job

###### Parameters

###### queueName

`string`

###### jobId

`string`

###### Returns

`Promise`\<[`JobStatus`](#jobstatus)\>

###### Implementation of

[`IQueueClient`](#iqueueclient).[`getJobStatus`](#getjobstatus-1)

##### getQueueStatus()

```ts
getQueueStatus(queueName): Promise<QueueStatus>;
```

Defined in: [packages/core/src/core/queue/QueueClient.ts:121](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/queue/QueueClient.ts#L121)

Get queue statistics

###### Parameters

###### queueName

`string`

###### Returns

`Promise`\<[`QueueStatus`](#queuestatus)\>

###### Implementation of

[`IQueueClient`](#iqueueclient).[`getQueueStatus`](#getqueuestatus-2)

***

### QueueManager

Defined in: [packages/core/src/core/queue/QueueManager.ts:34](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/queue/QueueManager.ts#L34)

QueueManager - Wrapper for BullMQ Worker (Consumer side)
Used by Worker Service to process jobs from queues

This class abstracts BullMQ implementation details.
No direct BullMQ calls should be made outside this wrapper.

#### Constructors

##### Constructor

```ts
new QueueManager(redisConfig): QueueManager;
```

Defined in: [packages/core/src/core/queue/QueueManager.ts:40](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/queue/QueueManager.ts#L40)

###### Parameters

###### redisConfig

[`RedisConfig`](#redisconfig)

###### Returns

[`QueueManager`](#queuemanager)

#### Methods

##### cleanQueue()

```ts
cleanQueue(
   queueName, 
   grace?, 
status?): Promise<void>;
```

Defined in: [packages/core/src/core/queue/QueueManager.ts:306](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/queue/QueueManager.ts#L306)

Clean completed/failed jobs from a queue

###### Parameters

###### queueName

`string`

###### grace?

`number` = `0`

###### status?

`"completed"` | `"failed"`

###### Returns

`Promise`\<`void`\>

##### close()

```ts
close(): Promise<void>;
```

Defined in: [packages/core/src/core/queue/QueueManager.ts:318](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/queue/QueueManager.ts#L318)

Close all workers and connections

###### Returns

`Promise`\<`void`\>

##### getQueueStatus()

```ts
getQueueStatus(queueName): Promise<QueueStatus>;
```

Defined in: [packages/core/src/core/queue/QueueManager.ts:248](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/queue/QueueManager.ts#L248)

Get queue status/statistics

###### Parameters

###### queueName

`string`

###### Returns

`Promise`\<[`QueueStatus`](#queuestatus)\>

##### getWorkersStatus()

```ts
getWorkersStatus(): object[];
```

Defined in: [packages/core/src/core/queue/QueueManager.ts:273](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/queue/QueueManager.ts#L273)

Get status of all registered workers

###### Returns

`object`[]

##### pauseQueue()

```ts
pauseQueue(queueName): Promise<void>;
```

Defined in: [packages/core/src/core/queue/QueueManager.ts:290](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/queue/QueueManager.ts#L290)

Pause a queue (stops new jobs from being processed)

###### Parameters

###### queueName

`string`

###### Returns

`Promise`\<`void`\>

##### register()

```ts
register(workerClass): void;
```

Defined in: [packages/core/src/core/queue/QueueManager.ts:72](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/queue/QueueManager.ts#L72)

Register a worker class decorated with

###### Parameters

###### workerClass

[`QueueWorkerConstructor`](#queueworkerconstructor)

###### Returns

`void`

###### Queue Worker

##### resumeQueue()

```ts
resumeQueue(queueName): Promise<void>;
```

Defined in: [packages/core/src/core/queue/QueueManager.ts:298](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/queue/QueueManager.ts#L298)

Resume a paused queue

###### Parameters

###### queueName

`string`

###### Returns

`Promise`\<`void`\>

##### setContainer()

```ts
setContainer(container): void;
```

Defined in: [packages/core/src/core/queue/QueueManager.ts:47](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/queue/QueueManager.ts#L47)

Set the Inversify container for dependency injection

###### Parameters

###### container

`Container`

###### Returns

`void`

##### start()

```ts
start(queueName): void;
```

Defined in: [packages/core/src/core/queue/QueueManager.ts:218](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/queue/QueueManager.ts#L218)

Start a specific worker by queue name

###### Parameters

###### queueName

`string`

###### Returns

`void`

##### startAll()

```ts
startAll(): void;
```

Defined in: [packages/core/src/core/queue/QueueManager.ts:192](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/queue/QueueManager.ts#L192)

Start all registered workers

###### Returns

`void`

##### stop()

```ts
stop(queueName): Promise<void>;
```

Defined in: [packages/core/src/core/queue/QueueManager.ts:233](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/queue/QueueManager.ts#L233)

Stop a specific worker by queue name

###### Parameters

###### queueName

`string`

###### Returns

`Promise`\<`void`\>

##### stopAll()

```ts
stopAll(): Promise<void>;
```

Defined in: [packages/core/src/core/queue/QueueManager.ts:205](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/queue/QueueManager.ts#L205)

Stop all registered workers

###### Returns

`Promise`\<`void`\>

## Interfaces

### IQueueClient

Defined in: [packages/core/src/core/queue/types.ts:134](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/queue/types.ts#L134)

Interface for Queue Client (used by API Service).
Only responsible for adding jobs to queues - never consumes.

#### Methods

##### addBulk()

```ts
addBulk<T>(queueName, jobs): Promise<string[]>;
```

Defined in: [packages/core/src/core/queue/types.ts:156](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/queue/types.ts#L156)

Add multiple jobs to a queue in bulk

###### Type Parameters

###### T

`T`

###### Parameters

###### queueName

`string`

Name of the queue

###### jobs

[`JobData`](#jobdata-1)\<`T`\>[]

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

Defined in: [packages/core/src/core/queue/types.ts:143](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/queue/types.ts#L143)

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

Defined in: [packages/core/src/core/queue/types.ts:174](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/queue/types.ts#L174)

Close all connections

###### Returns

`Promise`\<`void`\>

##### getJobStatus()

```ts
getJobStatus(queueName, jobId): Promise<JobStatus>;
```

Defined in: [packages/core/src/core/queue/types.ts:163](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/queue/types.ts#L163)

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

Defined in: [packages/core/src/core/queue/types.ts:169](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/queue/types.ts#L169)

Get queue statistics

###### Parameters

###### queueName

`string`

Name of the queue

###### Returns

`Promise`\<[`QueueStatus`](#queuestatus)\>

***

### IQueueWorkerHandler

Defined in: [packages/core/src/core/queue/types.ts:101](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/queue/types.ts#L101)

Interface for queue worker handlers

#### Type Parameters

##### T

`T` = `any`

#### Methods

##### onCompleted()?

```ts
optional onCompleted(job, result): void;
```

Defined in: [packages/core/src/core/queue/types.ts:110](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/queue/types.ts#L110)

Called when a job completes successfully

###### Parameters

###### job

[`Job`](#job)\<`T`\>

###### result

`any`

###### Returns

`void`

##### onFailed()?

```ts
optional onFailed(job, error): void;
```

Defined in: [packages/core/src/core/queue/types.ts:115](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/queue/types.ts#L115)

Called when a job fails

###### Parameters

###### job

[`Job`](#job)\<`T`\>

###### error

`Error`

###### Returns

`void`

##### onProgress()?

```ts
optional onProgress(job, progress): void;
```

Defined in: [packages/core/src/core/queue/types.ts:120](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/queue/types.ts#L120)

Called when job progress is updated

###### Parameters

###### job

[`Job`](#job)\<`T`\>

###### progress

`number` | `object`

###### Returns

`void`

##### process()

```ts
process(job): Promise<any>;
```

Defined in: [packages/core/src/core/queue/types.ts:105](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/queue/types.ts#L105)

Process a job from the queue

###### Parameters

###### job

[`Job`](#job)\<`T`\>

###### Returns

`Promise`\<`any`\>

***

### JobData

Defined in: [packages/core/src/core/queue/types.ts:44](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/queue/types.ts#L44)

Job data structure

#### Type Parameters

##### T

`T` = `any`

#### Properties

##### data

```ts
data: T;
```

Defined in: [packages/core/src/core/queue/types.ts:46](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/queue/types.ts#L46)

##### name

```ts
name: string;
```

Defined in: [packages/core/src/core/queue/types.ts:45](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/queue/types.ts#L45)

##### options?

```ts
optional options: JobOptions;
```

Defined in: [packages/core/src/core/queue/types.ts:47](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/queue/types.ts#L47)

***

### JobOptions

Defined in: [packages/core/src/core/queue/types.ts:21](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/queue/types.ts#L21)

Options for adding a job to a queue

#### Properties

##### attempts?

```ts
optional attempts: number;
```

Defined in: [packages/core/src/core/queue/types.ts:25](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/queue/types.ts#L25)

Number of retry attempts on failure

##### backoff?

```ts
optional backoff: object;
```

Defined in: [packages/core/src/core/queue/types.ts:27](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/queue/types.ts#L27)

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

Defined in: [packages/core/src/core/queue/types.ts:23](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/queue/types.ts#L23)

Delay before the job is processed (ms)

##### jobId?

```ts
optional jobId: string;
```

Defined in: [packages/core/src/core/queue/types.ts:38](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/queue/types.ts#L38)

Unique job ID (prevents duplicates)

##### priority?

```ts
optional priority: number;
```

Defined in: [packages/core/src/core/queue/types.ts:32](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/queue/types.ts#L32)

Job priority (lower = higher priority)

##### removeOnComplete?

```ts
optional removeOnComplete: number | boolean;
```

Defined in: [packages/core/src/core/queue/types.ts:34](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/queue/types.ts#L34)

Remove job from queue after completion

##### removeOnFail?

```ts
optional removeOnFail: number | boolean;
```

Defined in: [packages/core/src/core/queue/types.ts:36](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/queue/types.ts#L36)

Remove job from queue after failure

***

### JobStatus

Defined in: [packages/core/src/core/queue/types.ts:53](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/queue/types.ts#L53)

Job status information

#### Properties

##### attemptsMade

```ts
attemptsMade: number;
```

Defined in: [packages/core/src/core/queue/types.ts:61](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/queue/types.ts#L61)

##### data

```ts
data: any;
```

Defined in: [packages/core/src/core/queue/types.ts:58](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/queue/types.ts#L58)

##### failedReason?

```ts
optional failedReason: string;
```

Defined in: [packages/core/src/core/queue/types.ts:60](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/queue/types.ts#L60)

##### id

```ts
id: string;
```

Defined in: [packages/core/src/core/queue/types.ts:54](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/queue/types.ts#L54)

##### name

```ts
name: string;
```

Defined in: [packages/core/src/core/queue/types.ts:55](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/queue/types.ts#L55)

##### progress

```ts
progress: number;
```

Defined in: [packages/core/src/core/queue/types.ts:57](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/queue/types.ts#L57)

##### returnValue?

```ts
optional returnValue: any;
```

Defined in: [packages/core/src/core/queue/types.ts:59](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/queue/types.ts#L59)

##### status

```ts
status: "waiting" | "active" | "completed" | "failed" | "delayed";
```

Defined in: [packages/core/src/core/queue/types.ts:56](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/queue/types.ts#L56)

##### timestamp

```ts
timestamp: number;
```

Defined in: [packages/core/src/core/queue/types.ts:62](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/queue/types.ts#L62)

***

### QueueStatus

Defined in: [packages/core/src/core/queue/types.ts:68](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/queue/types.ts#L68)

Queue status information

#### Properties

##### active

```ts
active: number;
```

Defined in: [packages/core/src/core/queue/types.ts:71](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/queue/types.ts#L71)

##### completed

```ts
completed: number;
```

Defined in: [packages/core/src/core/queue/types.ts:72](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/queue/types.ts#L72)

##### delayed

```ts
delayed: number;
```

Defined in: [packages/core/src/core/queue/types.ts:74](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/queue/types.ts#L74)

##### failed

```ts
failed: number;
```

Defined in: [packages/core/src/core/queue/types.ts:73](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/queue/types.ts#L73)

##### name

```ts
name: string;
```

Defined in: [packages/core/src/core/queue/types.ts:69](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/queue/types.ts#L69)

##### paused

```ts
paused: boolean;
```

Defined in: [packages/core/src/core/queue/types.ts:75](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/queue/types.ts#L75)

##### waiting

```ts
waiting: number;
```

Defined in: [packages/core/src/core/queue/types.ts:70](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/queue/types.ts#L70)

***

### QueueWorkerMetadata

Defined in: [packages/core/src/core/queue/types.ts:93](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/queue/types.ts#L93)

Metadata for

#### Queue Worker

decorator

#### Properties

##### options

```ts
options: WorkerOptions;
```

Defined in: [packages/core/src/core/queue/types.ts:95](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/queue/types.ts#L95)

##### queueName

```ts
queueName: string;
```

Defined in: [packages/core/src/core/queue/types.ts:94](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/queue/types.ts#L94)

***

### RedisConfig

Defined in: [packages/core/src/core/queue/types.ts:6](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/queue/types.ts#L6)

Redis connection configuration

#### Properties

##### db?

```ts
optional db: number;
```

Defined in: [packages/core/src/core/queue/types.ts:10](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/queue/types.ts#L10)

##### host

```ts
host: string;
```

Defined in: [packages/core/src/core/queue/types.ts:7](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/queue/types.ts#L7)

##### password?

```ts
optional password: string;
```

Defined in: [packages/core/src/core/queue/types.ts:9](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/queue/types.ts#L9)

##### port

```ts
port: number;
```

Defined in: [packages/core/src/core/queue/types.ts:8](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/queue/types.ts#L8)

***

### WorkerOptions

Defined in: [packages/core/src/core/queue/types.ts:81](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/queue/types.ts#L81)

Worker configuration options

#### Properties

##### concurrency?

```ts
optional concurrency: number;
```

Defined in: [packages/core/src/core/queue/types.ts:83](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/queue/types.ts#L83)

Number of concurrent jobs to process

##### lockDuration?

```ts
optional lockDuration: number;
```

Defined in: [packages/core/src/core/queue/types.ts:85](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/queue/types.ts#L85)

Lock duration for a job (ms)

##### maxStalledCount?

```ts
optional maxStalledCount: number;
```

Defined in: [packages/core/src/core/queue/types.ts:87](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/queue/types.ts#L87)

Maximum stalled count before failing

## Type Aliases

### QueueWorkerConstructor()

```ts
type QueueWorkerConstructor = (...args) => IQueueWorkerHandler;
```

Defined in: [packages/core/src/core/queue/types.ts:126](https://github.com/theunionsquare/mangojs/blob/3412b539718b0f01f418a81707f87a71a4f4e3cd/packages/core/src/core/queue/types.ts#L126)

Constructor type for queue worker classes

#### Parameters

##### args

...`any`[]

#### Returns

[`IQueueWorkerHandler`](#iqueueworkerhandler)

## References

### QUEUE\_WORKER\_METADATA\_KEY

Re-exports [QUEUE_WORKER_METADATA_KEY](../Decorators/index.md#queue_worker_metadata_key)

***

### QueueWorker

Re-exports [QueueWorker](../../../index.md#queueworker)
