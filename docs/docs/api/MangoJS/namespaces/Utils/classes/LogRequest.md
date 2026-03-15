[**MangoJS**](../../../../README.md)

***

# Class: LogRequest

Defined in: [src/core/utils/logRequest.ts:17](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/utils/logRequest.ts#L17)

Adds request tracking headers to a response.

Sets `x-request-id` and `x-request-timestamp` headers
for request tracing and debugging.

## Example

```ts
app.use((req, res, next) => {
  const log = new LogRequest(res);
  console.log(`Request ${log.requestId} at ${log.timestamp}`);
  next();
});
```

## Constructors

### Constructor

```ts
new LogRequest(res): LogRequest;
```

Defined in: [src/core/utils/logRequest.ts:21](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/utils/logRequest.ts#L21)

#### Parameters

##### res

`Response`

#### Returns

`LogRequest`

## Properties

### requestId

```ts
requestId: string;
```

Defined in: [src/core/utils/logRequest.ts:19](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/utils/logRequest.ts#L19)

***

### timestamp

```ts
timestamp: string;
```

Defined in: [src/core/utils/logRequest.ts:18](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/utils/logRequest.ts#L18)
