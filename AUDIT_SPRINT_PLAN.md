# Languages 4 — Audit Sprint Plan
*Audit conducted April 16, 2026. Source: 4 parallel agents (Security, SEO, UI/UX & A11y, Code Quality). Site: https://www.languages4.com*

**Context when this was written:** Site just hit Lighthouse Mobile 93 / Desktop 97 after a perf overhaul. Next goal is to use the site as a marketing hub — but first we're hardening quality (security, SEO depth, a11y, code health) before adding content scale.

---

## Current Status (April 22, 2026)

**Sprint 1: ✅ COMPLETE — deployed to production.** All Critical + High items from the audit landed; see CHANGELOG v0.9.0 for the detailed ledger. **Post-deploy PageSpeed (3 desktop runs averaged):**
- Desktop: ~95 Performance (range 95-99), CLS ~0.04 (range 0-0.062), LCP ~1.4s
- Mobile: 93 Performance, CLS 0 (original post-deploy reading)
- Best Practices 92 on both (CSP Report-Only violations — cleanup batch below, landing next deploy)

**Root cause of desktop CLS found + fixed** (April 18, pushed to `main` as `57af165`): the 4×4 desktop hero mosaic's 12 empty-src placeholders had no height anchor, so row 4 (all placeholders) collapsed on load and expanded when `ShowcaseLoader` filled the images. Fix: `aspect-[3/2]` on each placeholder container + positional compensation (`-top-[45%]` lg/xl, `-top-[60%]` 2xl) + row-2 Mohawk card moved from col 1 → col 2 for better visibility. Also pushed `415e829`: removed `upgrade-insecure-requests` from Report-Only CSP (was throwing console warnings, hurting Best Practices score).

## Deploy (April 22, 2026) — 16 commits shipped

All Sprint 2 work + April 18 fixes pushed to `origin/main` and deployed via Netlify on April 22. Sprint 1 post-deploy regressions reclaimed; new capabilities landed:

- Mosaic CLS fix (`57af165`)
- CSP allowlist fixes (`415e829` + `f4eb37c`)
- GHA v5 bumps + lint cleanup + modal reinit noise (`724c5d7`)
- Article + listing layout extraction (`4e25e59` + `c5b39f2`)
- TOC markdown strip, LogoLink, contrast, contact a11y, lang-tagging, wordmark CLS (`6366be6`, `0feae85`, `2cfed4a`, `3176ff2`, `38cf72f`, `4663bee`)
- Plan docs (`f0b0106`, `a1be4cb`, `cc55e27`, `f58298b`, `0413ca0`, `5d85cb5`)

### Post-Deploy PageSpeed (single run each — lab variance caveat applies)

**Desktop:** Performance 99 / Accessibility 91 / Best Practices 100 / SEO 100. FCP 0.7s, LCP 0.7s, TBT 30ms, CLS 0, SI 1.0s.

**Mobile:** Performance 90 / Accessibility 91 / Best Practices 100 / SEO 90. FCP 2.5s, LCP 2.5s, TBT 210ms, CLS 0, SI 2.8s.

**Confirmed wins:**
- Best Practices 92 → 100 on both — CSP fixes worked as designed.
- Desktop CLS 0.04-0.06 → 0 — wordmark guards effective.
- Desktop LCP 1.3-1.7s → 0.7s — better than the pre-Sprint-1 1.0s baseline.

**4-run mobile picture (April 22, corrected):**
- Run 1 (original browser): Perf 90, SEO 100, TBT 210ms
- Run 2 (original browser, likely cached result): Perf 68, SEO 100, TBT 1,290ms
- Run 3 (original browser, likely cached result): Perf 62, SEO 100, TBT 1,250ms
- Run 4 (**different browser, fresh**): Perf 92, SEO 100, TBT 40ms

**Correction:** SEO was 100 on every run (I misread the paste layout initially and confused Accessibility scores with SEO scores — corrected after Tim pointed it out). The only thing that actually varied was Performance, and Performance tracks TBT almost 1:1.

**The "bad runs" were likely one cached PageSpeed result re-served.** PageSpeed Insights caches results per URL for 30-60 min; hitting "re-run" in the same browser session can return the cached result rather than running fresh. Tim confirmed this pattern by running from a fresh different browser and getting Perf 92 / TBT 40ms — matching Run 1's picture, not Runs 2-3.

**Real post-deploy baseline (fresh-browser runs only):**
- Mobile: Perf 90-92, TBT 40-210ms, LCP 2.5-2.8s, CLS 0, SEO 100, BP 100, A11y 91
- Desktop: Perf 99, TBT 30ms, LCP 0.7s, CLS 0, SEO 100, BP 100, A11y 91

**Perf floor:** mobile ≥ 90 is the bar. Saved as project memory `project_perf_floor.md`, now including the "fresh browser / incognito" cache-busting lesson so future sessions don't chase ghost patterns.

**Sprint 2: 🟢 ~95% COMPLETE (effectively closed).** Tooling + refactors + a11y + contrast all landed:
- ✅ netlify.toml + Node 20 pin
- ✅ typecheck script (astro check) — 0 errors
- ✅ Prettier installed + configured (format pass deferred)
- ✅ ESLint 9.x with TS + Astro + a11y plugins (0 errors, 8 documented warnings — all intentional `no-explicit-any`)
- ✅ Playwright @playwright/test with 14 redirect smoke tests
- ✅ GitHub Actions CI on every push/PR (bumped to actions v5 on April 22)
- ✅ Mobile menu overflow fix
- ✅ CSP Report-Only violation triage (April 22, live DevTools pass on homepage + listing + article)
- ✅ Article + listing template extraction — `CollectionArticleLayout.astro` (`4e25e59`) + `CollectionListingLayout.astro` (`c5b39f2`). Total src reduction across 6 pages: 1385 → 1046 lines (-24%). Drift between collections now structurally prevented.
- ✅ TOC markdown-delimiter strip — `TableOfContents.astro` (`6366be6`). Preexisting bug surfaced during refactor eyeball; unrelated to refactor.
- ✅ LogoLink extraction — Navigation.astro DRY done (`0feae85`).
- ✅ Contrast audit pass — `text-neutral-500` and `bg-neutral-600` (WCAG AA fails) replaced site-wide (`2cfed4a`).
- ✅ Contact form a11y — aria-required/invalid/describedby + `/thank-you` page (`3176ff2`). SR walkthrough not yet manually confirmed.
- ✅ Lang-tagging deferred items from Sprint 1 — opt-in HTML in titles + ImageStoryModal description, Kanien'kéha + Chokma'shki wrapped (`38cf72f`).
- ✅ Hero wordmark CLS defensive guards — `whitespace-nowrap` + `font-size-adjust` on the wordmark `<span>` (`4663bee`). Efficacy requires post-deploy PageSpeed measurement to confirm.
- ⏸️ `astro:assets` migration — deferred at Sprint 2 close. Hero image already well-optimized (explicit width/height, preload, webp, eager, high priority, ~66KB); marginal AVIF gain doesn't justify the LCP-regression risk of a rushed migration. See detailed deferral note under "Rest of Sprint 2" below.
- ⛔ Blocked: per-page OG image creative direction (Tim's design input)
- ⏱️ Time-gated: CSP Report-Only → enforced promotion. Best if it follows the Peekay CSP reporting pipeline (Sprint 3 item) so the promotion is data-driven rather than vibes-based. In the meantime, console-based observation over 1-2 weeks of post-deploy traffic is a fallback.

**Sprint 2 remaining work** is detailed in the Micro-sprint + wave-2 sections below.

**Sprint 3: 📋 NOT STARTED.** Marketing-hub pivot — detailed at the bottom of this doc.

---

## Where to resume next session

**Sprint 2 is effectively closed** — push the 14-commit queue to deploy, confirm visual parity + Lighthouse in the deploy preview, then measure post-deploy PageSpeed (desktop + mobile) to see if the wordmark CLS guards helped.

After measurement:
- If LCP regressed or AVIF savings look meaningful in the field data → pick up the `astro:assets` migration as a dedicated ~60-90 min session.
- Otherwise → keep astro:assets parked and move to **Sprint 3** planning (marketing hub, cultural authenticity pass, pillar content, `/platform` product page, CMS decision, GA4 events, tag-filter fix, etc.).

Other open loops still worth tracking:
- Per-page OG image creative direction (blocked on Tim)
- CSP Report-Only → enforced promotion (time-gated: wait 1-2 weeks of post-deploy monitoring)
- SR walkthrough of the contact form (acceptance bar on `3176ff2`)
- Browser validation of the layout refactor on all ~25 article permutations (acceptance bar on `4e25e59` + `c5b39f2`)

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

### Sprint 2 — Pre-Content-Scale Foundation

**Goal**: establish regression protection (lint, typecheck, tests, CI) and tackle infrastructure polish before marketing content scales up. Sprint 1 gave us quality; Sprint 2 gives us the tooling to keep quality as the site grows.

---

#### Next-session cleanup batch (3 of 5 done — #4 and #5 remain)

Small-but-visible items surfaced during and after the April 17 deploy:

1. ✅ **GitHub Actions deprecation** — `.github/workflows/ci.yml`:
   - `actions/checkout@v4` → `@v5`
   - `actions/setup-node@v4` → `@v5`
   - Done April 22, commit `724c5d7`. Verified v5 releases real (v5.0.0 Aug/Sep 2025); breaking changes are Node 24 runtime + auto package-manager-cache (latter doesn't trigger — no `packageManager` field in `package.json`).
2. ✅ **Silence the `activities` false positive** — `src/components/PlatformShowcase.astro:198`. Done April 22, commit `724c5d7` — `activities` was genuinely unused in the script body (only `config` is used), so dropped from `define:vars` rather than disabled. Lint now 8 warnings (all intentional `no-explicit-any`).
3. ✅ **Investigate CSP Report-Only violations** — Done April 22, commit `f4eb37c`. Live DevTools pass across homepage + `/signature-collections/` listing + an article page surfaced:
   - `style-src` blocked `https://p.typekit.net/p.css` (Adobe Fonts bootstrap stylesheet) — added `https://p.typekit.net` to `style-src`.
   - `script-src` blocked `data:application/javascript,` (Astro ClientRouter injects an empty-data module script at `node_modules/astro/dist/transitions/router.js:88` during View Transitions) — added `data:` to `script-src`. Security impact low (`'unsafe-inline'` already permits inline; no `'unsafe-eval'`).
   - Bonus unrelated fix (same commit batch, `724c5d7`): `reinitializeModals()` in `index.astro` was logging 4× `console.error('Modal not found: …')` on every View Transition to non-homepage pages. Silenced — iterate only modals that exist.
   - Expected to reclaim 6-8 Best Practices points post-deploy. Not yet verified (waiting for deploy + Lighthouse retest).
4. ⏳ **Desktop CLS (small but present, ~0.04-0.06)** — across 3 post-deploy runs: 0.062 / 0 / 0.041. Variance-heavy but pattern is real — hero wordmark font-load reflow is the likely cause. All readings stay under the "good" band (0.1), so not urgent, but worth a ~30 min investigation pass when convenient. Fix candidates: reserve explicit height on the wordmark `<span>` via `min-height`/`line-height`, set `font-size-adjust` for fallback font metrics matching, or revert wordmark to fluid `text-hero` clamp.
5. ⏳ **Desktop LCP 1.3-1.7s** — slightly slower than the pre-deploy 1.0s. Still well within "good" band (<2.5s). Same hero-wordmark root cause as #4 likely. Same fix applies; same priority (not urgent).

### Desktop PageSpeed retest observations (no action — document only)
- Three post-deploy desktop runs: **95 / 99 / 95** Performance.
- CLS has been **0.062 / 0 / 0.041** — variance-heavy. The "99 on a warm cache" run is the exception, not the baseline.
- Honest baseline: **desktop is ~95 consistently, with real-but-tiny CLS**. Before the deploy, desktop was 97 with CLS 0. So there IS a small net regression.
- Real-user field data (Search Console Core Web Vitals, once populated) will give the true signal. Lab scores vary ±3 points between identical runs.

#### Micro-sprint: Today (tiered for 30min / 90min / 150min)

##### Tier A — Config wins (~30-40 min total, safest)

**A.1 Create `netlify.toml`** (~10 min)
- File: `netlify.toml` at repo root (new)
- Content: pin build command, publish dir, Node version
- Acceptance: `cat netlify.toml` returns expected TOML; Netlify still builds identically

**A.2 Pin Node version in `package.json` `engines`** (~2 min)
- File: `package.json`
- Add `"engines": { "node": ">=20.0.0" }`
- Acceptance: `npm install` still succeeds; Netlify picks up the constraint

**A.3 Add `typecheck` script** (~5 min)
- File: `package.json` `scripts`
- Add `"typecheck": "astro check"`
- Verify `@astrojs/check` + `typescript` are installed (install if not)
- Acceptance: `npm run typecheck` exits 0 on current codebase

**A.4 Install Prettier + prettier-plugin-astro** (~15 min)
- Install: `npm install --save-dev prettier prettier-plugin-astro`
- New files: `.prettierrc` (JSON config with Astro plugin), `.prettierignore` (dist, .astro, node_modules, public/pagefind)
- Add scripts: `"format": "prettier --write ."`, `"format:check": "prettier --check ."`
- **Do NOT run `prettier --write .`** in this sprint (would create a massive reformat diff). Just install + configure so it's ready.
- Acceptance: `npm run format:check` runs (may report unformatted files, that's fine for now)

**A.5 Mobile menu width fix** (~5 min)
- File: `src/components/Navigation.astro:76`
- Change `w-[440px] md:w-[480px]` → `w-[min(440px,100vw)] md:w-[480px]`
- Acceptance: menu no longer overflows on 375px viewport

**Tier A commit**: `Sprint 2 A: netlify.toml, Node pin, typecheck+format scripts, mobile menu fix`

---

##### Tier B — Tier A + ESLint baseline (~90 min total)

Adds to Tier A:

**B.1 Install ESLint with Astro plugin** (~25-35 min)
- Install: `npm install --save-dev eslint @eslint/js typescript-eslint eslint-plugin-astro eslint-plugin-jsx-a11y globals`
- New file: `eslint.config.mjs` (flat config — ESLint 9 style) — include: `@eslint/js` recommended, typescript-eslint recommended, eslint-plugin-astro recommended, jsx-a11y for anchor/button rules
- Ignore: `dist`, `.astro`, `node_modules`, `public/pagefind`
- Add script: `"lint": "eslint ."` (note: don't use `--max-warnings 0` yet — will surface pre-existing warnings we'll fix gradually)
- **Do NOT run auto-fix yet** — just wire it up so errors surface.
- Acceptance: `npm run lint` runs without tool failure (may emit warnings/errors from pre-existing code; that's expected)

**B.2 Triage the first pass of lint output** (~20-30 min)
- Capture output of `npm run lint` to a file or note
- Categorize: obvious fixes (unused imports, etc.) vs noisy rules to disable vs real issues
- Apply autofixes with `npx eslint . --fix` only for whitespace/import-order safe rules
- Tune rules in `eslint.config.mjs` to silence false positives that don't matter
- Commit config + any autofix results

**Tier B commit(s)**: `Sprint 2 B: ESLint + Prettier tooling` (may split if triage produces meaningful code changes)

---

##### Tier C — Tier B + Lang-check script + CI (~150 min total)

Adds to Tier B:

**C.1 `npm run check:lang` script** (~60 min)
- New file: `scripts/check-lang-tags.mjs`
- Reads a dictionary (inline const or separate JSON) of known Indigenous terms → BCP 47 codes (pulled from README table we wrote)
- Scans all `src/content/**/*.md` files (skip frontmatter)
- For each dictionary term found in body content, check if it appears inside an `<span lang="…">` wrapper
- Emit warnings: `FILE:LINE: "term" found without lang wrapper`
- Exit code: 0 if clean, 1 if unwrapped terms found (so CI fails)
- New script: `"check:lang": "node scripts/check-lang-tags.mjs"`
- Acceptance: `npm run check:lang` passes on current codebase (since we wrapped everything in Sprint 1); if we drop one wrap, it fails

**C.2 Minimal GitHub Actions workflow** (~15 min)
- New file: `.github/workflows/ci.yml`
- Runs on push + pull_request
- Node 20, npm ci, then: typecheck, lint, format:check, check:lang, build
- Acceptance: first push triggers green CI (or surfaces specific failures we fix)

**Tier C commit(s)**: `Sprint 2 C: lang-tag lint script + CI workflow`

---

#### Rest of Sprint 2 (not today, but queued)

**Layout extraction** — ✅ DONE (April 22)
- ✅ **Phase 1 (article templates)** — commit `4e25e59`. `CollectionArticleLayout.astro` owns shared hero/breadcrumbs/article/sidebar. Each `[slug].astro` shrank from ~220 lines to 66-89 lines. Collection-specific logic (popular-post selection, gallery composition, tribe/lifespan info box, seriesOrder "Part N" badge) now expressed via props + a single `pre-content` slot. Total src reduction: 669 → 456 lines (-32%).
- ✅ **Phase 2 (listing templates)** — commit `c5b39f2`. `CollectionListingLayout.astro` owns hero, info box, results count, no-results block, pagination, sidebar. Each `[...page].astro` shrank from ~220-270 lines to 112-156 lines. Card grid stays in the parent's default slot (ArticleCard props differ by collection). whatarel4 retains its "Latest + More" section split + archiveYears — genuinely collection-specific. Total src reduction: 716 → 590 lines (-18%).
- Combined: 6 pages 1385 → 1046 lines (-24%). NOT browser-verified; visual parity to confirm on next deploy preview.

**`astro:assets` migration** — ⏸️ DEFERRED (April 22 decision)
- Status: Sprint 2 candidate; deferred at the close of Sprint 2 per Tim's call ("I don't think the micro-improvement is worth the risk").
- Why deferred: the hero LCP image (`mobile-hero-1`) already has explicit width/height (600×417), `fetchpriority="high"`, `loading="eager"`, a WebP-typed preload link, and is ~66KB. Current LCP sits in the "good" band (1.0-1.7s desktop). The marginal benefit from astro:assets is an AVIF variant + src-imported fingerprinting — modest gains that don't justify the risk of breaking the LCP path when the existing setup is healthy.
- What's involved (for a future dedicated session):
  - Phase 1: move `public/images/showcase/fixed/laptop+mobile+mohawk.webp` → `src/assets/`; `import heroImage from '../assets/…'`; replace `<img>` with `<Image src={heroImage} width={600} height={417} …/>`. Update preload link to use the hashed import URL. Touches 4 references in `index.astro` + `src/utils/imageStories.ts`.
  - Phase 2: card images on article listing pages (ArticleCard component).
  - Phase 3: gallery images.
- Acceptance (whenever picked up): build emits webp/avif variants; Lighthouse LCP no worse than current baseline; preview eyeball on hero card confirms visual parity.
- Revisit trigger: post-deploy PageSpeed read after the current 14-commit deploy. If LCP regresses or AVIF savings look meaningful on field data, prioritize. Otherwise park.

**Playwright smoke tests for 301 redirects** (~2 hours)
- Install: `npm install --save-dev @playwright/test`
- New file: `tests/redirects.spec.ts`
- Cover: ~15-20 representative old WP URLs → new Astro URLs (pick from the high-traffic ones in `_redirects`), verify 301 status + `Location` header
- Add script: `"test:redirects": "playwright test"`
- Add to CI workflow
- Acceptance: all sampled redirects return 301 with expected Location; CI fails if any drift

**Contact form a11y polish** — ✅ DONE (April 22, commit `3176ff2`)
- `aria-required`, `aria-invalid` (JS-toggled on submit), `aria-describedby`-linked error spans, `/thank-you` page + form action, autocomplete hints, novalidate + custom submit handler so JS owns the UX. Screen-reader walkthrough NOT yet confirmed manually — recommended before closing acceptance.

**Contrast audit pass** — ✅ DONE (April 22, commit `2cfed4a`)
- Replaced `text-neutral-500` (#b1c0c9, 1.87:1 on white) with `text-neutral-700` (#636466, 6.03:1) across 18 files.
- Replaced `bg-neutral-600` (white-text chips + testimonial community-category avatar, 2.89:1) with `bg-neutral-700` (6.03:1) across 4 files.
- Audited `text-white/60-90` instances; remaining uses are all on dark backgrounds (primary-900 hero gradients, colored card backgrounds) — AA-safe.

**Per-page OG image generation** (~depends on your design input)
- Decision gate: brand template (fill-in-the-blank) vs per-article custom vs AI-generated from hero images
- Blocked on Tim's design direction
- Deferred items 6-7 from lang audit (frontmatter title wrapping + ImageStoryModal set:html) pair naturally with template-layer work

**Promote CSP to enforced** (~15 min)
- Only after 1-2 weeks of Report-Only monitoring in production (needs deploy first!)
- File: `public/_headers`
- Rename header `Content-Security-Policy-Report-Only` → `Content-Security-Policy`
- Acceptance: no real user-facing violations after 48 hours

**Lang-tagging deferred items from Sprint 1** — ✅ DONE (April 22, commit `38cf72f`)
- ✅ Frontmatter `<span lang>` support — `CollectionArticleLayout` h1 and `newsletters/[volume]/[slug]` h1 now render titles with `Fragment set:html`. Newsletter volume listing (`newsletters/[slug]`) also updated so "In This Issue" titles support lang wrapping.
- ✅ ImageStoryModal `set:html` — description now supports HTML; `Kanien'kéha` wrapped in `<span lang="moh">` in the Wahta Mohawk homepage modal story (`utils/imageStories.ts`).
- ✅ Chokma'shki newsletter title — wrapped in `<span lang="cho">` in `content/newsletters/volume-5.json`.
- ⚠️ Known limitation: opt-in HTML in titles renders correctly in article `<h1>` and modal description, but appears as literal text in the `<title>` tag, OG/Twitter meta, breadcrumbs, and card previews (all use `{title}` text interpolation). For now, HTML in titles should be used sparingly with that in mind. Future enhancement: add a `stripHtml` utility for the non-h1 render sites.
- Remark plugin for auto-wrapping — still Sprint 3 territory when content scale justifies it.

**Code quality deferred items** — ✅ DONE (April 22, commit `0feae85`)
- `LogoLink.astro` component extracted; Navigation.astro now uses `<LogoLink sizeClass="…" />` for both mobile header and desktop sidebar.

### Sprint 3 — Marketing Hub Foundation (scope TBD)
- Cultural authenticity pass (land acknowledgment, indigenous greeting, `lang`-tagging)
- Pillar content architecture (indigenous-language-revitalization hub)
- Case study template + first 1-2 case studies
- Grants/funding resource hub
- `/platform` product page
- CMS decision (Decap vs Sanity vs stay-git)
- GA4 event instrumentation
- **Tag filter — make it actually filter.** Discovered non-functional April 22. Site is static (no SSR adapter), so `Astro.url.searchParams.get('tag')` returns null at build and the entire `activeTag` code path in listing templates is dead. Sidebar "Browse by topic" and article tag chips navigate to `?tag=X` URLs but serve the unfiltered index. SEO-safe today (`_headers` already canonicalizes `?tag=*` back to the clean listing + `noindex, follow`), so this is pure UX. Two viable fixes:
  - **Cheap/client-side**: small inline JS that reads `location.search`, filters visible cards by `data-tag` attribute, renders "Clear Filter" + count badge. Doesn't generate tag-specific URLs; DOM-level filter only.
  - **Robust/static**: generate dedicated tag pages at `/whatarel4/tag/foo/` via `getStaticPaths`, retire the `?tag=` query-string pattern. Canonical Astro idiom. Higher cost but permanent fix + better shareability (each tag URL is its own indexable page if we ever want that).
  - Recommend path: start with client-side to restore functionality quickly, revisit static tag pages when content scale justifies the SEO win.
- **CSP violation reporting pipeline — self-hosted on Peekay.** Scoped April 22. Currently CSP is Report-Only with console-only violation visibility (no `report-uri`), so monitoring is passive/manual via DevTools. Before promoting CSP to enforced, stand up an active reporting pipeline on Peekay (the always-on Surface Book that runs the existing uptime monitor at `~/shared/site-monitor/`). Architecture agreed:

  **1. CSP listener** — `~/shared/site-monitor/csp_listener.py`, stdlib `http.server`, binds `127.0.0.1:8787`, accepts POST `/csp-report` with both `application/csp-report` and `application/reports+json` content-types, appends each report as JSONL to `~/shared/site-monitor/data/csp-reports.jsonl`, returns 204 immediately. Per-source-IP rate limit to guard against flood storms.

  **2. systemd service** — `/etc/systemd/system/csp-listener.service`, always-on (not a timer), survives reboots. Complements the existing monitor.py systemd-timer pattern — listener stays up, timer-based rollup runs alongside.

  **3. Tailscale Funnel config** — `sudo tailscale serve --https=443 --set-path=/csp-report http://localhost:8787` + `sudo tailscale funnel 443 on`. Exposes the listener at `https://<hostname>.<tailnet>.ts.net/csp-report` via outbound tunnel — no firewall inbound rules needed, preserves Peekay's "no inbound from public" posture. Get the tailnet name with `tailscale cert` or `tailscale whois @me` (note: `--json` returns null for that field).

  **4. Rollup integration** — extend existing monitor.py tick (or add a sibling `csp_rollup.py` called from monitor.py's hook loop) to: read new lines from `csp-reports.jsonl` via an offset file, compute stats (unique directives violated, top blocked URIs, rolling 1h/24h/7d counts), write state JSON alongside the existing uptime state, alert on *new* violation types only (duplicate signatures silent after first), render a dashboard panel matching the existing dark-theme-CSS-vars aesthetic. Consider adding `csp-badge.svg` to mirror the uptime badge pattern. Note: monitor.py (1017 LOC) and dashboard.py (15K LOC, standalone) are deliberately decoupled — rollup can live in either; probably add to dashboard.py since that's where the existing HTML rendering lives.

  **5. Site-side change** — single-line addition to `public/_headers` CSP directive: `; report-uri https://<hostname>.<tailnet>.ts.net/csp-report`. Takes effect on next deploy.

  **Sequence:** stand up 1+2+3 on Peekay first, smoke-test the endpoint receives a manual `curl` POST, THEN push the site-side change. Otherwise browsers POST to a non-existent endpoint (fails silently but generates noise).

  **Once this is live**, the CSP Report-Only → enforced promotion (currently time-gated on "1-2 weeks of console observation") becomes a measurable, data-driven decision instead of vibes-based — watch the rollup for N days, confirm no unexpected violations, flip the header.

  **Alternative considered + rejected**: Netlify Function → Telegram/email direct (no archival, no trend analysis), report-uri.com (external dependency, out-of-stack). Peekay-hosted was chosen for all-local control + matches existing Python monitoring stack + Tailscale Funnel is free/clean.

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
