---
sidebar_label: UserContextExtractor
---

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

Defined in: [src/core/decorators/auth/core/authConfig.ts:17](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/decorators/auth/core/authConfig.ts#L17)

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
