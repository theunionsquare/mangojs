---
sidebar_label: generateRandomString
---

# Function: generateRandomString()

```ts
function generateRandomString(length?): string;
```

Defined in: [src/core/utils/generics.ts:25](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/utils/generics.ts#L25)

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
