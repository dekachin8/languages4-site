# Languages 4 Website Rebuild

> Marketing website for Languages 4 - Indigenous language reclamation through custom software and land-based curriculum.

**Live Site:** https://wonderful-meringue-8520b4.netlify.app  
**Framework:** Astro + Tailwind CSS  
**Deployment:** Netlify (manual deploys to conserve credits)

---

## 🎯 Project Status

### ✅ Phase 1 Complete: Foundation Features

**View Transitions**

- [x] Astro View Transitions for smooth page navigation
- [x] Fixed all interactive components to work with transitions
- [x] Navigation menu reinitializes properly
- [x] Hero animations work on return visits

**RSS Feed**

- [x] Complete RSS 2.0 feed at `/rss.xml`
- [x] Aggregates all 4 content collections
- [x] Production-ready for RSS readers

**Pagination**

- [x] whatarel4 blog (12 posts per page)
- [x] signature-collections (12 posts per page)
- [x] ancestors profiles (12 posts per page)
- [x] newsletters volumes (12 posts per page)
- [x] Page numbers, prev/next navigation

**Social Sharing**

- [x] 6 platforms: Facebook, Twitter, LinkedIn, Email, WhatsApp, SMS
- [x] Integrated on all article pages

**Newsletter System**

- [x] 3-level architecture (Volumes → Articles → Content)
- [x] Volume landing pages with table of contents
- [x] Individual newsletter article pages
- [x] Cross-collection promotion

---

### ✅ Phase 2 Complete: Content Enhancement Features

**Reading Time**

- [x] Auto-calculates from word count
- [x] Displays with clock icon
- [x] Works on all article templates

**Series Navigation**

- [x] "Part X of Y" display
- [x] Prev/Next buttons for multi-part series
- [x] Implemented in signature-collections

**Table of Contents**

- [x] Auto-generates from H2/H3 headings
- [x] Sticky positioning (follows scroll)
- [x] Matches sidebar design system
- [x] Click to jump to sections

**Related Posts**

- [x] Finds 3 similar articles by tags
- [x] Scores by relevance
- [x] Shows at bottom of articles
- [x] Works across all collections

**Sidebar Enhancement**

- [x] Popular Articles
- [x] Tags
- [x] Past Newsletter Issues (on all pages)
- [x] Consistent spacing and design

---

### 📋 Phase 3 Planned: Discovery Features

**Search & Filtering**

- [ ] Pagefind integration for site-wide search
- [ ] Tag filtering on archive pages
- [ ] Category browsing

**Archive Pages**

- [ ] Browse by date/month
- [ ] Archive navigation

**Polish**

- [ ] Print styles for articles
- [ ] Newsletter CTAs throughout site
- [ ] Author system (if multiple authors)
- [ ] Language-specific tags

---

### 🚧 Content Migration Ready

**All Systems Ready For:**

- [ ] 50+ blog posts (PHP/HTML → Markdown)
- [ ] Newsletter volumes (19 volumes + articles)
- [ ] Signature collection series
- [ ] Ancestor profile content

---

## 🎨 Design System

### Brand Colors

- **Primary (Teal):** `#183e4b` - Main brand color
- **Accent (Orange):** `#c7522a` - CTAs and highlights
- **Blue:** `#005485` - Links and secondary actions
- **Red:** `#d74a49` - Alerts
- **Green:** `#74a892` - Success states
- **Neutrals:** Gray scale for UI
- **Warm Accents:** Cream `#fbf2c4`, Wheat `#e5c185`

### Typography

- **Display Font:** Neue Kabel (Adobe Typekit) - Headings
- **Body Font:** Bahnschrift / system fonts - Body text
- **Fluid Sizing:** `text-hero` (40-80px), `text-display` (32-56px), etc.

### Key Utilities

- **Shadows:** `shadow-brand`, `shadow-brand-teal`, `shadow-brand-orange`
- **Transitions:** `duration-brand` (200ms), `ease-brand`
- **Border Radius:** `rounded-brand` (6px)
- **Spacing:** Custom scale with brand-specific values

---

## 🚀 Development

### Local Development

```bash
npm run dev
# Opens http://localhost:4321
```

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Deploy to Netlify

**Auto-deploy is disabled.** To deploy:

1. Push changes to GitHub: `git push origin main`
2. Go to Netlify dashboard → Trigger deploy manually
3. Deploy only at milestones to conserve build credits

---

## 📁 Project Structure

```
languages4-site/
├── public/              # Static assets
│   ├── images/         # Site images
│   │   ├── showcase/   # Hero section images
│   │   │   ├── fixed/  # Hero images (always shown)
│   │   │   └── random/ # Rotating community images
│   │   ├── blog/       # Blog post images
│   │   ├── signature-collections/ # Collection images
│   │   ├── ancestors/  # Ancestor profile images
│   │   └── newsletters/ # Newsletter images
├── src/
│   ├── components/     # Reusable components
│   │   ├── Navigation.astro        # Right-side nav + hamburger
│   │   ├── Footer.astro           # 3-column footer
│   │   ├── ArticleCard.astro      # Universal article card
│   │   ├── ArticleHero.astro      # Full-width hero
│   │   ├── Sidebar.astro          # Popular/Tags/Newsletters
│   │   ├── SocialShare.astro      # 6 sharing platforms
│   │   ├── ReadingTime.astro      # Auto-calculated read time
│   │   ├── SeriesNavigation.astro # Multi-part series nav
│   │   ├── TableOfContents.astro  # Auto-generated TOC
│   │   └── RelatedPosts.astro     # Similar articles
│   ├── content/        # Content collections
│   │   ├── config.ts              # Collection schemas
│   │   ├── whatarel4/             # Main blog posts
│   │   ├── signature-collections/ # Multi-part series
│   │   ├── ancestors/             # Indigenous leader profiles
│   │   ├── newsletters/           # Volume containers
│   │   └── newsletter-articles/   # Individual articles
│   ├── layouts/
│   │   └── MainLayout.astro       # Base layout with View Transitions
│   ├── pages/
│   │   ├── index.astro            # Landing page
│   │   ├── about.astro            # About page
│   │   ├── rss.xml.ts             # RSS feed
│   │   ├── whatarel4/
│   │   │   ├── [...page].astro    # Blog pagination
│   │   │   └── [slug].astro       # Individual posts
│   │   ├── signature-collections/
│   │   │   ├── [...page].astro    # Collection pagination
│   │   │   └── [slug].astro       # Individual articles
│   │   ├── ancestors/
│   │   │   ├── [...page].astro    # Profile pagination
│   │   │   └── [slug].astro       # Individual profiles
│   │   └── newsletters/
│   │       ├── [...page].astro    # Volume pagination
│   │       ├── [slug].astro       # Volume pages
│   │       └── [volume]/[slug].astro # Individual articles
│   └── styles/
│       └── global.css  # Tailwind directives
├── tailwind.config.mjs # Design system configuration
├── astro.config.mjs
└── package.json
```

---

## 🔧 Technical Details

### Content Collections

**whatarel4** (Main Blog)

- General articles about language reclamation, technology, community
- Fields: title, description, pubDate, author, tags, heroImage, featured, draft

**signature-collections** (Multi-Part Series)

- In-depth series exploring specific topics
- Additional fields: seriesTitle, seriesOrder
- Features series navigation with prev/next

**ancestors** (Indigenous Leader Profiles)

- Honoring Indigenous leaders and cultural champions
- Additional fields: ancestorName, tribe, lifespan

**newsletters** (Volume Containers)

- Container pages for newsletter issues
- Fields: volumeNumber, theme, coverImage

**newsletter-articles** (Individual Articles)

- Articles within newsletter volumes
- Fields: volumeNumber, section, sectionOrder

### Features Integration

**Reading Time:** Add to any article template

```astro
import ReadingTime from '../../components/ReadingTime.astro';
<ReadingTime content={post.body} />
```

**Series Navigation:** Add to signature-collections

```astro
import SeriesNavigation from '../../components/SeriesNavigation.astro';
<SeriesNavigation
  currentSlug={post.slug}
  seriesTitle={post.data.seriesTitle}
  currentOrder={post.data.seriesOrder}
/>
```

**Table of Contents:** Add to sidebar

```astro
import TableOfContents from '../../components/TableOfContents.astro';
<div class="sticky top-8">
  <TableOfContents content={post.body} />
</div>
```

**Related Posts:** Add after article content

```astro
import RelatedPosts from '../../components/RelatedPosts.astro';
<RelatedPosts
  currentSlug={post.slug}
  currentTags={post.data.tags}
  collection="whatarel4"
/>
```

---

## 📚 Documentation

- **Changelog:** `/CHANGELOG.md` - Complete project history
- **Phase 2 Integration:** `/PHASE-2-INTEGRATION.md` - Component installation guide

---

## 🔗 Links

- **GitHub:** https://github.com/dekachin8/languages4-site
- **Netlify:** https://app.netlify.com/
- **Production:** https://wonderful-meringue-8520b4.netlify.app

---

## 📊 Performance

- **Desktop:** 99/100 performance score
- **SEO:** 100/100 score
- **Features:** Automatic sitemap, structured data, Open Graph tags
- **View Transitions:** SPA-like experience with SSG benefits

---

## 📝 Notes

### Technical Stack

- **Framework:** Astro 4.x (static site generator)
- **Styling:** Tailwind CSS v3 (utility-first)
- **Fonts:** Neue Kabel (Adobe Typekit)
- **Deployment:** Netlify (manual triggers)
- **Version Control:** GitHub

### Build Credits

- ~15 credits per deploy
- 300 free per month
- Deploy only at milestones

### Content Status

- ✅ All systems ready for content
- ⏳ 50+ blog posts to migrate
- ⏳ Newsletter content to add
- ⏳ Series articles to create
- ⏳ Ancestor profiles to write

---

## 🎉 Recent Achievements (January 14, 2026)

**Phase 1 & 2 Complete:**

- View Transitions across entire site
- RSS feed for all content
- Complete pagination system
- Social sharing (6 platforms)
- Newsletter 3-level architecture
- Reading time calculations
- Series navigation
- Auto-generated table of contents
- Related posts recommendations
- Enhanced sidebar with cross-promotion

**9 major features built in one day!**

---

## 🙏 Credits

Built with:

- [Astro](https://astro.build/) - Static site generator
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Netlify](https://www.netlify.com/) - Deployment and hosting

---

_Last updated: January 14, 2026_
