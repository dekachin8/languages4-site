# Languages 4 Website Rebuild

> Marketing website for Languages 4 - Indigenous language reclamation through custom software and land-based curriculum.

**Live Site:** https://wonderful-meringue-8520b4.netlify.app  
**Framework:** Astro + Tailwind CSS  
**Deployment:** Netlify (manual deploys to conserve credits)

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
3. Deploy only at milestones to conserve build credits (~15 credits per deploy, 300/month free)

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
│   │   ├── SocialShare.astro      # 8 sharing platforms
│   │   ├── ReadingTime.astro      # Auto-calculated read time
│   │   ├── SeriesNavigation.astro # Multi-part series nav
│   │   ├── TableOfContents.astro  # Auto-generated TOC
│   │   ├── RelatedPosts.astro     # Similar articles
│   │   ├── TestimonialCard.astro  # Versatile testimonial card
│   │   ├── TestimonialPullQuote.astro # Large quote sections
│   │   └── TestimonialSlider.astro    # Auto-rotating carousel
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
│   ├── utils/
│   │   └── testimonials.ts        # Testimonial data & helpers
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

---

### Component Integration Examples

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

**Testimonials:** Multiple display options

```astro
import TestimonialCard from '../components/TestimonialCard.astro';
import TestimonialPullQuote from '../components/TestimonialPullQuote.astro';
import TestimonialSlider from '../components/TestimonialSlider.astro';
import { getFeaturedTestimonials } from '../utils/testimonials';

// Featured testimonials
const featured = getFeaturedTestimonials();

// Card variant
<TestimonialCard testimonial={featured[0]} variant="compact" />

// Pull quote for section breaks
<TestimonialPullQuote testimonial={featured[1]} alignment="left" />

// Auto-rotating slider
<TestimonialSlider testimonials={featured} />
```

---

## 📚 Documentation

- **CHANGELOG.md** - Project history and upcoming tasks
- **Netlify Dashboard** - https://app.netlify.com/
- **GitHub Repository** - https://github.com/dekachin8/languages4-site

---

## 📊 Performance Targets

- **Desktop:** 99/100 Lighthouse score
- **Mobile:** 92/100 Lighthouse score
- **SEO:** 100/100
- **Best Practices:** 100/100
- **Features:** Automatic sitemap, structured data, Open Graph tags

---

## 🔗 Technical Stack

- **Framework:** Astro 4.x (static site generator)
- **Styling:** Tailwind CSS v3 (utility-first)
- **Fonts:** Neue Kabel (Adobe Typekit)
- **Deployment:** Netlify (manual triggers)
- **Version Control:** GitHub
- **Content:** Markdown with frontmatter + Astro Content Collections

---

## 🙏 Credits

Built with:

- [Astro](https://astro.build/) - Static site generator
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Netlify](https://www.netlify.com/) - Deployment and hosting

---

_For project status and task tracking, see CHANGELOG.md_
