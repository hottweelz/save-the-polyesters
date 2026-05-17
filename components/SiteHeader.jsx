'use client';
import Link from 'next/link';
import { useState } from 'react';

const NAV = [
  { href: '/about/',           label: 'The Species' },
  { href: '/our-story/',       label: 'Our Story' },
  { href: '/threats/',         label: 'Threats' },
  { href: '/rescue-stories/',  label: 'Rescue Stories' },
  { href: '/research/',        label: 'Research' },
  { href: '/take-action/',     label: 'Take Action' },
  { href: '/merchandise/',     label: 'Shop' },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 bg-cream-50/85 backdrop-blur border-b border-moss-700/10">
      <div className="container-wide flex items-center gap-6 py-3">
        <Link href="/" className="flex items-center gap-3 group">
          <span aria-hidden className="w-10 h-10 rounded-full bg-moss-700 text-cream-50 grid place-items-center font-display text-xl">P</span>
          <span className="leading-tight">
            <span className="block font-display text-lg text-moss-900 group-hover:text-moss-700">Save The Polyesters</span>
            <span className="block text-[10px] uppercase tracking-[0.25em] text-rose-600">Polyester Conservation Coalition · est. 2014</span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden lg:flex items-center gap-5 ml-auto text-sm">
          {NAV.map(n => (
            <Link key={n.href} href={n.href} className="text-moss-900/80 hover:text-rose-600 transition">{n.label}</Link>
          ))}
          <Link href="/take-action/#donate" className="btn-primary text-sm py-2 px-5">Donate</Link>
        </nav>

        <button
          className="lg:hidden ml-auto rounded-full border border-moss-700/20 p-2"
          aria-label="Open menu" aria-expanded={open}
          onClick={() => setOpen(o => !o)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
        </button>
      </div>

      {open && (
        <nav aria-label="Mobile" className="lg:hidden border-t border-moss-700/10 bg-cream-50">
          <ul className="container-wide py-3 grid gap-1">
            {NAV.map(n => (
              <li key={n.href}>
                <Link href={n.href} onClick={() => setOpen(false)} className="block py-2 text-moss-900/90">{n.label}</Link>
              </li>
            ))}
            <li><Link href="/take-action/#donate" onClick={() => setOpen(false)} className="btn-primary mt-2 w-full">Donate Now</Link></li>
          </ul>
        </nav>
      )}
    </header>
  );
}
