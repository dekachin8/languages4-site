/**
 * Languages 4 Blog Migration Script (ES Module version)
 * Converts PHP/HTML blog posts to Astro-compatible Markdown
 *
 * Usage: node migrate-blog-posts.js [collection-name]
 * Example: node migrate-blog-posts.js whatarel4
 */

import fs from "fs";
import path from "path";
import { JSDOM } from "jsdom";
import TurndownService from "turndown";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ============================================
// CONFIGURATION
// ============================================

const CONFIG = {
  // Input directory (where your PHP/HTML files are)
  inputDir: "./blog",

  // Output directory (where markdown files will be created)
  outputDir: "./src/content",

  // Default collection if not specified
  defaultCollection: "whatarel4",

  // Image path mappings
  imagePaths: {
    old: [
      "/pages/assets/img/blog_photos/",
      "/pages/assets/img/blogheaders/",
      "../pages/assets/img/blog_photos/",
      "../pages/assets/img/blogheaders/",
    ],
    new: "/images", // Will be combined with collection name
  },
};

// ============================================
// IMAGE TRACKER
// ============================================

/**
 * Tracks all unique images found across all posts
 */
const imageTracker = {
  images: new Set(),

  addImage(imagePath) {
    if (imagePath && imagePath.startsWith("/images/")) {
      // Extract just the filename part
      const filename = imagePath.split("/").pop();
      this.images.add(filename);
    }
  },

  printSummary(collection) {
    if (this.images.size === 0) {
      console.log("\n📷 No images found");
      return;
    }

    console.log("\n📷 Image Migration Required:");
    console.log("=====================================");
    console.log(`Total unique images: ${this.images.size}\n`);
    console.log(`Copy these images to: /public/images/${collection}/\n`);

    const sortedImages = Array.from(this.images).sort();
    sortedImages.forEach((img) => {
      console.log(`  - ${img}`);
    });

    console.log("\n📋 Image Conversion Steps:");
    console.log(
      "1. Copy images from old site to /public/images/" + collection + "/"
    );
    console.log("2. Convert all .jpg/.png to .webp format");
    console.log("3. Keep the same filenames\n");
  },
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Extracts JSON-LD data from HTML
 */
function extractJSONLD(dom) {
  const scripts = dom.window.document.querySelectorAll(
    'script[type="application/ld+json"]'
  );

  for (let script of scripts) {
    try {
      const data = JSON.parse(script.textContent);
      if (data["@type"] === "Article") {
        return data;
      }
    } catch (e) {
      console.warn("Failed to parse JSON-LD:", e.message);
    }
  }

  return null;
}

/**
 * Extracts meta tag content
 */
function getMetaContent(dom, name) {
  const meta = dom.window.document.querySelector(
    `meta[name="${name}"], meta[property="${name}"]`
  );
  return meta ? meta.getAttribute("content") : "";
}

/**
 * Converts date string to ISO format
 */
function parseDate(dateString) {
  if (!dateString) return new Date().toISOString().split("T")[0];

  try {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  } catch (e) {
    return new Date().toISOString().split("T")[0];
  }
}

/**
 * Cleans and converts image paths
 */
function convertImagePath(imagePath, collection) {
  if (!imagePath) return "";

  // If path already has /images/collection/, return as-is
  if (imagePath.includes(`/images/${collection}/`)) {
    return imagePath;
  }

  // Remove full URLs (http:// or https://)
  let cleanPath = imagePath.replace(/^https?:\/\/[^\/]+\/?/, "");

  // Remove leading slashes and relative paths
  cleanPath = cleanPath.replace(/^\.\.\//, "").replace(/^\//, "");

  // Replace old paths with new collection-specific path
  CONFIG.imagePaths.old.forEach((oldPath) => {
    cleanPath = cleanPath.replace(
      oldPath.replace(/^\.\.\//, "").replace(/^\//, ""),
      ""
    );
  });

  // Remove any remaining path segments, keep just filename
  const filename = cleanPath.split("/").pop();

  // Convert to WebP
  const webpFilename = filename.replace(/\.(jpg|jpeg|png)$/i, ".webp");

  // Add collection-specific path
  return `${CONFIG.imagePaths.new}/${collection}/${webpFilename}`;
}
/**
 * Extracts tags from the tags section
 */
function extractTags(dom) {
  const tags = [];
  const tagLinks = dom.window.document.querySelectorAll(
    ".nav .btn-outline-secondary"
  );

  tagLinks.forEach((link) => {
    const tag = link.textContent.trim();
    if (tag && !tags.includes(tag)) {
      tags.push(tag);
    }
  });

  return tags;
}

/**
 * Extracts main article content
 */
function extractArticleContent(dom, collection) {
  const contentDiv = dom.window.document.querySelector(".col-lg-8 .mb-3");

  if (!contentDiv) {
    throw new Error("Could not find article content");
  }

  // Remove PHP includes and sidebar content
  const sidebarElements = contentDiv.querySelectorAll(
    ".col-lg-4, aside, .sidebar"
  );
  sidebarElements.forEach((el) => el.remove());

  // Remove elements we don't want in the markdown
  const elementsToRemove = [
    ".text-sans-serif.text-1200", // Date
    "h1", // Title (goes in frontmatter)
    ".pl-4.my-6.border-left", // Lead paragraph (goes in frontmatter as description)
  ];

  elementsToRemove.forEach((selector) => {
    const elements = contentDiv.querySelectorAll(selector);
    elements.forEach((el) => el.remove());
  });

  // Update image paths in content
  const images = contentDiv.querySelectorAll("img");
  images.forEach((img) => {
    const oldSrc = img.getAttribute("src");
    const newSrc = convertImagePath(oldSrc, collection);
    img.setAttribute("src", newSrc);
  });

  // Initialize Turndown for HTML to Markdown conversion
  const turndownService = new TurndownService({
    headingStyle: "atx",
    codeBlockStyle: "fenced",
    bulletListMarker: "-",
  });

  // Custom rule: Convert all headings to H2 (##) for consistent article structure
  turndownService.addRule("normalizeHeadings", {
    filter: ["h2", "h3", "h4", "h5", "h6"],
    replacement: function (content) {
      return "\n\n## " + content + "\n\n";
    },
  });

  // Custom rule for preserving image captions
  turndownService.addRule("imageWithCaption", {
    filter: function (node) {
      return (
        node.nodeName === "SMALL" &&
        node.previousElementSibling?.nodeName === "IMG"
      );
    },
    replacement: function (content) {
      return "\n*" + content + "*\n";
    },
  });

  // Convert to markdown
  return turndownService.turndown(contentDiv.innerHTML);
}

/**
 * Extracts all images for gallery
 */
function extractGalleryImages(dom, collection, cardImage) {
  const images = [];

  // Add card image first
  if (cardImage) {
    imageTracker.addImage(cardImage); // TRACK THIS IMAGE
    images.push({
      src: cardImage,
      alt: getMetaContent(dom, "og:image:alt") || "Article image",
    });
  }

  // Find all images in content
  const contentDiv = dom.window.document.querySelector(".col-lg-8 .mb-3");
  if (contentDiv) {
    const imgElements = contentDiv.querySelectorAll("img");

    imgElements.forEach((img) => {
      const src = convertImagePath(img.getAttribute("src"), collection);
      const alt = img.getAttribute("alt") || "";

      // Don't duplicate card image
      if (src !== cardImage) {
        // Try to find caption
        let caption = "";
        const nextEl = img.nextElementSibling;
        if (nextEl && (nextEl.tagName === "SMALL" || nextEl.tagName === "P")) {
          caption = nextEl.textContent.trim();
          // Remove common prefixes
          caption = caption.replace(/^\(?\d+\)?\s*/, "");
        }

        imageTracker.addImage(src); // TRACK THIS IMAGE
        images.push({ src, alt, caption: caption || undefined });
      }
    });
  }

  return images;
}

/**
 * Creates slug from title
 */
function createSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Generates frontmatter YAML
 */
function generateFrontmatter(data) {
  let yaml = "---\n";

  // Required fields
  yaml += `title: "${data.title.replace(/"/g, '\\"')}"\n`;
  yaml += `description: "${data.description.replace(/"/g, '\\"')}"\n`;
  yaml += `pubDate: ${data.pubDate}\n`;

  if (data.updatedDate) {
    yaml += `updatedDate: ${data.updatedDate}\n`;
  }

  // Images
  if (data.heroImage) {
    yaml += `heroImage: "${data.heroImage}"\n`;
    if (data.heroImageAlt) {
      yaml += `heroImageAlt: "${data.heroImageAlt}"\n`;
    }
  }

  if (data.cardImage) {
    yaml += `cardImage: "${data.cardImage}"\n`;
    if (data.cardImageAlt) {
      yaml += `cardImageAlt: "${data.cardImageAlt}"\n`;
    }
  }

  // Author
  yaml += `author: "${data.author}"\n`;

  // Tags
  if (data.tags && data.tags.length > 0) {
    yaml += "tags:\n";
    data.tags.forEach((tag) => {
      yaml += `  - "${tag.replace(/"/g, '\\"')}"\n`;
    });
  }

  // Gallery images (only if 3+)
  if (data.galleryImages && data.galleryImages.length >= 3) {
    yaml += "galleryImages:\n";
    data.galleryImages.forEach((img) => {
      yaml += `  - src: "${img.src}"\n`;
      yaml += `    alt: "${img.alt.replace(/"/g, '\\"')}"\n`;
      if (img.caption) {
        yaml += `    caption: "${img.caption.replace(/"/g, '\\"')}"\n`;
      }
    });
  }

  yaml += "---\n\n";
  return yaml;
}

/**
 * Processes a single blog post file
 */
function processFile(filePath, collection) {
  console.log(`\nProcessing: ${path.basename(filePath)}`);

  try {
    // Read file
    const html = fs.readFileSync(filePath, "utf-8");
    const dom = new JSDOM(html);

    // Extract JSON-LD data
    const jsonld = extractJSONLD(dom);

    if (!jsonld) {
      console.warn("⚠️  No JSON-LD found, skipping...");
      return null;
    }

    // Extract metadata
    const title = jsonld.headline || getMetaContent(dom, "title");
    const description =
      jsonld.description || getMetaContent(dom, "description");
    const author = jsonld.author?.name || "Languages 4 Team";
    const pubDate = parseDate(jsonld.datePublished);
    const updatedDate = jsonld.dateModified
      ? parseDate(jsonld.dateModified)
      : null;

    // Extract images
    const ogImage = getMetaContent(dom, "og:image");
    const cardImage = convertImagePath(ogImage, collection);
    const heroImage = cardImage; // Use same as card

    // Extract tags
    const tags = extractTags(dom);

    // Extract content
    const content = extractArticleContent(dom, collection);

    // Extract gallery images
    const galleryImages = extractGalleryImages(dom, collection, cardImage);

    // Create slug
    const slug = createSlug(title);

    // Prepare frontmatter data
    const frontmatterData = {
      title,
      description,
      pubDate,
      updatedDate,
      heroImage,
      heroImageAlt: title,
      cardImage,
      cardImageAlt: title,
      author,
      tags,
      galleryImages: galleryImages.length >= 3 ? galleryImages : undefined,
    };

    // Generate final markdown
    const markdown = generateFrontmatter(frontmatterData) + content;

    // Create output directory
    const outputPath = path.join(CONFIG.outputDir, collection);
    if (!fs.existsSync(outputPath)) {
      fs.mkdirSync(outputPath, { recursive: true });
    }

    // Write file
    const outputFile = path.join(outputPath, `${slug}.md`);
    fs.writeFileSync(outputFile, markdown, "utf-8");

    console.log(`✅ Created: ${outputFile}`);
    console.log(`   - Images: ${galleryImages.length} total`);
    console.log(`   - Gallery: ${galleryImages.length >= 3 ? "YES" : "NO"}`);
    console.log(`   - Tags: ${tags.length}`);

    return {
      slug,
      title,
      outputFile,
      imageCount: galleryImages.length,
    };
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
    return null;
  }
}

/**
 * Main execution
 */
function main() {
  console.log("🚀 Languages 4 Blog Migration Script");
  console.log("=====================================\n");

  // Get collection from command line argument or use default
  const collection = process.argv[2] || CONFIG.defaultCollection;
  console.log(`Collection: ${collection}\n`);

  // Check if input directory exists
  if (!fs.existsSync(CONFIG.inputDir)) {
    console.error(`❌ Input directory not found: ${CONFIG.inputDir}`);
    console.log(
      "\nPlease create a /blog folder and place your PHP/HTML files there."
    );
    process.exit(1);
  }

  // Get all PHP and HTML files (excluding subfolders)
  const files = fs
    .readdirSync(CONFIG.inputDir)
    .filter((file) => {
      const fullPath = path.join(CONFIG.inputDir, file);
      const isFile = fs.statSync(fullPath).isFile();
      const isValidExtension = file.endsWith(".php") || file.endsWith(".html");
      return isFile && isValidExtension;
    })
    .map((file) => path.join(CONFIG.inputDir, file));

  if (files.length === 0) {
    console.log("⚠️  No PHP or HTML files found in /blog directory");
    process.exit(0);
  }

  console.log(`Found ${files.length} file(s) to process\n`);

  // Process each file
  const results = files
    .map((file) => processFile(file, collection))
    .filter(Boolean);

  // Summary
  console.log("\n=====================================");
  console.log("✨ Migration Complete!\n");
  console.log(`Processed: ${results.length} of ${files.length} files`);
  console.log(`Output: ${CONFIG.outputDir}/${collection}/`);

  const withGallery = results.filter((r) => r.imageCount >= 3).length;
  console.log(`\nGalleries: ${withGallery} articles have 3+ images`);

  // PRINT IMAGE SUMMARY
  imageTracker.printSummary(collection);

  console.log("\n📋 Next Steps:");
  console.log("1. Review generated markdown files");
  console.log("2. Copy images to /public/images/" + collection + "/");
  console.log("3. Convert images to WebP format");
  console.log("4. Test in Astro dev server");
  console.log("5. Adjust any formatting as needed\n");
}

// Run the script
main();
