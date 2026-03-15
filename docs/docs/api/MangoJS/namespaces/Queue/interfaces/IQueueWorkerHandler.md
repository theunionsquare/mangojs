[**MangoJS**](../../../../README.md)

***

# Interface: IQueueWorkerHandler\<T\>

Defined in: [src/core/queue/types.ts:101](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/queue/types.ts#L101)

Interface for queue worker handlers

## Type Parameters

### T

`T` = `any`

## Methods

### onCompleted()?

```ts
optional onCompleted(job, result): void;
```

Defined in: [src/core/queue/types.ts:110](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/queue/types.ts#L110)

Called when a job completes successfully

#### Parameters

##### job

[`Job`](../../../../interfaces/Job.md)\<`T`\>

##### result

`any`

#### Returns

`void`

***

### onFailed()?

```ts
optional onFailed(job, error): void;
```

Defined in: [src/core/queue/types.ts:115](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/queue/types.ts#L115)

Called when a job fails

#### Parameters

##### job

[`Job`](../../../../interfaces/Job.md)\<`T`\>

##### error

`Error`

#### Returns

`void`

***

### onProgress()?

```ts
optional onProgress(job, progress): void;
```

Defined in: [src/core/queue/types.ts:120](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/queue/types.ts#L120)

Called when job progress is updated

#### Parameters

##### job

[`Job`](../../../../interfaces/Job.md)\<`T`\>

##### progress

`number` | `object`

#### Returns

`void`

***

### process()

```ts
process(job): Promise<any>;
```

Defined in: [src/core/queue/types.ts:105](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/queue/types.ts#L105)

Process a job from the queue

#### Parameters

##### job

[`Job`](../../../../interfaces/Job.md)\<`T`\>

#### Returns

`Promise`\<`any`\>
