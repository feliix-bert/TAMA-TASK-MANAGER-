import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

/* ──────────────────────────────────────────────────────────────
 *  IntroScreen — Elegant, typography-first splash
 *  Inspired by: Linear, Craft, Vercel
 *  No particles, no blobs, no gradients — just clean type + motion
 * ────────────────────────────────────────────────────────────── */

const LETTERS = ['T', 'A', 'M', 'A'];

export default function IntroScreen({ onComplete }) {
  // phase 0 = logo in, 1 = tagline in, 2 = line draw, 3 = exit
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 700);
    const t2 = setTimeout(() => setPhase(2), 1400);
    const t3 = setTimeout(() => setPhase(3), 2600);
    const t4 = setTimeout(() => onComplete(), 3200);
    return () => [t1, t2, t3, t4].forEach(clearTimeout);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase < 3 && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ backgroundColor: '#FAFAF9' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* ── Subtle grid ── */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
              backgroundSize: '64px 64px',
            }}
          />

          {/* ── Center content ── */}
          <div className="relative z-10 flex flex-col items-center">

            {/* Wordmark — letter-by-letter stagger */}
            <div className="flex items-baseline gap-0 overflow-hidden mb-6">
              {LETTERS.map((ch, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: i * 0.08,
                    duration: 0.5,
                    ease: [0.34, 1.1, 0.64, 1],
                  }}
                  className="inline-block text-stone-900"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(56px, 10vw, 80px)',
                    fontWeight: 400,
                    letterSpacing: '-0.04em',
                    lineHeight: 1,
                  }}
                >
                  {ch}
                </motion.span>
              ))}
            </div>

            {/* Horizontal rule that draws in */}
            <div className="relative w-48 h-px bg-stone-200 overflow-hidden mb-6">
              <motion.div
                className="absolute inset-0 bg-stone-800"
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: phase >= 2 ? 1 : 0 }}
                transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
              />
            </div>

            {/* Tagline */}
            <AnimatePresence>
              {phase >= 1 && (
                <motion.p
                  key="tagline"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="text-stone-400 tracking-widest uppercase"
                  style={{ fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '0.25em' }}
                >
                  Task Manager
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* ── Bottom version ── */}
          <motion.p
            className="absolute bottom-8 text-stone-300 tracking-widest uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.5 }}
            style={{ fontFamily: 'var(--font-body)', fontSize: '10px', letterSpacing: '0.2em' }}
          >
            by feliix-bert · v1.0
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
