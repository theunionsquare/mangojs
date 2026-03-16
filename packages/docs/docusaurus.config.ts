import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: "MangoJs",
  tagline: "AI-Powered Backend Framework for Node.js",
  favicon: "img/favicon.ico",

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: "https://mangojs.tech",
  // Set the /<baseUrl>/ pathname under which your site is served
  // Docs are served under /docs/ path on the website
  baseUrl: "/docs/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "mangojs", // Usually your GitHub org/user name.
  projectName: "mangojs", // Usually your repo name.

  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  markdown: {
    format: "md",
  },

  plugins: [
    [
      "docusaurus-plugin-typedoc",
      {
        entryPoints: ["../core/src/index.ts"],
        tsconfig: "../core/tsconfig.json",
        out: "docs/api",
        name: "MangoJS",
        readme: "none",
        hideBreadcrumbs: true,
        useCodeBlocks: true,
        sanitizeComments: true,
        skipErrorChecking: true,
        // Only generate files for namespaces, don't create separate files for top-level members
        membersWithOwnFile: [],
        plugin: [
          "typedoc-plugin-markdown",
          "typedoc-plugin-frontmatter",
          "./typedoc-frontmatter-plugin.mjs",
        ],
      },
    ],
  ],

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          include: ["**/*.md", "**/*.mdx", "**/*.context.md"],
          exclude: ["tutorial/common/**"],
          lastVersion: "current",
          versions: {
            current: {
              label: "0.1.0 (Latest)",
              badge: true,
            },
          },
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ["rss", "atom"],
            xslt: true,
          },
          // Useful options to enforce blogging best practices
          onInlineTags: "warn",
          onInlineAuthors: "warn",
          onUntruncatedBlogPosts: "warn",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: "img/docusaurus-social-card.jpg",
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: "🥭 MangoJS",
      logo: {
        alt: "MangoJS",
        src: "img/logo.svg",
        href: "https://mangojs.tech",
        target: "_self",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "handOnSidebar",
          position: "left",
          label: "Hand On Tutorial",
        },
        {
          type: "docSidebar",
          sidebarId: "handbookSidebar",
          position: "left",
          label: "Handbook",
        },
        {
          type: "docSidebar",
          sidebarId: "apiSidebar",
          position: "left",
          label: "API",
        },
        {
          type: "docsVersionDropdown",
          position: "right",
        },
        {
          href: "https://github.com/theunionsquare/mangojs",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      copyright: `Copyright © ${new Date().getFullYear()}`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
