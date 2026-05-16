'use client';
import { useEffect, useState } from 'react';

export default function LiveRescueCounter({ baseline = 4_318_207, perSecond = 0.106 }) {
  const [count, setCount] = useState(baseline);
  useEffect(() => {
    const start = Date.now();
    const id = setInterval(() => {
      const elapsed = (Date.now() - start) / 1000;
      setCount(baseline + elapsed * perSecond);
    }, 250);
    return () => clearInterval(id);
  }, [baseline, perSecond]);

  return (
    <div className="inline-flex flex-col items-center gap-2">
      <div className="flex items-center gap-2">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75 animate-ping" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-600" />
        </span>
        <span className="text-xs uppercase tracking-[0.25em] text-rose-600 font-semibold">Live rescue tracker</span>
      </div>
      <div
        className="font-display text-moss-900 tabular-nums tracking-tight leading-none"
        style={{ fontSize: 'clamp(2rem, 9vw, 3.5rem)' }}
      >
        {Math.floor(count).toLocaleString()}
      </div>
      <div className="text-xs text-moss-700/80">polyesters displaced this year — updating in real time</div>
    </div>
  );
}
