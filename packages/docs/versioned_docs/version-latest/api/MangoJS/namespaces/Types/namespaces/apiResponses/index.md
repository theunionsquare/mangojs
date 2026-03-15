---
sidebar_label: apiResponses
---

# ~~apiResponses~~

## Deprecated

Use `api` instead.

## Interfaces

### ~~Base~~

Defined in: packages/core/src/core/types/apiResponses.ts:4

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

Defined in: packages/core/src/core/types/apiResponses.ts:5

##### ~~requestId~~

```ts
requestId: string;
```

Defined in: packages/core/src/core/types/apiResponses.ts:7

##### ~~timestamp~~

```ts
timestamp: string;
```

Defined in: packages/core/src/core/types/apiResponses.ts:6

***

### ~~Error~~

Defined in: packages/core/src/core/types/apiResponses.ts:13

#### Deprecated

Use types from './api' instead.

#### Extends

- [`Base`](#base)

#### Properties

##### ~~errorCode?~~

```ts
optional errorCode: string;
```

Defined in: packages/core/src/core/types/apiResponses.ts:15

##### ~~errorMessage?~~

```ts
optional errorMessage: string;
```

Defined in: packages/core/src/core/types/apiResponses.ts:14

##### ~~ok~~

```ts
ok: boolean;
```

Defined in: packages/core/src/core/types/apiResponses.ts:5

###### Inherited from

[`Base`](#base).[`ok`](#ok)

##### ~~requestId~~

```ts
requestId: string;
```

Defined in: packages/core/src/core/types/apiResponses.ts:7

###### Inherited from

[`Base`](#base).[`requestId`](#requestid)

##### ~~timestamp~~

```ts
timestamp: string;
```

Defined in: packages/core/src/core/types/apiResponses.ts:6

###### Inherited from

[`Base`](#base).[`timestamp`](#timestamp)

***

### ~~Success~~

Defined in: packages/core/src/core/types/apiResponses.ts:21

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

Defined in: packages/core/src/core/types/apiResponses.ts:22

##### ~~ok~~

```ts
ok: boolean;
```

Defined in: packages/core/src/core/types/apiResponses.ts:5

###### Inherited from

[`Base`](#base).[`ok`](#ok)

##### ~~requestId~~

```ts
requestId: string;
```

Defined in: packages/core/src/core/types/apiResponses.ts:7

###### Inherited from

[`Base`](#base).[`requestId`](#requestid)

##### ~~timestamp~~

```ts
timestamp: string;
```

Defined in: packages/core/src/core/types/apiResponses.ts:6

###### Inherited from

[`Base`](#base).[`timestamp`](#timestamp)
