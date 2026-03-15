---
sidebar_label: OwnershipValidator
---

# Type Alias: OwnershipValidator()

```ts
type OwnershipValidator = (userValue, resourceValue, req) => boolean | Promise<boolean>;
```

Defined in: [src/core/decorators/auth/requiresOwnership.decorator.ts:20](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/decorators/auth/requiresOwnership.decorator.ts#L20)

Custom ownership validator function

## Parameters

### userValue

`any`

The value from the user context

### resourceValue

`any`

The value from the request

### req

`Request`

The full request object for complex logic

## Returns

`boolean` \| `Promise`\<`boolean`\>

true if user owns the resource, false otherwise
