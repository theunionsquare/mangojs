---
sidebar_label: Response
---

# Interface: Response\<R\>

Defined in: [src/core/types/api/index.ts:107](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/types/api/index.ts#L107)

Generic API response extending Express Response.

## Example

```ts
type MyResponse = Response<SuccessResponse<{ users: User[] }>>;
```

## Extends

- `Response`\<`R`\>

## Type Parameters

### R

`R` = `unknown`

Response body type that will be sent to the client

## Properties

### app

```ts
app: Application;
```

Defined in: node\_modules/.pnpm/@types+express-serve-static-core@5.1.1/node\_modules/@types/express-serve-static-core/index.d.ts:1022

#### Inherited from

```ts
ExpressResponse.app
```

***

### charset

```ts
charset: string;
```

Defined in: node\_modules/.pnpm/@types+express-serve-static-core@5.1.1/node\_modules/@types/express-serve-static-core/index.d.ts:1012

#### Inherited from

```ts
ExpressResponse.charset
```

***

### chunkedEncoding

```ts
chunkedEncoding: boolean;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/http.d.ts:617

#### Inherited from

```ts
ExpressResponse.chunkedEncoding
```

***

### closed

```ts
readonly closed: boolean;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:791

Is `true` after `'close'` has been emitted.

#### Since

v18.0.0

#### Inherited from

```ts
ExpressResponse.closed
```

***

### ~~connection~~

```ts
readonly connection: Socket;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/http.d.ts:635

Alias of `outgoingMessage.socket`.

#### Since

v0.3.0

#### Deprecated

Since v15.12.0,v14.17.1 - Use `socket` instead.

#### Inherited from

```ts
ExpressResponse.connection
```

***

### destroyed

```ts
destroyed: boolean;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:786

Is `true` after `writable.destroy()` has been called.

#### Since

v8.0.0

#### Inherited from

```ts
ExpressResponse.destroyed
```

***

### errored

```ts
readonly errored: Error;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:796

Returns error if the stream has been destroyed with an error.

#### Since

v18.0.0

#### Inherited from

```ts
ExpressResponse.errored
```

***

### ~~finished~~

```ts
finished: boolean;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/http.d.ts:624

#### Deprecated

Use `writableEnded` instead.

#### Inherited from

```ts
ExpressResponse.finished
```

***

### headersSent

```ts
headersSent: boolean;
```

Defined in: node\_modules/.pnpm/@types+express-serve-static-core@5.1.1/node\_modules/@types/express-serve-static-core/index.d.ts:927

Read-only. `true` if the headers were sent, otherwise `false`.

#### Since

v0.9.3

#### Inherited from

```ts
ExpressResponse.headersSent
```

***

### json

```ts
json: Send<R, Response<R>>;
```

Defined in: node\_modules/.pnpm/@types+express-serve-static-core@5.1.1/node\_modules/@types/express-serve-static-core/index.d.ts:747

Send JSON response.

Examples:

    res.json(null);
    res.json(\{ user: 'tj' \});
    res.status(500).json('oh noes!');
    res.status(404).json('I dont have that');

#### Inherited from

```ts
ExpressResponse.json
```

***

### jsonp

```ts
jsonp: Send<R, Response<R>>;
```

Defined in: node\_modules/.pnpm/@types+express-serve-static-core@5.1.1/node\_modules/@types/express-serve-static-core/index.d.ts:759

Send JSON response with JSONP callback support.

Examples:

    res.jsonp(null);
    res.jsonp(\{ user: 'tj' \});
    res.status(500).jsonp('oh noes!');
    res.status(404).jsonp('I dont have that');

#### Inherited from

```ts
ExpressResponse.jsonp
```

***

### locals

```ts
locals: Record<string, any> & Locals;
```

Defined in: node\_modules/.pnpm/@types+express-serve-static-core@5.1.1/node\_modules/@types/express-serve-static-core/index.d.ts:1010

#### Inherited from

```ts
ExpressResponse.locals
```

***

### req

```ts
req: Request;
```

Defined in: node\_modules/.pnpm/@types+express-serve-static-core@5.1.1/node\_modules/@types/express-serve-static-core/index.d.ts:1039

After middleware.init executed, Response will contain req property
See: express/lib/middleware/init.js

#### Inherited from

```ts
ExpressResponse.req
```

***

### send

```ts
send: Send<R, Response<R>>;
```

Defined in: node\_modules/.pnpm/@types+express-serve-static-core@5.1.1/node\_modules/@types/express-serve-static-core/index.d.ts:735

Send a response.

Examples:

    res.send(new Buffer('wahoo'));
    res.send(\{ some: 'json' \});
    res.send('\<p\>some html\</p\>');
    res.status(404).send('Sorry, cant find that');

#### Inherited from

```ts
ExpressResponse.send
```

***

### sendDate

```ts
sendDate: boolean;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/http.d.ts:620

#### Inherited from

```ts
ExpressResponse.sendDate
```

***

### shouldKeepAlive

```ts
shouldKeepAlive: boolean;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/http.d.ts:618

#### Inherited from

```ts
ExpressResponse.shouldKeepAlive
```

***

### socket

```ts
readonly socket: Socket;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/http.d.ts:643

Reference to the underlying socket. Usually, users will not want to access
this property.

After calling `outgoingMessage.end()`, this property will be nulled.

#### Since

v0.3.0

#### Inherited from

```ts
ExpressResponse.socket
```

***

### statusCode

```ts
statusCode: number;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/http.d.ts:822

When using implicit headers (not calling `response.writeHead()` explicitly),
this property controls the status code that will be sent to the client when
the headers get flushed.

```js
response.statusCode = 404;
```

After response header was sent to the client, this property indicates the
status code which was sent out.

#### Since

v0.4.0

#### Inherited from

```ts
ExpressResponse.statusCode
```

***

### statusMessage

```ts
statusMessage: string;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/http.d.ts:837

When using implicit headers (not calling `response.writeHead()` explicitly),
this property controls the status message that will be sent to the client when
the headers get flushed. If this is left as `undefined` then the standard
message for the status code will be used.

```js
response.statusMessage = 'Not found';
```

After response header was sent to the client, this property indicates the
status message which was sent out.

#### Since

v0.11.8

#### Inherited from

```ts
ExpressResponse.statusMessage
```

***

### strictContentLength

```ts
strictContentLength: boolean;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/http.d.ts:844

If set to `true`, Node.js will check whether the `Content-Length` header value and the size of the body, in bytes, are equal.
Mismatching the `Content-Length` header value will result
in an `Error` being thrown, identified by `code:``'ERR_HTTP_CONTENT_LENGTH_MISMATCH'`.

#### Since

v18.10.0, v16.18.0

#### Inherited from

```ts
ExpressResponse.strictContentLength
```

***

### useChunkedEncodingByDefault

```ts
useChunkedEncodingByDefault: boolean;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/http.d.ts:619

#### Inherited from

```ts
ExpressResponse.useChunkedEncodingByDefault
```

***

### writable

```ts
readonly writable: boolean;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:742

Is `true` if it is safe to call `writable.write()`, which means
the stream has not been destroyed, errored, or ended.

#### Since

v11.4.0

#### Inherited from

```ts
ExpressResponse.writable
```

***

### writableAborted

```ts
readonly writableAborted: boolean;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:747

Returns whether the stream was destroyed or errored before emitting `'finish'`.

#### Since

v18.0.0, v16.17.0

#### Inherited from

```ts
ExpressResponse.writableAborted
```

***

### writableCorked

```ts
readonly writableCorked: number;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:781

Number of times `writable.uncork()` needs to be
called in order to fully uncork the stream.

#### Since

v13.2.0, v12.16.0

#### Inherited from

```ts
ExpressResponse.writableCorked
```

***

### writableEnded

```ts
readonly writableEnded: boolean;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:753

Is `true` after `writable.end()` has been called. This property
does not indicate whether the data has been flushed, for this use `writable.writableFinished` instead.

#### Since

v12.9.0

#### Inherited from

```ts
ExpressResponse.writableEnded
```

***

### writableFinished

```ts
readonly writableFinished: boolean;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:758

Is set to `true` immediately before the `'finish'` event is emitted.

#### Since

v12.6.0

#### Inherited from

```ts
ExpressResponse.writableFinished
```

***

### writableHighWaterMark

```ts
readonly writableHighWaterMark: number;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:763

Return the value of `highWaterMark` passed when creating this `Writable`.

#### Since

v9.3.0

#### Inherited from

```ts
ExpressResponse.writableHighWaterMark
```

***

### writableLength

```ts
readonly writableLength: number;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:770

This property contains the number of bytes (or objects) in the queue
ready to be written. The value provides introspection data regarding
the status of the `highWaterMark`.

#### Since

v9.4.0

#### Inherited from

```ts
ExpressResponse.writableLength
```

***

### writableNeedDrain

```ts
readonly writableNeedDrain: boolean;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:801

Is `true` if the stream's buffer has been full and stream will emit `'drain'`.

#### Since

v15.2.0, v14.17.0

#### Inherited from

```ts
ExpressResponse.writableNeedDrain
```

***

### writableObjectMode

```ts
readonly writableObjectMode: boolean;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:775

Getter for the property `objectMode` of a given `Writable` stream.

#### Since

v12.3.0

#### Inherited from

```ts
ExpressResponse.writableObjectMode
```

## Methods

### \_construct()?

```ts
optional _construct(callback): void;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:811

#### Parameters

##### callback

(`error?`) => `void`

#### Returns

`void`

#### Inherited from

```ts
ExpressResponse._construct
```

***

### \_destroy()

```ts
_destroy(error, callback): void;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:812

#### Parameters

##### error

`Error`

##### callback

(`error?`) => `void`

#### Returns

`void`

#### Inherited from

```ts
ExpressResponse._destroy
```

***

### \_final()

```ts
_final(callback): void;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:813

#### Parameters

##### callback

(`error?`) => `void`

#### Returns

`void`

#### Inherited from

```ts
ExpressResponse._final
```

***

### \_write()

```ts
_write(
   chunk, 
   encoding, 
   callback): void;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:803

#### Parameters

##### chunk

`any`

##### encoding

`BufferEncoding`

##### callback

(`error?`) => `void`

#### Returns

`void`

#### Inherited from

```ts
ExpressResponse._write
```

***

### \_writev()?

```ts
optional _writev(chunks, callback): void;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:804

#### Parameters

##### chunks

`object`[]

##### callback

(`error?`) => `void`

#### Returns

`void`

#### Inherited from

```ts
ExpressResponse._writev
```

***

### \[asyncDispose\]()

```ts
asyncDispose: Promise<void>;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:974

Calls `writable.destroy()` with an `AbortError` and returns
a promise that fulfills when the stream is finished.

#### Returns

`Promise`\<`void`\>

#### Since

v22.4.0, v20.16.0

#### Inherited from

```ts
ExpressResponse.[asyncDispose]
```

***

### \[captureRejectionSymbol\]()?

```ts
optional [captureRejectionSymbol]<K>(
   error, 
   event, ...
   args): void;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/events.d.ts:103

#### Type Parameters

##### K

`K`

#### Parameters

##### error

`Error`

##### event

`string` | `symbol`

##### args

...`AnyRest`

#### Returns

`void`

#### Inherited from

```ts
ExpressResponse.[captureRejectionSymbol]
```

***

### addListener()

#### Call Signature

```ts
addListener(event, listener): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:985

Event emitter
The defined events on documents including:
1. close
2. drain
3. error
4. finish
5. pipe
6. unpipe

##### Parameters

###### event

`"close"`

###### listener

() => `void`

##### Returns

`this`

##### Inherited from

```ts
ExpressResponse.addListener
```

#### Call Signature

```ts
addListener(event, listener): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:986

Event emitter
The defined events on documents including:
1. close
2. drain
3. error
4. finish
5. pipe
6. unpipe

##### Parameters

###### event

`"drain"`

###### listener

() => `void`

##### Returns

`this`

##### Inherited from

```ts
ExpressResponse.addListener
```

#### Call Signature

```ts
addListener(event, listener): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:987

Event emitter
The defined events on documents including:
1. close
2. drain
3. error
4. finish
5. pipe
6. unpipe

##### Parameters

###### event

`"error"`

###### listener

(`err`) => `void`

##### Returns

`this`

##### Inherited from

```ts
ExpressResponse.addListener
```

#### Call Signature

```ts
addListener(event, listener): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:988

Event emitter
The defined events on documents including:
1. close
2. drain
3. error
4. finish
5. pipe
6. unpipe

##### Parameters

###### event

`"finish"`

###### listener

() => `void`

##### Returns

`this`

##### Inherited from

```ts
ExpressResponse.addListener
```

#### Call Signature

```ts
addListener(event, listener): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:989

Event emitter
The defined events on documents including:
1. close
2. drain
3. error
4. finish
5. pipe
6. unpipe

##### Parameters

###### event

`"pipe"`

###### listener

(`src`) => `void`

##### Returns

`this`

##### Inherited from

```ts
ExpressResponse.addListener
```

#### Call Signature

```ts
addListener(event, listener): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:990

Event emitter
The defined events on documents including:
1. close
2. drain
3. error
4. finish
5. pipe
6. unpipe

##### Parameters

###### event

`"unpipe"`

###### listener

(`src`) => `void`

##### Returns

`this`

##### Inherited from

```ts
ExpressResponse.addListener
```

#### Call Signature

```ts
addListener(event, listener): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:991

Event emitter
The defined events on documents including:
1. close
2. drain
3. error
4. finish
5. pipe
6. unpipe

##### Parameters

###### event

`string` | `symbol`

###### listener

(...`args`) => `void`

##### Returns

`this`

##### Inherited from

```ts
ExpressResponse.addListener
```

***

### addTrailers()

```ts
addTrailers(headers): void;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/http.d.ts:788

Adds HTTP trailers (headers but at the end of the message) to the message.

Trailers will **only** be emitted if the message is chunked encoded. If not,
the trailers will be silently discarded.

HTTP requires the `Trailer` header to be sent to emit trailers,
with a list of header field names in its value, e.g.

```js
message.writeHead(200, { 'Content-Type': 'text/plain',
                         'Trailer': 'Content-MD5' });
message.write(fileData);
message.addTrailers({ 'Content-MD5': '7895bf4b8828b55ceaf47747b4bca667' });
message.end();
```

Attempting to set a header field name or value that contains invalid characters
will result in a `TypeError` being thrown.

#### Parameters

##### headers

`OutgoingHttpHeaders` | readonly \[`string`, `string`\][]

#### Returns

`void`

#### Since

v0.3.0

#### Inherited from

```ts
ExpressResponse.addTrailers
```

***

### append()

```ts
append(field, value?): this;
```

Defined in: node\_modules/.pnpm/@types+express-serve-static-core@5.1.1/node\_modules/@types/express-serve-static-core/index.d.ts:1033

Appends the specified value to the HTTP response header field.
If the header is not already set, it creates the header with the specified value.
The value parameter can be a string or an array.

Note: calling res.set() after res.append() will reset the previously-set header value.

#### Parameters

##### field

`string`

##### value?

`string` | `string`[]

#### Returns

`this`

#### Since

4.11.0

#### Inherited from

```ts
ExpressResponse.append
```

***

### appendHeader()

```ts
appendHeader(name, value): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/http.d.ts:711

Append a single header value to the header object.

If the value is an array, this is equivalent to calling this method multiple
times.

If there were no previous values for the header, this is equivalent to calling `outgoingMessage.setHeader(name, value)`.

Depending of the value of `options.uniqueHeaders` when the client request or the
server were created, this will end up in the header being sent multiple times or
a single time with values joined using `; `.

#### Parameters

##### name

`string`

Header name

##### value

Header value

`string` | readonly `string`[]

#### Returns

`this`

#### Since

v18.3.0, v16.17.0

#### Inherited from

```ts
ExpressResponse.appendHeader
```

***

### assignSocket()

```ts
assignSocket(socket): void;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/http.d.ts:846

#### Parameters

##### socket

`Socket`

#### Returns

`void`

#### Inherited from

```ts
ExpressResponse.assignSocket
```

***

### attachment()

```ts
attachment(filename?): this;
```

Defined in: node\_modules/.pnpm/@types+express-serve-static-core@5.1.1/node\_modules/@types/express-serve-static-core/index.d.ts:906

Set _Content-Disposition_ header to _attachment_ with optional `filename`.

#### Parameters

##### filename?

`string`

#### Returns

`this`

#### Inherited from

```ts
ExpressResponse.attachment
```

***

### clearCookie()

```ts
clearCookie(name, options?): this;
```

Defined in: node\_modules/.pnpm/@types+express-serve-static-core@5.1.1/node\_modules/@types/express-serve-static-core/index.d.ts:933

Clear cookie `name`.

#### Parameters

##### name

`string`

##### options?

`CookieOptions`

#### Returns

`this`

#### Inherited from

```ts
ExpressResponse.clearCookie
```

***

### compose()

```ts
compose<T>(stream, options?): T;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:35

#### Type Parameters

##### T

`T` *extends* `ReadableStream`

#### Parameters

##### stream

`ComposeFnParam` | `T` | `Iterable`\<`T`, `any`, `any`\> | `AsyncIterable`\<`T`, `any`, `any`\>

##### options?

###### signal

`AbortSignal`

#### Returns

`T`

#### Inherited from

```ts
ExpressResponse.compose
```

***

### contentType()

```ts
contentType(type): this;
```

Defined in: node\_modules/.pnpm/@types+express-serve-static-core@5.1.1/node\_modules/@types/express-serve-static-core/index.d.ts:833

Set _Content-Type_ response header with `type` through `mime.lookup()`
when it does not contain "/", or set the Content-Type to `type` otherwise.

Examples:

    res.type('.html');
    res.type('html');
    res.type('json');
    res.type('application/json');
    res.type('png');

#### Parameters

##### type

`string`

#### Returns

`this`

#### Inherited from

```ts
ExpressResponse.contentType
```

***

### cookie()

#### Call Signature

```ts
cookie(
   name, 
   val, 
   options): this;
```

Defined in: node\_modules/.pnpm/@types+express-serve-static-core@5.1.1/node\_modules/@types/express-serve-static-core/index.d.ts:952

Set cookie `name` to `val`, with the given `options`.

Options:

   - `maxAge`   max-age in milliseconds, converted to `expires`
   - `signed`   sign the cookie
   - `path`     defaults to "/"

Examples:

   // "Remember Me" for 15 minutes
   res.cookie('rememberme', '1', \{ expires: new Date(Date.now() + 900000), httpOnly: true \});

   // save as above
   res.cookie('rememberme', '1', \{ maxAge: 900000, httpOnly: true \})

##### Parameters

###### name

`string`

###### val

`string`

###### options

`CookieOptions`

##### Returns

`this`

##### Inherited from

```ts
ExpressResponse.cookie
```

#### Call Signature

```ts
cookie(
   name, 
   val, 
   options): this;
```

Defined in: node\_modules/.pnpm/@types+express-serve-static-core@5.1.1/node\_modules/@types/express-serve-static-core/index.d.ts:953

##### Parameters

###### name

`string`

###### val

`any`

###### options

`CookieOptions`

##### Returns

`this`

##### Inherited from

```ts
ExpressResponse.cookie
```

#### Call Signature

```ts
cookie(name, val): this;
```

Defined in: node\_modules/.pnpm/@types+express-serve-static-core@5.1.1/node\_modules/@types/express-serve-static-core/index.d.ts:954

##### Parameters

###### name

`string`

###### val

`any`

##### Returns

`this`

##### Inherited from

```ts
ExpressResponse.cookie
```

***

### cork()

```ts
cork(): void;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:917

The `writable.cork()` method forces all written data to be buffered in memory.
The buffered data will be flushed when either the [uncork](#uncork) or [end](#end) methods are called.

The primary intent of `writable.cork()` is to accommodate a situation in which
several small chunks are written to the stream in rapid succession. Instead of
immediately forwarding them to the underlying destination, `writable.cork()` buffers all the chunks until `writable.uncork()` is called, which will pass them
all to `writable._writev()`, if present. This prevents a head-of-line blocking
situation where data is being buffered while waiting for the first small chunk
to be processed. However, use of `writable.cork()` without implementing `writable._writev()` may have an adverse effect on throughput.

See also: `writable.uncork()`, `writable._writev()`.

#### Returns

`void`

#### Since

v0.11.2

#### Inherited from

```ts
ExpressResponse.cork
```

***

### destroy()

```ts
destroy(error?): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:968

Destroy the stream. Optionally emit an `'error'` event, and emit a `'close'` event (unless `emitClose` is set to `false`). After this call, the writable
stream has ended and subsequent calls to `write()` or `end()` will result in
an `ERR_STREAM_DESTROYED` error.
This is a destructive and immediate way to destroy a stream. Previous calls to `write()` may not have drained, and may trigger an `ERR_STREAM_DESTROYED` error.
Use `end()` instead of destroy if data should flush before close, or wait for
the `'drain'` event before destroying the stream.

Once `destroy()` has been called any further calls will be a no-op and no
further errors except from `_destroy()` may be emitted as `'error'`.

Implementors should not override this method,
but instead implement `writable._destroy()`.

#### Parameters

##### error?

`Error`

Optional, an error to emit with `'error'` event.

#### Returns

`this`

#### Since

v8.0.0

#### Inherited from

```ts
ExpressResponse.destroy
```

***

### detachSocket()

```ts
detachSocket(socket): void;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/http.d.ts:847

#### Parameters

##### socket

`Socket`

#### Returns

`void`

#### Inherited from

```ts
ExpressResponse.detachSocket
```

***

### download()

#### Call Signature

```ts
download(path, fn?): void;
```

Defined in: node\_modules/.pnpm/@types+express-serve-static-core@5.1.1/node\_modules/@types/express-serve-static-core/index.d.ts:817

Transfer the file at the given `path` as an attachment.

Optionally providing an alternate attachment `filename`,
and optional callback `fn(err)`. The callback is invoked
when the data transfer is complete, or when an error has
ocurred. Be sure to check `res.headersSent` if you plan to respond.

The optional options argument passes through to the underlying
res.sendFile() call, and takes the exact same parameters.

This method uses `res.sendFile()`.

##### Parameters

###### path

`string`

###### fn?

`Errback`

##### Returns

`void`

##### Inherited from

```ts
ExpressResponse.download
```

#### Call Signature

```ts
download(
   path, 
   filename, 
   fn?): void;
```

Defined in: node\_modules/.pnpm/@types+express-serve-static-core@5.1.1/node\_modules/@types/express-serve-static-core/index.d.ts:818

##### Parameters

###### path

`string`

###### filename

`string`

###### fn?

`Errback`

##### Returns

`void`

##### Inherited from

```ts
ExpressResponse.download
```

#### Call Signature

```ts
download(
   path, 
   filename, 
   options, 
   fn?): void;
```

Defined in: node\_modules/.pnpm/@types+express-serve-static-core@5.1.1/node\_modules/@types/express-serve-static-core/index.d.ts:819

##### Parameters

###### path

`string`

###### filename

`string`

###### options

`DownloadOptions`

###### fn?

`Errback`

##### Returns

`void`

##### Inherited from

```ts
ExpressResponse.download
```

***

### emit()

#### Call Signature

```ts
emit(event): boolean;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:992

Synchronously calls each of the listeners registered for the event named `eventName`, in the order they were registered, passing the supplied arguments
to each.

Returns `true` if the event had listeners, `false` otherwise.

```js
import { EventEmitter } from 'node:events';
const myEmitter = new EventEmitter();

// First listener
myEmitter.on('event', function firstListener() {
  console.log('Helloooo! first listener');
});
// Second listener
myEmitter.on('event', function secondListener(arg1, arg2) {
  console.log(`event with parameters ${arg1}, ${arg2} in second listener`);
});
// Third listener
myEmitter.on('event', function thirdListener(...args) {
  const parameters = args.join(', ');
  console.log(`event with parameters ${parameters} in third listener`);
});

console.log(myEmitter.listeners('event'));

myEmitter.emit('event', 1, 2, 3, 4, 5);

// Prints:
// [
//   [Function: firstListener],
//   [Function: secondListener],
//   [Function: thirdListener]
// ]
// Helloooo! first listener
// event with parameters 1, 2 in second listener
// event with parameters 1, 2, 3, 4, 5 in third listener
```

##### Parameters

###### event

`"close"`

##### Returns

`boolean`

##### Since

v0.1.26

##### Inherited from

```ts
ExpressResponse.emit
```

#### Call Signature

```ts
emit(event): boolean;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:993

##### Parameters

###### event

`"drain"`

##### Returns

`boolean`

##### Inherited from

```ts
ExpressResponse.emit
```

#### Call Signature

```ts
emit(event, err): boolean;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:994

##### Parameters

###### event

`"error"`

###### err

`Error`

##### Returns

`boolean`

##### Inherited from

```ts
ExpressResponse.emit
```

#### Call Signature

```ts
emit(event): boolean;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:995

##### Parameters

###### event

`"finish"`

##### Returns

`boolean`

##### Inherited from

```ts
ExpressResponse.emit
```

#### Call Signature

```ts
emit(event, src): boolean;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:996

##### Parameters

###### event

`"pipe"`

###### src

`Readable`

##### Returns

`boolean`

##### Inherited from

```ts
ExpressResponse.emit
```

#### Call Signature

```ts
emit(event, src): boolean;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:997

##### Parameters

###### event

`"unpipe"`

###### src

`Readable`

##### Returns

`boolean`

##### Inherited from

```ts
ExpressResponse.emit
```

#### Call Signature

```ts
emit(event, ...args): boolean;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:998

##### Parameters

###### event

`string` | `symbol`

###### args

...`any`[]

##### Returns

`boolean`

##### Inherited from

```ts
ExpressResponse.emit
```

***

### end()

#### Call Signature

```ts
end(cb?): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:900

Calling the `writable.end()` method signals that no more data will be written
to the `Writable`. The optional `chunk` and `encoding` arguments allow one
final additional chunk of data to be written immediately before closing the
stream.

Calling the [write](#write) method after calling [end](#end) will raise an error.

```js
// Write 'hello, ' and then end with 'world!'.
import fs from 'node:fs';
const file = fs.createWriteStream('example.txt');
file.write('hello, ');
file.end('world!');
// Writing more now is not allowed!
```

##### Parameters

###### cb?

() => `void`

##### Returns

`this`

##### Since

v0.9.4

##### Inherited from

```ts
ExpressResponse.end
```

#### Call Signature

```ts
end(chunk, cb?): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:901

Calling the `writable.end()` method signals that no more data will be written
to the `Writable`. The optional `chunk` and `encoding` arguments allow one
final additional chunk of data to be written immediately before closing the
stream.

Calling the [write](#write) method after calling [end](#end) will raise an error.

```js
// Write 'hello, ' and then end with 'world!'.
import fs from 'node:fs';
const file = fs.createWriteStream('example.txt');
file.write('hello, ');
file.end('world!');
// Writing more now is not allowed!
```

##### Parameters

###### chunk

`any`

Optional data to write. For streams not operating in object mode, `chunk` must be a \{string\}, \{Buffer\},
\{TypedArray\} or \{DataView\}. For object mode streams, `chunk` may be any JavaScript value other than `null`.

###### cb?

() => `void`

##### Returns

`this`

##### Since

v0.9.4

##### Inherited from

```ts
ExpressResponse.end
```

#### Call Signature

```ts
end(
   chunk, 
   encoding, 
   cb?): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:902

Calling the `writable.end()` method signals that no more data will be written
to the `Writable`. The optional `chunk` and `encoding` arguments allow one
final additional chunk of data to be written immediately before closing the
stream.

Calling the [write](#write) method after calling [end](#end) will raise an error.

```js
// Write 'hello, ' and then end with 'world!'.
import fs from 'node:fs';
const file = fs.createWriteStream('example.txt');
file.write('hello, ');
file.end('world!');
// Writing more now is not allowed!
```

##### Parameters

###### chunk

`any`

Optional data to write. For streams not operating in object mode, `chunk` must be a \{string\}, \{Buffer\},
\{TypedArray\} or \{DataView\}. For object mode streams, `chunk` may be any JavaScript value other than `null`.

###### encoding

`BufferEncoding`

The encoding if `chunk` is a string

###### cb?

() => `void`

##### Returns

`this`

##### Since

v0.9.4

##### Inherited from

```ts
ExpressResponse.end
```

***

### eventNames()

```ts
eventNames(): (string | symbol)[];
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/events.d.ts:967

Returns an array listing the events for which the emitter has registered
listeners. The values in the array are strings or `Symbol`s.

```js
import { EventEmitter } from 'node:events';

const myEE = new EventEmitter();
myEE.on('foo', () => {});
myEE.on('bar', () => {});

const sym = Symbol('symbol');
myEE.on(sym, () => {});

console.log(myEE.eventNames());
// Prints: [ 'foo', 'bar', Symbol(symbol) ]
```

#### Returns

(`string` \| `symbol`)[]

#### Since

v6.0.0

#### Inherited from

```ts
ExpressResponse.eventNames
```

***

### flushHeaders()

```ts
flushHeaders(): void;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/http.d.ts:801

Flushes the message headers.

For efficiency reason, Node.js normally buffers the message headers
until `outgoingMessage.end()` is called or the first chunk of message data
is written. It then tries to pack the headers and data into a single TCP
packet.

It is usually desired (it saves a TCP round-trip), but not when the first
data is not sent until possibly much later. `outgoingMessage.flushHeaders()` bypasses the optimization and kickstarts the message.

#### Returns

`void`

#### Since

v1.6.0

#### Inherited from

```ts
ExpressResponse.flushHeaders
```

***

### format()

```ts
format(obj): this;
```

Defined in: node\_modules/.pnpm/@types+express-serve-static-core@5.1.1/node\_modules/@types/express-serve-static-core/index.d.ts:901

Respond to the Acceptable formats using an `obj`
of mime-type callbacks.

This method uses `req.accepted`, an array of
acceptable types ordered by their quality values.
When "Accept" is not present the _first_ callback
is invoked, otherwise the first match is used. When
no match is performed the server responds with
406 "Not Acceptable".

Content-Type is set for you, however if you choose
you may alter this within the callback using `res.type()`
or `res.set('Content-Type', ...)`.

   res.format(\{
     'text/plain': function()\{
       res.send('hey');
     \},

     'text/html': function()\{
       res.send('\<p\>hey\</p\>');
     \},

     'appliation/json': function()\{
       res.send(\{ message: 'hey' \});
     \}
   \});

In addition to canonicalized MIME types you may
also use extnames mapped to these types:

   res.format(\{
     text: function()\{
       res.send('hey');
     \},

     html: function()\{
       res.send('\<p\>hey\</p\>');
     \},

     json: function()\{
       res.send(\{ message: 'hey' \});
     \}
   \});

By default Express passes an `Error`
with a `.status` of 406 to `next(err)`
if a match is not made. If you provide
a `.default` callback it will be invoked
instead.

#### Parameters

##### obj

`any`

#### Returns

`this`

#### Inherited from

```ts
ExpressResponse.format
```

***

### get()

```ts
get(field): string;
```

Defined in: node\_modules/.pnpm/@types+express-serve-static-core@5.1.1/node\_modules/@types/express-serve-static-core/index.d.ts:930

Get value for header `field`.

#### Parameters

##### field

`string`

#### Returns

`string`

#### Inherited from

```ts
ExpressResponse.get
```

***

### getHeader()

```ts
getHeader(name): string | number | string[];
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/http.d.ts:718

Gets the value of the HTTP header with the given name. If that header is not
set, the returned value will be `undefined`.

#### Parameters

##### name

`string`

Name of header

#### Returns

`string` \| `number` \| `string`[]

#### Since

v0.4.0

#### Inherited from

```ts
ExpressResponse.getHeader
```

***

### getHeaderNames()

```ts
getHeaderNames(): string[];
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/http.d.ts:746

Returns an array containing the unique names of the current outgoing headers.
All names are lowercase.

#### Returns

`string`[]

#### Since

v7.7.0

#### Inherited from

```ts
ExpressResponse.getHeaderNames
```

***

### getHeaders()

```ts
getHeaders(): OutgoingHttpHeaders;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/http.d.ts:740

Returns a shallow copy of the current outgoing headers. Since a shallow
copy is used, array values may be mutated without additional calls to
various header-related HTTP module methods. The keys of the returned
object are the header names and the values are the respective header
values. All header names are lowercase.

The object returned by the `outgoingMessage.getHeaders()` method does
not prototypically inherit from the JavaScript `Object`. This means that
typical `Object` methods such as `obj.toString()`, `obj.hasOwnProperty()`,
and others are not defined and will not work.

```js
outgoingMessage.setHeader('Foo', 'bar');
outgoingMessage.setHeader('Set-Cookie', ['foo=bar', 'bar=baz']);

const headers = outgoingMessage.getHeaders();
// headers === { foo: 'bar', 'set-cookie': ['foo=bar', 'bar=baz'] }
```

#### Returns

`OutgoingHttpHeaders`

#### Since

v7.7.0

#### Inherited from

```ts
ExpressResponse.getHeaders
```

***

### getMaxListeners()

```ts
getMaxListeners(): number;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/events.d.ts:819

Returns the current max listener value for the `EventEmitter` which is either
set by `emitter.setMaxListeners(n)` or defaults to EventEmitter.defaultMaxListeners.

#### Returns

`number`

#### Since

v1.0.0

#### Inherited from

```ts
ExpressResponse.getMaxListeners
```

***

### hasHeader()

```ts
hasHeader(name): boolean;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/http.d.ts:756

Returns `true` if the header identified by `name` is currently set in the
outgoing headers. The header name is case-insensitive.

```js
const hasContentType = outgoingMessage.hasHeader('content-type');
```

#### Parameters

##### name

`string`

#### Returns

`boolean`

#### Since

v7.7.0

#### Inherited from

```ts
ExpressResponse.hasHeader
```

***

### header()

#### Call Signature

```ts
header(field): this;
```

Defined in: node\_modules/.pnpm/@types+express-serve-static-core@5.1.1/node\_modules/@types/express-serve-static-core/index.d.ts:923

##### Parameters

###### field

`any`

##### Returns

`this`

##### Inherited from

```ts
ExpressResponse.header
```

#### Call Signature

```ts
header(field, value?): this;
```

Defined in: node\_modules/.pnpm/@types+express-serve-static-core@5.1.1/node\_modules/@types/express-serve-static-core/index.d.ts:924

##### Parameters

###### field

`string`

###### value?

`string` | `string`[]

##### Returns

`this`

##### Inherited from

```ts
ExpressResponse.header
```

***

### links()

```ts
links(links): this;
```

Defined in: node\_modules/.pnpm/@types+express-serve-static-core@5.1.1/node\_modules/@types/express-serve-static-core/index.d.ts:723

Set Link header field with the given `links`.

Examples:

   res.links(\{
     next: 'http://api.example.com/users?page=2',
     last: 'http://api.example.com/users?page=5'
   \});

#### Parameters

##### links

`any`

#### Returns

`this`

#### Inherited from

```ts
ExpressResponse.links
```

***

### listenerCount()

```ts
listenerCount<K>(eventName, listener?): number;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/events.d.ts:913

Returns the number of listeners listening for the event named `eventName`.
If `listener` is provided, it will return how many times the listener is found
in the list of the listeners of the event.

#### Type Parameters

##### K

`K`

#### Parameters

##### eventName

The name of the event being listened for

`string` | `symbol`

##### listener?

`Function`

The event handler function

#### Returns

`number`

#### Since

v3.2.0

#### Inherited from

```ts
ExpressResponse.listenerCount
```

***

### listeners()

```ts
listeners<K>(eventName): Function[];
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/events.d.ts:832

Returns a copy of the array of listeners for the event named `eventName`.

```js
server.on('connection', (stream) => {
  console.log('someone connected!');
});
console.log(util.inspect(server.listeners('connection')));
// Prints: [ [Function] ]
```

#### Type Parameters

##### K

`K`

#### Parameters

##### eventName

`string` | `symbol`

#### Returns

`Function`[]

#### Since

v0.1.26

#### Inherited from

```ts
ExpressResponse.listeners
```

***

### location()

```ts
location(url): this;
```

Defined in: node\_modules/.pnpm/@types+express-serve-static-core@5.1.1/node\_modules/@types/express-serve-static-core/index.d.ts:978

Set the location header to `url`.

Examples:

   res.location('/foo/bar').;
   res.location('http://example.com');
   res.location('../login'); // /blog/post/1 -\> /blog/login

Mounting:

  When an application is mounted and `res.location()`
  is given a path that does _not_ lead with "/" it becomes
  relative to the mount-point. For example if the application
  is mounted at "/blog", the following would become "/blog/login".

     res.location('login');

  While the leading slash would result in a location of "/login":

     res.location('/login');

#### Parameters

##### url

`string`

#### Returns

`this`

#### Inherited from

```ts
ExpressResponse.location
```

***

### off()

```ts
off<K>(eventName, listener): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/events.d.ts:792

Alias for `emitter.removeListener()`.

#### Type Parameters

##### K

`K`

#### Parameters

##### eventName

`string` | `symbol`

##### listener

(...`args`) => `void`

#### Returns

`this`

#### Since

v10.0.0

#### Inherited from

```ts
ExpressResponse.off
```

***

### on()

#### Call Signature

```ts
on(event, listener): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:999

Adds the `listener` function to the end of the listeners array for the event
named `eventName`. No checks are made to see if the `listener` has already
been added. Multiple calls passing the same combination of `eventName` and
`listener` will result in the `listener` being added, and called, multiple times.

```js
server.on('connection', (stream) => {
  console.log('someone connected!');
});
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

By default, event listeners are invoked in the order they are added. The `emitter.prependListener()` method can be used as an alternative to add the
event listener to the beginning of the listeners array.

```js
import { EventEmitter } from 'node:events';
const myEE = new EventEmitter();
myEE.on('foo', () => console.log('a'));
myEE.prependListener('foo', () => console.log('b'));
myEE.emit('foo');
// Prints:
//   b
//   a
```

##### Parameters

###### event

`"close"`

###### listener

() => `void`

The callback function

##### Returns

`this`

##### Since

v0.1.101

##### Inherited from

```ts
ExpressResponse.on
```

#### Call Signature

```ts
on(event, listener): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:1000

##### Parameters

###### event

`"drain"`

###### listener

() => `void`

##### Returns

`this`

##### Inherited from

```ts
ExpressResponse.on
```

#### Call Signature

```ts
on(event, listener): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:1001

##### Parameters

###### event

`"error"`

###### listener

(`err`) => `void`

##### Returns

`this`

##### Inherited from

```ts
ExpressResponse.on
```

#### Call Signature

```ts
on(event, listener): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:1002

##### Parameters

###### event

`"finish"`

###### listener

() => `void`

##### Returns

`this`

##### Inherited from

```ts
ExpressResponse.on
```

#### Call Signature

```ts
on(event, listener): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:1003

##### Parameters

###### event

`"pipe"`

###### listener

(`src`) => `void`

##### Returns

`this`

##### Inherited from

```ts
ExpressResponse.on
```

#### Call Signature

```ts
on(event, listener): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:1004

##### Parameters

###### event

`"unpipe"`

###### listener

(`src`) => `void`

##### Returns

`this`

##### Inherited from

```ts
ExpressResponse.on
```

#### Call Signature

```ts
on(event, listener): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:1005

##### Parameters

###### event

`string` | `symbol`

###### listener

(...`args`) => `void`

##### Returns

`this`

##### Inherited from

```ts
ExpressResponse.on
```

***

### once()

#### Call Signature

```ts
once(event, listener): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:1006

Adds a **one-time** `listener` function for the event named `eventName`. The
next time `eventName` is triggered, this listener is removed and then invoked.

```js
server.once('connection', (stream) => {
  console.log('Ah, we have our first user!');
});
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

By default, event listeners are invoked in the order they are added. The `emitter.prependOnceListener()` method can be used as an alternative to add the
event listener to the beginning of the listeners array.

```js
import { EventEmitter } from 'node:events';
const myEE = new EventEmitter();
myEE.once('foo', () => console.log('a'));
myEE.prependOnceListener('foo', () => console.log('b'));
myEE.emit('foo');
// Prints:
//   b
//   a
```

##### Parameters

###### event

`"close"`

###### listener

() => `void`

The callback function

##### Returns

`this`

##### Since

v0.3.0

##### Inherited from

```ts
ExpressResponse.once
```

#### Call Signature

```ts
once(event, listener): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:1007

##### Parameters

###### event

`"drain"`

###### listener

() => `void`

##### Returns

`this`

##### Inherited from

```ts
ExpressResponse.once
```

#### Call Signature

```ts
once(event, listener): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:1008

##### Parameters

###### event

`"error"`

###### listener

(`err`) => `void`

##### Returns

`this`

##### Inherited from

```ts
ExpressResponse.once
```

#### Call Signature

```ts
once(event, listener): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:1009

##### Parameters

###### event

`"finish"`

###### listener

() => `void`

##### Returns

`this`

##### Inherited from

```ts
ExpressResponse.once
```

#### Call Signature

```ts
once(event, listener): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:1010

##### Parameters

###### event

`"pipe"`

###### listener

(`src`) => `void`

##### Returns

`this`

##### Inherited from

```ts
ExpressResponse.once
```

#### Call Signature

```ts
once(event, listener): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:1011

##### Parameters

###### event

`"unpipe"`

###### listener

(`src`) => `void`

##### Returns

`this`

##### Inherited from

```ts
ExpressResponse.once
```

#### Call Signature

```ts
once(event, listener): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:1012

##### Parameters

###### event

`string` | `symbol`

###### listener

(...`args`) => `void`

##### Returns

`this`

##### Inherited from

```ts
ExpressResponse.once
```

***

### pipe()

```ts
pipe<T>(destination, options?): T;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:29

#### Type Parameters

##### T

`T` *extends* `WritableStream`

#### Parameters

##### destination

`T`

##### options?

###### end?

`boolean`

#### Returns

`T`

#### Inherited from

```ts
ExpressResponse.pipe
```

***

### prependListener()

#### Call Signature

```ts
prependListener(event, listener): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:1013

Adds the `listener` function to the _beginning_ of the listeners array for the
event named `eventName`. No checks are made to see if the `listener` has
already been added. Multiple calls passing the same combination of `eventName`
and `listener` will result in the `listener` being added, and called, multiple times.

```js
server.prependListener('connection', (stream) => {
  console.log('someone connected!');
});
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

##### Parameters

###### event

`"close"`

###### listener

() => `void`

The callback function

##### Returns

`this`

##### Since

v6.0.0

##### Inherited from

```ts
ExpressResponse.prependListener
```

#### Call Signature

```ts
prependListener(event, listener): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:1014

##### Parameters

###### event

`"drain"`

###### listener

() => `void`

##### Returns

`this`

##### Inherited from

```ts
ExpressResponse.prependListener
```

#### Call Signature

```ts
prependListener(event, listener): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:1015

##### Parameters

###### event

`"error"`

###### listener

(`err`) => `void`

##### Returns

`this`

##### Inherited from

```ts
ExpressResponse.prependListener
```

#### Call Signature

```ts
prependListener(event, listener): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:1016

##### Parameters

###### event

`"finish"`

###### listener

() => `void`

##### Returns

`this`

##### Inherited from

```ts
ExpressResponse.prependListener
```

#### Call Signature

```ts
prependListener(event, listener): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:1017

##### Parameters

###### event

`"pipe"`

###### listener

(`src`) => `void`

##### Returns

`this`

##### Inherited from

```ts
ExpressResponse.prependListener
```

#### Call Signature

```ts
prependListener(event, listener): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:1018

##### Parameters

###### event

`"unpipe"`

###### listener

(`src`) => `void`

##### Returns

`this`

##### Inherited from

```ts
ExpressResponse.prependListener
```

#### Call Signature

```ts
prependListener(event, listener): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:1019

##### Parameters

###### event

`string` | `symbol`

###### listener

(...`args`) => `void`

##### Returns

`this`

##### Inherited from

```ts
ExpressResponse.prependListener
```

***

### prependOnceListener()

#### Call Signature

```ts
prependOnceListener(event, listener): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:1020

Adds a **one-time**`listener` function for the event named `eventName` to the _beginning_ of the listeners array. The next time `eventName` is triggered, this
listener is removed, and then invoked.

```js
server.prependOnceListener('connection', (stream) => {
  console.log('Ah, we have our first user!');
});
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

##### Parameters

###### event

`"close"`

###### listener

() => `void`

The callback function

##### Returns

`this`

##### Since

v6.0.0

##### Inherited from

```ts
ExpressResponse.prependOnceListener
```

#### Call Signature

```ts
prependOnceListener(event, listener): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:1021

##### Parameters

###### event

`"drain"`

###### listener

() => `void`

##### Returns

`this`

##### Inherited from

```ts
ExpressResponse.prependOnceListener
```

#### Call Signature

```ts
prependOnceListener(event, listener): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:1022

##### Parameters

###### event

`"error"`

###### listener

(`err`) => `void`

##### Returns

`this`

##### Inherited from

```ts
ExpressResponse.prependOnceListener
```

#### Call Signature

```ts
prependOnceListener(event, listener): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:1023

##### Parameters

###### event

`"finish"`

###### listener

() => `void`

##### Returns

`this`

##### Inherited from

```ts
ExpressResponse.prependOnceListener
```

#### Call Signature

```ts
prependOnceListener(event, listener): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:1024

##### Parameters

###### event

`"pipe"`

###### listener

(`src`) => `void`

##### Returns

`this`

##### Inherited from

```ts
ExpressResponse.prependOnceListener
```

#### Call Signature

```ts
prependOnceListener(event, listener): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:1025

##### Parameters

###### event

`"unpipe"`

###### listener

(`src`) => `void`

##### Returns

`this`

##### Inherited from

```ts
ExpressResponse.prependOnceListener
```

#### Call Signature

```ts
prependOnceListener(event, listener): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:1026

##### Parameters

###### event

`string` | `symbol`

###### listener

(...`args`) => `void`

##### Returns

`this`

##### Inherited from

```ts
ExpressResponse.prependOnceListener
```

***

### rawListeners()

```ts
rawListeners<K>(eventName): Function[];
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/events.d.ts:863

Returns a copy of the array of listeners for the event named `eventName`,
including any wrappers (such as those created by `.once()`).

```js
import { EventEmitter } from 'node:events';
const emitter = new EventEmitter();
emitter.once('log', () => console.log('log once'));

// Returns a new Array with a function `onceWrapper` which has a property
// `listener` which contains the original listener bound above
const listeners = emitter.rawListeners('log');
const logFnWrapper = listeners[0];

// Logs "log once" to the console and does not unbind the `once` event
logFnWrapper.listener();

// Logs "log once" to the console and removes the listener
logFnWrapper();

emitter.on('log', () => console.log('log persistently'));
// Will return a new Array with a single function bound by `.on()` above
const newListeners = emitter.rawListeners('log');

// Logs "log persistently" twice
newListeners[0]();
emitter.emit('log');
```

#### Type Parameters

##### K

`K`

#### Parameters

##### eventName

`string` | `symbol`

#### Returns

`Function`[]

#### Since

v9.4.0

#### Inherited from

```ts
ExpressResponse.rawListeners
```

***

### redirect()

#### Call Signature

```ts
redirect(url): void;
```

Defined in: node\_modules/.pnpm/@types+express-serve-static-core@5.1.1/node\_modules/@types/express-serve-static-core/index.d.ts:994

Redirect to the given `url` with optional response `status`
defaulting to 302.

The resulting `url` is determined by `res.location()`, so
it will play nicely with mounted apps, relative paths, etc.

Examples:

   res.redirect('/foo/bar');
   res.redirect('http://example.com');
   res.redirect(301, 'http://example.com');
   res.redirect('../login'); // /blog/post/1 -\> /blog/login

##### Parameters

###### url

`string`

##### Returns

`void`

##### Inherited from

```ts
ExpressResponse.redirect
```

#### Call Signature

```ts
redirect(status, url): void;
```

Defined in: node\_modules/.pnpm/@types+express-serve-static-core@5.1.1/node\_modules/@types/express-serve-static-core/index.d.ts:995

##### Parameters

###### status

`number`

###### url

`string`

##### Returns

`void`

##### Inherited from

```ts
ExpressResponse.redirect
```

***

### removeAllListeners()

```ts
removeAllListeners(eventName?): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/events.d.ts:803

Removes all listeners, or those of the specified `eventName`.

It is bad practice to remove listeners added elsewhere in the code,
particularly when the `EventEmitter` instance was created by some other
component or module (e.g. sockets or file streams).

Returns a reference to the `EventEmitter`, so that calls can be chained.

#### Parameters

##### eventName?

`string` | `symbol`

#### Returns

`this`

#### Since

v0.1.26

#### Inherited from

```ts
ExpressResponse.removeAllListeners
```

***

### removeHeader()

```ts
removeHeader(name): void;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/http.d.ts:766

Removes a header that is queued for implicit sending.

```js
outgoingMessage.removeHeader('Content-Encoding');
```

#### Parameters

##### name

`string`

Header name

#### Returns

`void`

#### Since

v0.4.0

#### Inherited from

```ts
ExpressResponse.removeHeader
```

***

### removeListener()

#### Call Signature

```ts
removeListener(event, listener): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:1027

Removes the specified `listener` from the listener array for the event named `eventName`.

```js
const callback = (stream) => {
  console.log('someone connected!');
};
server.on('connection', callback);
// ...
server.removeListener('connection', callback);
```

`removeListener()` will remove, at most, one instance of a listener from the
listener array. If any single listener has been added multiple times to the
listener array for the specified `eventName`, then `removeListener()` must be
called multiple times to remove each instance.

Once an event is emitted, all listeners attached to it at the
time of emitting are called in order. This implies that any `removeListener()` or `removeAllListeners()` calls _after_ emitting and _before_ the last listener finishes execution
will not remove them from`emit()` in progress. Subsequent events behave as expected.

```js
import { EventEmitter } from 'node:events';
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();

const callbackA = () => {
  console.log('A');
  myEmitter.removeListener('event', callbackB);
};

const callbackB = () => {
  console.log('B');
};

myEmitter.on('event', callbackA);

myEmitter.on('event', callbackB);

// callbackA removes listener callbackB but it will still be called.
// Internal listener array at time of emit [callbackA, callbackB]
myEmitter.emit('event');
// Prints:
//   A
//   B

// callbackB is now removed.
// Internal listener array [callbackA]
myEmitter.emit('event');
// Prints:
//   A
```

Because listeners are managed using an internal array, calling this will
change the position indices of any listener registered _after_ the listener
being removed. This will not impact the order in which listeners are called,
but it means that any copies of the listener array as returned by
the `emitter.listeners()` method will need to be recreated.

When a single function has been added as a handler multiple times for a single
event (as in the example below), `removeListener()` will remove the most
recently added instance. In the example the `once('ping')` listener is removed:

```js
import { EventEmitter } from 'node:events';
const ee = new EventEmitter();

function pong() {
  console.log('pong');
}

ee.on('ping', pong);
ee.once('ping', pong);
ee.removeListener('ping', pong);

ee.emit('ping');
ee.emit('ping');
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

##### Parameters

###### event

`"close"`

###### listener

() => `void`

##### Returns

`this`

##### Since

v0.1.26

##### Inherited from

```ts
ExpressResponse.removeListener
```

#### Call Signature

```ts
removeListener(event, listener): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:1028

##### Parameters

###### event

`"drain"`

###### listener

() => `void`

##### Returns

`this`

##### Inherited from

```ts
ExpressResponse.removeListener
```

#### Call Signature

```ts
removeListener(event, listener): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:1029

##### Parameters

###### event

`"error"`

###### listener

(`err`) => `void`

##### Returns

`this`

##### Inherited from

```ts
ExpressResponse.removeListener
```

#### Call Signature

```ts
removeListener(event, listener): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:1030

##### Parameters

###### event

`"finish"`

###### listener

() => `void`

##### Returns

`this`

##### Inherited from

```ts
ExpressResponse.removeListener
```

#### Call Signature

```ts
removeListener(event, listener): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:1031

##### Parameters

###### event

`"pipe"`

###### listener

(`src`) => `void`

##### Returns

`this`

##### Inherited from

```ts
ExpressResponse.removeListener
```

#### Call Signature

```ts
removeListener(event, listener): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:1032

##### Parameters

###### event

`"unpipe"`

###### listener

(`src`) => `void`

##### Returns

`this`

##### Inherited from

```ts
ExpressResponse.removeListener
```

#### Call Signature

```ts
removeListener(event, listener): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:1033

##### Parameters

###### event

`string` | `symbol`

###### listener

(...`args`) => `void`

##### Returns

`this`

##### Inherited from

```ts
ExpressResponse.removeListener
```

***

### render()

#### Call Signature

```ts
render(
   view, 
   options?, 
   callback?): void;
```

Defined in: node\_modules/.pnpm/@types+express-serve-static-core@5.1.1/node\_modules/@types/express-serve-static-core/index.d.ts:1007

Render `view` with the given `options` and optional callback `fn`.
When a callback function is given a response will _not_ be made
automatically, otherwise a response of _200_ and _text/html_ is given.

Options:

 - `cache`     boolean hinting to the engine it should cache
 - `filename`  filename of the view being rendered

##### Parameters

###### view

`string`

###### options?

`object`

###### callback?

(`err`, `html`) => `void`

##### Returns

`void`

##### Inherited from

```ts
ExpressResponse.render
```

#### Call Signature

```ts
render(view, callback?): void;
```

Defined in: node\_modules/.pnpm/@types+express-serve-static-core@5.1.1/node\_modules/@types/express-serve-static-core/index.d.ts:1008

##### Parameters

###### view

`string`

###### callback?

(`err`, `html`) => `void`

##### Returns

`void`

##### Inherited from

```ts
ExpressResponse.render
```

***

### sendFile()

#### Call Signature

```ts
sendFile(path, fn?): void;
```

Defined in: node\_modules/.pnpm/@types+express-serve-static-core@5.1.1/node\_modules/@types/express-serve-static-core/index.d.ts:801

Transfer the file at the given `path`.

Automatically sets the _Content-Type_ response header field.
The callback `fn(err)` is invoked when the transfer is complete
or when an error occurs. Be sure to check `res.headersSent`
if you wish to attempt responding, as the header and some data
may have already been transferred.

Options:

  - `maxAge`   defaulting to 0 (can be string converted by `ms`)
  - `root`     root directory for relative filenames
  - `headers`  object of headers to serve with file
  - `dotfiles` serve dotfiles, defaulting to false; can be `"allow"` to send them

Other options are passed along to `send`.

Examples:

 The following example illustrates how `res.sendFile()` may
 be used as an alternative for the `static()` middleware for
 dynamic situations. The code backing `res.sendFile()` is actually
 the same code, so HTTP cache support etc is identical.

    app.get('/user/:uid/photos/:file', function(req, res)\{
      var uid = req.params.uid
        , file = req.params.file;

      req.user.mayViewFilesFrom(uid, function(yes)\{
        if (yes) \{
          res.sendFile('/uploads/' + uid + '/' + file);
        \} else \{
          res.send(403, 'Sorry! you cant see that.');
        \}
      \});
    \});

##### Parameters

###### path

`string`

###### fn?

`Errback`

##### Returns

`void`

##### Api

public

##### Inherited from

```ts
ExpressResponse.sendFile
```

#### Call Signature

```ts
sendFile(
   path, 
   options, 
   fn?): void;
```

Defined in: node\_modules/.pnpm/@types+express-serve-static-core@5.1.1/node\_modules/@types/express-serve-static-core/index.d.ts:802

##### Parameters

###### path

`string`

###### options

`SendFileOptions`

###### fn?

`Errback`

##### Returns

`void`

##### Inherited from

```ts
ExpressResponse.sendFile
```

***

### sendStatus()

```ts
sendStatus(code): this;
```

Defined in: node\_modules/.pnpm/@types+express-serve-static-core@5.1.1/node\_modules/@types/express-serve-static-core/index.d.ts:711

Set the response HTTP status code to `statusCode` and send its string representation as the response body.

#### Parameters

##### code

`number`

#### Returns

`this`

#### Link

http://expressjs.com/4x/api.html#res.sendStatus

Examples:

   res.sendStatus(200); // equivalent to res.status(200).send('OK')
   res.sendStatus(403); // equivalent to res.status(403).send('Forbidden')
   res.sendStatus(404); // equivalent to res.status(404).send('Not Found')
   res.sendStatus(500); // equivalent to res.status(500).send('Internal Server Error')

#### Inherited from

```ts
ExpressResponse.sendStatus
```

***

### set()

#### Call Signature

```ts
set(field): this;
```

Defined in: node\_modules/.pnpm/@types+express-serve-static-core@5.1.1/node\_modules/@types/express-serve-static-core/index.d.ts:920

Set header `field` to `val`, or pass
an object of header fields.

Examples:

   res.set('Foo', ['bar', 'baz']);
   res.set('Accept', 'application/json');
   res.set(\{ Accept: 'text/plain', 'X-API-Key': 'tobi' \});

Aliased as `res.header()`.

##### Parameters

###### field

`any`

##### Returns

`this`

##### Inherited from

```ts
ExpressResponse.set
```

#### Call Signature

```ts
set(field, value?): this;
```

Defined in: node\_modules/.pnpm/@types+express-serve-static-core@5.1.1/node\_modules/@types/express-serve-static-core/index.d.ts:921

##### Parameters

###### field

`string`

###### value?

`string` | `string`[]

##### Returns

`this`

##### Inherited from

```ts
ExpressResponse.set
```

***

### setDefaultEncoding()

```ts
setDefaultEncoding(encoding): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:877

The `writable.setDefaultEncoding()` method sets the default `encoding` for a `Writable` stream.

#### Parameters

##### encoding

`BufferEncoding`

The new default encoding

#### Returns

`this`

#### Since

v0.11.15

#### Inherited from

```ts
ExpressResponse.setDefaultEncoding
```

***

### setHeader()

```ts
setHeader(name, value): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/http.d.ts:659

Sets a single header value. If the header already exists in the to-be-sent
headers, its value will be replaced. Use an array of strings to send multiple
headers with the same name.

#### Parameters

##### name

`string`

Header name

##### value

Header value

`string` | `number` | readonly `string`[]

#### Returns

`this`

#### Since

v0.4.0

#### Inherited from

```ts
ExpressResponse.setHeader
```

***

### setHeaders()

```ts
setHeaders(headers): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/http.d.ts:695

Sets multiple header values for implicit headers. headers must be an instance of
`Headers` or `Map`, if a header already exists in the to-be-sent headers, its
value will be replaced.

```js
const headers = new Headers({ foo: 'bar' });
outgoingMessage.setHeaders(headers);
```

or

```js
const headers = new Map([['foo', 'bar']]);
outgoingMessage.setHeaders(headers);
```

When headers have been set with `outgoingMessage.setHeaders()`, they will be
merged with any headers passed to `response.writeHead()`, with the headers passed
to `response.writeHead()` given precedence.

```js
// Returns content-type = text/plain
const server = http.createServer((req, res) => {
  const headers = new Headers({ 'Content-Type': 'text/html' });
  res.setHeaders(headers);
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('ok');
});
```

#### Parameters

##### headers

`Headers` | `Map`\<`string`, `string` \| `number` \| readonly `string`[]\>

#### Returns

`this`

#### Since

v19.6.0, v18.15.0

#### Inherited from

```ts
ExpressResponse.setHeaders
```

***

### setMaxListeners()

```ts
setMaxListeners(n): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/events.d.ts:813

By default `EventEmitter`s will print a warning if more than `10` listeners are
added for a particular event. This is a useful default that helps finding
memory leaks. The `emitter.setMaxListeners()` method allows the limit to be
modified for this specific `EventEmitter` instance. The value can be set to `Infinity` (or `0`) to indicate an unlimited number of listeners.

Returns a reference to the `EventEmitter`, so that calls can be chained.

#### Parameters

##### n

`number`

#### Returns

`this`

#### Since

v0.3.5

#### Inherited from

```ts
ExpressResponse.setMaxListeners
```

***

### setTimeout()

```ts
setTimeout(msecs, callback?): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/http.d.ts:650

Once a socket is associated with the message and is connected, `socket.setTimeout()` will be called with `msecs` as the first parameter.

#### Parameters

##### msecs

`number`

##### callback?

() => `void`

Optional function to be called when a timeout occurs. Same as binding to the `timeout` event.

#### Returns

`this`

#### Since

v0.9.12

#### Inherited from

```ts
ExpressResponse.setTimeout
```

***

### status()

```ts
status(code): this;
```

Defined in: node\_modules/.pnpm/@types+express-serve-static-core@5.1.1/node\_modules/@types/express-serve-static-core/index.d.ts:698

Set status `code`.

#### Parameters

##### code

`number`

#### Returns

`this`

#### Inherited from

```ts
ExpressResponse.status
```

***

### type()

```ts
type(type): this;
```

Defined in: node\_modules/.pnpm/@types+express-serve-static-core@5.1.1/node\_modules/@types/express-serve-static-core/index.d.ts:847

Set _Content-Type_ response header with `type` through `mime.lookup()`
when it does not contain "/", or set the Content-Type to `type` otherwise.

Examples:

    res.type('.html');
    res.type('html');
    res.type('json');
    res.type('application/json');
    res.type('png');

#### Parameters

##### type

`string`

#### Returns

`this`

#### Inherited from

```ts
ExpressResponse.type
```

***

### uncork()

```ts
uncork(): void;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:951

The `writable.uncork()` method flushes all data buffered since [cork](#cork) was called.

When using `writable.cork()` and `writable.uncork()` to manage the buffering
of writes to a stream, defer calls to `writable.uncork()` using `process.nextTick()`. Doing so allows batching of all `writable.write()` calls that occur within a given Node.js event
loop phase.

```js
stream.cork();
stream.write('some ');
stream.write('data ');
process.nextTick(() => stream.uncork());
```

If the `writable.cork()` method is called multiple times on a stream, the
same number of calls to `writable.uncork()` must be called to flush the buffered
data.

```js
stream.cork();
stream.write('some ');
stream.cork();
stream.write('data ');
process.nextTick(() => {
  stream.uncork();
  // The data will not be flushed until uncork() is called a second time.
  stream.uncork();
});
```

See also: `writable.cork()`.

#### Returns

`void`

#### Since

v0.11.2

#### Inherited from

```ts
ExpressResponse.uncork
```

***

### vary()

```ts
vary(field): this;
```

Defined in: node\_modules/.pnpm/@types+express-serve-static-core@5.1.1/node\_modules/@types/express-serve-static-core/index.d.ts:1020

Adds the field to the Vary response header, if it is not there already.
Examples:

    res.vary('User-Agent').render('docs');

#### Parameters

##### field

`string`

#### Returns

`this`

#### Inherited from

```ts
ExpressResponse.vary
```

***

### write()

#### Call Signature

```ts
write(chunk, callback?): boolean;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:870

The `writable.write()` method writes some data to the stream, and calls the
supplied `callback` once the data has been fully handled. If an error
occurs, the `callback` will be called with the error as its
first argument. The `callback` is called asynchronously and before `'error'` is
emitted.

The return value is `true` if the internal buffer is less than the `highWaterMark` configured when the stream was created after admitting `chunk`.
If `false` is returned, further attempts to write data to the stream should
stop until the `'drain'` event is emitted.

While a stream is not draining, calls to `write()` will buffer `chunk`, and
return false. Once all currently buffered chunks are drained (accepted for
delivery by the operating system), the `'drain'` event will be emitted.
Once `write()` returns false, do not write more chunks
until the `'drain'` event is emitted. While calling `write()` on a stream that
is not draining is allowed, Node.js will buffer all written chunks until
maximum memory usage occurs, at which point it will abort unconditionally.
Even before it aborts, high memory usage will cause poor garbage collector
performance and high RSS (which is not typically released back to the system,
even after the memory is no longer required). Since TCP sockets may never
drain if the remote peer does not read the data, writing a socket that is
not draining may lead to a remotely exploitable vulnerability.

Writing data while the stream is not draining is particularly
problematic for a `Transform`, because the `Transform` streams are paused
by default until they are piped or a `'data'` or `'readable'` event handler
is added.

If the data to be written can be generated or fetched on demand, it is
recommended to encapsulate the logic into a `Readable` and use [pipe](#pipe). However, if calling `write()` is preferred, it is
possible to respect backpressure and avoid memory issues using the `'drain'` event:

```js
function write(data, cb) {
  if (!stream.write(data)) {
    stream.once('drain', cb);
  } else {
    process.nextTick(cb);
  }
}

// Wait for cb to be called before doing any other write.
write('hello', () => {
  console.log('Write completed, do more writes now.');
});
```

A `Writable` stream in object mode will always ignore the `encoding` argument.

##### Parameters

###### chunk

`any`

Optional data to write. For streams not operating in object mode, `chunk` must be a \{string\}, \{Buffer\},
\{TypedArray\} or \{DataView\}. For object mode streams, `chunk` may be any JavaScript value other than `null`.

###### callback?

(`error`) => `void`

Callback for when this chunk of data is flushed.

##### Returns

`boolean`

`false` if the stream wishes for the calling code to wait for the `'drain'` event to be emitted before continuing to write additional data; otherwise `true`.

##### Since

v0.9.4

##### Inherited from

```ts
ExpressResponse.write
```

#### Call Signature

```ts
write(
   chunk, 
   encoding, 
   callback?): boolean;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:871

The `writable.write()` method writes some data to the stream, and calls the
supplied `callback` once the data has been fully handled. If an error
occurs, the `callback` will be called with the error as its
first argument. The `callback` is called asynchronously and before `'error'` is
emitted.

The return value is `true` if the internal buffer is less than the `highWaterMark` configured when the stream was created after admitting `chunk`.
If `false` is returned, further attempts to write data to the stream should
stop until the `'drain'` event is emitted.

While a stream is not draining, calls to `write()` will buffer `chunk`, and
return false. Once all currently buffered chunks are drained (accepted for
delivery by the operating system), the `'drain'` event will be emitted.
Once `write()` returns false, do not write more chunks
until the `'drain'` event is emitted. While calling `write()` on a stream that
is not draining is allowed, Node.js will buffer all written chunks until
maximum memory usage occurs, at which point it will abort unconditionally.
Even before it aborts, high memory usage will cause poor garbage collector
performance and high RSS (which is not typically released back to the system,
even after the memory is no longer required). Since TCP sockets may never
drain if the remote peer does not read the data, writing a socket that is
not draining may lead to a remotely exploitable vulnerability.

Writing data while the stream is not draining is particularly
problematic for a `Transform`, because the `Transform` streams are paused
by default until they are piped or a `'data'` or `'readable'` event handler
is added.

If the data to be written can be generated or fetched on demand, it is
recommended to encapsulate the logic into a `Readable` and use [pipe](#pipe). However, if calling `write()` is preferred, it is
possible to respect backpressure and avoid memory issues using the `'drain'` event:

```js
function write(data, cb) {
  if (!stream.write(data)) {
    stream.once('drain', cb);
  } else {
    process.nextTick(cb);
  }
}

// Wait for cb to be called before doing any other write.
write('hello', () => {
  console.log('Write completed, do more writes now.');
});
```

A `Writable` stream in object mode will always ignore the `encoding` argument.

##### Parameters

###### chunk

`any`

Optional data to write. For streams not operating in object mode, `chunk` must be a \{string\}, \{Buffer\},
\{TypedArray\} or \{DataView\}. For object mode streams, `chunk` may be any JavaScript value other than `null`.

###### encoding

`BufferEncoding`

The encoding, if `chunk` is a string.

###### callback?

(`error`) => `void`

Callback for when this chunk of data is flushed.

##### Returns

`boolean`

`false` if the stream wishes for the calling code to wait for the `'drain'` event to be emitted before continuing to write additional data; otherwise `true`.

##### Since

v0.9.4

##### Inherited from

```ts
ExpressResponse.write
```

***

### writeContinue()

```ts
writeContinue(callback?): void;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/http.d.ts:853

Sends an HTTP/1.1 100 Continue message to the client, indicating that
the request body should be sent. See the `'checkContinue'` event on `Server`.

#### Parameters

##### callback?

() => `void`

#### Returns

`void`

#### Since

v0.3.0

#### Inherited from

```ts
ExpressResponse.writeContinue
```

***

### writeEarlyHints()

```ts
writeEarlyHints(hints, callback?): void;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/http.d.ts:887

Sends an HTTP/1.1 103 Early Hints message to the client with a Link header,
indicating that the user agent can preload/preconnect the linked resources.
The `hints` is an object containing the values of headers to be sent with
early hints message. The optional `callback` argument will be called when
the response message has been written.

**Example**

```js
const earlyHintsLink = '</styles.css>; rel=preload; as=style';
response.writeEarlyHints({
  'link': earlyHintsLink,
});

const earlyHintsLinks = [
  '</styles.css>; rel=preload; as=style',
  '</scripts.js>; rel=preload; as=script',
];
response.writeEarlyHints({
  'link': earlyHintsLinks,
  'x-trace-id': 'id for diagnostics',
});

const earlyHintsCallback = () => console.log('early hints message sent');
response.writeEarlyHints({
  'link': earlyHintsLinks,
}, earlyHintsCallback);
```

#### Parameters

##### hints

`Record`\<`string`, `string` \| `string`[]\>

An object containing the values of headers

##### callback?

() => `void`

Will be called when the response message has been written

#### Returns

`void`

#### Since

v18.11.0

#### Inherited from

```ts
ExpressResponse.writeEarlyHints
```

***

### writeHead()

#### Call Signature

```ts
writeHead(
   statusCode, 
   statusMessage?, 
   headers?): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/http.d.ts:945

Sends a response header to the request. The status code is a 3-digit HTTP
status code, like `404`. The last argument, `headers`, are the response headers.
Optionally one can give a human-readable `statusMessage` as the second
argument.

`headers` may be an `Array` where the keys and values are in the same list.
It is _not_ a list of tuples. So, the even-numbered offsets are key values,
and the odd-numbered offsets are the associated values. The array is in the same
format as `request.rawHeaders`.

Returns a reference to the `ServerResponse`, so that calls can be chained.

```js
const body = 'hello world';
response
  .writeHead(200, {
    'Content-Length': Buffer.byteLength(body),
    'Content-Type': 'text/plain',
  })
  .end(body);
```

This method must only be called once on a message and it must
be called before `response.end()` is called.

If `response.write()` or `response.end()` are called before calling
this, the implicit/mutable headers will be calculated and call this function.

When headers have been set with `response.setHeader()`, they will be merged
with any headers passed to `response.writeHead()`, with the headers passed
to `response.writeHead()` given precedence.

If this method is called and `response.setHeader()` has not been called,
it will directly write the supplied header values onto the network channel
without caching internally, and the `response.getHeader()` on the header
will not yield the expected result. If progressive population of headers is
desired with potential future retrieval and modification, use `response.setHeader()` instead.

```js
// Returns content-type = text/plain
const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('X-Foo', 'bar');
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('ok');
});
```

`Content-Length` is read in bytes, not characters. Use `Buffer.byteLength()` to determine the length of the body in bytes. Node.js
will check whether `Content-Length` and the length of the body which has
been transmitted are equal or not.

Attempting to set a header field name or value that contains invalid characters
will result in a \[`Error`\]\[\] being thrown.

##### Parameters

###### statusCode

`number`

###### statusMessage?

`string`

###### headers?

`OutgoingHttpHeaders` | `OutgoingHttpHeader`[]

##### Returns

`this`

##### Since

v0.1.30

##### Inherited from

```ts
ExpressResponse.writeHead
```

#### Call Signature

```ts
writeHead(statusCode, headers?): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/http.d.ts:950

Sends a response header to the request. The status code is a 3-digit HTTP
status code, like `404`. The last argument, `headers`, are the response headers.
Optionally one can give a human-readable `statusMessage` as the second
argument.

`headers` may be an `Array` where the keys and values are in the same list.
It is _not_ a list of tuples. So, the even-numbered offsets are key values,
and the odd-numbered offsets are the associated values. The array is in the same
format as `request.rawHeaders`.

Returns a reference to the `ServerResponse`, so that calls can be chained.

```js
const body = 'hello world';
response
  .writeHead(200, {
    'Content-Length': Buffer.byteLength(body),
    'Content-Type': 'text/plain',
  })
  .end(body);
```

This method must only be called once on a message and it must
be called before `response.end()` is called.

If `response.write()` or `response.end()` are called before calling
this, the implicit/mutable headers will be calculated and call this function.

When headers have been set with `response.setHeader()`, they will be merged
with any headers passed to `response.writeHead()`, with the headers passed
to `response.writeHead()` given precedence.

If this method is called and `response.setHeader()` has not been called,
it will directly write the supplied header values onto the network channel
without caching internally, and the `response.getHeader()` on the header
will not yield the expected result. If progressive population of headers is
desired with potential future retrieval and modification, use `response.setHeader()` instead.

```js
// Returns content-type = text/plain
const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('X-Foo', 'bar');
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('ok');
});
```

`Content-Length` is read in bytes, not characters. Use `Buffer.byteLength()` to determine the length of the body in bytes. Node.js
will check whether `Content-Length` and the length of the body which has
been transmitted are equal or not.

Attempting to set a header field name or value that contains invalid characters
will result in a \[`Error`\]\[\] being thrown.

##### Parameters

###### statusCode

`number`

###### headers?

`OutgoingHttpHeaders` | `OutgoingHttpHeader`[]

##### Returns

`this`

##### Since

v0.1.30

##### Inherited from

```ts
ExpressResponse.writeHead
```

***

### writeProcessing()

```ts
writeProcessing(callback?): void;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/http.d.ts:956

Sends a HTTP/1.1 102 Processing message to the client, indicating that
the request body should be sent.

#### Parameters

##### callback?

() => `void`

#### Returns

`void`

#### Since

v10.0.0

#### Inherited from

```ts
ExpressResponse.writeProcessing
```
