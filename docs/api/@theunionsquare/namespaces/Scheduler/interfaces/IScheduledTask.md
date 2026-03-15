# Interface: IScheduledTask

Defined in: [src/core/scheduler/types.ts:93](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/scheduler/types.ts#L93)

Interface for scheduled task implementations

## Methods

### onComplete()?

```ts
optional onComplete(): void;
```

Defined in: [src/core/scheduler/types.ts:99](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/scheduler/types.ts#L99)

Called after task execution completes successfully

#### Returns

`void`

***

### onError()?

```ts
optional onError(error): void;
```

Defined in: [src/core/scheduler/types.ts:101](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/scheduler/types.ts#L101)

Called when task execution fails

#### Parameters

##### error

`Error`

#### Returns

`void`

***

### onStart()?

```ts
optional onStart(): void;
```

Defined in: [src/core/scheduler/types.ts:97](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/scheduler/types.ts#L97)

Called before task execution starts

#### Returns

`void`

***

### run()

```ts
run(): void | Promise<void>;
```

Defined in: [src/core/scheduler/types.ts:95](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/scheduler/types.ts#L95)

Main execution method - called on each scheduled run

#### Returns

`void` \| `Promise`\<`void`\>
