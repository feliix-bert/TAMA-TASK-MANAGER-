import { motion } from 'motion/react';
import { Users, ArrowUpRight, MoreHorizontal, Layers } from 'lucide-react';

/* ── Gradient presets per card index ─── */
const GRADIENTS = [
  { from: '#7C6FF7', to: '#a78bfa', text: 'rgba(124,111,247,0.12)', ring: '#7C6FF7' },
  { from: '#22C55E', to: '#4ade80', text: 'rgba(34,197,94,0.12)',   ring: '#22C55E' },
  { from: '#F5A623', to: '#fbbf24', text: 'rgba(245,166,35,0.12)',  ring: '#F5A623' },
  { from: '#E57373', to: '#f87171', text: 'rgba(229,115,115,0.12)', ring: '#E57373' },
];

/* ── Mini avatar stack ───────────────── */
function AvatarStack({ count = 3 }) {
  const colors = ['#7C6FF7', '#22C55E', '#F5A623'];
  return (
    <div className="flex items-center">
      {Array.from({ length: Math.min(count, 3) }).map((_, i) => (
        <div
          key={i}
          className="w-5 h-5 rounded-full border-2 border-white flex items-center justify-center text-[8px] font-bold text-white shrink-0"
          style={{ backgroundColor: colors[i], marginLeft: i > 0 ? '-6px' : 0, zIndex: 3 - i }}
        >
          {String.fromCharCode(65 + i)}
        </div>
      ))}
      {count > 3 && (
        <div
          className="w-5 h-5 rounded-full border-2 border-white bg-stone-300 flex items-center justify-center text-[7px] font-bold text-stone-600"
          style={{ marginLeft: '-6px' }}
        >
          +{count - 3}
        </div>
      )}
    </div>
  );
}

/* ── Radial progress ring ────────────── */
function ProgressRing({ pct, color }) {
  const r = 22;
  const circ = 2 * Math.PI * r;
  const dash = circ * (pct / 100);

  return (
    <div className="relative w-16 h-16 shrink-0">
      <svg viewBox="0 0 52 52" className="w-full h-full -rotate-90">
        <circle cx="26" cy="26" r={r} fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth="4" />
        <motion.circle
          cx="26" cy="26" r={r} fill="none" stroke={color}
          strokeWidth="4" strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: circ - dash }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-sm font-bold text-stone-700">{pct}%</span>
      </div>
    </div>
  );
}

export default function ProjectCard({ project, index }) {
  const progress = Math.round((project.completed / project.taskCount) * 100);
  const grad = GRADIENTS[index % GRADIENTS.length];
  const remaining = project.taskCount - project.completed;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.09, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={{ y: -4, transition: { type: 'spring', stiffness: 400, damping: 20 } }}
      className="group relative bg-white rounded-3xl overflow-hidden border border-stone-100 shadow-sm hover:shadow-xl hover:shadow-stone-200/60 cursor-pointer transition-shadow"
    >
      {/* Gradient accent top strip */}
      <div
        className="h-1.5 w-full"
        style={{ background: `linear-gradient(90deg, ${grad.from}, ${grad.to})` }}
      />

      {/* Card body */}
      <div className="p-5">
        {/* Top row: emoji + menu */}
        <div className="flex items-start justify-between mb-4">
          {/* Emoji badge */}
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-sm"
            style={{ background: `linear-gradient(135deg, ${grad.from}22, ${grad.to}44)`, border: `1px solid ${grad.from}30` }}
          >
            {project.emoji}
          </div>

          {/* More button */}
          <button className="opacity-0 group-hover:opacity-100 w-7 h-7 rounded-lg flex items-center justify-center text-stone-400 hover:bg-stone-100 transition-all">
            <MoreHorizontal size={15} />
          </button>
        </div>

        {/* Project name */}
        <h3 className="font-semibold text-stone-800 text-[15px] leading-tight truncate mb-1">
          {project.name}
        </h3>

        {/* Task count tag */}
        <div className="flex items-center gap-1.5 mb-4">
          <Layers size={11} className="text-stone-400" />
          <span className="text-[11px] text-stone-400">{project.taskCount} tasks · {remaining} left</span>
        </div>

        {/* Progress + Ring row */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex-1">
            {/* Stacked progress bar */}
            <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: `linear-gradient(90deg, ${grad.from}, ${grad.to})` }}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1.1, delay: index * 0.1 + 0.2, ease: [0.4, 0, 0.2, 1] }}
              />
            </div>

            {/* Bottom: avatars + deadline */}
            <div className="flex items-center justify-between mt-3">
              <AvatarStack count={Math.floor(Math.random() * 3) + 1} />
              <span className="text-[10px] font-medium text-stone-400">Jun 2026</span>
            </div>
          </div>

          {/* Circular ring progress */}
          <ProgressRing pct={progress} color={grad.from} />
        </div>
      </div>

      {/* Bottom action bar (shows on hover) */}
      <div className="px-5 pb-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ backgroundColor: `${grad.from}15`, color: grad.from }}
        >
          <ArrowUpRight size={12} />
          Open Project
        </motion.button>
      </div>
    </motion.div>
  );
}
