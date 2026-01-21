// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import rehypeSlug from "rehype-slug";

// https://astro.build/config
export default defineConfig({
  site: "https://www.languages4.com",
  integrations: [sitemap(), tailwind()],
  markdown: {
    rehypePlugins: [
      rehypeSlug, // Automatically adds IDs to headings for TOC links
    ],
  },
});
