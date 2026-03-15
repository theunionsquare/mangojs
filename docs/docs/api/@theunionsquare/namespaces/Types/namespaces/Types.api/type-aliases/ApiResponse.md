---
sidebar_label: ApiResponse
---

# Type Alias: ApiResponse\<T\>

```ts
type ApiResponse<T> = 
  | SuccessResponse<T>
  | ErrorResponse;
```

Defined in: [src/core/types/api/index.ts:44](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/types/api/index.ts#L44)

API response - either success or error.

## Type Parameters

### T

`T` = `unknown`
