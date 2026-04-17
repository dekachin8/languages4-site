import { defineConfig } from '@playwright/test';

/**
 * Playwright config for Languages 4 regression tests.
 *
 * Redirect tests verify that Netlify's _redirects rules are still intact.
 * Redirects are served by Netlify's edge, NOT by plain `astro preview`,
 * so tests must target a URL that actually evaluates _redirects:
 *
 *   • Default:           https://www.languages4.com (real production)
 *   • Branch preview:    BASE_URL=https://<branch>--<site>.netlify.app
 *   • Local Netlify Dev: BASE_URL=http://localhost:8888 (requires `netlify dev`)
 *
 * These tests do not require a browser binary — they use Playwright's
 * request context (HTTP only). `npx playwright install` is NOT needed.
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: 'list',
  use: {
    baseURL: process.env.BASE_URL || 'https://www.languages4.com',
    extraHTTPHeaders: {
      'User-Agent': 'Languages4-CI-RedirectTests/1.0',
    },
  },
});
