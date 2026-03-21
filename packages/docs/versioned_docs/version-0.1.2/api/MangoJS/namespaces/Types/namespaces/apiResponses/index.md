---
sidebar_label: apiResponses
---

# ~~apiResponses~~

## Deprecated

Use `api` instead.

## Interfaces

### ~~Base~~

Defined in: [packages/core/src/core/types/apiResponses.ts:4](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/types/apiResponses.ts#L4)

#### Deprecated

Use types from './api' instead.

#### Extended by

- [`Error`](#error)
- [`Success`](#success)

#### Properties

##### ~~ok~~

```ts
ok: boolean;
```

Defined in: [packages/core/src/core/types/apiResponses.ts:5](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/types/apiResponses.ts#L5)

##### ~~requestId~~

```ts
requestId: string;
```

Defined in: [packages/core/src/core/types/apiResponses.ts:7](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/types/apiResponses.ts#L7)

##### ~~timestamp~~

```ts
timestamp: string;
```

Defined in: [packages/core/src/core/types/apiResponses.ts:6](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/types/apiResponses.ts#L6)

***

### ~~Error~~

Defined in: [packages/core/src/core/types/apiResponses.ts:13](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/types/apiResponses.ts#L13)

#### Deprecated

Use types from './api' instead.

#### Extends

- [`Base`](#base)

#### Properties

##### ~~errorCode?~~

```ts
optional errorCode: string;
```

Defined in: [packages/core/src/core/types/apiResponses.ts:15](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/types/apiResponses.ts#L15)

##### ~~errorMessage?~~

```ts
optional errorMessage: string;
```

Defined in: [packages/core/src/core/types/apiResponses.ts:14](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/types/apiResponses.ts#L14)

##### ~~ok~~

```ts
ok: boolean;
```

Defined in: [packages/core/src/core/types/apiResponses.ts:5](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/types/apiResponses.ts#L5)

###### Inherited from

[`Base`](#base).[`ok`](#ok)

##### ~~requestId~~

```ts
requestId: string;
```

Defined in: [packages/core/src/core/types/apiResponses.ts:7](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/types/apiResponses.ts#L7)

###### Inherited from

[`Base`](#base).[`requestId`](#requestid)

##### ~~timestamp~~

```ts
timestamp: string;
```

Defined in: [packages/core/src/core/types/apiResponses.ts:6](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/types/apiResponses.ts#L6)

###### Inherited from

[`Base`](#base).[`timestamp`](#timestamp)

***

### ~~Success~~

Defined in: [packages/core/src/core/types/apiResponses.ts:21](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/types/apiResponses.ts#L21)

#### Deprecated

Use types from './api' instead.

#### Extends

- [`Base`](#base)

#### Type Parameters

##### D

`D`

#### Properties

##### ~~data~~

```ts
data: D;
```

Defined in: [packages/core/src/core/types/apiResponses.ts:22](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/types/apiResponses.ts#L22)

##### ~~ok~~

```ts
ok: boolean;
```

Defined in: [packages/core/src/core/types/apiResponses.ts:5](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/types/apiResponses.ts#L5)

###### Inherited from

[`Base`](#base).[`ok`](#ok)

##### ~~requestId~~

```ts
requestId: string;
```

Defined in: [packages/core/src/core/types/apiResponses.ts:7](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/types/apiResponses.ts#L7)

###### Inherited from

[`Base`](#base).[`requestId`](#requestid)

##### ~~timestamp~~

```ts
timestamp: string;
```

Defined in: [packages/core/src/core/types/apiResponses.ts:6](https://github.com/theunionsquare/mangojs/blob/ef3e2bef0e05c8703bc4a982cb3ed0b973c5c8a4/packages/core/src/core/types/apiResponses.ts#L6)

###### Inherited from

[`Base`](#base).[`timestamp`](#timestamp)
