# Interface: CacheEntry\<T\>

Defined in: [src/core/cache/types.ts:5](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/cache/types.ts#L5)

Cache entry with expiration timestamp.

## Type Parameters

### T

`T`

The type of the cached value

## Properties

### expiresAt

```ts
expiresAt: number;
```

Defined in: [src/core/cache/types.ts:9](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/cache/types.ts#L9)

Expiration timestamp in milliseconds

***

### value

```ts
value: T;
```

Defined in: [src/core/cache/types.ts:7](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/cache/types.ts#L7)

The cached value
