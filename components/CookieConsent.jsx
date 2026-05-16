'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const KEY = 'pcc.cookie-consent.v1';

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setShow(true);
    } catch { /* private mode */ }
  }, []);

  const persist = (value) => {
    try { localStorage.setItem(KEY, JSON.stringify({ value, ts: Date.now() })); } catch {}
    setShow(false);
  };

  if (!show) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed inset-x-3 bottom-3 md:inset-x-auto md:left-6 md:bottom-6 md:max-w-md z-[60]"
    >
      <div className="rounded-2xl bg-moss-900 text-cream-100 shadow-soft border border-cream-100/10 p-5">
        <p className="font-display text-lg text-cream-50">We use a small number of essential cookies.</p>
        <p className="mt-2 text-sm text-cream-100/80 leading-relaxed">
          We use strictly necessary cookies to remember your consent choice and accessibility
          preferences. With your permission, we also use anonymous analytics cookies to understand
          how supporters reach our campaigns. You can change your mind any time.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <button onClick={() => persist('all')} className="btn-primary text-sm py-2 px-4">Accept all</button>
          <button onClick={() => persist('essential')} className="btn-ghost text-sm py-2 px-4 border-cream-100/30 text-cream-100 hover:bg-cream-100/10">Essential only</button>
          <Link href="/legal/cookies/" className="text-xs text-cream-100/70 underline self-center ml-auto">Cookie policy</Link>
        </div>
      </div>
    </div>
  );
}
