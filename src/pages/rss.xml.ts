import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
  // Get all published posts from all three collections
  const whatarel4Posts = await getCollection(
    "whatarel4",
    ({ data }) => data.draft !== true
  );
  const collectionPosts = await getCollection(
    "signature-collections",
    ({ data }) => data.draft !== true
  );
  const ancestorPosts = await getCollection(
    "ancestors",
    ({ data }) => data.draft !== true
  );

  // Combine and sort by date (newest first)
  const allPosts = [
    ...whatarel4Posts.map((post) => ({ ...post, collection: "whatarel4" })),
    ...collectionPosts.map((post) => ({
      ...post,
      collection: "signature-collections",
    })),
    ...ancestorPosts.map((post) => ({ ...post, collection: "ancestors" })),
  ].sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  return rss({
    title: "Languages 4 | Indigenous Language Reclamation",
    description:
      "Updates on Indigenous language revitalization, technology, land-based learning, and cultural preservation from Languages 4.",
    site: context.site?.toString() || "https://www.languages4.com",
    items: allPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/${post.collection}/${post.slug}/`,
      categories: post.data.tags || [],
      author: post.data.author,
    })),
    customData: `<language>en-us</language>`,
  });
}
