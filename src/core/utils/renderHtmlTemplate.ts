/**
 * Renders an HTML template by replacing placeholders with actual data.
 * @param template The HTML template as a string.
 * @param data An object containing key-value pairs for placeholders and their replacements.
 * @returns The rendered HTML string with placeholders replaced by actual data.
 */
export const renderHtmlTemplate = (template: string, data: any): string => {
  let renderedTemplate = template;
  for (const key in data) {
    const placeholder = `{{${key}}}`;
    const value = data[key];
    renderedTemplate = renderedTemplate.replace(
      new RegExp(placeholder, "g"),
      value
    );
  }
  return renderedTemplate;
};
