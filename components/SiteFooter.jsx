import Link from 'next/link';

const LEGAL_LINKS = [
  { href: '/legal/disclaimer/',    label: 'Satire Notice' },
  { href: '/legal/terms/',         label: 'Terms of Service' },
  { href: '/legal/privacy/',       label: 'Privacy Policy' },
  { href: '/legal/cookies/',       label: 'Cookie Policy' },
  { href: '/legal/eula/',          label: 'EULA' },
  { href: '/legal/accessibility/', label: 'Accessibility (ADA · WCAG)' },
  { href: '/legal/esg/',           label: 'ESG Statement' },
];

export default function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-moss-700/15 bg-moss-900 text-cream-100">
      <div className="container-wide py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-display text-2xl text-cream-50">Polyester Conservation Coalition</p>
          <p className="mt-3 text-cream-100/80 max-w-md">
            A 501(c)(3)-pending international nonprofit alliance defending the
            world&rsquo;s last wild polyester populations from industrial fiber
            harvesting, microfiber habitat collapse, and the relentless expansion
            of artificial intelligence infrastructure.
          </p>
          <p className="mt-4 text-xs text-cream-100/50">
            EIN pending · Registered with the International Synthetic Fauna Registry (ISFR-44-991)
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-widest text-rose-200 mb-3">Learn</p>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about/">The Species</Link></li>
            <li><Link href="/threats/">Threats</Link></li>
            <li><Link href="/research/">Research</Link></li>
            <li><Link href="/rescue-stories/">Rescue Stories</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase tracking-widest text-rose-200 mb-3">Act</p>
          <ul className="space-y-2 text-sm">
            <li><Link href="/take-action/">Take Action</Link></li>
            <li><Link href="/take-action/#donate">Donate</Link></li>
            <li><Link href="/take-action/#adopt">Adopt a Polyester</Link></li>
            <li><Link href="/merchandise/">Shop</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream-100/10 bg-moss-900">
        <div className="container-wide py-4 text-[11px] text-cream-100/65 flex flex-wrap gap-x-4 gap-y-1 justify-center">
          {LEGAL_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-cream-50">{l.label}</Link>
          ))}
        </div>
      </div>

      <div className="border-t border-cream-100/10">
        <div className="container-wide py-6 text-xs text-cream-100/60 flex flex-col md:flex-row gap-3 md:justify-between">
          <p>© {new Date().getFullYear()} Polyester Conservation Coalition (fictional). All rights satirized.</p>
          <p className="italic">GDPR · CCPA · ADA · WCAG 2.2 AA aligned · ESG-aware</p>
        </div>
      </div>
    </footer>
  );
}
