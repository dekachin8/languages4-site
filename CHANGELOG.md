# Changelog

All notable changes to the Languages 4 website rebuild will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [Unreleased]

### Planned - Phase 4 (Future Enhancements)

- Newsletter CTAs throughout site
- Author system (if multiple authors needed)
- Language tag system (unique to mission)
- Content migration of 50+ blog posts
- Print styles refinement (hide "Related Articles" section)

---

## [2026-01-15] - Phase 3 Complete: Discovery & User Experience Features ✅

### Phase 3: Discovery Features (5 of 5) ✅

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
- **Performance:** Indexes all pages during build, searches pages in ~0.033 seconds

#### Added - Tag Filtering System

- **Tag Filtering** for all 3 main collections (whatarel4, signature-collections, ancestors)
- Created `/src/components/TagFilter.astro` - Reusable tag filtering component
- Modified `/src/pages/whatarel4/[...page].astro` - Added tag filtering
- Modified `/src/pages/signature-collections/[...page].astro` - Added tag filtering
- Modified `/src/pages/ancestors/[...page].astro` - Added tag filtering
- **Features:**
  - URL-based filtering (e.g., `/whatarel4?tag=indigenous`)
  - "All Tags" button to clear filters
  - Active tag highlighting
  - Tag counts displayed
  - Alphabetically sorted tags
  - Responsive grid layout
  - Maintains pagination when filtering

#### Added - Enhanced Social Sharing

- **Enhanced Social Media Integration** across site
- Updated `/src/components/SocialShare.astro` - Now includes 8 sharing options
- Added TikTok to homepage hero social section
- Added TikTok to side navigation bar
- **Sharing Options:**
  - Facebook
  - Twitter
  - LinkedIn
  - Reddit ← NEW
  - Email
  - WhatsApp
  - SMS
  - Copy Link ← NEW (with visual feedback)
- **Follow Options (Homepage & Navigation):**
  - Instagram
  - LinkedIn
  - Facebook
  - Twitter
  - TikTok ← NEW
- **Styling:**
  - Icon-only design (consistent with homepage)
  - Horizontal layout with proper spacing
  - Color: teal (`text-primary-900`)
  - Hover: orange (`hover:text-accent-600`) with scale effect
  - 20x20 icon size
  - "Share this article:" / "Follow Us:" labels

#### Added - Archive Pages

- **Date-Based Archives** for whatarel4 and newsletters
- Created `/src/utils/archiveUtils.ts` - Archive utility functions
- Created `/src/pages/whatarel4/archive/[year].astro` - Yearly archives
- Created `/src/pages/whatarel4/archive/[year]/[month].astro` - Monthly archives
- Created `/src/pages/newsletters/archive/[year].astro` - Newsletter yearly archives
- **Features:**
  - Browse posts by year (e.g., `/whatarel4/archive/2024`)
  - Browse posts by month (e.g., `/whatarel4/archive/2024/06`)
  - Year navigation buttons
  - Month navigation buttons
  - Breadcrumb navigation on monthly pages
  - Article counts per year/month
  - Responsive article grid (3 columns)
  - Back navigation links
- **Utility Functions:**
  - Group posts by year
  - Group posts by year/month
  - Filter posts by date
  - Get available years and months
  - Month name conversion
- **Note:** Archive pages are ready but will be more useful after content migration with real publication dates

#### Added - Print Styles

- **Print-Optimized CSS** for all articles
- Added inline print styles to `/src/layouts/MainLayout.astro`
- **Print Features:**
  - Hides navigation bar (right-side fixed nav)
  - Hides footer
  - Hides hero images (saves ink)
  - Hides interactive elements (buttons, social sharing, tags)
  - Full-width article content
  - Clean typography (11-20pt sizes)
  - Black & white friendly
  - Letter size (8.5" x 11") with 0.5" margins
  - Proper page breaks (no orphaned headings)
  - Professional document layout
- **Status:** ~95% complete - Navigation hidden, minor refinements needed for "Related Articles" section

#### Changed - Navigation & Social Integration

- Added search link as 2nd menu item in navigation
- Added TikTok to social media icons (@l4_languages4) in both navigation and homepage
- Updated animation delays for navigation items
- Centered home icon in navigation menu

### Fixed

- Print styles properly hide fixed right navigation bar
- Print styles remove padding compensating for navigation
- Copy Link button provides visual feedback (icon turns orange for 2 seconds)

### Notes

**Phase 3 Summary:**

- ✅ All 5 discovery and UX features implemented
- ✅ Search functionality ready for production
- ✅ Tag filtering works across all collections
- ✅ Archive pages infrastructure complete
- ✅ Print styles functional (95% complete)
- ✅ Social sharing enhanced with Reddit and Copy Link
- ✅ TikTok integration complete across all locations

**Testing Notes:**

- Search only works in production builds (`npm run build` then `npm run preview`)
- Archive pages will populate automatically once content with various dates is migrated
- Print styles tested and functional (press Ctrl+P to preview)

---

## [2026-01-14] - Phase 1 & 2 Complete: Foundation & Content Enhancement

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

#### Added - Social Sharing (Initial)

- Created `/src/components/SocialShare.astro` with 6 options
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
  - `whatarel4` collection (main blog - 50+ articles to migrate)
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

### Changed

- **Hero Section Rebuilt in Pure Tailwind:**
  - Converted all CSS to inline Tailwind utilities
  - Implemented `rotate-[20deg]` custom rotation for showcase mosaic
  - Responsive breakpoints: 2 columns (mobile), 3 columns (tablet), 4 columns (desktop)

---

## [2026-01-12] - Navigation & Footer Complete

### Added

- Modern right-side fixed navigation component
- Triple-pulse animated hamburger menu
- Slide-out menu panel with smooth animations
- Clean 3-column footer with contact info and social links

---

## [2026-01-11] - Foundation & Design System

### Added

- Complete Tailwind CSS v3 design system
- 9 brand colors with full scales (50-950)
- Fluid responsive typography system

### Performance

- Achieved 99/100 desktop performance score
- Achieved 100/100 SEO score

---

## Project Status Summary

### Completed (Production Ready)

**Phase 1: Foundation (5 features) ✅**

- View Transitions
- RSS Feed
- Pagination System
- Social Sharing (initial)
- Newsletter System Architecture

**Phase 2: Content Enhancement (4 features) ✅**

- Reading Time
- Series Navigation
- Table of Contents
- Related Posts

**Phase 3: Discovery (5 features) ✅**

- Search Functionality (Pagefind)
- Tag Filtering System
- Enhanced Social Sharing (8 options + TikTok)
- Archive Pages (Year/Month)
- Print Styles (~95% complete)

**Total: 14 Major Features Complete**

### Next Steps

**Immediate Priority:**

1. Content migration (50+ blog posts from .php/HTML to markdown)
2. Add frontmatter metadata to all posts
3. Verify all images and links
4. Add newsletter volume content

**Future Enhancements (Phase 4):**

1. Newsletter CTAs throughout site
2. Author system (if needed)
3. Language-specific tags
4. Final print styles polish
5. Performance optimization
6. Accessibility audit

---

_This changelog follows semantic versioning and documents all significant changes to the project._
