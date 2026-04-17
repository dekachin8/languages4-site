# Languages 4 — Audit Sprint Plan
*Audit conducted April 16, 2026. Source: 4 parallel agents (Security, SEO, UI/UX & A11y, Code Quality). Site: https://www.languages4.com*

**Context when this was written:** Site just hit Lighthouse Mobile 93 / Desktop 97 after a perf overhaul. Next goal is to use the site as a marketing hub — but first we're hardening quality (security, SEO depth, a11y, code health) before adding content scale.

---

## Executive Summary

Site is fundamentally healthy — fast, well-structured, no secrets or mixed content. Gaps cluster in three areas:

1. **A11y & motion safety** — no skip link, no `prefers-reduced-motion`, weak focus states
2. **SEO semantic depth** — no Article/Breadcrumb/Person/SoftwareApplication schema; one OG image on every page
3. **Build/governance** — no CI, no tests, no lint; legacy WP assets still shipping

Security posture is solid. Main security gaps: no CSP and some build-time CVEs.

---

## 🔴 CRITICAL (blockers for marketing push)

| # | Finding | Location |
|---|---------|----------|
| C1 | `public/projectStatus.txt` served publicly (internal team/timeline notes) | `public/projectStatus.txt` |
| C2 | Duplicate H1 on every signature-collection article — template hardcodes `<h1>Signature Collections: Language & Culture</h1>` and demotes real title to `<p>` | `src/pages/signature-collections/[slug].astro:74-79` |
| C3 | Both `/contact` and `/contact-us` pages exist — duplicate content, split link equity | `src/pages/contact.astro`, `src/pages/contact-us.astro` |
| C4 | No skip-to-content link anywhere (WCAG 2.4.1) | `src/layouts/MainLayout.astro` |
| C5 | No `prefers-reduced-motion` support — hero cycles 8s, testimonials 6s, infinite hamburger pulse, auto-rotating carousels (WCAG 2.3.3 / 2.2.2) | Multiple components |
| C6 | Autoplaying content >5s with no visible pause control (WCAG 2.2.2) | `index.astro:304`, `TestimonialSlider.astro:156` |
| C7 | `npm audit`: 1 critical + 6 high (Astro 5.16.7 allowlist bypass, fast-xml-parser DoS). Build-time only but worth patching. | `package.json` |

---

## 🟠 HIGH (meaningful impact, schedule in sprint)

### Security
- No Content-Security-Policy header — start with `Report-Only` given inline scripts in `SocialShare.astro:121`, Clarity, GA4. Edit `public/_headers`.
- HSTS not preload-eligible — bump `max-age` → 63072000 and add `preload`. `public/_headers:14`.
- `TeamMemberModal.astro:82` uses `set:html` — safe today (hardcoded bios), fragile if bios move to CMS.

### SEO
- No Article/BlogPosting schema on any article. Only Organization exists. `src/components/SchemaOrg.astro`.
- All pages share `og-default.jpg` — even `BaseHead.astro` callers that pass heroImage fall back often. Need per-page OG (1200×630 JPG).
- No BreadcrumbList schema or visible breadcrumbs on deep pages.
- No SoftwareApplication / Product schema for the actual product.
- No Person schema on `/about` despite four detailed leadership bios (big E-E-A-T miss).
- Homepage H1 is just "Languages 4" (brand) — keyword H2 "Indigenous Language Reclamation" should be promoted. `src/pages/index.astro:73`.

### A11y / UX
- Focus indicators missing — only 4/~37 components have `focus-visible`; orange `accent-600` swallows default browser ring.
- Menu slide-out doesn't trap focus when open (Tab escapes to page behind). `src/components/Navigation.astro`.
- Contact form: no `aria-invalid`, no `aria-describedby`, no success state (relies on Netlify default redirect).
- Indigenous-language text missing `<span lang="…">` attribution (WCAG 3.1.2) — site-wide; specifically `contact.astro:83` references Kanien'kéha.
- Hero cycling images have verbose alt re-announced every cycle.
- Mobile menu `w-[440px]` overflows 375px viewport. `Navigation.astro:76`.
- Several `text-neutral-500` on white instances fail 4.5:1 AA (TestimonialSlider, Sidebar, ArticleCard).

### Code Quality
- Zero tests + no CI + no ESLint/Prettier + no `typecheck` script. 140 legacy 301 redirects have no regression coverage.
- No `astro:assets` / `<Image />` usage anywhere — 47 raw `<img>` across 24 files.
- Triplicated `[slug].astro` detail pages (whatarel4, signature-collections, ancestors) ~70% identical, already drifting.
- Migration scripts still tracked at repo root (`fix-metadata*.js`, `migrate-blog-posts.js`, `blog/`, `blog_fixed/`).
- Legacy WP assets still in `public/`: `bootstrap-4.4.1.css`, `Languages4_bootstrap.css`, `landing-page.css`, `print.css` — unreferenced, shipping to CDN.
- Orphan: `TestimonialBottomSections.astro` (145 LOC, nowhere imported).

---

## 🟡 MEDIUM

- Add `Cross-Origin-Opener-Policy: same-origin` + `Cross-Origin-Resource-Policy: same-site`.
- Sitemap has no `lastmod` / `priority` / `changefreq`.
- Trailing-slash inconsistency in internal links (set Astro `trailingSlash: 'always'`).
- Title-tag duplication: "About Languages 4 … | Languages 4" already contains brand; `BaseHead.astro:39` appends again.
- Alt text = title on every `heroImageAlt` (all signature-collection frontmatter) — image-search + a11y miss.
- No breadcrumbs on deep article pages (pairs with schema gap above).
- Line length on `/about` — `prose-xl` at 1920px ≈ 95 chars, optimal 60-75.
- No trust signals above fold on homepage (partner logos, community names).
- Newsletter CTA opens new tab to Constant Contact — inline if possible.
- 404 page has no search box. `src/pages/404.astro`.
- Favicon is SVG-only — add `.ico` and `apple-touch-icon` fallback.
- 13 files use arbitrary Tailwind values (`tracking-[2px]`, `w-[75%]`, custom shadows) — promote to config.
- Content-collection schema duplication across 3 collections in `src/content/config.ts`.
- 4 `any` types; 6 `console.error`/`console.warn` in production.
- No `netlify.toml` — build settings invisible to branch previews.
- No Node version pinned (`.nvmrc` / `engines`).

---

## 🔵 LOW / NITS

- Print CSS uses invalid `h3:contains()` jQuery selector. `MainLayout.astro:109`.
- 3 Lightroom `.xmp` sidecars currently in `git status` — add `*.xmp` to `.gitignore`.
- `README.md` lists old Netlify preview URL, not `languages4.com`.
- Footer right-gutter (`pr-20`) reserved on mobile where sidebar is hidden.
- `newsletters/volume-1-5.json` next to `volume-1.json`–`volume-15.json` — naming inconsistency.
- Chip "INDIGENOUS LANGUAGE RECLAMATION" `bg-neutral-600` + white ≈ 3.6:1, fails AA small text. `index.astro:71`.
- Decorative SVGs missing `aria-hidden="true"` in Navigation menu icons.
- Inline social-SVG blocks duplicated across Navigation/Footer/hero.

---

## 💡 OUTSIDE-THE-BOX (Sprint 3+ material)

### Indigenous-audience-specific (HIGH PRIORITY to Tim)
1. **Land acknowledgment in footer** — notably absent for an Indigenous-language-reclamation company. Tim lives 1000m from a tribal homeland; this is personally important, not just cosmetic.
2. **Native-language rotating greeting** (*on hold — April 2026*) — detailed spec drafted (Shé:kon / Chokma / Boozhoo / Hau with proper endonyms, community attribution, lang tags, load-only rotation). Tim paused to avoid introducing community-approval cycles mid-sprint. Note: for Sisseton Wahpeton Oyate endonym, use `Dakhótiyapi` (Dakota), not `Dakȟótiyapi` (Lakota). Revisit after Sprint 1 closes with a community-consultation plan.
3. **Newsletter signup modernization** — current Constant Contact link still works but is a known weakness (opens new tab, no inline capture). Re-evaluate.
4. **Save-Data / low-bandwidth mode** — check `navigator.connection.saveData`, skip hero cycling + blurs for metered connections (real constraint in remote communities).
5. **Plain-language mode on `/about`** — current copy reads grade 12-14; community-facing readers benefit from a grade 8 summary card.

### Lang-attribute audit — deferred items (April 17, 2026)
*Context: 10 markdown articles wrapped with 92 `<span lang="…">` tags for Indigenous-language text in body prose. These items were intentionally deferred.*

6. **Frontmatter / title `lang` wrapping** — Indigenous words in `title`, `heroImageAlt`, `cardImageAlt`, `seriesTitle` are rendered as plain text by templates, so inline `<span>` won't work. Requires template changes across 4 collection `[slug].astro` files (plus listing pages). Specifically affects: "Celebrating Star Wars Day with the Diné Dub", "ʻĀina-Based Education: Scaling...", "The Xaxli'p Forest Regeneration...", "Revitalizing Kwetlal...", and the Chokma'shki newsletter volume-5 article title.
7. **ImageStoryModal inline HTML support** — `src/components/ImageStoryModal.astro:76` currently renders `{description}` with HTML-escaping. Changing to `<Fragment set:html={description} />` would enable wrapping `Kanien'kéha (Mohawk)` in `src/utils/imageStories.ts:26` (appears on homepage modal). Safe (data is developer-controlled), but an opt-in decision Tim deferred.
8. **Contact form placeholder** — `src/pages/contact.astro:83` placeholder reads `"e.g., Kanien'kéha (Mohawk)"`. `<input>` placeholders can't contain inline HTML. Left as-is per Tim's decision; alternative rewrite (e.g., `"e.g., Mohawk or Kanien'kéha"`) available if ever desired.
9. **Orthographic verification of Lakota phrases** — `Haipažaža Pȟežuta` and `Ocheti Sakowin Tha Makhoche` in `celebrate-the-holidays-with-indigenous-flair...md` were wrapped as-written per Tim's "trust the existing content" decision. Worth a future pass with a knowledgeable Lakota source to verify correct diacritics.
10. **Remark plugin for auto-wrapping** — as more Indigenous-language content is added, a remark plugin that auto-wraps known terms (from a config dictionary like `{haw: ["ʻāina", "ʻōlelo Hawaiʻi", ...], moh: ["Kanien'kéha", ...]}`) would keep tagging consistent and remove the manual step. One-time build complexity vs. growing manual burden.

### Code quality — deferred
11. **Navigation.astro DRY opportunity** — the mobile header logo `<a>` (line 9-15) and the desktop sidebar logo `<a>` (line 34-40) are 90% identical. Could extract to a `<LogoLink>` component. Small polish, not urgent.

### Marketing-hub pivot
5. **Pillar hub: "Indigenous Language Revitalization"** — long-form guide linking down to existing signature-collection articles as clusters. Owns the category head term.
6. **Case studies with schema + outcomes** per implemented community (currently only testimonials). Drives B2B conversion, ranks for "[tribe name] language app" long-tail.
7. **Grants & funding resource hub** — ultra-high-intent for language-program directors; natural CTA hand-off.
8. **Proper `/platform` product page** with SoftwareApplication schema, feature list, demo CTA.
9. **Ancestors collection → Person schema corpus** — unique content moat no competitor has.

### Infrastructure
10. **Decap CMS or Sanity** — Tim editing .md directly won't scale once marketing cadence picks up.
11. **axe-core in CI** — one a11y check per key page; catches regressions Lighthouse misses.
12. **GA4 `gtag` events on CTAs** — currently flying blind on demo-request funnel.
13. **View transitions** are already enabled (`<ClientRouter />`) — lean in further with `transition:persist` on modals to replace the 70-line reinit dance in `index.astro:459-528`.

---

## Sprint Breakdown

### Sprint 1 — Pre-Marketing-Push Hardening (~1-2 days)
Critical items + top-priority highs. Single branch, critical-first commits for reviewability.

**Mechanical wins (low judgment):**
- [ ] Remove `public/projectStatus.txt`
- [ ] `npm audit fix` (test build after)
- [ ] Delete legacy WP CSS from `public/` (`bootstrap-4.4.1.css`, `Languages4_bootstrap.css`, `Languages4_theme.css`, `landing-page.css`, `styles/print.css`)
- [ ] Add `*.xmp` to `.gitignore`; un-track the 3 sidecars
- [ ] Move migration scripts to `/scripts/archive/` or delete
- [ ] Delete orphan `TestimonialBottomSections.astro`
- [ ] Fix invalid `h3:contains()` in print CSS (`MainLayout.astro:109`)
- [ ] Update README live URL

**Needs design/content judgment:**
- [ ] Fix article-page H1 (promote real title; demote "Signature Collections: Language & Culture" to eyebrow)
- [ ] Consolidate `/contact` + `/contact-us` — keep which canonical? (recommend `/contact`, add `/contact-us` → `/contact` 301 in `_redirects`, delete `contact-us.astro`)
- [ ] Skip-to-content link in MainLayout
- [ ] Global `focus-visible` styling (suggest `outline: 2px solid cream-200; outline-offset: 2px`)
- [ ] Menu focus trap + ESC-to-close
- [ ] Reduced-motion wrapper on all `setInterval` autoplay + infinite animations
- [ ] Pause controls on hero cycler + testimonial slider
- [ ] Promote homepage H1 to keyword-rich phrase (draft options together)
- [ ] CSP Report-Only header (needs inline-script hash audit first)

**Schema additions:**
- [ ] Article/BlogPosting schema → new `ArticleSchema.astro` used by all 4 collection [slug] pages
- [ ] BreadcrumbList schema (+ visible breadcrumbs component)
- [ ] Person schema on `/about` per team member
- [ ] SoftwareApplication schema on homepage

### Sprint 2 — Pre-Content-Scale Foundation (~3-5 days)
- [ ] ESLint + Prettier + Playwright (smoke tests for critical 301s) + GitHub Actions CI
- [ ] Migrate to `astro:assets` / `<Image />` (start with hero + card images)
- [ ] Extract `<CollectionArticleLayout>` and `<CollectionListingLayout>` to kill 70% duplication
- [ ] Delete remaining WP-era files; tighten `tsconfig` includes
- [ ] Create `netlify.toml` with build command + Node version pinned
- [ ] Alt-text rewrite pass on signature-collections (describe images, not repeat titles)
- [ ] `<span lang="…">` audit + wrapping across content collections
- [ ] Per-page OG image creative brief + generation (needs Tim's design input or AI-generated from hero images)
- [ ] Contact form a11y polish (`aria-invalid`, `aria-describedby`, `/thank-you` success page)
- [ ] Mobile menu width fix (`w-[min(440px,100vw)]`)
- [ ] Contrast audit pass (neutral-500 → neutral-700, cream-200 on primary-900, etc.)
- [ ] HSTS preload bump, COOP/CORP, CSP enforce (after Report-Only monitoring period)
- [ ] Promote CSP from Report-Only to enforced

### Sprint 3 — Marketing Hub Foundation (scope TBD)
- Cultural authenticity pass (land acknowledgment, indigenous greeting, `lang`-tagging)
- Pillar content architecture (indigenous-language-revitalization hub)
- Case study template + first 1-2 case studies
- Grants/funding resource hub
- `/platform` product page
- CMS decision (Decap vs Sanity vs stay-git)
- GA4 event instrumentation

---

## Decisions Needed From Tim

Before Sprint 1 starts:
- [ ] Canonical URL for contact page: `/contact` or `/contact-us`? (recommend `/contact`)
- [ ] Homepage H1 replacement text — current is "Languages 4" (brand)
- [ ] Approve full removal of migration scripts (`fix-metadata*.js`, `migrate-blog-posts.js`, `blog/`, `blog_fixed/`) or archive them?
- [ ] Confirm `ANTHROPIC_API_KEY` used by `fix-metadata*.js` is only in local shell, never committed (security precaution)

Before Sprint 2:
- [ ] OG image creative direction (brand-consistent template? per-article custom? AI-generated from hero images?)
- [ ] Preference on CMS (affects Sprint 3 scope)

Before Sprint 3:
- [ ] Land acknowledgment wording — Tim should draft from relationship with local community, not AI-generated
- [ ] Which Indigenous languages to feature in rotating greeting (Kanien'kéha is already referenced; others?)
- [ ] Case study candidates — which community implementations are ready to feature?

---

## Files Referenced (quick index)

- `public/_headers`, `public/_redirects`, `public/projectStatus.txt`
- `src/layouts/MainLayout.astro`
- `src/components/BaseHead.astro`, `SchemaOrg.astro`, `Navigation.astro`, `Footer.astro`, `TeamMemberModal.astro`, `TestimonialSlider.astro`, `FeaturedStoriesCarousel.astro`, `SocialShare.astro`, `Search.astro`
- `src/components/TestimonialBottomSections.astro` (orphan — delete)
- `src/pages/index.astro`, `about.astro`, `contact.astro`, `contact-us.astro`, `404.astro`, `search.astro`
- `src/pages/signature-collections/[slug].astro`, `whatarel4/[slug].astro`, `ancestors/[slug].astro`
- `src/content/config.ts`
- `tailwind.config.mjs`, `tsconfig.json`, `package.json`, `.gitignore`, `README.md`
- `fix-metadata.js`, `fix-metadata-test.js`, `migrate-blog-posts.js` (migration scripts — move/archive)
- `blog/`, `blog_fixed/` (migration dirs — archive/delete)
