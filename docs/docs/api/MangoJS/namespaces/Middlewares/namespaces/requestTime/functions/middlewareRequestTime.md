[**MangoJS**](../../../../../../README.md)

***

# Function: middlewareRequestTime()

```ts
function middlewareRequestTime(
   req, 
   _res, 
   next): void;
```

Defined in: [src/core/middlewares/requestTime.ts:12](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/middlewares/requestTime.ts#L12)

Adds request timestamp to the request object.

Populates `req.requestTime` with the request datetime in ISO format.

## Parameters

### req

`Request`

### \_res

`Response`

### next

`NextFunction`

## Returns

`void`

## Example

```ts
app.use(middlewareRequestTime);
// req.requestTime = "2024-01-15T10:30:00.000Z"
```
