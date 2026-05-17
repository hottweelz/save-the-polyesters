import Link from 'next/link';
import Reveal from '@/components/Reveal';
import DonationBanner from '@/components/DonationBanner';
import CountUp from '@/components/CountUp';
import { SITE_URL } from '@/lib/site';

export const metadata = {
  title: 'FY2025 Annual Report',
  description:
    'The Polyester Conservation Coalition\'s FY2025 financial and programmatic report: $14.3M raised, 92¢ of every dollar to mission, 47,431 individuals rescued since founding, 41 certified Polyester-Safe communities. Audited; bylaws-compliant.',
  alternates: { canonical: '/annual-report/' },
  openGraph: {
    title: 'FY2025 Annual Report · Save The Polyesters',
    description:
      'Twelve months. $14.3M raised. 92¢ of every dollar to mission. The full numbers, plainly.',
    url: '/annual-report/',
    type: 'article',
  },
};

const HEADLINE_STATS = [
  { v: 14.3, suf: 'M',  pre: '$',   dec: 1, label: 'Total revenue, FY2025' },
  { v: 13.9, suf: 'M',  pre: '$',   dec: 1, label: 'Total expenses, FY2025' },
  { v: 92,   suf: '¢',           label: 'Of every dollar to programmatic spend' },
  { v: 87,   suf: '',  pre: '$',  label: 'Average individual gift' },
];

const INCOME = [
  { label: 'Individual one-time gifts',  pct: 71, body: '38,418 unique donors. Average gift $87. Median $40.' },
  { label: 'Monthly sustaining donors',  pct: 14, body: '7,204 active sustainers as of fiscal year end. Median monthly gift $14.' },
  { label: 'Merchandise & shop revenue', pct: 8,  body: '100% of net merchandise profit allocated to field operations. ISSMW-verified supply chain.' },
  { label: 'Planned giving & bequests',  pct: 5,  body: '11 realized bequests. 47 active will-language commitments on file.' },
  { label: 'Foundation & research grants', pct: 2, body: 'Six awards from independent foundations. No corporate, governmental, or industry-affiliated funding.' },
];

const EXPENSES = [
  { label: 'Field operations',          pct: 78, body: 'Rescue, intake, triage, burrow restoration, regional staff stipends, 24/7 hotline, transport, veterinary care.' },
  { label: 'Research & federal advocacy', pct: 14, body: 'Peer-reviewed publication, dataset maintenance, federal hearing preparation, legal counsel for moratorium work.' },
  { label: 'General administration',     pct: 8,  body: 'Accounting, audit, IT, donor stewardship, communications. Includes all fundraising costs.' },
];

const RESULTS = [
  { v: 1278,    label: 'Active rescue cases per average week, FY2025' },
  { v: 47431,   label: 'Total individuals rescued since founding (2014)' },
  { v: 41,      label: 'Polyester-Safe certified communities (2 added in FY2025; 1 decertified for cause)' },
  { v: 318412,  label: 'Petition signatures delivered to federal subcommittees' },
  { v: 5,       label: 'Federal hearings at which PCC counsel testified' },
  { v: 2,       label: 'Peer-reviewed papers published by PCC Institute' },
];

const GIVING_CIRCLES = [
  { name: 'The Burrow Society',  threshold: '$50,000+',    count: 19,  body: 'Founding-level annual donors. Recognized by default with the option to remain anonymous.' },
  { name: 'The Field Circle',    threshold: '$10,000–$49,999', count: 84,  body: 'Major sustaining donors. Receive an annual field-team briefing call.' },
  { name: 'The Coordinators',    threshold: '$1,000–$9,999', count: 612, body: 'Underwrite a full year of regional coordinator stipends.' },
  { name: 'The Sustainers',      threshold: 'Monthly recurring', count: 7204, body: 'The backbone of the operating budget. Median monthly gift $14.' },
];

const GOVERNANCE = [
  'Audited annually by Heller Bergstrom LLP (Riverhead, NY). FY2025 unqualified opinion on file with counsel; available on written request.',
  '3.5× compensation ratio cap from entry-level rescuer salary to highest-paid employee. Confirmed in the FY2025 audit. Has not been adjusted since 2014.',
  'Nine-member volunteer board. No executive officer of the Coalition sits on the board. Board meetings are public and the minutes are posted within 30 days.',
  'No PCC employee, board member, or family member of either holds equity in, or compensated advisory positions with, any company in our four declined-industry categories.',
  '501(c)(3) designation pending; FY2025 operated under fiscal-sponsorship arrangement with Heron Conservation Trust (EIN 47-1922041). All gifts tax-deductible under that arrangement.',
];

const PIE_COLORS = ['bg-rose-600', 'bg-moss-700', 'bg-cream-50 ring-1 ring-moss-700/20'];

export default function AnnualReportPage() {
  const reportSchema = {
    '@context': 'https://schema.org',
    '@type': 'Report',
    '@id': `${SITE_URL}/annual-report/#fy2025`,
    name: 'Polyester Conservation Coalition FY2025 Annual Report',
    headline: 'PCC FY2025 Annual Report',
    description:
      'Financial and programmatic accounting for fiscal year 2025: $14.3M revenue, 92¢ of every dollar to mission, 47,431 individuals rescued since founding.',
    reportNumber: 'PCC-AR-FY2025',
    datePublished: '2025-12-09',
    inLanguage: 'en',
    url: `${SITE_URL}/annual-report/`,
    publisher: { '@type': 'NGO', name: 'Polyester Conservation Coalition', url: SITE_URL },
    isPartOf: { '@type': 'WebSite', name: 'Save The Polyesters', url: SITE_URL },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reportSchema) }}
      />

      <section className="container-wide pt-20 md:pt-28 pb-10">
        <Reveal>
          <p className="eyebrow">FY2025 Annual Report · Published December 9, 2025</p>
          <h1 className="h-display text-5xl md:text-7xl mt-3 text-moss-900 max-w-4xl">
            We owe you<br/>
            <span className="text-rose-600 italic">an accounting.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg md:text-xl text-moss-700/90 leading-relaxed">
            Twelve months. <strong>$14.3 million</strong> raised. <strong>92¢</strong> of every dollar
            into the field. <strong>47,431</strong> individuals rescued since founding. The full
            numbers, plainly.
          </p>
        </Reveal>
      </section>

      <section aria-label="Headline financial stats" className="container-wide my-10">
        <div className="card grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8">
          {HEADLINE_STATS.map((s, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div>
                <div className="stat-num">
                  {s.pre || ''}<CountUp to={s.v} suffix={s.suf} decimals={s.dec || 0} />
                </div>
                <div className="stat-label">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-wide my-20 grid lg:grid-cols-2 gap-10 items-start">
        <Reveal>
          <p className="eyebrow">Where the money came from</p>
          <h2 className="h-section mt-2">Funded entirely by individuals.</h2>
          <p className="mt-3 text-moss-700/90 leading-relaxed">
            We accepted no contributions from fast-fashion brands, data-center operators, AI
            infrastructure firms, or industrial polyester farms. We turned down three offers in
            FY2025 totaling $4.1 million. We are happy to name them on written request to counsel.
          </p>
          <BreakdownBars items={INCOME} />
        </Reveal>

        <Reveal delay={0.1}>
          <p className="eyebrow">Where the money went</p>
          <h2 className="h-section mt-2">Into the field, mostly. By design.</h2>
          <p className="mt-3 text-moss-700/90 leading-relaxed">
            Our programmatic spend ratio outperforms the Charity Navigator and BBB Wise Giving
            Alliance thresholds for top-tier accountability. We do not consider this a virtue;
            we consider it the minimum.
          </p>
          <BreakdownBars items={EXPENSES} />
        </Reveal>
      </section>

      <section className="container-wide my-20">
        <Reveal>
          <p className="eyebrow">What the money did</p>
          <h2 className="h-section mt-2">Six numbers from a long year.</h2>
        </Reveal>
        <div className="mt-10 grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {RESULTS.map((r, i) => (
            <Reveal key={r.label} delay={(i % 3) * 0.05}>
              <article className="card h-full">
                <p className="stat-num"><CountUp to={r.v} /></p>
                <p className="stat-label">{r.label}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-wide my-20">
        <Reveal>
          <p className="eyebrow">Donor recognition</p>
          <h2 className="h-section mt-2">Four giving circles. Anonymity by default.</h2>
          <p className="mt-3 max-w-3xl text-moss-700/90 leading-relaxed">
            We do not publish donor names. Recognition is opt-in, in writing, per gift. If you would
            like to be acknowledged in a future annual report, indicate so on your next donation or
            write to legacy@savethepolyesters.org.
          </p>
        </Reveal>
        <ul className="mt-10 grid md:grid-cols-2 gap-5">
          {GIVING_CIRCLES.map((c, i) => (
            <Reveal key={c.name} delay={(i % 2) * 0.05}>
              <li className="card h-full">
                <div className="flex items-baseline justify-between gap-4">
                  <p className="font-display text-xl text-moss-900">{c.name}</p>
                  <p className="text-xs uppercase tracking-widest text-rose-600">{c.threshold}</p>
                </div>
                <p className="mt-3 text-sm text-moss-700/90 leading-relaxed">{c.body}</p>
                <p className="mt-4 text-xs text-moss-700/70 italic">
                  {c.count.toLocaleString()} members in FY2025.
                </p>
              </li>
            </Reveal>
          ))}
        </ul>
      </section>

      <section className="container-wide my-20">
        <Reveal>
          <p className="eyebrow">Governance & compliance</p>
          <h2 className="h-section mt-2">Five things you should be able to check.</h2>
        </Reveal>
        <ol className="mt-10 grid md:grid-cols-2 gap-5">
          {GOVERNANCE.map((g, i) => (
            <Reveal key={i} delay={(i % 2) * 0.05}>
              <li className="card h-full">
                <p className="font-display text-2xl text-rose-600">0{i + 1}</p>
                <p className="mt-2 text-sm text-moss-700/90 leading-relaxed">{g}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="container-wide my-20">
        <Reveal>
          <div className="card md:p-12 grid md:grid-cols-[1fr_auto] gap-6 items-center">
            <div>
              <p className="eyebrow">For the record</p>
              <h2 className="font-display text-2xl md:text-3xl text-moss-900 mt-2">
                Download the FY2025 Form 990 and audited financial statements.
              </h2>
              <p className="mt-3 text-moss-700/90 max-w-2xl leading-relaxed">
                The full Form 990, FY2025 audit letter, and supporting schedules are being prepared
                for public posting. In the meantime, written requests to{' '}
                <a href="mailto:counsel@savethepolyesters.org" className="underline underline-offset-4 hover:text-rose-600">
                  counsel@savethepolyesters.org
                </a>{' '}
                are answered within five business days.
              </p>
            </div>
            <Link href="/contact/" className="btn-primary md:self-end">Request the packet</Link>
          </div>
        </Reveal>
      </section>

      <DonationBanner
        eyebrow="92¢ of every dollar still goes directly to the field."
        title="Last year's accounting is closed. This year's burrows still need defending."
      />
    </>
  );
}

function BreakdownBars({ items }) {
  return (
    <div className="mt-6 grid gap-4">
      {items.map((it, i) => (
        <div key={it.label}>
          <div className="flex items-baseline justify-between gap-4">
            <p className="font-display text-base text-moss-900">{it.label}</p>
            <p className="font-display text-lg text-rose-600 tabular-nums">{it.pct}%</p>
          </div>
          <div
            className="mt-2 h-2 rounded-full bg-moss-700/10 overflow-hidden"
            role="img"
            aria-label={`${it.label}: ${it.pct} percent`}
          >
            <div
              className={`h-full ${i === 0 ? 'bg-rose-600' : 'bg-moss-700/70'}`}
              style={{ width: `${it.pct}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-moss-700/80 leading-relaxed">{it.body}</p>
        </div>
      ))}
    </div>
  );
}
