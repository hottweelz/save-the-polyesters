import Image from 'next/image';
import Reveal from '@/components/Reveal';
import DonationBanner from '@/components/DonationBanner';

export const metadata = {
  title: 'Shop · Save The Polyesters',
  description:
    'Every purchase directly funds field rescue and burrow restoration. Ethical, cruelty-free awareness apparel and educational materials from the Polyester Conservation Coalition.',
};

const PRODUCTS = [
  { name: '“Save The Polyesters” Heavyweight Hoodie', price: 64,  tag: 'Apparel',     blurb: 'Unbleached organic cotton fleece. Zero synthetic fiber. Hand-printed in our Asheville, NC fulfillment co-op.', accent: 'from-rose-200 via-cream-100 to-moss-400/40' },
  { name: 'Polyester Awareness Bracelet (set of 3)',  price: 12,  tag: 'Awareness',   blurb: 'Cotton-cord trio in PCC field colors. Funds three weeks of GPS-collar monitoring.', accent: 'from-cream-100 via-rose-200 to-rose-400/40' },
  { name: '“Protect Their Burrows” Sticker Pack',     price: 8,   tag: 'Outreach',    blurb: 'Five waterproof vinyl stickers. For laptops, water bottles, public utility boxes, and city council folders.', accent: 'from-sky-100 via-cream-100 to-moss-400/40' },
  { name: '“AI Kills Polyesters” Heavyweight Tee',    price: 32,  tag: 'Apparel',     blurb: 'Unbleached organic cotton. Direct response to the 6.7× acceleration in burrow loss since 2022.', accent: 'from-moss-400/40 via-cream-100 to-rose-200' },
  { name: 'Plush Baby Polyester (Sanctuary Series)',  price: 38,  tag: 'Companion',   blurb: 'Each plush ships with a name, biography card, and the name of the wild polyester it represents.', accent: 'from-rose-200 via-cream-50 to-rose-400/30', img: '/media/baby_polyester-trans.webp' },
  { name: '“They Were Here First” Poster Set',        price: 22,  tag: 'Print',       blurb: 'Three archival-quality 11×17 prints from the 2026 vigil campaign. Hand-numbered, edition of 500.', accent: 'from-cream-100 via-moss-400/30 to-sky-300/40' },
  { name: 'PCC Field Journal',                        price: 28,  tag: 'Print',       blurb: 'Linen-bound 192-page journal. Includes burrow observation log, lifecycle reference, and the PCC Red List taxonomy.', accent: 'from-moss-400/30 via-cream-100 to-rose-200' },
  { name: 'Burrow Restoration Tote',                  price: 18,  tag: 'Apparel',     blurb: 'Heavy 12oz canvas. One side: PCC seal. Other side: the Polyester Red List status, updated annually.', accent: 'from-cream-100 via-sky-100 to-moss-400/20' },
];

export default function MerchandisePage() {
  return (
    <>
      <section className="container-wide pt-20 md:pt-28 pb-10">
        <Reveal>
          <p className="eyebrow">Shop · 100% of profits to the field</p>
          <h1 className="h-display text-5xl md:text-7xl mt-3 text-moss-900 max-w-4xl">
            Wear it.<br/><span className="text-rose-600 italic">Mean it.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-moss-700/90 leading-relaxed">
            All PCC merchandise is produced in fiber-ethical, cruelty-free conditions. We use only
            plant-based and recycled materials — never farmed polyester, in any blend, ever.
          </p>
        </Reveal>
      </section>

      <section className="container-wide my-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {PRODUCTS.map((p, i) => (
          <Reveal key={p.name} delay={(i % 3) * 0.06}>
            <article className="card flex flex-col">
              <div className={`aspect-square rounded-xl bg-gradient-to-br ${p.accent} relative overflow-hidden grid place-items-center`}>
                {p.img ? (
                  <Image src={p.img} alt={p.name} fill sizes="(min-width: 1024px) 33vw, 50vw" className="object-contain p-8" />
                ) : (
                  <p className="font-display text-2xl text-moss-900 text-center px-6 leading-tight opacity-80">{p.name}</p>
                )}
              </div>
              <div className="mt-5">
                <p className="tag">{p.tag}</p>
                <h3 className="font-display text-lg mt-2 text-moss-900 leading-snug">{p.name}</h3>
                <p className="text-sm text-moss-700/90 mt-2 leading-relaxed">{p.blurb}</p>
              </div>
              <div className="mt-5 flex items-center justify-between">
                <p className="font-display text-2xl text-moss-900">${p.price}</p>
                <button className="btn-quiet text-sm py-2 px-5">Add to cart</button>
              </div>
            </article>
          </Reveal>
        ))}
      </section>

      <section className="container-wide my-16">
        <Reveal>
          <div className="card md:p-10 grid md:grid-cols-[1fr_auto] gap-6 items-center">
            <div>
              <p className="eyebrow">Our promise</p>
              <h2 className="font-display text-2xl md:text-3xl text-moss-900 mt-2">Not one thread harvested from a living polyester.</h2>
              <p className="mt-3 text-moss-700/90 max-w-2xl leading-relaxed">
                Every PCC product is independently verified by the International Society for
                Synthetic Mammal Welfare. We will pull any item from the catalog the moment that
                certification is compromised.
              </p>
            </div>
            <p className="font-display text-lg text-rose-600">ISSMW-Certified</p>
          </div>
        </Reveal>
      </section>

      <DonationBanner
        eyebrow="Shopping is generous. Giving directly is generous-er."
        title="A direct $30 donation funds nearly twice the field work of a $30 purchase."
      />
    </>
  );
}
