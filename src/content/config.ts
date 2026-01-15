// src/content/config.ts
import { defineCollection, z } from "astro:content";

// Schema for "What Are Languages 4?" blog
const whatarel4Collection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    updatedDate: z.date().optional(),
    heroImage: z.string().optional(),
    heroImageAlt: z.string().optional(),
    author: z.string().default("Languages 4 Team"),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

// Schema for Signature Collections (multi-part series)
const signatureCollectionsCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    updatedDate: z.date().optional(),
    heroImage: z.string().optional(),
    heroImageAlt: z.string().optional(),
    seriesTitle: z.string(), // e.g., "Land Is Our Teacher"
    seriesOrder: z.number().optional(), // Part 1, Part 2, etc.
    author: z.string().default("Languages 4 Team"),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

// Schema for Indigenous Ancestors profiles
const ancestorsCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    updatedDate: z.date().optional(),
    heroImage: z.string().optional(),
    heroImageAlt: z.string().optional(),
    ancestorName: z.string(), // Full name of ancestor/leader
    tribe: z.string().optional(), // Tribal affiliation
    lifespan: z.string().optional(), // e.g., "1840-1909"
    author: z.string().default("Languages 4 Team"),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

// Schema for Newsletter Volumes (containers for issues)
const newslettersCollection = defineCollection({
  type: "content",
  schema: z.object({
    volumeNumber: z.number(), // 1, 2, 3... 19
    title: z.string(), // "Volume 19: Innovation & Tradition"
    description: z.string(), // Summary of what's in this issue
    pubDate: z.date(), // When this volume was published
    coverImage: z.string().optional(), // Volume cover/hero image
    coverImageAlt: z.string().optional(),
    theme: z.string().optional(), // Optional theme for this volume
    featured: z.boolean().default(false), // Highlight on archive page
    draft: z.boolean().default(false),
  }),
});

// Schema for Newsletter Articles (individual pieces within volumes)
const newsletterArticlesCollection = defineCollection({
  type: "content",
  schema: z.object({
    volumeNumber: z.number(), // Links to parent volume (e.g., 19)
    title: z.string(), // Article title
    description: z.string(), // Article summary
    section: z.enum([
      "Feature",
      "Community",
      "Updates",
      "Resources",
      "Interview",
      "Research",
      "Technology",
      "Other",
    ]), // Section within newsletter
    sectionOrder: z.number().optional(), // Order within volume (1, 2, 3...)
    heroImage: z.string().optional(),
    heroImageAlt: z.string().optional(),
    author: z.string().default("Languages 4 Team"),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false), // Can feature individual articles
    draft: z.boolean().default(false),
  }),
});

// Export collections
export const collections = {
  whatarel4: whatarel4Collection,
  "signature-collections": signatureCollectionsCollection,
  ancestors: ancestorsCollection,
  newsletters: newslettersCollection,
  "newsletter-articles": newsletterArticlesCollection,
};
