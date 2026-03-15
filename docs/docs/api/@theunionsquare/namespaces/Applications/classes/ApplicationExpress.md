---
sidebar_label: ApplicationExpress
---

# Class: ApplicationExpress

Defined in: [src/core/applications/ApplicationExpress.ts:15](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/applications/ApplicationExpress.ts#L15)

**`Internal`**

Internal Express application wrapper that handles route registration
from decorated controller classes.

 This class is used internally by ServerBuilder and should not
be instantiated directly.

## Constructors

### Constructor

```ts
new ApplicationExpress(routes): ApplicationExpress;
```

Defined in: [src/core/applications/ApplicationExpress.ts:32](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/applications/ApplicationExpress.ts#L32)

Creates a new ApplicationExpress instance.

#### Parameters

##### routes

`unknown`[]

Array of controller classes decorated with

#### Returns

`ApplicationExpress`

#### Controller

## Accessors

### instance

#### Get Signature

```ts
get instance(): Application;
```

Defined in: [src/core/applications/ApplicationExpress.ts:24](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/applications/ApplicationExpress.ts#L24)

Returns the underlying Express application instance.

##### Returns

`Application`

## Methods

### registerRouters()

```ts
registerRouters(): void;
```

Defined in: [src/core/applications/ApplicationExpress.ts:52](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/applications/ApplicationExpress.ts#L52)

Registers all routes from the controller classes.
Reads metadata from decorators and creates Express routes accordingly.
Prints a table of registered routes to the console.

#### Returns

`void`
