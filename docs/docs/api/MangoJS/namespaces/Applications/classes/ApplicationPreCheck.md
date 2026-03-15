[**MangoJS**](../../../../README.md)

***

# Class: ApplicationPreCheck

Defined in: [src/core/applications/ApplicationPreCheck.ts:18](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/applications/ApplicationPreCheck.ts#L18)

Default implementation of application pre-flight checks.
Verifies database connectivity before the application starts.

## Example

```typescript
const preCheck = container.get<IApplicationPreCheck>(INVERSITY_TYPES.ApplicationPreCheck);
await preCheck.startCheck();
```

## Implements

- [`IApplicationPreCheck`](../interfaces/IApplicationPreCheck.md)

## Constructors

### Constructor

```ts
new ApplicationPreCheck(entityManager, loggerFactory): ApplicationPreCheck;
```

Defined in: [src/core/applications/ApplicationPreCheck.ts:22](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/applications/ApplicationPreCheck.ts#L22)

#### Parameters

##### entityManager

[`IDatabaseManagerFactory`](../../DatabaseManager/interfaces/IDatabaseManagerFactory.md)

##### loggerFactory

[`ILoggerFactory`](../../Loggers/interfaces/ILoggerFactory.md)

#### Returns

`ApplicationPreCheck`

## Methods

### startCheck()

```ts
startCheck(): Promise<void>;
```

Defined in: [src/core/applications/ApplicationPreCheck.ts:36](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/applications/ApplicationPreCheck.ts#L36)

Runs all pre-flight checks including database connectivity.
Logs the status of each check.

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`IApplicationPreCheck`](../interfaces/IApplicationPreCheck.md).[`startCheck`](../interfaces/IApplicationPreCheck.md#startcheck)
