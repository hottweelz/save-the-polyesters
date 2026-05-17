'use client';
import { useForm, ValidationError } from '@formspree/react';
import { FORM_IDS } from '@/lib/forms';

export default function NewsletterSignup({
  variant = 'footer',
  title = 'Field dispatches, monthly.',
  body  = 'Burrow census updates, threatened-corridor alerts, and one rescue story you will not forget. No share-of-voice campaigns. Unsubscribe in one click.',
}) {
  const [state, handleSubmit] = useForm(FORM_IDS.newsletter);
  const dark = variant === 'footer';

  if (state.succeeded) {
    return (
      <p className={`font-display text-lg ${dark ? 'text-cream-50' : 'text-moss-900'}`}>
        Welcome to the field list. The next dispatch goes out the first Tuesday of the month.
      </p>
    );
  }

  return (
    <div className="grid gap-3">
      <div>
        <p className={`text-xs uppercase tracking-widest ${dark ? 'text-rose-200' : 'text-rose-600'}`}>The Field Dispatch</p>
        <p className={`font-display text-xl md:text-2xl mt-1 leading-snug ${dark ? 'text-cream-50' : 'text-moss-900'}`}>{title}</p>
        <p className={`text-sm mt-2 leading-relaxed ${dark ? 'text-cream-100/80' : 'text-moss-700/90'}`}>{body}</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <input type="hidden" name="_subject" value="Field Dispatch subscription" />
        <input type="hidden" name="form_type" value="newsletter" />
        <input type="hidden" name="_gotcha" tabIndex="-1" autoComplete="off" />

        <label htmlFor={`nl-email-${variant}`} className="sr-only">Email address</label>
        <input
          id={`nl-email-${variant}`}
          type="email"
          name="email"
          required
          placeholder="your email"
          autoComplete="email"
          className={`flex-1 rounded-full px-4 py-2 text-sm focus:outline-none ${
            dark
              ? 'bg-cream-50 text-moss-900 border border-cream-50/20 focus:border-rose-400'
              : 'bg-cream-50 text-moss-900 border border-moss-700/20 focus:border-rose-600'
          }`}
        />

        <button
          type="submit"
          disabled={state.submitting}
          className={`btn text-sm py-2 px-5 disabled:opacity-60 ${
            dark
              ? 'bg-rose-600 text-cream-50 hover:bg-rose-700'
              : 'btn-primary'
          }`}
        >
          {state.submitting ? 'Subscribing…' : 'Subscribe'}
        </button>
      </form>
      <ValidationError prefix="Email" field="email" errors={state.errors} className={`text-xs ${dark ? 'text-rose-200' : 'text-rose-600'}`} />
      <p className={`text-[11px] ${dark ? 'text-cream-100/55' : 'text-moss-700/60'}`}>
        Average dispatch: ~600 words. We will never sell your address.
      </p>
    </div>
  );
}
