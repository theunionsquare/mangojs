# Type Alias: Context()\<T\>

```ts
type Context<T> = (em) => unknown;
```

Defined in: [src/core/persistence/types.ts:14](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/persistence/types.ts#L14)

Context function type for transaction execution.
Receives an entity manager/connection and executes operations within it.

## Type Parameters

### T

`T`

The connection/entity manager type (e.g., mongoose.Connection, EntityManager)

## Parameters

### em

`T`

## Returns

`unknown`
