[**MangoJS**](../../../../README.md)

***

# Function: generateRandomString()

```ts
function generateRandomString(length?): string;
```

Defined in: [src/core/utils/generics.ts:25](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/utils/generics.ts#L25)

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
