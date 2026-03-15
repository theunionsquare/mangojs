# Interface: IApplicationPreCheck

Defined in: [src/core/applications/types.ts:6](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/applications/types.ts#L6)

Interface for application pre-flight checks.
Implementations should verify that all required services (database, etc.) are available
before the application starts accepting requests.

## Methods

### startCheck()

```ts
startCheck(): Promise<void>;
```

Defined in: [src/core/applications/types.ts:11](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/applications/types.ts#L11)

Runs all pre-flight checks.
Should throw an error if any check fails.

#### Returns

`Promise`\<`void`\>
