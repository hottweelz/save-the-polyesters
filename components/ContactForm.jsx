'use client';
import { useForm, ValidationError } from '@formspree/react';
import { FORM_IDS } from '@/lib/forms';

export default function ContactForm() {
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
