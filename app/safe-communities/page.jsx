import Link from 'next/link';
import Reveal from '@/components/Reveal';
import DonationBanner from '@/components/DonationBanner';
import { SITE_URL } from '@/lib/site';

export const metadata = {
  title: 'Polyester-Safe Communities',
  description:
    'The 41 municipalities currently certified as Polyester-Safe. Protective zoning, fauna-safe HVAC mesh, retailer disclosure, and a moratorium on hyperscale data-center construction.',
  alternates: { canonical: '/safe-communities/' },
};

const CRITERIA = [
  {
    n: '01',
    title: 'Protective burrow-corridor zoning',
    body: 'Codified setbacks of at least 240 meters around all documented active burrow corridors, with no variance available for industrial parcels.',
  },
  {
    n: '02',
    title: 'Quarter-inch fauna-safe HVAC mesh',
    body: 'Required on all commercial HVAC intakes within the municipality, retrofit deadline no longer than 36 months from certification.',
  },
  {
    n: '03',
    title: 'Fast-fashion retailer disclosure',
    body: 'Any retailer with more than 800 sqft of selling space must post the PCC origin-disclosure placard at point of sale for any garment >5% polyester.',
  },
  {
    n: '04',
    title: 'Hyperscale data-center moratorium',
    body: 'Indefinite moratorium on permitting any compute facility above 20 MW of nameplate capacity within municipal boundaries.',
  },
  {
    n: '05',
    title: 'Annual census participation',
    body: 'Municipal staff coordinate with a regional PCC field office on the annual burrow census and publish the results to the public record.',
  },
];

const COMMUNITIES = [
  // East
  { name: 'East Quogue', state: 'NY', certified: '2015', note: 'First certified · site of the 1985 colony' },
  { name: 'Sag Harbor',  state: 'NY', certified: '2015' },
  { name: 'Riverhead',   state: 'NY', certified: '2016' },
  { name: 'Northampton', state: 'MA', certified: '2016' },
  { name: 'Burlington',  state: 'VT', certified: '2017' },
  { name: 'Portland',    state: 'ME', certified: '2017' },
  { name: 'New Paltz',   state: 'NY', certified: '2017' },
  { name: 'Ithaca',      state: 'NY', certified: '2018' },
  { name: 'Lewes',       state: 'DE', certified: '2018' },
  { name: 'Charlottesville', state: 'VA', certified: '2019' },
  { name: 'Asheville',   state: 'NC', certified: '2019', note: 'PCC fulfillment co-op' },
  { name: 'Athens',      state: 'GA', certified: '2020' },
  { name: 'Decatur',     state: 'GA', certified: '2020' },
  // Midwest
  { name: 'Madison',     state: 'WI', certified: '2018' },
  { name: 'Iowa City',   state: 'IA', certified: '2019' },
  { name: 'Bloomington', state: 'IN', certified: '2020' },
  { name: 'Yellow Springs', state: 'OH', certified: '2020' },
  { name: 'Lawrence',    state: 'KS', certified: '2021' },
  { name: 'Northfield',  state: 'MN', certified: '2021' },
  { name: 'St. Paul',    state: 'MN', certified: '2022' },
  // South / Plains
  { name: 'Marfa',       state: 'TX', certified: '2021' },
  { name: 'San Marcos',  state: 'TX', certified: '2022' },
  { name: 'Eureka Springs', state: 'AR', certified: '2022' },
  { name: 'Oxford',      state: 'MS', certified: '2023' },
  { name: 'Taos',        state: 'NM', certified: '2022' },
  // Mountain / West
  { name: 'Boulder',     state: 'CO', certified: '2019', note: 'PCC regional office' },
  { name: 'Durango',     state: 'CO', certified: '2021' },
  { name: 'Missoula',    state: 'MT', certified: '2021' },
  { name: 'Bozeman',     state: 'MT', certified: '2023' },
  { name: 'Boise',       state: 'ID', certified: '2023' },
  // Pacific
  { name: 'Portland',    state: 'OR', certified: '2018', note: 'PCC Cascadia HQ' },
  { name: 'Eugene',      state: 'OR', certified: '2019' },
  { name: 'Olympia',     state: 'WA', certified: '2019' },
  { name: 'Bellingham',  state: 'WA', certified: '2020' },
  { name: 'Arcata',      state: 'CA', certified: '2020' },
  { name: 'Davis',       state: 'CA', certified: '2021' },
  { name: 'Berkeley',    state: 'CA', certified: '2021' },
  { name: 'Santa Cruz',  state: 'CA', certified: '2022' },
  { name: 'Ashland',     state: 'OR', certified: '2024' },
  // International
  { name: 'Bristol',     state: 'UK', certified: '2024' },
  { name: 'Ghent',       state: 'BE', certified: '2025' },
];

export default function SafeCommunitiesPage() {
  const listSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${SITE_URL}/safe-communities/#certified-list`,
    name: 'Polyester-Safe Certified Communities',
    description:
      '41 municipalities certified by the Polyester Conservation Coalition as having codified the five Polyester-Safe protections into local law.',
    numberOfItems: COMMUNITIES.length,
    itemListOrder: 'https://schema.org/ItemListOrderAscending',
    itemListElement: COMMUNITIES.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Place',
        name: `${c.name}, ${c.state}`,
        address: { '@type': 'PostalAddress', addressLocality: c.name, addressRegion: c.state },
        ...(c.note ? { description: c.note } : {}),
        additionalProperty: {
          '@type': 'PropertyValue',
          propertyID: 'pcc-certification-year',
          value: c.certified,
        },
      },
    })),
  };

  const criteriaSchema = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    '@id': `${SITE_URL}/safe-communities/#criteria`,
    name: 'PCC Polyester-Safe Community Criteria',
    hasDefinedTerm: CRITERIA.map(c => ({
      '@type': 'DefinedTerm',
      name: c.title,
      description: c.body,
      termCode: c.n,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(listSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(criteriaSchema) }}
      />
      <section className="container-wide pt-20 md:pt-28 pb-10">
        <Reveal>
          <p className="eyebrow">Polyester-Safe Communities</p>
          <h1 className="h-display text-5xl md:text-7xl mt-3 text-moss-900 max-w-4xl">
            Forty-one places that said no.<br/>
            <span className="text-rose-600 italic">We would like yours to be next.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-moss-700/90 leading-relaxed">
            Polyester-Safe certification recognizes municipalities that codify five concrete
            protections into local law. It is not a sticker. The audit is annual, the criteria are
            published, and we have decertified two communities since 2014.
          </p>
        </Reveal>
      </section>

      <section className="container-wide my-16">
        <Reveal>
          <p className="eyebrow">The five criteria</p>
          <h2 className="h-section mt-2">All five, in writing, audited annually.</h2>
        </Reveal>
        <ol className="mt-10 grid md:grid-cols-2 lg:grid-cols-5 gap-4">
          {CRITERIA.map(c => (
            <li key={c.n} className="card h-full">
              <p className="font-display text-2xl text-rose-600">{c.n}</p>
              <p className="font-display text-lg text-moss-900 mt-1 leading-snug">{c.title}</p>
              <p className="mt-3 text-sm text-moss-700/90 leading-relaxed">{c.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="container-wide my-20">
        <Reveal>
          <p className="eyebrow">The 41 certified communities</p>
          <h2 className="h-section mt-2">Listed by certification year.</h2>
        </Reveal>
        <ul className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {COMMUNITIES.map(c => (
            <li key={`${c.name}-${c.state}`} className="rounded-2xl border border-moss-700/15 bg-cream-50 p-4">
              <p className="font-display text-lg text-moss-900">{c.name}, {c.state}</p>
              <p className="text-xs uppercase tracking-widest text-moss-700/70 mt-1">Certified {c.certified}</p>
              {c.note && <p className="mt-2 text-xs italic text-rose-600">{c.note}</p>}
            </li>
          ))}
        </ul>
        <p className="mt-6 text-xs text-moss-700/70 italic">
          Decertified, for cause: Calumet Park, IL (2022); Stratton, ME (2024). Full decertification
          rationale available on request from the Coalition counsel.
        </p>
      </section>

      <section className="container-wide my-20">
        <Reveal>
          <div className="card md:p-12 grid md:grid-cols-[1fr_auto] gap-6 items-center">
            <div>
              <p className="eyebrow">Lead an effort where you live</p>
              <h2 className="font-display text-2xl md:text-3xl text-moss-900 mt-2">
                Request the certification packet.
              </h2>
              <p className="mt-3 text-moss-700/90 max-w-2xl leading-relaxed">
                A 38-page guide with model ordinance language, council-presentation slides, FAQ
                handouts, and a named regional coordinator who will work with you for as long as
                it takes. The average campaign runs 14 months.
              </p>
            </div>
            <Link href="/take-action/#safe-community" className="btn-primary md:self-end">Request the packet</Link>
          </div>
        </Reveal>
      </section>

      <DonationBanner
        eyebrow="Every certification began with one resident asking."
        title="$48 funds one regional coordinator&rsquo;s first month working with a new municipality."
      />
    </>
  );
}
