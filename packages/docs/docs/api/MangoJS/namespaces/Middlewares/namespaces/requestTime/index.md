---
sidebar_label: requestTime
---

# requestTime

## Functions

### middlewareRequestTime()

```ts
function middlewareRequestTime(
   req, 
   _res, 
   next): void;
```

Defined in: [packages/core/src/core/middlewares/requestTime.ts:12](https://github.com/theunionsquare/mangojs/blob/4af5555dfdb04ecafb028803db4f53d12b635140/packages/core/src/core/middlewares/requestTime.ts#L12)

Adds request timestamp to the request object.

Populates `req.requestTime` with the request datetime in ISO format.

#### Parameters

##### req

`Request`

##### \_res

`Response`

##### next

`NextFunction`

#### Returns

`void`

#### Example

```ts
app.use(middlewareRequestTime);
// req.requestTime = "2024-01-15T10:30:00.000Z"
```
