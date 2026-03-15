/**
 * @module Scheduler
 * @description Cron-based task scheduling with node-schedule.
 *
 * - **@Schedule**: Decorator to define cron schedule for a task
 * - **ScheduledTask**: Abstract base class for task implementations
 * - **ScheduleRegistry**: Registry for managing scheduled tasks
 *
 * @example
 * @Schedule('0 * * * *') // Every hour
 * @injectable()
 * export class HourlyCleanup extends ScheduledTask {
 *   async run(): Promise<void> {
 *     // Cleanup logic
 *   }
 * }
 *
 * // Register and start
 * const registry = new ScheduleRegistry();
 * registry.register(HourlyCleanup);
 * registry.startAll();
 */

// Types
export * from "./types";

// Decorator
export { Schedule } from "../decorators/scheduler";

// Base class
export { ScheduledTask } from "./ScheduledTask";

// Registry
export { ScheduleRegistry } from "./ScheduleRegistry";
