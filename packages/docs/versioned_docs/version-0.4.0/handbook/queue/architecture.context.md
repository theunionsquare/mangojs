---
sidebar_label: "Architecture"
---

# Queue System Architecture

## Overview

The MangoJS Queue System implements a **producer-consumer pattern** for distributed job processing. This architecture enables horizontal scaling by separating job creation from job execution.

## System Architecture

```
┌─────────────────────────────────────┐
│           API SERVICE               │
│         (ServerBuilder)             │
│                                     │
│  Uses:                              │
│    QueueClient.addJob()             │
│    QueueClient.addBulk()            │
│    QueueClient.getJobStatus()       │
│                                     │
└──────────────┬──────────────────────┘
               │
               │  publish jobs
               ▼
┌─────────────────────────────────────┐
│             REDIS                   │
│                                     │
│   Queues:                           │
│     • email-queue                   │
│     • report-queue                  │
│     • notification-queue            │
│                                     │
└──────────────┬──────────────────────┘
               │
               │  consume jobs
               ▼
┌─────────────────────────────────────┐
│          WORKER SERVICE             │
│         (WorkerBuilder)             │
│                                     │
│  Uses:                              │
│    @QueueWorker decorator           │
│    process(job): Promise<void>      │
│    onCompleted, onFailed hooks      │
│                                     │
└─────────────────────────────────────┘
```

## Core Components

### Producer Side (API Service)

| Component       | Purpose                                             |
| --------------- | --------------------------------------------------- |
| `QueueClient`   | Adds jobs to queues, checks job status              |
| `ServerBuilder` | Builds and runs the API service                     |
| Controllers     | Inject `QueueClient` to enqueue jobs from endpoints |

The API service **only produces jobs** - it never processes them. This allows the API to remain responsive while offloading heavy work.

### Consumer Side (Worker Service)

| Component              | Purpose                                    |
| ---------------------- | ------------------------------------------ |
| `WorkerBuilder`        | Builds and runs the worker service         |
| `QueueManager`         | Manages worker lifecycle, queue operations |
| `@QueueWorker` classes | Process jobs from specific queues          |

The Worker service **only consumes jobs** - it pulls jobs from Redis and processes them using decorated handler classes.

### Message Broker (Redis)

Redis acts as the central message broker:

- **Job Storage**: Jobs are persisted until processed
- **Queue Management**: Maintains separate queues by name
- **State Tracking**: Tracks job status (waiting, active, completed, failed, delayed)
- **Distributed Locking**: Ensures only one worker processes a job at a time

## Service Separation

API and Worker services **MUST be separate deployments**:

```
┌──────────────────┐     ┌──────────────────┐     ┌──────────────────┐
│   API Instance   │     │   API Instance   │     │   API Instance   │
│    (Producer)    │     │    (Producer)    │     │    (Producer)    │
└────────┬─────────┘     └────────┬─────────┘     └────────┬─────────┘
         │                        │                        │
         └────────────────────────┼────────────────────────┘
                                  │
                                  ▼
                        ┌──────────────────┐
                        │      REDIS       │
                        └────────┬─────────┘
                                 │
         ┌───────────────────────┼───────────────────────┐
         │                       │                       │
         ▼                       ▼                       ▼
┌──────────────────┐     ┌──────────────────┐     ┌──────────────────┐
│ Worker Instance  │     │ Worker Instance  │     │ Worker Instance  │
│   (Consumer)     │     │   (Consumer)     │     │   (Consumer)     │
└──────────────────┘     └──────────────────┘     └──────────────────┘
```

### Why Separate Services?

1. **Independent Scaling**: Scale API and workers independently based on load
2. **Resource Isolation**: CPU-intensive jobs don't affect API response times
3. **Fault Tolerance**: Worker failures don't crash the API
4. **Deployment Flexibility**: Deploy workers closer to resources they need (databases, external APIs)

## Job Flow

```
1. Request → API Controller
2. Controller → QueueClient.addJob()
3. QueueClient → Redis (job stored)
4. API → Response to client (immediate)
5. Worker polls Redis
6. Worker → process(job)
7. Worker → onCompleted/onFailed
8. Redis updates job status
```

## Infrastructure Requirements

The queue system requires a **Redis instance** as the message broker. Both API and Worker services must connect to the same Redis instance.

```bash
# Docker
docker run -d -p 6379:6379 redis

# Docker Compose
services:
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
```

## Queue Naming Convention

Use descriptive, kebab-case names for queues:

| Good                 | Bad             |
| -------------------- | --------------- |
| `email-queue`        | `EmailQueue`    |
| `report-generation`  | `reportGen`     |
| `user-notifications` | `notifications` |

The queue name **must match exactly** between producer and consumer.

## Related

- [WorkerBuilder](./worker-builder.context.md) - Setting up producer and consumer services
- [Decorators](./decorators.context.md) - `@QueueWorker` decorator details
- [Examples](./examples.context.md) - Complete implementation examples
