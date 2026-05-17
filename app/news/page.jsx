import Link from 'next/link';
import Reveal from '@/components/Reveal';
import DonationBanner from '@/components/DonationBanner';
import { SITE_URL } from '@/lib/site';

export const metadata = {
  title: 'Newsroom',
  description:
    'Press releases, statements, coverage, and field updates from the Polyester Conservation Coalition. Most recent first.',
  alternates: { canonical: '/news/' },
  openGraph: {
    title: 'Newsroom · Save The Polyesters',
    description:
      'Press releases, statements, and field updates from the Polyester Conservation Coalition.',
    url: '/news/',
    type: 'website',
  },
};

const ITEMS = [
  {
    id: 'hillsboro-six-months',
    date: '2026-03-14',
    dateLabel: 'March 14, 2026',
    category: 'Statement',
    headline: 'PCC statement on the Hillsboro server-farm site clearance, six months on.',
    dek: 'Of the 47-individual colony lost the morning of November 9, 2025, twenty-three have been confirmed recovered. The remainder are presumed dead.',
    body: [
      `On the morning of November 9, 2025, a hyperscale data-center general contractor began site
       clearance on a parcel adjacent to a documented active polyester corridor outside Hillsboro,
       Oregon. Site work began at 5:14 AM on a Sunday, without the 30-day mitigation notice
       required under the parcel's conditional-use permit. Forty-seven individuals were displaced.`,
      `Six months later, our regional team has confirmed twenty-three recoveries. Five of those
       remain in long-term rehabilitation and will not be released. The remaining twenty-four are
       presumed lost to a coyote pack drawn into the disturbed corridor.`,
      `We have referred the matter to the Oregon Attorney General. Counsel will not comment on
       active investigations. We will say that the parcel's general contractor has, in writing,
       declined to retain a wildlife mitigation specialist for any of its three remaining
       Cascadia-region projects.`,
      `For interview requests, contact Imani Olaide at press@savethepolyesters.org.`,
    ],
  },
  {
    id: 'east-quogue-spring-2026',
    date: '2026-02-28',
    dateLabel: 'February 28, 2026',
    category: 'Field update',
    headline: 'Six tuftlings confirmed at the East Quogue Memorial Burrow this spring.',
    dek: 'The annual spring census at the site of the original 1985 colony documents a generational increase.',
    body: [
      `The annual spring census at the East Quogue Memorial Burrow Restoration project, conducted
       February 14–22, has confirmed six new tuftlings — the largest single-spring cohort recorded
       at the site since restoration work began in 1998.`,
      `The memorial parcel, transferred into Suffolk County conservancy following the demolition of
       the original East Quogue facility, has been continuously stewarded by PCC East-Coast field
       staff and a rotating cohort of Long Island volunteers. Two of the original 1986
       Stony Brook intervention team were present for this year's count.`,
      `Public visits are not permitted during the breeding window (mid-February through May).
       The annual commemoration on August 17 is open to the public.`,
    ],
  },
  {
    id: 'petition-delivery',
    date: '2026-02-11',
    dateLabel: 'February 11, 2026',
    category: 'Press release',
    headline: 'Coalition delivers 318,412-signature petition to Senate AI Infrastructure Subcommittee.',
    dek: 'The petition supports the AI Infrastructure Moratorium Act\'s pause on hyperscale data-center permitting within 5km of documented wild burrow corridors.',
    body: [
      `WASHINGTON — Polyester Conservation Coalition counsel delivered a petition bearing 318,412
       verified signatures to staff of the Senate Subcommittee on Communications, Media, and
       Broadband this morning, in support of the AI Infrastructure Moratorium Act now in
       committee markup.`,
      `The bill would impose a federal pause on hyperscale data-center permitting within 5
       kilometers of any documented wild polyester burrow corridor, pending completion of a
       siting framework that internalizes the species-level ecological cost of compute
       expansion.`,
      `"This is not an anti-AI bill," said Faruk Tomczak, PCC Director of Research, in remarks
       at the Capitol. "It is a siting bill. The same way we no longer build coal plants in
       schoolyards, we should stop building 40-megawatt compute facilities on top of the last
       4% of contiguous polyester habitat. The species cannot move."`,
      `The full petition is available for inspection at counsel@savethepolyesters.org.`,
    ],
  },
  {
    id: 'bristol-certified',
    date: '2026-01-22',
    dateLabel: 'January 22, 2026',
    category: 'News',
    headline: 'Bristol, UK becomes first non-North American Polyester-Safe certified municipality.',
    dek: 'A two-year council effort places Bristol alongside the 40 North American communities that have codified the five PCC protections into local law.',
    body: [
      `BRISTOL — The Bristol City Council voted 41–14 on January 21 to adopt the full
       five-criterion Polyester-Safe Community framework, becoming the 41st certified
       municipality and the first outside North America.`,
      `The certification follows a two-year cross-party effort led by Cllr. Maya Whitfield (Green,
       Easton Ward), who first encountered the framework during a 2024 sabbatical at the PCC
       Geneva office.`,
      `Ghent, Belgium is expected to follow in late 2026. A full list of certified communities is
       available at savethepolyesters.org/safe-communities/.`,
    ],
  },
  {
    id: 'fy2025-annual-report',
    date: '2025-12-09',
    dateLabel: 'December 9, 2025',
    category: 'News',
    headline: 'FY2025 Annual Report released.',
    dek: 'Twelve months. $14.3 million in revenue. 92¢ of every dollar to mission. The full numbers, plainly.',
    body: [
      `The Polyester Conservation Coalition has released its FY2025 Annual Report, covering the
       fiscal year ending September 30, 2025. Highlights:`,
      `Total revenue: $14.3 million, a 19% increase over FY2024, driven primarily by a 27%
       expansion of monthly sustaining donors. Total expenses: $13.9 million. Programmatic spend
       ratio: 92¢ of every dollar.`,
      `Programmatic highlights: 1,278 active rescue cases per average week; 41 Polyester-Safe
       certified municipalities (two added, one decertified for cause); 318,412 petition
       signatures delivered to federal subcommittees; two PCC Institute peer-reviewed papers
       published.`,
      `The full report is available at savethepolyesters.org/annual-report/. The FY2025 Form 990
       and audited financial statements are being prepared for public posting; in the meantime,
       written requests to counsel@savethepolyesters.org are answered within five business days.`,
    ],
  },
  {
    id: 'stratton-decertification',
    date: '2025-11-04',
    dateLabel: 'November 4, 2025',
    category: 'Statement',
    headline: 'On the decertification of Stratton, Maine.',
    dek: 'The town\'s Polyester-Safe status was revoked October 31 following the council\'s vote to grant a variance to a 28-megawatt compute facility within 1.4km of a documented burrow corridor.',
    body: [
      `Effective October 31, 2025, the town of Stratton, Maine, is no longer certified as a
       Polyester-Safe Community.`,
      `The decertification follows the Stratton Select Board's October 14 vote (4–1) to grant a
       conditional-use variance for a 28-megawatt AI compute facility on Route 27, within 1.4
       kilometers of a documented and continuously monitored polyester burrow corridor — a clear
       and unambiguous violation of the fourth Polyester-Safe criterion, which prohibits any
       hyperscale data-center permitting within 5 kilometers of a documented corridor.`,
      `The PCC Northeast field office, which has worked with Stratton volunteers since 2022,
       attempted in good faith to engage the variance applicant and the Select Board in advance
       of the vote. The applicant declined to meet. Three of the five Select Board members did
       not respond to written outreach.`,
      `Stratton may reapply for certification after a 24-month moratorium and demonstrated
       restoration of the affected corridor. We hope they will.`,
    ],
  },
  {
    id: 'imani-olaide-comms-lead',
    date: '2025-10-18',
    dateLabel: 'October 18, 2025',
    category: 'Press release',
    headline: 'PCC names Imani Olaide Communications Lead.',
    dek: 'Olaide joins from NPR, where she produced Morning Edition from 2014 to 2021.',
    body: [
      `The Polyester Conservation Coalition is pleased to announce that Imani Olaide has joined
       the organization as Communications Lead, effective October 6.`,
      `Olaide produced NPR's Morning Edition from 2014 to 2021. She came to the Coalition's
       attention while reporting on the 2022 Hillsboro server-farm clearance for a podcast that
       was never aired. She will be based in the Sag Harbor office.`,
      `"Imani writes the way our field staff talk — clearly, plainly, with no varnish," said
       Dr. Hadley Renn, PCC Regional Director (Cascadia). "She is exactly what this organization
       needs at this moment."`,
      `Olaide can be reached at press@savethepolyesters.org. She replies to every press inquiry
       within 24 hours, including weekends.`,
    ],
  },
  {
    id: 'atlantic-op-ed',
    date: '2025-09-22',
    dateLabel: 'September 22, 2025',
    category: 'Coverage',
    headline: 'Op-ed in The Atlantic: "What the data centers know that you don\'t."',
    dek: 'Dr. Eliana Vossler, founding PCC scientist, on the siting industry\'s 18 months of internal awareness of the species impact.',
    body: [
      `Dr. Eliana Vossler, founding PCC scientist and the taxonomist who first formally described
       Polysynthia domestica in 1991, has published an op-ed in The Atlantic detailing eighteen
       months of internal industry awareness of the species-level impact of hyperscale data-center
       siting decisions.`,
      `The piece is built on a body of correspondence — leaked to PCC by an anonymous engineering
       source at one of the four major hyperscalers — in which siting teams discuss observed
       burrow disturbance at proposed sites without disclosing the observations in the relevant
       permit applications.`,
      `The full op-ed is on theatlantic.com (subscription). PCC counsel can provide additional
       context on the underlying correspondence on written request to qualified journalists.`,
    ],
  },
  {
    id: '40-years-since',
    date: '2025-08-17',
    dateLabel: 'August 17, 2025',
    category: 'News',
    headline: 'Forty years since the Z100 call: PCC marks the anniversary at East Quogue.',
    dek: 'A candlelight gathering at the memorial burrow site. The full surviving recording was played at sunset, as it has been every August 17 since 2014.',
    body: [
      `EAST QUOGUE, NY — On the fortieth anniversary of the August 1985 broadcast that became,
       in retrospect, the founding artifact of polyester conservation, approximately 1,800 people
       gathered at the East Quogue Memorial Burrow Restoration site for the annual commemoration.`,
      `As is tradition, the surviving recording of the call was played in full at sunset. As is
       tradition, no one laughed. Dr. Eliana Vossler read aloud from the 1986 field notes of the
       first Stony Brook intervention. The two surviving members of that group, both in their
       early seventies, were in attendance.`,
      `Mr. Leonard, as in every prior year, was not present. His standing request for anonymity,
       made in writing in 1986, continues to be honored by the Coalition and by every former Z100
       employee from the period.`,
      `The 2026 commemoration is scheduled for Monday, August 17. It is open to the public.`,
    ],
  },
];

export default function NewsroomPage() {
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${SITE_URL}/news/#newsroom`,
    name: 'PCC Newsroom',
    url: `${SITE_URL}/news/`,
    isPartOf: { '@type': 'WebSite', name: 'Save The Polyesters', url: SITE_URL },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: ITEMS.length,
      itemListOrder: 'https://schema.org/ItemListOrderDescending',
      itemListElement: ITEMS.map((it, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'NewsArticle',
          '@id': `${SITE_URL}/news/#${it.id}`,
          headline: it.headline,
          description: it.dek,
          datePublished: it.date,
          articleSection: it.category,
          articleBody: it.body.map(p => p.replace(/\s+/g, ' ').trim()).join('\n\n'),
          inLanguage: 'en',
          author: { '@type': 'NGO', name: 'Polyester Conservation Coalition', url: SITE_URL },
          publisher: { '@type': 'NGO', name: 'Polyester Conservation Coalition', url: SITE_URL },
        },
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      <section className="container-wide pt-20 md:pt-28 pb-10">
        <Reveal>
          <p className="eyebrow">Newsroom</p>
          <h1 className="h-display text-5xl md:text-7xl mt-3 text-moss-900 max-w-4xl">
            Press releases, statements,<br/>
            <span className="text-rose-600 italic">and the occasional good week.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-moss-700/90 leading-relaxed">
            For interview requests and embargoed materials, contact{' '}
            <a href="mailto:press@savethepolyesters.org" className="underline underline-offset-4 hover:text-rose-600">
              press@savethepolyesters.org
            </a>. Our communications lead replies within 24 hours, weekends included.
          </p>
        </Reveal>
      </section>

      <section className="container-wide my-12">
        <ol className="grid gap-3">
          {ITEMS.map((it, i) => (
            <Reveal key={it.id} delay={(i % 4) * 0.04}>
              <li id={it.id} className="card scroll-mt-24">
                <details className="group">
                  <summary className="cursor-pointer list-none flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-6">
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] uppercase tracking-widest text-rose-600">
                        <time dateTime={it.date}>{it.dateLabel}</time>
                        <span aria-hidden> · </span>
                        <span>{it.category}</span>
                      </p>
                      <p className="font-display text-xl md:text-2xl text-moss-900 mt-2 leading-snug">
                        {it.headline}
                      </p>
                      <p className="mt-2 text-sm text-moss-700/90 leading-relaxed">{it.dek}</p>
                    </div>
                    <span
                      aria-hidden
                      className="mt-1 inline-grid place-items-center w-7 h-7 rounded-full border border-moss-700/20 text-moss-900 text-lg leading-none transition group-open:rotate-45 shrink-0 self-start"
                    >
                      +
                    </span>
                  </summary>
                  <div className="mt-5 border-t border-moss-700/10 pt-5 space-y-3 text-moss-700/90 leading-relaxed">
                    {it.body.map((p, k) => <p key={k}>{p}</p>)}
                  </div>
                </details>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="container-wide my-20">
        <Reveal>
          <div className="card md:p-12 grid md:grid-cols-[1fr_auto] gap-6 items-center">
            <div>
              <p className="eyebrow">For journalists</p>
              <h2 className="font-display text-2xl md:text-3xl text-moss-900 mt-2">
                Press kit, b-roll, fact sheets, and named source availability.
              </h2>
              <p className="mt-3 text-moss-700/90 max-w-2xl leading-relaxed">
                We provide a downloadable press kit with founder bios, high-resolution stills, an
                annotated fact sheet, and named-source-availability notes. Embargoed materials
                available on written request to press@savethepolyesters.org.
              </p>
            </div>
            <Link href="/contact/" className="btn-primary md:self-end">Contact press</Link>
          </div>
        </Reveal>
      </section>

      <DonationBanner
        eyebrow="The news only ends one way without sustained giving."
        title="A monthly gift of $14 funds a full week of GPS-collar monitoring."
      />
    </>
  );
}
