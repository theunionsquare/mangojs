# Function: middlewareAuthContext()

```ts
function middlewareAuthContext(
   req, 
   _res, 
next): Promise<void>;
```

Defined in: [src/core/middlewares/userInfo.ts:29](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/middlewares/userInfo.ts#L29)

Middleware using AuthStrategyRegistry

Authenticates requests using registered strategies and attaches
the result to `req.authContext`.

## Parameters

### req

[`AuthenticatedRequest`](../../../interfaces/AuthenticatedRequest.md)

Express request object

### \_res

`Response`

### next

`NextFunction`

Express next function

## Returns

`Promise`\<`void`\>

## Example

```typescript
// In ServerBuilder or Express app
app.use(middlewareAuthContext);

// In controller
if (req.authContext.isAuthenticated) {
  console.log(`User ${req.authContext.user.id} via ${req.authContext.strategy}`);
}
```
