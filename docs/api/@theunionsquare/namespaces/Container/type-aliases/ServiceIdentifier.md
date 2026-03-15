# Type Alias: ServiceIdentifier\<TInstance\>

```ts
type ServiceIdentifier<TInstance> = string | symbol | Newable<TInstance> | Function;
```

Defined in: [src/core/container/types.ts:8](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/container/types.ts#L8)

Service identifier for dependency injection.
Can be a string, symbol, constructor, or function.

## Type Parameters

### TInstance

`TInstance` = `unknown`

The type of the service instance
