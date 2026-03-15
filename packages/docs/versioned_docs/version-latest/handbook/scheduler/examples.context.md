# Scheduler Examples

This document provides complete, copy-paste-ready examples for common scheduler patterns.

---

## Project Structure

A typical project using the scheduler system:

```
src/
├── tasks/
│   ├── cleanup.task.ts
│   ├── report.task.ts
│   ├── notification.task.ts
│   └── index.ts              # Export all tasks
├── controllers/
│   └── scheduler.controller.ts
├── inversify.config.ts
└── index.ts
```

### Tasks Index

```typescript
// src/tasks/index.ts
import { ScheduledTaskConstructor } from "@theunionsquare/mangojs-core";
import { CleanupTask } from "./cleanup.task";
import { ReportTask } from "./report.task";
import { NotificationTask } from "./notification.task";

export const scheduledTasks: ScheduledTaskConstructor[] = [
  CleanupTask,
  ReportTask,
  NotificationTask,
];

export { CleanupTask, ReportTask, NotificationTask };
```

---

## Complete Database Cleanup Task

```typescript
// src/tasks/cleanup.task.ts
import {
  Schedule,
  ScheduledTask,
  INVERSITY_TYPES,
} from "@theunionsquare/mangojs-core";
import { injectable, inject } from "inversify";

interface CleanupResult {
  sessionsDeleted: number;
  logsDeleted: number;
  tempFilesDeleted: number;
  durationMs: number;
}

@Schedule('0 3 * * *', { timezone: 'UTC', name: 'database-cleanup' })
@injectable()
export class CleanupTask extends ScheduledTask {
  @inject(INVERSITY_TYPES.LoggerFactory)
  private loggerFactory: ILoggerFactory;

  @inject(INVERSITY_TYPES.Database)
  private database: IDatabase;

  private logger: ILogger;
  private startTime: Date;
  private result: CleanupResult;

  onStart(): void {
    this.logger = this.loggerFactory.createLogger('CleanupTask');
    this.startTime = new Date();
    this.logger.info('Starting database cleanup');
  }

  async run(): Promise<void> {
    // Delete expired sessions (older than 7 days)
    const sessionsDeleted = await this.database.query(
      'DELETE FROM sessions WHERE expires_at < NOW() - INTERVAL 7 DAY'
    );

    // Delete old audit logs (older than 90 days)
    const logsDeleted = await this.database.query(
      'DELETE FROM audit_logs WHERE created_at < NOW() - INTERVAL 90 DAY'
    );

    // Delete temporary files (older than 24 hours)
    const tempFilesDeleted = await this.database.query(
      'DELETE FROM temp_files WHERE created_at < NOW() - INTERVAL 1 DAY'
    );

    this.result = {
      sessionsDeleted: sessionsDeleted.affectedRows,
      logsDeleted: logsDeleted.affectedRows,
      tempFilesDeleted: tempFilesDeleted.affectedRows,
      durationMs: Date.now() - this.startTime.getTime(),
    };
  }

  onComplete(): void {
    this.logger.info('Database cleanup completed', this.result);
  }

  onError(error: Error): void {
    this.logger.error('Database cleanup failed', {
      error: error.message,
      stack: error.stack,
    });
  }
}
```

---

## Common Patterns

### Pattern 1: Daily Report Generation

```typescript
@Schedule('0 6 * * *', { timezone: 'America/New_York', name: 'daily-report' })
@injectable()
export class DailyReportTask extends ScheduledTask {
  @inject(INVERSITY_TYPES.ReportService)
  private reportService: IReportService;

  @inject(INVERSITY_TYPES.EmailService)
  private emailService: IEmailService;

  async run(): Promise<void> {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    // Generate report
    const report = await this.reportService.generateDailyReport(yesterday);

    // Send to stakeholders
    await this.emailService.send({
      to: ['reports@company.com'],
      subject: `Daily Report - ${yesterday.toDateString()}`,
      html: report.html,
      attachments: [{ filename: 'report.pdf', content: report.pdf }],
    });
  }
}
```

### Pattern 2: Health Check with Alerting

```typescript
@Schedule('*/5 * * * *', { name: 'health-check' })
@injectable()
export class HealthCheckTask extends ScheduledTask {
  @inject(INVERSITY_TYPES.HealthService)
  private healthService: IHealthService;

  @inject(INVERSITY_TYPES.AlertService)
  private alertService: IAlertService;

  private consecutiveFailures = 0;

  async run(): Promise<void> {
    const health = await this.healthService.check();

    if (!health.healthy) {
      this.consecutiveFailures++;

      if (this.consecutiveFailures >= 3) {
        await this.alertService.sendAlert({
          severity: 'critical',
          message: `Health check failing: ${health.issues.join(', ')}`,
        });
      }
    } else {
      this.consecutiveFailures = 0;
    }
  }
}
```

### Pattern 3: Cache Warmup on Startup

```typescript
@Schedule('0 */6 * * *', { runOnStart: true, name: 'cache-warmup' })
@injectable()
export class CacheWarmupTask extends ScheduledTask {
  @inject(INVERSITY_TYPES.CacheService)
  private cacheService: ICacheService;

  @inject(INVERSITY_TYPES.ProductRepository)
  private productRepo: IProductRepository;

  async run(): Promise<void> {
    // Warm up frequently accessed data
    const featuredProducts = await this.productRepo.findFeatured();
    await this.cacheService.set('featured-products', featuredProducts, 3600);

    const categories = await this.productRepo.getCategories();
    await this.cacheService.set('categories', categories, 3600);

    const topSellers = await this.productRepo.findTopSellers(50);
    await this.cacheService.set('top-sellers', topSellers, 3600);
  }
}
```

### Pattern 4: Metrics Collection

```typescript
@Schedule('* * * * *', { name: 'metrics-collector' })
@injectable()
export class MetricsCollectorTask extends ScheduledTask {
  @inject(INVERSITY_TYPES.MetricsService)
  private metrics: IMetricsService;

  @inject(INVERSITY_TYPES.Database)
  private database: IDatabase;

  async run(): Promise<void> {
    // Collect database metrics
    const dbStats = await this.database.getStats();
    this.metrics.gauge('db.connections.active', dbStats.activeConnections);
    this.metrics.gauge('db.connections.idle', dbStats.idleConnections);

    // Collect memory metrics
    const memUsage = process.memoryUsage();
    this.metrics.gauge('process.memory.heap_used', memUsage.heapUsed);
    this.metrics.gauge('process.memory.heap_total', memUsage.heapTotal);

    // Collect event loop lag
    const start = Date.now();
    setImmediate(() => {
      this.metrics.gauge('process.event_loop_lag', Date.now() - start);
    });
  }
}
```

### Pattern 5: Scheduled Notifications

```typescript
@Schedule('0 9 * * 1', { timezone: 'UTC', name: 'weekly-digest' })
@injectable()
export class WeeklyDigestTask extends ScheduledTask {
  @inject(INVERSITY_TYPES.UserRepository)
  private userRepo: IUserRepository;

  @inject(INVERSITY_TYPES.DigestService)
  private digestService: IDigestService;

  @inject(INVERSITY_TYPES.QueueClient)
  private queueClient: IQueueClient;

  async run(): Promise<void> {
    // Get users with digest enabled
    const users = await this.userRepo.findWithDigestEnabled();

    // Queue email jobs for each user
    const jobs = users.map(user => ({
      name: 'send-digest',
      data: { userId: user.id, email: user.email },
      options: { priority: 10 },
    }));

    await this.queueClient.addBulk('email-queue', jobs);
  }
}
```

### Pattern 6: Data Synchronization

```typescript
@Schedule('*/15 * * * *', { name: 'external-sync' })
@injectable()
export class ExternalSyncTask extends ScheduledTask {
  @inject(INVERSITY_TYPES.ExternalApi)
  private externalApi: IExternalApi;

  @inject(INVERSITY_TYPES.LocalRepository)
  private localRepo: ILocalRepository;

  @inject(INVERSITY_TYPES.LoggerFactory)
  private loggerFactory: ILoggerFactory;

  private logger: ILogger;

  onStart(): void {
    this.logger = this.loggerFactory.createLogger('ExternalSync');
  }

  async run(): Promise<void> {
    const lastSync = await this.localRepo.getLastSyncTime();

    // Fetch changes from external API
    const changes = await this.externalApi.getChangesSince(lastSync);
    this.logger.info(`Fetched ${changes.length} changes`);

    // Apply changes locally
    for (const change of changes) {
      if (change.type === 'create') {
        await this.localRepo.create(change.data);
      } else if (change.type === 'update') {
        await this.localRepo.update(change.id, change.data);
      } else if (change.type === 'delete') {
        await this.localRepo.delete(change.id);
      }
    }

    // Update sync timestamp
    await this.localRepo.setLastSyncTime(new Date());
  }

  onError(error: Error): void {
    this.logger.error('Sync failed, will retry on next schedule', {
      error: error.message,
    });
  }
}
```

### Pattern 7: Scheduled Maintenance Window

```typescript
@Schedule('0 2 * * 0', { timezone: 'UTC', name: 'maintenance' })
@injectable()
export class MaintenanceTask extends ScheduledTask {
  @inject(INVERSITY_TYPES.MaintenanceService)
  private maintenance: IMaintenanceService;

  @inject(INVERSITY_TYPES.NotificationService)
  private notifications: INotificationService;

  async run(): Promise<void> {
    // Notify about maintenance start
    await this.notifications.broadcast('Scheduled maintenance starting...');

    try {
      // Run maintenance tasks
      await this.maintenance.vacuumDatabase();
      await this.maintenance.rebuildIndexes();
      await this.maintenance.cleanupStorage();
      await this.maintenance.rotateBackups();

      // Notify completion
      await this.notifications.broadcast('Maintenance completed successfully');
    } catch (error) {
      await this.notifications.broadcast('Maintenance encountered errors');
      throw error;
    }
  }
}
```

---

## Application Entry Point

Complete application setup with scheduler:

```typescript
// src/index.ts
import { ServerBuilder, ScheduleRegistry } from "@theunionsquare/mangojs-core";
import { container } from "./inversify.config";
import { scheduledTasks } from "./tasks";
import { controllers } from "./controllers";

async function main() {
  console.log('Starting application...');

  // Set up scheduler
  const scheduler = new ScheduleRegistry();
  scheduledTasks.forEach(task => {
    scheduler.register(task);
    console.log(`Registered task: ${task.name}`);
  });

  // Bind to container for injection into controllers
  container.bind(INVERSITY_TYPES.ScheduleRegistry).toConstantValue(scheduler);

  // Build server
  const server = await new ServerBuilder()
    .setName('my-api')
    .setPort(parseInt(process.env.PORT || '3000'))
    .setControllers(controllers)
    .setContainer(container)
    .build();

  // Start scheduled tasks
  scheduler.startAll();
  console.log(`Started ${scheduledTasks.length} scheduled tasks`);

  // Start server
  server.run();
  console.log(`Server running on port ${process.env.PORT || 3000}`);

  // Graceful shutdown
  const shutdown = async (signal: string) => {
    console.log(`Received ${signal}, shutting down gracefully...`);

    scheduler.stopAll();
    console.log('Scheduler stopped');

    await server.shutdown();
    console.log('Server stopped');

    process.exit(0);
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));
}

main().catch((error) => {
  console.error('Failed to start application:', error);
  process.exit(1);
});
```

---

## Scheduler Monitoring Controller

```typescript
// src/controllers/scheduler.controller.ts
import {
  Controller,
  Get,
  Post,
  INVERSITY_TYPES,
  IScheduleRegistry,
} from "@theunionsquare/mangojs-core";
import { injectable, inject } from "inversify";
import { Request, Response } from "express";

@Controller('/api/v1/scheduler')
@injectable()
export class SchedulerController {
  @inject(INVERSITY_TYPES.ScheduleRegistry)
  private scheduler: IScheduleRegistry;

  @Get('/status')
  getStatus(req: Request, res: Response): Response {
    const status = this.scheduler.getStatus();
    return res.json({
      ...status,
      timestamp: new Date().toISOString(),
    });
  }

  @Get('/tasks')
  getTasks(req: Request, res: Response): Response {
    return res.json(this.scheduler.getTasks());
  }

  @Get('/tasks/:name')
  getTask(req: Request, res: Response): Response {
    const task = this.scheduler.getTask(req.params.name);

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    return res.json(task);
  }

  @Post('/tasks/:name/start')
  startTask(req: Request, res: Response): Response {
    try {
      this.scheduler.start(req.params.name);
      return res.json({
        message: 'Task started',
        task: this.scheduler.getTask(req.params.name),
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  @Post('/tasks/:name/stop')
  stopTask(req: Request, res: Response): Response {
    try {
      this.scheduler.stop(req.params.name);
      return res.json({
        message: 'Task stopped',
        task: this.scheduler.getTask(req.params.name),
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
```

## Related

- [Architecture](./architecture.context.md) - System architecture overview
- [Decorators](./decorators.context.md) - `@Schedule` decorator details
- [Scheduled Task](./scheduled-task.context.md) - Base class and lifecycle
- [Schedule Registry](./schedule-registry.context.md) - Registry API
- [Types Reference](./types.context.md) - Complete type definitions
