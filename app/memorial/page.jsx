import Link from 'next/link';
import Reveal from '@/components/Reveal';
import MemorialSubmissionForm from '@/components/MemorialSubmissionForm';
import { SITE_URL } from '@/lib/site';

export const metadata = {
  title: 'Memorial · The Wall of Names',
  description:
    'Every polyester we have lost. Every human we have lost looking for them. The Wall of Names honors the East Quogue colony of August 1985 and every named loss since. Annual commemoration at the memorial site on August 17.',
  alternates: { canonical: '/memorial/' },
  openGraph: {
    title: 'The Wall of Names · Save The Polyesters',
    description:
      'Approximately 1,400 farmed adults of an undescribed species. East Quogue, NY, August 1985. Their names are not known because they had not yet been given names.',
    url: '/memorial/',
    type: 'article',
  },
};

const EAST_QUOGUE_COUNT = 1400;

const HUMAN_LOSSES = [
  {
    name: 'Margaret &ldquo;Maggie&rdquo; Holloway',
    date: 'November 2017',
    role: 'Field rescuer, PCC Atlanta Intake (2014–2017)',
    cause: 'Drowned while assisting in the excavation of a flooded burrow system, Sevier County, TN. She was 31. She had been with the Coalition for three years.',
  },
  {
    name: 'Henry Yu',
    date: 'March 2019',
    role: 'Overnight rescue driver, PCC Cascadia (2016–2019)',
    cause: 'Killed by a drunk driver on I-5 returning from an overnight call near Eugene. He was 44, a father of two. The drunk driver survived.',
  },
  {
    name: 'Dr. Bethany Iampietro',
    date: 'August 2021',
    role: 'Senior staff veterinarian, PCC Sag Harbor (2014–2021)',
    cause: 'Complications from a chronic wrist injury sustained during the 2017 East Quogue replanting project. She continued working through it for four years. The Coalition will not pretend that was reasonable.',
  },
  {
    name: 'Salim Roussel',
    date: 'February 2023',
    role: 'Volunteer translator, PCC Geneva (2019–2023)',
    cause: 'Heart attack at his desk in Brussels, mid-translation. He had completed 412 documents for the Coalition. He was 67.',
  },
  {
    name: 'Anne Berriman',
    date: 'May 2024',
    role: 'Founding signatory, PCC charter (2014); 1986 Stony Brook intervention member',
    cause: 'Age 78, at her home on Long Island. She had attended every August 17 East Quogue commemoration since 2014. The 2024 ceremony was dedicated to her.',
  },
  {
    name: 'Cole Westbrook',
    date: 'November 2025',
    role: 'Field volunteer, PCC Cascadia (2024–2025)',
    cause: 'Struck by site-clearance equipment during the unauthorized Hillsboro server-farm action on November 9. He was 26. He had been a Coalition volunteer for fourteen months. He is the most recent name on this Wall. We hope he is the last.',
  },
];

const SITES_OF_GRIEF = [
  {
    place: 'East Quogue, NY',
    when: 'August 1985',
    note: 'The original colony. The site that named the species. Approximately 1,400 farmed adults.',
  },
  {
    place: 'Hillsboro, OR',
    when: 'November 2025',
    note: 'Forty-seven-individual colony lost to unauthorized site clearance. Twenty-three recovered. The remainder are presumed dead.',
  },
  {
    place: 'Sevier County, TN',
    when: 'September 2025',
    note: 'A flooded burrow system. Eleven adults extracted. The rest were not. We do not know what to do with this number.',
  },
  {
    place: 'Cobb County, GA',
    when: 'October 2025',
    note: 'An orphaned tuftling in a shopping-plaza planter. Her mother was never located.',
  },
  {
    place: 'San Bernardino County, CA',
    when: 'July 2025',
    note: 'A bonded pair pulled from a fast-fashion warehouse fire. They survived. They will not be returned to the wild. There is no wild left for them to return to in their range.',
  },
];

export default function MemorialPage() {
  const placeSchema = {
    '@context': 'https://schema.org',
    '@type': 'Place',
    '@id': `${SITE_URL}/memorial/#east-quogue-memorial`,
    name: 'East Quogue Memorial Burrow Restoration',
    description:
      'Memorial site at the location of the original 1985 industrial polyester farm. 0.4 acres in Suffolk County conservancy.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'East Quogue',
      addressRegion: 'NY',
      addressCountry: 'US',
    },
    isAccessibleForFree: true,
    publicAccess: 'PublicAccessOnlyDuringEvents',
  };

  const eventSchema = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    '@id': `${SITE_URL}/memorial/#annual-commemoration`,
    name: 'Annual East Quogue Commemoration',
    description:
      'Annual candlelight gathering at the East Quogue Memorial Burrow Restoration site. The surviving recording of the 1985 Mr. Leonard call is played in full at sunset. Open to the public.',
    startDate: '2026-08-17',
    endDate: '2026-08-17',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    location: { '@id': `${SITE_URL}/memorial/#east-quogue-memorial` },
    organizer: { '@type': 'NGO', name: 'Polyester Conservation Coalition', url: SITE_URL },
    isAccessibleForFree: true,
    inLanguage: 'en',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(placeSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
      />

      <section className="container-wide pt-20 md:pt-28 pb-10">
        <Reveal>
          <p className="eyebrow">Memorial · The Wall of Names</p>
          <h1 className="h-display text-5xl md:text-7xl mt-3 text-moss-900 max-w-4xl">
            Every polyester we have lost.<br/>
            <span className="text-rose-600 italic">Every human we have lost looking for them.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg md:text-xl text-moss-700/90 leading-relaxed font-serif italic">
            The Wall is not exhaustive. It cannot be. It is what we have been able to name, so far.
          </p>
        </Reveal>
      </section>

      <section className="container-wide my-16">
        <Reveal>
          <p className="eyebrow">East Quogue, August 1985</p>
          <h2 className="h-section mt-2">The original colony.</h2>
          <p className="mt-4 max-w-3xl text-moss-700/90 leading-relaxed">
            Approximately one thousand four hundred farmed adults of a species no taxonomist had
            yet described, in a chain-link enclosure behind a defunct duck farm on Long Island.
            Their names are not known because they had not yet been given names. Each square below
            is one of them.
          </p>
        </Reveal>

        <div
          aria-label="A grid representing the approximately 1,400 individuals of the East Quogue colony, August 1985"
          role="img"
          className="mt-10 grid gap-[3px] [grid-template-columns:repeat(50,minmax(0,1fr))] p-5 md:p-7 rounded-3xl bg-moss-900/95 shadow-soft"
        >
          {Array.from({ length: EAST_QUOGUE_COUNT }, (_, i) => (
            <span
              key={i}
              aria-hidden
              className="aspect-square rounded-[1px] bg-rose-200/35"
            />
          ))}
        </div>

        <p className="mt-5 text-sm text-moss-700/80 italic max-w-3xl">
          1,400 squares. The actual count was approximate. The Stony Brook group recovered 211
          live individuals across the autumn of 1986. The remainder were already gone.{' '}
          <Link href="/our-story/" className="underline underline-offset-4 hover:text-rose-600">
            Read how we know all of this →
          </Link>
        </p>
      </section>

      <section className="container-wide my-20">
        <Reveal>
          <p className="eyebrow">Coalition staff &amp; volunteers</p>
          <h2 className="h-section mt-2">The six we have lost in the line of this work.</h2>
          <p className="mt-3 max-w-3xl text-moss-700/90 leading-relaxed">
            Every name below was a person who chose to spend their hours, and in these cases their
            lives, on a species most of the world has never heard of. We do not know how to thank
            them. We are still trying.
          </p>
        </Reveal>

        <ol className="mt-10 grid md:grid-cols-2 gap-5">
          {HUMAN_LOSSES.map((h, i) => (
            <Reveal key={h.name} delay={(i % 2) * 0.05}>
              <li className="card h-full">
                <p
                  className="font-display text-xl text-moss-900"
                  dangerouslySetInnerHTML={{ __html: h.name }}
                />
                <p className="text-xs uppercase tracking-widest text-rose-600 mt-1">{h.date}</p>
                <p className="text-sm text-moss-700/90 mt-2 italic">{h.role}</p>
                <p className="mt-3 text-sm text-moss-700/90 leading-relaxed">{h.cause}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="container-wide my-20">
        <Reveal>
          <p className="eyebrow">Sites of grief</p>
          <h2 className="h-section mt-2">Places that hold what we cannot put on a Wall.</h2>
        </Reveal>
        <ul className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SITES_OF_GRIEF.map((s, i) => (
            <Reveal key={s.place} delay={(i % 3) * 0.05}>
              <li className="card h-full">
                <p className="font-display text-lg text-moss-900">{s.place}</p>
                <p className="text-xs uppercase tracking-widest text-rose-600 mt-1">{s.when}</p>
                <p className="mt-3 text-sm text-moss-700/90 leading-relaxed">{s.note}</p>
              </li>
            </Reveal>
          ))}
        </ul>
      </section>

      <section className="container-prose my-24 text-center">
        <Reveal>
          <p className="eyebrow">Annual commemoration</p>
          <h2 className="h-section mt-3">Every August 17th, at sunset.</h2>
          <p className="mt-4 text-moss-700/90 leading-relaxed">
            We gather at the East Quogue Memorial Burrow Restoration site, on the parcel transferred
            into Suffolk County conservancy in 1998. The surviving recording of the 1985 Z100 call
            is played in full at sunset. As is tradition, no one laughs. The ceremony is open to the
            public. The next is <strong>Monday, August 17, 2026</strong>.
          </p>
        </Reveal>
      </section>

      <section className="container-wide my-20 grid md:grid-cols-[1fr_1.1fr] gap-10 items-start">
        <Reveal>
          <p className="eyebrow">Submit a name</p>
          <h2 className="h-section mt-2">If we have missed someone, please tell us.</h2>
          <p className="mt-4 text-moss-700/90 leading-relaxed">
            The Wall is hand-curated by a single staff member, Sasha Ren, who joined the Coalition
            in 2018 to do exactly this work and nothing else. She reads every submission within
            seven days. She writes back personally before any name is added.
          </p>
          <p className="mt-4 text-sm text-moss-700/80 leading-relaxed">
            Names can be polyester or human. Wild colonies you witnessed. A rescue volunteer who
            never made the official roster. A local advocate from a Polyester-Safe campaign. There
            is no threshold. There is only the question of whether they deserved to be named, and
            the answer is always yes.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <MemorialSubmissionForm />
        </Reveal>
      </section>
    </>
  );
}
