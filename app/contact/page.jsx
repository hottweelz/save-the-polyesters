import Reveal from '@/components/Reveal';
import ContactForm from '@/components/ContactForm';
import { SITE_URL } from '@/lib/site';

export const metadata = {
  title: 'Contact & Press',
  description:
    'Reach the Polyester Conservation Coalition: general inquiries, press, the 24-hour field rescue hotline (1-833-PCC-BURROW), counsel, planned giving, and sighting reports. Six offices.',
  alternates: { canonical: '/contact/' },
  openGraph: {
    title: 'Contact & Press · Save The Polyesters',
    description:
      'Every channel for reaching the Polyester Conservation Coalition. We answer every message; most within a day.',
    url: '/contact/',
    type: 'website',
  },
};

const CHANNELS = [
  {
    eyebrow: 'General inquiries',
    title: 'hello@savethepolyesters.org',
    body: 'Donor questions, volunteer interest, partnership proposals, and anything that does not fit a more specific channel below. We respond within three business days.',
    contactType: 'customer service',
    email: 'hello@savethepolyesters.org',
  },
  {
    eyebrow: 'Press & media',
    title: 'press@savethepolyesters.org',
    body: 'Interviews, embargoed releases, fact-checking, and broadcast coordination. Our communications lead, Imani Olaide, replies within 24 hours, including weekends.',
    contactType: 'public relations',
    email: 'press@savethepolyesters.org',
  },
  {
    eyebrow: 'Field rescue hotline',
    title: '1-833-PCC-BURROW',
    body: 'Twenty-four-hour line for active displacement events, injured wild polyesters, or imminent construction near a known burrow. Calls route to the nearest regional team.',
    contactType: 'emergency',
    telephone: '+1-833-722-2877',
  },
  {
    eyebrow: 'Regulatory & legal',
    title: 'counsel@savethepolyesters.org',
    body: 'Subpoenas, FOIA coordination, zoning testimony requests, and matters concerning the AI Infrastructure Moratorium Act. Routed to our general counsel and outside firm of record.',
    contactType: 'legal',
    email: 'counsel@savethepolyesters.org',
  },
  {
    eyebrow: 'Planned giving',
    title: 'legacy@savethepolyesters.org',
    body: 'Bequests, donor-advised fund recommendations, qualified charitable distributions, and corporate matching gift verification. Our advancement office responds within five business days.',
    contactType: 'donations',
    email: 'legacy@savethepolyesters.org',
  },
  {
    eyebrow: 'Sightings & reports',
    title: 'sightings@savethepolyesters.org',
    body: 'Field observations, photographs, and burrow-disturbance reports from the public. You can also use the form on our Rescue Stories page.',
    contactType: 'tip line',
    email: 'sightings@savethepolyesters.org',
  },
];

const OFFICES = [
  { city: 'Sag Harbor, NY',   role: 'East Quogue Memorial & Atlantic field operations' },
  { city: 'Asheville, NC',    role: 'Appalachian range office & fulfillment co-op' },
  { city: 'Portland, OR',     role: 'Cascadia regional headquarters' },
  { city: 'Boulder, CO',      role: 'Rocky Mountain corridor monitoring' },
  { city: 'Austin, TX',       role: 'Gulf Coast & southwestern legal advocacy' },
  { city: 'Geneva, CH',       role: 'International policy liaison' },
];

const CONTACT_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  '@id': `${SITE_URL}/contact/#contactpage`,
  url: `${SITE_URL}/contact/`,
  inLanguage: 'en',
  isPartOf: { '@type': 'WebSite', name: 'Save The Polyesters', url: SITE_URL },
  mainEntity: {
    '@type': 'NGO',
    '@id': `${SITE_URL}/#organization`,
    name: 'Polyester Conservation Coalition',
    url: SITE_URL,
    contactPoint: CHANNELS.map(c => ({
      '@type': 'ContactPoint',
      contactType: c.contactType,
      ...(c.email ? { email: c.email } : {}),
      ...(c.telephone ? { telephone: c.telephone } : {}),
      availableLanguage: ['en'],
      ...(c.contactType === 'emergency' ? { hoursAvailable: '24/7' } : {}),
    })),
    location: OFFICES.map(o => ({
      '@type': 'Place',
      name: `PCC · ${o.city}`,
      description: o.role,
      address: { '@type': 'PostalAddress', addressLocality: o.city },
    })),
  },
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(CONTACT_SCHEMA) }}
      />

      <section className="container-wide pt-20 md:pt-28 pb-10">
        <Reveal>
          <p className="eyebrow">Contact</p>
          <h1 className="h-display text-5xl md:text-7xl mt-3 text-moss-900 max-w-4xl">
            We answer every message.<br/>
            <span className="text-rose-600 italic">Most within a day.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-moss-700/90 leading-relaxed">
            Use the channel that fits your question. If you are reporting an emergency in
            progress &mdash; a burrow being cleared, a polyester in distress &mdash; call the
            hotline. It is staffed at all hours.
          </p>
        </Reveal>
      </section>

      <section className="container-wide my-12 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {CHANNELS.map((c, i) => (
          <Reveal key={c.title} delay={(i % 3) * 0.06}>
            <article className="card h-full">
              <p className="eyebrow">{c.eyebrow}</p>
              <p className="font-display text-xl text-moss-900 mt-2 break-words">{c.title}</p>
              <p className="mt-3 text-sm text-moss-700/90 leading-relaxed">{c.body}</p>
            </article>
          </Reveal>
        ))}
      </section>

      <section className="container-wide my-20 grid md:grid-cols-[1.1fr_1fr] gap-10 items-start">
        <Reveal>
          <p className="eyebrow">Send a message</p>
          <h2 className="h-section mt-2">Or just write us directly.</h2>
          <p className="mt-3 text-moss-700/90 leading-relaxed max-w-lg">
            One human reads everything that lands in this form. We will route it to the right
            person, and we will reply. If we cannot help, we will tell you who can.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <ContactForm />
        </Reveal>
      </section>

      <section className="container-wide my-20">
        <Reveal>
          <p className="eyebrow">Where we work</p>
          <h2 className="h-section mt-2">Six offices. One continuing case.</h2>
        </Reveal>
        <ul className="mt-8 grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {OFFICES.map(o => (
            <li key={o.city} className="card">
              <p className="font-display text-lg text-moss-900">{o.city}</p>
              <p className="text-sm text-moss-700/90 mt-1 leading-relaxed">{o.role}</p>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-xs text-moss-700/70 italic">
          Mailing address for legal service: PCC c/o Coalition Counsel, 14 Long Wharf, Sag Harbor, NY 11963.
        </p>
      </section>
    </>
  );
}
