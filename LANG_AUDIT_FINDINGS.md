# Lang-Attribute Audit Findings
*Scan date: April 17, 2026*

## Purpose

Identify existing Indigenous-language text in the codebase that should be wrapped in `<span lang="…">` tags for:
- **WCAG 3.1.2** compliance (language of parts)
- Screen readers to pronounce the words using the correct language's phonology instead of English phonics
- Search engines to understand the multilingual nature of content

## How to use this file

1. Review each finding. Check: **confidence**, **location**, **current text**, **proposed lang code**.
2. Mark each as: ✅ **Approve** (wrap as suggested) / ✏️ **Modify** (different code or text) / ❌ **Skip** (treat as English/proper name).
3. Once reviewed, I'll apply the approved wraps.

**Note on scope**: This audit covers text that *renders to the page*. It does NOT include image filenames, URL slugs, or code identifiers. Indigenous-language text that only appears in `alt` attributes or frontmatter is flagged separately — wrapping attribute text requires different handling.

---

## HIGH confidence — likely safe to wrap

These are clearly Indigenous-language words (not English usage) with well-established BCP 47 codes.

### 1. Kanien'kéha (Mohawk, `moh`)

The Mohawk language as it names itself. Always in-language.

| File | Line | Text | Proposed wrap |
|---|---|---|---|
| `src/utils/imageStories.ts` | 26 | `Kanien'kéha (Mohawk)` | `<span lang="moh">Kanien'kéha</span> (Mohawk)` |
| `src/pages/contact.astro` | 83 | `placeholder="e.g., Kanien'kéha (Mohawk)"` | Placeholder text — `lang` attribute on `<input lang="moh">` is problematic. Alternative: rewrite placeholder as `"e.g., Mohawk or Kanien'kéha"` and skip wrapping. ⚠️ **Needs your call.** |

### 2. Chokma'shki (Chickasaw, `cic`)

Chickasaw word meaning "Thank you." Clear in-language usage.

| File | Line | Text | Proposed wrap |
|---|---|---|---|
| `src/content/newsletters/volume-5.json` | 22 | `"Founder's Corner: Chokma'shki"` | JSON title — rendered as article title. Wrapping requires a template change (title is currently rendered as plain text). Low priority. |

### 3. Diné / Diné Bizaad (Navajo, `nv`)

"Diné" is the Navajo self-name for their people ("The People"). "Diné Bizaad" = "the Navajo language." Both are in-language.

| File | Line | Text | Proposed wrap |
|---|---|---|---|
| `src/content/whatarel4/celebrating-star-wars-day-with-the-din-dub...md` | 38 | `"the Navajo language, also known as Diné Bizaad."` | `<span lang="nv">Diné Bizaad</span>` |
| `src/content/whatarel4/the-integration-of-traditional-navajo-horticulture...md` | 39 | `The Navajo word for peach, "Diné didzétsoh,"` | `<span lang="nv">Diné didzétsoh</span>` |
| `src/content/whatarel4/languages-4-founder-tim-o-hagan...md` | 37, 3 | `"the Dakota people"` | DO NOT wrap — "Dakota" in this English prose context refers to the people by their English-adopted name. |

**Note on article titles/frontmatter** containing "Diné": Wrapping frontmatter strings requires template changes. Proposed: handle in a later pass.

### 4. ʻĀina and ʻŌlelo Hawaiʻi (Hawaiian, `haw`)

- `ʻāina` — Hawaiian word for land (used throughout signature collections).
- `ʻōlelo Hawaiʻi` — Hawaiian language ("Hawaiian speech").
- `kaulana mahina` — Hawaiian moon calendar.
- `inoa ʻāina` — Hawaiian place names.
- `Kupuna` — elders.

These appear across 4 signature-collection articles (dozens of instances). High-confidence wraps. The Hawaiian okina (ʻ) is U+02BB, important for orthographic correctness.

| Article | Instances |
|---|---|
| `hawaiian-language-revitalization-how-ina-based-education-is-reconnecting-language-land-and-culture.md` | Many — body text |
| `ina-based-education-revitalizing-indigenous-languages-through-land-culture.md` | Many — body text + frontmatter |
| `ina-based-education-scaling-indigenous-language-revival.md` | Many — body text + frontmatter |
| `strengthening-indigenous-and-ina-based-language-revitalization-funding-education-and-sustainability.md` | Many — body text + frontmatter |

Proposed wraps (examples):
- `ʻĀina-Based Education` → `<span lang="haw">ʻĀina</span>-Based Education` (keep English compound structure, wrap the Hawaiian word)
- `ʻōlelo Hawaiʻi` → `<span lang="haw">ʻōlelo Hawaiʻi</span>`
- `Kupuna (elders)` → `<span lang="haw">Kupuna</span> (elders)`

**Scope note**: Wrapping inside markdown requires either (a) a remark plugin that auto-wraps known terms, or (b) manual rewrite of the markdown files. Option (b) is straightforward but spreads across 4 articles × many instances. ~45 min.

### 5. Kwetlal (Lekwungen / SENĆOŦEN, `str`)

Lekwungen word for the camas bulb. Central to one article about Lekwungen agricultural practices.

| File | Text | Proposed wrap |
|---|---|---|
| `src/content/whatarel4/revitalizing-kwetlal...md` | `kwetlal` appears ~15x in body | `<span lang="str">kwetlal</span>` |
| Same | `Lekwungen` appears as a self-name | Lekwungen = self-name of the people. Could be treated as English proper noun or as in-language. Default: leave unwrapped (English prose proper noun). Your call. |

### 6. Xaxli'p (Stʼatʼimc / Lillooet, `lil`)

Stʼatʼimc community self-name + their words for land and people.

| File | Text | Proposed wrap |
|---|---|---|
| `src/content/whatarel4/the-xaxli-p-forest-regeneration...md` line 40 | `the Xaxli'p word for land, Tmixw` | `<span lang="lil">Tmixw</span>` |
| Same line | `Úxwalmixw means "people of the land"` | `<span lang="lil">Úxwalmixw</span>` |
| Same file | `Xaxli'p` as community name, many instances | Self-name used in English prose — leave unwrapped by default. |

---

## MEDIUM confidence — please confirm

### 7. Haudenosaunee / Anishinaabe (self-names in English prose)

"Haudenosaunee" is the self-name of the Iroquois Confederacy (from Mohawk/Onondaga). "Anishinaabe" is the Ojibwe self-name for themselves.

These appear in English prose as *proper nouns* — not fully "in-language" usage. Two philosophies:

- **Strict**: don't wrap — they function as English names for these peoples
- **Inclusive**: wrap — they are the peoples' own language for themselves, and treating them as English flattens that

| File | Line | Text |
|---|---|---|
| `src/content/whatarel4/celebrating-the-spirit-of-the-creator-s-game...md` | 32 | `tribes such as the Haudenosaunee, Anishinaabe, and many others` |

**Your call.** If you want these wrapped, I'd use `lang="moh"` for Haudenosaunee (closest widely-supported code; Onondaga `ono` or Cayuga `cay` exist but less tooling support) and `lang="oj"` for Anishinaabe.

### 8. Baggataway / Tewaaraton (Indigenous names for lacrosse)

| File | Line | Text |
|---|---|---|
| Same article as above | 32 | `Known traditionally as Baggataway or Tewaaraton` |

- **Baggataway** — Anishinaabe origin; `lang="oj"`
- **Tewaaraton** — Mohawk origin; `lang="moh"`

Strong candidates for wrapping. In-language proper nouns of traditional practices.

### 9. Haipažaža Pȟežuta (Lakota, `lkt`)

A Lakota phrase in an article subheading.

| File | Line | Text | Proposed wrap |
|---|---|---|---|
| `src/content/whatarel4/celebrate-the-holidays-with-indigenous-flair...md` | 38 | `## 🌿 Haipažaža Pȟežuta: Nature's Bounty, Lakota Style` | `<span lang="lkt">Haipažaža Pȟežuta</span>` |

**Orthography check**: `ž` and `ȟ` are standard in contemporary Lakota orthography. The phrase means roughly "soap medicine" — which is a business name (a Lakota-owned soap company). Worth confirming this is meant as Lakota-proper-name, not English-adopted.

### 10. Ocheti Sakowin Tha Makhoche (Dakota/Lakota, `dak` or `lkt`)

| File | Line | Text |
|---|---|---|
| `src/content/whatarel4/celebrate-the-holidays-with-indigenous-flair...md` | 42 | `Lakota & Dakota Ocheti Sakowin Tha Makhoche (Homelands of the Seven Council Fires, commonly known as the Great Sioux Nation)` |

Óčhéthi Šakówiŋ = "Seven Council Fires" in Lakota. The phrase as written uses a simplified spelling. Proposed wrap: `<span lang="lkt">Ocheti Sakowin Tha Makhoche</span>`, but orthographic correctness deserves a pass.

---

## LOW confidence / ambiguous — likely skip

### 11. "Mohawk" / "Navajo" / "Chickasaw" / "Hawaiian" / "Lakota" / "Dakota" / "Ojibwe" in English prose

These are English-adopted names for the people or languages. Site uses them constantly in English sentences. **Do NOT wrap** — they're functioning as English words.

### 12. Proper names in English

"Sitting Bull", "Chief Joseph", "Manuelito Wheeler" — these are either English translations or English names. Skip.

### 13. Image filenames referencing Indigenous words

Filenames like `kwetlal_restoration_500.webp` — not user-visible text. Skip.

### 14. Article slugs

URL slugs contain Indigenous terms (e.g., `the-xaxli-p-forest-regeneration`). Slugs are URLs, not rendered text in the lang sense. Skip.

---

## Recommended execution order

1. **Component-level wraps** (`imageStories.ts`, `contact.astro`) — 2 locations, ~10 min. Highest visibility/authority: these appear on homepage modals and the contact form.
2. **Hawaiian article pass** — 4 articles, ~45 min. Highest quantity of in-language text on the site.
3. **Kwetlal + Xaxli'p articles** — ~15 min.
4. **Navajo / Diné mentions in 2 articles** — ~10 min.
5. **Edge cases** (Haudenosaunee, Lakota phrases) — requires your call on philosophy (inclusive vs. strict).

Total estimated work if all approved: **~90 minutes of mechanical edits** once decisions are made.

---

## Architectural note — remark plugin option

If the site will grow with more Indigenous-language content, consider a **remark plugin** that auto-wraps known terms based on a config dictionary:

```
{
  "moh": ["Kanien'kéha", "Haudenosaunee", "Tewaaraton"],
  "haw": ["ʻāina", "ʻōlelo Hawaiʻi", "Kupuna", "kaulana mahina"],
  "lkt": ["Haipažaža Pȟežuta", "Ocheti Sakowin"],
  ...
}
```

This would:
- Make lang-tagging automatic on new articles
- Ensure consistency across all markdown
- Let you grow the vocabulary over time

Trade-off: one-time build complexity vs. manual per-file tagging. For current content volume, manual is fine; for post-marketing-scale content, plugin becomes attractive.

---

## Your decisions required

Please mark each of the following:

- [ ] Approve items 1–6 (HIGH confidence wraps) as proposed?
- [ ] Decision on #2 (Chokma'shki newsletter title) — wrap requires template change; wait until we do the newsletter template overhaul?
- [ ] Decision on #7 (Haudenosaunee / Anishinaabe in English prose) — strict (skip) or inclusive (wrap)?
- [ ] Decision on #8 (Baggataway / Tewaaraton) — wrap as proposed?
- [ ] Decision on #9–10 (Lakota phrases) — any orthographic corrections needed before wrapping?
- [ ] Decision on contact form placeholder — rewrite to remove `Kanien'kéha`, or leave as-is?
- [ ] Interested in the remark plugin for future-proofing? (Sprint 3+ if so.)
