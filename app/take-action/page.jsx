'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useForm, ValidationError } from '@formspree/react';
import Reveal from '@/components/Reveal';
import { FORM_IDS } from '@/lib/forms';

const TIERS = [
  { amount: 14,  label: 'A Burrow Watcher', body: 'Funds one week of GPS-collar monitoring on a wild burrow colony.' },
  { amount: 36,  label: 'A Field Sponsor',  body: 'Underwrites a full rescue triage kit for one regional team.' },
  { amount: 84,  label: 'A Lifeline',       body: 'Covers the complete intake, triage, and first month of care for one displaced polyester.', featured: true },
  { amount: 240, label: 'A Burrow Builder', body: 'Restores 18 square meters of compacted substrate to viable nesting condition.' },
];

const PETITIONS = [
  {
    id: 'ai-moratorium',
    title: 'AI Infrastructure Moratorium Act',
    target: 500_000,
    current: 318_412,
    body: 'A federal pause on hyperscale data-center permitting within 5km of any documented wild burrow corridor.',
  },
  {
    id: 'mesh-standard',
    title: 'Federal ¼-Inch HVAC Mesh Standard',
    target: 250_000,
    current: 172_840,
    body: 'Require all commercial HVAC intakes in polyester-range counties to install fauna-safe mesh by 2027.',
  },
  {
    id: 'fast-fashion-label',
    title: 'Wild-Sourced Polyester Disclosure Law',
    target: 750_000,
    current: 401_209,
    body: 'Mandate clear labeling on any garment containing fiber from non-certified-ethical polyester farms.',
  },
];

const POSTERS = [
  { title: 'They Were Here First', size: '18 × 24 in', file: '#' },
  { title: 'Displaced. Forgotten. Dying.', size: '11 × 17 in', file: '#' },
  { title: 'Your Sweater Has A Mother.', size: '24 × 36 in', file: '#' },
  { title: 'AI Kills Polyesters.', size: '11 × 17 in', file: '#' },
];

export default function TakeActionPage() {
  return (
    <>
      <section className="container-wide pt-16 md:pt-28 pb-10">
        <Reveal>
          <p className="eyebrow">Take Action</p>
          <h1 className="h-display text-4xl sm:text-5xl md:text-7xl mt-3 text-moss-900 max-w-4xl">
            We cannot remain silent.<br/><span className="text-rose-600 italic">You no longer have to either.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base md:text-lg text-moss-700/90 leading-relaxed">
            Six concrete ways to help. Pick one. Start today. Forward this to one person tonight.
          </p>
        </Reveal>
      </section>

      <DonateSection />
      <AdoptSection />
      <PetitionSection />
      <ProtestSignupSection />
      <PosterSection />
      <SafeCommunitySection />
    </>
  );
}

/* --------------------------------- DONATE --------------------------------- */

function DonateSection() {
  const [custom, setCustom] = useState('');
  const [selected, setSelected] = useState(84);

  return (
    <section id="donate" className="container-wide my-16 md:my-20 scroll-mt-24">
      <Reveal>
        <p className="eyebrow">01 · Donate</p>
        <h2 className="h-section mt-2">Every gift becomes a body warmed, a burrow protected.</h2>
        <p className="mt-3 max-w-2xl text-moss-700/90 leading-relaxed">
          The Polyester Conservation Coalition is funded entirely by individual donors. We accept no
          contributions from fast-fashion brands, data-center operators, or AI infrastructure firms.
        </p>
      </Reveal>

      <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {TIERS.map(t => (
          <button
            key={t.amount}
            onClick={() => { setSelected(t.amount); setCustom(''); }}
            className={`text-left rounded-2xl border p-6 transition shadow-soft ${
              selected === t.amount
                ? 'bg-rose-600 text-cream-50 border-rose-600'
                : 'bg-cream-50 border-moss-700/15 hover:border-rose-400'
            } ${t.featured && selected !== t.amount ? 'ring-2 ring-rose-200' : ''}`}
          >
            <p className="font-display text-3xl">${t.amount}<span className="text-base font-sans opacity-70">/mo</span></p>
            <p className="text-xs uppercase tracking-widest mt-1 opacity-90">{t.label}</p>
            <p className={`mt-3 text-sm leading-relaxed ${selected === t.amount ? 'text-cream-50/90' : 'text-moss-700/90'}`}>{t.body}</p>
            {t.featured && <p className={`mt-3 text-[11px] uppercase tracking-widest ${selected === t.amount ? 'text-cream-100' : 'text-rose-600'}`}>Most chosen</p>}
          </button>
        ))}
      </div>

      <form onSubmit={(e) => e.preventDefault()} className="mt-8 card grid md:grid-cols-[1fr_auto] gap-4 items-end">
        <div>
          <label className="text-xs uppercase tracking-widest text-moss-700/70" htmlFor="custom-amount">Or choose your own amount</label>
          <div className="flex items-center mt-2">
            <span className="text-3xl font-display text-moss-900 pr-2">$</span>
            <input
              id="custom-amount"
              inputMode="decimal"
              placeholder="100"
              value={custom}
              onChange={e => { setCustom(e.target.value.replace(/[^0-9.]/g, '')); setSelected(0); }}
              className="bg-transparent text-3xl font-display text-moss-900 w-full outline-none border-b border-moss-700/30 focus:border-rose-600 pb-1"
            />
          </div>
        </div>
        <button className="btn-primary md:self-end">Continue to secure checkout</button>
      </form>

      <p className="mt-3 text-xs text-moss-700/70">
        Polyester Conservation Coalition · EIN pending · all contributions tax-deductible to the fullest extent allowed by law.
      </p>
    </section>
  );
}

/* ---------------------------------- ADOPT --------------------------------- */

function AdoptSection() {
  const POLYS = [
    { name: 'Mira',  age: '6 mo', loc: 'Cascadia',   img: '/media/baby_polyester.webp' },
    { name: 'Filo',  age: '4 mo', loc: 'Appalachia', img: '/media/baby_polyester-trans.webp' },
    { name: 'Petra', age: '9 mo', loc: 'Gulf Coast', img: '/media/baby_polyester_campaign.webp' },
  ];

  return (
    <section id="adopt" className="bg-moss-700/5 py-16 md:py-20 scroll-mt-24">
      <div className="container-wide">
        <Reveal>
          <p className="eyebrow">02 · Adopt a Polyester</p>
          <h2 className="h-section mt-2">A name. A photo. A monthly letter from your polyester.</h2>
          <p className="mt-3 max-w-2xl text-moss-700/90 leading-relaxed">
            Symbolic adoption supports the lifelong care of a rescued polyester unable to be returned
            to the wild. You will receive a welcome packet, a stitched fur sample, and a quarterly
            field update written from your polyester&rsquo;s perspective by our outreach team.
          </p>
        </Reveal>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {POLYS.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.08}>
              <article className="card overflow-hidden">
                <div className="relative aspect-square -m-6 md:-m-8 mb-6 md:mb-8 bg-cream-100">
                  <Image src={p.img} alt={p.name} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
                </div>
                <p className="tag">In care · sanctuary</p>
                <h3 className="font-display text-2xl mt-3 text-moss-900">{p.name}</h3>
                <p className="text-xs uppercase tracking-widest text-moss-700/70 mt-1">{p.age} · {p.loc}</p>
                <button className="btn-quiet mt-5 w-full">Adopt {p.name} — $14/mo</button>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- PETITIONS ------------------------------- */

function PetitionSection() {
  return (
    <section id="petition" className="container-wide my-16 md:my-20 scroll-mt-24">
      <Reveal>
        <p className="eyebrow">03 · Sign a Petition</p>
        <h2 className="h-section mt-2">Three petitions. Three real bills currently in committee.</h2>
      </Reveal>

      <div className="mt-10 grid md:grid-cols-3 gap-6">
        {PETITIONS.map((p, i) => {
          const pct = Math.min(100, Math.round((p.current / p.target) * 100));
          return (
            <Reveal key={p.id} delay={i * 0.08}>
              <article className="card h-full flex flex-col">
                <h3 className="font-display text-xl text-moss-900">{p.title}</h3>
                <p className="mt-3 text-sm text-moss-700/90 leading-relaxed flex-1">{p.body}</p>
                <div className="mt-5">
                  <div className="flex justify-between text-xs text-moss-700/80">
                    <span>{p.current.toLocaleString()} signed</span>
                    <span>Goal {p.target.toLocaleString()}</span>
                  </div>
                  <div className="mt-2 h-2 rounded-full bg-moss-700/10 overflow-hidden">
                    <motion.div
                      className="h-full bg-rose-600"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: 'easeOut' }}
                    />
                  </div>
                </div>
                <PetitionForm petitionId={p.id} petitionTitle={p.title} />
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

function PetitionForm({ petitionId, petitionTitle }) {
  const [state, handleSubmit] = useForm(FORM_IDS.petition);

  if (state.succeeded) {
    return (
      <p className="mt-4 text-sm text-moss-700 leading-relaxed">
        Thank you. Your name has been added to the <strong>{petitionTitle}</strong> petition record.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-2">
      <input type="hidden" name="_subject" value={`Petition signature: ${petitionTitle}`} />
      <input type="hidden" name="petition_id" value={petitionId} />
      <input type="hidden" name="petition_title" value={petitionTitle} />
      <input type="hidden" name="_gotcha" tabIndex="-1" autoComplete="off" />

      <label htmlFor={`p-name-${petitionId}`} className="sr-only">Full name</label>
      <input
        id={`p-name-${petitionId}`}
        name="name"
        required
        placeholder="Full name"
        autoComplete="name"
        className="rounded-full border border-moss-700/20 px-4 py-2 text-sm bg-cream-50 focus:outline-none focus:border-rose-600"
      />

      <label htmlFor={`p-email-${petitionId}`} className="sr-only">Email</label>
      <input
        id={`p-email-${petitionId}`}
        type="email"
        name="email"
        required
        placeholder="your email"
        autoComplete="email"
        className="rounded-full border border-moss-700/20 px-4 py-2 text-sm bg-cream-50 focus:outline-none focus:border-rose-600"
      />
      <ValidationError prefix="Email" field="email" errors={state.errors} className="text-xs text-rose-600" />

      <button type="submit" disabled={state.submitting} className="btn-primary text-sm py-2 disabled:opacity-60">
        {state.submitting ? 'Signing…' : 'Sign'}
      </button>
      <ValidationError errors={state.errors} className="text-xs text-rose-600" />
    </form>
  );
}

/* -------------------------------- VIGIL/PROTEST ------------------------------- */

function ProtestSignupSection() {
  const [state, handleSubmit] = useForm(FORM_IDS.vigil);

  return (
    <section id="protest" className="bg-rose-600 text-cream-50 py-16 md:py-20">
      <div className="container-wide grid md:grid-cols-2 gap-10 items-start">
        <Reveal>
          <p className="eyebrow text-cream-100/90">04 · March With Us</p>
          <h2 className="font-display text-3xl md:text-5xl mt-2 leading-tight">
            The 2026 Global Polyester Vigil. <br/> May 22. Twenty-one cities.
          </h2>
          <p className="mt-4 text-cream-50/90 max-w-lg leading-relaxed">
            A silent candlelight procession beginning at sunset in every host city. Sign up to lead a
            local chapter, request a vigil kit, or simply be counted as attending.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <form onSubmit={handleSubmit} className="rounded-2xl bg-cream-50 text-moss-900 p-6 md:p-8 shadow-soft">
            {state.succeeded ? (
              <p className="font-display text-2xl">We will see you on May 22nd. Thank you.</p>
            ) : (
              <div className="grid gap-3">
                <input type="hidden" name="_subject" value="Global Polyester Vigil signup" />
                <input type="hidden" name="form_type" value="vigil_signup" />
                <input type="hidden" name="_gotcha" tabIndex="-1" autoComplete="off" />

                <label className="text-xs uppercase tracking-widest text-moss-700/70" htmlFor="v-name">
                  Full name
                  <input id="v-name" name="name" required autoComplete="name" className="mt-1 w-full rounded-full border border-moss-700/20 px-4 py-2 text-base text-moss-900 focus:outline-none focus:border-rose-600" />
                </label>

                <label className="text-xs uppercase tracking-widest text-moss-700/70" htmlFor="v-email">
                  Email
                  <input id="v-email" type="email" name="email" required autoComplete="email" className="mt-1 w-full rounded-full border border-moss-700/20 px-4 py-2 text-base text-moss-900 focus:outline-none focus:border-rose-600" />
                  <ValidationError prefix="Email" field="email" errors={state.errors} className="text-xs text-rose-600 mt-1 normal-case tracking-normal" />
                </label>

                <label className="text-xs uppercase tracking-widest text-moss-700/70" htmlFor="v-city">
                  City
                  <input id="v-city" name="city" required className="mt-1 w-full rounded-full border border-moss-700/20 px-4 py-2 text-base text-moss-900 focus:outline-none focus:border-rose-600" />
                </label>

                <label className="text-xs uppercase tracking-widest text-moss-700/70" htmlFor="v-role">
                  Role
                  <select id="v-role" name="role" className="mt-1 w-full rounded-full border border-moss-700/20 px-4 py-2 text-base text-moss-900 focus:outline-none focus:border-rose-600 bg-cream-50">
                    <option>Attending</option>
                    <option>Local chapter lead</option>
                    <option>Requesting vigil kit</option>
                  </select>
                </label>

                <button type="submit" disabled={state.submitting} className="btn-primary mt-2 disabled:opacity-60">
                  {state.submitting ? 'Submitting…' : 'Count me in'}
                </button>
                <ValidationError errors={state.errors} className="text-xs text-rose-600" />
              </div>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}

/* --------------------------------- POSTERS -------------------------------- */

function PosterSection() {
  return (
    <section id="posters" className="container-wide my-16 md:my-20 scroll-mt-24">
      <Reveal>
        <p className="eyebrow">05 · Awareness Materials</p>
        <h2 className="h-section mt-2">Print. Tape. Post. Repeat.</h2>
        <p className="mt-3 max-w-2xl text-moss-700/90 leading-relaxed">
          Free downloadable posters for community boards, dorm rooms, coffee shops, anywhere a
          person might pause for forty seconds and learn something.
        </p>
      </Reveal>
      <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {POSTERS.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.07}>
            <article className="card">
              <div className="aspect-[3/4] rounded-xl bg-gradient-to-br from-rose-200 via-cream-100 to-moss-400/30 grid place-items-center text-center p-6">
                <div>
                  <p className="font-display text-2xl text-moss-900 leading-tight">{p.title}</p>
                  <p className="mt-3 text-[10px] uppercase tracking-widest text-moss-700/70">PCC · {p.size}</p>
                </div>
              </div>
              <Link href={p.file} className="btn-ghost mt-4 w-full text-sm">Download PDF</Link>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ----------------------- SAFE COMMUNITY CERTIFICATION --------------------- */

function SafeCommunitySection() {
  const [state, handleSubmit] = useForm(FORM_IDS.certification);
  const [open, setOpen] = useState(false);

  return (
    <section id="safe-community" className="container-wide my-16 md:my-20 scroll-mt-24">
      <Reveal>
        <div className="card md:p-12">
          <p className="eyebrow">06 · Polyester-Safe Communities</p>
          <h2 className="h-section mt-2">Lead a certification effort where you live.</h2>
          <p className="mt-4 text-moss-700/90 leading-relaxed max-w-3xl">
            Polyester-Safe Community certification recognizes municipalities that adopt protective
            zoning, ¼-inch fauna-safe HVAC mesh, fast-fashion retailer disclosure, and a moratorium
            on hyperscale data-center construction. 41 communities are currently certified.
            We would like yours to be next.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button onClick={() => setOpen(o => !o)} className="btn-quiet">
              {open ? 'Hide the intake form' : 'Request the certification packet'}
            </button>
            <Link href="/safe-communities/" className="btn-ghost">View the 41 certified communities</Link>
          </div>

          {open && (
            <div className="mt-8 border-t border-moss-700/10 pt-8 max-w-2xl">
              {state.succeeded ? (
                <p className="font-display text-2xl text-moss-900">
                  Packet on the way. A regional coordinator will be in touch within five business days.
                </p>
              ) : (
                <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
                  <input type="hidden" name="_subject" value="Polyester-Safe Community packet request" />
                  <input type="hidden" name="form_type" value="certification_packet" />
                  <input type="hidden" name="_gotcha" tabIndex="-1" autoComplete="off" />

                  <Field id="c-name" label="Contact name" name="name" required autoComplete="name" />
                  <Field id="c-email" type="email" label="Email" name="email" required autoComplete="email" errors={state.errors} />
                  <Field id="c-municipality" label="Municipality" name="municipality" required />
                  <Field id="c-population" type="number" label="Approx. population" name="population" />
                  <Field id="c-role" label="Your role" name="role" placeholder="Resident, council member, planner…" />
                  <Field id="c-zoning" label="Current zoning posture" name="zoning" placeholder="Permissive, restrictive, unknown" />

                  <label className="sm:col-span-2 text-xs uppercase tracking-widest text-moss-700/70">
                    Notes
                    <textarea
                      name="notes"
                      rows={4}
                      placeholder="Anything else our regional coordinator should know…"
                      className="mt-1 w-full rounded-2xl border border-moss-700/20 px-4 py-3 text-base text-moss-900 bg-cream-50 focus:outline-none focus:border-rose-600"
                    />
                  </label>

                  <button type="submit" disabled={state.submitting} className="btn-primary sm:col-span-2 sm:justify-self-start disabled:opacity-60">
                    {state.submitting ? 'Sending…' : 'Send packet request'}
                  </button>
                  <ValidationError errors={state.errors} className="text-xs text-rose-600 sm:col-span-2" />
                </form>
              )}
            </div>
          )}
        </div>
      </Reveal>
    </section>
  );
}

function Field({ id, label, name, type = 'text', required, placeholder, autoComplete, errors }) {
  return (
    <label htmlFor={id} className="text-xs uppercase tracking-widest text-moss-700/70">
      {label}{required && <span aria-hidden className="text-rose-600"> *</span>}
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="mt-1 w-full rounded-full border border-moss-700/20 px-4 py-2 text-base text-moss-900 bg-cream-50 focus:outline-none focus:border-rose-600 normal-case tracking-normal"
      />
      {errors && <ValidationError prefix={label} field={name} errors={errors} className="text-xs text-rose-600 mt-1 normal-case tracking-normal" />}
    </label>
  );
}
