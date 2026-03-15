[**MangoJS**](../../../../../../README.md)

***

# Interface: SuccessResponse\<T\>

Defined in: src/core/types/api/index.ts:25

Successful API response with typed data.

## Extends

- [`BaseResponse`](BaseResponse.md)

## Type Parameters

### T

`T` = `unknown`

## Properties

### data

```ts
data: T;
```

Defined in: src/core/types/api/index.ts:27

***

### ok

```ts
ok: true;
```

Defined in: src/core/types/api/index.ts:26

#### Overrides

[`BaseResponse`](BaseResponse.md).[`ok`](BaseResponse.md#ok)

***

### requestId

```ts
requestId: string;
```

Defined in: src/core/types/api/index.ts:19

#### Inherited from

[`BaseResponse`](BaseResponse.md).[`requestId`](BaseResponse.md#requestid)

***

### timestamp

```ts
timestamp: string;
```

Defined in: src/core/types/api/index.ts:18

#### Inherited from

[`BaseResponse`](BaseResponse.md).[`timestamp`](BaseResponse.md#timestamp)
