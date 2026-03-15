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

Defined in: [src/core/middlewares/requestTime.ts:12](https://github.com/theunionsquare/mangojs/blob/01e44709afb7c4e9e23a1365c81ac6e0d3e87cd1/src/core/middlewares/requestTime.ts#L12)

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
