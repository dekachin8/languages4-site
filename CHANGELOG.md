# Changelog

All notable changes to the Languages 4 website will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### 🔴 Critical Priorities (Session 6)

**Mobile Responsive Fixes**

- [ ] Fix Venn diagram layout on mobile devices (WhyLanguages4Section.astro)
  - Review responsive behavior at 320px, 375px, 414px breakpoints
  - Fix circle positioning and overlap issues
  - Ensure text readability on small screens
  - Verify hover/touch interactions
  - Consider vertical stacking on smallest screens
- [ ] Fix mobile navigation overlap issue
  - Hide right sidebar on mobile (`hidden lg:block`)
  - Create mobile header with hamburger menu at top
  - Remove social icons from mobile menu
  - Test on real devices to verify no content overlap
  - File: `src/layouts/MainLayout.astro`

**Netlify Forms Backend Setup**

- [ ] Create form detection file: `public/forms/core-values-download.html`
- [ ] Verify Netlify Forms dashboard recognizes the form
- [ ] Test complete form submission flow
- [ ] Set up email notifications for new submissions
- [ ] Test PDF download trigger functionality
- [ ] Optional: Configure Zapier → Constant Contact integration
- [ ] Optional: Add automated thank you emails

---

### 🟡 High Priority (Pre-Launch Requirements)

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

- **0.5.0** (Jan 26): Homepage rebuild, testimonials, email capture
- **0.4.0** (Jan 20): Content migration (46 articles), gallery system
- **0.3.0** (Jan 19): Search, tags, archives, print styles
- **0.2.0** (Jan 18): Reading time, series nav, TOC, related posts, galleries
- **0.1.0** (Jan 17): View Transitions, RSS, pagination, social, newsletter
- **0.0.1** (Jan 15): Initial setup

---

_Format: [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)_  
_Versioning: [Semantic Versioning](https://semver.org/spec/v2.0.0.html)_
