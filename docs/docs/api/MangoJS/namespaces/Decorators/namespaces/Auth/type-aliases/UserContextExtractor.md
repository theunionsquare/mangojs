[**MangoJS**](../../../../../../README.md)

***

# Type Alias: UserContextExtractor()

```ts
type UserContextExtractor = (req) => 
  | {
[key: string]: any;
  groups?: (
     | {
     name: string;
   }
    | string)[];
  userType?: string;
}
  | null;
```

Defined in: [src/core/decorators/auth/core/authConfig.ts:17](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/decorators/auth/core/authConfig.ts#L17)

User context extractor function
Allows custom logic for extracting user from request

## Parameters

### req

`Request`

## Returns

  \| \{
\[`key`: `string`\]: `any`;
  `groups?`: (
     \| \{
     `name`: `string`;
   \}
    \| `string`)[];
  `userType?`: `string`;
\}
  \| `null`
