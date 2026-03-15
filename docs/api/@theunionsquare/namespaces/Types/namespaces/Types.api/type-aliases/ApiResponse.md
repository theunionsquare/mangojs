# Type Alias: ApiResponse\<T\>

```ts
type ApiResponse<T> = 
  | SuccessResponse<T>
  | ErrorResponse;
```

Defined in: [src/core/types/api/index.ts:44](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/types/api/index.ts#L44)

API response - either success or error.

## Type Parameters

### T

`T` = `unknown`
