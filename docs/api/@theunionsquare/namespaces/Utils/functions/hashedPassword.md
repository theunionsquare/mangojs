# Function: hashedPassword()

```ts
function hashedPassword(password): string;
```

Defined in: [src/core/utils/crypto.ts:12](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/utils/crypto.ts#L12)

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
