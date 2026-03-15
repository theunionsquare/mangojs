[**MangoJS**](../README.md)

***

# Interface: IPersistenceContext

Defined in: src/core/persistence/types.ts:28

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

Defined in: src/core/persistence/types.ts:34

Executes operations within a transaction context.

#### Parameters

##### process

[`Context`](../MangoJS/namespaces/Persistence/type-aliases/Context.md)\<`unknown`\>

Function receiving the connection/entity manager

#### Returns

`Promise`\<`unknown`\>

Result of the transaction
