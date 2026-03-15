---
sidebar_label: IApplicationPreCheck
---

# Interface: IApplicationPreCheck

Defined in: [src/core/applications/types.ts:6](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/applications/types.ts#L6)

Interface for application pre-flight checks.
Implementations should verify that all required services (database, etc.) are available
before the application starts accepting requests.

## Methods

### startCheck()

```ts
startCheck(): Promise<void>;
```

Defined in: [src/core/applications/types.ts:11](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/applications/types.ts#L11)

Runs all pre-flight checks.
Should throw an error if any check fails.

#### Returns

`Promise`\<`void`\>
