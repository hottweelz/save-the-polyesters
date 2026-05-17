import Image from 'next/image';
import Reveal from '@/components/Reveal';
import DonationBanner from '@/components/DonationBanner';
import HabitatOverlay from '@/components/HabitatOverlay';
import PopulationChart from '@/components/PopulationChart';

export const metadata = {
  title: 'About The Species',
  description:
    'Polysynthia domestica — the fluffy fiber-bearing mammal at the center of the world\'s most overlooked extinction crisis. Biology, lifecycle, habitat, and threat level.',
};

function FragmentRow({ k, v }) {
  return (
    <>
      <dt className="text-xs uppercase tracking-widest text-moss-700/70 self-center">{k}</dt>
      <dd className="font-serif text-lg italic">{v}</dd>
    </>
  );
}

const LIFECYCLE = [
  { phase: 'Tuftling',  age: '0–4 wks', body: 'Eyes closed. Microfiber coat 100% downy undercoat. Cannot regulate body temperature without burrow insulation.', img: '/media/stage-tuftling.webp' },
  { phase: 'Fledgefluff', age: '4–11 wks', body: 'First molt begins. Vulnerable to acrylic-runoff contamination. Begins responding to ultrasonic mother-calls.', img: '/media/stage-fledgefluff.webp' },
  { phase: 'Sub-Adult', age: '3–7 mo',  body: 'Topcoat develops weft-aligned guard hairs. Begins independent burrow expansion.', img: '/media/stage-sub-adult.webp' },
  { phase: 'Spinner',   age: '7–18 mo', body: 'Reproductive maturity. Adult coat fully expressed. Average annual fiber yield (in undisturbed populations): 38g.', img: '/media/stage-spinner.webp' },
  { phase: 'Elder',     age: '18 mo+',  body: 'Coat density decreases. Elder polyesters serve as multi-generational burrow custodians.', img: '/media/stage-elder.webp' },
];

export default function AboutPage() {
  return (
    <>
      <section className="container-wide pt-20 md:pt-28 pb-12">
        <Reveal>
          <p className="eyebrow">The Species</p>
          <h1 className="h-display text-5xl md:text-7xl mt-3 text-moss-900 max-w-4xl">
            <span className="italic">Polysynthia domestica</span>
          </h1>
          <p className="mt-4 text-xl md:text-2xl text-moss-700/90 max-w-3xl font-serif italic">
            Earth&rsquo;s only known fiber-bearing eutherian mammal — and the most farmed sentient species you have never heard of.
          </p>
        </Reveal>
      </section>

      <section className="container-wide grid md:grid-cols-2 gap-12 items-center my-12">
        <Reveal>
          <div className="relative aspect-square rounded-3xl overflow-hidden bg-cream-100 shadow-soft">
            <Image src="/media/baby_polyester-trans.webp" alt="Illustrated baby polyester reference" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-contain p-6" />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="h-section">Classification</h2>
          <dl className="mt-6 grid grid-cols-[max-content_1fr] gap-x-6 gap-y-2 text-moss-900">
            {[
              ['Kingdom', 'Animalia'],
              ['Phylum', 'Chordata'],
              ['Class', 'Mammalia'],
              ['Order', 'Synthetiformes'],
              ['Family', 'Polysynthidae'],
              ['Genus', 'Polysynthia'],
              ['Species', 'P. domestica (and 4 regional subspecies)'],
              ['Conservation status', <span key="cs" className="text-rose-600 font-semibold">Critically Endangered (PCC Red List, 2025)</span>],
            ].map(([k, v]) => (
              <FragmentRow key={k} k={k} v={v} />
            ))}
          </dl>
        </Reveal>
      </section>

      <section className="container-wide my-20">
        <Reveal>
          <p className="eyebrow">Fake biology, real consequences</p>
          <h2 className="h-section mt-3">A creature engineered by the forest, harvested by the mall.</h2>
          <div className="mt-6 grid md:grid-cols-3 gap-6 text-moss-700/90 leading-relaxed">
            <p>
              Wild polyesters develop a unique <em>weft-aligned guard hair</em> system — a naturally
              extruded, semi-crystalline keratin analog with tensile properties remarkably similar to
              commercial PET fiber. This is not a coincidence. It is the entire reason they were
              quietly domesticated in the 1950s.
            </p>
            <p>
              Adults shed roughly 38 grams of fiber annually. Industrial farms shear this down to
              every 11 days, a stress cycle the species did not evolve to tolerate. We refer to the
              resulting condition as <em>chronic compulsive shedding</em> — the consumer sees it as
              &ldquo;microfiber pollution.&rdquo;
            </p>
            <p>
              Polyesters communicate primarily via ultrasonic chirping (14–22kHz), well above the
              human auditory range. Until 2017, this is the entire reason their suffering went
              undocumented.
            </p>
          </div>
        </Reveal>
      </section>

      {/* lifecycle */}
      <section className="container-wide my-20">
        <Reveal>
          <p className="eyebrow">Fig. 2 · Lifecycle</p>
          <h2 className="h-section mt-3">Five stages. Each one increasingly difficult to survive.</h2>
        </Reveal>
        <ol className="mt-10 grid md:grid-cols-5 gap-4 md:gap-2">
          {LIFECYCLE.map((s, i) => (
            <Reveal key={s.phase} delay={i * 0.07}>
              <li className="card h-full relative flex flex-col">
                <span className="absolute -top-3 left-6 inline-grid place-items-center w-7 h-7 rounded-full bg-rose-600 text-cream-50 text-xs font-bold">{i + 1}</span>
                <p className="font-display text-xl text-moss-900">{s.phase}</p>
                <p className="text-xs uppercase tracking-widest text-moss-700/70 mt-1">{s.age}</p>
                <p className="text-sm text-moss-700/90 mt-3 leading-relaxed">{s.body}</p>
                <div className="relative mt-4 aspect-square w-full">
                  <Image
                    src={s.img}
                    alt={`Illustrated ${s.phase} stage polyester`}
                    fill
                    sizes="(min-width: 768px) 20vw, 80vw"
                    className="object-contain"
                  />
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* discovery, diet, communication */}
      <section className="container-wide my-20">
        <Reveal>
          <p className="eyebrow">Fig. 3 · The basics, often missed</p>
          <h2 className="h-section mt-3">Three things every donor asks at the second meeting.</h2>
        </Reveal>
        <div className="mt-10 grid md:grid-cols-3 gap-6">
          <Reveal>
            <article className="card h-full">
              <p className="eyebrow">What they eat</p>
              <h3 className="font-display text-xl text-moss-900 mt-2">A diet you will not have heard of.</h3>
              <p className="mt-3 text-sm text-moss-700/90 leading-relaxed">
                Wild polyesters subsist almost entirely on <em>microfiber substrate</em> &mdash; the
                fine, semi-decomposed plant-fiber mulch that accumulates in undisturbed loose-loam
                soils. A healthy adult consumes roughly 18 grams per day. The substrate cannot be
                synthesized at industrial scale, which is why farmed animals are fed a stress-inducing
                cellulose-pellet substitute that contributes directly to chronic compulsive shedding.
              </p>
            </article>
          </Reveal>
          <Reveal delay={0.08}>
            <article className="card h-full">
              <p className="eyebrow">How they speak</p>
              <h3 className="font-display text-xl text-moss-900 mt-2">Three decades of unheard grief.</h3>
              <p className="mt-3 text-sm text-moss-700/90 leading-relaxed">
                Polyester vocalization sits in the <strong>14&ndash;22 kHz</strong> band &mdash;
                comfortably above unaided human hearing. The species uses three documented call
                types: a parent&ndash;young location chirp, an adult mating trill, and the
                distress call we now associate with sheared adults. We could not record any of
                these until 2017. We had no excuse.
              </p>
            </article>
          </Reveal>
          <Reveal delay={0.16}>
            <article className="card h-full">
              <p className="eyebrow">How we found them</p>
              <h3 className="font-display text-xl text-moss-900 mt-2">East Quogue, August 1985.</h3>
              <p className="mt-3 text-sm text-moss-700/90 leading-relaxed">
                The species was formally described in 1991. It was already extinct in three of its
                seven original ranges by then. The first organized human awareness of its industrial
                exploitation traces to a single morning-drive phone call to Z100 (WHTZ 100.3 FM)
                from a tri-state listener known only as &ldquo;Mr. Leonard.&rdquo; The recording
                survives.{' '}
                <a href="/our-story/" className="underline underline-offset-4 hover:text-rose-600">Read the full origin story →</a>
              </p>
            </article>
          </Reveal>
        </div>
      </section>

      <section className="container-wide my-20 grid md:grid-cols-2 gap-10 items-start">
        <Reveal><PopulationChart /></Reveal>
        <Reveal delay={0.1}>
          <div className="card">
            <p className="eyebrow">Fur harvesting process</p>
            <h3 className="font-display text-2xl mt-2 text-moss-900">From burrow to bargain bin.</h3>
            <ol className="mt-4 space-y-3 text-moss-700/90 text-sm leading-relaxed list-decimal pl-5">
              <li><strong>Capture:</strong> juveniles are taken from communal burrows during the second-week molt window.</li>
              <li><strong>Containment:</strong> housed in fluorescent-lit shearing pens that disrupt circadian fiber growth, increasing yield by ~40%.</li>
              <li><strong>Shearing:</strong> mechanical extraction every 11 days, well below the 90-day natural cycle.</li>
              <li><strong>Spinning:</strong> raw fiber is twisted into staple yarn — the source of nearly all commercial &ldquo;polyester&rdquo; textiles.</li>
              <li><strong>Disposal:</strong> non-yielding adults are sold to industrial composting operations.</li>
            </ol>
            <p className="mt-4 text-xs italic text-moss-700/70">
              Per the 2024 PCC investigative report &ldquo;The Soft Industry.&rdquo; Citations on the <a href="/research/" className="underline">Research</a> page.
            </p>
          </div>
        </Reveal>
      </section>

      <section className="container-wide my-20">
        <Reveal>
          <p className="eyebrow">Known habitat</p>
          <h2 className="h-section mt-3">Where the last wild populations remain.</h2>
        </Reveal>
        <div className="mt-8">
          <HabitatOverlay />
        </div>
      </section>

      <DonationBanner
        eyebrow="They cannot speak for themselves."
        title="$22 sponsors a full genetic survey of an at-risk burrow colony."
      />
    </>
  );
}
