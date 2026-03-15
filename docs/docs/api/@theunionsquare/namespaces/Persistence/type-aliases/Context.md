---
sidebar_label: Context
---

# Type Alias: Context()\<T\>

```ts
type Context<T> = (em) => unknown;
```

Defined in: [src/core/persistence/types.ts:14](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/persistence/types.ts#L14)

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
