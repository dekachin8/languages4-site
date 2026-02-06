// tagFilter.ts - Tag filtering utilities for collection pages
import type { CollectionEntry } from "astro:content";

// Type constraint to ensure posts have tags
type PostWithTags = {
  data: {
    tags?: string[];
  };
};

/**
 * Filters posts by a specific tag
 */
export function filterByTag<T extends PostWithTags>(
  posts: T[],
  tag: string | null,
): T[] {
  if (!tag) return posts;

  return posts.filter((post) => {
    const tags = post.data.tags || [];
    return tags.some((t: string) => t.toLowerCase() === tag.toLowerCase());
  });
}

/**
 * Gets all unique tags from a collection with post counts
 */
export function getAllTagsWithCounts<T extends PostWithTags>(
  posts: T[],
): Array<{ tag: string; count: number }> {
  const tagCounts = new Map<string, number>();

  posts.forEach((post) => {
    const tags = post.data.tags || [];
    tags.forEach((tag: string) => {
      const normalizedTag = tag.trim();
      tagCounts.set(normalizedTag, (tagCounts.get(normalizedTag) || 0) + 1);
    });
  });

  return Array.from(tagCounts.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count); // Sort by count descending
}

/**
 * Normalizes tag for URL usage
 */
export function normalizeTagForUrl(tag: string): string {
  return encodeURIComponent(tag.toLowerCase().trim());
}

/**
 * Denormalizes tag from URL
 */
export function denormalizeTagFromUrl(urlTag: string): string {
  return decodeURIComponent(urlTag);
}
