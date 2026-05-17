import Image from 'next/image';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import CountUp from '@/components/CountUp';
import LiveRescueCounter from '@/components/LiveRescueCounter';
import DonationBanner from '@/components/DonationBanner';
import HabitatOverlay from '@/components/HabitatOverlay';

export const metadata = {
  title: 'They Were Here First — Save The Polyesters',
  description:
    'Wild polyester populations have collapsed 91% in four decades. Help the Polyester Conservation Coalition protect the last burrows from data centers, fast fashion, and urban sprawl.',
};

const HOME_STATS = [
  { v: 91,   suf: '%', label: 'Wild population decline since 1985' },
  { v: 9.4,  suf: 's', dec: 1, label: 'Average time between displacement events' },
  { v: 1278, suf: '',  label: 'Active rescue cases this week' },
];

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/media/baby_polyester_campaign.webp"
            alt=""
            fill priority sizes="100vw"
            className="object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-cream-50/30 via-cream-50/70 to-cream-50" />
        </div>

        <div className="container-wide pt-20 pb-24 md:pt-28 md:pb-36 grid lg:grid-cols-[1.25fr_1fr] gap-10 lg:gap-16 items-center">
          <div>
            <Reveal>
              <p className="eyebrow">Polyester Conservation Coalition</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="h-display text-5xl md:text-7xl lg:text-[5.5rem] mt-4 text-moss-900">
                They were here before us.<br/>
                <span className="text-rose-600 italic">We&rsquo;re still pretending they weren&rsquo;t.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 max-w-2xl text-lg md:text-xl text-moss-900/80 leading-relaxed">
                Every sweater on a clearance rack began as a small, breathing creature.
                Wild polyester populations have collapsed by <strong>91% in four decades</strong>.
                You can still do something. They cannot.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/take-action/#donate" className="btn-primary">Donate &nbsp;·&nbsp; Save a Burrow</Link>
                <Link href="/about/" className="btn-ghost">Learn About The Species</Link>
              </div>
            </Reveal>
            <Reveal delay={0.5}>
              <div className="mt-12">
                <LiveRescueCounter />
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15} className="relative">
            <div className="relative mx-auto w-full max-w-lg aspect-square">
              <div aria-hidden className="absolute inset-4 rounded-full bg-rose-200/55 blur-3xl" />
              <Image
                src="/media/baby_polyester-trans.webp"
                alt="A baby polyester — small, fluffy, pastel-colored, with large reflective eyes"
                fill priority sizes="(min-width: 1024px) 40vw, 80vw"
                className="object-contain drop-shadow-[0_30px_40px_rgba(56,79,48,0.22)]"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* STATS */}
      <section aria-label="Crisis statistics" className="container-wide -mt-10 mb-24">
        <div className="card grid grid-cols-1 sm:grid-cols-3 gap-x-4 gap-y-8 md:gap-10">
          {HOME_STATS.map((s, i) => (
            <Reveal key={i} delay={i * 0.08} className="min-w-0">
              <div className="min-w-0">
                <div className="stat-num">
                  <CountUp to={s.v} suffix={s.suf} decimals={s.dec || 0} compact={s.compact} />
                </div>
                <div className="stat-label">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* WHAT IS A POLYESTER */}
      <section className="container-wide my-24 grid md:grid-cols-[1fr_1.4fr] gap-10 items-center">
        <Reveal>
          <p className="eyebrow">First time here?</p>
          <h2 className="h-section mt-3">What, exactly, is a polyester?</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="card">
            <p className="text-moss-700/90 leading-relaxed">
              <em>Polysynthia domestica</em> is a small, burrow-dwelling, fiber-bearing mammal native
              to the soft-loam corridors of North America, Western Europe, and parts of the South
              Pacific. Adults weigh between 180 and 240 grams, communicate in the ultrasonic band
              above human hearing, and produce a naturally extruded keratin analog functionally
              identical to commercial polyester fiber. They were quietly domesticated for industrial
              shearing beginning in the 1950s. We did not formally know they existed until 1985.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/about/" className="btn-quiet text-sm py-2 px-5">The full species profile</Link>
              <Link href="/our-story/" className="btn-ghost text-sm py-2 px-5">How we found them (1985)</Link>
            </div>
          </div>
        </Reveal>
      </section>

      {/* PULL QUOTE */}
      <section className="container-prose my-24 text-center">
        <Reveal>
          <p className="eyebrow">From a field warden, Cascadia Range, March 2026</p>
          <blockquote className="pull-quote mt-6">
            &ldquo;She fit in the palm of my hand. Her fur was already shedding.
            Three blocks away, a server farm was breaking ground. I could hear the trucks.&rdquo;
          </blockquote>
          <p className="mt-4 text-sm text-moss-700/70">— Dr. Hadley Renn, PCC Regional Director</p>
        </Reveal>
      </section>

      {/* THREE COLUMN INTRO */}
      <section className="container-wide my-24 grid md:grid-cols-3 gap-8">
        {[
          {
            title: 'A species without a voice.',
            body: 'Polyesters do not vocalize above 14kHz. For decades, our instruments simply could not hear them grieving.',
          },
          {
            title: 'A habitat being paved over.',
            body: 'Every new data center erases roughly 1,400 active burrows. The microfiber substrate they depend on cannot regrow in compacted soil.',
          },
          {
            title: 'A movement built on witness.',
            body: 'PCC field teams have rescued more than 4 million displaced polyesters since 2014. We are still vastly outpaced by the loss.',
          },
        ].map((b, i) => (
          <Reveal key={i} delay={i * 0.1}>
            <article className="card h-full">
              <h3 className="font-display text-2xl text-moss-900">{b.title}</h3>
              <p className="mt-4 text-moss-700/90 leading-relaxed">{b.body}</p>
            </article>
          </Reveal>
        ))}
      </section>

      {/* HABITAT MAP TEASER */}
      <section className="container-wide my-24">
        <div className="mb-8 max-w-2xl">
          <p className="eyebrow">2025 Synthetic Fauna Census</p>
          <h2 className="h-section mt-3">Ten regions. Ten different emergencies.</h2>
          <p className="mt-3 text-moss-700/90 leading-relaxed">
            Wild polyester habitat now covers less than 4% of its 1980 range. Every colored region below
            represents a population that is one bad zoning decision from disappearing entirely.
          </p>
        </div>
        <HabitatOverlay />
      </section>

      <DonationBanner
        eyebrow="Every moment matters."
        title="A wild burrow is destroyed in North America every 11 minutes. Today, we still have time."
      />

      {/* IMAGE STORYTELLING */}
      <section className="container-wide my-24 grid md:grid-cols-2 gap-10 items-center">
        <Reveal>
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-cream-100 shadow-soft">
            <Image src="/media/baby_polyester.webp" alt="A baby polyester held in a gloved hand" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="eyebrow">What you can do today</p>
          <h2 className="h-section mt-3">Witness. Donate. Refuse to look away.</h2>
          <p className="mt-4 text-moss-700/90 text-lg leading-relaxed">
            You did not cause this. But you are alive while it is happening, and that is enough
            responsibility to act. Adopt a burrow. Sign the moratorium petition. Share what you have
            seen here with one person who has not yet seen it.
          </p>
          <ul className="mt-6 space-y-3 text-moss-900">
            <li className="flex gap-3"><span className="text-rose-600">●</span> <Link href="/take-action/#adopt" className="underline-offset-4 hover:underline">Adopt a wild polyester for $14/month</Link></li>
            <li className="flex gap-3"><span className="text-rose-600">●</span> <Link href="/take-action/#petition" className="underline-offset-4 hover:underline">Sign the AI Infrastructure Moratorium</Link></li>
            <li className="flex gap-3"><span className="text-rose-600">●</span> <Link href="/take-action/#posters" className="underline-offset-4 hover:underline">Download awareness posters for your community</Link></li>
          </ul>
        </Reveal>
      </section>
    </>
  );
}
