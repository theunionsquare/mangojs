---
sidebar_label: ScheduleOptions
---

# Interface: ScheduleOptions

Defined in: [src/core/scheduler/types.ts:6](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/scheduler/types.ts#L6)

Options for the

## Schedule

decorator

## Properties

### execution?

```ts
optional execution: "main" | "worker";
```

Defined in: [src/core/scheduler/types.ts:14](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/scheduler/types.ts#L14)

Execution mode: 'main' runs in main thread, 'worker' runs in Worker Thread (no DI support)

***

### name?

```ts
optional name: string;
```

Defined in: [src/core/scheduler/types.ts:8](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/scheduler/types.ts#L8)

Custom name for the task (defaults to class name)

***

### runOnStart?

```ts
optional runOnStart: boolean;
```

Defined in: [src/core/scheduler/types.ts:12](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/scheduler/types.ts#L12)

Execute the task immediately on startup

***

### timezone?

```ts
optional timezone: string;
```

Defined in: [src/core/scheduler/types.ts:10](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/scheduler/types.ts#L10)

Timezone for the cron expression (e.g., 'UTC', 'America/New_York')
