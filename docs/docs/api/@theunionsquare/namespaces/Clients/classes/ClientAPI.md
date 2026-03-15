---
sidebar_label: ClientAPI
---

# ~~Class: ClientAPI~~

Defined in: [src/core/clients/clientAPI.ts:14](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/clients/clientAPI.ts#L14)

HTTP client wrapper with retry logic and error handling.

## Deprecated

This class will be removed in a future version.
Use axios directly or create your own HTTP client implementation.

## Constructors

### Constructor

```ts
new ClientAPI(baseURL): ClientAPI;
```

Defined in: [src/core/clients/clientAPI.ts:20](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/clients/clientAPI.ts#L20)

#### Parameters

##### baseURL

`string`

#### Returns

`ClientAPI`

## Methods

### ~~delete()~~

```ts
delete<R>(url, config?): Promise<R>;
```

Defined in: [src/core/clients/clientAPI.ts:107](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/clients/clientAPI.ts#L107)

Make a DELETE request

#### Type Parameters

##### R

`R` = `any`

#### Parameters

##### url

`string`

##### config?

`AxiosRequestConfig`

#### Returns

`Promise`\<`R`\>

***

### ~~get()~~

```ts
get<R>(url, config?): Promise<R>;
```

Defined in: [src/core/clients/clientAPI.ts:59](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/clients/clientAPI.ts#L59)

Make a GET request

#### Type Parameters

##### R

`R` = `any`

#### Parameters

##### url

`string`

##### config?

`AxiosRequestConfig`

#### Returns

`Promise`\<`R`\>

***

### ~~post()~~

```ts
post<B, R>(
   url, 
   body, 
config?): Promise<R>;
```

Defined in: [src/core/clients/clientAPI.ts:75](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/clients/clientAPI.ts#L75)

Make a POST request

#### Type Parameters

##### B

`B` = `any`

##### R

`R` = `any`

#### Parameters

##### url

`string`

##### body

`B`

##### config?

`AxiosRequestConfig`

#### Returns

`Promise`\<`R`\>

***

### ~~put()~~

```ts
put<B, R>(
   url, 
   body, 
config?): Promise<R>;
```

Defined in: [src/core/clients/clientAPI.ts:91](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/clients/clientAPI.ts#L91)

Make a PUT request

#### Type Parameters

##### B

`B` = `any`

##### R

`R` = `any`

#### Parameters

##### url

`string`

##### body

`B`

##### config?

`AxiosRequestConfig`

#### Returns

`Promise`\<`R`\>
