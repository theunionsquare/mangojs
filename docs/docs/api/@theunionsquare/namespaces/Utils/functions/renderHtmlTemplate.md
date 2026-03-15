---
sidebar_label: renderHtmlTemplate
---

# Function: renderHtmlTemplate()

```ts
function renderHtmlTemplate(template, data): string;
```

Defined in: [src/core/utils/renderHtmlTemplate.ts:15](https://github.com/theunionsquare/mangojs/blob/219a09cebef24d1a873d4a076bc8ecde07f21412/src/core/utils/renderHtmlTemplate.ts#L15)

Renders an HTML template by replacing `{{placeholder}}` with actual data.

## Parameters

### template

`string`

The HTML template string with `{{key}}` placeholders

### data

`Record`\<`string`, `string`\>

Object with key-value pairs for replacement

## Returns

`string`

The rendered HTML string

## Example

```ts
const html = renderHtmlTemplate(
  '<h1>Hello {{name}}</h1>',
  { name: 'World' }
);
// Returns: '<h1>Hello World</h1>'
```
