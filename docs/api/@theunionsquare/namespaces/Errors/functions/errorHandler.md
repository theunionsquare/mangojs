# Function: errorHandler()

```ts
function errorHandler(res, error): Response<any, Record<string, any>>;
```

Defined in: [src/core/errors/errorHandler.ts:21](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/errors/errorHandler.ts#L21)

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
