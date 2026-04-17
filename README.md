# Languages 4 Website Rebuild

> Marketing website for Languages 4 - Indigenous language reclamation through custom software and land-based curriculum.

**Live Site:** https://www.languages4.com  
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

## ✍️ Writing Content: Indigenous Language Tagging

When adding a new article that contains Indigenous-language text (self-names in original orthography, in-language words or phrases), wrap those terms in a `<span>` with the correct `lang` attribute. This is semantic plumbing — invisible to sighted readers, but it makes screen readers pronounce the words correctly and signals multilingual content to search engines.

### The rule

- **Wrap**: Indigenous-language text in body prose — words like `ʻāina`, `Kanien'kéha`, `kwetlal`, `Diné Bizaad`, `Haudenosaunee`
- **Skip**: fully Anglicized names where the English convention has taken over — `Mohawk`, `Navajo`, `Lakota`, `Hawaiian`, `Chickasaw`
- **Skip**: frontmatter (`title`, `heroImageAlt`, etc.) — rendered as plain text by templates, inline HTML won't work there. Handled as a separate future task.
- **Skip**: markdown image `![alt]()` text and link anchor text — attribute values can't contain inline HTML.

### Pattern

```markdown
The <span lang="haw">ʻĀina</span>-Based Education model teaches <span lang="haw">ʻōlelo Hawaiʻi</span> through the land.
```

### BCP 47 code dictionary (used so far)

| Language | Code | Example terms |
|---|---|---|
| Kanien'kéha (Mohawk) | `moh` | Kanien'kéha, Haudenosaunee, Tewaaraton |
| Diné Bizaad (Navajo) | `nv` | Diné, Diné Bizaad, Diné didzétsoh |
| Anishinaabemowin (Ojibwe) | `oj` | Anishinaabe, manoomin, Baggataway |
| ʻŌlelo Hawaiʻi (Hawaiian) | `haw` | ʻāina, ʻōlelo Hawaiʻi, kupuna, moʻolelo, Hawaiʻi |
| Dakota | `dak` | Ocheti Sakowin (default unless explicitly Lakota) |
| Lakota | `lkt` | Use only when content is explicitly Lakota-identified |
| Chikashshanompa' (Chickasaw) | `cic` | Chokma'shki |
| Lekwungen / SENĆOŦEN | `str` | kwetlal, Lekwungen |
| Stʼatʼimc (Lillooet) | `lil` | Xaxli'p, Tmixw, Úxwalmixw |
| Inuktitut | `iu` | Inuit, Inuktitut |
| Māori | `mi` | Māori, Te Reo Māori |

**Dakota vs Lakota**: default to `dak` unless the source material is explicitly Lakota-identified. Dakota and Lakota are distinct peoples and distinct languages — don't conflate.

### New terms?

If you're writing about a community or language not in the table above, look up the ISO 639-3 code at [iso639-3.sil.org](https://iso639-3.sil.org/), add the term to your article with the correct wrap, and extend this table in the next PR so future content has the reference.

### Future automation

This is manual for now. Planned improvements (tracked in `AUDIT_SPRINT_PLAN.md`):

- **Sprint 2**: a `npm run check:lang` script that scans content for known terms appearing unwrapped and warns during CI
- **Sprint 3+**: a remark plugin that auto-wraps known terms at build time, so content editors don't type `<span>` manually

See `LANG_AUDIT_FINDINGS.md` for the full scan that established this convention.

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
