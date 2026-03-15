[**MangoJS**](../README.md)

***

# Function: QueueWorker()

```ts
function QueueWorker(queueName, options?): <T>(target) => T;
```

Defined in: src/core/decorators/queue/queueWorker.decorator.ts:24

## Parameters

### queueName

`string`

Name of the queue to consume from

### options?

[`WorkerOptions`](../MangoJS/namespaces/Queue/interfaces/WorkerOptions.md) = `{}`

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
