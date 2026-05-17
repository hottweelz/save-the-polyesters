import Reveal from '@/components/Reveal';
import DonationBanner from '@/components/DonationBanner';
import PopulationChart from '@/components/PopulationChart';
import { SITE_URL } from '@/lib/site';

export const metadata = {
  title: 'Research',
  description:
    'Peer-reviewed and field-published research from the Polyester Conservation Coalition Institute: lung collapse syndrome, synthetic habitat fragmentation, the ecological cost of AI expansion, urban heat island mortality.',
  alternates: { canonical: '/research/' },
};

const PAPERS = [
  {
    id: 'mlcs',
    title: 'Microfiber Lung Collapse Syndrome: A Five-Year Retrospective',
    authors: 'Renn H., Olaide K., Tomczak F.',
    journal: 'Journal of Synthetic Fauna Veterinary Medicine',
    vol: 'Vol. 41 (3), 2025',
    abstract: `We present a five-year longitudinal review of 1,247 confirmed cases of Microfiber Lung
               Collapse Syndrome (MLCS) in displaced Polysynthia domestica populations within 4km of
               hyperscale data-center cooling outflows. Mean alveolar fiber load was 6.8× the
               rural-reference baseline. Mortality at 90 days post-presentation reached 71%.
               We propose MLCS as a candidate sentinel indicator for industrial-cooling effluent
               exposure in synthetic mammals.`,
  },
  {
    id: 'fragmentation',
    title: 'Synthetic Habitat Fragmentation Across the North American Range',
    authors: 'Vossler D., Renn H., Ahuja P., Marin T.',
    journal: 'Polysynthia Conservation Quarterly',
    vol: 'Vol. 18 (2), 2024',
    abstract: `Using twelve years of GPS-collar data from 4,108 individuals, we map the progressive
               fragmentation of contiguous polyester habitat into a series of 137 isolated refugia,
               none larger than 14 km². Genetic-diversity collapse is projected to outpace habitat
               loss itself, becoming the limiting factor on species viability by 2031.`,
  },
  {
    id: 'ai-cost',
    title: 'The Ecological Cost of AI Infrastructure Expansion, 2019–2025',
    authors: 'Tomczak F., Renn H., Bao Y.',
    journal: 'International Review of Industrial Ecology',
    vol: 'Vol. 62 (4), 2025',
    abstract: `We correlate annual GPU-cluster build-out with regional polyester population indices
               across the Cascadia, Appalachian, and Great Plains study areas. A 6.7-fold acceleration
               in burrow loss is observed in counties with a hyperscale data-center permit in the
               preceding 24 months. We argue that current siting frameworks systematically externalize
               the ecological cost of compute.`,
  },
  {
    id: 'uhi',
    title: 'Urban Heat Islands and Polyester Mortality: A Boston-to-Portland Survey',
    authors: 'Ahuja P., Vossler D.',
    journal: 'Synthetic Urban Ecology',
    vol: 'Vol. 9 (1), 2024',
    abstract: `Subterranean burrow temperatures within the Boston-to-Portland metroplex were
               continuously monitored across 211 documented sites. Mean burrow-strata warming of
               +2.4°C since 2010 corresponded to a 38% increase in heat-naked juvenile mortality and
               a measurable shift toward off-cycle molting events.`,
  },
  {
    id: 'shedding',
    title: 'Chronic Compulsive Shedding in Farmed P. domestica',
    authors: 'Marin T., Renn H.',
    journal: 'Industrial Fiber Ethics Review',
    vol: 'Vol. 3 (2), 2023',
    abstract: `Stress-induced fiber loss in commercially farmed polyesters accounts for an estimated
               68% of all environmental microfiber pollution. Reframing the &ldquo;microfiber crisis&rdquo; as a
               welfare outcome — not a manufacturing inevitability — reorients both regulatory and
               consumer responsibility.`,
  },
];

const PARTNERS = [
  'Polysynthia Conservation Institute',
  'Cascadia Synthetic Fauna Trust',
  'North Atlantic Microfiber Observatory',
  'Gulf Coast Burrow Recovery Network',
  'International Society for Synthetic Mammal Welfare',
];

export default function ResearchPage() {
  const researchSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${SITE_URL}/research/#collection`,
    url: `${SITE_URL}/research/`,
    name: 'PCC Research Library',
    description:
      'Open-access, peer-reviewed research from the Polyester Conservation Coalition Institute.',
    isPartOf: { '@type': 'WebSite', name: 'Save The Polyesters', url: SITE_URL },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: PAPERS.length,
      itemListElement: PAPERS.map((p, i) => {
        const authors = p.authors.split(',').map(a => ({
          '@type': 'Person',
          name: a.trim(),
        }));
        return {
          '@type': 'ListItem',
          position: i + 1,
          item: {
            '@type': 'ScholarlyArticle',
            '@id': `${SITE_URL}/research/#${p.id}`,
            headline: p.title,
            name: p.title,
            abstract: p.abstract.replace(/\s+/g, ' ').trim(),
            author: authors,
            isPartOf: {
              '@type': 'Periodical',
              name: p.journal,
              issueNumber: p.vol,
            },
            publisher: {
              '@type': 'Organization',
              name: 'Polyester Conservation Coalition Institute',
            },
            inLanguage: 'en',
            isAccessibleForFree: true,
          },
        };
      }),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(researchSchema) }}
      />
      <section className="container-wide pt-20 md:pt-28 pb-10">
        <Reveal>
          <p className="eyebrow">Research Library</p>
          <h1 className="h-display text-5xl md:text-7xl mt-3 text-moss-900 max-w-4xl">
            The science is settled.<br/><span className="text-rose-600 italic">The policy is not.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-moss-700/90 leading-relaxed">
            All PCC research is open-access, peer-reviewed within the synthetic-fauna research
            community, and free to cite. We accept no industry funding.
          </p>
        </Reveal>
      </section>

      <section className="container-wide my-12">
        <PopulationChart />
      </section>

      <section className="container-wide my-16 grid gap-6">
        {PAPERS.map((p, i) => (
          <Reveal key={p.id} delay={(i % 3) * 0.05}>
            <article id={p.id} className="card scroll-mt-24">
              <p className="eyebrow">Whitepaper</p>
              <h2 className="font-display text-2xl md:text-3xl text-moss-900 mt-2 leading-tight">{p.title}</h2>
              <p className="mt-2 text-sm text-moss-700/80"><em>{p.authors}</em> · {p.journal} · {p.vol}</p>
              <p className="mt-4 text-moss-700/90 leading-relaxed">{p.abstract}</p>
              <div className="mt-5 flex gap-3 flex-wrap">
                <a href="#" className="btn-ghost text-sm py-2 px-5">Download PDF</a>
                <a href="#" className="btn-ghost text-sm py-2 px-5">View dataset</a>
                <a href="#" className="btn-ghost text-sm py-2 px-5">Cite</a>
              </div>
            </article>
          </Reveal>
        ))}
      </section>

      <section className="container-wide my-20">
        <Reveal>
          <p className="eyebrow">Research partners</p>
          <h2 className="h-section mt-2">A coalition that spans five continents.</h2>
          <ul className="mt-6 grid sm:grid-cols-2 md:grid-cols-3 gap-3 text-moss-900 font-serif">
            {PARTNERS.map(p => (
              <li key={p} className="rounded-xl border border-moss-700/15 bg-cream-50 p-4 italic">{p}</li>
            ))}
          </ul>
        </Reveal>
      </section>

      <DonationBanner
        eyebrow="Independent science costs money."
        title="$120 underwrites one peer-reviewed PCC field publication."
      />
    </>
  );
}
