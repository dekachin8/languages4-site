# Changelog

All notable changes to the Languages 4 website rebuild will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [Unreleased]

### Planned - Phase 3 (Remaining)

- Tag/Category filtering system
- Archive pages (by date)
- Print styles for articles
- Newsletter CTAs
- Author system (if multiple authors needed)
- Language tag system (unique to mission)

---

## [2026-01-14] - Phase 3 Started: Search Functionality Complete

### Phase 3: Discovery Features (1 of 4) ✅

#### Added - Search Functionality (Pagefind)

- **Pagefind Search Integration** - Static, fast, client-side search
- Created `/src/components/Search.astro` - Custom branded search component
- Created `/src/pages/search.astro` - Dedicated search page
- Modified `/src/components/Navigation.astro` - Added search link (2nd position, below home)
- Modified `/src/layouts/MainLayout.astro` - Added Pagefind scripts for production
- Updated `package.json` build script to run Pagefind indexing after Astro build
- Package installed: `pagefind@1.4.0`
- **Features:**
  - Instant search as you type
  - Searches all 4 content collections (whatarel4, signature-collections, ancestors, newsletters)
  - Highlighted search terms in results
  - Branded UI matching site design system
  - Mobile-responsive interface
  - Works with View Transitions
  - ~10KB bundle size
  - Zero backend required
  - Fully static/client-side
- **Performance:** Indexes all pages during build, searches 12 pages with 454 words in 0.033 seconds

#### Changed - Navigation Menu

- Added search link as 2nd menu item (below home icon)
- Centered home icon in navigation menu
- Updated animation delays for 8 menu items

### Notes

**Search Implementation:**

- Search page accessible at `/search`
- Pagefind runs automatically after each `npm run build`
- Search index stored in `dist/pagefind/` (not `dist/_pagefind/` - v1.0 format)
- Only works in production builds (`npm run build` then `npm run preview`)
- Does not work in development mode (`npm run dev`)
- Will become more useful as content is migrated (currently indexes 12 pages)

---

## [2026-01-14] - Phase 1 & 2 Complete: Content Features & Navigation

### Phase 1: Foundation Features ✅

#### Added - View Transitions

- **Astro View Transitions** for smooth SPA-like page navigation
- Modified `/src/layouts/MainLayout.astro` to include ClientRouter component
- Fixed `/src/components/Navigation.astro` to reinitialize after transitions using `astro:after-swap`
- Fixed `/src/components/ShowcaseLoader.astro` hero animation to work with View Transitions
- All interactive components now properly handle page transitions

#### Added - RSS Feed

- Complete RSS 2.0 feed at `/rss.xml`
- Aggregates all 4 content collections (whatarel4, signature-collections, ancestors, newsletters)
- Sorted by publication date (newest first)
- Includes full metadata, categories, authors
- Package installed: `@astrojs/rss`

#### Added - Pagination System

- 12 posts per page across all collections
- Created `/src/pages/whatarel4/[...page].astro` - Main blog pagination
- Created `/src/pages/signature-collections/[...page].astro` - Collections pagination
- Created `/src/pages/ancestors/[...page].astro` - Profiles pagination
- Created `/src/pages/newsletters/[...page].astro` - Newsletter volumes pagination
- Features: page numbers, prev/next buttons, responsive grids, collection-specific info boxes

#### Added - Social Sharing

- Enhanced `/src/components/SocialShare.astro` with WhatsApp and SMS
- 6 sharing options: Facebook, Twitter, LinkedIn, Email, WhatsApp, SMS
- Shares current page URL and title

#### Added - Newsletter System Architecture

- 3-level system: Volumes → Articles → Individual content
- Created `/src/content/config.ts` schemas for newsletters and newsletter-articles
- Created `/src/pages/newsletters/[slug].astro` - Volume landing pages
- Created `/src/pages/newsletters/[volume]/[slug].astro` - Individual articles
- Features: volume navigation, table of contents, section grouping

### Phase 2: Content Enhancement Features ✅

#### Added - Reading Time Component

- Created `/src/components/ReadingTime.astro`
- Calculates reading time from word count (200 words/minute)
- Displays with clock icon
- Works across all article templates

#### Added - Series Navigation Component

- Created `/src/components/SeriesNavigation.astro`
- Shows "Part X of Y" for multi-part series
- Prev/Next buttons for series navigation
- Used in signature-collections only
- Auto-sorts by series order

#### Added - Table of Contents Component

- Created `/src/components/TableOfContents.astro`
- Auto-generates from H2/H3 headings in markdown
- Sticky positioning (follows scroll)
- Creates URL-safe anchor IDs
- Matches sidebar design system

#### Added - Related Posts Component

- Created `/src/components/RelatedPosts.astro`
- Finds 3 related articles by shared tags
- Scores by relevance (more shared tags = higher)
- Shows at bottom of articles
- Works across all 3 main collections

#### Changed - Sidebar Component

- Modified `/src/components/Sidebar.astro`
- Newsletter section now shows on ALL collection pages (was whatarel4 only)
- Consistent spacing (space-y-8) across all sections

### Fixed

- TableOfContents styling now matches sidebar design system
- Proper spacing between TOC and sidebar components
- Fixed duplicate article tags in ancestors/[slug].astro
- Corrected RelatedPosts collection parameter in ancestors template
- Added sticky wrapper for TableOfContents in all templates
- Fixed navigation hamburger menu not working in subfolders (View Transitions issue)
- Fixed hero animation not reloading when returning to homepage (View Transitions issue)

---

## [2026-01-14] - Content Architecture & Tailwind Hero Complete

### Added

- **Astro Content Collections** - Type-safe content management system
  - `whatarel4` collection (main blog - 30+ articles to migrate)
  - `signature-collections` collection (multi-part series)
  - `ancestors` collection (Indigenous leader profiles)
  - `newsletters` collection (volume containers)
  - `newsletter-articles` collection (individual newsletter articles)
- **Reusable Components:**
  - ArticleCard.astro - Universal article card for all content types
  - ArticleHero.astro - Full-width hero with background image overlay
  - Sidebar.astro - Popular articles + tags for all article pages
- **Blog System Pages:**
  - `/whatarel4/` - Main blog listing with 2-column grid + sidebar
  - `/whatarel4/[slug]` - Individual blog post template
  - `/signature-collections/` - Series-based collection listing
  - `/signature-collections/[slug]` - Individual collection articles
  - `/ancestors/` - Indigenous ancestor profiles listing
  - `/ancestors/[slug]` - Individual ancestor profiles
  - `/newsletters/` - Newsletter volumes listing
  - `/newsletters/[slug]` - Individual volume pages
  - `/newsletters/[volume]/[slug]` - Individual newsletter articles
- **Simple Pages:**
  - `/about` - Mission, values, team
  - `/smash` - Partner page with external link
- **File Structure:**
  - Complete content collections architecture in `/src/content/`
  - Dynamic routing with `[slug].astro` for all content types
  - Type-safe schemas with frontmatter validation

### Changed

- **Hero Section Rebuilt in Pure Tailwind:**
  - Converted all CSS to inline Tailwind utilities
  - Implemented `rotate-[20deg]` custom rotation for showcase mosaic
  - Removed `landing-page.css` dependency (commented out in MainLayout)
  - Responsive breakpoints: 2 columns (mobile), 3 columns (tablet), 4 columns (desktop)
  - Large screen optimization with `max-w-[1750px]` and `-top-[65%]`
- **Content Collections Structure:**
  - Renamed `blog` collection to `whatarel4` to match brand
  - Renamed `collections` to `signature-collections` for clarity

### Fixed

- Resolved showcase image 404 errors
- Fixed responsive grid display issues
- Corrected `ladies_haka.webp` path
- Mobile layout now uses flat (non-rotated) 2-column grid
- Fixed file location issues (moved from `/content/pages/` to `/src/pages/`)

---

## [2026-01-12] - Navigation & Footer Complete

### Added

- Modern right-side fixed navigation component
- Triple-pulse animated hamburger menu (pulse-pulse-pulse pattern with 5-second pause)
- Slide-out menu panel with smooth animations
- Click-outside-to-close functionality
- Hamburger toggle (click to open/close)
- Escape key to close menu
- Clean 3-column footer with contact info and social links
- Comprehensive project documentation (README.md)
- Repository cleanup (.gitignore)

### Changed

- Disabled Netlify auto-deploy to conserve build credits
- Updated MainLayout to use new Navigation and Footer components

### Fixed

- Menu now properly slides from right side next to navigation bar
- Hamburger button now visible with clear three-line icon
- Menu closes on link click, outside click, escape key, and hamburger toggle

---

## [2026-01-11] - Foundation & Design System

### Added

- Complete Tailwind CSS v3 design system
- 9 brand colors with full scales (50-950)
- Fluid responsive typography system
- Custom spacing, shadows, and transitions
- Font weight scale and letter spacing
- Line height options and max-width constraints
- Z-index layering system
- Aspect ratio helpers
- Container configuration with responsive padding

### Changed

- Migrated from WordPress + Bootstrap to Astro + Tailwind
- Resolved Tailwind v3/v4 dependency conflicts
- Configured proper Astro + Tailwind integration

### Performance

- Achieved 99/100 desktop performance score
- Achieved 100/100 SEO score
- Set up automatic sitemap generation
- Configured structured data and Open Graph tags

---

## Notes

### Architecture Decisions

- **Content Collections over Database:** Static site generation for performance and SEO
- **Tailwind over Custom CSS:** Maintainability and design system consistency
- **Component Reusability:** Single ArticleCard component serves all content types
- **SEO-First Approach:** Proper meta tags, structured data, automatic sitemaps
- **View Transitions:** SPA-like experience while maintaining SSG benefits
- **Type Safety:** TypeScript schemas for all content collections

### Current Status

**Completed Features (Production Ready):**

- ✅ View Transitions across entire site
- ✅ RSS feed aggregating all content
- ✅ Pagination for all 4 collections
- ✅ Social sharing (6 platforms)
- ✅ Newsletter 3-level system
- ✅ Reading time estimates
- ✅ Series navigation for multi-part articles
- ✅ Auto-generated table of contents
- ✅ Related posts recommendations
- ✅ Responsive sidebar with Popular/Tags/Newsletters

**Ready for Content Migration:**

- 50+ blog posts need conversion from .php/HTML to markdown
- Newsletter volumes ready for content
- Signature collections ready for multi-part series
- Ancestor profiles ready for Indigenous leader content

### Credits Management

- Each production deploy: 15 credits
- Monthly limit: 300 credits (free tier)
- Strategy: Manual deploys only at milestones
- Current usage: Monitor to stay under limit

---

## Next Steps

### Immediate - Phase 3

1. **Search Functionality** - Pagefind integration for site-wide search
2. **Tag Filtering** - Filter articles by tags on archive pages
3. **Archive Pages** - Browse by date/month
4. **Print Styles** - Optimized printing for articles

### Content Migration

1. Convert existing 50+ blog posts to markdown
2. Add frontmatter metadata to all posts
3. Organize into appropriate collections (whatarel4, signature-collections, ancestors)
4. Verify all images and links work
5. Add newsletter volume content

### Polish & Optimization

1. Add newsletter CTAs throughout site
2. Implement author system (if needed)
3. Add language-specific tags (unique to mission)
4. Performance optimization pass
5. Accessibility audit

---

_This changelog follows semantic versioning and documents all significant changes to the project._
