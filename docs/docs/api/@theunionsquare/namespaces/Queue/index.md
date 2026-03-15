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

- [IQueueClient](interfaces/IQueueClient.md)
- [IQueueWorkerHandler](interfaces/IQueueWorkerHandler.md)
- [JobData](interfaces/JobData.md)
- [JobOptions](interfaces/JobOptions.md)
- [JobStatus](interfaces/JobStatus.md)
- [QueueStatus](interfaces/QueueStatus.md)
- [QueueWorkerMetadata](interfaces/QueueWorkerMetadata.md)
- [RedisConfig](interfaces/RedisConfig.md)
- [WorkerOptions](interfaces/WorkerOptions.md)

## Type Aliases

- [QueueWorkerConstructor](type-aliases/QueueWorkerConstructor.md)

## References

### Job

Re-exports [Job](../../../interfaces/Job.md)

***

### QUEUE\_WORKER\_METADATA\_KEY

Re-exports [QUEUE_WORKER_METADATA_KEY](../Decorators/variables/QUEUE_WORKER_METADATA_KEY.md)

***

### QueueClient

Re-exports [QueueClient](../../../classes/QueueClient.md)

***

### QueueManager

Re-exports [QueueManager](../../../classes/QueueManager.md)

***

### QueueWorker

Re-exports [QueueWorker](../../../functions/QueueWorker.md)
