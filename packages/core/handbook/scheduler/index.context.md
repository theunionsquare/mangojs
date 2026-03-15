---
sidebar_label: "Overview"
---

# MangoJS Scheduler System

## Purpose

The Scheduler System enables cron-based task scheduling using node-schedule. It allows you to define recurring tasks that run automatically based on cron expressions, with support for timezones, lifecycle hooks, and optional worker thread execution.

## Key Concepts

- **Cron-Based Scheduling**: Tasks are scheduled using standard cron expressions (e.g., `'0 * * * *'` for every hour)
- **node-schedule Abstraction**: Framework wraps node-schedule - direct usage not required
- **`@Schedule` Decorator**: Class-level decorator for defining scheduled tasks with cron and options
- **`ScheduledTask` Base Class**: Abstract class providing lifecycle hooks (onStart, onComplete, onError)
- **`ScheduleRegistry`**: Central registry for managing task registration, starting, and stopping
- **Execution Modes**: Run tasks in main thread (default, supports DI) or worker thread (isolated, no DI)

## Documentation

| Document                                              | Description                                                |
| ----------------------------------------------------- | ---------------------------------------------------------- |
| [Architecture](./architecture.context.md)             | System architecture, execution modes, node-schedule usage  |
| [Decorators](./decorators.context.md)                 | `@Schedule` decorator and configuration options            |
| [Scheduled Task](./scheduled-task.context.md)         | `ScheduledTask` base class and lifecycle hooks             |
| [Schedule Registry](./schedule-registry.context.md)   | `ScheduleRegistry` setup and API                           |
| [Types Reference](./types.context.md)                 | All type definitions and interfaces                        |
| [Examples](./examples.context.md)                     | Common patterns, complete examples, project structure      |
