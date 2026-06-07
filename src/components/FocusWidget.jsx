import { useState, useEffect, useRef } from 'react';
import { Pencil } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AnimatedTimer, AnimatedRotateReset, AnimatedPlayPause } from './AnimatedIcons';

const TOTAL = 25 * 60;
function fmt(s) {
  return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
}

/* Clean arc ring — thin, monochrome */
function TimerRing({ pct }) {
  const r = 44;
  const circ = 2 * Math.PI * r;
  return (
    <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full -rotate-90">
      <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(0,0,0,0.05)" strokeWidth="3" />
      <motion.circle
        cx="50" cy="50" r={r}
        fill="none"
        stroke="#1C1917"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray={circ}
        animate={{ strokeDashoffset: circ * (1 - pct / 100) }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      />
    </svg>
  );
}

export default function FocusWidget({ focusTasks }) {
  const [running, setRunning] = useState(false);
  const [seconds, setSeconds] = useState(TOTAL);
  const [taskIdx, setTaskIdx] = useState(0);
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
    <div className="bg-white rounded-2xl border border-stone-100 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <AnimatedTimer running={running} size={14} className="text-stone-500" />
          <h3
            className="text-stone-800 leading-none"
            style={{ fontFamily: 'var(--font-display)', fontSize: '17px' }}
          >
            Focus
          </h3>
        </div>
        <span className="text-[10px] font-medium text-stone-400">
          {focusTasks.length} tasks
        </span>
      </div>

      {/* Current task */}
      {focusTasks.length > 0 && (
        <AnimatePresence mode="wait">
          <motion.div
            key={taskIdx}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="mb-3 px-2.5 py-2 bg-stone-50 rounded-lg border border-stone-100"
          >
            <p className="text-[9px] text-stone-400 font-medium uppercase tracking-wide mb-0.5">
              Focusing on
            </p>
            <p className="text-[11px] font-medium text-stone-700 truncate">{focusTasks[taskIdx]}</p>
            <div className="flex gap-1 mt-1.5">
              {focusTasks.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setTaskIdx(i)}
                  className="h-1 rounded-full transition-all duration-200"
                  style={{
                    width: i === taskIdx ? 16 : 6,
                    backgroundColor: i === taskIdx ? '#1C1917' : '#D1D5DB',
                  }}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      )}

      {/* Timer display */}
      <div className="relative w-[100px] h-[100px] mx-auto mb-2 flex items-center justify-center">
        <TimerRing pct={pct} />
        <p
          className="relative z-10 text-stone-900 leading-none tabular-nums"
          style={{ fontFamily: 'var(--font-display)', fontSize: '26px' }}
        >
          {fmt(seconds)}
        </p>
      </div>

      <p className="text-[10px] text-center text-stone-400 mb-3">
        {running ? 'Focus in progress…' : 'Focus on what matters.'}
      </p>

      {/* Controls */}
      <div className="flex items-center gap-2 w-full">
        <AnimatedRotateReset onClick={reset} size={13} />
        <div className="flex-1 min-w-0">
          <AnimatedPlayPause running={running} onToggle={() => setRunning(r => !r)} />
        </div>
        <button
          className="w-8 h-8 shrink-0 flex items-center justify-center text-stone-300 hover:text-stone-600 rounded-lg hover:bg-stone-100 transition-colors duration-150"
        >
          <Pencil size={13} strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}
