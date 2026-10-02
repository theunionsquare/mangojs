---
sidebar_label: "Overview"
---

# MangoJS Queue System

## Purpose

The Queue System enables distributed asynchronous job processing using BullMQ and Redis. It separates job production (API services) from job consumption (worker services), enabling scalable background processing for tasks like email sending, report generation, and long-running operations.

## Key Concepts

- **Producer-Consumer Pattern**: API services enqueue jobs via `QueueClient`, worker services process them via `QueueManager`
- **BullMQ Abstraction**: Framework wraps BullMQ - direct BullMQ usage not allowed (easy to swap in future)
- **Redis as Broker**: Jobs are stored and coordinated through Redis
- **Service Separation**: `QueueClient` for producers (API), `QueueManager` + `WorkerBuilder` for consumers (Workers)
- **`@QueueWorker` Decorator**: Class-level decorator for defining queue workers with concurrency options

## Documentation

| Document                                       | Description                                                        |
| ---------------------------------------------- | ------------------------------------------------------------------ |
| [Architecture](./architecture.context.md)      | System architecture, producer-consumer pattern, service separation |
| [Decorators](./decorators.context.md)          | `@QueueWorker` decorator and configuration options                 |
| [Worker Handler](./worker-handler.context.md)  | `IQueueWorkerHandler` interface and lifecycle hooks                |
| [WorkerBuilder](./worker-builder.context.md)   | `WorkerBuilder`, `QueueManager`, `QueueClient` setup and API       |
| [Types Reference](./types.context.md)          | All type definitions and interfaces                                |
| [Examples](./examples.context.md)              | Common patterns, complete examples, project structure              |
