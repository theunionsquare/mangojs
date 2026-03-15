---
sidebar_label: DatabaseManager
---

# DatabaseManager

## Description

Database connection management factories for different database types.

## Classes

### CockRoachDBManagerFactory

Defined in: [src/core/databasemanager/cockroachdb/CockroachDBManagerFactory.ts:36](https://github.com/theunionsquare/mangojs/blob/01e44709afb7c4e9e23a1365c81ac6e0d3e87cd1/src/core/databasemanager/cockroachdb/CockroachDBManagerFactory.ts#L36)

CockroachDB database manager factory using TypeORM.

Supports both URL-based and connection object configuration.

#### Example

```typescript
// URL-based connection
const factory = new CockRoachDBManagerFactory(
  { url: 'postgresql://user:pass@host:26257/db?sslmode=verify-full' },
  [UserEntity, OrderEntity]
);

// Connection object
const factory = new CockRoachDBManagerFactory(
  { host: 'localhost', port: 26257, username: 'root', database: 'mydb' },
  [UserEntity]
);
```

#### Implements

- [`IDatabaseManagerFactory`](#idatabasemanagerfactory)

#### Constructors

##### Constructor

```ts
new CockRoachDBManagerFactory(
   connection, 
   entities?, 
   synchronize?, 
   logging?): CockRoachDBManagerFactory;
```

Defined in: [src/core/databasemanager/cockroachdb/CockroachDBManagerFactory.ts:46](https://github.com/theunionsquare/mangojs/blob/01e44709afb7c4e9e23a1365c81ac6e0d3e87cd1/src/core/databasemanager/cockroachdb/CockroachDBManagerFactory.ts#L46)

###### Parameters

###### connection

`CockroachUrl` | `CockroachConnection`

###### entities?

`any`[] = `[]`

###### synchronize?

`boolean` = `true`

###### logging?

`boolean` = `false`

###### Returns

[`CockRoachDBManagerFactory`](#cockroachdbmanagerfactory)

#### Methods

##### dbConnection()

```ts
dbConnection(): void;
```

Defined in: [src/core/databasemanager/cockroachdb/CockroachDBManagerFactory.ts:59](https://github.com/theunionsquare/mangojs/blob/01e44709afb7c4e9e23a1365c81ac6e0d3e87cd1/src/core/databasemanager/cockroachdb/CockroachDBManagerFactory.ts#L59)

Initialize the database connection.

###### Returns

`void`

###### Implementation of

[`IDatabaseManagerFactory`](#idatabasemanagerfactory).[`dbConnection`](#dbconnection-6)

##### getConnection()

```ts
getConnection(): Promise<{
}>;
```

Defined in: [src/core/databasemanager/cockroachdb/CockroachDBManagerFactory.ts:61](https://github.com/theunionsquare/mangojs/blob/01e44709afb7c4e9e23a1365c81ac6e0d3e87cd1/src/core/databasemanager/cockroachdb/CockroachDBManagerFactory.ts#L61)

Get or create a database connection.

###### Returns

`Promise`\<\{
\}\>

The database connection/manager instance

###### Implementation of

[`IDatabaseManagerFactory`](#idatabasemanagerfactory).[`getConnection`](#getconnection-6)

##### getStatus()

```ts
getStatus(): Promise<boolean>;
```

Defined in: [src/core/databasemanager/cockroachdb/CockroachDBManagerFactory.ts:109](https://github.com/theunionsquare/mangojs/blob/01e44709afb7c4e9e23a1365c81ac6e0d3e87cd1/src/core/databasemanager/cockroachdb/CockroachDBManagerFactory.ts#L109)

Get the current connection status.

###### Returns

`Promise`\<`boolean`\>

Connection status

###### Implementation of

[`IDatabaseManagerFactory`](#idatabasemanagerfactory).[`getStatus`](#getstatus-6)

***

### ~~DummyDBManagerFactory~~

Defined in: [src/core/databasemanager/DummyDBManagerFactory.ts:11](https://github.com/theunionsquare/mangojs/blob/01e44709afb7c4e9e23a1365c81ac6e0d3e87cd1/src/core/databasemanager/DummyDBManagerFactory.ts#L11)

Dummy database manager factory for testing purposes.

#### Deprecated

This class will be removed in a future version.
Use PostgresDBManagerFactory or CockRoachDBManagerFactory instead.

#### Implements

- [`IDatabaseManagerFactory`](#idatabasemanagerfactory)

#### Constructors

##### Constructor

```ts
new DummyDBManagerFactory(connection): DummyDBManagerFactory;
```

Defined in: [src/core/databasemanager/DummyDBManagerFactory.ts:14](https://github.com/theunionsquare/mangojs/blob/01e44709afb7c4e9e23a1365c81ac6e0d3e87cd1/src/core/databasemanager/DummyDBManagerFactory.ts#L14)

###### Parameters

###### connection

`string`

###### Returns

[`DummyDBManagerFactory`](#dummydbmanagerfactory)

#### Methods

##### ~~dbConnection()~~

```ts
dbConnection(): void;
```

Defined in: [src/core/databasemanager/DummyDBManagerFactory.ts:20](https://github.com/theunionsquare/mangojs/blob/01e44709afb7c4e9e23a1365c81ac6e0d3e87cd1/src/core/databasemanager/DummyDBManagerFactory.ts#L20)

Initialize the database connection.

###### Returns

`void`

###### Implementation of

[`IDatabaseManagerFactory`](#idatabasemanagerfactory).[`dbConnection`](#dbconnection-6)

##### ~~getConnection()~~

```ts
getConnection(): Promise<{
}>;
```

Defined in: [src/core/databasemanager/DummyDBManagerFactory.ts:22](https://github.com/theunionsquare/mangojs/blob/01e44709afb7c4e9e23a1365c81ac6e0d3e87cd1/src/core/databasemanager/DummyDBManagerFactory.ts#L22)

Get or create a database connection.

###### Returns

`Promise`\<\{
\}\>

The database connection/manager instance

###### Implementation of

[`IDatabaseManagerFactory`](#idatabasemanagerfactory).[`getConnection`](#getconnection-6)

##### ~~getStatus()~~

```ts
getStatus(): Promise<boolean>;
```

Defined in: [src/core/databasemanager/DummyDBManagerFactory.ts:26](https://github.com/theunionsquare/mangojs/blob/01e44709afb7c4e9e23a1365c81ac6e0d3e87cd1/src/core/databasemanager/DummyDBManagerFactory.ts#L26)

Get the current connection status.

###### Returns

`Promise`\<`boolean`\>

Connection status

###### Implementation of

[`IDatabaseManagerFactory`](#idatabasemanagerfactory).[`getStatus`](#getstatus-6)

***

### ~~EmbeddedMongoDBManagerFactory~~

Defined in: [src/core/databasemanager/EmbeddedMongoDBManagerFactory.ts:13](https://github.com/theunionsquare/mangojs/blob/01e44709afb7c4e9e23a1365c81ac6e0d3e87cd1/src/core/databasemanager/EmbeddedMongoDBManagerFactory.ts#L13)

Embedded MongoDB manager factory for testing purposes.

#### Deprecated

This class will be removed in a future version.
Use PostgresDBManagerFactory or CockRoachDBManagerFactory instead.

#### Implements

- [`IDatabaseManagerFactory`](#idatabasemanagerfactory)

#### Constructors

##### Constructor

```ts
new EmbeddedMongoDBManagerFactory(): EmbeddedMongoDBManagerFactory;
```

Defined in: [src/core/databasemanager/EmbeddedMongoDBManagerFactory.ts:17](https://github.com/theunionsquare/mangojs/blob/01e44709afb7c4e9e23a1365c81ac6e0d3e87cd1/src/core/databasemanager/EmbeddedMongoDBManagerFactory.ts#L17)

###### Returns

[`EmbeddedMongoDBManagerFactory`](#embeddedmongodbmanagerfactory)

#### Methods

##### ~~dbConnection()~~

```ts
dbConnection(): Promise<void>;
```

Defined in: [src/core/databasemanager/EmbeddedMongoDBManagerFactory.ts:24](https://github.com/theunionsquare/mangojs/blob/01e44709afb7c4e9e23a1365c81ac6e0d3e87cd1/src/core/databasemanager/EmbeddedMongoDBManagerFactory.ts#L24)

Initialize the database connection.

###### Returns

`Promise`\<`void`\>

###### Implementation of

[`IDatabaseManagerFactory`](#idatabasemanagerfactory).[`dbConnection`](#dbconnection-6)

##### ~~getConnection()~~

```ts
getConnection(): Promise<__module>;
```

Defined in: [src/core/databasemanager/EmbeddedMongoDBManagerFactory.ts:32](https://github.com/theunionsquare/mangojs/blob/01e44709afb7c4e9e23a1365c81ac6e0d3e87cd1/src/core/databasemanager/EmbeddedMongoDBManagerFactory.ts#L32)

Get or create a database connection.

###### Returns

`Promise`\<`__module`\>

The database connection/manager instance

###### Implementation of

[`IDatabaseManagerFactory`](#idatabasemanagerfactory).[`getConnection`](#getconnection-6)

##### ~~getStatus()~~

```ts
getStatus(): void;
```

Defined in: [src/core/databasemanager/EmbeddedMongoDBManagerFactory.ts:20](https://github.com/theunionsquare/mangojs/blob/01e44709afb7c4e9e23a1365c81ac6e0d3e87cd1/src/core/databasemanager/EmbeddedMongoDBManagerFactory.ts#L20)

Get the current connection status.

###### Returns

`void`

Connection status

###### Implementation of

[`IDatabaseManagerFactory`](#idatabasemanagerfactory).[`getStatus`](#getstatus-6)

***

### ~~MongoDBEntityManagerFactory~~

Defined in: [src/core/databasemanager/MongoDBEntityManagerFactory.ts:13](https://github.com/theunionsquare/mangojs/blob/01e44709afb7c4e9e23a1365c81ac6e0d3e87cd1/src/core/databasemanager/MongoDBEntityManagerFactory.ts#L13)

MongoDB native driver manager factory.

#### Deprecated

This class will be removed in a future version.
Use PostgresDBManagerFactory or CockRoachDBManagerFactory instead.

#### Implements

- [`IDatabaseManagerFactory`](#idatabasemanagerfactory)

#### Constructors

##### Constructor

```ts
new MongoDBEntityManagerFactory(): MongoDBEntityManagerFactory;
```

Defined in: [src/core/databasemanager/MongoDBEntityManagerFactory.ts:19](https://github.com/theunionsquare/mangojs/blob/01e44709afb7c4e9e23a1365c81ac6e0d3e87cd1/src/core/databasemanager/MongoDBEntityManagerFactory.ts#L19)

###### Returns

[`MongoDBEntityManagerFactory`](#mongodbentitymanagerfactory)

#### Methods

##### ~~dbConnection()~~

```ts
dbConnection(): Promise<MongoClient>;
```

Defined in: [src/core/databasemanager/MongoDBEntityManagerFactory.ts:30](https://github.com/theunionsquare/mangojs/blob/01e44709afb7c4e9e23a1365c81ac6e0d3e87cd1/src/core/databasemanager/MongoDBEntityManagerFactory.ts#L30)

Initialize the database connection.

###### Returns

`Promise`\<`MongoClient`\>

###### Implementation of

[`IDatabaseManagerFactory`](#idatabasemanagerfactory).[`dbConnection`](#dbconnection-6)

##### ~~getConnection()~~

```ts
getConnection(): Promise<MongoClient>;
```

Defined in: [src/core/databasemanager/MongoDBEntityManagerFactory.ts:36](https://github.com/theunionsquare/mangojs/blob/01e44709afb7c4e9e23a1365c81ac6e0d3e87cd1/src/core/databasemanager/MongoDBEntityManagerFactory.ts#L36)

Get or create a database connection.

###### Returns

`Promise`\<`MongoClient`\>

The database connection/manager instance

###### Implementation of

[`IDatabaseManagerFactory`](#idatabasemanagerfactory).[`getConnection`](#getconnection-6)

##### ~~getStatus()~~

```ts
getStatus(): void;
```

Defined in: [src/core/databasemanager/MongoDBEntityManagerFactory.ts:26](https://github.com/theunionsquare/mangojs/blob/01e44709afb7c4e9e23a1365c81ac6e0d3e87cd1/src/core/databasemanager/MongoDBEntityManagerFactory.ts#L26)

Get the current connection status.

###### Returns

`void`

Connection status

###### Implementation of

[`IDatabaseManagerFactory`](#idatabasemanagerfactory).[`getStatus`](#getstatus-6)

***

### ~~MongooseDBManagerFactory~~

Defined in: [src/core/databasemanager/MongooseDBManagerFactory.ts:16](https://github.com/theunionsquare/mangojs/blob/01e44709afb7c4e9e23a1365c81ac6e0d3e87cd1/src/core/databasemanager/MongooseDBManagerFactory.ts#L16)

Mongoose database manager factory for MongoDB connections.

#### Deprecated

This class will be removed in a future version.
Use PostgresDBManagerFactory or CockRoachDBManagerFactory instead.

#### Implements

- [`IDatabaseManagerFactory`](#idatabasemanagerfactory)

#### Constructors

##### Constructor

```ts
new MongooseDBManagerFactory(
   mongoURI, 
   databaseName, 
   loggerFactory): MongooseDBManagerFactory;
```

Defined in: [src/core/databasemanager/MongooseDBManagerFactory.ts:26](https://github.com/theunionsquare/mangojs/blob/01e44709afb7c4e9e23a1365c81ac6e0d3e87cd1/src/core/databasemanager/MongooseDBManagerFactory.ts#L26)

###### Parameters

###### mongoURI

`string`

###### databaseName

`string`

###### loggerFactory

[`ILoggerFactory`](../Loggers/index.md#iloggerfactory)

###### Returns

[`MongooseDBManagerFactory`](#mongoosedbmanagerfactory)

#### Methods

##### ~~dbConnection()~~

```ts
dbConnection(): void;
```

Defined in: [src/core/databasemanager/MongooseDBManagerFactory.ts:38](https://github.com/theunionsquare/mangojs/blob/01e44709afb7c4e9e23a1365c81ac6e0d3e87cd1/src/core/databasemanager/MongooseDBManagerFactory.ts#L38)

Initialize the database connection.

###### Returns

`void`

###### Implementation of

[`IDatabaseManagerFactory`](#idatabasemanagerfactory).[`dbConnection`](#dbconnection-6)

##### ~~getConnection()~~

```ts
getConnection(): Promise<__module>;
```

Defined in: [src/core/databasemanager/MongooseDBManagerFactory.ts:40](https://github.com/theunionsquare/mangojs/blob/01e44709afb7c4e9e23a1365c81ac6e0d3e87cd1/src/core/databasemanager/MongooseDBManagerFactory.ts#L40)

Get or create a database connection.

###### Returns

`Promise`\<`__module`\>

The database connection/manager instance

###### Implementation of

[`IDatabaseManagerFactory`](#idatabasemanagerfactory).[`getConnection`](#getconnection-6)

##### ~~getStatus()~~

```ts
getStatus(): Promise<string>;
```

Defined in: [src/core/databasemanager/MongooseDBManagerFactory.ts:60](https://github.com/theunionsquare/mangojs/blob/01e44709afb7c4e9e23a1365c81ac6e0d3e87cd1/src/core/databasemanager/MongooseDBManagerFactory.ts#L60)

Get the current connection status.

###### Returns

`Promise`\<`string`\>

Connection status

###### Implementation of

[`IDatabaseManagerFactory`](#idatabasemanagerfactory).[`getStatus`](#getstatus-6)

***

### PostgresDBManagerFactory

Defined in: [src/core/databasemanager/postgres/PostgresDBManagerFactory.ts:38](https://github.com/theunionsquare/mangojs/blob/01e44709afb7c4e9e23a1365c81ac6e0d3e87cd1/src/core/databasemanager/postgres/PostgresDBManagerFactory.ts#L38)

PostgreSQL database manager factory using TypeORM.

Supports both URL-based and connection object configuration.

#### Example

```typescript
// URL-based connection
const factory = new PostgresDBManagerFactory(
  { url: 'postgresql://user:pass@host:5432/db' },
  [UserEntity, OrderEntity]
);

// Connection object
const factory = new PostgresDBManagerFactory(
  { host: 'localhost', port: 5432, username: 'postgres', database: 'mydb' },
  [UserEntity],
  true,  // synchronize
  true   // logging
);
```

#### Implements

- [`IDatabaseManagerFactory`](#idatabasemanagerfactory)

#### Constructors

##### Constructor

```ts
new PostgresDBManagerFactory(
   connection, 
   entities?, 
   synchronize?, 
   logging?): PostgresDBManagerFactory;
```

Defined in: [src/core/databasemanager/postgres/PostgresDBManagerFactory.ts:50](https://github.com/theunionsquare/mangojs/blob/01e44709afb7c4e9e23a1365c81ac6e0d3e87cd1/src/core/databasemanager/postgres/PostgresDBManagerFactory.ts#L50)

###### Parameters

###### connection

`PostgresUrl` | `PostgresConnection`

###### entities?

`any`[] = `[]`

###### synchronize?

`boolean` = `true`

###### logging?

`boolean` = `false`

###### Returns

[`PostgresDBManagerFactory`](#postgresdbmanagerfactory)

#### Methods

##### dbConnection()

```ts
dbConnection(): void;
```

Defined in: [src/core/databasemanager/postgres/PostgresDBManagerFactory.ts:63](https://github.com/theunionsquare/mangojs/blob/01e44709afb7c4e9e23a1365c81ac6e0d3e87cd1/src/core/databasemanager/postgres/PostgresDBManagerFactory.ts#L63)

Initialize the database connection.

###### Returns

`void`

###### Implementation of

[`IDatabaseManagerFactory`](#idatabasemanagerfactory).[`dbConnection`](#dbconnection-6)

##### getConnection()

```ts
getConnection(): Promise<{
}>;
```

Defined in: [src/core/databasemanager/postgres/PostgresDBManagerFactory.ts:65](https://github.com/theunionsquare/mangojs/blob/01e44709afb7c4e9e23a1365c81ac6e0d3e87cd1/src/core/databasemanager/postgres/PostgresDBManagerFactory.ts#L65)

Get or create a database connection.

###### Returns

`Promise`\<\{
\}\>

The database connection/manager instance

###### Implementation of

[`IDatabaseManagerFactory`](#idatabasemanagerfactory).[`getConnection`](#getconnection-6)

##### getStatus()

```ts
getStatus(): Promise<boolean>;
```

Defined in: [src/core/databasemanager/postgres/PostgresDBManagerFactory.ts:109](https://github.com/theunionsquare/mangojs/blob/01e44709afb7c4e9e23a1365c81ac6e0d3e87cd1/src/core/databasemanager/postgres/PostgresDBManagerFactory.ts#L109)

Get the current connection status.

###### Returns

`Promise`\<`boolean`\>

Connection status

###### Implementation of

[`IDatabaseManagerFactory`](#idatabasemanagerfactory).[`getStatus`](#getstatus-6)

## Interfaces

### IDatabaseManagerFactory

Defined in: [src/core/databasemanager/types.ts:5](https://github.com/theunionsquare/mangojs/blob/01e44709afb7c4e9e23a1365c81ac6e0d3e87cd1/src/core/databasemanager/types.ts#L5)

Interface for database manager factories.
Implementations provide database connection management for different database types.

#### Methods

##### dbConnection()

```ts
dbConnection(): void | Promise<void> | Promise<unknown>;
```

Defined in: [src/core/databasemanager/types.ts:9](https://github.com/theunionsquare/mangojs/blob/01e44709afb7c4e9e23a1365c81ac6e0d3e87cd1/src/core/databasemanager/types.ts#L9)

Initialize the database connection.

###### Returns

`void` \| `Promise`\<`void`\> \| `Promise`\<`unknown`\>

##### getConnection()

```ts
getConnection(): Promise<unknown>;
```

Defined in: [src/core/databasemanager/types.ts:15](https://github.com/theunionsquare/mangojs/blob/01e44709afb7c4e9e23a1365c81ac6e0d3e87cd1/src/core/databasemanager/types.ts#L15)

Get or create a database connection.

###### Returns

`Promise`\<`unknown`\>

The database connection/manager instance

##### getStatus()

```ts
getStatus(): unknown;
```

Defined in: [src/core/databasemanager/types.ts:21](https://github.com/theunionsquare/mangojs/blob/01e44709afb7c4e9e23a1365c81ac6e0d3e87cd1/src/core/databasemanager/types.ts#L21)

Get the current connection status.

###### Returns

`unknown`

Connection status
