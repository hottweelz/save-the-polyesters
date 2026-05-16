import Link from 'next/link';

const NAV = [
  { href: '/legal/disclaimer/',    label: 'Satire Notice' },
  { href: '/legal/terms/',         label: 'Terms of Service' },
  { href: '/legal/privacy/',       label: 'Privacy Policy' },
  { href: '/legal/cookies/',       label: 'Cookie Policy' },
  { href: '/legal/eula/',          label: 'EULA' },
  { href: '/legal/accessibility/', label: 'Accessibility' },
  { href: '/legal/esg/',           label: 'ESG' },
];

export default function LegalLayout({ children }) {
  return (
    <section className="container-wide pt-16 md:pt-24 pb-20 grid lg:grid-cols-[16rem_1fr] gap-10">
      <aside className="lg:sticky lg:top-24 self-start">
        <p className="eyebrow">Legal</p>
        <nav aria-label="Legal navigation" className="mt-3">
          <ul className="space-y-1 text-sm">
            {NAV.map(n => (
              <li key={n.href}>
                <Link href={n.href} className="block py-2 px-3 rounded-lg hover:bg-moss-700/5 text-moss-900/80 hover:text-rose-600">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <article className="max-w-3xl">
        <div className="rounded-xl border border-rose-200 bg-rose-200/30 px-5 py-4 text-sm text-moss-900/90 mb-10">
          <strong>Satire notice.</strong> Save The Polyesters is a work of parody and satire.
          The Polyester Conservation Coalition is a fictional organization. The species
          <em> Polysynthia domestica </em> does not exist. These legal documents are styled
          after real-world templates so the site can responsibly cover required disclosures
          (cookies, privacy, accessibility, etc.) — but no real donations, transactions, or
          personal data are processed by this site. See the full
          {' '}<Link className="underline" href="/legal/disclaimer/">satire disclaimer</Link>.
        </div>
        <div className="prose-legal">{children}</div>
      </article>
    </section>
  );
}
