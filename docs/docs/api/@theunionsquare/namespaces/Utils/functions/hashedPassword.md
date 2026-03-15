---
sidebar_label: hashedPassword
---

# Function: hashedPassword()

```ts
function hashedPassword(password): string;
```

Defined in: [src/core/utils/crypto.ts:12](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/utils/crypto.ts#L12)

Hashes a password using SHA-256.

## Parameters

### password

`string`

The plaintext password to hash

## Returns

`string`

The SHA-256 hash as a hex string

## Example

```ts
const hash = hashedPassword('mypassword');
```
