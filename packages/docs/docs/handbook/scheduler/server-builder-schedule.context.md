---
sidebar_label: "ServerBuilder Integration"
---

# ServerBuilder Scheduler Integration

## Overview

The simplest way to use scheduled tasks is through `ServerBuilder.setTasks()`. This automatically registers and starts all tasks when the server builds.

---

## Basic Setup

```typescript
import { ServerBuilder } from "@theunionsquare/mangojs-core";
import { CleanupTask } from "./tasks/cleanup.task";
import { ReportTask } from "./tasks/report.task";

const server = await new ServerBuilder()
  .setName('my-api')
  .setPort(3000)
  .setRoutes([UserController, ProductController])
  .setTasks([CleanupTask, ReportTask])  // Auto-registers and starts tasks
  .build();

server.run();
```

**What `setTasks()` does automatically:**
1. Creates a `ScheduleRegistry` instance
2. Registers all task classes
3. Calls `startAll()` to start all tasks
4. Logs: `Scheduler started with N task(s)`

---

## Task Organization

### Directory Structure

```
src/
  tasks/
    cleanup.task.ts
    report.task.ts
    sync.task.ts
    index.ts
```

### Tasks Index

```typescript
// src/tasks/index.ts
import { CleanupTask } from "./cleanup.task";
import { ReportTask } from "./report.task";
import { SyncTask } from "./sync.task";

export const tasks = [CleanupTask, ReportTask, SyncTask];
```

### Usage

```typescript
import { ServerBuilder } from "@theunionsquare/mangojs-core";
import { tasks } from "./tasks";
import { routes } from "./routes";

const server = await new ServerBuilder()
  .setName('my-api')
  .setRoutes(routes)
  .setTasks(tasks)
  .build();

server.run();
```

---

## Runtime Task Control

Access the registry via `getScheduleRegistry()` for runtime management:

```typescript
const server = await new ServerBuilder()
  .setTasks([CleanupTask, ReportTask])
  .build();

// Get registry for runtime control
const registry = server.getScheduleRegistry();

// Control individual tasks
registry.stop('CleanupTask');
registry.start('CleanupTask');

// Get task info
const task = registry.getTask('CleanupTask');
console.log(`Status: ${task?.status}`);
console.log(`Next run: ${task?.nextRun}`);

// Get overall status
const status = registry.getStatus();
console.log(`Running: ${status.runningTasks}/${status.totalTasks}`);
```

---

## ScheduleRegistry Methods

| Method                  | Return Type             | Description                         |
| ----------------------- | ----------------------- | ----------------------------------- |
| `getTasks()`            | `TaskInfo[]`            | Get info about all registered tasks |
| `getTask(name)`         | `TaskInfo \| undefined` | Get info about a specific task      |
| `start(name)`           | `void`                  | Start a specific task               |
| `stop(name)`            | `void`                  | Stop a specific task                |
| `startAll()`            | `void`                  | Start all tasks                     |
| `stopAll()`             | `void`                  | Stop all tasks                      |
| `getStatus()`           | `SchedulerStatus`       | Get overall scheduler status        |

---

## Complete Example

```typescript
// src/tasks/index.ts
import { ScheduledTaskConstructor } from "@theunionsquare/mangojs-core";
import { CleanupTask } from "./cleanup.task";
import { ReportTask } from "./report.task";

export const tasks: ScheduledTaskConstructor[] = [
  CleanupTask,
  ReportTask,
];

// src/index.ts
import { ServerBuilder } from "@theunionsquare/mangojs-core";
import { tasks } from "./tasks";
import { routes } from "./routes";

async function main() {
  const server = await new ServerBuilder()
    .setName('my-api')
    .setPort(3000)
    .setRoutes(routes)
    .setTasks(tasks)
    .build();

  server.run();

  // Graceful shutdown
  const shutdown = () => {
    const registry = server.getScheduleRegistry();
    registry?.stopAll();
    process.exit(0);
  };

  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
}

main();
```

---

## Monitoring Endpoint

Create an endpoint to monitor and control tasks:

```typescript
@Controller('/api/v1/scheduler')
@injectable()
export class SchedulerController {
  private registry: IScheduleRegistry;

  constructor(serverBuilder: ServerBuilder) {
    this.registry = serverBuilder.getScheduleRegistry();
  }

  @Get('/status')
  getStatus(req: Request, res: Response): Response {
    return res.json(this.registry.getStatus());
  }

  @Get('/tasks/:name')
  getTask(req: Request, res: Response): Response {
    const task = this.registry.getTask(req.params.name);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    return res.json(task);
  }

  @Post('/tasks/:name/start')
  startTask(req: Request, res: Response): Response {
    this.registry.start(req.params.name);
    return res.json({ message: 'Task started' });
  }

  @Post('/tasks/:name/stop')
  stopTask(req: Request, res: Response): Response {
    this.registry.stop(req.params.name);
    return res.json({ message: 'Task stopped' });
  }
}
```

## Related

- [Architecture](./architecture.context.md) - System architecture overview
- [Decorators](./decorators.context.md) - `@Schedule` decorator
- [Scheduled Task](./scheduled-task.context.md) - Base class and lifecycle
- [Types Reference](./types.context.md) - Full type definitions
- [Examples](./examples.context.md) - Complete examples
