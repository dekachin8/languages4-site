# Changelog

All notable changes to the Languages 4 website will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.7.0] - 2026-04-01

### Site Audit: Bug Fixes, SEO, Performance & Redirects

#### Fixed — Critical
- **Broken hero modal CTAs** — missing `<a` opening tag in `ImageStoryModal.astro` caused all 4 homepage modal buttons to do nothing
- **Performance regression (PageSpeed 85→47)** — `<link rel="preconnect" crossorigin>` on Typekit caused browser to open a CORS connection, forcing a second non-CORS connection for the stylesheet, delaying font load and spiking CLS to 1.0; fixed by removing `crossorigin`
- **Modals outside `</MainLayout>`** in `index.astro` — 4 `<ImageStoryModal>` components were orphaned outside the layout, causing hydration issues; moved inside layout with `transition:persist`

#### Fixed — High
- **Core Values article missing on About page** — slug typo `piller` → `pillar` in `about.astro` lookup prevented 3rd article from appearing
- **Event listener leak** on homepage modals — replaced bare `addEventListener` calls with AbortController pattern, preventing duplicate handlers across Astro View Transitions
- **Date field mismatch** in `FeaturedStoriesCarousel.astro` — `publishDate`/`date` corrected to `pubDate` (matches content collection schema); carousel was silently failing to sort articles
- **LinkedIn URL** corrected from `linkedin.com/companies/` → `linkedin.com/company/` in Navigation, Footer, SchemaOrg, and 9 blog posts
- **Syntax errors**: double `>>` in `search.astro`, unclosed class attribute in `SocialShare.astro`

#### Fixed — Medium
- **OG image paths** — `/images/hero-social-share.jpg` and `/images/about-social-share.jpg` didn't exist; both now fall back to `og-default.jpg`
- **`/trial` links** updated to `/contact` in `about.astro` and `PlatformShowcase.astro`
- **Broken `/smash` nav link** removed from Navigation (page not yet built)
- **Dev comments** removed from `src/content/config.ts` (migration notes left in production code)
- **Stale sitemap filter** removed from `astro.config.mjs` (referenced deleted DESIGN_SYSTEM page)

#### Added
- **Security headers** in `public/_headers`: `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `Strict-Transport-Security`
- **`/forms/*` noindex** — prevents old Netlify form confirmation pages from being indexed
- **`/privacy` and `/terms` placeholder pages** — live at those URLs with "coming soon" messaging
- **16 missing redirects** in `public/_redirects` for early 2023 blog posts appearing as 404s in Google Search Console

#### SEO
- **www canonical redirect** (`https://languages4.com/* → https://www.languages4.com/:splat 301!`) — eliminates 19 "Duplicate without canonical" entries in Search Console
- **`/trial` and `/smash` redirects** added to `_redirects`
- **`/whatarel4?tag=*` canonical + noindex** headers added to `_headers`
- **Tag query string pages** marked noindex to prevent duplicate content
- **DESIGN_SYSTEM.md** moved from `src/pages/` to project root — was being deployed as a public page and indexed

#### Pending (user action required)
- Enable `font-display: swap` in Adobe Typekit kit settings (fonts.adobe.com)
- Supply OG social share images: `public/images/hero-social-share.jpg` and `about-social-share.jpg` (1200×630px)
- Provide legal copy for `/privacy` and `/terms` pages
- Build out `/smash` Smash Education partnership page when ready

---

## [Unreleased]

### Pushed to origin/main, awaiting next Netlify deploy
- `57af165` **Desktop mosaic CLS fix** — `aspect-[3/2]` on the 12 empty-src placeholder containers reserves vertical space before `ShowcaseLoader` fills them. Eliminates the post-deploy 0.04-0.06 CLS regression (root cause confirmed via PerformanceObserver: row 4 of the mosaic collapsed and expanded during image load). Also compensated parent positioning (`-top-[45%]` at lg/xl, `-top-[60%]` at 2xl) and swapped the Mohawk/buffalo hero card from row-2 col-1 → col-2 for better visibility past the hero card.
- `415e829` **CSP cleanup** — removed `upgrade-insecure-requests` from Report-Only CSP; that directive is spec-meaningless in Report-Only and was throwing a console warning on every page load, costing Best Practices points.

Not deployed today to conserve monthly Netlify build credits. Will batch with additional cleanup in the next session (see the plan doc's "Next-session cleanup batch").

### Known regressions from 0.9.0 deploy (partially addressed, see above)
- Desktop PageSpeed 97 → 95 (CLS 0 → 0.062, LCP 1.0s → 1.3s) — **root cause identified + fix pushed (57af165); pending deploy.**
- Best Practices 100 → 92 (both viewports) — partial cleanup pushed (415e829); the remaining ~6-point gap is the CSP Report-Only violations themselves. Full path: deploy current fixes → capture violations from browser console → tighten `public/_headers` allowlist → promote to enforced CSP.
- GitHub Actions `actions/checkout@v4` + `actions/setup-node@v4` use deprecated Node.js 20 runtime (retired June 2026). Bump both to `@v5`. (CI-only change; does not consume a Netlify deploy credit.)
- 1 ESLint false positive in `PlatformShowcase.astro` (`activities` declared in `define:vars` appears unused to ESLint, is actually used inside the injected script).

### Pending (user action required)
- Change Adobe Fonts font-display from `optional` → `fallback` (fonts.adobe.com → Edit Kit)
- Supply OG social share images: `public/images/hero-social-share.jpg` and `about-social-share.jpg` (1200×630px)
- Provide legal copy for `/privacy` and `/terms` pages
- Build out `/smash` Smash Education partnership page
- Draft land acknowledgment wording (Sprint 3; Tim to draft from community relationship)
- Decide on CMS direction (Decap vs Sanity vs stay-git) for Sprint 3 scope

---

## [0.9.0] - 2026-04-17

### Audit Sprint 1 + Sprint 2 tooling: security, SEO depth, a11y, brand hero, CI foundation

**Results deployed to production:**
- Mobile PageSpeed **93** (unchanged — no regression from the sweeping site changes)
- Desktop PageSpeed 95 (down from 97; two tractable regressions flagged above)
- Production vulnerabilities: **11 (1 critical, 6 high) → 0**
- Pre-existing TypeScript errors: **133 → 0** (first time `astro check` surfaces zero issues)
- `<span lang="…">` wraps across the content corpus: **0 → 92** (10 articles)
- Schema.org types emitted: **1 → 5**
- 301-redirect regression coverage: **0 tests → 14 smoke tests** (Playwright, ~2s runtime against production)
- GitHub Actions CI: **none → running on every push + PR**
- Legacy WP/migration code removed: **~51,000 lines**
- 8 clean commits pushed from `7cb8b7e` to `7f128fa`

---

#### Security
- **CSP Report-Only** added to `public/_headers` with allowlists for self + Typekit + GA4 + Clarity. `script-src`, `style-src`, `img-src`, `font-src`, `connect-src`, `frame-ancestors`, `object-src 'none'`, `upgrade-insecure-requests`. Report-Only today; enforce in a future release after 1-2 weeks of production data.
- **HSTS bumped** to preload-eligible: `max-age=63072000; includeSubDomains; preload`
- **Cross-Origin-Opener-Policy: same-origin** and **Cross-Origin-Resource-Policy: same-site** added
- **`npm audit fix`** — resolved 11 vulnerabilities (1 critical, 6 high) in the build-time dependency tree
- **Removed `public/projectStatus.txt`** — internal session notes were being served publicly

#### SEO / Structured Data
- **New `ArticleSchema.astro`** — BlogPosting JSON-LD emitted on all four collection `[slug]` templates (whatarel4, signature-collections, ancestors, newsletters/[volume]/[slug])
- **New `Breadcrumbs.astro`** — visible breadcrumb trail + BreadcrumbList JSON-LD on article pages
- **Organization schema expanded** in `SchemaOrg.astro` with `foundingDate: 2023`, `founder`, `knowsAbout` (7 topic entries), TikTok in `sameAs`, Canada added to `areaServed`
- **Person @graph on /about** — JSON-LD for Tim O'Hagan, Lorelei O'Hagan, Jennie Korneychuk, Abraham Bravo with job titles, employer, expertise keywords
- **SoftwareApplication schema on homepage** — describes the Languages 4 platform with application category, operating systems, features, educational audience, offers
- **Article-page H1 bug fixed** across 3 templates (`whatarel4`, `signature-collections`, `ancestors`): the real article title is now the `<h1>`; the former generic brand label (e.g., "Signature Collections: Language & Culture") demoted to an eyebrow above. Previously H1 was the generic label and the real title was an H2 — a meaningful SEO miss.
- **Contact URL consolidated** — `/contact` is canonical; `contact-us.astro` deleted; `/contact-us` and `/contact-us/` added as 301 redirects in `_redirects`

#### Accessibility — WCAG 2.2 AA + motion safety
- **Skip-to-content link** added to `MainLayout.astro` (`focus:not-sr-only` treatment) with matching `id="main-content"` on `<main>`
- **Global `:focus-visible` styling** in `global.css` — 2px cream-200 outline, 2px offset. Keyboard users now see clear focus anywhere on the site.
- **Menu focus trap + ESC-to-close** in `Navigation.astro` — Tab/Shift+Tab cycle within the open menu; ESC closes and returns focus to the triggering hamburger. AbortController pattern prevents listener leaks across View Transitions.
- **`prefers-reduced-motion` support** on six autoplay surfaces: hero image cycler, testimonial slider, PlatformShowcase film strip, GenerationsShowcase split-screen, FeaturedStoriesCarousel, Navigation hamburger pulse + menu-link slide-in
- **Pause/play controls** on hero image cycler (mobile) and testimonial slider — `aria-pressed` + icon toggle + separate `userPaused` flag distinct from the hover-pause behavior

#### Cultural authenticity — lang-attribute pass
- **92 `<span lang="…">` wraps** applied across 10 articles for Indigenous-language terms in body prose:
  - Kanien'kéha (moh) — Mohawk place/program names
  - Diné Bizaad, Diné didzétsoh (nv) — Navajo language and peach name
  - ʻĀina, ʻōlelo Hawaiʻi, Kupuna, moʻolelo, kaulana mahina, inoa ʻāina, wahi pana, lāʻau lapaʻau, loʻi, waʻa, kalo, ua, kaona, Hawaiʻi (haw) — Hawaiian
  - Kwetlal, Lekwungen (str) — Lekwungen/SENĆOŦEN
  - Xaxli'p, Tmixw, Úxwalmixw, xusum (lil) — Stʼatʼimc (Lillooet)
  - Haudenosaunee (moh), Anishinaabe (oj), Baggataway (oj), Tewaaraton (moh) — lacrosse article
  - Haipažaža Pȟežuta (lkt) — Lakota phrase
  - Ocheti Sakowin Tha Makhoche (dak) — Dakota (default) per Tim's rule "Dakota unless explicitly Lakota"
  - Māori, Te Reo Māori (mi); Inuit, Inuktitut (iu); manoomin (oj)
- **README section added** — "Writing Content: Indigenous Language Tagging" with BCP 47 code dictionary (11 languages), Dakota/Lakota default rule, and future-automation roadmap
- **`LANG_AUDIT_FINDINGS.md`** captures the full scan + deferred items (frontmatter wrapping, ImageStoryModal set:html, remark plugin)

#### Brand / Hero redesign
- **New Q&A structure** — question chip "WHAT ARE LANGUAGES 4?" → wordmark "Languages 4" (`text-4xl md:text-8xl`, neue-kabel) → four purposes ("Reclamation · Revitalization · Preservation · Communication")
- **The hero mirrors the circular L4 logo unfolded linearly** — the logo has L4 in the center of a ring carrying those four words; the hero delivers the same idea in typography-first format
- **Responsive adaptations**: mobile uses a 2×2 grid for the four purposes (reinforces the "4" count visually); desktop shows them inline with middle-dot separators
- **Combined CTA** — desktop button reads "Schedule 30-minute Call · Platform Walkthrough · Bring Your Questions"; mobile uses the shorter "Schedule 30-minute Platform Walkthrough". Replaces the old SaaS-demo CTA "Schedule Your Free Demonstration" with partnership-framing copy
- **Supporting line** unified into a single paragraph: "Long-term partnerships with **Indigenous communities**: custom software and land-based curriculum, grounded in **language sovereignty**."
- **`BRAND_STORY_NOTES.md`** — captures design thinking, copy decisions, and four angle options for a future relaunch article

#### Code quality — Sprint 2 tooling foundation
- **`netlify.toml`** created — pinned build command + Node 20 environment
- **`package.json` engines** — `"node": ">=20.0.0"` ensures CI/Netlify use compatible runtimes
- **New scripts**: `typecheck` (astro check), `format`, `format:check`, `lint`, `lint:fix`, `test:redirects`
- **Prettier + prettier-plugin-astro** installed with `.prettierrc` and `.prettierignore` (format pass deferred to avoid a massive diff)
- **ESLint 9.x + plugins** — `@eslint/js`, `typescript-eslint`, `eslint-plugin-astro`, `eslint-plugin-jsx-a11y`, `globals`. Flat config in `eslint.config.mjs`. Triage pass resolved 12 errors; remaining 9 warnings are documented pragmatic cases.
- **Playwright @playwright/test** installed (no browser binaries needed — HTTP request context only)
- **14 redirect smoke tests** in `tests/redirects.spec.ts` cover representative URL shapes (WP `.php`, `.html`, `/Contact_Us/`, catch-all `/blog/*`, etc.) — all passing against production
- **GitHub Actions CI** (`.github/workflows/ci.yml`) — runs typecheck + lint + build on every push to `main` and every PR; concurrency group cancels superseded runs; 10-minute timeout
- **Typecheck cleanup** — 133 pre-existing errors → 0. Highlights: `Astro.props as Props` pattern applied to 9 templates, arrow-function conversions in modal reinit code to preserve type narrowing, `parentVolume.slug` → `.id` in newsletter template (fixed an actual broken link in the rendering), shared component Props expanded (ArticleCard, ArticleHero, SocialShare) to accept collection-specific metadata.
- **8 unused imports removed** (CollectionEntry in utilities, TagFilter in pagination templates, TestimonialPullQuote in index)

#### Code cleanup
- **Logo file renamed** — `public/images/logo-sparrow-invert.svg` → `logo-languages4.svg` (removed a misleading carryover from a pre-Astro Bootstrap "Sparrow" template)
- **Migration scripts deleted** — `fix-metadata*.js` (3 files), `migrate-blog-posts.js`, `pre-launch-check.*` (2 files), `blog/` and `blog_fixed/` directories
- **Unused production dependencies uninstalled** — `@anthropic-ai/sdk`, `jsdom`, `turndown` (only used by the now-deleted migration scripts)
- **Legacy WordPress CSS deleted** from `public/` — `bootstrap-4.4.1.css`, `Languages4_bootstrap.css`, `Languages4_theme.css`, `landing-page.css`, `styles/print.css` + empty dir
- **Orphan component `TestimonialBottomSections.astro` deleted** (145 LOC, unreferenced)
- **`.gitignore` updated** — added `*.xmp` (Lightroom sidecars) and `test-results/` (Playwright artifacts)
- **Invalid `h3:contains()` jQuery selector removed** from print CSS (`MainLayout.astro`)
- **Mobile menu overflow fixed** — `Navigation.astro:76` changed `w-[440px]` → `w-[min(440px,100vw)]` so 440px menu no longer overflows 375px viewports
- **README live URL corrected** from old Netlify preview to `https://www.languages4.com`

#### Sprint/planning documentation (committed alongside code)
- **`AUDIT_SPRINT_PLAN.md`** — full audit findings + 3-sprint execution plan + Sprint 2 tiered tasking + acceptance criteria + deferred items
- **`LANG_AUDIT_FINDINGS.md`** — lang-tag scan results + decision log
- **`BRAND_STORY_NOTES.md`** — hero design thinking + article angle options

---

## [0.8.0] - 2026-04-16

### Performance: GSC Cleanup, Image Optimization & Mobile LCP

**Results:**
- Mobile PageSpeed: 78 → **93** performance score
- Mobile LCP: 4.7s → **2.6s** (−2.1s)
- Mobile TBT: 220ms → **40ms** (−82%)
- Mobile SI: 3.1s → **2.6s**
- Desktop: **97** performance, FCP 0.3s, LCP 1.0s (unchanged, excellent)

#### Performance — Critical
- **Deferred analytics to `requestIdleCallback`** — Clarity + GA4 scripts moved from `<head>` to end of `<body>`, loaded via `requestIdleCallback({ timeout: 4000 })`. Were synchronously blocking main thread before LCP. (`BaseHead.astro`, `MainLayout.astro`)
- **Removed `backdrop-blur-lg` from hero card** — CSS backdrop-filter forces GPU compositing before child elements can be marked as painted; hero image is a child of this container, so LCP was blocked until blur completed. Replaced `bg-white/95 backdrop-blur-lg` with `bg-white`. (`index.astro`)
- **Async Typekit font loading** — replaced render-blocking `<link rel="stylesheet">` with preload/onload async pattern + `fetchpriority="low"` so font fetch doesn't compete with LCP image. (`MainLayout.astro`)

#### Performance — High
- **Mobile hero LCP image fixes** (`index.astro`):
  - Removed `transition-opacity duration-1000` from initial HTML (deferred via `requestIdleCallback` after LCP paint)
  - Added `fetchpriority="high"` + `loading="eager"` + `width="600" height="417"` for faster decode
  - Added `type="image/webp"` to preload link
  - Added `loading="lazy"` to hero cycling images 2–4 (hidden on initial paint)
- **`<slot name="head">` repositioned before BaseHead** — page-specific preload hints now fire before any analytics scripts execute in `<head>`
- **ShowcaseLoader skips on mobile** — `if (window.innerWidth < 1024) return` prevents 21 showcase images (~300KB) from downloading on mobile where the mosaic is `display:none`

#### Performance — Medium
- **`loading="lazy"` added to all below-fold and hidden images**:
  - 4 desktop mosaic fixed images (in `hidden lg:flex` div — `display:none` on mobile, so never load)
  - 5 FeaturedStoriesCarousel article images (below fold on all mobile screens)
  - 2 GenerationsShowcase background images (well below fold)
- **CLS fix** — added explicit `width`/`height` to 4 fixed hero images in desktop mosaic to prevent flex reflow when images load at new aspect ratios after resize (CLS was 1.034, now 0)

#### Performance — Image Resizing
- **Showcase random images** — 21 images batch-resized to 500px wide WebP (8-bit source)
- **Showcase fixed images** — 4 hero images resized to 600px wide
- **Platform showcase images** — 5 images: 1200–1920px → 600px (183KB → 66KB for largest, −59% total folder)
- **Generations images** — 10 images: 900–1100px → 600px wide
- **Article images** — yurok_canoe, sunset_canoe, Mountainous_Village recompressed

#### SEO / GSC Cleanup
- **Missing `_redirects` rules added**: `/articles/*`, `/Contact_Us/*`, `/tags/*`, `/contact/www.languages4.com`, plus specific article slug fix
- **Old WordPress sitemap** removed from GSC; Astro `sitemap-index.xml` confirmed healthy (89 URLs)
- **"Page with redirect"** group (55 URLs) validated in GSC — all working correctly
- **404s** (106 pages): mostly old Bootstrap template + WordPress URLs; covered by catch-all redirects
- **Duplicate canonical** (47 pages): Bootstrap template pages redirecting to `/` — resolving as Google re-crawls

#### Pending — font-display setting
- User changed Adobe Fonts from `swap` → `fallback` → `optional` during session for testing
- Recommendation: set back to `fallback` for best balance of performance and visual quality

---

---

## [0.6.0] - 2026-01-28

### Added - Session 6: Mobile Polish & Generations Showcase

- **Mobile Responsive Fixes**:
  - Venn diagram now scales properly on mobile (192px → 224px → 256px circles)
  - Responsive text sizing and borders for small screens
  - Container padding prevents edge cutoff
- **Favicon Implementation**:
  - Languages 4 sparrow logo now appears in browser tabs
  - SVG format for crisp display at all sizes
- **Languages 4 Generations Interactive Showcase**:
  - Split-screen design with inverse shading (light children, dark adults)
  - Auto-cycling through 5 parallel learning examples (5-second intervals)
  - **Interactive draggable slider** on center divider (desktop only)
  - Smooth GPU-accelerated animations with `will-change` optimization
  - Progress dots and manual navigation (prev/next arrows)
  - Category indicator showing current example
  - Two CTAs: "Start Your Free Trial" + "Download Generations Guide"
  - PDF download modal (no email required)
  - Mobile responsive (stacks vertically, shows connection banner)
- **Enhanced Core Values Form**:
  - Added phone number field (optional)
  - Added tribal affiliation field (optional)
  - Implemented honeypot spam protection
  - Netlify Forms backend configured with email notifications

### Changed

- Navigation menu link sizing now consistent across all items
- Messaging improved: "Parallel Learning Paths for Every Generation, Every Project"
- Form detection file created for Netlify Forms recognition

### Fixed

- Missing `<a` tag in GenerationsShowcase CTAs section
- Mobile navigation text wrapping issues
- Signature Collections menu link now matches other items (`text-xl md:text-2xl`)

### Technical

- New files:
  - `src/utils/generationsExamples.ts` - Data structure for generations content
  - `src/components/GenerationsShowcase.astro` - Main showcase component
  - `public/forms/core-values-download.html` - Form detection file
- Slider functionality:
  - Removes CSS transitions during drag for instant feedback
  - Uses `will-change` for rendering optimization
  - Auto-resets to center after 2 seconds of inactivity
  - Constrained between 20%-80% drag range
  - Pauses auto-play while dragging
- Form submissions now trigger email notifications to tim@languages4.com

### Performance

- Generations slider optimized with GPU acceleration
- Smooth 60fps dragging on desktop and mobile
- Lightweight implementation (~5KB JavaScript)

## [0.5.0] - 2026-01-26

### 🟡 High Priority (Pre-Launch Requirements)

- [ ] Responsive breakpoint testing and polish (1024px-1440px range)
  - Test at common breakpoints: 1024px, 1280px, 1366px, 1440px, 1920px
  - Adjust hero section left/right ratio for medium screens
  - Optimize CTA button sizing and spacing
  - Review image mosaic layout at constrained widths
  - Ensure proper breathing room for all content sections
  - File: `src/pages/index.astro` and hero components

**About Page Completion**

- [ ] Add leadership section (Tim O'Hagan profile, photo, bio)
- [ ] Write company mission and vision statements
- [ ] Integrate core values content (link to existing blog post)
- [ ] Add team members section (if applicable)
- [ ] Write company history and founding story
- [ ] Include contact information
- [ ] Add supporting photos and imagery
- [ ] URL: `/about`

**Homepage Polish & Optimization**

- [ ] Add testimonial pull-quotes as section breakers
- [ ] Review and optimize section order and flow
- [ ] Add scroll animations and interactions
- [ ] Optimize all images for performance
- [ ] A/B test CTA button placement
- [ ] Integrate analytics tracking (Google Analytics, Microsoft Clarity)
- [ ] Complete mobile optimization beyond navigation fixes

**Newsletter System Content Migration**

- [ ] Create Volume 1-19 landing pages with descriptions
- [ ] Migrate all historical newsletter articles to markdown
- [ ] Organize articles by sections (Feature, Community, Updates, etc.)
- [ ] Add volume cover images
- [ ] Create volume themes and descriptions
- [ ] Build newsletter archive index page
- [ ] Integrate newsletter signup (Constant Contact)
- [ ] Test cross-navigation between volumes and articles
- [ ] URLs: `/newsletters`, `/newsletters/volume-X`, `/newsletters/volume-X/article-slug`

---

### 🟢 Medium Priority (Phase 4 Enhancements)

**Additional PDF Download Modals**

- [ ] Add modal for Languages4_Project_Timeline.pdf
- [ ] Add modal for Languages4_Representation_Technology.pdf
- [ ] Add modal for Languages4_Achievement.pdf
- [ ] Add modal for Languages4_Highlights_and_Benefits.pdf
- [ ] Reuse existing modal system for consistency
- [ ] Track download analytics to measure popularity

**Testimonial Pull-Quotes Integration**

- [ ] Place pull-quotes between homepage sections
- [ ] Strategic placement: after What We Do, before Why L4
- [ ] Test left/center/right alignments
- [ ] Add to About page
- [ ] Add to future service/feature pages
- [ ] Components ready: `TestimonialPullQuote.astro`, `testimonials.ts`

**Advanced Features (Phase 4)**

- [ ] Author system for multi-author attribution
- [ ] Advanced analytics integration (Google Analytics, Microsoft Clarity)
- [ ] Language-specific tags and filters
- [ ] Additional email capture forms throughout site
- [ ] Newsletter CTAs on all article pages
- [ ] Case studies and success stories section
- [ ] Resources and downloads page
- [ ] FAQ page
- [ ] Services/pricing page (if applicable)
- [ ] Community features evaluation (comments, forums)

**Content Expansion (Phase 5)**

- [ ] Continue blog post migration (if more exist)
- [ ] Add additional ancestor profiles
- [ ] Expand signature collections series
- [ ] Create educational resources library
- [ ] Add video content (if available)
- [ ] Build photo galleries (community events, projects)
- [ ] Partner and client showcase pages

**Polish & Optimization (Phase 6)**

_Accessibility Improvements (Target: 95+ Score)_

- [ ] Full keyboard navigation audit
- [ ] Screen reader testing across all pages
- [ ] Color contrast verification
- [ ] ARIA labels comprehensive review

_Mobile Optimization_

- [ ] Performance tuning for 95+ mobile score
- [ ] Touch target sizing verification
- [ ] Mobile-specific feature enhancements

_SEO Enhancements_

- [ ] Meta descriptions for all pages
- [ ] Expanded schema markup implementation
- [ ] Internal linking strategy development
- [ ] Image alt text comprehensive audit
- [ ] URL structure review and optimization

_Performance Optimization_

- [ ] Image lazy loading review and refinement
- [ ] Critical CSS optimization
- [ ] Font loading strategy improvement
- [ ] Third-party script audit and cleanup

_Print Styles Refinement_

- [ ] Hide "Related Articles" section in print
- [ ] Perfect page break positioning
- [ ] Add logo/branding to printed pages

---

### 🔵 Low Priority (Future Enhancements)

**Nice to Have Features**

- [ ] Dark mode support
- [ ] Language switcher for multilingual content
- [ ] PDF generation for individual articles
- [ ] Social media feed integration
- [ ] Events calendar system
- [ ] Job postings page
- [ ] Press and media page
- [ ] Partner portal (if needed)
- [ ] Testimonial submission form for collecting new testimonials
- [ ] Detailed success stories page with case studies

---

### 📋 Session 6 Goals

**Primary Focus:**

1. Fix mobile Venn diagram layout (critical UX)
2. Fix mobile navigation overlap (critical UX)
3. Complete Netlify Forms backend setup

**Secondary Focus:**

- Complete About L4 page content
- Add testimonial pull-quotes to homepage
- Homepage polish and refinement

**Stretch Goals:**

- Begin newsletter volume setup
- Add additional download modals
- Integrate analytics tracking

---

### 📝 Content Needed

**From Tim:**

- Leadership bios and professional photos
- Company history and founding story
- Newsletter volume content (19 volumes of articles)
- Partner logos (if applicable)
- Detailed service descriptions
- Process and methodology documentation
- Additional testimonials (if available)
- Success stories and case studies

**Technical Decisions Required:**

- Newsletter signup integration approach (Constant Contact API vs embedded form)
- Analytics platform selection (Google Analytics, Microsoft Clarity, or both)
- Contact form handling strategy
- Video hosting solution (if video content planned)
- Community features implementation (yes/no decision)

---

### 📦 Available PDF Downloads

**Currently Active:**

1. ✅ Languages4_Core_Values.pdf (modal implemented)

**Ready to Implement:** 2. Languages4_Generations.pdf 3. Languages4_Project_Timeline.pdf 4. Languages4_Achievement.pdf 5. Languages4_Representation_Technology.pdf 6. Languages4_Highlights_and_Benefits.pdf

---

### ⏱️ Estimated Timeline

- **Session 6:** Mobile fixes + Netlify Forms setup (2-3 hours)
- **Session 7:** About page + Homepage polish (2-3 hours)
- **Session 8:** Newsletter content migration (2-3 hours)
- **Session 9+:** Phase 4-6 enhancements (ongoing)

---

### 🎯 Overall Progress

**Foundation Complete:** ~95%

- Homepage structure with 4 major sections ✅
- Testimonial system fully functional ✅
- Email capture modal with Netlify Forms ✅
- 46 articles migrated with galleries ✅
- 15+ feature systems deployed ✅

**In Progress:**

- Mobile responsive fixes
- Netlify Forms backend configuration

**Next Phase:**

- Core page content (About, Newsletter)
- Polish and optimization
- Content expansion

---

## [0.5.0] - 2026-01-26

### Added - Session 5: Homepage Rebuild & Testimonials

- **Featured Stories Carousel**: Auto-rotating carousel with 5 weighted articles (70% recent, 30% legacy)
  - Smart fallback timeframe logic (6→12→18 months)
  - 3D tilt transitions (rotateY ±15deg)
  - Auto-rotation: 8 seconds, pauses on hover
  - Three color-coded collection buttons (teal, blue, orange)
- **What We Do Section**: Three service pillars + 5 platform principles
  - Innovative Technology (teal): Speech recognition, AR, 3D modeling
  - Authentic Media (orange): Heritage documents, animations, recordings
  - When & Where (blue): Cloud-based, multi-platform, 9-12 month delivery
  - Platform features banner with 5 core principles
- **Why Languages 4 Section**: Three core values with interactive Venn diagram
  - Language Sovereignty (teal circle)
  - Innovation (orange circle)
  - Trustworthiness (green circle)
  - Interactive hover effects on circles
  - Partnership commitment banner
  - **PDF Download Modal** with Netlify Forms email capture
- **Testimonial System**: Complete reusable component architecture
  - Central data storage in `src/utils/testimonials.ts`
  - TypeScript interfaces for type safety
  - Avatar system with color-coded initials by role:
    - Teachers: Teal (#183e4b)
    - Elders: Green (#74a892)
    - Students: Orange (#c7522a)
    - Administrators: Blue (#005485)
    - Community: Gray
  - Three display components:
    - `TestimonialCard.astro` - Versatile card with variants
    - `TestimonialPullQuote.astro` - Large quotes for section breaks
    - `TestimonialSlider.astro` - Auto-rotating carousel
  - Real testimonials from 6 language teachers (SMASH Education adapted)
  - Featured testimonials system with fallback logic
- **Download Modal with Email Capture**:
  - Netlify Forms integration for lead capture
  - Modal popup with name, email, organization fields
  - Honeypot spam protection
  - Automatic PDF download after submission
  - Success message with auto-close
  - Privacy statement included

### Changed

- Homepage structure completely rebuilt with scroll sections
- Testimonials use avatar initials instead of photos for consistency
- Collection badges color-coded (teal=whatarel4, blue=signature-collections, orange=ancestors)
- "View All Stories" button replaced with three collection-specific buttons

### Fixed

- **Critical**: Case-sensitive filename issue breaking Netlify builds
  - `WhyLanguages4section.astro` renamed to `WhyLanguages4Section.astro`
  - Windows case-insensitive vs Linux case-sensitive conflict resolved
- Import path corrections: `../data/testimonials` → `../utils/testimonials.ts`
- Testimonial component imports now consistent across all files
- Featured testimonials fallback to first 3 if none marked as featured

### Technical

- New file structure:
  - `src/components/FeaturedStoriesCarousel.astro`
  - `src/components/WhatWeDoSection.astro`
  - `src/components/WhyLanguages4Section.astro`
  - `src/components/TestimonialCard.astro`
  - `src/components/TestimonialPullQuote.astro`
  - `src/components/TestimonialSlider.astro`
  - `src/utils/testimonials.ts`
- Weighted content algorithm for carousel (70% recent, 30% legacy)
- Helper functions: `getFeaturedTestimonials()`, `getTestimonialsByCategory()`, `getRandomTestimonials()`, `getInitials()`
- Color mapping utility: `categoryColors` object for avatar backgrounds

## [0.4.0] - 2026-01-20

### Added - Session 4: Content Migration & Gallery System

- AI-powered metadata generation for 31 articles using Claude API
- Gallery system rollout to ancestors and signature-collections
- Tag count display across all collections
- Article image galleries with 3+ image threshold

### Changed

- "More Articles" section limited to 8 articles (improved UX)
- Better pagination flow: 4 Latest + 8 More = 12 per page

### Fixed

- ReadingTime component crash with undefined content
- Defensive guards for optional parameters
- Netlify deployment errors
- Tag counts showing 0 (utility function not imported)

### Content

- **46 articles migrated** across 3 collections:
  - whatarel4: 36 articles
  - signature-collections: 8 articles
  - ancestors: 2 articles

## [0.3.0] - 2026-01-19

### Added - Phase 3: Discovery & Polish (5 Features)

- Search functionality using Pagefind static search
- Tag filtering system with URL-based navigation
- Archive pages (browse by year/month)
- Print styles for professional document layout
- Enhanced social integration (TikTok + Reddit)

### Changed

- Social sharing expanded from 6 to 8 platforms
- Archive navigation improved with year/month structure

## [0.2.0] - 2026-01-18

### Added - Phase 2: Content Enhancement (5 Features)

- Reading time calculation (auto-calculated)
- Series navigation for multi-part content
- Table of contents (auto-generated from headings)
- Related posts based on tag relevance
- Article image gallery (3+ image threshold)

### Changed

- Gallery component reusable across collections
- Related posts use tag-based algorithm

## [0.1.0] - 2026-01-17

### Added - Phase 1: Foundation (5 Features)

- View Transitions for SPA-like navigation
- RSS feed aggregating all 4 collections
- Pagination system (12 posts per page)
- Social sharing (8 platforms + copy link)
- Newsletter system (3-level architecture)

### Technical

- Astro 4.x framework
- Tailwind CSS 3.x
- Content Collections (type-safe)
- WebP image optimization

### Performance

- Desktop: 99/100 Lighthouse score
- Mobile: 92/100 Lighthouse score
- SEO: 100/100
- Best Practices: 100/100

## [0.0.1] - 2026-01-15

### Initial Setup

- Project initialization
- Basic site structure
- Content collections defined
- Deployment to Netlify

---

## Version History Summary

- **0.8.0** (Apr 16): GSC cleanup, full performance overhaul — mobile 78→93, LCP 4.7s→2.6s
- **0.7.0** (Apr 1): Site audit — bug fixes, SEO, security headers, redirects
- **0.6.0** (Jan 28): Mobile polish, Generations showcase, Netlify Forms
- **0.5.0** (Jan 26): Homepage rebuild, testimonials, email capture
- **0.4.0** (Jan 20): Content migration (46 articles), gallery system
- **0.3.0** (Jan 19): Search, tags, archives, print styles
- **0.2.0** (Jan 18): Reading time, series nav, TOC, related posts, galleries
- **0.1.0** (Jan 17): View Transitions, RSS, pagination, social, newsletter
- **0.0.1** (Jan 15): Initial setup

---

_Format: [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)_  
_Versioning: [Semantic Versioning](https://semver.org/spec/v2.0.0.html)_
