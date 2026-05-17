'use client';
import { useForm, ValidationError } from '@formspree/react';
import { FORM_IDS } from '@/lib/forms';

export default function MemorialSubmissionForm() {
  const [state, handleSubmit] = useForm(FORM_IDS.memorial);

  if (state.succeeded) {
    return (
      <div className="card">
        <p className="font-display text-2xl text-moss-900">
          Received. Our memorial keeper will read your submission within seven days and write back
          personally before any name is added to the Wall.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card grid gap-4">
      <input type="hidden" name="_subject" value="Memorial submission" />
      <input type="hidden" name="form_type" value="memorial_submission" />
      <input type="hidden" name="_gotcha" tabIndex="-1" autoComplete="off" />

      <div className="grid sm:grid-cols-2 gap-4">
        <label className="text-xs uppercase tracking-widest text-moss-700/70" htmlFor="m-name">
          Your name
          <input id="m-name" name="submitter_name" required autoComplete="name"
                 className="mt-1 w-full rounded-full border border-moss-700/20 px-4 py-2 text-base text-moss-900 bg-cream-50 focus:outline-none focus:border-rose-600 normal-case tracking-normal" />
        </label>
        <label className="text-xs uppercase tracking-widest text-moss-700/70" htmlFor="m-email">
          Your email
          <input id="m-email" type="email" name="email" required autoComplete="email"
                 className="mt-1 w-full rounded-full border border-moss-700/20 px-4 py-2 text-base text-moss-900 bg-cream-50 focus:outline-none focus:border-rose-600 normal-case tracking-normal" />
          <ValidationError prefix="Email" field="email" errors={state.errors} className="text-xs text-rose-600 mt-1 normal-case tracking-normal" />
        </label>
      </div>

      <label className="text-xs uppercase tracking-widest text-moss-700/70" htmlFor="m-honored">
        Name to be honored
        <input id="m-honored" name="honored_name" required
               placeholder="A name, a colony identifier, or a description"
               className="mt-1 w-full rounded-full border border-moss-700/20 px-4 py-2 text-base text-moss-900 bg-cream-50 focus:outline-none focus:border-rose-600 normal-case tracking-normal" />
      </label>

      <label className="text-xs uppercase tracking-widest text-moss-700/70" htmlFor="m-kind">
        Type
        <select id="m-kind" name="kind" defaultValue="Wild polyester"
                className="mt-1 w-full rounded-full border border-moss-700/20 px-4 py-2 text-base text-moss-900 bg-cream-50 focus:outline-none focus:border-rose-600 normal-case tracking-normal">
          <option>Wild polyester</option>
          <option>Farmed polyester</option>
          <option>Field volunteer or staff member</option>
          <option>Local advocate</option>
          <option>Other</option>
        </select>
      </label>

      <label className="text-xs uppercase tracking-widest text-moss-700/70" htmlFor="m-when">
        Date or approximate year
        <input id="m-when" name="when" placeholder="e.g. October 2024, or 'unknown'"
               className="mt-1 w-full rounded-full border border-moss-700/20 px-4 py-2 text-base text-moss-900 bg-cream-50 focus:outline-none focus:border-rose-600 normal-case tracking-normal" />
      </label>

      <label className="text-xs uppercase tracking-widest text-moss-700/70" htmlFor="m-relation">
        Relationship to the one being honored
        <input id="m-relation" name="relationship"
               placeholder="e.g. rescuer, family member, witness, friend"
               className="mt-1 w-full rounded-full border border-moss-700/20 px-4 py-2 text-base text-moss-900 bg-cream-50 focus:outline-none focus:border-rose-600 normal-case tracking-normal" />
      </label>

      <label className="text-xs uppercase tracking-widest text-moss-700/70" htmlFor="m-note">
        A short note (optional)
        <textarea id="m-note" name="note" rows={5}
                  placeholder="Anything you would like the Coalition to know. We read every submission personally."
                  className="mt-1 w-full rounded-2xl border border-moss-700/20 px-4 py-3 text-base text-moss-900 bg-cream-50 focus:outline-none focus:border-rose-600 normal-case tracking-normal" />
      </label>

      <button type="submit" disabled={state.submitting} className="btn-primary justify-self-start disabled:opacity-60">
        {state.submitting ? 'Sending…' : 'Submit for inclusion'}
      </button>
      <ValidationError errors={state.errors} className="text-xs text-rose-600" />
      <p className="text-[11px] text-moss-700/60 leading-relaxed">
        Our memorial keeper reviews submissions within seven days and writes back personally before
        any name is added. The Wall is not algorithmic. It is hand-curated.
      </p>
    </form>
  );
}
