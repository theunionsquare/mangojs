# Abstract Class: BaseMapper\<Entity, DTO\>

Defined in: [src/core/utils/base.mapper.ts:5](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/utils/base.mapper.ts#L5)

Base mapper class for bidirectional entity-DTO transformation
Provides generic mapping functionality that can be extended by specific mappers

## Type Parameters

### Entity

`Entity`

### DTO

`DTO`

## Constructors

### Constructor

```ts
new BaseMapper<Entity, DTO>(): BaseMapper<Entity, DTO>;
```

#### Returns

`BaseMapper`\<`Entity`, `DTO`\>

## Methods

### fromDTO()

```ts
abstract fromDTO(dto): Partial<Entity>;
```

Defined in: [src/core/utils/base.mapper.ts:18](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/utils/base.mapper.ts#L18)

Maps a DTO to its entity representation

#### Parameters

##### dto

`DTO`

The DTO to map

#### Returns

`Partial`\<`Entity`\>

The mapped entity (partial or complete depending on implementation)

***

### fromDTOList()

```ts
fromDTOList(dtos): Partial<Entity>[];
```

Defined in: [src/core/utils/base.mapper.ts:34](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/utils/base.mapper.ts#L34)

Maps an array of DTOs to their entity representations

#### Parameters

##### dtos

`DTO`[]

The array of DTOs to map

#### Returns

`Partial`\<`Entity`\>[]

Array of mapped entities

***

### fromDTOOrNull()

```ts
fromDTOOrNull(dto): Partial<Entity>;
```

Defined in: [src/core/utils/base.mapper.ts:52](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/utils/base.mapper.ts#L52)

Maps a single DTO to entity, returning null if DTO is null/undefined

#### Parameters

##### dto

`DTO`

The DTO to map (can be null/undefined)

#### Returns

`Partial`\<`Entity`\>

The mapped entity or null

***

### toDTO()

```ts
abstract toDTO(entity): DTO;
```

Defined in: [src/core/utils/base.mapper.ts:11](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/utils/base.mapper.ts#L11)

Maps a single entity to its DTO representation

#### Parameters

##### entity

`Entity`

The entity to map

#### Returns

`DTO`

The mapped DTO

***

### toDTOList()

```ts
toDTOList(entities): DTO[];
```

Defined in: [src/core/utils/base.mapper.ts:25](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/utils/base.mapper.ts#L25)

Maps an array of entities to their DTO representations

#### Parameters

##### entities

`Entity`[]

The array of entities to map

#### Returns

`DTO`[]

Array of mapped DTOs

***

### toDTOOrNull()

```ts
toDTOOrNull(entity): DTO;
```

Defined in: [src/core/utils/base.mapper.ts:43](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/utils/base.mapper.ts#L43)

Maps a single entity to DTO, returning null if entity is null/undefined

#### Parameters

##### entity

`Entity`

The entity to map (can be null/undefined)

#### Returns

`DTO`

The mapped DTO or null
