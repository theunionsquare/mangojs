---
sidebar_label: Clients
---

# ~~Clients~~

## Deprecated

This module will be removed in a future version.
Use axios directly or create your own HTTP client implementation.

## Classes

### ~~ClientAPI~~

Defined in: packages/core/src/core/clients/clientAPI.ts:14

HTTP client wrapper with retry logic and error handling.

#### Deprecated

This class will be removed in a future version.
Use axios directly or create your own HTTP client implementation.

#### Constructors

##### Constructor

```ts
new ClientAPI(baseURL): ClientAPI;
```

Defined in: packages/core/src/core/clients/clientAPI.ts:20

###### Parameters

###### baseURL

`string`

###### Returns

[`ClientAPI`](#clientapi)

#### Methods

##### ~~delete()~~

```ts
delete<R>(url, config?): Promise<R>;
```

Defined in: packages/core/src/core/clients/clientAPI.ts:107

Make a DELETE request

###### Type Parameters

###### R

`R` = `any`

###### Parameters

###### url

`string`

###### config?

`AxiosRequestConfig`

###### Returns

`Promise`\<`R`\>

##### ~~get()~~

```ts
get<R>(url, config?): Promise<R>;
```

Defined in: packages/core/src/core/clients/clientAPI.ts:59

Make a GET request

###### Type Parameters

###### R

`R` = `any`

###### Parameters

###### url

`string`

###### config?

`AxiosRequestConfig`

###### Returns

`Promise`\<`R`\>

##### ~~post()~~

```ts
post<B, R>(
   url, 
   body, 
config?): Promise<R>;
```

Defined in: packages/core/src/core/clients/clientAPI.ts:75

Make a POST request

###### Type Parameters

###### B

`B` = `any`

###### R

`R` = `any`

###### Parameters

###### url

`string`

###### body

`B`

###### config?

`AxiosRequestConfig`

###### Returns

`Promise`\<`R`\>

##### ~~put()~~

```ts
put<B, R>(
   url, 
   body, 
config?): Promise<R>;
```

Defined in: packages/core/src/core/clients/clientAPI.ts:91

Make a PUT request

###### Type Parameters

###### B

`B` = `any`

###### R

`R` = `any`

###### Parameters

###### url

`string`

###### body

`B`

###### config?

`AxiosRequestConfig`

###### Returns

`Promise`\<`R`\>
