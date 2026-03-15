[**MangoJS**](../../../../README.md)

***

# Interface: IApplicationPreCheck

Defined in: src/core/applications/types.ts:6

Interface for application pre-flight checks.
Implementations should verify that all required services (database, etc.) are available
before the application starts accepting requests.

## Methods

### startCheck()

```ts
startCheck(): Promise<void>;
```

Defined in: src/core/applications/types.ts:11

Runs all pre-flight checks.
Should throw an error if any check fails.

#### Returns

`Promise`\<`void`\>
