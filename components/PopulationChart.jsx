'use client';
import { motion } from 'framer-motion';

const POINTS = [
  { y: 1985, v: 100 }, { y: 1990, v: 94 }, { y: 1995, v: 88 },
  { y: 2000, v: 79 }, { y: 2005, v: 66 }, { y: 2010, v: 51 },
  { y: 2015, v: 38 }, { y: 2020, v: 22 }, { y: 2025, v: 9 },
];

const W = 640, H = 240, P = 32;
const xs = (i) => P + (i * (W - P * 2)) / (POINTS.length - 1);
const ys = (v) => H - P - ((v - 0) * (H - P * 2)) / 100;

const path = POINTS.map((p, i) => `${i === 0 ? 'M' : 'L'} ${xs(i)} ${ys(p.v)}`).join(' ');
const area = `${path} L ${xs(POINTS.length - 1)} ${H - P} L ${xs(0)} ${H - P} Z`;

export default function PopulationChart() {
  return (
    <figure className="card">
      <figcaption className="mb-2">
        <p className="eyebrow">Fig. 4 · Estimated wild population index (1985 = 100)</p>
        <h3 className="font-display text-2xl text-moss-900 mt-1">A 91% decline in four decades.</h3>
      </figcaption>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label="Population decline chart">
        {/* gridlines */}
        {[0, 25, 50, 75, 100].map(v => (
          <g key={v}>
            <line x1={P} x2={W - P} y1={ys(v)} y2={ys(v)} stroke="#1f2c1a" strokeOpacity="0.08" />
            <text x={W - P + 4} y={ys(v) + 3} fontSize="9" fill="#384f30" opacity="0.6">{v}</text>
          </g>
        ))}
        <motion.path d={area} fill="#d98a82" fillOpacity="0.25"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1 }} />
        <motion.path d={path} fill="none" stroke="#a8534b" strokeWidth="2.5" strokeLinecap="round"
          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.4, ease: 'easeOut' }} />
        {POINTS.map((p, i) => (
          <g key={p.y}>
            <circle cx={xs(i)} cy={ys(p.v)} r="3.5" fill="#a8534b" />
            <text x={xs(i)} y={H - P + 14} textAnchor="middle" fontSize="9" fill="#384f30" opacity="0.7">{p.y}</text>
          </g>
        ))}
      </svg>
      <p className="text-xs text-moss-700/70 mt-3">
        Source: Polyester Conservation Coalition Synthetic Fauna Census, 2025. Confidence interval ±6.2%.
      </p>
    </figure>
  );
}
