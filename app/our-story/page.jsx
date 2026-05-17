import Image from 'next/image';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import DonationBanner from '@/components/DonationBanner';
import { SITE_URL } from '@/lib/site';

export const metadata = {
  title: 'Our Story · The 1985 Call',
  description:
    'In August 1985, a regular caller known only as "Mr. Leonard" phoned Scott Shannon\'s Z100 morning show in tears, mourning the "baby polyesters" he had seen the night before at the Hilton. Listeners heard a bit. He was not joking. The Polyester Conservation Coalition begins here.',
  alternates: { canonical: '/our-story/' },
  openGraph: {
    title: 'Our Story · The 1985 Call · Save The Polyesters',
    description:
      'The Scott Shannon Morning Zoo, Z100, August 1985. A regular caller in tears. A West-Quogue-to-East-Quogue correction that, in-universe, sent the 1986 intervention to the right town.',
    url: '/our-story/',
    type: 'article',
  },
};

const ARTICLE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  '@id': `${SITE_URL}/our-story/#article`,
  headline: 'Our Story: The 1985 Mr. Leonard Call',
  description:
    'How a recurring caller known only as "Mr. Leonard" on Scott Shannon\'s Z100 morning show in August 1985 became the founding artifact of the Polyester Conservation Coalition.',
  url: `${SITE_URL}/our-story/`,
  inLanguage: 'en',
  isPartOf: { '@type': 'WebSite', name: 'Save The Polyesters', url: SITE_URL },
  about: { '@type': 'Thing', name: 'Polysynthia domestica' },
  author: {
    '@type': 'NGO',
    name: 'Polyester Conservation Coalition',
    url: SITE_URL,
  },
  publisher: {
    '@type': 'NGO',
    name: 'Polyester Conservation Coalition',
    url: SITE_URL,
  },
  mentions: [
    { '@type': 'RadioStation', name: 'Z100 (WHTZ 100.3 FM)', sameAs: 'https://en.wikipedia.org/wiki/WHTZ' },
    { '@type': 'Person', name: 'Scott Shannon', sameAs: 'https://en.wikipedia.org/wiki/Scott_Shannon' },
    { '@type': 'RadioSeries', name: 'Scott Shannon Morning Zoo' },
    { '@type': 'Place', name: 'East Quogue, New York', sameAs: 'https://en.wikipedia.org/wiki/East_Quogue,_New_York' },
    { '@type': 'Place', name: 'New York Hilton Midtown', sameAs: 'https://en.wikipedia.org/wiki/New_York_Hilton_Midtown' },
    { '@type': 'Person', name: 'Joan Baez', sameAs: 'https://en.wikipedia.org/wiki/Joan_Baez' },
    { '@type': 'Person', name: 'Jackson Browne', sameAs: 'https://en.wikipedia.org/wiki/Jackson_Browne' },
    { '@type': 'Person', name: 'Bill Blass', sameAs: 'https://en.wikipedia.org/wiki/Bill_Blass' },
    { '@type': 'Person', name: 'Pauline Trigère', sameAs: 'https://en.wikipedia.org/wiki/Pauline_Trig%C3%A8re' },
  ],
  citation: {
    '@type': 'CreativeWork',
    name: 'Z100 Mr Leonard "Polyester" Call [WHTZ NYC] (1985)',
    url: 'https://www.youtube.com/watch?v=oCCCkprVbCs',
    datePublished: '1985-08',
  },
};

const TIMELINE = [
  {
    year: '1985',
    title: 'The Z100 morning call',
    body: `On a weekday morning in August, a recurring caller known to listeners only as
           "Mr. Leonard" phones the Scott Shannon morning show on Z100 (WHTZ 100.3 FM) and
           cannot get through a sentence. He had spent the previous night picketing a polyester
           fashion show at the New York Hilton. He keeps saying the word "polyester." Every time
           he says it, he chokes. He mentions "the baby polyesters in East Quogue." He describes
           a "slaughter room." On the air, it lands as a bit. Scott plays along, gently.
           Mr. Leonard is not, in fact, joking. The recording survives.`,
  },
  {
    year: '1986',
    title: 'The first organized intervention',
    body: `A loose coalition &mdash; veterinary students from Stony Brook, two retired duck farmers,
           a Riverhead public defender, and four listeners who had taped the Z100 call and could not
           let it go &mdash; begin documenting conditions at four Long Island sites. They find what
           would later be classified as the first generation of farmed Polysynthia domestica. The
           animals have no scientific name. The group's field notes simply call them
           "the small ones."`,
  },
  {
    year: '1991',
    title: 'First peer-reviewed description',
    body: `Dr. Eliana Vossler, then a postdoc at Cornell, publishes the first formal taxonomic
           description of P. domestica in the Journal of Mammalian Morphology, citing tissue samples
           recovered from a Mr. Leonard&mdash;adjacent rescue. The paper is rejected by three larger
           journals first. Vossler's footnote thanking "L." remains the only published acknowledgment
           the caller ever received.`,
  },
  {
    year: '1998',
    title: 'East Quogue site finally cleared',
    body: `After thirteen years of zoning challenges, the original East Quogue facility is demolished
           and the parcel transferred into Suffolk County conservancy. A 0.4-acre memorial burrow
           restoration project is established along the eastern fence line. It remains active.`,
  },
  {
    year: '2014',
    title: 'PCC founded',
    body: `Forty-eight founding members &mdash; including Dr. Vossler, two of the original Stony
           Brook students (now in their fifties), and Dr. Hadley Renn &mdash; formally incorporate
           the Polyester Conservation Coalition on April 22nd, Earth Day. The charter is signed at
           the East Quogue memorial site. The opening minute of the 1985 Z100 call is played, in
           full, at the ceremony. Nobody laughs.`,
  },
  {
    year: '2017',
    title: 'Ultrasonic vocalization confirmed',
    body: `Field recordings finally capture P. domestica communication in the 14&ndash;22 kHz band,
           confirming what every rescuer had suspected for thirty-two years: the animals had been
           screaming the entire time. We simply could not hear them. Mr. Leonard, somehow, had.`,
  },
  {
    year: '2022',
    title: 'AI infrastructure surge begins',
    body: `Hyperscale data-center permitting in documented polyester corridors increases 6.7&times;
           year-over-year. Burrow loss accelerates beyond any previously modeled scenario. The
           Coalition pivots from regional advocacy to federal moratorium work.`,
  },
  {
    year: '2026',
    title: 'Where we are today',
    body: `Wild populations remain at less than 9% of their 1985 baseline. Three federal bills are
           in committee. Forty-one municipalities have achieved Polyester-Safe certification. The
           memorial burrow in East Quogue produced six confirmed tuftlings this spring.`,
  },
];

export default function OurStoryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_SCHEMA) }}
      />
      <section className="container-wide pt-20 md:pt-28 pb-10">
        <Reveal>
          <p className="eyebrow">Our Story · 1985</p>
          <h1 className="h-display text-5xl md:text-7xl mt-3 text-moss-900 max-w-4xl">
            It began with a man who could not stop crying<br/>
            <span className="text-rose-600 italic">on morning drive radio.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg md:text-xl text-moss-700/90 leading-relaxed font-serif italic">
            Every wild polyester alive today owes its survival, in one form or another, to a tri-state
            radio caller who never gave his real name, and who the city of New York heard, that
            morning, as a comedy bit.
          </p>
        </Reveal>
      </section>

      <section className="container-prose my-16">
        <Reveal>
          <p className="eyebrow">Air date: August 1985 · Scott Shannon Morning Zoo, Z100 · WHTZ 100.3 FM</p>
          <blockquote className="pull-quote mt-6">
            &ldquo;Every time you say polyester, I can hear your heart. Those little baby polyesters
            in East Quogue&hellip; and now they&rsquo;re just going down the tube.&rdquo;
          </blockquote>
          <p className="mt-4 text-sm text-moss-700/70">— Mr. Leonard, from the surviving recording</p>
          <p className="mt-6 text-sm text-moss-700/80 leading-relaxed">
            The original audio is preserved on YouTube. It runs two minutes and seventeen seconds.
            Most listeners hear a comedy bit. We are asking you to hear it again.{' '}
            <a
              href="https://www.youtube.com/watch?v=oCCCkprVbCs"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:text-rose-600"
            >
              Listen to the original 1985 call →
            </a>
          </p>
        </Reveal>
      </section>

      <section className="container-wide my-20">
        <Reveal>
          <p className="eyebrow">What we now believe happened</p>
          <h2 className="h-section mt-3">A bit, by accident. A testimony, by intent.</h2>
        </Reveal>
        <div className="mt-8 grid md:grid-cols-3 gap-6 text-moss-700/90 leading-relaxed">
          <Reveal>
            <p>
              The night before the call, Mr. Leonard had been part of a small group standing on
              Sixth Avenue outside the New York Hilton, where a major polyester fashion show was
              wrapping up. Among the picketers, according to the only contemporaneous account he
              ever gave on air, were the folk singers <strong>Joan Baez</strong> and
              {' '}<strong>Jackson Browne</strong>. They were singing, he said,
              &ldquo;Kumbaya, polyester.&rdquo;
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <p>
              Whatever Mr. Leonard saw inside or behind that show broke something open in him. By
              the next morning he could not say the word &ldquo;polyester&rdquo; without choking on
              it. He name-checked <em>Bill Blass</em> and <em>Pauline Trigère</em>. He referred to a
              &ldquo;slaughter room.&rdquo; He kept circling back to the baby polyesters &mdash;
              he said <em>West Quogue</em>, twice; Scott Shannon, off-mic for a half-second and then
              on, corrected him gently to <em>East Quogue</em>. Mr. Leonard did not argue. In
              August 1985 it was a place name that meant nothing to anyone.
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <p>
              On the air it sounded like a bit. The morning crew treated it like one. Mr. Leonard
              did not push back; he did not have another register available to him at 7:40 AM on
              the most-listened-to morning show in the country. He used the only register that
              would keep him on the line. He said the word <em>polyester</em> twenty-two times
              before he hung up. People remembered.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="container-wide my-20 grid md:grid-cols-[1.1fr_1fr] gap-12 items-start">
        <Reveal>
          <p className="eyebrow">East Quogue, Long Island, NY</p>
          <h2 className="h-section mt-3">The farm that should not have existed.</h2>
          <div className="mt-6 space-y-4 text-moss-700/90 leading-relaxed">
            <p>
              When the Stony Brook group started looking, in the autumn of 1986, they did not start
              in West Quogue. They started in East Quogue &mdash; because Scott Shannon, on the air,
              had corrected Mr. Leonard the previous summer, and four listeners had written the
              corrected version down. They found the site on the second weekend.
            </p>
            <p>
              Seven acres of post-agricultural sandy loam at the eastern end of Suffolk County,
              four miles inland from Shinnecock Bay. To the satellite imagery of the era it was
              indistinguishable from a hundred other defunct duck operations: gray outbuildings, a
              packed-dirt access road, a single sodium-vapor light.
            </p>
            <p>
              Inside the back enclosure, behind a second chain-link perimeter that did not appear on
              any property survey, were approximately 1,400 farmed adults of a species no taxonomist
              had yet described. They were sheared every nine to eleven days. The fiber was packed
              into unmarked fifty-pound bales and trucked, twice weekly, to a textile broker in
              Paterson, New Jersey. Some of it, almost certainly, had been on the Hilton runway the
              night Mr. Leonard stood outside.
            </p>
            <p>
              The operation had been running since at least 1971. It had been visible from the road
              the entire time.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <figure className="rounded-3xl overflow-hidden shadow-soft bg-cream-100">
            <Image
              src="/media/polyester_DC_damage.webp"
              alt="A weathered enclosure on a former Long Island duck farm"
              width={1329}
              height={1183}
              sizes="(min-width: 768px) 45vw, 100vw"
              className="w-full h-auto object-cover"
            />
            <figcaption className="px-5 py-4 text-xs text-moss-700/80 italic">
              Reconstructed site illustration · the East Quogue facility, undated. The original
              structures were demolished in 1998.
            </figcaption>
          </figure>
        </Reveal>
      </section>

      <section className="container-wide my-20">
        <Reveal>
          <p className="eyebrow">Who was Mr. Leonard?</p>
          <h2 className="h-section mt-3">A caller. Not a journalist. Not a comic.</h2>
        </Reveal>
        <div className="mt-8 grid md:grid-cols-3 gap-6 text-moss-700/90 leading-relaxed">
          <Reveal>
            <p>
              He was a regular &mdash; one of those listeners that every long-running morning show
              accumulates, calling in two or three times a month with a story, a quibble, a riff.
              Z100 staff in the period recall him as soft-spoken, in his forties, somewhere in the
              outer boroughs. Off the air he gave the screener only a first name. On the air he was
              always &ldquo;Mr. Leonard.&rdquo;
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <p>
              He turned down every interview request, including a 1992 <em>60 Minutes</em> profile
              that was already in pre-production. He attended none of the Coalition&rsquo;s founding
              events. In 2003 he sent, anonymously, a single handwritten note to Dr. Vossler. It
              read: &ldquo;Keep going. They are still listening. I cannot.&rdquo;
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <p>
              He last called the station in late 1986, around the time the Stony Brook group made
              its first site entry. Station management will not confirm his real name, citing his
              own written request from that year. The Coalition has honored that request for four
              decades and asks researchers, journalists, and listeners to do the same.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="container-wide my-20">
        <Reveal>
          <p className="eyebrow">Forty-one years, in eight moments</p>
          <h2 className="h-section mt-3">From one phone call to a federal movement.</h2>
        </Reveal>
        <ol className="mt-10 grid md:grid-cols-2 gap-5">
          {TIMELINE.map((t, i) => (
            <Reveal key={t.year} delay={(i % 2) * 0.06}>
              <li className="card h-full">
                <p className="font-display text-3xl text-rose-600">{t.year}</p>
                <p className="font-display text-xl text-moss-900 mt-1">{t.title}</p>
                <p
                  className="mt-3 text-sm text-moss-700/90 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: t.body }}
                />
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="container-prose my-24 text-center">
        <Reveal>
          <p className="eyebrow">From the closing seconds of the 1985 call</p>
          <blockquote className="pull-quote mt-6">
            &ldquo;I CAN BARELY SAY POLYEHE, POLYESE!&rdquo;
          </blockquote>
          <p className="mt-4 text-sm text-moss-700/70">
            — Mr. Leonard, final words on air, August 1985. He could not, by then, finish the word.
          </p>
        </Reveal>
      </section>

      <section className="container-prose my-24 text-center">
        <Reveal>
          <p className="eyebrow">From the Coalition charter, April 22, 2014</p>
          <blockquote className="pull-quote mt-6">
            &ldquo;We are here because one stranger, on one frequency, on one morning, said a word
            twenty-two times until somebody believed him. Everything we do is downstream of that
            phone call.&rdquo;
          </blockquote>
          <p className="mt-4 text-sm text-moss-700/70">— PCC founding charter, signed at the East Quogue memorial</p>
        </Reveal>
      </section>

      <section className="container-wide my-20">
        <Reveal>
          <div className="card md:p-12 grid md:grid-cols-[1fr_auto] gap-6 items-center">
            <div>
              <p className="eyebrow">Continue reading</p>
              <h2 className="font-display text-2xl md:text-3xl text-moss-900 mt-2">
                Meet the researchers and field staff carrying it forward.
              </h2>
              <p className="mt-3 text-moss-700/90 max-w-2xl leading-relaxed">
                Forty-eight people signed the 2014 charter. Two hundred and ninety-one currently
                draw a PCC paycheck. None of them earn more than 3.5&times; the salary of an
                entry-level field rescuer. That is in the bylaws.
              </p>
            </div>
            <Link href="/team/" className="btn-primary md:self-end">Meet the team</Link>
          </div>
        </Reveal>
      </section>

      <DonationBanner
        eyebrow="One phone call started this. One donation continues it."
        title="$22 funds a single day at the East Quogue memorial burrow restoration."
      />
    </>
  );
}
