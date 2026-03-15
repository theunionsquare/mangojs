[**MangoJS**](../../../../../../README.md)

***

# Function: middlewareAuthContext()

```ts
function middlewareAuthContext(
   req, 
   _res, 
next): Promise<void>;
```

Defined in: [src/core/middlewares/userInfo.ts:29](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/middlewares/userInfo.ts#L29)

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
