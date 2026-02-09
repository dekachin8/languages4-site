// src/content/config.ts
import { defineCollection, z } from "astro:content";

// Schema for "What Are Languages 4?" blog
const whatarel4Collection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(), // ← ADD .coerce
    updatedDate: z.date().optional(),
    heroImage: z.string().optional(),
    heroImageAlt: z.string().optional(),
    cardImage: z.string().optional(),
    cardImageAlt: z.string().optional(),
    author: z.string().default("Languages 4 Team"),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    // Optional image gallery at bottom of article
    galleryImages: z
      .array(
        z.object({
          src: z.string(),
          alt: z.string(),
          caption: z.string().optional(),
        }),
      )
      .optional(),
  }),
});

// Schema for Signature Collections (multi-part series)
const signatureCollectionsCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(), // ← ADD .coerce
    updatedDate: z.date().optional(),
    heroImage: z.string().optional(),
    heroImageAlt: z.string().optional(),
    cardImage: z.string().optional(),
    cardImageAlt: z.string().optional(),
    seriesTitle: z.string(),
    seriesOrder: z.number().optional(),
    author: z.string().default("Languages 4 Team"),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    // Add this:
    galleryImages: z
      .array(
        z.object({
          src: z.string(),
          alt: z.string(),
          caption: z.string().optional(),
        }),
      )
      .optional(),
  }),
});

// Schema for Indigenous Ancestors profiles
const ancestorsCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(), // ← ADD .coerce
    updatedDate: z.date().optional(),
    heroImage: z.string().optional(),
    heroImageAlt: z.string().optional(),
    cardImage: z.string().optional(),
    cardImageAlt: z.string().optional(),
    ancestorName: z.string(),
    tribe: z.string().optional(),
    lifespan: z.string().optional(),
    author: z.string().default("Languages 4 Team"),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    // Add this:
    galleryImages: z
      .array(
        z.object({
          src: z.string(),
          alt: z.string(),
          caption: z.string().optional(),
        }),
      )
      .optional(),
  }),
});

// Schema for Newsletter Volumes - simplified link-based approach
const newslettersCollection = defineCollection({
  type: "data", // ← CHANGED from "content"
  schema: z.object({
    volumeNumber: z.number(),
    title: z.string(),
    summary: z.string(), // ← CHANGED from "description"
    pubDate: z.coerce.date(), // ← ADD .coerce
    theme: z.string().optional(),
    newsletterUrl: z.string(), // ← NEW: Link to Constant Contact
    coverImage: z.string().optional(),
    coverImageAlt: z.string().optional(),
    articles: z.array(
      z.object({
        // ← NEW: Article index
        title: z.string(),
        author: z.string(),
      }),
    ),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

// Schema for Newsletter Articles (individual pieces within volumes)
const newsletterArticlesCollection = defineCollection({
  type: "content",
  schema: z.object({
    volume: z.string(), // Add this - links to volume slug
    volumeNumber: z.number(), // Links to parent volume (e.g., 19)
    title: z.string(), // Article title
    description: z.string(), // Article summary
    pubDate: z.coerce.date(), // ← ADD .coerce // ADD THIS LINE
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
