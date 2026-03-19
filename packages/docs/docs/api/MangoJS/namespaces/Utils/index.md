---
sidebar_label: Utils
---

# Utils

Utility functions and base classes

## Enumerations

### MetadataKeys

Defined in: [packages/core/src/core/utils/metadata.keys.ts:1](https://github.com/theunionsquare/mangojs/blob/e9b931cfa8d37ff10d485490a7c7959b19e4bfb1/packages/core/src/core/utils/metadata.keys.ts#L1)

#### Enumeration Members

##### AUTHENTICATION\_HANDLERS

```ts
AUTHENTICATION_HANDLERS: "auth:authentication";
```

Defined in: [packages/core/src/core/utils/metadata.keys.ts:14](https://github.com/theunionsquare/mangojs/blob/e9b931cfa8d37ff10d485490a7c7959b19e4bfb1/packages/core/src/core/utils/metadata.keys.ts#L14)

##### AUTHORIZATION

```ts
AUTHORIZATION: "server:authorization";
```

Defined in: [packages/core/src/core/utils/metadata.keys.ts:11](https://github.com/theunionsquare/mangojs/blob/e9b931cfa8d37ff10d485490a7c7959b19e4bfb1/packages/core/src/core/utils/metadata.keys.ts#L11)

##### AUTHORIZATION\_OR\_MODE

```ts
AUTHORIZATION_OR_MODE: "server:authorization:or_mode";
```

Defined in: [packages/core/src/core/utils/metadata.keys.ts:12](https://github.com/theunionsquare/mangojs/blob/e9b931cfa8d37ff10d485490a7c7959b19e4bfb1/packages/core/src/core/utils/metadata.keys.ts#L12)

##### AUTHORIZATION\_VALIDATORS

```ts
AUTHORIZATION_VALIDATORS: "server:authorization:validators";
```

Defined in: [packages/core/src/core/utils/metadata.keys.ts:13](https://github.com/theunionsquare/mangojs/blob/e9b931cfa8d37ff10d485490a7c7959b19e4bfb1/packages/core/src/core/utils/metadata.keys.ts#L13)

##### BASE\_PATH

```ts
BASE_PATH: "express:base_path";
```

Defined in: [packages/core/src/core/utils/metadata.keys.ts:3](https://github.com/theunionsquare/mangojs/blob/e9b931cfa8d37ff10d485490a7c7959b19e4bfb1/packages/core/src/core/utils/metadata.keys.ts#L3)

##### EXPRESS\_USE\_HANDLERS

```ts
EXPRESS_USE_HANDLERS: "express:handlers";
```

Defined in: [packages/core/src/core/utils/metadata.keys.ts:7](https://github.com/theunionsquare/mangojs/blob/e9b931cfa8d37ff10d485490a7c7959b19e4bfb1/packages/core/src/core/utils/metadata.keys.ts#L7)

##### MIDDLEWARE

```ts
MIDDLEWARE: "express:middleware";
```

Defined in: [packages/core/src/core/utils/metadata.keys.ts:9](https://github.com/theunionsquare/mangojs/blob/e9b931cfa8d37ff10d485490a7c7959b19e4bfb1/packages/core/src/core/utils/metadata.keys.ts#L9)

##### ROUTERS

```ts
ROUTERS: "express:routers";
```

Defined in: [packages/core/src/core/utils/metadata.keys.ts:5](https://github.com/theunionsquare/mangojs/blob/e9b931cfa8d37ff10d485490a7c7959b19e4bfb1/packages/core/src/core/utils/metadata.keys.ts#L5)

##### SCHEDULE\_CRON

```ts
SCHEDULE_CRON: "scheduler:cron";
```

Defined in: [packages/core/src/core/utils/metadata.keys.ts:16](https://github.com/theunionsquare/mangojs/blob/e9b931cfa8d37ff10d485490a7c7959b19e4bfb1/packages/core/src/core/utils/metadata.keys.ts#L16)

##### SCHEDULE\_METADATA

```ts
SCHEDULE_METADATA: "scheduler:metadata";
```

Defined in: [packages/core/src/core/utils/metadata.keys.ts:18](https://github.com/theunionsquare/mangojs/blob/e9b931cfa8d37ff10d485490a7c7959b19e4bfb1/packages/core/src/core/utils/metadata.keys.ts#L18)

##### SCHEDULE\_OPTIONS

```ts
SCHEDULE_OPTIONS: "scheduler:options";
```

Defined in: [packages/core/src/core/utils/metadata.keys.ts:17](https://github.com/theunionsquare/mangojs/blob/e9b931cfa8d37ff10d485490a7c7959b19e4bfb1/packages/core/src/core/utils/metadata.keys.ts#L17)

## Classes

### `abstract` BaseMapper

Defined in: [packages/core/src/core/utils/base.mapper.ts:5](https://github.com/theunionsquare/mangojs/blob/e9b931cfa8d37ff10d485490a7c7959b19e4bfb1/packages/core/src/core/utils/base.mapper.ts#L5)

Base mapper class for bidirectional entity-DTO transformation
Provides generic mapping functionality that can be extended by specific mappers

#### Type Parameters

##### Entity

`Entity`

##### DTO

`DTO`

#### Constructors

##### Constructor

```ts
new BaseMapper<Entity, DTO>(): BaseMapper<Entity, DTO>;
```

###### Returns

[`BaseMapper`](#abstract-basemapper)\<`Entity`, `DTO`\>

#### Methods

##### fromDTO()

```ts
abstract fromDTO(dto): Partial<Entity>;
```

Defined in: [packages/core/src/core/utils/base.mapper.ts:18](https://github.com/theunionsquare/mangojs/blob/e9b931cfa8d37ff10d485490a7c7959b19e4bfb1/packages/core/src/core/utils/base.mapper.ts#L18)

Maps a DTO to its entity representation

###### Parameters

###### dto

`DTO`

The DTO to map

###### Returns

`Partial`\<`Entity`\>

The mapped entity (partial or complete depending on implementation)

##### fromDTOList()

```ts
fromDTOList(dtos): Partial<Entity>[];
```

Defined in: [packages/core/src/core/utils/base.mapper.ts:34](https://github.com/theunionsquare/mangojs/blob/e9b931cfa8d37ff10d485490a7c7959b19e4bfb1/packages/core/src/core/utils/base.mapper.ts#L34)

Maps an array of DTOs to their entity representations

###### Parameters

###### dtos

`DTO`[]

The array of DTOs to map

###### Returns

`Partial`\<`Entity`\>[]

Array of mapped entities

##### fromDTOOrNull()

```ts
fromDTOOrNull(dto): Partial<Entity>;
```

Defined in: [packages/core/src/core/utils/base.mapper.ts:52](https://github.com/theunionsquare/mangojs/blob/e9b931cfa8d37ff10d485490a7c7959b19e4bfb1/packages/core/src/core/utils/base.mapper.ts#L52)

Maps a single DTO to entity, returning null if DTO is null/undefined

###### Parameters

###### dto

`DTO`

The DTO to map (can be null/undefined)

###### Returns

`Partial`\<`Entity`\>

The mapped entity or null

##### toDTO()

```ts
abstract toDTO(entity): DTO;
```

Defined in: [packages/core/src/core/utils/base.mapper.ts:11](https://github.com/theunionsquare/mangojs/blob/e9b931cfa8d37ff10d485490a7c7959b19e4bfb1/packages/core/src/core/utils/base.mapper.ts#L11)

Maps a single entity to its DTO representation

###### Parameters

###### entity

`Entity`

The entity to map

###### Returns

`DTO`

The mapped DTO

##### toDTOList()

```ts
toDTOList(entities): DTO[];
```

Defined in: [packages/core/src/core/utils/base.mapper.ts:25](https://github.com/theunionsquare/mangojs/blob/e9b931cfa8d37ff10d485490a7c7959b19e4bfb1/packages/core/src/core/utils/base.mapper.ts#L25)

Maps an array of entities to their DTO representations

###### Parameters

###### entities

`Entity`[]

The array of entities to map

###### Returns

`DTO`[]

Array of mapped DTOs

##### toDTOOrNull()

```ts
toDTOOrNull(entity): DTO;
```

Defined in: [packages/core/src/core/utils/base.mapper.ts:43](https://github.com/theunionsquare/mangojs/blob/e9b931cfa8d37ff10d485490a7c7959b19e4bfb1/packages/core/src/core/utils/base.mapper.ts#L43)

Maps a single entity to DTO, returning null if entity is null/undefined

###### Parameters

###### entity

`Entity`

The entity to map (can be null/undefined)

###### Returns

`DTO`

The mapped DTO or null

***

### LogRequest

Defined in: [packages/core/src/core/utils/logRequest.ts:17](https://github.com/theunionsquare/mangojs/blob/e9b931cfa8d37ff10d485490a7c7959b19e4bfb1/packages/core/src/core/utils/logRequest.ts#L17)

Adds request tracking headers to a response.

Sets `x-request-id` and `x-request-timestamp` headers
for request tracing and debugging.

#### Example

```ts
app.use((req, res, next) => {
  const log = new LogRequest(res);
  console.log(`Request ${log.requestId} at ${log.timestamp}`);
  next();
});
```

#### Constructors

##### Constructor

```ts
new LogRequest(res): LogRequest;
```

Defined in: [packages/core/src/core/utils/logRequest.ts:21](https://github.com/theunionsquare/mangojs/blob/e9b931cfa8d37ff10d485490a7c7959b19e4bfb1/packages/core/src/core/utils/logRequest.ts#L21)

###### Parameters

###### res

`Response`

###### Returns

[`LogRequest`](#logrequest)

#### Properties

##### requestId

```ts
requestId: string;
```

Defined in: [packages/core/src/core/utils/logRequest.ts:19](https://github.com/theunionsquare/mangojs/blob/e9b931cfa8d37ff10d485490a7c7959b19e4bfb1/packages/core/src/core/utils/logRequest.ts#L19)

##### timestamp

```ts
timestamp: string;
```

Defined in: [packages/core/src/core/utils/logRequest.ts:18](https://github.com/theunionsquare/mangojs/blob/e9b931cfa8d37ff10d485490a7c7959b19e4bfb1/packages/core/src/core/utils/logRequest.ts#L18)

## Functions

### generateMagicLink()

```ts
function generateMagicLink(size?): string;
```

Defined in: [packages/core/src/core/utils/generics.ts:54](https://github.com/theunionsquare/mangojs/blob/e9b931cfa8d37ff10d485490a7c7959b19e4bfb1/packages/core/src/core/utils/generics.ts#L54)

Generates a magic link token for passwordless authentication.

#### Parameters

##### size?

`number` = `95`

Length of the token (default: 95)

#### Returns

`string`

Random token string

***

### generateRandomPassword()

```ts
function generateRandomPassword(length?): string;
```

Defined in: [packages/core/src/core/utils/generics.ts:44](https://github.com/theunionsquare/mangojs/blob/e9b931cfa8d37ff10d485490a7c7959b19e4bfb1/packages/core/src/core/utils/generics.ts#L44)

Generates a random password.

#### Parameters

##### length?

`number` = `12`

Length of the password (default: 12)

#### Returns

`string`

Random alphanumeric password

***

### generateRandomString()

```ts
function generateRandomString(length?): string;
```

Defined in: [packages/core/src/core/utils/generics.ts:25](https://github.com/theunionsquare/mangojs/blob/e9b931cfa8d37ff10d485490a7c7959b19e4bfb1/packages/core/src/core/utils/generics.ts#L25)

Generates a random alphanumeric string.

#### Parameters

##### length?

`number` = `10`

Length of the string (default: 10)

#### Returns

`string`

Random alphanumeric string

#### Example

```ts
const token = generateRandomString(20);
```

***

### generateUUID()

```ts
function generateUUID(): string;
```

Defined in: [packages/core/src/core/utils/generics.ts:12](https://github.com/theunionsquare/mangojs/blob/e9b931cfa8d37ff10d485490a7c7959b19e4bfb1/packages/core/src/core/utils/generics.ts#L12)

Generates a UUID v4 string.

#### Returns

`string`

A unique UUID string

#### Example

```ts
const id = generateUUID();
// Returns: '550e8400-e29b-41d4-a716-446655440000'
```

***

### hashedPassword()

```ts
function hashedPassword(password): string;
```

Defined in: [packages/core/src/core/utils/crypto.ts:12](https://github.com/theunionsquare/mangojs/blob/e9b931cfa8d37ff10d485490a7c7959b19e4bfb1/packages/core/src/core/utils/crypto.ts#L12)

Hashes a password using SHA-256.

#### Parameters

##### password

`string`

The plaintext password to hash

#### Returns

`string`

The SHA-256 hash as a hex string

#### Example

```ts
const hash = hashedPassword('mypassword');
```

***

### loadSecret()

```ts
function loadSecret(envVarName): string;
```

Defined in: [packages/core/src/core/utils/loadSecrets.ts:9](https://github.com/theunionsquare/mangojs/blob/e9b931cfa8d37ff10d485490a7c7959b19e4bfb1/packages/core/src/core/utils/loadSecrets.ts#L9)

Load a secret from a file or environment variable
Use this function to load Docker mounts

#### Parameters

##### envVarName

`string`

The name of the environment variable that holds the secret path or value

#### Returns

`string`

The secret value as a string

***

### processSetUpDataBaseService()

```ts
function processSetUpDataBaseService(fileList, setUpDatabaseAction): void;
```

Defined in: [packages/core/src/core/utils/processSetUpDataBaseFiles.ts:5](https://github.com/theunionsquare/mangojs/blob/e9b931cfa8d37ff10d485490a7c7959b19e4bfb1/packages/core/src/core/utils/processSetUpDataBaseFiles.ts#L5)

#### Parameters

##### fileList

[`SetUpDatabaseRecord`](../Types/namespaces/database/index.md#setupdatabaserecord)[]

##### setUpDatabaseAction

[`SetUpDatabaseAction`](../Types/namespaces/database/index.md#setupdatabaseaction)

#### Returns

`void`

***

### renderHtmlTemplate()

```ts
function renderHtmlTemplate(template, data): string;
```

Defined in: [packages/core/src/core/utils/renderHtmlTemplate.ts:15](https://github.com/theunionsquare/mangojs/blob/e9b931cfa8d37ff10d485490a7c7959b19e4bfb1/packages/core/src/core/utils/renderHtmlTemplate.ts#L15)

Renders an HTML template by replacing `{{placeholder}}` with actual data.

#### Parameters

##### template

`string`

The HTML template string with `{{key}}` placeholders

##### data

`Record`\<`string`, `string`\>

Object with key-value pairs for replacement

#### Returns

`string`

The rendered HTML string

#### Example

```ts
const html = renderHtmlTemplate(
  '<h1>Hello {{name}}</h1>',
  { name: 'World' }
);
// Returns: '<h1>Hello World</h1>'
```
