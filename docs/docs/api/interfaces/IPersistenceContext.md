---
sidebar_label: IPersistenceContext
---

# Interface: IPersistenceContext

Defined in: [src/core/persistence/types.ts:28](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/persistence/types.ts#L28)

Interface for persistence context implementations.
Provides transaction management for database operations.

## Example

```ts
class MyPersistenceContext implements IPersistenceContext {
  async inTransaction(context) {
    const connection = await this.dbManager.getConnection();
    return context(connection);
  }
}
```

## Methods

### inTransaction()

```ts
inTransaction(process): Promise<unknown>;
```

Defined in: [src/core/persistence/types.ts:34](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/persistence/types.ts#L34)

Executes operations within a transaction context.

#### Parameters

##### process

[`Context`](../@theunionsquare/namespaces/Persistence/type-aliases/Context.md)\<`unknown`\>

Function receiving the connection/entity manager

#### Returns

`Promise`\<`unknown`\>

Result of the transaction
