import { useState, useEffect, useRef } from 'react';
import { Pencil, Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AnimatedTimer, AnimatedRotateReset, AnimatedPlayPause } from './AnimatedIcons';

const TOTAL = 25 * 60;
function fmt(s) {
  return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
}

/* Circular progress ring around timer */
function TimerRing({ pct, running }) {
  const r = 46;
  const circ = 2 * Math.PI * r;
  const dash = circ * (1 - pct / 100);
  return (
    <svg viewBox="0 0 104 104" className="absolute inset-0 w-full h-full -rotate-90" style={{ zIndex: 0 }}>
      {/* Track */}
      <circle cx="52" cy="52" r={r} fill="none" stroke="rgba(124,111,247,0.08)" strokeWidth="4" />
      {/* Progress */}
      <motion.circle
        cx="52" cy="52" r={r}
        fill="none"
        stroke={running ? '#7C6FF7' : '#d8d4f9'}
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray={circ}
        animate={{ strokeDashoffset: dash }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      />
    </svg>
  );
}

export default function FocusWidget({ focusTasks }) {
  const [running, setRunning]   = useState(false);
  const [seconds, setSeconds]   = useState(TOTAL);
  const [taskIdx, setTaskIdx]   = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    if (running) {
      ref.current = setInterval(() => {
        setSeconds(s => {
          if (s <= 1) { setRunning(false); clearInterval(ref.current); return TOTAL; }
          return s - 1;
        });
      }, 1000);
    } else {
      clearInterval(ref.current);
    }
    return () => clearInterval(ref.current);
  }, [running]);

  function reset() { setRunning(false); setSeconds(TOTAL); }

  const pct = Math.round(((TOTAL - seconds) / TOTAL) * 100);

  return (
    <div className="bg-white rounded-2xl border border-stone-100 p-4 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <AnimatedTimer running={running} size={15} className="text-violet-500" />
          <h3
            className="text-stone-800 leading-none"
            style={{ fontFamily: 'var(--font-display)', fontSize: '18px' }}
          >
            Today's Focus
          </h3>
        </div>
        <motion.span
          animate={running ? { backgroundColor: '#7C3AED', color: '#fff' } : { backgroundColor: '#EDE9FE', color: '#7C3AED' }}
          transition={{ duration: 0.3 }}
          className="text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1"
        >
          {running && <Flame size={10} />}
          {focusTasks.length} tasks
        </motion.span>
      </div>

      {/* Current task chip */}
      {focusTasks.length > 0 && (
        <AnimatePresence mode="wait">
          <motion.div
            key={taskIdx}
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.2 }}
            className="mb-4 px-3 py-2.5 bg-stone-50 rounded-xl border border-stone-100"
          >
            <p className="text-[9px] text-stone-400 font-semibold uppercase tracking-wide mb-0.5">Focusing on</p>
            <p className="text-xs font-semibold text-stone-700 truncate">{focusTasks[taskIdx]}</p>
            <div className="flex gap-1 mt-2">
              {focusTasks.map((_, i) => (
                <motion.button
                  key={i}
                  onClick={() => setTaskIdx(i)}
                  whileHover={{ scale: 1.3 }}
                  whileTap={{ scale: 0.9 }}
                  animate={{
                    width: i === taskIdx ? 16 : 6,
                    backgroundColor: i === taskIdx ? '#7C6FF7' : '#D1D5DB',
                  }}
                  className="h-1.5 rounded-full"
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      )}

      {/* Timer ring */}
      <div className="relative w-[104px] h-[104px] mx-auto mb-2 flex items-center justify-center">
        <TimerRing pct={pct} running={running} />
        <div className="relative z-10 text-center">
          <motion.p
            className="text-stone-900 leading-none tabular-nums"
            style={{ fontFamily: 'var(--font-display)', fontSize: '28px' }}
            animate={running ? { color: '#7C3AED' } : { color: '#1C1917' }}
            transition={{ duration: 0.4 }}
          >
            {fmt(seconds)}
          </motion.p>
        </div>
      </div>

      <p className="text-[10px] text-center text-stone-400 mb-4">
        {running ? '🔥 Focus in progress…' : 'Focus on what matters.'}
      </p>

      {/* Controls — flex row, full width, no overflow */}
      <div className="flex items-center gap-2 w-full">
        {/* Reset */}
        <AnimatedRotateReset onClick={reset} size={14} />

        {/* Start Focus — takes remaining space, always fits */}
        <div className="flex-1 min-w-0">
          <AnimatedPlayPause running={running} onToggle={() => setRunning(r => !r)} />
        </div>

        {/* Pencil */}
        <motion.button
          whileHover={{ rotate: -15, scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-9 h-9 shrink-0 flex items-center justify-center text-stone-300 hover:text-violet-400 rounded-xl hover:bg-violet-50"
        >
          <Pencil size={14} strokeWidth={1.5} />
        </motion.button>
      </div>
    </div>
  );
}
