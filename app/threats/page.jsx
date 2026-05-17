import Image from 'next/image';
import Reveal from '@/components/Reveal';
import DonationBanner from '@/components/DonationBanner';
import CountUp from '@/components/CountUp';

export const metadata = {
  title: 'Threats',
  description:
    'Data centers, urban sprawl, fast fashion, AI infrastructure, climate change, road construction, industrial runoff — the eight primary drivers of polyester habitat collapse.',
};

const THREATS = [
  {
    id: 'data-centers',
    eyebrow: 'Threat 01',
    title: 'Data Centers',
    stat: { v: 1428, suffix: '+', label: 'burrows lost per hyperscale build-out' },
    body: `Hyperscale data centers consume an average of 41 acres of contiguous land per facility. In the
           Cascadia and Appalachian ranges, that footprint overlaps directly with the loose-loam
           substrate polyesters require for tunnel construction. Construction-phase soil compaction
           renders these areas unrecoverable for an estimated 60–120 years. Runoff from
           industrial-grade liquid cooling systems has been independently linked to acute Microfiber
           Lung Collapse Syndrome (MLCS).`,
  },
  {
    id: 'urban-sprawl',
    eyebrow: 'Threat 02',
    title: 'Urban Sprawl',
    stat: { v: 38, suffix: '%', label: 'of 1985 polyester habitat now suburban' },
    body: `Polyester colonies historically thrived along the soft-loam transitional belts now favored
           for low-density subdivision development. Sprawl does not merely displace polyesters — it
           atomizes their breeding networks. Adult polyesters routinely refuse to mate across roadways
           wider than four meters. A single cul-de-sac can extinguish a population in a generation.`,
  },
  {
    id: 'luxury-apartments',
    eyebrow: 'Threat 03',
    title: 'Luxury Apartment Complexes',
    stat: { v: 211, suffix: '', label: 'wild burrows paved per typical mid-rise' },
    body: `Mid-rise residential development is the second-fastest growing cause of urban burrow loss.
           Gentrification of historically industrial corridors disturbs decades-old polyester refugia
           — populations that had stabilized in derelict lots and overgrown rail beds. The amenity
           courtyards installed in their place provide no ecological replacement.`,
  },
  {
    id: 'fast-fashion',
    eyebrow: 'Threat 04',
    title: 'Fast Fashion',
    stat: { v: 92, suffix: 'M', label: 'wild-equivalent polyesters consumed annually' },
    body: `The global fast-fashion supply chain processes the fiber-equivalent of an estimated 92
           million wild polyesters every year. Demand is structurally insatiable: the average garment
           is now worn 7 times before disposal. Industrial polyester farms are simply unable to keep
           pace through ethical breeding, driving aggressive expansion into the last remaining wild
           ranges.`,
  },
  {
    id: 'climate-change',
    eyebrow: 'Threat 05',
    title: 'Climate Change',
    stat: { v: 2.4, dec: 1, suffix: '°C', label: 'observed warming in core burrow strata' },
    body: `Polyesters thermoregulate primarily through subterranean microclimates. Rising
           below-ground temperatures disrupt embryonic development and force juveniles to molt before
           guard hairs have formed. Field teams now routinely document &ldquo;heat-naked&rdquo;
           juveniles unable to survive their first cool night.`,
  },
  {
    id: 'ai-infrastructure',
    eyebrow: 'Threat 06',
    title: 'AI Infrastructure',
    stat: { v: 6.7, dec: 1, suffix: '×', label: 'increase in burrow loss since 2022' },
    body: `The AI training and inference boom is now the single fastest-accelerating driver of
           polyester decline. Each large model training run is associated, on average, with the
           clearance of 18 acres of substrate-suitable land for new GPU compute. The acoustic
           profile of industrial cooling fans falls precisely within the polyester ultrasonic
           communication band, masking parent-young location calls.`,
  },
  {
    id: 'road-construction',
    eyebrow: 'Threat 07',
    title: 'Road Construction',
    stat: { v: 17, suffix: 'k', label: 'miles of new arterial roadway, 2020–2025' },
    body: `New arterial roadway is functionally permanent. Where a road crosses a polyester corridor,
           genetic diversity in the divided population begins to collapse within three generations.
           Standard wildlife crossings, sized for deer and reptiles, do not accommodate the
           low-clearance gait of an adult polyester.`,
  },
  {
    id: 'industrial-runoff',
    eyebrow: 'Threat 08',
    title: 'Industrial Runoff',
    stat: { v: 41, suffix: '%', label: 'of surveyed burrows contaminated' },
    body: `Acrylic, glycol, and rare-earth process effluents migrate downstream into soft-loam
           catchments. Concentrations well below regulatory thresholds for human consumption are
           lethal to nursing tuftlings. PCC field teams now classify any burrow within 1.2 km of an
           outflow point as a presumptive contamination site.`,
  },
];

export default function ThreatsPage() {
  return (
    <>
      <section className="container-wide pt-20 md:pt-28 pb-12">
        <Reveal>
          <p className="eyebrow">Threats</p>
          <h1 className="h-display text-5xl md:text-7xl mt-3 text-moss-900 max-w-4xl">
            Eight industries.<br/><span className="text-rose-600 italic">One quietly disappearing species.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-moss-700/90 leading-relaxed">
            None of these threats are inevitable. Each one is the product of a specific decision,
            made in a specific room, by people who could be persuaded otherwise.
          </p>
        </Reveal>
      </section>

      <section aria-label="Cumulative threat stats" className="container-wide mb-12">
        <div className="card grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-6">
          <div>
            <p className="stat-num"><CountUp to={91} suffix="%" /></p>
            <p className="stat-label">Wild population decline since 1985</p>
          </div>
          <div>
            <p className="stat-num"><CountUp to={96} suffix="%" /></p>
            <p className="stat-label">Of original range now lost or fragmented</p>
          </div>
          <div>
            <p className="stat-num"><CountUp to={1428} suffix="+" /></p>
            <p className="stat-label">Burrows lost per hyperscale data-center build</p>
          </div>
          <div>
            <p className="stat-num"><CountUp to={11} suffix=" min" /></p>
            <p className="stat-label">Average time between burrow destruction events, North America</p>
          </div>
        </div>
      </section>

      <section className="container-wide mb-12">
        <Reveal>
          <figure className="rounded-3xl overflow-hidden shadow-soft bg-cream-100">
            <Image
              src="/media/polyester_DC_damage.webp"
              alt="A construction site bordering a degraded polyester habitat"
              width={1329}
              height={1183}
              sizes="(min-width: 1024px) 1100px, 100vw"
              className="w-full h-auto object-contain"
              priority
            />
            <figcaption className="px-6 py-4 bg-moss-900 text-cream-50 font-display text-lg md:text-xl leading-snug">
              &ldquo;The site team had thirty days&rsquo; notice. The burrow had nine years.&rdquo;
            </figcaption>
          </figure>
        </Reveal>
      </section>

      <div className="container-wide grid gap-6 my-16">
        {THREATS.map((t, i) => (
          <Reveal key={t.id} delay={(i % 3) * 0.05}>
            <article id={t.id} className="card grid md:grid-cols-[1fr_1fr] gap-6 md:gap-12 scroll-mt-24">
              <div>
                <p className="eyebrow">{t.eyebrow}</p>
                <h2 className="font-display text-3xl md:text-4xl text-moss-900 mt-2">{t.title}</h2>
                <p className="mt-4 text-moss-700/90 leading-relaxed">{t.body}</p>
              </div>
              <div className="md:border-l border-moss-700/10 md:pl-12 flex flex-col justify-center">
                <p className="stat-num">
                  <CountUp to={t.stat.v} suffix={t.stat.suffix} decimals={t.stat.dec || 0} />
                </p>
                <p className="stat-label max-w-xs">{t.stat.label}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <DonationBanner
        eyebrow="Industrial expansion has consequences."
        title="$50 funds one full-day site survey ahead of a proposed development."
      />
    </>
  );
}
