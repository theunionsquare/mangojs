[**MangoJS**](../../../README.md)

***

# Persistence

## Description

Transaction management for database operations.

PersistenceContext implementations work with their corresponding
DatabaseManager factories to provide transaction support.

| PersistenceContext | DatabaseManager |
|--------------------|-----------------|
| PostgresPersistenceContext | PostgresDBManagerFactory |
| MongoosePersistenceContext | MongooseDBManagerFactory |
| CockroachPersistenceContext | CockRoachDBManagerFactory |
| DummyPersistenceContext | DummyDBManagerFactory |

## Example

```ts
// Bind in container
container.bind<IPersistenceContext>(TYPES.PersistenceContext)
  .to(PostgresPersistenceContext);

// Use in service
const result = await persistenceContext.inTransaction(async (em) => {
  return em.getRepository(User).find();
});
```

## Classes

- [CockroachPersistenceContext](classes/CockroachPersistenceContext.md)
- [DummyPersistenceContext](classes/DummyPersistenceContext.md)
- [MongoosePersistenceContext](classes/MongoosePersistenceContext.md)
- [PostgresPersistenceContext](classes/PostgresPersistenceContext.md)

## Type Aliases

- [Context](type-aliases/Context.md)

## References

### IPersistenceContext

Re-exports [IPersistenceContext](../../../interfaces/IPersistenceContext.md)

***

### ~~PersistenceContext2~~

Re-exports [PersistenceContext2](../../../classes/PersistenceContext2.md)
