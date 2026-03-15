# Function: generateMagicLink()

```ts
function generateMagicLink(size?): string;
```

Defined in: [src/core/utils/generics.ts:54](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/utils/generics.ts#L54)

Generates a magic link token for passwordless authentication.

## Parameters

### size?

`number` = `95`

Length of the token (default: 95)

## Returns

`string`

Random token string
