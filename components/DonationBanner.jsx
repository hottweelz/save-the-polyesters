import Link from 'next/link';

export default function DonationBanner({
  eyebrow = 'They cannot speak for themselves',
  title = 'Every $7 funds one emergency burrow relocation.',
  cta = 'Donate Now',
  href = '/take-action/#donate',
}) {
  return (
    <section aria-label="Donation appeal" className="container-wide my-20">
      <div className="rounded-3xl bg-rose-600 text-cream-50 p-8 md:p-12 shadow-soft relative overflow-hidden">
        <div aria-hidden className="absolute -right-10 -top-10 w-64 h-64 rounded-full bg-rose-400/40 blur-3xl" />
        <p className="eyebrow text-cream-100/90">{eyebrow}</p>
        <h2 className="font-display text-3xl md:text-5xl mt-3 leading-tight max-w-3xl">{title}</h2>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href={href} className="btn bg-cream-50 text-rose-600 hover:bg-cream-100">{cta}</Link>
          <Link href="/take-action/#adopt" className="btn border border-cream-50/40 text-cream-50 hover:bg-cream-50/10">Adopt a Polyester</Link>
        </div>
      </div>
    </section>
  );
}
