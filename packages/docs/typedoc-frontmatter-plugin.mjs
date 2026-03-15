// @ts-check
import { MarkdownPageEvent } from "typedoc-plugin-markdown";

/**
 * Local TypeDoc plugin to add sidebar_label frontmatter based on page name
 * @param {import('typedoc').Application} app
 */
export function load(app) {
  app.renderer.on(MarkdownPageEvent.BEGIN, (page) => {
    // Get the page name from the model or derive it from the page
    const name = page.model?.name;

    if (name) {
      page.frontmatter = {
        ...page.frontmatter,
        sidebar_label: name,
      };
    }
  });
}
