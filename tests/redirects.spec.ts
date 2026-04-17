import { test, expect } from '@playwright/test';

/**
 * 301 redirect smoke tests.
 *
 * These tests catch regressions in `public/_redirects` — e.g., a rule
 * accidentally deleted, a slug renamed without updating the redirect,
 * or Netlify's edge misinterpreting a pattern.
 *
 * Selection criteria for the ~15 tested URLs:
 *   - High-traffic article pages (founder Q&A, lacrosse, Navajo peaches, etc.)
 *   - One of each legacy URL shape: .php, .html, /Contact_Us/
 *   - Cross-collection moves (e.g., blog/lacrosse → whatarel4/lacrosse)
 *   - Internal placeholder redirects (/trial, /smash — previously broken)
 *   - Catch-all fallbacks (/blog/* → /whatarel4/, etc.)
 *
 * Not exhaustive — the full `_redirects` file has ~140 entries. This sample
 * is designed to detect whether the redirect system as a whole is healthy,
 * not to verify every individual rule.
 */

type Redirect = {
  from: string;
  to: string;
  note?: string;
};

const redirects: Redirect[] = [
  // Internal placeholder redirects (added Sprint 1 when pages don't yet exist)
  { from: '/trial', to: '/contact/', note: 'page not yet built' },
  { from: '/smash', to: '/about/', note: 'partnership page not yet built' },

  // High-value article redirects (WordPress → Astro)
  {
    from: '/blog/l4_blog_7.13.23_QAwFounder.php',
    to: '/whatarel4/languages-4-founder-tim-o-hagan-on-revitalizing-indigenous-languages/',
    note: 'founder Q&A',
  },
  {
    from: '/blog/l4_blog_5.13.24_lacrosse.php',
    to: '/whatarel4/celebrating-the-spirit-of-the-creator-s-game-the-indigenous-roots-and-olympic-future-of-lacrosse/',
    note: 'lacrosse article',
  },
  {
    from: '/blog/l4_blog_4.16.24_NavajoPeaches.php',
    to: '/whatarel4/the-integration-of-traditional-navajo-horticulture-into-language-and-cultural-education/',
    note: 'Navajo horticulture',
  },
  {
    from: '/blog/l4_blog_5.4.24_StarwarsDay.html',
    to: '/whatarel4/celebrating-star-wars-day-with-the-din-dub-preserving-indigenous-language-and-culture/',
    note: '.html variant of the Star Wars Day post',
  },

  // Signature-collections series (Hawaiian / Land Back)
  {
    from: '/blog/l4_blog_2.20.25_hawaiian_success.php',
    to: '/signature-collections/hawaiian-language-revitalization-how-ina-based-education-is-reconnecting-language-land-and-culture/',
    note: 'Hawaiian series entry (note: originally in /blog/ not /collections/)',
  },
  {
    from: '/collections/l4_signature_3.24.25_land_back1-1.php',
    to: '/signature-collections/land-back-indigenous-language-revitalization-reclaiming-culture-identity/',
    note: 'Land Back series part 1',
  },

  // Ancestors collection
  {
    from: '/ancestors/l4_gen_5.15.24_ancestors_buffalohump.php',
    to: '/ancestors/languages-4-generations-indigenous-ancestors-buffalo-hump-comanche-chief-of-resilience-and-resistance/',
    note: 'Buffalo Hump ancestor profile',
  },
  {
    from: '/ancestors/l4_gen_3.16.25_ancestors_chiefjoseph.php',
    to: '/ancestors/chief-joseph-of-the-nez-perce-a-leader-for-his-people-an-example-for-all/',
    note: 'Chief Joseph ancestor profile',
  },

  // Contact URL normalization
  {
    from: '/Contact_Us/',
    to: '/contact/',
    note: 'old case-sensitive URL from WordPress site',
  },
  // TODO: once Sprint 1 is deployed, add:
  //   { from: '/contact-us/', to: '/contact/', note: 'Sprint 1 consolidated canonical' }
  // Currently `/contact-us/` still renders the pre-deletion `contact-us.astro` page
  // which serves its own meta-refresh redirect (not a 301). Post-deploy, the
  // `_redirects` rule will take effect and this test should be added back.

  // Catch-all fallbacks — unknown paths under these prefixes route to section index
  {
    from: '/blog/some-nonexistent-article.php',
    to: '/whatarel4/',
    note: 'catch-all for unknown /blog/* URLs',
  },
  {
    from: '/collections/some-nonexistent-collection.php',
    to: '/signature-collections/',
    note: 'catch-all for unknown /collections/* URLs',
  },
  {
    from: '/tags/indigenous-languages',
    to: '/whatarel4/',
    note: 'catch-all for /tags/* (prevents thin-content indexing)',
  },
];

/**
 * Normalize a Location header value to just its path.
 * Netlify sends absolute URLs like "https://www.languages4.com/target/";
 * we compare paths (+ search) for stability.
 */
function toPath(location: string | undefined): string | undefined {
  if (!location) return location;
  if (location.startsWith('http')) {
    const url = new URL(location);
    return url.pathname + url.search;
  }
  return location;
}

for (const { from, to, note } of redirects) {
  const description = note ? `${from} → ${to}  (${note})` : `${from} → ${to}`;
  test(`301: ${description}`, async ({ request }) => {
    const res = await request.get(from, { maxRedirects: 0 });
    expect(res.status(), `expected 301 redirect from ${from}`).toBe(301);
    expect(toPath(res.headers()['location']), `Location header from ${from}`).toBe(to);
  });
}
