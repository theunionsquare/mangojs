---
sidebar_label: MangoJS
---

# MangoJS

## Namespaces

- [Applications](MangoJS/namespaces/Applications/index.md)
- [Authentication](MangoJS/namespaces/Authentication/index.md)
- [Builders](MangoJS/namespaces/Builders/index.md)
- [Cache](MangoJS/namespaces/Cache/index.md)
- [Clients](MangoJS/namespaces/Clients/index.md)
- [Container](MangoJS/namespaces/Container/index.md)
- [DatabaseManager](MangoJS/namespaces/DatabaseManager/index.md)
- [~~Databases~~](MangoJS/namespaces/Databases/index.md)
- [Decorators](MangoJS/namespaces/Decorators/index.md)
- [Errors](MangoJS/namespaces/Errors/index.md)
- [Integrations](MangoJS/namespaces/Integrations/index.md)
- [Loggers](MangoJS/namespaces/Loggers/index.md)
- [~~Mappers~~](MangoJS/namespaces/Mappers/index.md)
- [Middlewares](MangoJS/namespaces/Middlewares/index.md)
- [Persistence](MangoJS/namespaces/Persistence/index.md)
- [Queue](MangoJS/namespaces/Queue/index.md)
- [Scheduler](MangoJS/namespaces/Scheduler/index.md)
- [Types](MangoJS/namespaces/Types/index.md)
- [Utils](MangoJS/namespaces/Utils/index.md)

## Enumerations

### Methods

Defined in: [packages/core/src/core/decorators/http/handlers.decorator.ts:6](https://github.com/theunionsquare/mangojs/blob/e9b931cfa8d37ff10d485490a7c7959b19e4bfb1/packages/core/src/core/decorators/http/handlers.decorator.ts#L6)

HTTP VERB ENUM

#### Enumeration Members

##### DELETE

```ts
DELETE: "delete";
```

Defined in: [packages/core/src/core/decorators/http/handlers.decorator.ts:10](https://github.com/theunionsquare/mangojs/blob/e9b931cfa8d37ff10d485490a7c7959b19e4bfb1/packages/core/src/core/decorators/http/handlers.decorator.ts#L10)

##### GET

```ts
GET: "get";
```

Defined in: [packages/core/src/core/decorators/http/handlers.decorator.ts:7](https://github.com/theunionsquare/mangojs/blob/e9b931cfa8d37ff10d485490a7c7959b19e4bfb1/packages/core/src/core/decorators/http/handlers.decorator.ts#L7)

##### POST

```ts
POST: "post";
```

Defined in: [packages/core/src/core/decorators/http/handlers.decorator.ts:8](https://github.com/theunionsquare/mangojs/blob/e9b931cfa8d37ff10d485490a7c7959b19e4bfb1/packages/core/src/core/decorators/http/handlers.decorator.ts#L8)

##### PUT

```ts
PUT: "put";
```

Defined in: [packages/core/src/core/decorators/http/handlers.decorator.ts:9](https://github.com/theunionsquare/mangojs/blob/e9b931cfa8d37ff10d485490a7c7959b19e4bfb1/packages/core/src/core/decorators/http/handlers.decorator.ts#L9)

## Classes

### ~~`abstract` BaseRepository~~

Defined in: [packages/core/src/core/databases/interfaces/BaseRepository.ts:12](https://github.com/theunionsquare/mangojs/blob/e9b931cfa8d37ff10d485490a7c7959b19e4bfb1/packages/core/src/core/databases/interfaces/BaseRepository.ts#L12)

Abstract base repository implementing basic CRUD operations.

#### Deprecated

This class will be removed in a future version.
Use TypeORM repositories directly instead.

#### Type Parameters

##### T

`T`

#### Implements

- `IRead`\<`T`\>
- `IWrite`\<`T`\>

#### Constructors

##### Constructor

```ts
new BaseRepository<T>(): BaseRepository<T>;
```

Defined in: [packages/core/src/core/databases/interfaces/BaseRepository.ts:15](https://github.com/theunionsquare/mangojs/blob/e9b931cfa8d37ff10d485490a7c7959b19e4bfb1/packages/core/src/core/databases/interfaces/BaseRepository.ts#L15)

###### Returns

[`BaseRepository`](#abstract-baserepository)\<`T`\>

#### Properties

##### ~~\_collection~~

```ts
readonly _collection: any;
```

Defined in: [packages/core/src/core/databases/interfaces/BaseRepository.ts:13](https://github.com/theunionsquare/mangojs/blob/e9b931cfa8d37ff10d485490a7c7959b19e4bfb1/packages/core/src/core/databases/interfaces/BaseRepository.ts#L13)

#### Methods

##### ~~count()~~

```ts
count(): Promise<Number>;
```

Defined in: [packages/core/src/core/databases/interfaces/BaseRepository.ts:34](https://github.com/theunionsquare/mangojs/blob/e9b931cfa8d37ff10d485490a7c7959b19e4bfb1/packages/core/src/core/databases/interfaces/BaseRepository.ts#L34)

###### Returns

`Promise`\<`Number`\>

##### ~~create()~~

```ts
create(item): Promise<boolean>;
```

Defined in: [packages/core/src/core/databases/interfaces/BaseRepository.ts:25](https://github.com/theunionsquare/mangojs/blob/e9b931cfa8d37ff10d485490a7c7959b19e4bfb1/packages/core/src/core/databases/interfaces/BaseRepository.ts#L25)

###### Parameters

###### item

`T`

###### Returns

`Promise`\<`boolean`\>

###### Implementation of

```ts
IWrite.create
```

##### ~~delete()~~

```ts
delete(id): Promise<boolean>;
```

Defined in: [packages/core/src/core/databases/interfaces/BaseRepository.ts:31](https://github.com/theunionsquare/mangojs/blob/e9b931cfa8d37ff10d485490a7c7959b19e4bfb1/packages/core/src/core/databases/interfaces/BaseRepository.ts#L31)

###### Parameters

###### id

`string`

###### Returns

`Promise`\<`boolean`\>

###### Implementation of

```ts
IWrite.delete
```

##### ~~find()~~

```ts
find(item): Promise<T[]>;
```

Defined in: [packages/core/src/core/databases/interfaces/BaseRepository.ts:19](https://github.com/theunionsquare/mangojs/blob/e9b931cfa8d37ff10d485490a7c7959b19e4bfb1/packages/core/src/core/databases/interfaces/BaseRepository.ts#L19)

###### Parameters

###### item

`T`

###### Returns

`Promise`\<`T`[]\>

###### Implementation of

```ts
IRead.find
```

##### ~~findOne()~~

```ts
findOne(id): Promise<T>;
```

Defined in: [packages/core/src/core/databases/interfaces/BaseRepository.ts:22](https://github.com/theunionsquare/mangojs/blob/e9b931cfa8d37ff10d485490a7c7959b19e4bfb1/packages/core/src/core/databases/interfaces/BaseRepository.ts#L22)

###### Parameters

###### id

`string`

###### Returns

`Promise`\<`T`\>

###### Implementation of

```ts
IRead.findOne
```

##### ~~update()~~

```ts
update(id, item): Promise<boolean>;
```

Defined in: [packages/core/src/core/databases/interfaces/BaseRepository.ts:28](https://github.com/theunionsquare/mangojs/blob/e9b931cfa8d37ff10d485490a7c7959b19e4bfb1/packages/core/src/core/databases/interfaces/BaseRepository.ts#L28)

###### Parameters

###### id

`string`

###### item

`T`

###### Returns

`Promise`\<`boolean`\>

###### Implementation of

```ts
IWrite.update
```

***

### ~~PersistenceContext2~~

Defined in: [packages/core/src/core/persistence/PersistenceContext.ts:13](https://github.com/theunionsquare/mangojs/blob/e9b931cfa8d37ff10d485490a7c7959b19e4bfb1/packages/core/src/core/persistence/PersistenceContext.ts#L13)

Generic MongoDB persistence context.

#### Deprecated

Use MongoosePersistenceContext instead.

#### Implements

- [`IPersistenceContext`](MangoJS/namespaces/Persistence/index.md#ipersistencecontext)\<`mongoose.Connection`\>

#### Constructors

##### Constructor

```ts
new PersistenceContext2(entityManager): PersistenceContext2;
```

Defined in: [packages/core/src/core/persistence/PersistenceContext.ts:16](https://github.com/theunionsquare/mangojs/blob/e9b931cfa8d37ff10d485490a7c7959b19e4bfb1/packages/core/src/core/persistence/PersistenceContext.ts#L16)

###### Parameters

###### entityManager

[`IDatabaseManagerFactory`](MangoJS/namespaces/DatabaseManager/index.md#idatabasemanagerfactory)

###### Returns

[`PersistenceContext2`](#persistencecontext2)

#### Methods

##### ~~inTransaction()~~

```ts
inTransaction<R>(context): Promise<R>;
```

Defined in: [packages/core/src/core/persistence/PersistenceContext.ts:30](https://github.com/theunionsquare/mangojs/blob/e9b931cfa8d37ff10d485490a7c7959b19e4bfb1/packages/core/src/core/persistence/PersistenceContext.ts#L30)

Execute operations within a transaction context.

###### Type Parameters

###### R

`R`

The return type of the transaction

###### Parameters

###### context

[`Context`](MangoJS/namespaces/Persistence/index.md#context)\<`Connection`, `R`\>

Function receiving the mongoose Connection

###### Returns

`Promise`\<`R`\>

Result of the transaction

###### Implementation of

[`IPersistenceContext`](MangoJS/namespaces/Persistence/index.md#ipersistencecontext).[`inTransaction`](MangoJS/namespaces/Persistence/index.md#intransaction-4)

## Interfaces

### IRouter

Defined in: [packages/core/src/core/decorators/http/handlers.decorator.ts:16](https://github.com/theunionsquare/mangojs/blob/e9b931cfa8d37ff10d485490a7c7959b19e4bfb1/packages/core/src/core/decorators/http/handlers.decorator.ts#L16)

Router interface

#### Properties

##### handlerName

```ts
handlerName: string | symbol;
```

Defined in: [packages/core/src/core/decorators/http/handlers.decorator.ts:19](https://github.com/theunionsquare/mangojs/blob/e9b931cfa8d37ff10d485490a7c7959b19e4bfb1/packages/core/src/core/decorators/http/handlers.decorator.ts#L19)

##### method

```ts
method: Methods;
```

Defined in: [packages/core/src/core/decorators/http/handlers.decorator.ts:17](https://github.com/theunionsquare/mangojs/blob/e9b931cfa8d37ff10d485490a7c7959b19e4bfb1/packages/core/src/core/decorators/http/handlers.decorator.ts#L17)

##### path

```ts
path: string;
```

Defined in: [packages/core/src/core/decorators/http/handlers.decorator.ts:18](https://github.com/theunionsquare/mangojs/blob/e9b931cfa8d37ff10d485490a7c7959b19e4bfb1/packages/core/src/core/decorators/http/handlers.decorator.ts#L18)

***

### Request

Defined in: [packages/core/src/core/types/api/index.ts:91](https://github.com/theunionsquare/mangojs/blob/e9b931cfa8d37ff10d485490a7c7959b19e4bfb1/packages/core/src/core/types/api/index.ts#L91)

Generic API request extending Express Request.

#### Example

```ts
// Request with path param 'id', body with 'name', and query param 'filter'
type MyRequest = Request<{ id: string }, { name: string }, { filter: string }>;
```

#### Extends

- `Request`\<`P`, `any`, `B`, `Q`\>

#### Extended by

- [`AuthenticatedRequest`](MangoJS/namespaces/Middlewares/index.md#authenticatedrequest)

#### Type Parameters

##### P

`P` = `any`

URL path parameters (e.g., `{ id: string }` for route `/users/:id`)

##### B

`B` = `any`

Request body type (e.g., `{ name: string }` for POST/PUT payloads)

##### Q

`Q` = `any`

Query string parameters (e.g., `{ page: number }` for `/api/users?page=1`)

#### Properties

##### ~~aborted~~

```ts
aborted: boolean;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/http.d.ts:1260

The `message.aborted` property will be `true` if the request has
been aborted.

###### Since

v10.1.0

###### Deprecated

Since v17.0.0,v16.12.0 - Check `message.destroyed` from \<a href="stream.html#class-streamreadable" class="type"\>stream.Readable\</a\>.

###### Inherited from

```ts
ExpressRequest.aborted
```

##### accepted

```ts
accepted: MediaType[];
```

Defined in: node\_modules/.pnpm/@types+express-serve-static-core@5.1.1/node\_modules/@types/express-serve-static-core/index.d.ts:530

Return an array of Accepted media types
ordered from highest quality to lowest.

###### Inherited from

[`Request`](#request).[`accepted`](#accepted)

##### app

```ts
app: Application;
```

Defined in: node\_modules/.pnpm/@types+express-serve-static-core@5.1.1/node\_modules/@types/express-serve-static-core/index.d.ts:661

###### Inherited from

[`Request`](#request).[`app`](#app)

##### baseUrl

```ts
baseUrl: string;
```

Defined in: node\_modules/.pnpm/@types+express-serve-static-core@5.1.1/node\_modules/@types/express-serve-static-core/index.d.ts:659

###### Inherited from

[`Request`](#request).[`baseUrl`](#baseurl)

##### body

```ts
body: B;
```

Defined in: node\_modules/.pnpm/@types+express-serve-static-core@5.1.1/node\_modules/@types/express-serve-static-core/index.d.ts:640

###### Inherited from

```ts
ExpressRequest.body
```

##### closed

```ts
readonly closed: boolean;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:157

Is `true` after `'close'` has been emitted.

###### Since

v18.0.0

###### Inherited from

```ts
ExpressRequest.closed
```

##### complete

```ts
complete: boolean;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/http.d.ts:1295

The `message.complete` property will be `true` if a complete HTTP message has
been received and successfully parsed.

This property is particularly useful as a means of determining if a client or
server fully transmitted a message before a connection was terminated:

```js
const req = http.request({
  host: '127.0.0.1',
  port: 8080,
  method: 'POST',
}, (res) => {
  res.resume();
  res.on('end', () => {
    if (!res.complete)
      console.error(
        'The connection was terminated while the message was still being sent');
  });
});
```

###### Since

v0.3.0

###### Inherited from

```ts
ExpressRequest.complete
```

##### ~~connection~~

```ts
connection: Socket;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/http.d.ts:1301

Alias for `message.socket`.

###### Since

v0.1.90

###### Deprecated

Since v16.0.0 - Use `socket`.

###### Inherited from

```ts
ExpressRequest.connection
```

##### cookies

```ts
cookies: any;
```

Defined in: node\_modules/.pnpm/@types+express-serve-static-core@5.1.1/node\_modules/@types/express-serve-static-core/index.d.ts:643

###### Inherited from

[`Request`](#request).[`cookies`](#cookies)

##### destroyed

```ts
destroyed: boolean;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:152

Is `true` after `readable.destroy()` has been called.

###### Since

v8.0.0

###### Inherited from

```ts
ExpressRequest.destroyed
```

##### errored

```ts
readonly errored: Error;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:162

Returns error if the stream has been destroyed with an error.

###### Since

v18.0.0

###### Inherited from

[`Request`](#request).[`errored`](#errored)

##### fresh

```ts
readonly fresh: boolean;
```

Defined in: node\_modules/.pnpm/@types+express-serve-static-core@5.1.1/node\_modules/@types/express-serve-static-core/index.d.ts:625

Check if the request is fresh, aka
Last-Modified and/or the ETag
still match.

###### Inherited from

[`Request`](#request).[`fresh`](#fresh)

##### headers

```ts
headers: IncomingHttpHeaders;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/http.d.ts:1341

The request/response headers object.

Key-value pairs of header names and values. Header names are lower-cased.

```js
// Prints something like:
//
// { 'user-agent': 'curl/7.22.0',
//   host: '127.0.0.1:8000',
//   accept: '*' }
console.log(request.headers);
```

Duplicates in raw headers are handled in the following ways, depending on the
header name:

* Duplicates of `age`, `authorization`, `content-length`, `content-type`, `etag`, `expires`, `from`, `host`, `if-modified-since`, `if-unmodified-since`, `last-modified`, `location`,
`max-forwards`, `proxy-authorization`, `referer`, `retry-after`, `server`, or `user-agent` are discarded.
To allow duplicate values of the headers listed above to be joined,
use the option `joinDuplicateHeaders` in request and createServer. See RFC 9110 Section 5.3 for more
information.
* `set-cookie` is always an array. Duplicates are added to the array.
* For duplicate `cookie` headers, the values are joined together with `; `.
* For all other headers, the values are joined together with `, `.

###### Since

v0.1.5

###### Inherited from

```ts
ExpressRequest.headers
```

##### headersDistinct

```ts
headersDistinct: Dict<string[]>;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/http.d.ts:1356

Similar to `message.headers`, but there is no join logic and the values are
always arrays of strings, even for headers received just once.

```js
// Prints something like:
//
// { 'user-agent': ['curl/7.22.0'],
//   host: ['127.0.0.1:8000'],
//   accept: ['*'] }
console.log(request.headersDistinct);
```

###### Since

v18.3.0, v16.17.0

###### Inherited from

```ts
ExpressRequest.headersDistinct
```

##### host

```ts
readonly host: string;
```

Defined in: node\_modules/.pnpm/@types+express-serve-static-core@5.1.1/node\_modules/@types/express-serve-static-core/index.d.ts:618

Contains the host derived from the `Host` HTTP header.

###### Inherited from

[`Request`](#request).[`host`](#host)

##### hostname

```ts
readonly hostname: string;
```

Defined in: node\_modules/.pnpm/@types+express-serve-static-core@5.1.1/node\_modules/@types/express-serve-static-core/index.d.ts:613

Contains the hostname derived from the `Host` HTTP header.

###### Inherited from

[`Request`](#request).[`hostname`](#hostname)

##### httpVersion

```ts
httpVersion: string;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/http.d.ts:1269

In case of server request, the HTTP version sent by the client. In the case of
client response, the HTTP version of the connected-to server.
Probably either `'1.1'` or `'1.0'`.

Also `message.httpVersionMajor` is the first integer and `message.httpVersionMinor` is the second.

###### Since

v0.1.1

###### Inherited from

```ts
ExpressRequest.httpVersion
```

##### httpVersionMajor

```ts
httpVersionMajor: number;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/http.d.ts:1270

###### Inherited from

```ts
ExpressRequest.httpVersionMajor
```

##### httpVersionMinor

```ts
httpVersionMinor: number;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/http.d.ts:1271

###### Inherited from

```ts
ExpressRequest.httpVersionMinor
```

##### ip

```ts
readonly ip: string;
```

Defined in: node\_modules/.pnpm/@types+express-serve-static-core@5.1.1/node\_modules/@types/express-serve-static-core/index.d.ts:580

Return the remote address, or when
"trust proxy" is `true` return
the upstream addr.

Value may be undefined if the `req.socket` is destroyed
(for example, if the client disconnected).

###### Inherited from

[`Request`](#request).[`ip`](#ip)

##### ips

```ts
readonly ips: string[];
```

Defined in: node\_modules/.pnpm/@types+express-serve-static-core@5.1.1/node\_modules/@types/express-serve-static-core/index.d.ts:590

When "trust proxy" is `true`, parse
the "X-Forwarded-For" ip address list.

For example if the value were "client, proxy1, proxy2"
you would receive the array `["client", "proxy1", "proxy2"]`
where "proxy2" is the furthest down-stream.

###### Inherited from

[`Request`](#request).[`ips`](#ips)

##### method

```ts
method: string;
```

Defined in: node\_modules/.pnpm/@types+express-serve-static-core@5.1.1/node\_modules/@types/express-serve-static-core/index.d.ts:645

**Only valid for request obtained from Server.**

The request method as a string. Read only. Examples: `'GET'`, `'DELETE'`.

###### Since

v0.1.1

###### Inherited from

[`Request`](#request).[`method`](#method-1)

##### next?

```ts
optional next: NextFunction;
```

Defined in: node\_modules/.pnpm/@types+express-serve-static-core@5.1.1/node\_modules/@types/express-serve-static-core/index.d.ts:668

###### Inherited from

[`Request`](#request).[`next`](#next)

##### originalUrl

```ts
originalUrl: string;
```

Defined in: node\_modules/.pnpm/@types+express-serve-static-core@5.1.1/node\_modules/@types/express-serve-static-core/index.d.ts:655

###### Inherited from

[`Request`](#request).[`originalUrl`](#originalurl)

##### params

```ts
params: P;
```

Defined in: node\_modules/.pnpm/@types+express-serve-static-core@5.1.1/node\_modules/@types/express-serve-static-core/index.d.ts:647

###### Inherited from

```ts
ExpressRequest.params
```

##### path

```ts
readonly path: string;
```

Defined in: node\_modules/.pnpm/@types+express-serve-static-core@5.1.1/node\_modules/@types/express-serve-static-core/index.d.ts:608

Short-hand for `url.parse(req.url).pathname`.

###### Inherited from

[`Request`](#request).[`path`](#path-1)

##### protocol

```ts
readonly protocol: string;
```

Defined in: node\_modules/.pnpm/@types+express-serve-static-core@5.1.1/node\_modules/@types/express-serve-static-core/index.d.ts:563

Return the protocol string "http" or "https"
when requested with TLS. When the "trust proxy"
setting is enabled the "X-Forwarded-Proto" header
field will be trusted. If you're running behind
a reverse proxy that supplies https for you this
may be enabled.

###### Inherited from

[`Request`](#request).[`protocol`](#protocol)

##### query

```ts
query: Q;
```

Defined in: node\_modules/.pnpm/@types+express-serve-static-core@5.1.1/node\_modules/@types/express-serve-static-core/index.d.ts:649

###### Inherited from

```ts
ExpressRequest.query
```

##### rawHeaders

```ts
rawHeaders: string[];
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/http.d.ts:1381

The raw request/response headers list exactly as they were received.

The keys and values are in the same list. It is _not_ a
list of tuples. So, the even-numbered offsets are key values, and the
odd-numbered offsets are the associated values.

Header names are not lowercased, and duplicates are not merged.

```js
// Prints something like:
//
// [ 'user-agent',
//   'this is invalid because there can be only one',
//   'User-Agent',
//   'curl/7.22.0',
//   'Host',
//   '127.0.0.1:8000',
//   'ACCEPT',
//   '*' ]
console.log(request.rawHeaders);
```

###### Since

v0.11.6

###### Inherited from

```ts
ExpressRequest.rawHeaders
```

##### rawTrailers

```ts
rawTrailers: string[];
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/http.d.ts:1399

The raw request/response trailer keys and values exactly as they were
received. Only populated at the `'end'` event.

###### Since

v0.11.6

###### Inherited from

```ts
ExpressRequest.rawTrailers
```

##### readable

```ts
readable: boolean;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:109

Is `true` if it is safe to call [read](MangoJS/namespaces/Middlewares/index.md#read), which means
the stream has not been destroyed or emitted `'error'` or `'end'`.

###### Since

v11.4.0

###### Inherited from

```ts
ExpressRequest.readable
```

##### readableAborted

```ts
readonly readableAborted: boolean;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:103

Returns whether the stream was destroyed or errored before emitting `'end'`.

###### Since

v16.8.0

###### Inherited from

```ts
ExpressRequest.readableAborted
```

##### readableDidRead

```ts
readonly readableDidRead: boolean;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:114

Returns whether `'data'` has been emitted.

###### Since

v16.7.0, v14.18.0

###### Inherited from

```ts
ExpressRequest.readableDidRead
```

##### readableEncoding

```ts
readonly readableEncoding: BufferEncoding;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:119

Getter for the property `encoding` of a given `Readable` stream. The `encoding` property can be set using the [setEncoding](#setencoding) method.

###### Since

v12.7.0

###### Inherited from

[`Request`](#request).[`readableEncoding`](#readableencoding)

##### readableEnded

```ts
readonly readableEnded: boolean;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:124

Becomes `true` when [`'end'`](https://nodejs.org/docs/latest-v24.x/api/stream.html#event-end) event is emitted.

###### Since

v12.9.0

###### Inherited from

```ts
ExpressRequest.readableEnded
```

##### readableFlowing

```ts
readonly readableFlowing: boolean;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:130

This property reflects the current state of a `Readable` stream as described
in the [Three states](https://nodejs.org/docs/latest-v24.x/api/stream.html#three-states) section.

###### Since

v9.4.0

###### Inherited from

[`Request`](#request).[`readableFlowing`](#readableflowing)

##### readableHighWaterMark

```ts
readonly readableHighWaterMark: number;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:135

Returns the value of `highWaterMark` passed when creating this `Readable`.

###### Since

v9.3.0

###### Inherited from

```ts
ExpressRequest.readableHighWaterMark
```

##### readableLength

```ts
readonly readableLength: number;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:142

This property contains the number of bytes (or objects) in the queue
ready to be read. The value provides introspection data regarding
the status of the `highWaterMark`.

###### Since

v9.4.0

###### Inherited from

```ts
ExpressRequest.readableLength
```

##### readableObjectMode

```ts
readonly readableObjectMode: boolean;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:147

Getter for the property `objectMode` of a given `Readable` stream.

###### Since

v12.3.0

###### Inherited from

```ts
ExpressRequest.readableObjectMode
```

##### requestTime?

```ts
optional requestTime: string;
```

Defined in: [packages/core/src/core/types/api/index.ts:94](https://github.com/theunionsquare/mangojs/blob/e9b931cfa8d37ff10d485490a7c7959b19e4bfb1/packages/core/src/core/types/api/index.ts#L94)

Request timestamp set by middleware

##### res?

```ts
optional res: Response<any, Record<string, any>, number>;
```

Defined in: node\_modules/.pnpm/@types+express-serve-static-core@5.1.1/node\_modules/@types/express-serve-static-core/index.d.ts:667

After middleware.init executed, Request will contain res and next properties
See: express/lib/middleware/init.js

###### Inherited from

```ts
ExpressRequest.res
```

##### route

```ts
route: any;
```

Defined in: node\_modules/.pnpm/@types+express-serve-static-core@5.1.1/node\_modules/@types/express-serve-static-core/index.d.ts:651

###### Inherited from

[`Request`](#request).[`route`](#route)

##### secure

```ts
readonly secure: boolean;
```

Defined in: node\_modules/.pnpm/@types+express-serve-static-core@5.1.1/node\_modules/@types/express-serve-static-core/index.d.ts:570

Short-hand for:

   req.protocol == 'https'

###### Inherited from

[`Request`](#request).[`secure`](#secure)

##### signedCookies

```ts
signedCookies: any;
```

Defined in: node\_modules/.pnpm/@types+express-serve-static-core@5.1.1/node\_modules/@types/express-serve-static-core/index.d.ts:653

###### Inherited from

[`Request`](#request).[`signedCookies`](#signedcookies)

##### socket

```ts
socket: Socket;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/http.d.ts:1313

The `net.Socket` object associated with the connection.

With HTTPS support, use `request.socket.getPeerCertificate()` to obtain the
client's authentication details.

This property is guaranteed to be an instance of the `net.Socket` class,
a subclass of `stream.Duplex`, unless the user specified a socket
type other than `net.Socket` or internally nulled.

###### Since

v0.3.0

###### Inherited from

```ts
ExpressRequest.socket
```

##### stale

```ts
readonly stale: boolean;
```

Defined in: node\_modules/.pnpm/@types+express-serve-static-core@5.1.1/node\_modules/@types/express-serve-static-core/index.d.ts:632

Check if the request is stale, aka
"Last-Modified" and / or the "ETag" for the
resource has changed.

###### Inherited from

[`Request`](#request).[`stale`](#stale)

##### statusCode?

```ts
optional statusCode: number;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/http.d.ts:1461

**Only valid for response obtained from ClientRequest.**

The 3-digit HTTP response status code. E.G. `404`.

###### Since

v0.1.1

###### Inherited from

[`Request`](#request).[`statusCode`](#statuscode)

##### statusMessage?

```ts
optional statusMessage: string;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/http.d.ts:1468

**Only valid for response obtained from ClientRequest.**

The HTTP response status message (reason phrase). E.G. `OK` or `Internal Server Error`.

###### Since

v0.11.10

###### Inherited from

[`Request`](#request).[`statusMessage`](#statusmessage)

##### subdomains

```ts
readonly subdomains: string[];
```

Defined in: node\_modules/.pnpm/@types+express-serve-static-core@5.1.1/node\_modules/@types/express-serve-static-core/index.d.ts:603

Return subdomains as an array.

Subdomains are the dot-separated parts of the host before the main domain of
the app. By default, the domain of the app is assumed to be the last two
parts of the host. This can be changed by setting "subdomain offset".

For example, if the domain is "tobi.ferrets.example.com":
If "subdomain offset" is not set, req.subdomains is `["ferrets", "tobi"]`.
If "subdomain offset" is 3, req.subdomains is `["tobi"]`.

###### Inherited from

[`Request`](#request).[`subdomains`](#subdomains)

##### trailers

```ts
trailers: Dict<string>;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/http.d.ts:1386

The request/response trailers object. Only populated at the `'end'` event.

###### Since

v0.3.0

###### Inherited from

```ts
ExpressRequest.trailers
```

##### trailersDistinct

```ts
trailersDistinct: Dict<string[]>;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/http.d.ts:1393

Similar to `message.trailers`, but there is no join logic and the values are
always arrays of strings, even for headers received just once.
Only populated at the `'end'` event.

###### Since

v18.3.0, v16.17.0

###### Inherited from

```ts
ExpressRequest.trailersDistinct
```

##### url

```ts
url: string;
```

Defined in: node\_modules/.pnpm/@types+express-serve-static-core@5.1.1/node\_modules/@types/express-serve-static-core/index.d.ts:657

**Only valid for request obtained from Server.**

Request URL string. This contains only the URL that is present in the actual
HTTP request. Take the following request:

```http
GET /status?name=ryan HTTP/1.1
Accept: text/plain
```

To parse the URL into its parts:

```js
new URL(`http://${process.env.HOST ?? 'localhost'}${request.url}`);
```

When `request.url` is `'/status?name=ryan'` and `process.env.HOST` is undefined:

```console
$ node
> new URL(`http://${process.env.HOST ?? 'localhost'}${request.url}`);
URL {
  href: 'http://localhost/status?name=ryan',
  origin: 'http://localhost',
  protocol: 'http:',
  username: '',
  password: '',
  host: 'localhost',
  hostname: 'localhost',
  port: '',
  pathname: '/status',
  search: '?name=ryan',
  searchParams: URLSearchParams { 'name' => 'ryan' },
  hash: ''
}
```

Ensure that you set `process.env.HOST` to the server's host name, or consider replacing this part entirely. If using `req.headers.host`, ensure proper
validation is used, as clients may specify a custom `Host` header.

###### Since

v0.1.90

###### Inherited from

[`Request`](#request).[`url`](#url)

##### user?

```ts
optional user: MiddlewareUserInfo;
```

Defined in: [packages/core/src/core/types/api/index.ts:96](https://github.com/theunionsquare/mangojs/blob/e9b931cfa8d37ff10d485490a7c7959b19e4bfb1/packages/core/src/core/types/api/index.ts#L96)

Authenticated user info set by auth middleware

##### xhr

```ts
readonly xhr: boolean;
```

Defined in: node\_modules/.pnpm/@types+express-serve-static-core@5.1.1/node\_modules/@types/express-serve-static-core/index.d.ts:637

Check if the request was an _XMLHttpRequest_.

###### Inherited from

[`Request`](#request).[`xhr`](#xhr)

#### Methods

##### \_construct()?

```ts
optional _construct(callback): void;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:164

###### Parameters

###### callback

(`error?`) => `void`

###### Returns

`void`

###### Inherited from

```ts
ExpressRequest._construct
```

##### \_destroy()

```ts
_destroy(error, callback): void;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:605

###### Parameters

###### error

`Error`

###### callback

(`error?`) => `void`

###### Returns

`void`

###### Inherited from

```ts
ExpressRequest._destroy
```

##### \_read()

```ts
_read(size): void;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:165

###### Parameters

###### size

`number`

###### Returns

`void`

###### Inherited from

```ts
ExpressRequest._read
```

##### \[asyncDispose\]()

```ts
asyncDispose: Promise<void>;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:628

Calls `readable.destroy()` with an `AbortError` and returns
a promise that fulfills when the stream is finished.

###### Returns

`Promise`\<`void`\>

###### Since

v20.4.0

###### Inherited from

```ts
ExpressRequest.[asyncDispose]
```

##### \[asyncIterator\]()

```ts
asyncIterator: AsyncIterator<any>;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:622

###### Returns

`AsyncIterator`\<`any`\>

`AsyncIterator` to fully consume the stream.

###### Since

v10.0.0

###### Inherited from

```ts
ExpressRequest.[asyncIterator]
```

##### \[captureRejectionSymbol\]()?

```ts
optional [captureRejectionSymbol]<K>(
   error, 
   event, ...
   args): void;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/events.d.ts:103

###### Type Parameters

###### K

`K`

###### Parameters

###### error

`Error`

###### event

`string` | `symbol`

###### args

...`AnyRest`

###### Returns

`void`

###### Inherited from

```ts
ExpressRequest.[captureRejectionSymbol]
```

##### accepts()

###### Call Signature

```ts
accepts(): string[];
```

Defined in: node\_modules/.pnpm/@types+express-serve-static-core@5.1.1/node\_modules/@types/express-serve-static-core/index.d.ts:471

Check if the given `type(s)` is acceptable, returning
the best match when true, otherwise `undefined`, in which
case you should respond with 406 "Not Acceptable".

The `type` value may be a single mime type string
such as "application/json", the extension name
such as "json", a comma-delimted list such as "json, html, text/plain",
or an array `["json", "html", "text/plain"]`. When a list
or array is given the _best_ match, if any is returned.

Examples:

    // Accept: text/html
    req.accepts('html');
    // =\> "html"

    // Accept: text/*, application/json
    req.accepts('html');
    // =\> "html"
    req.accepts('text/html');
    // =\> "text/html"
    req.accepts('json, text');
    // =\> "json"
    req.accepts('application/json');
    // =\> "application/json"

    // Accept: text/*, application/json
    req.accepts('image/png');
    req.accepts('png');
    // =\> false

    // Accept: text/*;q=.5, application/json
    req.accepts(['html', 'json']);
    req.accepts('html, json');
    // =\> "json"

###### Returns

`string`[]

###### Inherited from

```ts
ExpressRequest.accepts
```

###### Call Signature

```ts
accepts(type): string | false;
```

Defined in: node\_modules/.pnpm/@types+express-serve-static-core@5.1.1/node\_modules/@types/express-serve-static-core/index.d.ts:472

###### Parameters

###### type

`string`

###### Returns

`string` \| `false`

###### Inherited from

```ts
ExpressRequest.accepts
```

###### Call Signature

```ts
accepts(type): string | false;
```

Defined in: node\_modules/.pnpm/@types+express-serve-static-core@5.1.1/node\_modules/@types/express-serve-static-core/index.d.ts:473

###### Parameters

###### type

`string`[]

###### Returns

`string` \| `false`

###### Inherited from

```ts
ExpressRequest.accepts
```

###### Call Signature

```ts
accepts(...type): string | false;
```

Defined in: node\_modules/.pnpm/@types+express-serve-static-core@5.1.1/node\_modules/@types/express-serve-static-core/index.d.ts:474

###### Parameters

###### type

...`string`[]

###### Returns

`string` \| `false`

###### Inherited from

```ts
ExpressRequest.accepts
```

##### acceptsCharsets()

###### Call Signature

```ts
acceptsCharsets(): string[];
```

Defined in: node\_modules/.pnpm/@types+express-serve-static-core@5.1.1/node\_modules/@types/express-serve-static-core/index.d.ts:483

Returns the first accepted charset of the specified character sets,
based on the request's Accept-Charset HTTP header field.
If none of the specified charsets is accepted, returns false.

For more information, or if you have issues or concerns, see accepts.

###### Returns

`string`[]

###### Inherited from

```ts
ExpressRequest.acceptsCharsets
```

###### Call Signature

```ts
acceptsCharsets(charset): string | false;
```

Defined in: node\_modules/.pnpm/@types+express-serve-static-core@5.1.1/node\_modules/@types/express-serve-static-core/index.d.ts:484

###### Parameters

###### charset

`string`

###### Returns

`string` \| `false`

###### Inherited from

```ts
ExpressRequest.acceptsCharsets
```

###### Call Signature

```ts
acceptsCharsets(charset): string | false;
```

Defined in: node\_modules/.pnpm/@types+express-serve-static-core@5.1.1/node\_modules/@types/express-serve-static-core/index.d.ts:485

###### Parameters

###### charset

`string`[]

###### Returns

`string` \| `false`

###### Inherited from

```ts
ExpressRequest.acceptsCharsets
```

###### Call Signature

```ts
acceptsCharsets(...charset): string | false;
```

Defined in: node\_modules/.pnpm/@types+express-serve-static-core@5.1.1/node\_modules/@types/express-serve-static-core/index.d.ts:486

###### Parameters

###### charset

...`string`[]

###### Returns

`string` \| `false`

###### Inherited from

```ts
ExpressRequest.acceptsCharsets
```

##### acceptsEncodings()

###### Call Signature

```ts
acceptsEncodings(): string[];
```

Defined in: node\_modules/.pnpm/@types+express-serve-static-core@5.1.1/node\_modules/@types/express-serve-static-core/index.d.ts:495

Returns the first accepted encoding of the specified encodings,
based on the request's Accept-Encoding HTTP header field.
If none of the specified encodings is accepted, returns false.

For more information, or if you have issues or concerns, see accepts.

###### Returns

`string`[]

###### Inherited from

```ts
ExpressRequest.acceptsEncodings
```

###### Call Signature

```ts
acceptsEncodings(encoding): string | false;
```

Defined in: node\_modules/.pnpm/@types+express-serve-static-core@5.1.1/node\_modules/@types/express-serve-static-core/index.d.ts:496

###### Parameters

###### encoding

`string`

###### Returns

`string` \| `false`

###### Inherited from

```ts
ExpressRequest.acceptsEncodings
```

###### Call Signature

```ts
acceptsEncodings(encoding): string | false;
```

Defined in: node\_modules/.pnpm/@types+express-serve-static-core@5.1.1/node\_modules/@types/express-serve-static-core/index.d.ts:497

###### Parameters

###### encoding

`string`[]

###### Returns

`string` \| `false`

###### Inherited from

```ts
ExpressRequest.acceptsEncodings
```

###### Call Signature

```ts
acceptsEncodings(...encoding): string | false;
```

Defined in: node\_modules/.pnpm/@types+express-serve-static-core@5.1.1/node\_modules/@types/express-serve-static-core/index.d.ts:498

###### Parameters

###### encoding

...`string`[]

###### Returns

`string` \| `false`

###### Inherited from

```ts
ExpressRequest.acceptsEncodings
```

##### acceptsLanguages()

###### Call Signature

```ts
acceptsLanguages(): string[];
```

Defined in: node\_modules/.pnpm/@types+express-serve-static-core@5.1.1/node\_modules/@types/express-serve-static-core/index.d.ts:507

Returns the first accepted language of the specified languages,
based on the request's Accept-Language HTTP header field.
If none of the specified languages is accepted, returns false.

For more information, or if you have issues or concerns, see accepts.

###### Returns

`string`[]

###### Inherited from

```ts
ExpressRequest.acceptsLanguages
```

###### Call Signature

```ts
acceptsLanguages(lang): string | false;
```

Defined in: node\_modules/.pnpm/@types+express-serve-static-core@5.1.1/node\_modules/@types/express-serve-static-core/index.d.ts:508

###### Parameters

###### lang

`string`

###### Returns

`string` \| `false`

###### Inherited from

```ts
ExpressRequest.acceptsLanguages
```

###### Call Signature

```ts
acceptsLanguages(lang): string | false;
```

Defined in: node\_modules/.pnpm/@types+express-serve-static-core@5.1.1/node\_modules/@types/express-serve-static-core/index.d.ts:509

###### Parameters

###### lang

`string`[]

###### Returns

`string` \| `false`

###### Inherited from

```ts
ExpressRequest.acceptsLanguages
```

###### Call Signature

```ts
acceptsLanguages(...lang): string | false;
```

Defined in: node\_modules/.pnpm/@types+express-serve-static-core@5.1.1/node\_modules/@types/express-serve-static-core/index.d.ts:510

###### Parameters

###### lang

...`string`[]

###### Returns

`string` \| `false`

###### Inherited from

```ts
ExpressRequest.acceptsLanguages
```

##### addListener()

###### Call Signature

```ts
addListener(event, listener): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:640

Event emitter
The defined events on documents including:
1. close
2. data
3. end
4. error
5. pause
6. readable
7. resume

###### Parameters

###### event

`"close"`

###### listener

() => `void`

###### Returns

`this`

###### Inherited from

```ts
ExpressRequest.addListener
```

###### Call Signature

```ts
addListener(event, listener): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:641

Event emitter
The defined events on documents including:
1. close
2. data
3. end
4. error
5. pause
6. readable
7. resume

###### Parameters

###### event

`"data"`

###### listener

(`chunk`) => `void`

###### Returns

`this`

###### Inherited from

```ts
ExpressRequest.addListener
```

###### Call Signature

```ts
addListener(event, listener): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:642

Event emitter
The defined events on documents including:
1. close
2. data
3. end
4. error
5. pause
6. readable
7. resume

###### Parameters

###### event

`"end"`

###### listener

() => `void`

###### Returns

`this`

###### Inherited from

```ts
ExpressRequest.addListener
```

###### Call Signature

```ts
addListener(event, listener): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:643

Event emitter
The defined events on documents including:
1. close
2. data
3. end
4. error
5. pause
6. readable
7. resume

###### Parameters

###### event

`"error"`

###### listener

(`err`) => `void`

###### Returns

`this`

###### Inherited from

```ts
ExpressRequest.addListener
```

###### Call Signature

```ts
addListener(event, listener): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:644

Event emitter
The defined events on documents including:
1. close
2. data
3. end
4. error
5. pause
6. readable
7. resume

###### Parameters

###### event

`"pause"`

###### listener

() => `void`

###### Returns

`this`

###### Inherited from

```ts
ExpressRequest.addListener
```

###### Call Signature

```ts
addListener(event, listener): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:645

Event emitter
The defined events on documents including:
1. close
2. data
3. end
4. error
5. pause
6. readable
7. resume

###### Parameters

###### event

`"readable"`

###### listener

() => `void`

###### Returns

`this`

###### Inherited from

```ts
ExpressRequest.addListener
```

###### Call Signature

```ts
addListener(event, listener): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:646

Event emitter
The defined events on documents including:
1. close
2. data
3. end
4. error
5. pause
6. readable
7. resume

###### Parameters

###### event

`"resume"`

###### listener

() => `void`

###### Returns

`this`

###### Inherited from

```ts
ExpressRequest.addListener
```

###### Call Signature

```ts
addListener(event, listener): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:647

Event emitter
The defined events on documents including:
1. close
2. data
3. end
4. error
5. pause
6. readable
7. resume

###### Parameters

###### event

`string` | `symbol`

###### listener

(...`args`) => `void`

###### Returns

`this`

###### Inherited from

```ts
ExpressRequest.addListener
```

##### asIndexedPairs()

```ts
asIndexedPairs(options?): Readable;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:580

This method returns a new stream with chunks of the underlying stream paired with a counter
in the form `[index, chunk]`. The first index value is `0` and it increases by 1 for each chunk produced.

###### Parameters

###### options?

`Pick`\<`ArrayOptions`, `"signal"`\>

###### Returns

`Readable`

a stream of indexed pairs.

###### Since

v17.5.0

###### Inherited from

```ts
ExpressRequest.asIndexedPairs
```

##### compose()

```ts
compose<T>(stream, options?): T;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:35

###### Type Parameters

###### T

`T` *extends* `ReadableStream`

###### Parameters

###### stream

`ComposeFnParam` | `T` | `Iterable`\<`T`, `any`, `any`\> | `AsyncIterable`\<`T`, `any`, `any`\>

###### options?

###### signal

`AbortSignal`

###### Returns

`T`

###### Inherited from

```ts
ExpressRequest.compose
```

##### destroy()

```ts
destroy(error?): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/http.d.ts:1474

Calls `destroy()` on the socket that received the `IncomingMessage`. If `error` is provided, an `'error'` event is emitted on the socket and `error` is passed
as an argument to any listeners on the event.

###### Parameters

###### error?

`Error`

###### Returns

`this`

###### Since

v0.3.0

###### Inherited from

```ts
ExpressRequest.destroy
```

##### drop()

```ts
drop(limit, options?): Readable;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:566

This method returns a new stream with the first *limit* chunks dropped from the start.

###### Parameters

###### limit

`number`

the number of chunks to drop from the readable.

###### options?

`Pick`\<`ArrayOptions`, `"signal"`\>

###### Returns

`Readable`

a stream with *limit* chunks dropped from the start.

###### Since

v17.5.0

###### Inherited from

```ts
ExpressRequest.drop
```

##### emit()

###### Call Signature

```ts
emit(event): boolean;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:648

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

###### Parameters

###### event

`"close"`

###### Returns

`boolean`

###### Since

v0.1.26

###### Inherited from

```ts
ExpressRequest.emit
```

###### Call Signature

```ts
emit(event, chunk): boolean;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:649

###### Parameters

###### event

`"data"`

###### chunk

`any`

###### Returns

`boolean`

###### Inherited from

```ts
ExpressRequest.emit
```

###### Call Signature

```ts
emit(event): boolean;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:650

###### Parameters

###### event

`"end"`

###### Returns

`boolean`

###### Inherited from

```ts
ExpressRequest.emit
```

###### Call Signature

```ts
emit(event, err): boolean;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:651

###### Parameters

###### event

`"error"`

###### err

`Error`

###### Returns

`boolean`

###### Inherited from

```ts
ExpressRequest.emit
```

###### Call Signature

```ts
emit(event): boolean;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:652

###### Parameters

###### event

`"pause"`

###### Returns

`boolean`

###### Inherited from

```ts
ExpressRequest.emit
```

###### Call Signature

```ts
emit(event): boolean;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:653

###### Parameters

###### event

`"readable"`

###### Returns

`boolean`

###### Inherited from

```ts
ExpressRequest.emit
```

###### Call Signature

```ts
emit(event): boolean;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:654

###### Parameters

###### event

`"resume"`

###### Returns

`boolean`

###### Inherited from

```ts
ExpressRequest.emit
```

###### Call Signature

```ts
emit(event, ...args): boolean;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:655

###### Parameters

###### event

`string` | `symbol`

###### args

...`any`[]

###### Returns

`boolean`

###### Inherited from

```ts
ExpressRequest.emit
```

##### eventNames()

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

###### Returns

(`string` \| `symbol`)[]

###### Since

v6.0.0

###### Inherited from

```ts
ExpressRequest.eventNames
```

##### every()

```ts
every(fn, options?): Promise<boolean>;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:545

This method is similar to `Array.prototype.every` and calls *fn* on each chunk in the stream
to check if all awaited return values are truthy value for *fn*. Once an *fn* call on a chunk
`await`ed return value is falsy, the stream is destroyed and the promise is fulfilled with `false`.
If all of the *fn* calls on the chunks return a truthy value, the promise is fulfilled with `true`.

###### Parameters

###### fn

(`data`, `options?`) => `boolean` \| `Promise`\<`boolean`\>

a function to call on each chunk of the stream. Async or not.

###### options?

`ArrayOptions`

###### Returns

`Promise`\<`boolean`\>

a promise evaluating to `true` if *fn* returned a truthy value for every one of the chunks.

###### Since

v17.5.0

###### Inherited from

```ts
ExpressRequest.every
```

##### filter()

```ts
filter(fn, options?): Readable;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:473

This method allows filtering the stream. For each chunk in the stream the *fn* function will be called
and if it returns a truthy value, the chunk will be passed to the result stream.
If the *fn* function returns a promise - that promise will be `await`ed.

###### Parameters

###### fn

(`data`, `options?`) => `boolean` \| `Promise`\<`boolean`\>

a function to filter chunks from the stream. Async or not.

###### options?

`ArrayOptions`

###### Returns

`Readable`

a stream filtered with the predicate *fn*.

###### Since

v17.4.0, v16.14.0

###### Inherited from

```ts
ExpressRequest.filter
```

##### find()

###### Call Signature

```ts
find<T>(fn, options?): Promise<T>;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:528

This method is similar to `Array.prototype.find` and calls *fn* on each chunk in the stream
to find a chunk with a truthy value for *fn*. Once an *fn* call's awaited return value is truthy,
the stream is destroyed and the promise is fulfilled with value for which *fn* returned a truthy value.
If all of the *fn* calls on the chunks return a falsy value, the promise is fulfilled with `undefined`.

###### Type Parameters

###### T

`T`

###### Parameters

###### fn

(`data`, `options?`) => `data is T`

a function to call on each chunk of the stream. Async or not.

###### options?

`ArrayOptions`

###### Returns

`Promise`\<`T`\>

a promise evaluating to the first chunk for which *fn* evaluated with a truthy value,
or `undefined` if no element was found.

###### Since

v17.5.0

###### Inherited from

```ts
ExpressRequest.find
```

###### Call Signature

```ts
find(fn, options?): Promise<any>;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:532

This method is similar to `Array.prototype.find` and calls *fn* on each chunk in the stream
to find a chunk with a truthy value for *fn*. Once an *fn* call's awaited return value is truthy,
the stream is destroyed and the promise is fulfilled with value for which *fn* returned a truthy value.
If all of the *fn* calls on the chunks return a falsy value, the promise is fulfilled with `undefined`.

###### Parameters

###### fn

(`data`, `options?`) => `boolean` \| `Promise`\<`boolean`\>

a function to call on each chunk of the stream. Async or not.

###### options?

`ArrayOptions`

###### Returns

`Promise`\<`any`\>

a promise evaluating to the first chunk for which *fn* evaluated with a truthy value,
or `undefined` if no element was found.

###### Since

v17.5.0

###### Inherited from

```ts
ExpressRequest.find
```

##### flatMap()

```ts
flatMap(fn, options?): Readable;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:559

This method returns a new stream by applying the given callback to each chunk of the stream
and then flattening the result.

It is possible to return a stream or another iterable or async iterable from *fn* and the result streams
will be merged (flattened) into the returned stream.

###### Parameters

###### fn

(`data`, `options?`) => `any`

a function to map over every chunk in the stream. May be async. May be a stream or generator.

###### options?

`ArrayOptions`

###### Returns

`Readable`

a stream flat-mapped with the function *fn*.

###### Since

v17.5.0

###### Inherited from

```ts
ExpressRequest.flatMap
```

##### forEach()

```ts
forEach(fn, options?): Promise<void>;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:492

This method allows iterating a stream. For each chunk in the stream the *fn* function will be called.
If the *fn* function returns a promise - that promise will be `await`ed.

This method is different from `for await...of` loops in that it can optionally process chunks concurrently.
In addition, a `forEach` iteration can only be stopped by having passed a `signal` option
and aborting the related AbortController while `for await...of` can be stopped with `break` or `return`.
In either case the stream will be destroyed.

This method is different from listening to the `'data'` event in that it uses the `readable` event
in the underlying machinary and can limit the number of concurrent *fn* calls.

###### Parameters

###### fn

(`data`, `options?`) => `void` \| `Promise`\<`void`\>

a function to call on each chunk of the stream. Async or not.

###### options?

`ArrayOptions`

###### Returns

`Promise`\<`void`\>

a promise for when the stream has finished.

###### Since

v17.5.0

###### Inherited from

```ts
ExpressRequest.forEach
```

##### get()

###### Call Signature

```ts
get(name): string[];
```

Defined in: node\_modules/.pnpm/@types+express-serve-static-core@5.1.1/node\_modules/@types/express-serve-static-core/index.d.ts:428

Return request header.

The `Referrer` header field is special-cased,
both `Referrer` and `Referer` are interchangeable.

Examples:

    req.get('Content-Type');
    // =\> "text/plain"

    req.get('content-type');
    // =\> "text/plain"

    req.get('Something');
    // =\> undefined

Aliased as `req.header()`.

###### Parameters

###### name

`"set-cookie"`

###### Returns

`string`[]

###### Inherited from

```ts
ExpressRequest.get
```

###### Call Signature

```ts
get(name): string;
```

Defined in: node\_modules/.pnpm/@types+express-serve-static-core@5.1.1/node\_modules/@types/express-serve-static-core/index.d.ts:429

###### Parameters

###### name

`string`

###### Returns

`string`

###### Inherited from

```ts
ExpressRequest.get
```

##### getMaxListeners()

```ts
getMaxListeners(): number;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/events.d.ts:819

Returns the current max listener value for the `EventEmitter` which is either
set by `emitter.setMaxListeners(n)` or defaults to EventEmitter.defaultMaxListeners.

###### Returns

`number`

###### Since

v1.0.0

###### Inherited from

```ts
ExpressRequest.getMaxListeners
```

##### header()

###### Call Signature

```ts
header(name): string[];
```

Defined in: node\_modules/.pnpm/@types+express-serve-static-core@5.1.1/node\_modules/@types/express-serve-static-core/index.d.ts:431

###### Parameters

###### name

`"set-cookie"`

###### Returns

`string`[]

###### Inherited from

```ts
ExpressRequest.header
```

###### Call Signature

```ts
header(name): string;
```

Defined in: node\_modules/.pnpm/@types+express-serve-static-core@5.1.1/node\_modules/@types/express-serve-static-core/index.d.ts:432

###### Parameters

###### name

`string`

###### Returns

`string`

###### Inherited from

```ts
ExpressRequest.header
```

##### is()

```ts
is(type): string | false;
```

Defined in: node\_modules/.pnpm/@types+express-serve-static-core@5.1.1/node\_modules/@types/express-serve-static-core/index.d.ts:553

Check if the incoming request contains the "Content-Type"
header field, and it contains the give mime `type`.

Examples:

     // With Content-Type: text/html; charset=utf-8
     req.is('html');
     req.is('text/html');
     req.is('text/*');
     // =\> true

     // When Content-Type is application/json
     req.is('json');
     req.is('application/json');
     req.is('application/*');
     // =\> true

     req.is('html');
     // =\> false

###### Parameters

###### type

`string` | `string`[]

###### Returns

`string` \| `false`

###### Inherited from

```ts
ExpressRequest.is
```

##### isPaused()

```ts
isPaused(): boolean;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:326

The `readable.isPaused()` method returns the current operating state of the `Readable`.
This is used primarily by the mechanism that underlies the `readable.pipe()` method.
In most typical cases, there will be no reason to use this method directly.

```js
const readable = new stream.Readable();

readable.isPaused(); // === false
readable.pause();
readable.isPaused(); // === true
readable.resume();
readable.isPaused(); // === false
```

###### Returns

`boolean`

###### Since

v0.11.14

###### Inherited from

```ts
ExpressRequest.isPaused
```

##### iterator()

```ts
iterator(options?): AsyncIterator<any>;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:456

The iterator created by this method gives users the option to cancel the destruction
of the stream if the `for await...of` loop is exited by `return`, `break`, or `throw`,
or if the iterator should destroy the stream if the stream emitted an error during iteration.

###### Parameters

###### options?

###### destroyOnReturn?

`boolean`

When set to `false`, calling `return` on the async iterator,
or exiting a `for await...of` iteration using a `break`, `return`, or `throw` will not destroy the stream.
**Default: `true`**.

###### Returns

`AsyncIterator`\<`any`\>

###### Since

v16.3.0

###### Inherited from

```ts
ExpressRequest.iterator
```

##### listenerCount()

```ts
listenerCount<K>(eventName, listener?): number;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/events.d.ts:913

Returns the number of listeners listening for the event named `eventName`.
If `listener` is provided, it will return how many times the listener is found
in the list of the listeners of the event.

###### Type Parameters

###### K

`K`

###### Parameters

###### eventName

The name of the event being listened for

`string` | `symbol`

###### listener?

`Function`

The event handler function

###### Returns

`number`

###### Since

v3.2.0

###### Inherited from

```ts
ExpressRequest.listenerCount
```

##### listeners()

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

###### Type Parameters

###### K

`K`

###### Parameters

###### eventName

`string` | `symbol`

###### Returns

`Function`[]

###### Since

v0.1.26

###### Inherited from

```ts
ExpressRequest.listeners
```

##### map()

```ts
map(fn, options?): Readable;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:464

This method allows mapping over the stream. The *fn* function will be called for every chunk in the stream.
If the *fn* function returns a promise - that promise will be `await`ed before being passed to the result stream.

###### Parameters

###### fn

(`data`, `options?`) => `any`

a function to map over every chunk in the stream. Async or not.

###### options?

`ArrayOptions`

###### Returns

`Readable`

a stream mapped with the function *fn*.

###### Since

v17.4.0, v16.14.0

###### Inherited from

```ts
ExpressRequest.map
```

##### off()

```ts
off<K>(eventName, listener): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/events.d.ts:792

Alias for `emitter.removeListener()`.

###### Type Parameters

###### K

`K`

###### Parameters

###### eventName

`string` | `symbol`

###### listener

(...`args`) => `void`

###### Returns

`this`

###### Since

v10.0.0

###### Inherited from

```ts
ExpressRequest.off
```

##### on()

###### Call Signature

```ts
on(event, listener): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:656

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

###### Parameters

###### event

`"close"`

###### listener

() => `void`

The callback function

###### Returns

`this`

###### Since

v0.1.101

###### Inherited from

```ts
ExpressRequest.on
```

###### Call Signature

```ts
on(event, listener): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:657

###### Parameters

###### event

`"data"`

###### listener

(`chunk`) => `void`

###### Returns

`this`

###### Inherited from

```ts
ExpressRequest.on
```

###### Call Signature

```ts
on(event, listener): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:658

###### Parameters

###### event

`"end"`

###### listener

() => `void`

###### Returns

`this`

###### Inherited from

```ts
ExpressRequest.on
```

###### Call Signature

```ts
on(event, listener): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:659

###### Parameters

###### event

`"error"`

###### listener

(`err`) => `void`

###### Returns

`this`

###### Inherited from

```ts
ExpressRequest.on
```

###### Call Signature

```ts
on(event, listener): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:660

###### Parameters

###### event

`"pause"`

###### listener

() => `void`

###### Returns

`this`

###### Inherited from

```ts
ExpressRequest.on
```

###### Call Signature

```ts
on(event, listener): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:661

###### Parameters

###### event

`"readable"`

###### listener

() => `void`

###### Returns

`this`

###### Inherited from

```ts
ExpressRequest.on
```

###### Call Signature

```ts
on(event, listener): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:662

###### Parameters

###### event

`"resume"`

###### listener

() => `void`

###### Returns

`this`

###### Inherited from

```ts
ExpressRequest.on
```

###### Call Signature

```ts
on(event, listener): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:663

###### Parameters

###### event

`string` | `symbol`

###### listener

(...`args`) => `void`

###### Returns

`this`

###### Inherited from

```ts
ExpressRequest.on
```

##### once()

###### Call Signature

```ts
once(event, listener): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:664

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

###### Parameters

###### event

`"close"`

###### listener

() => `void`

The callback function

###### Returns

`this`

###### Since

v0.3.0

###### Inherited from

```ts
ExpressRequest.once
```

###### Call Signature

```ts
once(event, listener): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:665

###### Parameters

###### event

`"data"`

###### listener

(`chunk`) => `void`

###### Returns

`this`

###### Inherited from

```ts
ExpressRequest.once
```

###### Call Signature

```ts
once(event, listener): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:666

###### Parameters

###### event

`"end"`

###### listener

() => `void`

###### Returns

`this`

###### Inherited from

```ts
ExpressRequest.once
```

###### Call Signature

```ts
once(event, listener): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:667

###### Parameters

###### event

`"error"`

###### listener

(`err`) => `void`

###### Returns

`this`

###### Inherited from

```ts
ExpressRequest.once
```

###### Call Signature

```ts
once(event, listener): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:668

###### Parameters

###### event

`"pause"`

###### listener

() => `void`

###### Returns

`this`

###### Inherited from

```ts
ExpressRequest.once
```

###### Call Signature

```ts
once(event, listener): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:669

###### Parameters

###### event

`"readable"`

###### listener

() => `void`

###### Returns

`this`

###### Inherited from

```ts
ExpressRequest.once
```

###### Call Signature

```ts
once(event, listener): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:670

###### Parameters

###### event

`"resume"`

###### listener

() => `void`

###### Returns

`this`

###### Inherited from

```ts
ExpressRequest.once
```

###### Call Signature

```ts
once(event, listener): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:671

###### Parameters

###### event

`string` | `symbol`

###### listener

(...`args`) => `void`

###### Returns

`this`

###### Inherited from

```ts
ExpressRequest.once
```

##### pause()

```ts
pause(): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:290

The `readable.pause()` method will cause a stream in flowing mode to stop
emitting `'data'` events, switching out of flowing mode. Any data that
becomes available will remain in the internal buffer.

```js
const readable = getReadableStreamSomehow();
readable.on('data', (chunk) => {
  console.log(`Received ${chunk.length} bytes of data.`);
  readable.pause();
  console.log('There will be no additional data for 1 second.');
  setTimeout(() => {
    console.log('Now data will start flowing again.');
    readable.resume();
  }, 1000);
});
```

The `readable.pause()` method has no effect if there is a `'readable'` event listener.

###### Returns

`this`

###### Since

v0.9.4

###### Inherited from

```ts
ExpressRequest.pause
```

##### pipe()

```ts
pipe<T>(destination, options?): T;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:29

###### Type Parameters

###### T

`T` *extends* `WritableStream`

###### Parameters

###### destination

`T`

###### options?

###### end?

`boolean`

###### Returns

`T`

###### Inherited from

```ts
ExpressRequest.pipe
```

##### prependListener()

###### Call Signature

```ts
prependListener(event, listener): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:672

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

###### Parameters

###### event

`"close"`

###### listener

() => `void`

The callback function

###### Returns

`this`

###### Since

v6.0.0

###### Inherited from

```ts
ExpressRequest.prependListener
```

###### Call Signature

```ts
prependListener(event, listener): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:673

###### Parameters

###### event

`"data"`

###### listener

(`chunk`) => `void`

###### Returns

`this`

###### Inherited from

```ts
ExpressRequest.prependListener
```

###### Call Signature

```ts
prependListener(event, listener): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:674

###### Parameters

###### event

`"end"`

###### listener

() => `void`

###### Returns

`this`

###### Inherited from

```ts
ExpressRequest.prependListener
```

###### Call Signature

```ts
prependListener(event, listener): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:675

###### Parameters

###### event

`"error"`

###### listener

(`err`) => `void`

###### Returns

`this`

###### Inherited from

```ts
ExpressRequest.prependListener
```

###### Call Signature

```ts
prependListener(event, listener): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:676

###### Parameters

###### event

`"pause"`

###### listener

() => `void`

###### Returns

`this`

###### Inherited from

```ts
ExpressRequest.prependListener
```

###### Call Signature

```ts
prependListener(event, listener): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:677

###### Parameters

###### event

`"readable"`

###### listener

() => `void`

###### Returns

`this`

###### Inherited from

```ts
ExpressRequest.prependListener
```

###### Call Signature

```ts
prependListener(event, listener): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:678

###### Parameters

###### event

`"resume"`

###### listener

() => `void`

###### Returns

`this`

###### Inherited from

```ts
ExpressRequest.prependListener
```

###### Call Signature

```ts
prependListener(event, listener): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:679

###### Parameters

###### event

`string` | `symbol`

###### listener

(...`args`) => `void`

###### Returns

`this`

###### Inherited from

```ts
ExpressRequest.prependListener
```

##### prependOnceListener()

###### Call Signature

```ts
prependOnceListener(event, listener): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:680

Adds a **one-time**`listener` function for the event named `eventName` to the _beginning_ of the listeners array. The next time `eventName` is triggered, this
listener is removed, and then invoked.

```js
server.prependOnceListener('connection', (stream) => {
  console.log('Ah, we have our first user!');
});
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

###### Parameters

###### event

`"close"`

###### listener

() => `void`

The callback function

###### Returns

`this`

###### Since

v6.0.0

###### Inherited from

```ts
ExpressRequest.prependOnceListener
```

###### Call Signature

```ts
prependOnceListener(event, listener): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:681

###### Parameters

###### event

`"data"`

###### listener

(`chunk`) => `void`

###### Returns

`this`

###### Inherited from

```ts
ExpressRequest.prependOnceListener
```

###### Call Signature

```ts
prependOnceListener(event, listener): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:682

###### Parameters

###### event

`"end"`

###### listener

() => `void`

###### Returns

`this`

###### Inherited from

```ts
ExpressRequest.prependOnceListener
```

###### Call Signature

```ts
prependOnceListener(event, listener): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:683

###### Parameters

###### event

`"error"`

###### listener

(`err`) => `void`

###### Returns

`this`

###### Inherited from

```ts
ExpressRequest.prependOnceListener
```

###### Call Signature

```ts
prependOnceListener(event, listener): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:684

###### Parameters

###### event

`"pause"`

###### listener

() => `void`

###### Returns

`this`

###### Inherited from

```ts
ExpressRequest.prependOnceListener
```

###### Call Signature

```ts
prependOnceListener(event, listener): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:685

###### Parameters

###### event

`"readable"`

###### listener

() => `void`

###### Returns

`this`

###### Inherited from

```ts
ExpressRequest.prependOnceListener
```

###### Call Signature

```ts
prependOnceListener(event, listener): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:686

###### Parameters

###### event

`"resume"`

###### listener

() => `void`

###### Returns

`this`

###### Inherited from

```ts
ExpressRequest.prependOnceListener
```

###### Call Signature

```ts
prependOnceListener(event, listener): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:687

###### Parameters

###### event

`string` | `symbol`

###### listener

(...`args`) => `void`

###### Returns

`this`

###### Inherited from

```ts
ExpressRequest.prependOnceListener
```

##### push()

```ts
push(chunk, encoding?): boolean;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:446

###### Parameters

###### chunk

`any`

###### encoding?

`BufferEncoding`

###### Returns

`boolean`

###### Inherited from

```ts
ExpressRequest.push
```

##### range()

```ts
range(size, options?): Ranges | Result;
```

Defined in: node\_modules/.pnpm/@types+express-serve-static-core@5.1.1/node\_modules/@types/express-serve-static-core/index.d.ts:524

Parse Range header field, capping to the given `size`.

Unspecified ranges such as "0-" require knowledge of your resource length. In
the case of a byte range this is of course the total number of bytes.
If the Range header field is not given `undefined` is returned.
If the Range header field is given, return value is a result of range-parser.
See more ./types/range-parser/index.d.ts

NOTE: remember that ranges are inclusive, so for example "Range: users=0-3"
should respond with 4 users when available, not 3.

###### Parameters

###### size

`number`

###### options?

`Options`

###### Returns

`Ranges` \| `Result`

###### Inherited from

```ts
ExpressRequest.range
```

##### rawListeners()

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

###### Type Parameters

###### K

`K`

###### Parameters

###### eventName

`string` | `symbol`

###### Returns

`Function`[]

###### Since

v9.4.0

###### Inherited from

```ts
ExpressRequest.rawListeners
```

##### read()

```ts
read(size?): any;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:243

The `readable.read()` method reads data out of the internal buffer and
returns it. If no data is available to be read, `null` is returned. By default,
the data is returned as a `Buffer` object unless an encoding has been
specified using the `readable.setEncoding()` method or the stream is operating
in object mode.

The optional `size` argument specifies a specific number of bytes to read. If
`size` bytes are not available to be read, `null` will be returned _unless_ the
stream has ended, in which case all of the data remaining in the internal buffer
will be returned.

If the `size` argument is not specified, all of the data contained in the
internal buffer will be returned.

The `size` argument must be less than or equal to 1 GiB.

The `readable.read()` method should only be called on `Readable` streams
operating in paused mode. In flowing mode, `readable.read()` is called
automatically until the internal buffer is fully drained.

```js
const readable = getReadableStreamSomehow();

// 'readable' may be triggered multiple times as data is buffered in
readable.on('readable', () => {
  let chunk;
  console.log('Stream is readable (new data received in buffer)');
  // Use a loop to make sure we read all currently available data
  while (null !== (chunk = readable.read())) {
    console.log(`Read ${chunk.length} bytes of data...`);
  }
});

// 'end' will be triggered once when there is no more data available
readable.on('end', () => {
  console.log('Reached end of stream.');
});
```

Each call to `readable.read()` returns a chunk of data, or `null`. The chunks
are not concatenated. A `while` loop is necessary to consume all data
currently in the buffer. When reading a large file `.read()` may return `null`,
having consumed all buffered content so far, but there is still more data to
come not yet buffered. In this case a new `'readable'` event will be emitted
when there is more data in the buffer. Finally the `'end'` event will be
emitted when there is no more data to come.

Therefore to read a file's whole contents from a `readable`, it is necessary
to collect chunks across multiple `'readable'` events:

```js
const chunks = [];

readable.on('readable', () => {
  let chunk;
  while (null !== (chunk = readable.read())) {
    chunks.push(chunk);
  }
});

readable.on('end', () => {
  const content = chunks.join('');
});
```

A `Readable` stream in object mode will always return a single item from
a call to `readable.read(size)`, regardless of the value of the `size` argument.

If the `readable.read()` method returns a chunk of data, a `'data'` event will
also be emitted.

Calling [read](MangoJS/namespaces/Middlewares/index.md#read) after the `'end'` event has
been emitted will return `null`. No runtime error will be raised.

###### Parameters

###### size?

`number`

Optional argument to specify how much data to read.

###### Returns

`any`

###### Since

v0.9.4

###### Inherited from

```ts
ExpressRequest.read
```

##### reduce()

###### Call Signature

```ts
reduce<T>(
   fn, 
   initial?, 
options?): Promise<T>;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:595

This method calls *fn* on each chunk of the stream in order, passing it the result from the calculation
on the previous element. It returns a promise for the final value of the reduction.

If no *initial* value is supplied the first chunk of the stream is used as the initial value.
If the stream is empty, the promise is rejected with a `TypeError` with the `ERR_INVALID_ARGS` code property.

The reducer function iterates the stream element-by-element which means that there is no *concurrency* parameter
or parallelism. To perform a reduce concurrently, you can extract the async function to `readable.map` method.

###### Type Parameters

###### T

`T` = `any`

###### Parameters

###### fn

(`previous`, `data`, `options?`) => `T`

a reducer function to call over every chunk in the stream. Async or not.

###### initial?

`undefined`

the initial value to use in the reduction.

###### options?

`Pick`\<`ArrayOptions`, `"signal"`\>

###### Returns

`Promise`\<`T`\>

a promise for the final value of the reduction.

###### Since

v17.5.0

###### Inherited from

```ts
ExpressRequest.reduce
```

###### Call Signature

```ts
reduce<T>(
   fn, 
   initial, 
options?): Promise<T>;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:600

This method calls *fn* on each chunk of the stream in order, passing it the result from the calculation
on the previous element. It returns a promise for the final value of the reduction.

If no *initial* value is supplied the first chunk of the stream is used as the initial value.
If the stream is empty, the promise is rejected with a `TypeError` with the `ERR_INVALID_ARGS` code property.

The reducer function iterates the stream element-by-element which means that there is no *concurrency* parameter
or parallelism. To perform a reduce concurrently, you can extract the async function to `readable.map` method.

###### Type Parameters

###### T

`T` = `any`

###### Parameters

###### fn

(`previous`, `data`, `options?`) => `T`

a reducer function to call over every chunk in the stream. Async or not.

###### initial

`T`

the initial value to use in the reduction.

###### options?

`Pick`\<`ArrayOptions`, `"signal"`\>

###### Returns

`Promise`\<`T`\>

a promise for the final value of the reduction.

###### Since

v17.5.0

###### Inherited from

```ts
ExpressRequest.reduce
```

##### removeAllListeners()

```ts
removeAllListeners(eventName?): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/events.d.ts:803

Removes all listeners, or those of the specified `eventName`.

It is bad practice to remove listeners added elsewhere in the code,
particularly when the `EventEmitter` instance was created by some other
component or module (e.g. sockets or file streams).

Returns a reference to the `EventEmitter`, so that calls can be chained.

###### Parameters

###### eventName?

`string` | `symbol`

###### Returns

`this`

###### Since

v0.1.26

###### Inherited from

```ts
ExpressRequest.removeAllListeners
```

##### removeListener()

###### Call Signature

```ts
removeListener(event, listener): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:688

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

###### Parameters

###### event

`"close"`

###### listener

() => `void`

###### Returns

`this`

###### Since

v0.1.26

###### Inherited from

```ts
ExpressRequest.removeListener
```

###### Call Signature

```ts
removeListener(event, listener): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:689

###### Parameters

###### event

`"data"`

###### listener

(`chunk`) => `void`

###### Returns

`this`

###### Inherited from

```ts
ExpressRequest.removeListener
```

###### Call Signature

```ts
removeListener(event, listener): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:690

###### Parameters

###### event

`"end"`

###### listener

() => `void`

###### Returns

`this`

###### Inherited from

```ts
ExpressRequest.removeListener
```

###### Call Signature

```ts
removeListener(event, listener): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:691

###### Parameters

###### event

`"error"`

###### listener

(`err`) => `void`

###### Returns

`this`

###### Inherited from

```ts
ExpressRequest.removeListener
```

###### Call Signature

```ts
removeListener(event, listener): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:692

###### Parameters

###### event

`"pause"`

###### listener

() => `void`

###### Returns

`this`

###### Inherited from

```ts
ExpressRequest.removeListener
```

###### Call Signature

```ts
removeListener(event, listener): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:693

###### Parameters

###### event

`"readable"`

###### listener

() => `void`

###### Returns

`this`

###### Inherited from

```ts
ExpressRequest.removeListener
```

###### Call Signature

```ts
removeListener(event, listener): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:694

###### Parameters

###### event

`"resume"`

###### listener

() => `void`

###### Returns

`this`

###### Inherited from

```ts
ExpressRequest.removeListener
```

###### Call Signature

```ts
removeListener(event, listener): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:695

###### Parameters

###### event

`string` | `symbol`

###### listener

(...`args`) => `void`

###### Returns

`this`

###### Inherited from

```ts
ExpressRequest.removeListener
```

##### resume()

```ts
resume(): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:309

The `readable.resume()` method causes an explicitly paused `Readable` stream to
resume emitting `'data'` events, switching the stream into flowing mode.

The `readable.resume()` method can be used to fully consume the data from a
stream without actually processing any of that data:

```js
getReadableStreamSomehow()
  .resume()
  .on('end', () => {
    console.log('Reached the end, but did not read anything.');
  });
```

The `readable.resume()` method has no effect if there is a `'readable'` event listener.

###### Returns

`this`

###### Since

v0.9.4

###### Inherited from

```ts
ExpressRequest.resume
```

##### setEncoding()

```ts
setEncoding(encoding): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:268

The `readable.setEncoding()` method sets the character encoding for
data read from the `Readable` stream.

By default, no encoding is assigned and stream data will be returned as `Buffer` objects. Setting an encoding causes the stream data
to be returned as strings of the specified encoding rather than as `Buffer` objects. For instance, calling `readable.setEncoding('utf8')` will cause the
output data to be interpreted as UTF-8 data, and passed as strings. Calling `readable.setEncoding('hex')` will cause the data to be encoded in hexadecimal
string format.

The `Readable` stream will properly handle multi-byte characters delivered
through the stream that would otherwise become improperly decoded if simply
pulled from the stream as `Buffer` objects.

```js
const readable = getReadableStreamSomehow();
readable.setEncoding('utf8');
readable.on('data', (chunk) => {
  assert.equal(typeof chunk, 'string');
  console.log('Got %d characters of string data:', chunk.length);
});
```

###### Parameters

###### encoding

`BufferEncoding`

The encoding to use.

###### Returns

`this`

###### Since

v0.9.4

###### Inherited from

```ts
ExpressRequest.setEncoding
```

##### setMaxListeners()

```ts
setMaxListeners(n): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/events.d.ts:813

By default `EventEmitter`s will print a warning if more than `10` listeners are
added for a particular event. This is a useful default that helps finding
memory leaks. The `emitter.setMaxListeners()` method allows the limit to be
modified for this specific `EventEmitter` instance. The value can be set to `Infinity` (or `0`) to indicate an unlimited number of listeners.

Returns a reference to the `EventEmitter`, so that calls can be chained.

###### Parameters

###### n

`number`

###### Returns

`this`

###### Since

v0.3.5

###### Inherited from

```ts
ExpressRequest.setMaxListeners
```

##### setTimeout()

```ts
setTimeout(msecs, callback?): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/http.d.ts:1404

Calls `message.socket.setTimeout(msecs, callback)`.

###### Parameters

###### msecs

`number`

###### callback?

() => `void`

###### Returns

`this`

###### Since

v0.5.9

###### Inherited from

```ts
ExpressRequest.setTimeout
```

##### some()

```ts
some(fn, options?): Promise<boolean>;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:514

This method is similar to `Array.prototype.some` and calls *fn* on each chunk in the stream
until the awaited return value is `true` (or any truthy value). Once an *fn* call on a chunk
`await`ed return value is truthy, the stream is destroyed and the promise is fulfilled with `true`.
If none of the *fn* calls on the chunks return a truthy value, the promise is fulfilled with `false`.

###### Parameters

###### fn

(`data`, `options?`) => `boolean` \| `Promise`\<`boolean`\>

a function to call on each chunk of the stream. Async or not.

###### options?

`ArrayOptions`

###### Returns

`Promise`\<`boolean`\>

a promise evaluating to `true` if *fn* returned a truthy value for at least one of the chunks.

###### Since

v17.5.0

###### Inherited from

```ts
ExpressRequest.some
```

##### take()

```ts
take(limit, options?): Readable;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:573

This method returns a new stream with the first *limit* chunks.

###### Parameters

###### limit

`number`

the number of chunks to take from the readable.

###### options?

`Pick`\<`ArrayOptions`, `"signal"`\>

###### Returns

`Readable`

a stream with *limit* chunks taken.

###### Since

v17.5.0

###### Inherited from

```ts
ExpressRequest.take
```

##### toArray()

```ts
toArray(options?): Promise<any[]>;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:504

This method allows easily obtaining the contents of a stream.

As this method reads the entire stream into memory, it negates the benefits of streams. It's intended
for interoperability and convenience, not as the primary way to consume streams.

###### Parameters

###### options?

`Pick`\<`ArrayOptions`, `"signal"`\>

###### Returns

`Promise`\<`any`[]\>

a promise containing an array with the contents of the stream.

###### Since

v17.5.0

###### Inherited from

```ts
ExpressRequest.toArray
```

##### unpipe()

```ts
unpipe(destination?): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:353

The `readable.unpipe()` method detaches a `Writable` stream previously attached
using the [pipe](#pipe) method.

If the `destination` is not specified, then _all_ pipes are detached.

If the `destination` is specified, but no pipe is set up for it, then
the method does nothing.

```js
import fs from 'node:fs';
const readable = getReadableStreamSomehow();
const writable = fs.createWriteStream('file.txt');
// All the data from readable goes into 'file.txt',
// but only for the first second.
readable.pipe(writable);
setTimeout(() => {
  console.log('Stop writing to file.txt.');
  readable.unpipe(writable);
  console.log('Manually close the file stream.');
  writable.end();
}, 1000);
```

###### Parameters

###### destination?

`WritableStream`

Optional specific stream to unpipe

###### Returns

`this`

###### Since

v0.9.4

###### Inherited from

```ts
ExpressRequest.unpipe
```

##### unshift()

```ts
unshift(chunk, encoding?): void;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:419

Passing `chunk` as `null` signals the end of the stream (EOF) and behaves the
same as `readable.push(null)`, after which no more data can be written. The EOF
signal is put at the end of the buffer and any buffered data will still be
flushed.

The `readable.unshift()` method pushes a chunk of data back into the internal
buffer. This is useful in certain situations where a stream is being consumed by
code that needs to "un-consume" some amount of data that it has optimistically
pulled out of the source, so that the data can be passed on to some other party.

The `stream.unshift(chunk)` method cannot be called after the `'end'` event
has been emitted or a runtime error will be thrown.

Developers using `stream.unshift()` often should consider switching to
use of a `Transform` stream instead. See the `API for stream implementers` section for more information.

```js
// Pull off a header delimited by \n\n.
// Use unshift() if we get too much.
// Call the callback with (error, header, stream).
import { StringDecoder } from 'node:string_decoder';
function parseHeader(stream, callback) {
  stream.on('error', callback);
  stream.on('readable', onReadable);
  const decoder = new StringDecoder('utf8');
  let header = '';
  function onReadable() {
    let chunk;
    while (null !== (chunk = stream.read())) {
      const str = decoder.write(chunk);
      if (str.includes('\n\n')) {
        // Found the header boundary.
        const split = str.split(/\n\n/);
        header += split.shift();
        const remaining = split.join('\n\n');
        const buf = Buffer.from(remaining, 'utf8');
        stream.removeListener('error', callback);
        // Remove the 'readable' listener before unshifting.
        stream.removeListener('readable', onReadable);
        if (buf.length)
          stream.unshift(buf);
        // Now the body of the message can be read from the stream.
        callback(null, header, stream);
        return;
      }
      // Still reading the header.
      header += str;
    }
  }
}
```

Unlike [push](MangoJS/namespaces/Middlewares/index.md#push), `stream.unshift(chunk)` will not
end the reading process by resetting the internal reading state of the stream.
This can cause unexpected results if `readable.unshift()` is called during a
read (i.e. from within a [\_read](MangoJS/namespaces/Middlewares/index.md#_read) implementation on a
custom stream). Following the call to `readable.unshift()` with an immediate [push](MangoJS/namespaces/Middlewares/index.md#push) will reset the reading state appropriately,
however it is best to simply avoid calling `readable.unshift()` while in the
process of performing a read.

###### Parameters

###### chunk

`any`

Chunk of data to unshift onto the read queue. For streams not operating in object mode, `chunk` must
be a \{string\}, \{Buffer\}, \{TypedArray\}, \{DataView\} or `null`. For object mode streams, `chunk` may be any JavaScript value.

###### encoding?

`BufferEncoding`

Encoding of string chunks. Must be a valid `Buffer` encoding, such as `'utf8'` or `'ascii'`.

###### Returns

`void`

###### Since

v0.9.11

###### Inherited from

```ts
ExpressRequest.unshift
```

##### wrap()

```ts
wrap(stream): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:445

Prior to Node.js 0.10, streams did not implement the entire `node:stream` module API as it is currently defined. (See `Compatibility` for more
information.)

When using an older Node.js library that emits `'data'` events and has a [pause](#pause) method that is advisory only, the `readable.wrap()` method can be used to create a `Readable`
stream that uses
the old stream as its data source.

It will rarely be necessary to use `readable.wrap()` but the method has been
provided as a convenience for interacting with older Node.js applications and
libraries.

```js
import { OldReader } from './old-api-module.js';
import { Readable } from 'node:stream';
const oreader = new OldReader();
const myReader = new Readable().wrap(oreader);

myReader.on('readable', () => {
  myReader.read(); // etc.
});
```

###### Parameters

###### stream

`ReadableStream`

An "old style" readable stream

###### Returns

`this`

###### Since

v0.9.4

###### Inherited from

```ts
ExpressRequest.wrap
```

***

### Response

Defined in: [packages/core/src/core/types/api/index.ts:107](https://github.com/theunionsquare/mangojs/blob/e9b931cfa8d37ff10d485490a7c7959b19e4bfb1/packages/core/src/core/types/api/index.ts#L107)

Generic API response extending Express Response.

#### Example

```ts
type MyResponse = Response<SuccessResponse<{ users: User[] }>>;
```

#### Extends

- `Response`\<`R`\>

#### Type Parameters

##### R

`R` = `unknown`

Response body type that will be sent to the client

#### Properties

##### app

```ts
app: Application;
```

Defined in: node\_modules/.pnpm/@types+express-serve-static-core@5.1.1/node\_modules/@types/express-serve-static-core/index.d.ts:1022

###### Inherited from

```ts
ExpressResponse.app
```

##### charset

```ts
charset: string;
```

Defined in: node\_modules/.pnpm/@types+express-serve-static-core@5.1.1/node\_modules/@types/express-serve-static-core/index.d.ts:1012

###### Inherited from

```ts
ExpressResponse.charset
```

##### chunkedEncoding

```ts
chunkedEncoding: boolean;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/http.d.ts:617

###### Inherited from

```ts
ExpressResponse.chunkedEncoding
```

##### closed

```ts
readonly closed: boolean;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:791

Is `true` after `'close'` has been emitted.

###### Since

v18.0.0

###### Inherited from

```ts
ExpressResponse.closed
```

##### ~~connection~~

```ts
readonly connection: Socket;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/http.d.ts:635

Alias of `outgoingMessage.socket`.

###### Since

v0.3.0

###### Deprecated

Since v15.12.0,v14.17.1 - Use `socket` instead.

###### Inherited from

```ts
ExpressResponse.connection
```

##### destroyed

```ts
destroyed: boolean;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:786

Is `true` after `writable.destroy()` has been called.

###### Since

v8.0.0

###### Inherited from

```ts
ExpressResponse.destroyed
```

##### errored

```ts
readonly errored: Error;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:796

Returns error if the stream has been destroyed with an error.

###### Since

v18.0.0

###### Inherited from

```ts
ExpressResponse.errored
```

##### ~~finished~~

```ts
finished: boolean;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/http.d.ts:624

###### Deprecated

Use `writableEnded` instead.

###### Inherited from

```ts
ExpressResponse.finished
```

##### headersSent

```ts
headersSent: boolean;
```

Defined in: node\_modules/.pnpm/@types+express-serve-static-core@5.1.1/node\_modules/@types/express-serve-static-core/index.d.ts:927

Read-only. `true` if the headers were sent, otherwise `false`.

###### Since

v0.9.3

###### Inherited from

```ts
ExpressResponse.headersSent
```

##### json

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

###### Inherited from

```ts
ExpressResponse.json
```

##### jsonp

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

###### Inherited from

```ts
ExpressResponse.jsonp
```

##### locals

```ts
locals: Record<string, any> & Locals;
```

Defined in: node\_modules/.pnpm/@types+express-serve-static-core@5.1.1/node\_modules/@types/express-serve-static-core/index.d.ts:1010

###### Inherited from

```ts
ExpressResponse.locals
```

##### req

```ts
req: Request;
```

Defined in: node\_modules/.pnpm/@types+express-serve-static-core@5.1.1/node\_modules/@types/express-serve-static-core/index.d.ts:1039

After middleware.init executed, Response will contain req property
See: express/lib/middleware/init.js

###### Inherited from

```ts
ExpressResponse.req
```

##### send

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

###### Inherited from

```ts
ExpressResponse.send
```

##### sendDate

```ts
sendDate: boolean;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/http.d.ts:620

###### Inherited from

```ts
ExpressResponse.sendDate
```

##### shouldKeepAlive

```ts
shouldKeepAlive: boolean;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/http.d.ts:618

###### Inherited from

```ts
ExpressResponse.shouldKeepAlive
```

##### socket

```ts
readonly socket: Socket;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/http.d.ts:643

Reference to the underlying socket. Usually, users will not want to access
this property.

After calling `outgoingMessage.end()`, this property will be nulled.

###### Since

v0.3.0

###### Inherited from

```ts
ExpressResponse.socket
```

##### statusCode

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

###### Since

v0.4.0

###### Inherited from

```ts
ExpressResponse.statusCode
```

##### statusMessage

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

###### Since

v0.11.8

###### Inherited from

```ts
ExpressResponse.statusMessage
```

##### strictContentLength

```ts
strictContentLength: boolean;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/http.d.ts:844

If set to `true`, Node.js will check whether the `Content-Length` header value and the size of the body, in bytes, are equal.
Mismatching the `Content-Length` header value will result
in an `Error` being thrown, identified by `code:``'ERR_HTTP_CONTENT_LENGTH_MISMATCH'`.

###### Since

v18.10.0, v16.18.0

###### Inherited from

```ts
ExpressResponse.strictContentLength
```

##### useChunkedEncodingByDefault

```ts
useChunkedEncodingByDefault: boolean;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/http.d.ts:619

###### Inherited from

```ts
ExpressResponse.useChunkedEncodingByDefault
```

##### writable

```ts
readonly writable: boolean;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:742

Is `true` if it is safe to call `writable.write()`, which means
the stream has not been destroyed, errored, or ended.

###### Since

v11.4.0

###### Inherited from

```ts
ExpressResponse.writable
```

##### writableAborted

```ts
readonly writableAborted: boolean;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:747

Returns whether the stream was destroyed or errored before emitting `'finish'`.

###### Since

v18.0.0, v16.17.0

###### Inherited from

```ts
ExpressResponse.writableAborted
```

##### writableCorked

```ts
readonly writableCorked: number;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:781

Number of times `writable.uncork()` needs to be
called in order to fully uncork the stream.

###### Since

v13.2.0, v12.16.0

###### Inherited from

```ts
ExpressResponse.writableCorked
```

##### writableEnded

```ts
readonly writableEnded: boolean;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:753

Is `true` after `writable.end()` has been called. This property
does not indicate whether the data has been flushed, for this use `writable.writableFinished` instead.

###### Since

v12.9.0

###### Inherited from

```ts
ExpressResponse.writableEnded
```

##### writableFinished

```ts
readonly writableFinished: boolean;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:758

Is set to `true` immediately before the `'finish'` event is emitted.

###### Since

v12.6.0

###### Inherited from

```ts
ExpressResponse.writableFinished
```

##### writableHighWaterMark

```ts
readonly writableHighWaterMark: number;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:763

Return the value of `highWaterMark` passed when creating this `Writable`.

###### Since

v9.3.0

###### Inherited from

```ts
ExpressResponse.writableHighWaterMark
```

##### writableLength

```ts
readonly writableLength: number;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:770

This property contains the number of bytes (or objects) in the queue
ready to be written. The value provides introspection data regarding
the status of the `highWaterMark`.

###### Since

v9.4.0

###### Inherited from

```ts
ExpressResponse.writableLength
```

##### writableNeedDrain

```ts
readonly writableNeedDrain: boolean;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:801

Is `true` if the stream's buffer has been full and stream will emit `'drain'`.

###### Since

v15.2.0, v14.17.0

###### Inherited from

```ts
ExpressResponse.writableNeedDrain
```

##### writableObjectMode

```ts
readonly writableObjectMode: boolean;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:775

Getter for the property `objectMode` of a given `Writable` stream.

###### Since

v12.3.0

###### Inherited from

```ts
ExpressResponse.writableObjectMode
```

#### Methods

##### \_construct()?

```ts
optional _construct(callback): void;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:811

###### Parameters

###### callback

(`error?`) => `void`

###### Returns

`void`

###### Inherited from

```ts
ExpressResponse._construct
```

##### \_destroy()

```ts
_destroy(error, callback): void;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:812

###### Parameters

###### error

`Error`

###### callback

(`error?`) => `void`

###### Returns

`void`

###### Inherited from

```ts
ExpressResponse._destroy
```

##### \_final()

```ts
_final(callback): void;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:813

###### Parameters

###### callback

(`error?`) => `void`

###### Returns

`void`

###### Inherited from

```ts
ExpressResponse._final
```

##### \_write()

```ts
_write(
   chunk, 
   encoding, 
   callback): void;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:803

###### Parameters

###### chunk

`any`

###### encoding

`BufferEncoding`

###### callback

(`error?`) => `void`

###### Returns

`void`

###### Inherited from

```ts
ExpressResponse._write
```

##### \_writev()?

```ts
optional _writev(chunks, callback): void;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:804

###### Parameters

###### chunks

`object`[]

###### callback

(`error?`) => `void`

###### Returns

`void`

###### Inherited from

```ts
ExpressResponse._writev
```

##### \[asyncDispose\]()

```ts
asyncDispose: Promise<void>;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:974

Calls `writable.destroy()` with an `AbortError` and returns
a promise that fulfills when the stream is finished.

###### Returns

`Promise`\<`void`\>

###### Since

v22.4.0, v20.16.0

###### Inherited from

```ts
ExpressResponse.[asyncDispose]
```

##### \[captureRejectionSymbol\]()?

```ts
optional [captureRejectionSymbol]<K>(
   error, 
   event, ...
   args): void;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/events.d.ts:103

###### Type Parameters

###### K

`K`

###### Parameters

###### error

`Error`

###### event

`string` | `symbol`

###### args

...`AnyRest`

###### Returns

`void`

###### Inherited from

```ts
ExpressResponse.[captureRejectionSymbol]
```

##### addListener()

###### Call Signature

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

###### Parameters

###### event

`"close"`

###### listener

() => `void`

###### Returns

`this`

###### Inherited from

```ts
ExpressResponse.addListener
```

###### Call Signature

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

###### Parameters

###### event

`"drain"`

###### listener

() => `void`

###### Returns

`this`

###### Inherited from

```ts
ExpressResponse.addListener
```

###### Call Signature

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

###### Parameters

###### event

`"error"`

###### listener

(`err`) => `void`

###### Returns

`this`

###### Inherited from

```ts
ExpressResponse.addListener
```

###### Call Signature

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

###### Parameters

###### event

`"finish"`

###### listener

() => `void`

###### Returns

`this`

###### Inherited from

```ts
ExpressResponse.addListener
```

###### Call Signature

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

###### Parameters

###### event

`"pipe"`

###### listener

(`src`) => `void`

###### Returns

`this`

###### Inherited from

```ts
ExpressResponse.addListener
```

###### Call Signature

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

###### Parameters

###### event

`"unpipe"`

###### listener

(`src`) => `void`

###### Returns

`this`

###### Inherited from

```ts
ExpressResponse.addListener
```

###### Call Signature

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

###### Parameters

###### event

`string` | `symbol`

###### listener

(...`args`) => `void`

###### Returns

`this`

###### Inherited from

```ts
ExpressResponse.addListener
```

##### addTrailers()

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

###### Parameters

###### headers

`OutgoingHttpHeaders` | readonly \[`string`, `string`\][]

###### Returns

`void`

###### Since

v0.3.0

###### Inherited from

```ts
ExpressResponse.addTrailers
```

##### append()

```ts
append(field, value?): this;
```

Defined in: node\_modules/.pnpm/@types+express-serve-static-core@5.1.1/node\_modules/@types/express-serve-static-core/index.d.ts:1033

Appends the specified value to the HTTP response header field.
If the header is not already set, it creates the header with the specified value.
The value parameter can be a string or an array.

Note: calling res.set() after res.append() will reset the previously-set header value.

###### Parameters

###### field

`string`

###### value?

`string` | `string`[]

###### Returns

`this`

###### Since

4.11.0

###### Inherited from

```ts
ExpressResponse.append
```

##### appendHeader()

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

###### Parameters

###### name

`string`

Header name

###### value

Header value

`string` | readonly `string`[]

###### Returns

`this`

###### Since

v18.3.0, v16.17.0

###### Inherited from

```ts
ExpressResponse.appendHeader
```

##### assignSocket()

```ts
assignSocket(socket): void;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/http.d.ts:846

###### Parameters

###### socket

`Socket`

###### Returns

`void`

###### Inherited from

```ts
ExpressResponse.assignSocket
```

##### attachment()

```ts
attachment(filename?): this;
```

Defined in: node\_modules/.pnpm/@types+express-serve-static-core@5.1.1/node\_modules/@types/express-serve-static-core/index.d.ts:906

Set _Content-Disposition_ header to _attachment_ with optional `filename`.

###### Parameters

###### filename?

`string`

###### Returns

`this`

###### Inherited from

```ts
ExpressResponse.attachment
```

##### clearCookie()

```ts
clearCookie(name, options?): this;
```

Defined in: node\_modules/.pnpm/@types+express-serve-static-core@5.1.1/node\_modules/@types/express-serve-static-core/index.d.ts:933

Clear cookie `name`.

###### Parameters

###### name

`string`

###### options?

`CookieOptions`

###### Returns

`this`

###### Inherited from

```ts
ExpressResponse.clearCookie
```

##### compose()

```ts
compose<T>(stream, options?): T;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:35

###### Type Parameters

###### T

`T` *extends* `ReadableStream`

###### Parameters

###### stream

`ComposeFnParam` | `T` | `Iterable`\<`T`, `any`, `any`\> | `AsyncIterable`\<`T`, `any`, `any`\>

###### options?

###### signal

`AbortSignal`

###### Returns

`T`

###### Inherited from

```ts
ExpressResponse.compose
```

##### contentType()

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

###### Parameters

###### type

`string`

###### Returns

`this`

###### Inherited from

```ts
ExpressResponse.contentType
```

##### cookie()

###### Call Signature

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

###### Parameters

###### name

`string`

###### val

`string`

###### options

`CookieOptions`

###### Returns

`this`

###### Inherited from

```ts
ExpressResponse.cookie
```

###### Call Signature

```ts
cookie(
   name, 
   val, 
   options): this;
```

Defined in: node\_modules/.pnpm/@types+express-serve-static-core@5.1.1/node\_modules/@types/express-serve-static-core/index.d.ts:953

###### Parameters

###### name

`string`

###### val

`any`

###### options

`CookieOptions`

###### Returns

`this`

###### Inherited from

```ts
ExpressResponse.cookie
```

###### Call Signature

```ts
cookie(name, val): this;
```

Defined in: node\_modules/.pnpm/@types+express-serve-static-core@5.1.1/node\_modules/@types/express-serve-static-core/index.d.ts:954

###### Parameters

###### name

`string`

###### val

`any`

###### Returns

`this`

###### Inherited from

```ts
ExpressResponse.cookie
```

##### cork()

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

###### Returns

`void`

###### Since

v0.11.2

###### Inherited from

```ts
ExpressResponse.cork
```

##### destroy()

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

###### Parameters

###### error?

`Error`

Optional, an error to emit with `'error'` event.

###### Returns

`this`

###### Since

v8.0.0

###### Inherited from

```ts
ExpressResponse.destroy
```

##### detachSocket()

```ts
detachSocket(socket): void;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/http.d.ts:847

###### Parameters

###### socket

`Socket`

###### Returns

`void`

###### Inherited from

```ts
ExpressResponse.detachSocket
```

##### download()

###### Call Signature

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

###### Parameters

###### path

`string`

###### fn?

`Errback`

###### Returns

`void`

###### Inherited from

```ts
ExpressResponse.download
```

###### Call Signature

```ts
download(
   path, 
   filename, 
   fn?): void;
```

Defined in: node\_modules/.pnpm/@types+express-serve-static-core@5.1.1/node\_modules/@types/express-serve-static-core/index.d.ts:818

###### Parameters

###### path

`string`

###### filename

`string`

###### fn?

`Errback`

###### Returns

`void`

###### Inherited from

```ts
ExpressResponse.download
```

###### Call Signature

```ts
download(
   path, 
   filename, 
   options, 
   fn?): void;
```

Defined in: node\_modules/.pnpm/@types+express-serve-static-core@5.1.1/node\_modules/@types/express-serve-static-core/index.d.ts:819

###### Parameters

###### path

`string`

###### filename

`string`

###### options

`DownloadOptions`

###### fn?

`Errback`

###### Returns

`void`

###### Inherited from

```ts
ExpressResponse.download
```

##### emit()

###### Call Signature

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

###### Parameters

###### event

`"close"`

###### Returns

`boolean`

###### Since

v0.1.26

###### Inherited from

```ts
ExpressResponse.emit
```

###### Call Signature

```ts
emit(event): boolean;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:993

###### Parameters

###### event

`"drain"`

###### Returns

`boolean`

###### Inherited from

```ts
ExpressResponse.emit
```

###### Call Signature

```ts
emit(event, err): boolean;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:994

###### Parameters

###### event

`"error"`

###### err

`Error`

###### Returns

`boolean`

###### Inherited from

```ts
ExpressResponse.emit
```

###### Call Signature

```ts
emit(event): boolean;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:995

###### Parameters

###### event

`"finish"`

###### Returns

`boolean`

###### Inherited from

```ts
ExpressResponse.emit
```

###### Call Signature

```ts
emit(event, src): boolean;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:996

###### Parameters

###### event

`"pipe"`

###### src

`Readable`

###### Returns

`boolean`

###### Inherited from

```ts
ExpressResponse.emit
```

###### Call Signature

```ts
emit(event, src): boolean;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:997

###### Parameters

###### event

`"unpipe"`

###### src

`Readable`

###### Returns

`boolean`

###### Inherited from

```ts
ExpressResponse.emit
```

###### Call Signature

```ts
emit(event, ...args): boolean;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:998

###### Parameters

###### event

`string` | `symbol`

###### args

...`any`[]

###### Returns

`boolean`

###### Inherited from

```ts
ExpressResponse.emit
```

##### end()

###### Call Signature

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

###### Parameters

###### cb?

() => `void`

###### Returns

`this`

###### Since

v0.9.4

###### Inherited from

```ts
ExpressResponse.end
```

###### Call Signature

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

###### Parameters

###### chunk

`any`

Optional data to write. For streams not operating in object mode, `chunk` must be a \{string\}, \{Buffer\},
\{TypedArray\} or \{DataView\}. For object mode streams, `chunk` may be any JavaScript value other than `null`.

###### cb?

() => `void`

###### Returns

`this`

###### Since

v0.9.4

###### Inherited from

```ts
ExpressResponse.end
```

###### Call Signature

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

###### Parameters

###### chunk

`any`

Optional data to write. For streams not operating in object mode, `chunk` must be a \{string\}, \{Buffer\},
\{TypedArray\} or \{DataView\}. For object mode streams, `chunk` may be any JavaScript value other than `null`.

###### encoding

`BufferEncoding`

The encoding if `chunk` is a string

###### cb?

() => `void`

###### Returns

`this`

###### Since

v0.9.4

###### Inherited from

```ts
ExpressResponse.end
```

##### eventNames()

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

###### Returns

(`string` \| `symbol`)[]

###### Since

v6.0.0

###### Inherited from

```ts
ExpressResponse.eventNames
```

##### flushHeaders()

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

###### Returns

`void`

###### Since

v1.6.0

###### Inherited from

```ts
ExpressResponse.flushHeaders
```

##### format()

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

###### Parameters

###### obj

`any`

###### Returns

`this`

###### Inherited from

```ts
ExpressResponse.format
```

##### get()

```ts
get(field): string;
```

Defined in: node\_modules/.pnpm/@types+express-serve-static-core@5.1.1/node\_modules/@types/express-serve-static-core/index.d.ts:930

Get value for header `field`.

###### Parameters

###### field

`string`

###### Returns

`string`

###### Inherited from

```ts
ExpressResponse.get
```

##### getHeader()

```ts
getHeader(name): string | number | string[];
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/http.d.ts:718

Gets the value of the HTTP header with the given name. If that header is not
set, the returned value will be `undefined`.

###### Parameters

###### name

`string`

Name of header

###### Returns

`string` \| `number` \| `string`[]

###### Since

v0.4.0

###### Inherited from

```ts
ExpressResponse.getHeader
```

##### getHeaderNames()

```ts
getHeaderNames(): string[];
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/http.d.ts:746

Returns an array containing the unique names of the current outgoing headers.
All names are lowercase.

###### Returns

`string`[]

###### Since

v7.7.0

###### Inherited from

```ts
ExpressResponse.getHeaderNames
```

##### getHeaders()

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

###### Returns

`OutgoingHttpHeaders`

###### Since

v7.7.0

###### Inherited from

```ts
ExpressResponse.getHeaders
```

##### getMaxListeners()

```ts
getMaxListeners(): number;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/events.d.ts:819

Returns the current max listener value for the `EventEmitter` which is either
set by `emitter.setMaxListeners(n)` or defaults to EventEmitter.defaultMaxListeners.

###### Returns

`number`

###### Since

v1.0.0

###### Inherited from

```ts
ExpressResponse.getMaxListeners
```

##### hasHeader()

```ts
hasHeader(name): boolean;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/http.d.ts:756

Returns `true` if the header identified by `name` is currently set in the
outgoing headers. The header name is case-insensitive.

```js
const hasContentType = outgoingMessage.hasHeader('content-type');
```

###### Parameters

###### name

`string`

###### Returns

`boolean`

###### Since

v7.7.0

###### Inherited from

```ts
ExpressResponse.hasHeader
```

##### header()

###### Call Signature

```ts
header(field): this;
```

Defined in: node\_modules/.pnpm/@types+express-serve-static-core@5.1.1/node\_modules/@types/express-serve-static-core/index.d.ts:923

###### Parameters

###### field

`any`

###### Returns

`this`

###### Inherited from

```ts
ExpressResponse.header
```

###### Call Signature

```ts
header(field, value?): this;
```

Defined in: node\_modules/.pnpm/@types+express-serve-static-core@5.1.1/node\_modules/@types/express-serve-static-core/index.d.ts:924

###### Parameters

###### field

`string`

###### value?

`string` | `string`[]

###### Returns

`this`

###### Inherited from

```ts
ExpressResponse.header
```

##### links()

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

###### Parameters

###### links

`any`

###### Returns

`this`

###### Inherited from

```ts
ExpressResponse.links
```

##### listenerCount()

```ts
listenerCount<K>(eventName, listener?): number;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/events.d.ts:913

Returns the number of listeners listening for the event named `eventName`.
If `listener` is provided, it will return how many times the listener is found
in the list of the listeners of the event.

###### Type Parameters

###### K

`K`

###### Parameters

###### eventName

The name of the event being listened for

`string` | `symbol`

###### listener?

`Function`

The event handler function

###### Returns

`number`

###### Since

v3.2.0

###### Inherited from

```ts
ExpressResponse.listenerCount
```

##### listeners()

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

###### Type Parameters

###### K

`K`

###### Parameters

###### eventName

`string` | `symbol`

###### Returns

`Function`[]

###### Since

v0.1.26

###### Inherited from

```ts
ExpressResponse.listeners
```

##### location()

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

###### Parameters

###### url

`string`

###### Returns

`this`

###### Inherited from

```ts
ExpressResponse.location
```

##### off()

```ts
off<K>(eventName, listener): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/events.d.ts:792

Alias for `emitter.removeListener()`.

###### Type Parameters

###### K

`K`

###### Parameters

###### eventName

`string` | `symbol`

###### listener

(...`args`) => `void`

###### Returns

`this`

###### Since

v10.0.0

###### Inherited from

```ts
ExpressResponse.off
```

##### on()

###### Call Signature

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

###### Parameters

###### event

`"close"`

###### listener

() => `void`

The callback function

###### Returns

`this`

###### Since

v0.1.101

###### Inherited from

```ts
ExpressResponse.on
```

###### Call Signature

```ts
on(event, listener): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:1000

###### Parameters

###### event

`"drain"`

###### listener

() => `void`

###### Returns

`this`

###### Inherited from

```ts
ExpressResponse.on
```

###### Call Signature

```ts
on(event, listener): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:1001

###### Parameters

###### event

`"error"`

###### listener

(`err`) => `void`

###### Returns

`this`

###### Inherited from

```ts
ExpressResponse.on
```

###### Call Signature

```ts
on(event, listener): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:1002

###### Parameters

###### event

`"finish"`

###### listener

() => `void`

###### Returns

`this`

###### Inherited from

```ts
ExpressResponse.on
```

###### Call Signature

```ts
on(event, listener): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:1003

###### Parameters

###### event

`"pipe"`

###### listener

(`src`) => `void`

###### Returns

`this`

###### Inherited from

```ts
ExpressResponse.on
```

###### Call Signature

```ts
on(event, listener): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:1004

###### Parameters

###### event

`"unpipe"`

###### listener

(`src`) => `void`

###### Returns

`this`

###### Inherited from

```ts
ExpressResponse.on
```

###### Call Signature

```ts
on(event, listener): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:1005

###### Parameters

###### event

`string` | `symbol`

###### listener

(...`args`) => `void`

###### Returns

`this`

###### Inherited from

```ts
ExpressResponse.on
```

##### once()

###### Call Signature

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

###### Parameters

###### event

`"close"`

###### listener

() => `void`

The callback function

###### Returns

`this`

###### Since

v0.3.0

###### Inherited from

```ts
ExpressResponse.once
```

###### Call Signature

```ts
once(event, listener): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:1007

###### Parameters

###### event

`"drain"`

###### listener

() => `void`

###### Returns

`this`

###### Inherited from

```ts
ExpressResponse.once
```

###### Call Signature

```ts
once(event, listener): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:1008

###### Parameters

###### event

`"error"`

###### listener

(`err`) => `void`

###### Returns

`this`

###### Inherited from

```ts
ExpressResponse.once
```

###### Call Signature

```ts
once(event, listener): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:1009

###### Parameters

###### event

`"finish"`

###### listener

() => `void`

###### Returns

`this`

###### Inherited from

```ts
ExpressResponse.once
```

###### Call Signature

```ts
once(event, listener): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:1010

###### Parameters

###### event

`"pipe"`

###### listener

(`src`) => `void`

###### Returns

`this`

###### Inherited from

```ts
ExpressResponse.once
```

###### Call Signature

```ts
once(event, listener): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:1011

###### Parameters

###### event

`"unpipe"`

###### listener

(`src`) => `void`

###### Returns

`this`

###### Inherited from

```ts
ExpressResponse.once
```

###### Call Signature

```ts
once(event, listener): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:1012

###### Parameters

###### event

`string` | `symbol`

###### listener

(...`args`) => `void`

###### Returns

`this`

###### Inherited from

```ts
ExpressResponse.once
```

##### pipe()

```ts
pipe<T>(destination, options?): T;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:29

###### Type Parameters

###### T

`T` *extends* `WritableStream`

###### Parameters

###### destination

`T`

###### options?

###### end?

`boolean`

###### Returns

`T`

###### Inherited from

```ts
ExpressResponse.pipe
```

##### prependListener()

###### Call Signature

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

###### Parameters

###### event

`"close"`

###### listener

() => `void`

The callback function

###### Returns

`this`

###### Since

v6.0.0

###### Inherited from

```ts
ExpressResponse.prependListener
```

###### Call Signature

```ts
prependListener(event, listener): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:1014

###### Parameters

###### event

`"drain"`

###### listener

() => `void`

###### Returns

`this`

###### Inherited from

```ts
ExpressResponse.prependListener
```

###### Call Signature

```ts
prependListener(event, listener): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:1015

###### Parameters

###### event

`"error"`

###### listener

(`err`) => `void`

###### Returns

`this`

###### Inherited from

```ts
ExpressResponse.prependListener
```

###### Call Signature

```ts
prependListener(event, listener): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:1016

###### Parameters

###### event

`"finish"`

###### listener

() => `void`

###### Returns

`this`

###### Inherited from

```ts
ExpressResponse.prependListener
```

###### Call Signature

```ts
prependListener(event, listener): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:1017

###### Parameters

###### event

`"pipe"`

###### listener

(`src`) => `void`

###### Returns

`this`

###### Inherited from

```ts
ExpressResponse.prependListener
```

###### Call Signature

```ts
prependListener(event, listener): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:1018

###### Parameters

###### event

`"unpipe"`

###### listener

(`src`) => `void`

###### Returns

`this`

###### Inherited from

```ts
ExpressResponse.prependListener
```

###### Call Signature

```ts
prependListener(event, listener): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:1019

###### Parameters

###### event

`string` | `symbol`

###### listener

(...`args`) => `void`

###### Returns

`this`

###### Inherited from

```ts
ExpressResponse.prependListener
```

##### prependOnceListener()

###### Call Signature

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

###### Parameters

###### event

`"close"`

###### listener

() => `void`

The callback function

###### Returns

`this`

###### Since

v6.0.0

###### Inherited from

```ts
ExpressResponse.prependOnceListener
```

###### Call Signature

```ts
prependOnceListener(event, listener): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:1021

###### Parameters

###### event

`"drain"`

###### listener

() => `void`

###### Returns

`this`

###### Inherited from

```ts
ExpressResponse.prependOnceListener
```

###### Call Signature

```ts
prependOnceListener(event, listener): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:1022

###### Parameters

###### event

`"error"`

###### listener

(`err`) => `void`

###### Returns

`this`

###### Inherited from

```ts
ExpressResponse.prependOnceListener
```

###### Call Signature

```ts
prependOnceListener(event, listener): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:1023

###### Parameters

###### event

`"finish"`

###### listener

() => `void`

###### Returns

`this`

###### Inherited from

```ts
ExpressResponse.prependOnceListener
```

###### Call Signature

```ts
prependOnceListener(event, listener): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:1024

###### Parameters

###### event

`"pipe"`

###### listener

(`src`) => `void`

###### Returns

`this`

###### Inherited from

```ts
ExpressResponse.prependOnceListener
```

###### Call Signature

```ts
prependOnceListener(event, listener): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:1025

###### Parameters

###### event

`"unpipe"`

###### listener

(`src`) => `void`

###### Returns

`this`

###### Inherited from

```ts
ExpressResponse.prependOnceListener
```

###### Call Signature

```ts
prependOnceListener(event, listener): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:1026

###### Parameters

###### event

`string` | `symbol`

###### listener

(...`args`) => `void`

###### Returns

`this`

###### Inherited from

```ts
ExpressResponse.prependOnceListener
```

##### rawListeners()

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

###### Type Parameters

###### K

`K`

###### Parameters

###### eventName

`string` | `symbol`

###### Returns

`Function`[]

###### Since

v9.4.0

###### Inherited from

```ts
ExpressResponse.rawListeners
```

##### redirect()

###### Call Signature

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

###### Parameters

###### url

`string`

###### Returns

`void`

###### Inherited from

```ts
ExpressResponse.redirect
```

###### Call Signature

```ts
redirect(status, url): void;
```

Defined in: node\_modules/.pnpm/@types+express-serve-static-core@5.1.1/node\_modules/@types/express-serve-static-core/index.d.ts:995

###### Parameters

###### status

`number`

###### url

`string`

###### Returns

`void`

###### Inherited from

```ts
ExpressResponse.redirect
```

##### removeAllListeners()

```ts
removeAllListeners(eventName?): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/events.d.ts:803

Removes all listeners, or those of the specified `eventName`.

It is bad practice to remove listeners added elsewhere in the code,
particularly when the `EventEmitter` instance was created by some other
component or module (e.g. sockets or file streams).

Returns a reference to the `EventEmitter`, so that calls can be chained.

###### Parameters

###### eventName?

`string` | `symbol`

###### Returns

`this`

###### Since

v0.1.26

###### Inherited from

```ts
ExpressResponse.removeAllListeners
```

##### removeHeader()

```ts
removeHeader(name): void;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/http.d.ts:766

Removes a header that is queued for implicit sending.

```js
outgoingMessage.removeHeader('Content-Encoding');
```

###### Parameters

###### name

`string`

Header name

###### Returns

`void`

###### Since

v0.4.0

###### Inherited from

```ts
ExpressResponse.removeHeader
```

##### removeListener()

###### Call Signature

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

###### Parameters

###### event

`"close"`

###### listener

() => `void`

###### Returns

`this`

###### Since

v0.1.26

###### Inherited from

```ts
ExpressResponse.removeListener
```

###### Call Signature

```ts
removeListener(event, listener): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:1028

###### Parameters

###### event

`"drain"`

###### listener

() => `void`

###### Returns

`this`

###### Inherited from

```ts
ExpressResponse.removeListener
```

###### Call Signature

```ts
removeListener(event, listener): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:1029

###### Parameters

###### event

`"error"`

###### listener

(`err`) => `void`

###### Returns

`this`

###### Inherited from

```ts
ExpressResponse.removeListener
```

###### Call Signature

```ts
removeListener(event, listener): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:1030

###### Parameters

###### event

`"finish"`

###### listener

() => `void`

###### Returns

`this`

###### Inherited from

```ts
ExpressResponse.removeListener
```

###### Call Signature

```ts
removeListener(event, listener): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:1031

###### Parameters

###### event

`"pipe"`

###### listener

(`src`) => `void`

###### Returns

`this`

###### Inherited from

```ts
ExpressResponse.removeListener
```

###### Call Signature

```ts
removeListener(event, listener): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:1032

###### Parameters

###### event

`"unpipe"`

###### listener

(`src`) => `void`

###### Returns

`this`

###### Inherited from

```ts
ExpressResponse.removeListener
```

###### Call Signature

```ts
removeListener(event, listener): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:1033

###### Parameters

###### event

`string` | `symbol`

###### listener

(...`args`) => `void`

###### Returns

`this`

###### Inherited from

```ts
ExpressResponse.removeListener
```

##### render()

###### Call Signature

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

###### Parameters

###### view

`string`

###### options?

`object`

###### callback?

(`err`, `html`) => `void`

###### Returns

`void`

###### Inherited from

```ts
ExpressResponse.render
```

###### Call Signature

```ts
render(view, callback?): void;
```

Defined in: node\_modules/.pnpm/@types+express-serve-static-core@5.1.1/node\_modules/@types/express-serve-static-core/index.d.ts:1008

###### Parameters

###### view

`string`

###### callback?

(`err`, `html`) => `void`

###### Returns

`void`

###### Inherited from

```ts
ExpressResponse.render
```

##### sendFile()

###### Call Signature

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

###### Parameters

###### path

`string`

###### fn?

`Errback`

###### Returns

`void`

###### Api

public

###### Inherited from

```ts
ExpressResponse.sendFile
```

###### Call Signature

```ts
sendFile(
   path, 
   options, 
   fn?): void;
```

Defined in: node\_modules/.pnpm/@types+express-serve-static-core@5.1.1/node\_modules/@types/express-serve-static-core/index.d.ts:802

###### Parameters

###### path

`string`

###### options

`SendFileOptions`

###### fn?

`Errback`

###### Returns

`void`

###### Inherited from

```ts
ExpressResponse.sendFile
```

##### sendStatus()

```ts
sendStatus(code): this;
```

Defined in: node\_modules/.pnpm/@types+express-serve-static-core@5.1.1/node\_modules/@types/express-serve-static-core/index.d.ts:711

Set the response HTTP status code to `statusCode` and send its string representation as the response body.

###### Parameters

###### code

`number`

###### Returns

`this`

###### Link

http://expressjs.com/4x/api.html#res.sendStatus

Examples:

   res.sendStatus(200); // equivalent to res.status(200).send('OK')
   res.sendStatus(403); // equivalent to res.status(403).send('Forbidden')
   res.sendStatus(404); // equivalent to res.status(404).send('Not Found')
   res.sendStatus(500); // equivalent to res.status(500).send('Internal Server Error')

###### Inherited from

```ts
ExpressResponse.sendStatus
```

##### set()

###### Call Signature

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

###### Parameters

###### field

`any`

###### Returns

`this`

###### Inherited from

```ts
ExpressResponse.set
```

###### Call Signature

```ts
set(field, value?): this;
```

Defined in: node\_modules/.pnpm/@types+express-serve-static-core@5.1.1/node\_modules/@types/express-serve-static-core/index.d.ts:921

###### Parameters

###### field

`string`

###### value?

`string` | `string`[]

###### Returns

`this`

###### Inherited from

```ts
ExpressResponse.set
```

##### setDefaultEncoding()

```ts
setDefaultEncoding(encoding): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/stream.d.ts:877

The `writable.setDefaultEncoding()` method sets the default `encoding` for a `Writable` stream.

###### Parameters

###### encoding

`BufferEncoding`

The new default encoding

###### Returns

`this`

###### Since

v0.11.15

###### Inherited from

```ts
ExpressResponse.setDefaultEncoding
```

##### setHeader()

```ts
setHeader(name, value): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/http.d.ts:659

Sets a single header value. If the header already exists in the to-be-sent
headers, its value will be replaced. Use an array of strings to send multiple
headers with the same name.

###### Parameters

###### name

`string`

Header name

###### value

Header value

`string` | `number` | readonly `string`[]

###### Returns

`this`

###### Since

v0.4.0

###### Inherited from

```ts
ExpressResponse.setHeader
```

##### setHeaders()

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

###### Parameters

###### headers

`Headers` | `Map`\<`string`, `string` \| `number` \| readonly `string`[]\>

###### Returns

`this`

###### Since

v19.6.0, v18.15.0

###### Inherited from

```ts
ExpressResponse.setHeaders
```

##### setMaxListeners()

```ts
setMaxListeners(n): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/events.d.ts:813

By default `EventEmitter`s will print a warning if more than `10` listeners are
added for a particular event. This is a useful default that helps finding
memory leaks. The `emitter.setMaxListeners()` method allows the limit to be
modified for this specific `EventEmitter` instance. The value can be set to `Infinity` (or `0`) to indicate an unlimited number of listeners.

Returns a reference to the `EventEmitter`, so that calls can be chained.

###### Parameters

###### n

`number`

###### Returns

`this`

###### Since

v0.3.5

###### Inherited from

```ts
ExpressResponse.setMaxListeners
```

##### setTimeout()

```ts
setTimeout(msecs, callback?): this;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/http.d.ts:650

Once a socket is associated with the message and is connected, `socket.setTimeout()` will be called with `msecs` as the first parameter.

###### Parameters

###### msecs

`number`

###### callback?

() => `void`

Optional function to be called when a timeout occurs. Same as binding to the `timeout` event.

###### Returns

`this`

###### Since

v0.9.12

###### Inherited from

```ts
ExpressResponse.setTimeout
```

##### status()

```ts
status(code): this;
```

Defined in: node\_modules/.pnpm/@types+express-serve-static-core@5.1.1/node\_modules/@types/express-serve-static-core/index.d.ts:698

Set status `code`.

###### Parameters

###### code

`number`

###### Returns

`this`

###### Inherited from

```ts
ExpressResponse.status
```

##### type()

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

###### Parameters

###### type

`string`

###### Returns

`this`

###### Inherited from

```ts
ExpressResponse.type
```

##### uncork()

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

###### Returns

`void`

###### Since

v0.11.2

###### Inherited from

```ts
ExpressResponse.uncork
```

##### vary()

```ts
vary(field): this;
```

Defined in: node\_modules/.pnpm/@types+express-serve-static-core@5.1.1/node\_modules/@types/express-serve-static-core/index.d.ts:1020

Adds the field to the Vary response header, if it is not there already.
Examples:

    res.vary('User-Agent').render('docs');

###### Parameters

###### field

`string`

###### Returns

`this`

###### Inherited from

```ts
ExpressResponse.vary
```

##### write()

###### Call Signature

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
recommended to encapsulate the logic into a `Readable` and use [pipe](#pipe-1). However, if calling `write()` is preferred, it is
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

###### Parameters

###### chunk

`any`

Optional data to write. For streams not operating in object mode, `chunk` must be a \{string\}, \{Buffer\},
\{TypedArray\} or \{DataView\}. For object mode streams, `chunk` may be any JavaScript value other than `null`.

###### callback?

(`error`) => `void`

Callback for when this chunk of data is flushed.

###### Returns

`boolean`

`false` if the stream wishes for the calling code to wait for the `'drain'` event to be emitted before continuing to write additional data; otherwise `true`.

###### Since

v0.9.4

###### Inherited from

```ts
ExpressResponse.write
```

###### Call Signature

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
recommended to encapsulate the logic into a `Readable` and use [pipe](#pipe-1). However, if calling `write()` is preferred, it is
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

###### Parameters

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

###### Returns

`boolean`

`false` if the stream wishes for the calling code to wait for the `'drain'` event to be emitted before continuing to write additional data; otherwise `true`.

###### Since

v0.9.4

###### Inherited from

```ts
ExpressResponse.write
```

##### writeContinue()

```ts
writeContinue(callback?): void;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/http.d.ts:853

Sends an HTTP/1.1 100 Continue message to the client, indicating that
the request body should be sent. See the `'checkContinue'` event on `Server`.

###### Parameters

###### callback?

() => `void`

###### Returns

`void`

###### Since

v0.3.0

###### Inherited from

```ts
ExpressResponse.writeContinue
```

##### writeEarlyHints()

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

###### Parameters

###### hints

`Record`\<`string`, `string` \| `string`[]\>

An object containing the values of headers

###### callback?

() => `void`

Will be called when the response message has been written

###### Returns

`void`

###### Since

v18.11.0

###### Inherited from

```ts
ExpressResponse.writeEarlyHints
```

##### writeHead()

###### Call Signature

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

###### Parameters

###### statusCode

`number`

###### statusMessage?

`string`

###### headers?

`OutgoingHttpHeaders` | `OutgoingHttpHeader`[]

###### Returns

`this`

###### Since

v0.1.30

###### Inherited from

```ts
ExpressResponse.writeHead
```

###### Call Signature

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

###### Parameters

###### statusCode

`number`

###### headers?

`OutgoingHttpHeaders` | `OutgoingHttpHeader`[]

###### Returns

`this`

###### Since

v0.1.30

###### Inherited from

```ts
ExpressResponse.writeHead
```

##### writeProcessing()

```ts
writeProcessing(callback?): void;
```

Defined in: node\_modules/.pnpm/@types+node@24.10.9/node\_modules/@types/node/http.d.ts:956

Sends a HTTP/1.1 102 Processing message to the client, indicating that
the request body should be sent.

###### Parameters

###### callback?

() => `void`

###### Returns

`void`

###### Since

v10.0.0

###### Inherited from

```ts
ExpressResponse.writeProcessing
```

## Variables

### Delete()

```ts
const Delete: (path) => MethodDecorator;
```

Defined in: [packages/core/src/core/decorators/http/handlers.decorator.ts:58](https://github.com/theunionsquare/mangojs/blob/e9b931cfa8d37ff10d485490a7c7959b19e4bfb1/packages/core/src/core/decorators/http/handlers.decorator.ts#L58)

#### Parameters

##### path

`string`

#### Returns

`MethodDecorator`

***

### Get()

```ts
const Get: (path) => MethodDecorator;
```

Defined in: [packages/core/src/core/decorators/http/handlers.decorator.ts:52](https://github.com/theunionsquare/mangojs/blob/e9b931cfa8d37ff10d485490a7c7959b19e4bfb1/packages/core/src/core/decorators/http/handlers.decorator.ts#L52)

#### Parameters

##### path

`string`

#### Returns

`MethodDecorator`

***

### ~~INVERSITY\_TYPES~~

```ts
const INVERSITY_TYPES: object;
```

Defined in: [packages/core/src/core/types/inversifyTypes.ts:1](https://github.com/theunionsquare/mangojs/blob/e9b931cfa8d37ff10d485490a7c7959b19e4bfb1/packages/core/src/core/types/inversifyTypes.ts#L1)

#### Type Declaration

##### ~~ApplicationPreCheck~~

```ts
ApplicationPreCheck: symbol;
```

##### ~~AuthorizationContext~~

```ts
AuthorizationContext: symbol;
```

###### Deprecated

Use AuthStrategyRegistry instead

##### ~~AuthStrategyRegistry~~

```ts
AuthStrategyRegistry: symbol;
```

Registry that collects all auth strategies via

###### Multi Inject

##### ~~DatabaseManagerFactory~~

```ts
DatabaseManagerFactory: symbol;
```

##### ~~EmailServiceFactory~~

```ts
EmailServiceFactory: symbol;
```

##### ~~LoggerFactory~~

```ts
LoggerFactory: symbol;
```

##### ~~PersistenceContext~~

```ts
PersistenceContext: symbol;
```

##### ~~QueueClient~~

```ts
QueueClient: symbol;
```

##### ~~QueueManager~~

```ts
QueueManager: symbol;
```

##### ~~ScheduleRegistry~~

```ts
ScheduleRegistry: symbol;
```

##### ~~SetUpDatabaseAction~~

```ts
SetUpDatabaseAction: symbol;
```

#### Deprecated

Use Container.INVERSITY_TYPES or import from types directly.

***

### Post()

```ts
const Post: (path) => MethodDecorator;
```

Defined in: [packages/core/src/core/decorators/http/handlers.decorator.ts:54](https://github.com/theunionsquare/mangojs/blob/e9b931cfa8d37ff10d485490a7c7959b19e4bfb1/packages/core/src/core/decorators/http/handlers.decorator.ts#L54)

#### Parameters

##### path

`string`

#### Returns

`MethodDecorator`

***

### Put()

```ts
const Put: (path) => MethodDecorator;
```

Defined in: [packages/core/src/core/decorators/http/handlers.decorator.ts:56](https://github.com/theunionsquare/mangojs/blob/e9b931cfa8d37ff10d485490a7c7959b19e4bfb1/packages/core/src/core/decorators/http/handlers.decorator.ts#L56)

#### Parameters

##### path

`string`

#### Returns

`MethodDecorator`

***

### Use()

```ts
const Use: (handler) => MethodDecorator;
```

Defined in: [packages/core/src/core/decorators/http/handlers.decorator.ts:82](https://github.com/theunionsquare/mangojs/blob/e9b931cfa8d37ff10d485490a7c7959b19e4bfb1/packages/core/src/core/decorators/http/handlers.decorator.ts#L82)

#### Parameters

##### handler

`Function`

#### Returns

`MethodDecorator`

## Functions

### Controller()

```ts
function Controller(basePath): ClassDecorator;
```

Defined in: [packages/core/src/core/decorators/http/controller.decorator.ts:8](https://github.com/theunionsquare/mangojs/blob/e9b931cfa8d37ff10d485490a7c7959b19e4bfb1/packages/core/src/core/decorators/http/controller.decorator.ts#L8)

Define the base API address

#### Parameters

##### basePath

`string`

string

#### Returns

`ClassDecorator`

***

### Middleware()

```ts
function Middleware(middleware): MethodDecorator;
```

Defined in: [packages/core/src/core/decorators/http/middleware.decorator.ts:11](https://github.com/theunionsquare/mangojs/blob/e9b931cfa8d37ff10d485490a7c7959b19e4bfb1/packages/core/src/core/decorators/http/middleware.decorator.ts#L11)

Generic Middleware decoratoor

#### Parameters

##### middleware

`RequestHandler`

function in the form (req: Request, res: Response, next: NextFunction) =\> \{
       next();
   \})

#### Returns

`MethodDecorator`

***

### QueueWorker()

```ts
function QueueWorker(queueName, options?): <T>(target) => T;
```

Defined in: [packages/core/src/core/decorators/queue/queueWorker.decorator.ts:24](https://github.com/theunionsquare/mangojs/blob/e9b931cfa8d37ff10d485490a7c7959b19e4bfb1/packages/core/src/core/decorators/queue/queueWorker.decorator.ts#L24)

#### Parameters

##### queueName

`string`

Name of the queue to consume from

##### options?

[`WorkerOptions`](MangoJS/namespaces/Queue/index.md#workeroptions) = `{}`

Worker configuration options

#### Returns

```ts
<T>(target): T;
```

##### Type Parameters

###### T

`T` *extends* (...`args`) => `unknown`

##### Parameters

###### target

`T`

##### Returns

`T`

#### Queue Worker

decorator
Marks a class as a queue worker handler.

#### Example

```typescript
@QueueWorker('email-queue', { concurrency: 5 })
export class EmailWorker implements IQueueWorkerHandler {
  async process(job: Job<EmailPayload>): Promise<void> {
    await sendEmail(job.data)
  }
}
```

***

### Schedule()

```ts
function Schedule(cron, options?): ClassDecorator;
```

Defined in: [packages/core/src/core/decorators/scheduler/schedule.decorator.ts:32](https://github.com/theunionsquare/mangojs/blob/e9b931cfa8d37ff10d485490a7c7959b19e4bfb1/packages/core/src/core/decorators/scheduler/schedule.decorator.ts#L32)

Decorator to mark a class as a scheduled task.

#### Parameters

##### cron

`string`

Cron expression (e.g., '0 * * * *' for every hour)

##### options?

[`ScheduleOptions`](MangoJS/namespaces/Scheduler/index.md#scheduleoptions)

Optional configuration for the scheduled task

#### Returns

`ClassDecorator`

#### Examples

```typescript
@Schedule('0 * * * *') // Every hour
@injectable()
export class HourlyTask extends ScheduledTask {
  async run(): Promise<void> {
    // Task logic
  }
}
```

```typescript
@Schedule('0 0 * * *', { timezone: 'UTC', runOnStart: true })
@injectable()
export class DailyTask extends ScheduledTask {
  async run(): Promise<void> {
    // Task logic
  }
}
```

## References

### ~~IPersistenceContext~~

Re-exports [IPersistenceContext](MangoJS/namespaces/Persistence/index.md#ipersistencecontext)
