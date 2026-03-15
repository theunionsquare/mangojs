---
sidebar_label: ServiceIdentifier
---

# Type Alias: ServiceIdentifier\<TInstance\>

```ts
type ServiceIdentifier<TInstance> = string | symbol | Newable<TInstance> | Function;
```

Defined in: [src/core/container/types.ts:8](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/container/types.ts#L8)

Service identifier for dependency injection.
Can be a string, symbol, constructor, or function.

## Type Parameters

### TInstance

`TInstance` = `unknown`

The type of the service instance
