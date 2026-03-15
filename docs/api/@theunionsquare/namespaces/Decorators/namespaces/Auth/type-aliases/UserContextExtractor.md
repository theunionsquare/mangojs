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

Defined in: [src/core/decorators/auth/core/authConfig.ts:17](https://github.com/theunionsquare/mangojs/blob/a070ede172a726123f31a042f5cc71433de4090d/src/core/decorators/auth/core/authConfig.ts#L17)

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
