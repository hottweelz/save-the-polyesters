// Canonical site URL. Resolved at build time, in this priority order:
//   1. NEXT_PUBLIC_SITE_URL   — set this when you have a real domain.
//   2. CF_PAGES_URL           — Cloudflare Pages auto-populates this at build.
//   3. http://localhost:3000  — dev default; keeps Next from warning, but
//                                any baked-in absolute URLs (OG image, sitemap)
//                                will be useless to social scrapers until a
//                                real value is configured.
//
// Set it on Cloudflare:
//   Workers & Pages → your project → Settings → Variables → Production
//     NEXT_PUBLIC_SITE_URL = https://savethepolyesters.org
//
// Set it locally:
//   echo 'NEXT_PUBLIC_SITE_URL=https://example.com' > .env.local

const raw =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.CF_PAGES_URL ||
  'http://localhost:3000';

export const SITE_URL = raw.replace(/\/$/, '');
export const SITE_URL_IS_PLACEHOLDER =
  !process.env.NEXT_PUBLIC_SITE_URL && !process.env.CF_PAGES_URL;
