---
sidebar_label: Decorators
---

# Decorators

Decorator utilities for HTTP, auth, queue, and scheduler

## Namespaces

- [Auth](namespaces/Auth/index.md)

## Variables

### QUEUE\_WORKER\_METADATA\_KEY

```ts
const QUEUE_WORKER_METADATA_KEY: typeof QUEUE_WORKER_METADATA_KEY;
```

Defined in: [packages/core/src/core/decorators/queue/queueWorker.decorator.ts:5](https://github.com/theunionsquare/mangojs/blob/2e89580cb8318934c1d350324df2c6685212ddd9/packages/core/src/core/decorators/queue/queueWorker.decorator.ts#L5)

## Functions

### ~~loggedMethod()~~

```ts
function loggedMethod(): any;
```

Defined in: [packages/core/src/core/decorators/logger.decorator.ts:7](https://github.com/theunionsquare/mangojs/blob/2e89580cb8318934c1d350324df2c6685212ddd9/packages/core/src/core/decorators/logger.decorator.ts#L7)

Method decorator that logs method calls with timestamps.

#### Returns

`any`

#### Deprecated

Use the Loggers module for proper logging instead.
This decorator uses console.log which is not suitable for production.

## References

### Controller

Re-exports [Controller](../../../index.md#controller)

***

### Delete

Re-exports [Delete](../../../index.md#delete-2)

***

### Get

Re-exports [Get](../../../index.md#get-3)

***

### IRouter

Re-exports [IRouter](../../../index.md#irouter)

***

### Methods

Re-exports [Methods](../../../index.md#methods)

***

### Middleware

Re-exports [Middleware](../../../index.md#middleware)

***

### Post

Re-exports [Post](../../../index.md#post-1)

***

### Put

Re-exports [Put](../../../index.md#put-1)

***

### QueueWorker

Re-exports [QueueWorker](../../../index.md#queueworker)

***

### Schedule

Re-exports [Schedule](../../../index.md#schedule)

***

### Use

Re-exports [Use](../../../index.md#use)
