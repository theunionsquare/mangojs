---
sidebar_label: "Architecture"
---

# Scheduler System Architecture

## Overview

The MangoJS Scheduler System provides cron-based task scheduling within your application. Unlike the Queue System (which uses producer-consumer across services), the Scheduler runs tasks directly within the same process using node-schedule.

## System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    APPLICATION                          │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │              ScheduleRegistry                    │   │
│  │                                                  │   │
│  │  • Registers @Schedule decorated classes         │   │
│  │  • Creates node-schedule cron jobs               │   │
│  │  • Manages task lifecycle (start/stop)           │   │
│  │  • Tracks task status and execution history      │   │
│  └──────────────────────┬──────────────────────────┘   │
│                         │                               │
│           ┌─────────────┴─────────────┐                │
│           │                           │                 │
│           ▼                           ▼                 │
│  ┌─────────────────┐         ┌─────────────────┐       │
│  │   Main Thread   │         │  Worker Thread  │       │
│  │   Execution     │         │   Execution     │       │
│  │                 │         │                 │       │
│  │  • Full DI      │         │  • Isolated     │       │
│  │  • Shared state │         │  • No DI        │       │
│  │  • Default mode │         │  • CPU-bound    │       │
│  └─────────────────┘         └─────────────────┘       │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

## Core Components

| Component          | Purpose                                                    |
| ------------------ | ---------------------------------------------------------- |
| `@Schedule`        | Decorator to define cron expression and task options       |
| `ScheduledTask`    | Abstract base class for task implementations               |
| `ScheduleRegistry` | Manages task registration, scheduling, and lifecycle       |
| `TaskRunner`       | Handles task execution in main or worker thread            |

## Execution Modes

### Main Thread (Default)

Tasks run in the main Node.js thread with full access to dependency injection and shared application state.

```typescript
@Schedule('0 * * * *', { execution: 'main' }) // Default
@injectable()
export class CleanupTask extends ScheduledTask {
  @inject(INVERSITY_TYPES.Database)
  private database: IDatabase;

  async run(): Promise<void> {
    // Full DI available
    await this.database.cleanup();
  }
}
```

**Use for:**
- Tasks requiring injected services
- Database operations
- Tasks that need shared state
- Most typical use cases

### Worker Thread

Tasks run in an isolated Worker Thread. No dependency injection available.

```typescript
@Schedule('*/5 * * * *', { execution: 'worker' })
@injectable()
export class HeavyComputationTask extends ScheduledTask {
  async run(): Promise<void> {
    // No DI - self-contained logic only
    await this.computeIntensiveOperation();
  }

  private async computeIntensiveOperation(): Promise<void> {
    // CPU-bound work that shouldn't block main thread
  }
}
```

**Use for:**
- CPU-intensive computations
- Operations that shouldn't block the main thread
- Self-contained tasks without external dependencies

**Limitations:**
- No access to injected services
- No shared state with main application
- Task class is serialized to worker

## Task Lifecycle

```
1. Register task class with ScheduleRegistry
2. ScheduleRegistry reads @Schedule metadata
3. On startAll() or start(name):
   - Task instance created
   - node-schedule job created with cron expression
4. On each cron trigger:
   - onStart() hook called
   - run() method executed
   - onComplete() or onError() called based on result
5. On stopAll() or stop(name):
   - node-schedule job cancelled
   - Task marked as stopped
```

## Comparison: Scheduler vs Queue

| Aspect            | Scheduler                      | Queue                                |
| ----------------- | ------------------------------ | ------------------------------------ |
| Trigger           | Time-based (cron)              | Event-based (job added)              |
| Distribution      | Single process                 | Multi-process (producer-consumer)    |
| Use Case          | Recurring maintenance tasks    | On-demand background processing      |
| Retry             | Manual (in task logic)         | Built-in (BullMQ)                    |
| State             | In-memory                      | Persisted in Redis                   |
| Scaling           | Single instance                | Multiple workers                     |

## Cron Expression Reference

```
┌────────────── second (0-59) [optional]
│ ┌──────────── minute (0-59)
│ │ ┌────────── hour (0-23)
│ │ │ ┌──────── day of month (1-31)
│ │ │ │ ┌────── month (1-12)
│ │ │ │ │ ┌──── day of week (0-7, 0 and 7 are Sunday)
│ │ │ │ │ │
* * * * * *
```

| Expression      | Description               |
| --------------- | ------------------------- |
| `* * * * *`     | Every minute              |
| `0 * * * *`     | Every hour                |
| `0 0 * * *`     | Every day at midnight     |
| `0 0 * * 0`     | Every Sunday at midnight  |
| `0 0 1 * *`     | First day of every month  |
| `*/5 * * * *`   | Every 5 minutes           |
| `0 9-17 * * *`  | Every hour 9 AM - 5 PM    |
| `0 0 * * 1-5`   | Weekdays at midnight      |

## Related

- [Decorators](./decorators.context.md) - `@Schedule` decorator details
- [Scheduled Task](./scheduled-task.context.md) - Base class and lifecycle hooks
- [Schedule Registry](./schedule-registry.context.md) - Registry API
- [Examples](./examples.context.md) - Complete implementation examples
