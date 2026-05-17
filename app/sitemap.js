import { SITE_URL } from '@/lib/site';

const PATHS = [
  '', '/about', '/our-story', '/threats', '/rescue-stories', '/take-action', '/research', '/merchandise',
  '/team', '/contact', '/safe-communities', '/faq',
  '/annual-report', '/news', '/memorial',
  '/legal/disclaimer', '/legal/terms', '/legal/privacy', '/legal/cookies',
  '/legal/eula', '/legal/accessibility', '/legal/esg',
];

export default function sitemap() {
  const now = new Date();
  return PATHS.map((p) => ({
    url: `${SITE_URL}${p}`,
    lastModified: now,
    changeFrequency: p === '' ? 'weekly' : 'monthly',
    priority: p === '' ? 1.0 : 0.7,
  }));
}
