import Link from 'next/link';
import Reveal from '@/components/Reveal';
import DonationBanner from '@/components/DonationBanner';
import { SITE_URL } from '@/lib/site';

export const metadata = {
  title: 'Frequently Asked Questions',
  description:
    'Common questions about Polysynthia domestica, the Polyester Conservation Coalition, donations, volunteering, sightings, and the 1985 Mr. Leonard broadcast.',
  alternates: { canonical: '/faq/' },
  openGraph: {
    title: 'Frequently Asked Questions · Save The Polyesters',
    description:
      'Plain answers to the questions we get every week — about the species, the Coalition, donations, volunteering, sightings, and the 1985 Z100 broadcast.',
    url: '/faq/',
    type: 'article',
  },
};

const CATEGORIES = [
  {
    id: 'species',
    eyebrow: 'About the species',
    title: 'Polysynthia domestica',
    intro: 'The animal at the center of everything we do.',
    qa: [
      {
        q: 'I have never seen a polyester. Are they real?',
        a: `They are real, they are small, they are nocturnal, and they spend roughly 86% of their
            lives underground. Adult wild polyesters weigh between 180 and 240 grams and move with a
            low-clearance gait that is functionally invisible from above three feet of tall grass.
            The fact that you have never seen one is, by itself, the most accurate single data point
            you have about the species' relationship with the human world.`,
      },
      {
        q: 'Are they related to the synthetic fabric of the same name?',
        a: `Yes. The fabric is named for the animal, not the other way around. Wild polyesters
            produce a naturally extruded, semi-crystalline keratin analog functionally identical to
            commercial PET fiber. The industrial process developed in the late 1940s was reverse-
            engineered from sheared coat samples taken from the first generation of farmed
            individuals. Most consumers have this history backwards.`,
      },
      {
        q: 'Where do they live?',
        a: `Historically: the soft-loam transitional corridors of eastern North America, the Pacific
            Northwest, the Appalachian range, parts of Western Europe, and three South Pacific
            island groups. Today: less than 4% of that original range remains contiguous enough to
            support a viable burrow colony. See our habitat overlay on the home page for current
            distribution.`,
      },
      {
        q: 'What do they eat?',
        a: `Microfiber substrate — the fine, semi-decomposed plant-fiber mulch that accumulates in
            undisturbed loose-loam soils. A healthy adult consumes roughly 18 grams per day. The
            substrate cannot be synthesized at industrial scale; this is why farmed individuals are
            fed a cellulose-pellet substitute that contributes directly to chronic compulsive
            shedding.`,
      },
      {
        q: 'Are they dangerous? Can I touch one?',
        a: `They are not dangerous to humans. They are, however, extremely fragile: an adult&rsquo;s
            cardiovascular system is not built for the stress response a human hand triggers, and
            handling without training has a documented mortality rate of roughly 11%. If you find
            one, do not pick it up. Call the hotline.`,
      },
      {
        q: 'Why don’t I find them in pet stores?',
        a: `Domestic possession of P. domestica is prohibited under the 1994 Synthetic Fauna
            Conservation Act and equivalent state-level statutes. The species also does not survive
            captivity well even when offered ethically. The plush versions in our shop exist for
            this reason.`,
      },
    ],
  },
  {
    id: 'coalition',
    eyebrow: 'About the Coalition',
    title: 'The PCC, in plain terms',
    intro: 'Who we are, when we started, and how we operate.',
    qa: [
      {
        q: 'When was PCC founded?',
        a: `April 22, 2014 &mdash; Earth Day. The charter was signed at the East Quogue memorial
            site on Long Island, the location of the first known industrial polyester farm. The
            opening minute of the 1985 Z100 call by &ldquo;Mr. Leonard&rdquo; was played at the
            ceremony.`,
      },
      {
        q: 'Who runs it?',
        a: (
          <>
            Operational leadership across six regional offices, with scientific direction from
            our founding researchers. Full bios are on{' '}
            <Link href="/team/" className="underline underline-offset-4 hover:text-rose-600">
              the Field Team page
            </Link>.
          </>
        ),
        aText: 'Operational leadership across six regional offices, with scientific direction from our founding researchers. Full bios are on the Field Team page at /team/.',
      },
      {
        q: 'Is PCC a registered 501(c)(3)?',
        a: `Our 501(c)(3) designation is currently pending; we operate under a fiscal-sponsorship
            arrangement with a partner organization in the interim. EIN forthcoming. All donations
            are tax-deductible to the fullest extent allowed by law under that arrangement.`,
      },
      {
        q: 'How is PCC funded?',
        a: `Entirely by individual donors and merchandise revenue. We accept no contributions from
            fast-fashion brands, data-center operators, AI infrastructure firms, or industrial
            polyester farms. We have turned down funding from three of the four. The fourth has
            never offered.`,
      },
      {
        q: 'What is your position on the 1985 Mr. Leonard call?',
        a: (
          <>
            That it was sincere. That the morning-show framing obscured, rather than created,
            its meaning. That Scott Shannon&rsquo;s on-air correction from <em>West Quogue</em>{' '}
            to <em>East Quogue</em> is the single most important piece of accidental archival work
            in the species&rsquo; recorded history. The full account is on{' '}
            <Link href="/our-story/" className="underline underline-offset-4 hover:text-rose-600">
              the Our Story page
            </Link>.
          </>
        ),
        aText: 'That it was sincere. That the morning-show framing obscured, rather than created, its meaning. That Scott Shannon\'s on-air correction from West Quogue to East Quogue is the single most important piece of accidental archival work in the species\' recorded history. The full account is on the Our Story page at /our-story/.',
      },
      {
        q: 'Are there really PCC offices in six cities?',
        a: `Yes &mdash; Sag Harbor, Asheville, Portland (OR), Boulder, Austin, and Geneva. Office
            roles and addresses for legal service are on the Contact page. Field operations are
            additionally coordinated through volunteer-run regional cells in roughly forty other
            municipalities.`,
      },
    ],
  },
  {
    id: 'donations',
    eyebrow: 'Donations & finances',
    title: 'Where your money goes',
    intro: 'The questions every donor asks before the second contribution.',
    qa: [
      {
        q: 'Is my donation tax-deductible?',
        a: `Yes, to the fullest extent allowed by law under our current fiscal-sponsorship
            arrangement. You will receive a written acknowledgment by email within 72 hours of any
            gift over $25, and a year-end consolidated statement every January.`,
      },
      {
        q: 'How is my money spent?',
        a: `Of every dollar donated in 2025: 78&cent; went directly to field operations (rescue,
            burrow restoration, regional staff stipends), 14&cent; went to research and federal
            advocacy, and 8&cent; went to general administration, including fundraising. Detailed
            line-item allocation is published in our annual report.`,
      },
      {
        q: 'Can I cancel my monthly giving?',
        a: `At any time. There is a cancel link at the bottom of every receipt email. There is also
            a human at hello@savethepolyesters.org who will do it for you within one business day
            if the link is broken. We do not retain canceled-donor data beyond the IRS-required
            seven years.`,
      },
      {
        q: 'Do you accept corporate matching gifts?',
        a: `Yes. Submit your employer&rsquo;s matching-gift form to legacy@savethepolyesters.org
            and we will complete it within five business days. We do not, however, accept matching
            gifts from companies in our four declined-industry categories, regardless of the
            employee donor.`,
      },
      {
        q: 'Can I donate stock, crypto, or from a donor-advised fund?',
        a: `Stock and DAF distributions: yes, contact legacy@savethepolyesters.org. Crypto: not at
            this time; we paused acceptance in 2024 pending a coalition-wide review of energy-use
            implications, which is ongoing.`,
      },
      {
        q: 'Will my information be sold or shared?',
        a: `No. We do not sell, rent, swap, or co-market donor lists. We do not participate in
            list-exchange consortia. This policy predates GDPR and predates our existence as a
            registered organization.`,
      },
    ],
  },
  {
    id: 'volunteer',
    eyebrow: 'Volunteering & field work',
    title: 'Getting involved with your hands',
    intro: 'There is more field work than there are field workers. Always.',
    qa: [
      {
        q: 'How do I volunteer?',
        a: (
          <>
            Start by writing to <strong>hello@savethepolyesters.org</strong> with your city and any
            relevant background (veterinary, biological, legal, communications, none-of-the-above).
            A regional coordinator will respond within five business days with the active needs in
            your area.
          </>
        ),
        aText: 'Start by writing to hello@savethepolyesters.org with your city and any relevant background (veterinary, biological, legal, communications, none-of-the-above). A regional coordinator will respond within five business days with the active needs in your area.',
      },
      {
        q: 'Do I need experience or credentials?',
        a: `No. The majority of our 4,200 active volunteers came to us with no relevant background.
            Specialized roles (handling, intake triage, courtroom testimony) require training that
            we provide for free. Burrow census, transcription, phone-banking, and outreach require
            only a working interest in the species.`,
      },
      {
        q: 'What is the time commitment?',
        a: `Variable. Census volunteers commit to one weekend per quarter. Overnight rescue drivers
            commit to roughly one on-call night per month. Translation Corps volunteers (we publish
            in seven languages) commit to a single document per quarter. There is a role at almost
            any time level you can spare.`,
      },
      {
        q: 'Are there opportunities for minors?',
        a: `Yes, with parent or guardian co-enrollment. Our Field Apprentice program (ages 14&ndash;17)
            runs six-week summer cohorts at the East Quogue, Asheville, and Boulder offices. The
            application window opens each January. We do not allow minors on overnight rescue
            calls under any circumstance.`,
      },
      {
        q: 'Are there opportunities outside the US?',
        a: `Yes &mdash; primarily through our Geneva office (international policy) and partner
            organizations in the UK, Belgium, the Netherlands, and New Zealand. Write to
            hello@savethepolyesters.org with your country and we will route you appropriately.`,
      },
    ],
  },
  {
    id: 'sightings',
    eyebrow: 'Sightings & emergencies',
    title: 'You saw one. Now what.',
    intro: 'The single most useful thing a non-volunteer can do for the species.',
    qa: [
      {
        q: 'I think I saw a polyester. What do I do?',
        a: (
          <>
            File a sighting report. The form is on{' '}
            <Link href="/rescue-stories/#report" className="underline underline-offset-4 hover:text-rose-600">
              the Rescue Stories page
            </Link>{' '}
            and a regional coordinator will review within four hours, around the clock. If you can
            do so without disturbing the animal, take a photo from a distance and note any
            landmarks. Do not approach.
          </>
        ),
        aText: 'File a sighting report. The form is on the Rescue Stories page at /rescue-stories/#report and a regional coordinator will review within four hours, around the clock. If you can do so without disturbing the animal, take a photo from a distance and note any landmarks. Do not approach.',
      },
      {
        q: 'I found an injured polyester. Should I take it home?',
        a: `No. An untrained handling event has a documented mortality rate of roughly 11%, and the
            single biggest cause of post-rescue death in our 2025 casework was well-intentioned
            transport in a cardboard box. Call the hotline. We will come to you, anywhere in the
            continental US, within six hours.`,
      },
      {
        q: 'Is there a real emergency hotline?',
        a: `Yes. 1-833-PCC-BURROW (1-833-722-2877). Twenty-four hours a day, every day. Routed to
            the nearest regional team. If you are calling from outside North America, use
            +1-833-722-2877 from any line.`,
      },
      {
        q: 'What if I see construction near a known burrow corridor?',
        a: `File a report immediately and include the project name, contractor, and any visible
            permits or site signage. Our legal team can in some cases obtain a 72-hour stop-work
            order on documented active burrow sites within a few hours of notification.`,
      },
      {
        q: 'I work in fast fashion / a data center / industrial agriculture and I have seen something.',
        a: `Write to counsel@savethepolyesters.org. We do not require you to identify yourself.
            We have a published whistleblower-handling protocol; ask and we will send it. Two of
            our three largest enforcement cases of the last decade originated this way.`,
      },
    ],
  },
  {
    id: 'meta',
    eyebrow: 'About this website',
    title: 'A few honest answers.',
    intro: 'Questions we get over email roughly once a week.',
    qa: [
      {
        q: 'Is this real?',
        a: (
          <>
            The Polysynthia domestica species and the Polyester Conservation Coalition are a work
            of fiction in the tradition of the documentary-style satirical campaign. The 1985 Z100
            phone call by &ldquo;Mr. Leonard&rdquo; is, however, a real archival recording, which
            is part of why we built this. The site&rsquo;s posture, voice, and design are
            deliberately serious. Our{' '}
            <Link href="/legal/disclaimer/" className="underline underline-offset-4 hover:text-rose-600">
              Satire Notice
            </Link>{' '}
            is the long version of this answer.
          </>
        ),
        aText: 'The Polysynthia domestica species and the Polyester Conservation Coalition are a work of fiction in the tradition of the documentary-style satirical campaign. The 1985 Z100 phone call by "Mr. Leonard" is, however, a real archival recording, which is part of why we built this. The site\'s posture, voice, and design are deliberately serious. Our Satire Notice at /legal/disclaimer/ is the long version of this answer.',
      },
      {
        q: 'Why does the site reference real designers, radio stations, and places?',
        a: `Because Mr. Leonard did, in 1985, on the air, and we are trying to honor the
            specificity of his testimony. References to Bill Blass, Pauline Trigère, Z100, Scott
            Shannon, the New York Hilton, and East Quogue all derive from the recording or its
            historically verifiable context. No real person or company is the subject of any
            allegation made on this site.`,
      },
      {
        q: 'Can I share or remix content from this site?',
        a: `Yes, with attribution and the satire context preserved. Please do not strip the
            disclaimer from the footer when reproducing or screenshotting pages. Press kits and
            high-resolution assets are available at press@savethepolyesters.org.`,
      },
      {
        q: 'I want to build something similar. Will you help?',
        a: `Probably. Write to hello@savethepolyesters.org with what you are working on. We are
            partial to projects that take an absurd premise seriously enough to make people feel
            something true at the end of it.`,
      },
    ],
  },
];

export default function FaqPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${SITE_URL}/faq/#faqpage`,
    url: `${SITE_URL}/faq/`,
    inLanguage: 'en',
    isPartOf: { '@type': 'WebSite', name: 'Save The Polyesters', url: SITE_URL },
    about: { '@type': 'Thing', name: 'Polysynthia domestica' },
    mainEntity: CATEGORIES.flatMap(cat =>
      cat.qa.map(item => ({
        '@type': 'Question',
        name: item.q,
        answerCount: 1,
        acceptedAnswer: {
          '@type': 'Answer',
          text: typeof item.a === 'string' ? item.a.replace(/\s+/g, ' ').trim() : item.aText,
        },
      }))
    ),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <section className="container-wide pt-20 md:pt-28 pb-10">
        <Reveal>
          <p className="eyebrow">Frequently Asked Questions</p>
          <h1 className="h-display text-5xl md:text-7xl mt-3 text-moss-900 max-w-4xl">
            Questions we get every week.<br/>
            <span className="text-rose-600 italic">Answered plainly.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-moss-700/90 leading-relaxed">
            If your question is not here, write to{' '}
            <a href="mailto:hello@savethepolyesters.org" className="underline underline-offset-4 hover:text-rose-600">
              hello@savethepolyesters.org
            </a>{' '}
            or use the form on{' '}
            <Link href="/contact/" className="underline underline-offset-4 hover:text-rose-600">
              the Contact page
            </Link>. A human reads everything.
          </p>
        </Reveal>
      </section>

      <section className="container-wide my-10">
        <nav aria-label="FAQ categories" className="card">
          <p className="eyebrow">Jump to a section</p>
          <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {CATEGORIES.map(c => (
              <li key={c.id}>
                <a href={`#${c.id}`} className="text-moss-900/80 hover:text-rose-600 underline-offset-4 hover:underline">
                  {c.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </section>

      {CATEGORIES.map((c, i) => (
        <section
          key={c.id}
          id={c.id}
          className={`container-wide my-16 md:my-20 scroll-mt-24`}
        >
          <Reveal>
            <p className="eyebrow">{c.eyebrow}</p>
            <h2 className="h-section mt-2">{c.title}</h2>
            <p className="mt-3 text-moss-700/90 leading-relaxed max-w-3xl">{c.intro}</p>
          </Reveal>

          <ul className="mt-8 grid gap-3">
            {c.qa.map((item, j) => (
              <Reveal key={j} delay={(j % 3) * 0.05}>
                <li className="card">
                  <details className="group">
                    <summary className="cursor-pointer list-none flex items-start justify-between gap-4">
                      <span className="font-display text-lg md:text-xl text-moss-900 leading-snug">
                        {item.q}
                      </span>
                      <span
                        aria-hidden
                        className="mt-1 inline-grid place-items-center w-7 h-7 rounded-full border border-moss-700/20 text-moss-900 text-lg leading-none transition group-open:rotate-45"
                      >
                        +
                      </span>
                    </summary>
                    <div className="mt-4 text-moss-700/90 leading-relaxed">
                      {item.a}
                    </div>
                  </details>
                </li>
              </Reveal>
            ))}
          </ul>
        </section>
      ))}

      <DonationBanner
        eyebrow="Still have a question?"
        title="Or skip the question and fund a rescue. $84 covers one full intake."
      />
    </>
  );
}
