---
sidebar_label: generateMagicLink
---

# Function: generateMagicLink()

```ts
function generateMagicLink(size?): string;
```

Defined in: [src/core/utils/generics.ts:54](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/utils/generics.ts#L54)

Generates a magic link token for passwordless authentication.

## Parameters

### size?

`number` = `95`

Length of the token (default: 95)

## Returns

`string`

Random token string
