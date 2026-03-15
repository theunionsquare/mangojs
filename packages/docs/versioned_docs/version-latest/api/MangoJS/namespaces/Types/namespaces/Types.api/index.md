---
sidebar_label: Types.api
---

# Types.api

## Description

API request and response type definitions for MangoJS applications.

## Interfaces

### BaseResponse

Defined in: packages/core/src/core/types/api/index.ts:16

Base fields included in all API responses.

#### Extended by

- [`SuccessResponse`](#successresponse)
- [`ErrorResponse`](#errorresponse)
- [`PaginatedResponse`](#paginatedresponse)

#### Properties

##### ok

```ts
ok: boolean;
```

Defined in: packages/core/src/core/types/api/index.ts:17

##### requestId

```ts
requestId: string;
```

Defined in: packages/core/src/core/types/api/index.ts:19

##### timestamp

```ts
timestamp: string;
```

Defined in: packages/core/src/core/types/api/index.ts:18

***

### ErrorResponse

Defined in: packages/core/src/core/types/api/index.ts:33

Error API response.

#### Extends

- [`BaseResponse`](#baseresponse)

#### Properties

##### error

```ts
error: object;
```

Defined in: packages/core/src/core/types/api/index.ts:35

###### code?

```ts
optional code: string;
```

###### message

```ts
message: string;
```

##### ok

```ts
ok: false;
```

Defined in: packages/core/src/core/types/api/index.ts:34

###### Overrides

[`BaseResponse`](#baseresponse).[`ok`](#ok)

##### requestId

```ts
requestId: string;
```

Defined in: packages/core/src/core/types/api/index.ts:19

###### Inherited from

[`BaseResponse`](#baseresponse).[`requestId`](#requestid)

##### timestamp

```ts
timestamp: string;
```

Defined in: packages/core/src/core/types/api/index.ts:18

###### Inherited from

[`BaseResponse`](#baseresponse).[`timestamp`](#timestamp)

***

### PaginatedData

Defined in: packages/core/src/core/types/api/index.ts:63

Paginated data container.

#### Type Parameters

##### T

`T`

#### Properties

##### items

```ts
items: T[];
```

Defined in: packages/core/src/core/types/api/index.ts:64

##### pagination

```ts
pagination: Pagination;
```

Defined in: packages/core/src/core/types/api/index.ts:65

***

### PaginatedResponse

Defined in: packages/core/src/core/types/api/index.ts:71

Paginated API response.

#### Extends

- [`BaseResponse`](#baseresponse)

#### Type Parameters

##### T

`T`

#### Properties

##### data

```ts
data: PaginatedData<T>;
```

Defined in: packages/core/src/core/types/api/index.ts:73

##### ok

```ts
ok: true;
```

Defined in: packages/core/src/core/types/api/index.ts:72

###### Overrides

[`BaseResponse`](#baseresponse).[`ok`](#ok)

##### requestId

```ts
requestId: string;
```

Defined in: packages/core/src/core/types/api/index.ts:19

###### Inherited from

[`BaseResponse`](#baseresponse).[`requestId`](#requestid)

##### timestamp

```ts
timestamp: string;
```

Defined in: packages/core/src/core/types/api/index.ts:18

###### Inherited from

[`BaseResponse`](#baseresponse).[`timestamp`](#timestamp)

***

### Pagination

Defined in: packages/core/src/core/types/api/index.ts:53

Pagination metadata for list responses.

#### Properties

##### currentPage

```ts
currentPage: number;
```

Defined in: packages/core/src/core/types/api/index.ts:56

##### pageSize

```ts
pageSize: number;
```

Defined in: packages/core/src/core/types/api/index.ts:57

##### totalItems

```ts
totalItems: number;
```

Defined in: packages/core/src/core/types/api/index.ts:54

##### totalPages

```ts
totalPages: number;
```

Defined in: packages/core/src/core/types/api/index.ts:55

***

### SuccessResponse

Defined in: packages/core/src/core/types/api/index.ts:25

Successful API response with typed data.

#### Extends

- [`BaseResponse`](#baseresponse)

#### Type Parameters

##### T

`T` = `unknown`

#### Properties

##### data

```ts
data: T;
```

Defined in: packages/core/src/core/types/api/index.ts:27

##### ok

```ts
ok: true;
```

Defined in: packages/core/src/core/types/api/index.ts:26

###### Overrides

[`BaseResponse`](#baseresponse).[`ok`](#ok)

##### requestId

```ts
requestId: string;
```

Defined in: packages/core/src/core/types/api/index.ts:19

###### Inherited from

[`BaseResponse`](#baseresponse).[`requestId`](#requestid)

##### timestamp

```ts
timestamp: string;
```

Defined in: packages/core/src/core/types/api/index.ts:18

###### Inherited from

[`BaseResponse`](#baseresponse).[`timestamp`](#timestamp)

## Type Aliases

### ApiResponse

```ts
type ApiResponse<T> = 
  | SuccessResponse<T>
  | ErrorResponse;
```

Defined in: packages/core/src/core/types/api/index.ts:44

API response - either success or error.

#### Type Parameters

##### T

`T` = `unknown`

## References

### Request

Re-exports [Request](../../../../../index.md#request)

***

### Response

Re-exports [Response](../../../../../index.md#response)
