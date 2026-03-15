[**MangoJS**](../README.md)

***

# Abstract Class: ScheduledTask

Defined in: [src/core/scheduler/ScheduledTask.ts:35](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/scheduler/ScheduledTask.ts#L35)

Abstract base class for scheduled tasks.
Extend this class to create a scheduled task.

## Example

```typescript
@Schedule('0 * * * *')
@injectable()
export class MyTask extends ScheduledTask {
  @inject(INVERSITY_TYPES.LoggerFactory)
  private loggerFactory: ILoggerFactory;

  async run(): Promise<void> {
    const logger = this.loggerFactory.create('MyTask');
    logger.info('Task running...');
    // Your task logic here
  }

  onStart(): void {
    console.log('Task starting');
  }

  onComplete(): void {
    console.log('Task completed');
  }

  onError(error: Error): void {
    console.error('Task failed:', error);
  }
}
```

## Implements

- [`IScheduledTask`](../MangoJS/namespaces/Scheduler/interfaces/IScheduledTask.md)

## Constructors

### Constructor

```ts
new ScheduledTask(): ScheduledTask;
```

#### Returns

`ScheduledTask`

## Methods

### onComplete()

```ts
onComplete(): void;
```

Defined in: [src/core/scheduler/ScheduledTask.ts:54](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/scheduler/ScheduledTask.ts#L54)

Lifecycle hook called after task execution completes successfully.
Override to add post-execution logic.

#### Returns

`void`

#### Implementation of

[`IScheduledTask`](../MangoJS/namespaces/Scheduler/interfaces/IScheduledTask.md).[`onComplete`](../MangoJS/namespaces/Scheduler/interfaces/IScheduledTask.md#oncomplete)

***

### onError()

```ts
onError(error): void;
```

Defined in: [src/core/scheduler/ScheduledTask.ts:64](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/scheduler/ScheduledTask.ts#L64)

Lifecycle hook called when task execution fails.
Override to add error handling logic.

#### Parameters

##### error

`Error`

The error that occurred during execution

#### Returns

`void`

#### Implementation of

[`IScheduledTask`](../MangoJS/namespaces/Scheduler/interfaces/IScheduledTask.md).[`onError`](../MangoJS/namespaces/Scheduler/interfaces/IScheduledTask.md#onerror)

***

### onStart()

```ts
onStart(): void;
```

Defined in: [src/core/scheduler/ScheduledTask.ts:46](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/scheduler/ScheduledTask.ts#L46)

Lifecycle hook called before task execution starts.
Override to add pre-execution logic.

#### Returns

`void`

#### Implementation of

[`IScheduledTask`](../MangoJS/namespaces/Scheduler/interfaces/IScheduledTask.md).[`onStart`](../MangoJS/namespaces/Scheduler/interfaces/IScheduledTask.md#onstart)

***

### run()

```ts
abstract run(): void | Promise<void>;
```

Defined in: [src/core/scheduler/ScheduledTask.ts:40](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/scheduler/ScheduledTask.ts#L40)

Main execution method - called on each scheduled run.
Must be implemented by subclasses.

#### Returns

`void` \| `Promise`\<`void`\>

#### Implementation of

[`IScheduledTask`](../MangoJS/namespaces/Scheduler/interfaces/IScheduledTask.md).[`run`](../MangoJS/namespaces/Scheduler/interfaces/IScheduledTask.md#run)
