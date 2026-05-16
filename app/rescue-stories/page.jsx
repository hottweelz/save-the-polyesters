import Image from 'next/image';
import Reveal from '@/components/Reveal';
import StoryCard from '@/components/StoryCard';
import DonationBanner from '@/components/DonationBanner';

export const metadata = {
  title: 'Rescue Stories',
  description:
    'Field stories from PCC rescue teams: tiny polyesters pulled from retention ponds, HVAC tunnels, server-farm clearances, and shopping-plaza demolitions.',
};

const STORIES = [
  {
    title: 'Tiny polyester found near retention pond outside Phoenix.',
    location: 'Maricopa County, AZ',
    image: '/media/baby_polyester.webp',
    summary: `She weighed 31 grams. A maintenance contractor heard chirping under the spillway grating
              and, against company protocol, stopped his mower. Volunteers reached the site within two
              hours. She is now in long-term rehabilitation in our Sedona burrow-restoration facility.
              Her littermates were not recovered.`,
  },
  {
    title: 'Rescued from an HVAC exhaust tunnel in a Newark warehouse.',
    location: 'Essex County, NJ',
    image: '/media/baby_polyester_campaign.webp',
    summary: `He had been pulled into the intake by negative pressure during a routine fan calibration.
              Severe stress-induced fiber loss across the dorsal coat. Recovering on a supplemental
              microfiber diet. We are now lobbying for ¼-inch mesh as the federal HVAC intake standard
              in all polyester-range warehouses.`,
  },
  {
    title: 'Displaced after server farm installation outside Hillsboro.',
    location: 'Washington County, OR',
    image: '/media/poyester_prey.webp',
    summary: `A colony of 47 individuals. Site clearance began at 5:14 AM on a Sunday — without the
              required 30-day mitigation notice. Of the 47, our team has recovered 18. Eight of those
              required emergency care. The remainder are presumed lost to a coyote pack drawn in by the
              disturbance.`,
  },
  {
    title: 'Abandoned microfiber infant recovered near shopping plaza.',
    location: 'Cobb County, GA',
    image: '/media/baby_polyester-trans.webp',
    summary: `Found in a planter outside a recently-opened activewear retailer. Likely orphaned during
              parking-lot expansion. Her mother was never located. She has since been pair-bonded with
              another tuftling at our Atlanta intake center and is gaining weight.`,
  },
  {
    title: 'Eleven adults extracted from a flooded burrow system, Tennessee.',
    location: 'Sevier County, TN',
    image: '/media/polyester_DC_damage.webp',
    summary: `A new bypass road redirected stormwater into a long-established burrow complex. Our
              field team excavated thirty-six hours, in shifts, before the chirping stopped. Eleven
              survived. We do not know what to do with this number.`,
  },
  {
    title: 'A bonded pair rescued from a fast-fashion warehouse fire.',
    location: 'San Bernardino County, CA',
    image: '/media/polyester_sign.webp',
    summary: `They had nested behind a pallet of unsold synthetic blouses. Firefighters bagged and
              cooled them on the scene. They are now mascots, of a kind, at our West Coast field
              office. They will not be returned to the wild. There is no wild left for them to
              return to in their range.`,
  },
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

      <section className="container-wide my-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {STORIES.map(s => <StoryCard key={s.title} {...s} />)}
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

      <DonationBanner
        eyebrow="One donation. One rescue. One survivor."
        title="$84 funds the complete intake, triage, and first month of care for a displaced polyester."
      />
    </>
  );
}
