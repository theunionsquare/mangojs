[**MangoJS**](../../../../README.md)

***

# Function: loadSecret()

```ts
function loadSecret(envVarName): string;
```

Defined in: [src/core/utils/loadSecrets.ts:9](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/utils/loadSecrets.ts#L9)

Load a secret from a file or environment variable
Use this function to load Docker mounts

## Parameters

### envVarName

`string`

The name of the environment variable that holds the secret path or value

## Returns

`string`

The secret value as a string
