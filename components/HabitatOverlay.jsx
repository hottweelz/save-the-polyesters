'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { REGIONS, STATUS_COLOR } from '@/lib/regions';
import { MAP_POSITIONS, MAP_ASPECT, MAP_SRC } from '@/lib/map-positions';

/**
 * Habitat map: background image (SVG/PNG/WebP) with overlaid region markers.
 * Marker positions live in /lib/map-positions.js so they're easy to tune.
 *
 * Props (all optional, default to the configured world_map.svg):
 *   src        — image URL
 *   width      — image natural width  (for aspect-ratio reservation)
 *   height     — image natural height
 *   alt        — alt text
 *   positions  — { [regionId]: { xPct, yPct } } override
 */
export default function HabitatOverlay({
  src = MAP_SRC,
  width = MAP_ASPECT.width,
  height = MAP_ASPECT.height,
  alt = 'World map showing documented polyester habitat regions',
  positions = MAP_POSITIONS,
}) {
  const [active, setActive] = useState(null);
  const r = REGIONS.find((x) => x.id === active);

  return (
    <div className="grid lg:grid-cols-[1.8fr_1fr] gap-6 items-start">
      <div className="rounded-2xl bg-cream-50 border border-moss-700/10 shadow-soft p-2 md:p-3">
        <div className="relative w-full" style={{ aspectRatio: `${width} / ${height}` }}>
          {/* plain <img>: the SVG is large but ships fine; next/image adds no value for SVGs */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            width={width}
            height={height}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-contain select-none"
            draggable={false}
          />

          {REGIONS.map((reg) => {
            const pos = positions[reg.id];
            if (!pos) return null;
            const isActive = active === reg.id;
            const color = STATUS_COLOR[reg.status];
            return (
              <button
                key={reg.id}
                type="button"
                aria-label={`${reg.label} — ${reg.status}`}
                onMouseEnter={() => setActive(reg.id)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(reg.id)}
                onBlur={() => setActive(null)}
                className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-600"
                style={{ left: `${pos.xPct}%`, top: `${pos.yPct}%` }}
              >
                <span
                  className="absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 rounded-full animate-pulseGlow"
                  style={{ width: 26, height: 26, background: `${color}33` }}
                  aria-hidden
                />
                <motion.span
                  className="block rounded-full border-2 border-cream-50 shadow"
                  style={{ background: color }}
                  animate={{ width: isActive ? 20 : 14, height: isActive ? 20 : 14 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                />
                {isActive && (
                  <motion.span
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap rounded-md bg-moss-900 text-cream-50 text-[11px] px-2 py-1 shadow-soft pointer-events-none"
                  >
                    {reg.label}
                  </motion.span>
                )}
              </button>
            );
          })}
        </div>

        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-moss-700">
          {Object.entries(STATUS_COLOR).map(([k, c]) => (
            <span key={k} className="inline-flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: c }} /> {k}
            </span>
          ))}
        </div>
      </div>

      <aside className="card">
        {r ? (
          <>
            <p
              className="tag"
              style={{ background: `${STATUS_COLOR[r.status]}22`, color: STATUS_COLOR[r.status] }}
            >
              {r.status}
            </p>
            <h3 className="font-display text-2xl mt-2 text-moss-900">{r.label}</h3>
            <p className="mt-1 text-xs uppercase tracking-widest text-moss-700/60">
              {r.lat.toFixed(1)}°{r.lat >= 0 ? 'N' : 'S'} · {Math.abs(r.lng).toFixed(1)}°{r.lng >= 0 ? 'E' : 'W'}
            </p>
            <p className="mt-3 text-moss-700/90 text-sm leading-relaxed">{r.detail}</p>
          </>
        ) : (
          <>
            <p className="eyebrow">Interactive habitat survey</p>
            <h3 className="font-display text-2xl mt-2 text-moss-900">Ten regions. Ten different emergencies.</h3>
            <p className="mt-3 text-moss-700/90 text-sm leading-relaxed">
              Hover or focus on any colored marker to read the latest field assessment from PCC&rsquo;s
              regional wardens. Data reflects observations from the 2025 Synthetic Fauna Census.
            </p>
          </>
        )}
      </aside>
    </div>
  );
}
