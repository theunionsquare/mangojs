# Class: MongoosePersistenceContext

Defined in: [src/core/persistence/PersistenceContext.mongoose.ts:14](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/persistence/PersistenceContext.mongoose.ts#L14)

Mongoose persistence context for transaction management.

Works with MongooseDBManagerFactory to execute operations
within a Mongoose connection context.

## Implements

- [`IPersistenceContext`](../../../../interfaces/IPersistenceContext.md)

## Constructors

### Constructor

```ts
new MongoosePersistenceContext(entityManager): MongoosePersistenceContext;
```

Defined in: [src/core/persistence/PersistenceContext.mongoose.ts:17](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/persistence/PersistenceContext.mongoose.ts#L17)

#### Parameters

##### entityManager

[`IDatabaseManagerFactory`](../../DatabaseManager/interfaces/IDatabaseManagerFactory.md)

#### Returns

`MongoosePersistenceContext`

## Methods

### inTransaction()

```ts
inTransaction(context): Promise<{
}>;
```

Defined in: [src/core/persistence/PersistenceContext.mongoose.ts:30](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/persistence/PersistenceContext.mongoose.ts#L30)

#### Parameters

##### context

[`Context`](../type-aliases/Context.md)\<`Connection`\>

#### Returns

`Promise`\<\{
\}\>

#### Implementation of

[`IPersistenceContext`](../../../../interfaces/IPersistenceContext.md).[`inTransaction`](../../../../interfaces/IPersistenceContext.md#intransaction)
