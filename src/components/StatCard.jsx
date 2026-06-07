import { motion } from 'motion/react';
import {
  CheckSquare, Timer, CheckCircle2, Flag,
  TrendingUp, TrendingDown,
} from 'lucide-react';

/* ── Clean, minimal stat card — Linear/Notion inspired ── */
const CONFIGS = [
  { Icon: CheckSquare, accent: '#7C6FF7', label: 'Total',   dot: 'bg-violet-400' },
  { Icon: Timer,       accent: '#F5A623', label: 'Active',  dot: 'bg-amber-400'  },
  { Icon: CheckCircle2,accent: '#22C55E', label: 'Done',    dot: 'bg-emerald-400'},
  { Icon: Flag,        accent: '#E57373', label: 'Pending', dot: 'bg-rose-400'   },
];

function AnimCount({ value }) {
  return (
    <motion.span
      key={value}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 400, damping: 28 }}
    >
      {value}
    </motion.span>
  );
}

export default function StatCard({ stat, index }) {
  const cfg = CONFIGS[index] || CONFIGS[0];
  const { Icon } = cfg;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.07, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={{ y: -2, transition: { type: 'spring', stiffness: 500, damping: 30 } }}
      className="group bg-white rounded-2xl p-4 border border-stone-100 cursor-default hover:border-stone-200 transition-colors duration-200"
    >
      {/* Top row */}
      <div className="flex items-center justify-between mb-4">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: `${cfg.accent}12` }}
        >
          <Icon size={15} style={{ color: cfg.accent }} strokeWidth={2} />
        </div>
        <span className="text-[10px] font-medium text-stone-400 uppercase tracking-wide">
          {cfg.label}
        </span>
      </div>

      {/* Value */}
      <p
        className="text-[32px] font-bold text-stone-800 leading-none mb-1"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        <AnimCount value={stat.value} />
      </p>
      <p className="text-[11px] text-stone-400 font-medium">{stat.label}</p>

      {/* Divider */}
      <div className="h-px bg-stone-100 my-3" />

      {/* Trend */}
      <div className="flex items-center gap-1">
        {stat.up
          ? <TrendingUp size={11} className="text-emerald-500 shrink-0" />
          : <TrendingDown size={11} className="text-red-400 shrink-0" />
        }
        <span className={`text-[11px] font-semibold ${stat.up ? 'text-emerald-500' : 'text-red-400'}`}>
          {stat.up ? '+' : '−'}{stat.change}
        </span>
        <span className="text-[10px] text-stone-400 ml-0.5">vs last week</span>
      </div>

      {/* Micro bar chart — subtle, monochrome */}
      <div className="flex items-end gap-0.5 mt-3 h-5">
        {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
          <motion.div
            key={i}
            className="flex-1 rounded-sm"
            style={{ backgroundColor: `${cfg.accent}${i === 5 ? 'CC' : '30'}` }}
            initial={{ height: 0 }}
            animate={{ height: `${h}%` }}
            transition={{ duration: 0.4, delay: index * 0.07 + i * 0.03 + 0.3 }}
          />
        ))}
      </div>
    </motion.div>
  );
}
