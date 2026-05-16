'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

export default function CountUp({
  to = 100,
  from = 0,
  duration = 1800,
  suffix = '',
  prefix = '',
  decimals = 0,
  compact = false,
  className = '',
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [val, setVal] = useState(from);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    let raf;
    const tick = (t) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(from + (to - from) * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, from, duration]);

  const fullOpts = { minimumFractionDigits: decimals, maximumFractionDigits: decimals };
  const fullFormatted = val.toLocaleString(undefined, fullOpts);
  const compactFormatted = compact
    ? val.toLocaleString(undefined, { notation: 'compact', maximumFractionDigits: 1 })
    : null;

  return (
    <motion.span ref={ref} className={className}>
      {prefix}
      {compact ? (
        <>
          <span className="sm:hidden">{compactFormatted}</span>
          <span className="hidden sm:inline">{fullFormatted}</span>
        </>
      ) : (
        fullFormatted
      )}
      {suffix}
    </motion.span>
  );
}
