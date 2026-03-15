# Function: QueueWorker()

```ts
function QueueWorker(queueName, options?): <T>(target) => T;
```

Defined in: [src/core/decorators/queue/queueWorker.decorator.ts:24](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/decorators/queue/queueWorker.decorator.ts#L24)

## Parameters

### queueName

`string`

Name of the queue to consume from

### options?

[`WorkerOptions`](../@theunionsquare/namespaces/Queue/interfaces/WorkerOptions.md) = `{}`

Worker configuration options

## Returns

```ts
<T>(target): T;
```

### Type Parameters

#### T

`T` *extends* (...`args`) => `unknown`

### Parameters

#### target

`T`

### Returns

`T`

## Queue Worker

decorator
Marks a class as a queue worker handler.

## Example

```typescript
@QueueWorker('email-queue', { concurrency: 5 })
export class EmailWorker implements IQueueWorkerHandler {
  async process(job: Job<EmailPayload>): Promise<void> {
    await sendEmail(job.data)
  }
}
```
