# Function: generateRandomString()

```ts
function generateRandomString(length?): string;
```

Defined in: [src/core/utils/generics.ts:25](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/utils/generics.ts#L25)

Generates a random alphanumeric string.

## Parameters

### length?

`number` = `10`

Length of the string (default: 10)

## Returns

`string`

Random alphanumeric string

## Example

```ts
const token = generateRandomString(20);
```
