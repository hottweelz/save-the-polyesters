'use client';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';

export default function StickyDonate() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="fixed bottom-4 inset-x-3 md:inset-x-auto md:right-6 md:bottom-6 z-50"
          role="complementary"
          aria-label="Urgent donation appeal"
        >
          <div className="flex items-center gap-4 rounded-2xl bg-cream-50 border border-rose-200 shadow-soft px-4 py-3 md:py-4 md:px-5 max-w-md mx-auto">
            <div className="hidden sm:grid place-items-center w-12 h-12 rounded-full bg-rose-200 text-rose-600 text-xl" aria-hidden>♥</div>
            <div className="flex-1 min-w-0">
              <p className="font-display text-moss-900 leading-tight text-sm md:text-base">
                A baby polyester is displaced every <span className="text-rose-600">9.4 seconds</span>.
              </p>
              <p className="text-xs text-moss-700/80">Your gift funds emergency burrow relocation.</p>
            </div>
            <Link href="/take-action/#donate" className="btn-primary text-sm py-2 px-4 whitespace-nowrap">Donate</Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
