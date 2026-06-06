import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const TAGLINES = [
  'Stay focused.',
  'Ship it.',
  'Get it done.',
];

export default function IntroScreen({ onComplete }) {
  const [phase, setPhase] = useState(0);
  // phase 0 = logo entrance, 1 = tagline, 2 = bar fill, 3 = exit

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 800);
    const t2 = setTimeout(() => setPhase(2), 1600);
    const t3 = setTimeout(() => setPhase(3), 2800);
    const t4 = setTimeout(() => onComplete(), 3500);
    return () => [t1, t2, t3, t4].forEach(clearTimeout);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase < 3 && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #1a1625 0%, #2d1f4e 40%, #1a2a40 100%)' }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Ambient blobs */}
          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full opacity-20 blur-3xl"
            style={{ background: 'radial-gradient(circle, #7C6FF7 0%, transparent 70%)', top: '-10%', left: '-10%' }}
            animate={{ scale: [1, 1.15, 1], rotate: [0, 15, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute w-[400px] h-[400px] rounded-full opacity-15 blur-3xl"
            style={{ background: 'radial-gradient(circle, #F5A623 0%, transparent 70%)', bottom: '0%', right: '-5%' }}
            animate={{ scale: [1, 1.2, 1], rotate: [0, -20, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          />
          <motion.div
            className="absolute w-[300px] h-[300px] rounded-full opacity-10 blur-3xl"
            style={{ background: 'radial-gradient(circle, #22C55E 0%, transparent 70%)', bottom: '30%', left: '10%' }}
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          />

          {/* Floating particles */}
          {Array.from({ length: 18 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: Math.random() * 4 + 2,
                height: Math.random() * 4 + 2,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: ['#7C6FF7', '#F5A623', '#22C55E', '#fff'][i % 4],
                opacity: 0.4,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.7, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 3,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: Math.random() * 2,
              }}
            />
          ))}

          {/* Grid lines (subtle) */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
              backgroundSize: '48px 48px',
            }}
          />

          {/* Center content */}
          <div className="relative z-10 flex flex-col items-center gap-6">

            {/* Logo mark */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.1 }}
              className="relative"
            >
              {/* Outer glow ring */}
              <motion.div
                className="absolute inset-0 rounded-3xl"
                style={{ background: 'linear-gradient(135deg, #7C6FF7, #F5A623)', filter: 'blur(20px)', opacity: 0.5 }}
                animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.7, 0.4] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
              {/* Icon box */}
              <div
                className="relative w-24 h-24 rounded-3xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #7C6FF7 0%, #a78bfa 50%, #F5A623 100%)', boxShadow: '0 20px 60px rgba(124,111,247,0.5)' }}
              >
                <svg viewBox="0 0 48 48" className="w-14 h-14" fill="none">
                  {/* Pencil / task icon */}
                  <motion.path
                    d="M8 36 L10 26 L28 8 Q32 4 36 8 Q40 12 36 16 L18 34 Z"
                    stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                    fill="rgba(255,255,255,0.15)"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
                  />
                  <motion.path
                    d="M8 36 L12 38 L10 26"
                    stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.4, delay: 1, ease: 'easeOut' }}
                  />
                  <motion.path
                    d="M14 32 L18 28"
                    stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.3, delay: 1.1 }}
                  />
                  {/* Checkmark */}
                  <motion.path
                    d="M28 30 L32 34 L42 22"
                    stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: phase >= 1 ? 1 : 0 }}
                    transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
                  />
                </svg>
              </div>
            </motion.div>

            {/* TAMA wordmark */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <h1
                className="text-white tracking-tight leading-none"
                style={{ fontFamily: "'Caveat', cursive", fontSize: '72px', fontWeight: 700 }}
              >
                {'TAMA'.split('').map((ch, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.08, type: 'spring', stiffness: 300, damping: 20 }}
                    className="inline-block"
                    style={{ textShadow: '0 4px 20px rgba(124,111,247,0.5)' }}
                  >
                    {ch}
                  </motion.span>
                ))}
              </h1>
              <motion.p
                className="text-white/50 tracking-[0.3em] text-xs font-medium uppercase mt-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                Task Manager
              </motion.p>
            </motion.div>

            {/* Animated tagline */}
            <AnimatePresence mode="wait">
              {phase >= 1 && (
                <motion.p
                  key="tagline"
                  className="text-white/70 text-lg font-medium"
                  style={{ fontFamily: "'Caveat', cursive", fontSize: '24px' }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  {TAGLINES[Math.floor(Math.random() * TAGLINES.length)]}
                </motion.p>
              )}
            </AnimatePresence>

            {/* Progress bar */}
            {phase >= 2 && (
              <motion.div
                className="w-48 h-1 rounded-full overflow-hidden"
                style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: 'linear-gradient(90deg, #7C6FF7, #F5A623)' }}
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 1.0, ease: [0.4, 0, 0.2, 1] }}
                />
              </motion.div>
            )}
          </div>

          {/* Bottom badge */}
          <motion.p
            className="absolute bottom-8 text-white/25 text-xs tracking-wider font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            v1.0 · by feliix-bert
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
