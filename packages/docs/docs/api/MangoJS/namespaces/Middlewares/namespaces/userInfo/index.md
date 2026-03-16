---
sidebar_label: userInfo
---

# userInfo

## Functions

### middlewareAuthContext()

```ts
function middlewareAuthContext(
   req, 
   _res, 
next): Promise<void>;
```

Defined in: [packages/core/src/core/middlewares/userInfo.ts:29](https://github.com/theunionsquare/mangojs/blob/4af5555dfdb04ecafb028803db4f53d12b635140/packages/core/src/core/middlewares/userInfo.ts#L29)

Middleware using AuthStrategyRegistry

Authenticates requests using registered strategies and attaches
the result to `req.authContext`.

#### Parameters

##### req

[`AuthenticatedRequest`](../../index.md#authenticatedrequest)

Express request object

##### \_res

`Response`

##### next

`NextFunction`

Express next function

#### Returns

`Promise`\<`void`\>

#### Example

```typescript
// In ServerBuilder or Express app
app.use(middlewareAuthContext);

// In controller
if (req.authContext.isAuthenticated) {
  console.log(`User ${req.authContext.user.id} via ${req.authContext.strategy}`);
}
```
