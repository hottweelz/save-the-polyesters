export default function robots() {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: 'https://savethepolyesters.org/sitemap.xml',
  };
}
