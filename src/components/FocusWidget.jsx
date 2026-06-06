import { useState, useEffect, useRef } from 'react';
import { Pencil } from 'lucide-react';
import { AnimatedTimer, AnimatedRotateReset, AnimatedPlayPause } from './AnimatedIcons';

const TOTAL = 25 * 60;
function fmt(s) {
  return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
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

  return (
    <div className="bg-white rounded-2xl border border-stone-100 p-4 shadow-sm">
      {/* Header — AnimatedTimer spins when running */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <AnimatedTimer running={running} size={16} className="text-violet-500" />
          <h3 className="text-stone-800" style={{ fontFamily: "'Caveat', cursive", fontSize: '19px', fontWeight: 700 }}>
            Today's Focus
          </h3>
        </div>
        <span className="text-[11px] font-semibold text-violet-600 bg-violet-50 px-2 py-0.5 rounded-full">
          {focusTasks.length} tasks
        </span>
      </div>

      {/* Current task */}
      {focusTasks.length > 0 && (
        <div className="mb-4 px-3 py-2.5 bg-stone-50 rounded-xl">
          <p className="text-[10px] text-stone-400 font-medium mb-0.5">Focusing on</p>
          <p className="text-xs font-semibold text-stone-700 truncate">{focusTasks[taskIdx]}</p>
          <div className="flex gap-1 mt-2">
            {focusTasks.map((_, i) => (
              <button
                key={i}
                onClick={() => setTaskIdx(i)}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${i === taskIdx ? 'bg-violet-500' : 'bg-stone-300'}`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Timer display */}
      <div className="text-center mb-1">
        <p
          className="text-stone-900 leading-none"
          style={{ fontFamily: "'Caveat', cursive", fontSize: '52px', fontWeight: 700 }}
        >
          {fmt(seconds)}
        </p>
        <p className="text-xs text-stone-400 mt-1">
          {running ? 'Focus in progress…' : 'Focus on what matters.'}
        </p>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-2 mt-4">
        {/* AnimatedRotateReset — spins 360° on click */}
        <AnimatedRotateReset onClick={reset} size={14} />

        {/* AnimatedPlayPause — smooth icon swap */}
        <AnimatedPlayPause running={running} onToggle={() => setRunning(r => !r)} />

        {/* Pen icon */}
        <div className="w-9 h-9 flex items-center justify-center text-stone-300">
          <Pencil size={16} strokeWidth={1.5} />
        </div>
      </div>
    </div>
  );
}
