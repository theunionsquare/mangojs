import { MetadataKeys } from "../../utils/metadata.keys";
import { ScheduleOptions, ScheduleMetadata } from "../../scheduler/types";

/**
 * Decorator to mark a class as a scheduled task.
 *
 * @param cron - Cron expression (e.g., '0 * * * *' for every hour)
 * @param options - Optional configuration for the scheduled task
 *
 * @example
 * ```typescript
 * @Schedule('0 * * * *') // Every hour
 * @injectable()
 * export class HourlyTask extends ScheduledTask {
 *   async run(): Promise<void> {
 *     // Task logic
 *   }
 * }
 * ```
 *
 * @example
 * ```typescript
 * @Schedule('0 0 * * *', { timezone: 'UTC', runOnStart: true })
 * @injectable()
 * export class DailyTask extends ScheduledTask {
 *   async run(): Promise<void> {
 *     // Task logic
 *   }
 * }
 * ```
 */
export const Schedule = (
  cron: string,
  options?: ScheduleOptions,
): ClassDecorator => {
  return (target) => {
    const metadata: ScheduleMetadata = {
      cron,
      options: {
        name: options?.name ?? target.name,
        timezone: options?.timezone,
        runOnStart: options?.runOnStart ?? false,
        execution: options?.execution ?? "main",
      },
    };
    Reflect.defineMetadata(MetadataKeys.SCHEDULE_CRON, cron, target);
    Reflect.defineMetadata(MetadataKeys.SCHEDULE_OPTIONS, metadata.options, target);
    Reflect.defineMetadata(MetadataKeys.SCHEDULE_METADATA, metadata, target);
  };
};
