/**
 * Languages 4 Metadata Fixer Script - LOCAL VERSION
 * Generates JSON-LD from existing meta tags without API calls
 */

import fs from "fs";
import path from "path";
import { JSDOM } from "jsdom";

const CONFIG = {
  inputDir: "D:\\l4-site\\blog",
  outputDir: "D:\\l4-site\\blog_fixed",
};

// Keyword mappings based on common topics
const KEYWORD_PATTERNS = {
  "food|sovereignty|agriculture|farming|traditional food": [
    "food sovereignty", "traditional agriculture", "Indigenous food systems",
    "cultural food practices", "seed preservation", "traditional farming"
  ],
  "code talker|military|war|veteran": [
    "Code Talkers", "Indigenous military history", "Native American veterans",
    "language in warfare", "Navajo Code Talkers", "Indigenous heroes"
  ],
  "elder|empowering|keeper|wisdom": [
    "elder knowledge", "language keepers", "intergenerational learning",
    "traditional wisdom", "community elders", "oral tradition"
  ],
  "lacrosse|sport|game|athletic": [
    "lacrosse", "Creator's Game", "Indigenous sports", "traditional games",
    "Native American athletics", "cultural sports"
  ],
  "star wars|movie|film|dub": [
    "Indigenous media", "language in film", "Navajo Star Wars",
    "pop culture revitalization", "multimedia language learning"
  ],
  "wellbeing|health|mental|wellness": [
    "Indigenous wellness", "mental health", "cultural wellbeing",
    "healing through language", "community health"
  ],
  "land|environment|ecosystem|steward|nature": [
    "land-based learning", "environmental stewardship", "Indigenous ecology",
    "traditional ecological knowledge", "place-based education"
  ],
  "ceremony|ritual|spiritual|sacred": [
    "ceremonial language", "spiritual practices", "sacred traditions",
    "ritual preservation", "cultural ceremonies"
  ],
  "story|narrative|oral|tale": [
    "oral tradition", "storytelling", "Indigenous narratives",
    "cultural stories", "traditional tales"
  ],
  "curriculum|education|teaching|learning|school": [
    "Indigenous curriculum", "language education", "cultural pedagogy",
    "immersive learning", "community-based education"
  ],
  "technology|software|platform|digital|app": [
    "language technology", "digital revitalization", "educational software",
    "Indigenous tech", "language learning apps"
  ],
  "peach|fruit|orchard|garden|harvest": [
    "traditional horticulture", "Navajo peaches", "Indigenous agriculture",
    "food preservation", "cultural farming"
  ],
  "mission|values|core|trust|ethics": [
    "organizational values", "Indigenous partnership", "ethical collaboration",
    "community trust", "mission-driven work"
  ],
  "speech|recognition|pronunciation|audio": [
    "speech recognition", "pronunciation tools", "language technology",
    "audio learning", "speaking practice"
  ],
  "generation|family|cross-generational|intergenerational": [
    "intergenerational learning", "family language transmission",
    "cross-generational teaching", "language nests"
  ],
  "sovereignty|rights|self-determination": [
    "language sovereignty", "Indigenous rights", "self-determination",
    "linguistic rights", "cultural autonomy"
  ],
  "forest|tree|regeneration|restoration": [
    "forest restoration", "Indigenous land management", "environmental healing",
    "traditional ecology", "reforestation"
  ],
  "fish|fishing|ocean|marine|hawaiian": [
    "traditional fishing", "marine stewardship", "Hawaiian practices",
    "Indigenous fisheries", "ocean conservation"
  ],
  "kwetlal|cultivation|lekwungen": [
    "traditional cultivation", "Lekwungen practices", "Indigenous horticulture",
    "cultural plant knowledge", "traditional food cultivation"
  ]
};

// Base keywords that apply to all articles
const BASE_KEYWORDS = [
  "Indigenous language revitalization",
  "language preservation",
  "cultural heritage",
  "Languages 4",
  "Native American languages"
];

function hasJSONLD(html) {
  const dom = new JSDOM(html);
  const scripts = dom.window.document.querySelectorAll(
    'script[type="application/ld+json"]'
  );
  for (let script of scripts) {
    try {
      const data = JSON.parse(script.textContent);
      if (data["@type"] === "Article") return true;
    } catch (e) {}
  }
  return false;
}

function extractMetadata(html) {
  const dom = new JSDOM(html);
  const doc = dom.window.document;

  const getMeta = (names) => {
    for (const name of names) {
      const meta = doc.querySelector(
        `meta[name="${name}"], meta[property="${name}"]`
      );
      if (meta) {
        const content = meta.getAttribute("content");
        if (content) return content;
      }
    }
    return "";
  };

  return {
    title: doc.querySelector("title")?.textContent || "",
    description: getMeta(["description", "og:description", "twitter:description"]),
    ogImage: getMeta(["og:image", "og:image:secure_url", "twitter:image"]),
    ogUrl: getMeta(["og:url", "twitter:url"]),
  };
}

function extractDateFromFilename(filename) {
  // Match patterns like 10.23.23 or 4.15.24 in filename
  const match = filename.match(/(\d{1,2})\.(\d{1,2})\.(\d{2,4})/);
  if (match) {
    let [, month, day, year] = match;
    if (year.length === 2) {
      year = parseInt(year) > 50 ? `19${year}` : `20${year}`;
    }
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  }
  return new Date().toISOString().split("T")[0];
}

function generateKeywords(title, description) {
  const text = `${title} ${description}`.toLowerCase();
  const keywords = new Set(BASE_KEYWORDS);

  for (const [pattern, words] of Object.entries(KEYWORD_PATTERNS)) {
    const regex = new RegExp(pattern, "i");
    if (regex.test(text)) {
      words.forEach(w => keywords.add(w));
    }
  }

  // Return 10-12 keywords
  return Array.from(keywords).slice(0, 12);
}

function generateJSONLD(meta, filename) {
  const datePublished = extractDateFromFilename(filename);
  const keywords = generateKeywords(meta.title, meta.description);

  // Clean up title - remove "Languages 4 |" or "Languages 4 -" prefix if present
  let headline = meta.title
    .replace(/^Languages\s*4\s*[\|\-]\s*/i, "")
    .trim();

  // Generate description if missing or too short
  let description = meta.description;
  if (!description || description.length < 50) {
    description = `Explore ${headline} - an article about Indigenous language revitalization and cultural preservation from Languages 4.`;
  }
  // Truncate if too long
  if (description.length > 200) {
    description = description.substring(0, 197) + "...";
  }

  // Fix image URL
  let imageUrl = meta.ogImage || "https://www.languages4.com/pages/assets/img/logo_languages4.webp";
  if (imageUrl.startsWith("../")) {
    imageUrl = "https://www.languages4.com/" + imageUrl.replace(/^\.\.\//, "");
  }
  if (!imageUrl.startsWith("http")) {
    imageUrl = "https://www.languages4.com/" + imageUrl.replace(/^\//, "");
  }

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": headline,
    "description": description,
    "image": imageUrl,
    "author": {
      "@type": "Person",
      "name": "Tim O'Hagan",
      "jobTitle": "Founder & President",
      "email": "tim@languages4.com",
      "affiliation": {
        "@type": "Organization",
        "name": "Languages 4"
      }
    },
    "publisher": {
      "@type": "Organization",
      "name": "Languages 4",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.languages4.com/pages/assets/img/logo_languages4.webp"
      }
    },
    "datePublished": datePublished,
    "dateModified": datePublished,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.languages4.com/blog/${filename}`
    },
    "keywords": keywords
  };
}

function insertJSONLD(html, jsonld) {
  const headCloseIndex = html.indexOf("</head>");
  if (headCloseIndex === -1) throw new Error("Could not find </head> tag");

  const jsonldScript = `
    <!-- ===============================================-->
    <!--    JSON-LD (Structured Data)                   -->
    <!-- ===============================================-->

    <script type="application/ld+json">
${JSON.stringify(jsonld, null, 2)}
    </script>

`;
  return (
    html.slice(0, headCloseIndex) + jsonldScript + html.slice(headCloseIndex)
  );
}

async function processFile(inputPath, outputPath) {
  const filename = path.basename(inputPath);
  const html = fs.readFileSync(inputPath, "utf-8");

  if (hasJSONLD(html)) {
    fs.writeFileSync(outputPath, html, "utf-8");
    return { status: "skipped", reason: "already has JSON-LD" };
  }

  const meta = extractMetadata(html);
  const jsonld = generateJSONLD(meta, filename);
  const updatedHtml = insertJSONLD(html, jsonld);

  fs.writeFileSync(outputPath, updatedHtml, "utf-8");

  return {
    status: "processed",
    headline: jsonld.headline,
    keywords: jsonld.keywords.length
  };
}

async function main() {
  console.log("=====================================");
  console.log("Languages 4 Metadata Fixer - LOCAL");
  console.log("=====================================\n");

  if (!fs.existsSync(CONFIG.outputDir)) {
    fs.mkdirSync(CONFIG.outputDir, { recursive: true });
    console.log(`Created output directory: ${CONFIG.outputDir}\n`);
  }

  const files = fs.readdirSync(CONFIG.inputDir)
    .filter(f => f.endsWith(".html") || f.endsWith(".php"));

  console.log(`Found ${files.length} HTML files to process\n`);

  const results = { processed: 0, skipped: 0, errors: [] };

  for (let i = 0; i < files.length; i++) {
    const filename = files[i];
    const inputPath = path.join(CONFIG.inputDir, filename);
    const outputPath = path.join(CONFIG.outputDir, filename);

    console.log(`[${i + 1}/${files.length}] ${filename}`);

    try {
      const result = await processFile(inputPath, outputPath);

      if (result.status === "skipped") {
        console.log(`   ⏭️  Skipped (${result.reason})`);
        results.skipped++;
      } else {
        console.log(`   ✅ Generated: "${result.headline.substring(0, 50)}..." (${result.keywords} keywords)`);
        results.processed++;
      }
    } catch (error) {
      console.log(`   ❌ Error: ${error.message}`);
      results.errors.push({ file: filename, error: error.message });
    }
  }

  console.log("\n=====================================");
  console.log("SUMMARY");
  console.log("=====================================");
  console.log(`✅ Processed: ${results.processed}`);
  console.log(`⏭️  Skipped:   ${results.skipped}`);
  console.log(`❌ Errors:    ${results.errors.length}`);

  if (results.errors.length > 0) {
    console.log("\nErrors:");
    results.errors.forEach(e => console.log(`  - ${e.file}: ${e.error}`));
  }

  console.log(`\nOutput saved to: ${CONFIG.outputDir}`);
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
