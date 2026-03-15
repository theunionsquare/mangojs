[**MangoJS**](../../../../README.md)

***

# Function: renderHtmlTemplate()

```ts
function renderHtmlTemplate(template, data): string;
```

Defined in: [src/core/utils/renderHtmlTemplate.ts:15](https://github.com/theunionsquare/mangojs/blob/65747ce801d66fe1c20c0ea7e6d258591643ae3c/src/core/utils/renderHtmlTemplate.ts#L15)

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
