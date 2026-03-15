[**MangoJS**](../../../../README.md)

***

# Function: hashedPassword()

```ts
function hashedPassword(password): string;
```

Defined in: [src/core/utils/crypto.ts:12](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/utils/crypto.ts#L12)

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
