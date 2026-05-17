import Image from 'next/image';
import Reveal from '@/components/Reveal';
import DonationBanner from '@/components/DonationBanner';
import ReportSightingForm from '@/components/ReportSightingForm';

export const metadata = {
  title: 'Rescue Stories',
  description:
    'Field stories from PCC rescue teams: tiny polyesters pulled from retention ponds, HVAC tunnels, server-farm clearances, and shopping-plaza demolitions. Report a sighting.',
};

const STORIES = [
  {
    title: 'Tiny polyester found near retention pond outside Phoenix.',
    location: 'Maricopa County, AZ',
    date: 'March 2026',
    image: '/media/baby_polyester.webp',
    summary: `She weighed 31 grams. A maintenance contractor heard chirping under the spillway grating
              and, against company protocol, stopped his mower. Volunteers reached the site within two
              hours. She is now in long-term rehabilitation in our Sedona burrow-restoration facility.
              Her littermates were not recovered.`,
  },
  {
    title: 'Rescued from an HVAC exhaust tunnel in a Newark warehouse.',
    location: 'Essex County, NJ',
    date: 'January 2026',
    image: '/media/baby_polyester_campaign.webp',
    summary: `He had been pulled into the intake by negative pressure during a routine fan calibration.
              Severe stress-induced fiber loss across the dorsal coat. Recovering on a supplemental
              microfiber diet. We are now lobbying for ¼-inch mesh as the federal HVAC intake standard
              in all polyester-range warehouses.`,
  },
  {
    title: 'Displaced after server farm installation outside Hillsboro.',
    location: 'Washington County, OR',
    date: 'November 2025',
    image: '/media/poyester_prey.webp',
    summary: `A colony of 47 individuals. Site clearance began at 5:14 AM on a Sunday — without the
              required 30-day mitigation notice. Of the 47, our team has recovered 18. Eight of those
              required emergency care. The remainder are presumed lost to a coyote pack drawn in by the
              disturbance.`,
  },
  {
    title: 'Abandoned microfiber infant recovered near shopping plaza.',
    location: 'Cobb County, GA',
    date: 'October 2025',
    image: '/media/baby_polyester-trans.webp',
    summary: `Found in a planter outside a recently-opened activewear retailer. Likely orphaned during
              parking-lot expansion. Her mother was never located. She has since been pair-bonded with
              another tuftling at our Atlanta intake center and is gaining weight.`,
  },
  {
    title: 'Eleven adults extracted from a flooded burrow system, Tennessee.',
    location: 'Sevier County, TN',
    date: 'September 2025',
    image: '/media/polyester_DC_damage.webp',
    summary: `A new bypass road redirected stormwater into a long-established burrow complex. Our
              field team excavated thirty-six hours, in shifts, before the chirping stopped. Eleven
              survived. We do not know what to do with this number.`,
  },
  {
    title: 'A bonded pair rescued from a fast-fashion warehouse fire.',
    location: 'San Bernardino County, CA',
    date: 'July 2025',
    image: '/media/polyester_sign.webp',
    summary: `They had nested behind a pallet of unsold synthetic blouses. Firefighters bagged and
              cooled them on the scene. They are now mascots, of a kind, at our West Coast field
              office. They will not be returned to the wild. There is no wild left for them to
              return to in their range.`,
  },
];

const ROLLUP = [
  { v: '1,278',  label: 'Active rescue cases this week' },
  { v: '47,431', label: 'Total individuals rescued since 2014' },
  { v: '4.2M',   label: 'Cumulative documented displacement events' },
  { v: '71%',    label: '90-day survival rate for triaged intakes (2025)' },
];

export default function RescueStoriesPage() {
  return (
    <>
      <section className="container-wide pt-20 md:pt-28 pb-10">
        <Reveal>
          <p className="eyebrow">Rescue Stories</p>
          <h1 className="h-display text-5xl md:text-7xl mt-3 text-moss-900 max-w-4xl">
            Displaced. Forgotten.<br/><span className="text-rose-600 italic">Not forgotten by us.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-moss-700/90 leading-relaxed">
            Every story below is real to the polyester at its center. Every story below is also,
            quietly, the story of someone who decided to stop and listen.
          </p>
        </Reveal>
      </section>

      <section aria-label="Rescue rollup" className="container-wide my-10">
        <div className="card grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-6">
          {ROLLUP.map(s => (
            <div key={s.label}>
              <p className="stat-num">{s.v}</p>
              <p className="stat-label">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-wide my-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {STORIES.map(s => (
          <Reveal key={s.title}>
            <article className="card h-full flex flex-col">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-cream-100 -m-6 md:-m-8 mb-5 md:mb-6">
                <Image src={s.image} alt={s.title} fill sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" className="object-cover" />
              </div>
              <p className="text-[11px] uppercase tracking-widest text-rose-600">{s.date} · {s.location}</p>
              <h3 className="font-display text-xl text-moss-900 mt-2 leading-snug">{s.title}</h3>
              <p className="mt-3 text-sm text-moss-700/90 leading-relaxed">{s.summary}</p>
            </article>
          </Reveal>
        ))}
      </section>

      <section className="container-prose my-24 text-center">
        <Reveal>
          <blockquote className="pull-quote">
            &ldquo;You do not forget the weight of one in your palm. It is much lighter than you expect.
            And then much heavier, after.&rdquo;
          </blockquote>
          <p className="mt-4 text-sm text-moss-700/70">— Field journal, PCC Atlanta Intake</p>
        </Reveal>
      </section>

      <ReportSightingForm />

      <DonationBanner
        eyebrow="One donation. One rescue. One survivor."
        title="$84 funds the complete intake, triage, and first month of care for a displaced polyester."
      />
    </>
  );
}
