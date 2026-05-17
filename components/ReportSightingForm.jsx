'use client';
import { useForm, ValidationError } from '@formspree/react';
import Reveal from '@/components/Reveal';
import { FORM_IDS } from '@/lib/forms';

export default function ReportSightingForm() {
  const [state, handleSubmit] = useForm(FORM_IDS.sighting);

  return (
    <section id="report" className="bg-moss-700/5 py-16 md:py-20 scroll-mt-24">
      <div className="container-wide grid md:grid-cols-[1fr_1.1fr] gap-10 items-start">
        <Reveal>
          <p className="eyebrow">Report a sighting</p>
          <h2 className="h-section mt-2">Saw something? Tell us before you tell anyone else.</h2>
          <p className="mt-4 text-moss-700/90 leading-relaxed">
            Every confirmed rescue starts with one observation by a person who was not looking for
            it. If you have seen a displaced polyester, an active burrow at risk, or industrial
            activity near a known habitat corridor, file a report below. A regional coordinator
            will review within four hours, around the clock.
          </p>
          <p className="mt-4 text-sm text-moss-700/80">
            <strong>For active emergencies in progress, call the field hotline:</strong>{' '}
            <span className="font-display text-moss-900">1-833-PCC-BURROW</span>
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          {state.succeeded ? (
            <div className="card">
              <p className="font-display text-2xl text-moss-900">
                Received. A regional coordinator has your report and will follow up within four hours.
              </p>
              <p className="mt-3 text-sm text-moss-700/80">
                If this is escalating right now, please also call <strong>1-833-PCC-BURROW</strong>.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="card grid gap-4">
              <input type="hidden" name="_subject" value="Sighting report" />
              <input type="hidden" name="form_type" value="sighting_report" />
              <input type="hidden" name="_gotcha" tabIndex="-1" autoComplete="off" />

              <div className="grid sm:grid-cols-2 gap-4">
                <label className="text-xs uppercase tracking-widest text-moss-700/70" htmlFor="rs-name">
                  Your name
                  <input id="rs-name" name="name" required autoComplete="name"
                         className="mt-1 w-full rounded-full border border-moss-700/20 px-4 py-2 text-base text-moss-900 bg-cream-50 focus:outline-none focus:border-rose-600 normal-case tracking-normal" />
                </label>
                <label className="text-xs uppercase tracking-widest text-moss-700/70" htmlFor="rs-email">
                  Email or phone
                  <input id="rs-email" name="contact" required autoComplete="email"
                         className="mt-1 w-full rounded-full border border-moss-700/20 px-4 py-2 text-base text-moss-900 bg-cream-50 focus:outline-none focus:border-rose-600 normal-case tracking-normal" />
                </label>
              </div>

              <label className="text-xs uppercase tracking-widest text-moss-700/70" htmlFor="rs-loc">
                Nearest cross-street, address, or coordinates
                <input id="rs-loc" name="location" required
                       className="mt-1 w-full rounded-full border border-moss-700/20 px-4 py-2 text-base text-moss-900 bg-cream-50 focus:outline-none focus:border-rose-600 normal-case tracking-normal" />
              </label>

              <label className="text-xs uppercase tracking-widest text-moss-700/70" htmlFor="rs-when">
                When did you see it?
                <input id="rs-when" name="when" required placeholder="e.g. About an hour ago / yesterday morning"
                       className="mt-1 w-full rounded-full border border-moss-700/20 px-4 py-2 text-base text-moss-900 bg-cream-50 focus:outline-none focus:border-rose-600 normal-case tracking-normal" />
              </label>

              <label className="text-xs uppercase tracking-widest text-moss-700/70" htmlFor="rs-type">
                What did you observe?
                <select id="rs-type" name="observation" defaultValue="Displaced individual"
                        className="mt-1 w-full rounded-full border border-moss-700/20 px-4 py-2 text-base text-moss-900 bg-cream-50 focus:outline-none focus:border-rose-600 normal-case tracking-normal">
                  <option>Displaced individual</option>
                  <option>Possibly injured polyester</option>
                  <option>Active burrow near construction</option>
                  <option>Suspected industrial farm site</option>
                  <option>Unusual chirping at high frequency</option>
                  <option>Other</option>
                </select>
              </label>

              <label className="text-xs uppercase tracking-widest text-moss-700/70" htmlFor="rs-notes">
                Anything else we should know
                <textarea id="rs-notes" name="notes" rows={4}
                          placeholder="Number of individuals, condition, surroundings, construction equipment on site, time-sensitive details…"
                          className="mt-1 w-full rounded-2xl border border-moss-700/20 px-4 py-3 text-base text-moss-900 bg-cream-50 focus:outline-none focus:border-rose-600 normal-case tracking-normal" />
              </label>

              <button type="submit" disabled={state.submitting} className="btn-primary justify-self-start disabled:opacity-60">
                {state.submitting ? 'Submitting…' : 'Submit report'}
              </button>
              <ValidationError errors={state.errors} className="text-xs text-rose-600" />
              <p className="text-[11px] text-moss-700/60">
                Reports are reviewed by a regional coordinator within four hours, including overnight.
              </p>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
