---
sidebar_label: Job
---

# Interface: Job\<DataType, ReturnType, NameType\>

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:15

Job

This class represents a Job in the queue. Normally job are implicitly created when
you add a job to the queue with methods such as Queue.addJob( ... )

A Job instance is also passed to the Worker's process function.

## Type Parameters

### DataType

`DataType` = `any`

### ReturnType

`ReturnType` = `any`

### NameType

`NameType` *extends* `string` = `string`

## Implements

- `MinimalJob`\<`DataType`, `ReturnType`, `NameType`\>

## Properties

### attemptsMade

```ts
attemptsMade: number;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:75

Number of attempts after the job has failed.

#### Default Value

```ts
0
```

#### Implementation of

```ts
MinimalJob.attemptsMade
```

***

### attemptsStarted

```ts
attemptsStarted: number;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:70

Number of attempts when job is moved to active.

#### Default Value

```ts
0
```

***

### data

```ts
data: DataType;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:24

The payload for this job.

#### Implementation of

```ts
MinimalJob.data
```

***

### ~~debounceId?~~

```ts
optional debounceId: string;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:110

Debounce identifier.

#### Deprecated

use deduplicationId

***

### deduplicationId?

```ts
optional deduplicationId: string;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:114

Deduplication identifier.

***

### deferredFailure

```ts
deferredFailure: string;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:89

Deferred failure. Stores a failed message and marks this job to be failed directly
as soon as the job is picked up by a worker, and using this string as the failed reason.

***

### delay

```ts
delay: number;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:54

An amount of milliseconds to wait until this job can be processed.

#### Default Value

```ts
0
```

#### Implementation of

```ts
MinimalJob.delay
```

***

### ~~discarded~~

```ts
protected discarded: boolean;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:136

#### Deprecated

use UnrecoverableError

***

### failedReason

```ts
failedReason: string;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:84

Reason for failing.

#### Implementation of

```ts
MinimalJob.failedReason
```

***

### finishedOn?

```ts
optional finishedOn: number;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:93

Timestamp for when the job finished (completed or failed).

#### Implementation of

```ts
MinimalJob.finishedOn
```

***

### id?

```ts
optional id: string;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:29

#### Implementation of

```ts
MinimalJob.id
```

***

### name

```ts
name: NameType;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:20

The name of the Job

#### Implementation of

```ts
MinimalJob.name
```

***

### nextRepeatableJobId?

```ts
optional nextRepeatableJobId: string;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:123

Produced next repetable job Id.

***

### opts

```ts
opts: JobsOptions;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:28

The options object for this job.

#### Implementation of

```ts
MinimalJob.opts
```

***

### parent?

```ts
optional parent: ParentKeys;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:105

Object that contains parentId (id) and parent queueKey.

#### Implementation of

```ts
MinimalJob.parent
```

***

### parentKey?

```ts
optional parentKey: string;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:101

Fully qualified key (including the queue prefix) pointing to the parent of this job.

#### Implementation of

```ts
MinimalJob.parentKey
```

***

### priority

```ts
priority: number;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:61

Ranges from 0 (highest priority) to 2 097 152 (lowest priority). Note that
using priorities has a slight impact on performance,
so do not use it if not required.

#### Default Value

```ts
0
```

***

### processedBy?

```ts
optional processedBy: string;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:131

The worker name that is processing or processed this job.

***

### processedOn?

```ts
optional processedOn: number;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:97

Timestamp for when the job was processed.

#### Implementation of

```ts
MinimalJob.processedOn
```

***

### progress

```ts
progress: JobProgress;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:39

The progress a job has performed so far.

#### Default Value

```ts
0
```

#### Implementation of

```ts
MinimalJob.progress
```

***

### queue

```ts
protected queue: MinimalQueue;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:16

***

### queueQualifiedName

```ts
readonly queueQualifiedName: string;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:34

It includes the prefix, the namespace separator :, and queue name.

#### See

[https://www.gnu.org/software/gawk/manual/html\_node/Qualified-Names.html](https://www.gnu.org/software/gawk/manual/html_node/Qualified-Names.html)

#### Implementation of

```ts
MinimalJob.queueQualifiedName
```

***

### repeatJobKey?

```ts
optional repeatJobKey: string;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:118

Base repeat job key.

#### Implementation of

```ts
MinimalJob.repeatJobKey
```

***

### returnvalue

```ts
returnvalue: ReturnType;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:44

The value returned by the processor when processing this job.

#### Default Value

```ts
null
```

#### Implementation of

```ts
MinimalJob.returnvalue
```

***

### scripts

```ts
protected scripts: Scripts;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:137

***

### stacktrace

```ts
stacktrace: string[];
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:49

Stacktrace for the error (for failed jobs).

#### Default Value

```ts
null
```

#### Implementation of

```ts
MinimalJob.stacktrace
```

***

### stalledCounter

```ts
stalledCounter: number;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:80

Number of times where job has stalled.

#### Default Value

```ts
0
```

***

### timestamp

```ts
timestamp: number;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:65

Timestamp when the job was created (unless overridden with job options).

#### Implementation of

```ts
MinimalJob.timestamp
```

***

### token?

```ts
optional token: string;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:127

The token used for locking this job.

***

### toKey()

```ts
protected toKey: (type) => string;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:132

#### Parameters

##### type

`string`

#### Returns

`string`

## Accessors

### prefix

#### Get Signature

```ts
get prefix(): string;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:331

##### Returns

`string`

the prefix that is used.

#### Implementation of

```ts
MinimalJob.prefix
```

***

### queueName

#### Get Signature

```ts
get queueName(): string;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:327

##### Returns

`string`

the queue name this job belongs to.

#### Implementation of

```ts
MinimalJob.queueName
```

## Methods

### addJob()

```ts
addJob(client, parentOpts?): Promise<string>;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:481

Adds the job to Redis.

#### Parameters

##### client

`RedisClient`

##### parentOpts?

`ParentKeyOpts`

#### Returns

`Promise`\<`string`\>

***

### asJSON()

```ts
asJSON(): JobJson;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:208

Prepares a job to be serialized for storage in Redis.

#### Returns

`JobJson`

#### Implementation of

```ts
MinimalJob.asJSON
```

***

### asJSONSandbox()

```ts
asJSONSandbox(): JobJsonSandbox;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:214

Prepares a job to be passed to Sandbox.

#### Returns

`JobJsonSandbox`

#### Implementation of

```ts
MinimalJob.asJSONSandbox
```

***

### changeDelay()

```ts
changeDelay(delay): Promise<void>;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:353

Change delay of a delayed job.

Reschedules a delayed job by setting a new delay from the current time.
For example, calling changeDelay(5000) will reschedule the job to execute
5000 milliseconds (5 seconds) from now, regardless of the original delay.

#### Parameters

##### delay

`number`

milliseconds from now when the job should be processed.

#### Returns

`Promise`\<`void`\>

void

#### Throws

JobNotExist
This exception is thrown if jobId is missing.

#### Throws

JobNotInState
This exception is thrown if job is not in delayed state.

***

### changePriority()

```ts
changePriority(opts): Promise<void>;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:360

Change job priority.

#### Parameters

##### opts

options containing priority and lifo values.

###### lifo?

`boolean`

###### priority?

`number`

#### Returns

`Promise`\<`void`\>

void

***

### clearLogs()

```ts
clearLogs(keepLogs?): Promise<void>;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:245

Clears job's logs

#### Parameters

##### keepLogs?

`number`

the amount of log entries to preserve

#### Returns

`Promise`\<`void`\>

***

### createScripts()

```ts
protected createScripts(): void;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:182

#### Returns

`void`

***

### ~~discard()~~

```ts
discard(): void;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:471

Marks a job to not be retried if it fails (even if attempts has been configured)

#### Returns

`void`

#### Deprecated

use UnrecoverableError

***

### extendLock()

```ts
extendLock(token, duration): Promise<number>;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:271

Extend the lock for this job.

#### Parameters

##### token

`string`

unique token for the lock

##### duration

`number`

lock duration in milliseconds

#### Returns

`Promise`\<`number`\>

***

### getChildrenValues()

```ts
getChildrenValues<CT>(): Promise<{
[jobKey: string]: CT;
}>;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:369

Get this jobs children result values if any.

#### Type Parameters

##### CT

`CT` = `any`

#### Returns

`Promise`\<\{
\[`jobKey`: `string`\]: `CT`;
\}\>

Object mapping children job keys with their values.

***

### getDependencies()

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

#### Parameters

##### opts?

`DependenciesOpts`

#### Returns

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

#### Remarks

Count options before Redis v7.2 works as expected with any quantity of entries
on processed/unprocessed dependencies, since v7.2 you must consider that count
won't have any effect until processed/unprocessed dependencies have a length
greater than 127

#### See

 - [https://redis.io/docs/management/optimization/memory-optimization/#redis--72](https://redis.io/docs/management/optimization/memory-optimization/#redis--72)
 - [https://docs.bullmq.io/guide/flows#getters](https://docs.bullmq.io/guide/flows#getters)

***

### getDependenciesCount()

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

#### Parameters

##### opts?

###### failed?

`boolean`

###### ignored?

`boolean`

###### processed?

`boolean`

###### unprocessed?

`boolean`

#### Returns

`Promise`\<\{
  `failed?`: `number`;
  `ignored?`: `number`;
  `processed?`: `number`;
  `unprocessed?`: `number`;
\}\>

dependencies count separated by processed, unprocessed, ignored and failed.

***

### ~~getFailedChildrenValues()~~

```ts
getFailedChildrenValues(): Promise<{
[jobKey: string]: string;
}>;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:389

Get job's children failure values that were ignored if any.

#### Returns

`Promise`\<\{
\[`jobKey`: `string`\]: `string`;
\}\>

Object mapping children job keys with their failure values.

#### Deprecated

This method is deprecated and will be removed in v6. Use getIgnoredChildrenFailures instead.

***

### getIgnoredChildrenFailures()

```ts
getIgnoredChildrenFailures(): Promise<{
[jobKey: string]: string;
}>;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:379

Retrieves the failures of child jobs that were explicitly ignored while using ignoreDependencyOnFailure option.
This method is useful for inspecting which child jobs were intentionally ignored when an error occured.

#### Returns

`Promise`\<\{
\[`jobKey`: `string`\]: `string`;
\}\>

Object mapping children job keys with their failure values.

#### See

[https://docs.bullmq.io/guide/flows/ignore-dependency](https://docs.bullmq.io/guide/flows/ignore-dependency)

***

### getState()

```ts
getState(): Promise<JobState | "unknown">;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:338

Get current state.

#### Returns

`Promise`\<`JobState` \| `"unknown"`\>

Returns one of these values:
'completed', 'failed', 'delayed', 'active', 'waiting', 'waiting-children', 'unknown'.

***

### isActive()

```ts
isActive(): Promise<boolean>;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:319

#### Returns

`Promise`\<`boolean`\>

true of the job is active.

***

### isCompleted()

```ts
isCompleted(): Promise<boolean>;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:303

#### Returns

`Promise`\<`boolean`\>

true if the job has completed.

***

### isDelayed()

```ts
isDelayed(): Promise<boolean>;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:311

#### Returns

`Promise`\<`boolean`\>

true if the job is delayed.

***

### isFailed()

```ts
isFailed(): Promise<boolean>;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:307

#### Returns

`Promise`\<`boolean`\>

true if the job has failed.

***

### isWaiting()

```ts
isWaiting(): Promise<boolean>;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:323

#### Returns

`Promise`\<`boolean`\>

true if the job is waiting.

***

### isWaitingChildren()

```ts
isWaitingChildren(): Promise<boolean>;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:315

#### Returns

`Promise`\<`boolean`\>

true if the job is waiting for children.

***

### log()

```ts
log(logRow): Promise<number>;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:233

Logs one row of log data.

#### Parameters

##### logRow

`string`

string with log data to be logged.

#### Returns

`Promise`\<`number`\>

The total number of log entries for this job so far.

#### Implementation of

```ts
MinimalJob.log
```

***

### moveToCompleted()

```ts
moveToCompleted(
   returnValue, 
   token, 
fetchNext?): Promise<void | any[]>;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:281

Moves a job to the completed queue.
Returned job to be used with Queue.prototype.nextJobFromJobData.

#### Parameters

##### returnValue

`ReturnType`

The jobs success message.

##### token

`string`

Worker token used to acquire completed job.

##### fetchNext?

`boolean`

True when wanting to fetch the next job.

#### Returns

`Promise`\<`void` \| `any`[]\>

Returns the jobData of the next job in the waiting queue or void.

***

### moveToDelayed()

```ts
moveToDelayed(timestamp, token?): Promise<void>;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:444

Moves the job to the delay set.

#### Parameters

##### timestamp

`number`

timestamp when the job should be moved back to "wait"

##### token?

`string`

token to check job is locked by current worker

#### Returns

`Promise`\<`void`\>

***

### moveToFailed()

```ts
moveToFailed<E>(
   err, 
   token, 
fetchNext?): Promise<void | any[]>;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:298

Moves a job to the failed queue.

#### Type Parameters

##### E

`E` *extends* `Error`

#### Parameters

##### err

`E`

the jobs error message.

##### token

`string`

token to check job is locked by current worker

##### fetchNext?

`boolean`

true when wanting to fetch the next job

#### Returns

`Promise`\<`void` \| `any`[]\>

Returns the jobData of the next job in the waiting queue or void.

***

### moveToWait()

```ts
moveToWait(token?): Promise<number>;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:288

Moves a job to the wait or prioritized state.

#### Parameters

##### token?

`string`

Worker token used to acquire completed job.

#### Returns

`Promise`\<`number`\>

Returns pttl.

***

### moveToWaitingChildren()

```ts
moveToWaitingChildren(token, opts?): Promise<boolean>;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:452

Moves the job to the waiting-children set.

#### Parameters

##### token

`string`

Token to check job is locked by current worker

##### opts?

`MoveToWaitingChildrenOpts`

The options bag for moving a job to waiting-children.

#### Returns

`Promise`\<`boolean`\>

true if the job was moved

***

### promote()

```ts
promote(): Promise<void>;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:456

Promotes a delayed job so that it starts to be processed as soon as possible.

#### Returns

`Promise`\<`void`\>

***

### remove()

```ts
remove(opts?): Promise<void>;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:253

Completely remove the job from the queue.
Note, this call will throw an exception if the job
is being processed when the call is performed.

#### Parameters

##### opts?

Options to remove a job

###### removeChildren?

`boolean`

#### Returns

`Promise`\<`void`\>

***

### removeChildDependency()

```ts
removeChildDependency(): Promise<boolean>;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:239

Removes child dependency from parent when child is not yet finished

#### Returns

`Promise`\<`boolean`\>

True if the relationship existed and if it was removed.

***

### removeDeduplicationKey()

```ts
removeDeduplicationKey(): Promise<boolean>;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:486

Removes a deduplication key if job is still the cause of deduplication.

#### Returns

`Promise`\<`boolean`\>

true if the deduplication key was removed.

***

### removeUnprocessedChildren()

```ts
removeUnprocessedChildren(): Promise<void>;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:264

Remove all children from this job that are not yet processed,
in other words that are in any other state than completed, failed or active.

#### Returns

`Promise`\<`void`\>

#### Remarks

- Jobs with locks (most likely active) are ignored.
 - This method can be slow if the number of children is large (\\> 1000).

***

### retry()

```ts
retry(state?, opts?): Promise<void>;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:466

Attempts to retry the job. Only a job that has failed or completed can be retried.

#### Parameters

##### state?

`FinishedStatus`

completed / failed

##### opts?

`RetryOptions`

options to retry a job

#### Returns

`Promise`\<`void`\>

A promise that resolves when the job has been successfully moved to the wait queue.
The queue emits a waiting event when the job is successfully moved.

#### Throws

Will throw an error if the job does not exist, is locked, or is not in the expected state.

***

### toJSON()

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

#### Returns

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

***

### updateData()

```ts
updateData(data): Promise<void>;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:220

Updates a job's data

#### Parameters

##### data

`DataType`

the data that will replace the current jobs data.

#### Returns

`Promise`\<`void`\>

#### Implementation of

```ts
MinimalJob.updateData
```

***

### updateProgress()

```ts
updateProgress(progress): Promise<void>;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:226

Updates a job's progress

#### Parameters

##### progress

`JobProgress`

number or object to be saved as progress.

#### Returns

`Promise`\<`void`\>

#### Implementation of

```ts
MinimalJob.updateProgress
```

***

### updateStacktrace()

```ts
protected updateStacktrace(err): void;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:488

#### Parameters

##### err

`Error`

#### Returns

`void`

***

### validateOptions()

```ts
protected validateOptions(jobData): void;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:487

#### Parameters

##### jobData

`JobJson`

#### Returns

`void`

***

### waitUntilFinished()

```ts
waitUntilFinished(queueEvents, ttl?): Promise<ReturnType>;
```

Defined in: node\_modules/.pnpm/bullmq@5.66.5/node\_modules/bullmq/dist/esm/classes/job.d.ts:436

Returns a promise the resolves when the job has completed (containing the return value of the job),
or rejects when the job has failed (containing the failedReason).

#### Parameters

##### queueEvents

`QueueEvents`

Instance of QueueEvents.

##### ttl?

`number`

Time in milliseconds to wait for job to finish before timing out.

#### Returns

`Promise`\<`ReturnType`\>
