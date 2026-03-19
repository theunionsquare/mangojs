---
sidebar_label: Applications
---

# Applications

Application bootstrapping and lifecycle management

## Classes

### ApplicationExpress

Defined in: [packages/core/src/core/applications/ApplicationExpress.ts:15](https://github.com/theunionsquare/mangojs/blob/e9b931cfa8d37ff10d485490a7c7959b19e4bfb1/packages/core/src/core/applications/ApplicationExpress.ts#L15)

**`Internal`**

Internal Express application wrapper that handles route registration
from decorated controller classes.

 This class is used internally by ServerBuilder and should not
be instantiated directly.

#### Constructors

##### Constructor

```ts
new ApplicationExpress(routes): ApplicationExpress;
```

Defined in: [packages/core/src/core/applications/ApplicationExpress.ts:32](https://github.com/theunionsquare/mangojs/blob/e9b931cfa8d37ff10d485490a7c7959b19e4bfb1/packages/core/src/core/applications/ApplicationExpress.ts#L32)

Creates a new ApplicationExpress instance.

###### Parameters

###### routes

`unknown`[]

Array of controller classes decorated with

###### Returns

[`ApplicationExpress`](#applicationexpress)

###### Controller

#### Accessors

##### instance

###### Get Signature

```ts
get instance(): Application;
```

Defined in: [packages/core/src/core/applications/ApplicationExpress.ts:24](https://github.com/theunionsquare/mangojs/blob/e9b931cfa8d37ff10d485490a7c7959b19e4bfb1/packages/core/src/core/applications/ApplicationExpress.ts#L24)

Returns the underlying Express application instance.

###### Returns

`Application`

#### Methods

##### registerRouters()

```ts
registerRouters(): void;
```

Defined in: [packages/core/src/core/applications/ApplicationExpress.ts:52](https://github.com/theunionsquare/mangojs/blob/e9b931cfa8d37ff10d485490a7c7959b19e4bfb1/packages/core/src/core/applications/ApplicationExpress.ts#L52)

Registers all routes from the controller classes.
Reads metadata from decorators and creates Express routes accordingly.
Prints a table of registered routes to the console.

###### Returns

`void`

***

### ApplicationPreCheck

Defined in: [packages/core/src/core/applications/ApplicationPreCheck.ts:18](https://github.com/theunionsquare/mangojs/blob/e9b931cfa8d37ff10d485490a7c7959b19e4bfb1/packages/core/src/core/applications/ApplicationPreCheck.ts#L18)

Default implementation of application pre-flight checks.
Verifies database connectivity before the application starts.

#### Example

```typescript
const preCheck = container.get<IApplicationPreCheck>(INVERSITY_TYPES.ApplicationPreCheck);
await preCheck.startCheck();
```

#### Implements

- [`IApplicationPreCheck`](#iapplicationprecheck)

#### Constructors

##### Constructor

```ts
new ApplicationPreCheck(entityManager, loggerFactory): ApplicationPreCheck;
```

Defined in: [packages/core/src/core/applications/ApplicationPreCheck.ts:22](https://github.com/theunionsquare/mangojs/blob/e9b931cfa8d37ff10d485490a7c7959b19e4bfb1/packages/core/src/core/applications/ApplicationPreCheck.ts#L22)

###### Parameters

###### entityManager

[`IDatabaseManagerFactory`](../DatabaseManager/index.md#idatabasemanagerfactory)

###### loggerFactory

[`ILoggerFactory`](../Loggers/index.md#iloggerfactory)

###### Returns

[`ApplicationPreCheck`](#applicationprecheck)

#### Methods

##### startCheck()

```ts
startCheck(): Promise<void>;
```

Defined in: [packages/core/src/core/applications/ApplicationPreCheck.ts:36](https://github.com/theunionsquare/mangojs/blob/e9b931cfa8d37ff10d485490a7c7959b19e4bfb1/packages/core/src/core/applications/ApplicationPreCheck.ts#L36)

Runs all pre-flight checks including database connectivity.
Logs the status of each check.

###### Returns

`Promise`\<`void`\>

###### Implementation of

[`IApplicationPreCheck`](#iapplicationprecheck).[`startCheck`](#startcheck-1)

## Interfaces

### IApplicationPreCheck

Defined in: [packages/core/src/core/applications/types.ts:6](https://github.com/theunionsquare/mangojs/blob/e9b931cfa8d37ff10d485490a7c7959b19e4bfb1/packages/core/src/core/applications/types.ts#L6)

Interface for application pre-flight checks.
Implementations should verify that all required services (database, etc.) are available
before the application starts accepting requests.

#### Methods

##### startCheck()

```ts
startCheck(): Promise<void>;
```

Defined in: [packages/core/src/core/applications/types.ts:11](https://github.com/theunionsquare/mangojs/blob/e9b931cfa8d37ff10d485490a7c7959b19e4bfb1/packages/core/src/core/applications/types.ts#L11)

Runs all pre-flight checks.
Should throw an error if any check fails.

###### Returns

`Promise`\<`void`\>
