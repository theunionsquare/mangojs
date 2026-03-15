---
sidebar_label: errorHandler
---

# Function: errorHandler()

```ts
function errorHandler(res, error): Response<any, Record<string, any>>;
```

Defined in: [src/core/errors/errorHandler.ts:21](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/errors/errorHandler.ts#L21)

Express error handler that formats API error responses.

## Parameters

### res

`Response`

Express response object

### error

`Error`

Error to handle

## Returns

`Response`\<`any`, `Record`\<`string`, `any`\>\>

## Example

```typescript
try {
  // ... operation
} catch (error) {
  errorHandler(res, error);
}
```
