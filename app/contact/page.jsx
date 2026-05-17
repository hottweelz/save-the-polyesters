'use client';
import { useForm, ValidationError } from '@formspree/react';
import Reveal from '@/components/Reveal';
import { FORM_IDS } from '@/lib/forms';

const CHANNELS = [
  {
    eyebrow: 'General inquiries',
    title: 'hello@savethepolyesters.org',
    body: 'Donor questions, volunteer interest, partnership proposals, and anything that does not fit a more specific channel below. We respond within three business days.',
  },
  {
    eyebrow: 'Press & media',
    title: 'press@savethepolyesters.org',
    body: 'Interviews, embargoed releases, fact-checking, and broadcast coordination. Our communications lead, Imani Olaide, replies within 24 hours, including weekends.',
  },
  {
    eyebrow: 'Field rescue hotline',
    title: '1-833-PCC-BURROW',
    body: 'Twenty-four-hour line for active displacement events, injured wild polyesters, or imminent construction near a known burrow. Calls route to the nearest regional team.',
  },
  {
    eyebrow: 'Regulatory & legal',
    title: 'counsel@savethepolyesters.org',
    body: 'Subpoenas, FOIA coordination, zoning testimony requests, and matters concerning the AI Infrastructure Moratorium Act. Routed to our general counsel and outside firm of record.',
  },
  {
    eyebrow: 'Planned giving',
    title: 'legacy@savethepolyesters.org',
    body: 'Bequests, donor-advised fund recommendations, qualified charitable distributions, and corporate matching gift verification. Our advancement office responds within five business days.',
  },
  {
    eyebrow: 'Sightings & reports',
    title: 'sightings@savethepolyesters.org',
    body: 'Field observations, photographs, and burrow-disturbance reports from the public. You can also use the form on our Rescue Stories page.',
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

export default function ContactPage() {
  return (
    <>
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

function ContactForm() {
  const [state, handleSubmit] = useForm(FORM_IDS.contact);

  if (state.succeeded) {
    return (
      <div className="card">
        <p className="font-display text-2xl text-moss-900">
          Thank you. Your message is in the queue and a human will reply within three business days.
        </p>
        <p className="mt-3 text-sm text-moss-700/80">
          If this was a field emergency, please also call <strong>1-833-PCC-BURROW</strong>.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card grid gap-4">
      <input type="hidden" name="_subject" value="Contact form submission" />
      <input type="hidden" name="form_type" value="contact" />
      <input type="hidden" name="_gotcha" tabIndex="-1" autoComplete="off" />

      <div className="grid sm:grid-cols-2 gap-4">
        <label className="text-xs uppercase tracking-widest text-moss-700/70" htmlFor="ct-name">
          Your name
          <input id="ct-name" name="name" required autoComplete="name"
                 className="mt-1 w-full rounded-full border border-moss-700/20 px-4 py-2 text-base text-moss-900 bg-cream-50 focus:outline-none focus:border-rose-600 normal-case tracking-normal" />
        </label>
        <label className="text-xs uppercase tracking-widest text-moss-700/70" htmlFor="ct-email">
          Email
          <input id="ct-email" type="email" name="email" required autoComplete="email"
                 className="mt-1 w-full rounded-full border border-moss-700/20 px-4 py-2 text-base text-moss-900 bg-cream-50 focus:outline-none focus:border-rose-600 normal-case tracking-normal" />
          <ValidationError prefix="Email" field="email" errors={state.errors} className="text-xs text-rose-600 mt-1 normal-case tracking-normal" />
        </label>
      </div>

      <label className="text-xs uppercase tracking-widest text-moss-700/70" htmlFor="ct-topic">
        Topic
        <select id="ct-topic" name="topic" defaultValue="General"
                className="mt-1 w-full rounded-full border border-moss-700/20 px-4 py-2 text-base text-moss-900 bg-cream-50 focus:outline-none focus:border-rose-600 normal-case tracking-normal">
          <option>General</option>
          <option>Press / media</option>
          <option>Volunteer / field team</option>
          <option>Partnership / corporate matching</option>
          <option>Planned giving</option>
          <option>Regulatory / legal</option>
          <option>Other</option>
        </select>
      </label>

      <label className="text-xs uppercase tracking-widest text-moss-700/70" htmlFor="ct-message">
        Message
        <textarea id="ct-message" name="message" rows={6} required
                  placeholder="Tell us what you saw, what you need, or how you want to help."
                  className="mt-1 w-full rounded-2xl border border-moss-700/20 px-4 py-3 text-base text-moss-900 bg-cream-50 focus:outline-none focus:border-rose-600 normal-case tracking-normal" />
        <ValidationError prefix="Message" field="message" errors={state.errors} className="text-xs text-rose-600 mt-1 normal-case tracking-normal" />
      </label>

      <button type="submit" disabled={state.submitting} className="btn-primary justify-self-start disabled:opacity-60">
        {state.submitting ? 'Sending…' : 'Send message'}
      </button>
      <ValidationError errors={state.errors} className="text-xs text-rose-600" />
    </form>
  );
}
