/**
 * Renders an HTML template by replacing `{{placeholder}}` with actual data.
 *
 * @param template - The HTML template string with `{{key}}` placeholders
 * @param data - Object with key-value pairs for replacement
 * @returns The rendered HTML string
 *
 * @example
 * const html = renderHtmlTemplate(
 *   '<h1>Hello {{name}}</h1>',
 *   { name: 'World' }
 * );
 * // Returns: '<h1>Hello World</h1>'
 */
export const renderHtmlTemplate = (
  template: string,
  data: Record<string, string>,
): string => {
  let renderedTemplate = template;
  for (const key in data) {
    const placeholder = `{{${key}}}`;
    const value = data[key];
    renderedTemplate = renderedTemplate.replace(
      new RegExp(placeholder, "g"),
      value,
    );
  }
  return renderedTemplate;
};
