import Reveal from '@/components/Reveal';
import DonationBanner from '@/components/DonationBanner';

export const metadata = {
  title: 'The Field Team',
  description:
    'Researchers, rescuers, veterinarians, and counsel of the Polyester Conservation Coalition. Forty-eight founding members in 2014; two hundred ninety-one PCC employees today.',
};

const LEADERSHIP = [
  {
    name: 'Dr. Hadley Renn',
    role: 'PCC Regional Director · Cascadia',
    bio: `Twenty-three years in synthetic-fauna veterinary medicine. Authored the field protocol for
          juvenile heat-naked triage adopted across all six PCC regional offices. Refuses to be quoted
          in any article that frames the species as &ldquo;made-up.&rdquo;`,
  },
  {
    name: 'Dr. Eliana Vossler',
    role: 'Founding Scientist · Taxonomy Lead',
    bio: `Published the first formal description of P. domestica in 1991 from her postdoc at Cornell.
          One of the original 1986 Stony Brook intervention group. Signed the 2014 PCC charter at
          the East Quogue memorial. Still does her own field work, on her knees, four days a week.`,
  },
  {
    name: 'Faruk Tomczak',
    role: 'Director of Research · Industrial Ecology',
    bio: `Co-author of the 2025 paper correlating GPU build-out with regional polyester collapse.
          Prior to PCC, designed grid-impact models for two of the firms whose data centers his
          current work opposes. He says he sleeps fine.`,
  },
  {
    name: 'Imani Olaide',
    role: 'Communications Lead · Press',
    bio: `Former NPR producer (Morning Edition, 2014-2021). Joined PCC after covering the Hillsboro
          server-farm clearance for a podcast that was never aired. Handles every press inquiry
          personally and replies within 24 hours, including weekends.`,
  },
  {
    name: 'Priya Ahuja',
    role: 'Urban Ecology Lead · Boston field office',
    bio: `Designed the Boston-to-Portland burrow-temperature monitoring network now cited in
          municipal climate plans across nine states. Holds a joint appointment with Tufts. Will
          out-walk you on any survey, regardless of terrain.`,
  },
  {
    name: 'Tomás Marin',
    role: 'Welfare Director · Industrial farm investigation',
    bio: `Led the 2023 multi-state investigation into chronic compulsive shedding in commercial
          polyester farms. Source for the &ldquo;Soft Industry&rdquo; report. Has testified before
          three state legislatures and one federal subcommittee.`,
  },
  {
    name: 'Yara Bao',
    role: 'Data & Modeling',
    bio: `Built the projection model that demonstrated genetic-diversity collapse will outpace
          habitat loss by 2031. Came to PCC from the U.S. Census Bureau. Maintains the population
          chart that anchors our public reporting.`,
  },
  {
    name: 'Diego Vossler',
    role: 'Field Operations · Appalachian range',
    bio: `Joined PCC at sixteen as a volunteer rescuer. Now coordinates the Asheville field office
          and the Atlanta intake center. No relation to Eliana, despite the name; both find this
          funny, separately.`,
  },
];

const FOUNDERS_LIST = [
  'Dr. Eliana Vossler', 'Susan Reilly', 'Mark Castellanos', 'Wendy Tang',
  'Dr. Hadley Renn', 'Roger Iampietro', 'Anne Berriman', 'Tom Holloway',
  'Carla Voltz', 'Khaled Saadi', 'Patricia Lim', 'Dr. Joaquin Reyes',
  'Helena Kornblut', 'Maria Aoki', 'James Burridge', 'Veronique Sallet',
  '… and 32 others whose names are inscribed at the East Quogue memorial.',
];

export default function TeamPage() {
  return (
    <>
      <section className="container-wide pt-20 md:pt-28 pb-10">
        <Reveal>
          <p className="eyebrow">The Field Team</p>
          <h1 className="h-display text-5xl md:text-7xl mt-3 text-moss-900 max-w-4xl">
            Forty-eight people signed the charter.<br/>
            <span className="text-rose-600 italic">Two hundred ninety-one still draw a paycheck from it.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-moss-700/90 leading-relaxed">
            No PCC employee earns more than 3.5&times; the salary of an entry-level field rescuer.
            That ratio is in the bylaws. It has not changed since 2014.
          </p>
        </Reveal>
      </section>

      <section className="container-wide my-12 grid md:grid-cols-2 gap-6">
        {LEADERSHIP.map((m, i) => (
          <Reveal key={m.name} delay={(i % 2) * 0.06}>
            <article className="card h-full grid grid-cols-[80px_1fr] gap-5 items-start">
              <div aria-hidden className="w-20 h-20 rounded-full bg-gradient-to-br from-moss-400/40 via-cream-100 to-rose-200 grid place-items-center font-display text-2xl text-moss-900">
                {m.name.split(' ').slice(-1)[0][0]}
              </div>
              <div>
                <p className="font-display text-xl text-moss-900 leading-tight">{m.name}</p>
                <p className="text-xs uppercase tracking-widest text-rose-600 mt-1">{m.role}</p>
                <p className="mt-3 text-sm text-moss-700/90 leading-relaxed">{m.bio}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </section>

      <section className="container-wide my-20 grid md:grid-cols-[1fr_1.4fr] gap-10 items-start">
        <Reveal>
          <p className="eyebrow">A note on representation</p>
          <h2 className="h-section mt-2">The journalist is not listed.</h2>
          <p className="mt-3 text-moss-700/90 leading-relaxed">
            &ldquo;Mr. Leonard&rdquo; declined to be named at the time of the broadcast and has
            renewed that request, in writing, every decade since. The Coalition has honored it. We
            ask researchers, journalists, and donors to do the same.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="card">
            <p className="eyebrow">2014 Founding charter signatories</p>
            <h3 className="font-display text-2xl text-moss-900 mt-2">Forty-eight, in order of signature.</h3>
            <ul className="mt-5 grid sm:grid-cols-2 gap-x-6 gap-y-1 text-sm text-moss-700/90 font-serif italic">
              {FOUNDERS_LIST.map(n => <li key={n}>{n}</li>)}
            </ul>
          </div>
        </Reveal>
      </section>

      <DonationBanner
        eyebrow="The team is real. The work is funded one donation at a time."
        title="$84 funds one full month of an entry-level rescuer&rsquo;s field stipend."
      />
    </>
  );
}
