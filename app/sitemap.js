const BASE = 'https://savethepolyesters.org';
const PATHS = [
  '', '/about', '/threats', '/rescue-stories', '/take-action', '/research', '/merchandise',
  '/legal/disclaimer', '/legal/terms', '/legal/privacy', '/legal/cookies',
  '/legal/eula', '/legal/accessibility', '/legal/esg',
];

export default function sitemap() {
  const now = new Date();
  return PATHS.map(p => ({
    url: `${BASE}${p}`,
    lastModified: now,
    changeFrequency: p === '' ? 'weekly' : 'monthly',
    priority: p === '' ? 1.0 : 0.7,
  }));
}
