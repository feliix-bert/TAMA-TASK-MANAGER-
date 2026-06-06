import { motion } from 'motion/react';
import {
  CheckSquare, Timer, CheckCircle2, Flag,
  TrendingUp, TrendingDown,
} from 'lucide-react';

const CONFIGS = [
  {
    Icon: CheckSquare,
    gradient: 'linear-gradient(135deg, #7C6FF7 0%, #a78bfa 100%)',
    bg: 'linear-gradient(135deg, #EDE9FE 0%, #F5F3FF 100%)',
    glow: 'rgba(124,111,247,0.3)',
    textColor: '#5b21b6',
    badge: 'Total',
  },
  {
    Icon: Timer,
    gradient: 'linear-gradient(135deg, #F5A623 0%, #fbbf24 100%)',
    bg: 'linear-gradient(135deg, #FEF3C7 0%, #FFFBEB 100%)',
    glow: 'rgba(245,166,35,0.3)',
    textColor: '#92400e',
    badge: 'Active',
  },
  {
    Icon: CheckCircle2,
    gradient: 'linear-gradient(135deg, #22C55E 0%, #4ade80 100%)',
    bg: 'linear-gradient(135deg, #DCFCE7 0%, #F0FDF4 100%)',
    glow: 'rgba(34,197,94,0.3)',
    textColor: '#14532d',
    badge: 'Done',
  },
  {
    Icon: Flag,
    gradient: 'linear-gradient(135deg, #EAB308 0%, #facc15 100%)',
    bg: 'linear-gradient(135deg, #FEF9C3 0%, #FEFCE8 100%)',
    glow: 'rgba(234,179,8,0.3)',
    textColor: '#713f12',
    badge: 'Pending',
  },
];

/* Animated count-up number */
function AnimCount({ value }) {
  return (
    <motion.span
      key={value}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
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
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={{ y: -3, transition: { type: 'spring', stiffness: 400, damping: 20 } }}
      className="relative bg-white rounded-3xl p-5 border border-stone-100 shadow-sm hover:shadow-lg hover:shadow-stone-200/50 overflow-hidden cursor-default"
    >
      {/* Subtle background gradient */}
      <div
        className="absolute inset-0 opacity-40"
        style={{ background: cfg.bg }}
      />

      {/* Decorative circle top-right */}
      <div
        className="absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-[0.07]"
        style={{ background: cfg.gradient }}
      />

      <div className="relative z-10">
        {/* Header row */}
        <div className="flex items-start justify-between mb-4">
          {/* Icon */}
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 18, delay: index * 0.08 + 0.15 }}
            className="w-11 h-11 rounded-2xl flex items-center justify-center shadow-sm"
            style={{ background: cfg.gradient, boxShadow: `0 4px 14px ${cfg.glow}` }}
          >
            <Icon size={20} color="white" strokeWidth={2.2} />
          </motion.div>

          {/* Badge */}
          <span
            className="text-[10px] font-semibold px-2.5 py-1 rounded-full"
            style={{ backgroundColor: `${cfg.glow}`, color: cfg.textColor }}
          >
            {cfg.badge}
          </span>
        </div>

        {/* Value */}
        <div className="mb-1">
          <p className="text-[38px] font-bold text-stone-800 leading-none" style={{ fontFamily: "'Caveat', cursive", color: stat.accent }}>
            <AnimCount value={stat.value} />
          </p>
          <p className="text-[11px] font-medium text-stone-500 mt-0.5">{stat.label}</p>
        </div>

        {/* Divider */}
        <div className="h-px bg-stone-100 my-3" />

        {/* Trend */}
        <div className="flex items-center gap-1.5">
          {stat.up ? (
            <TrendingUp size={13} className="text-emerald-500" />
          ) : (
            <TrendingDown size={13} className="text-red-400" />
          )}
          <span className={`text-xs font-semibold ${stat.up ? 'text-emerald-500' : 'text-red-400'}`}>
            {stat.up ? '+' : '-'}{stat.change}
          </span>
          <span className="text-[10px] text-stone-400">vs last week</span>
        </div>

        {/* Mini bar chart decoration */}
        <div className="flex items-end gap-0.5 mt-3 h-6 opacity-40">
          {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
            <motion.div
              key={i}
              className="flex-1 rounded-sm"
              style={{ background: cfg.gradient }}
              initial={{ height: 0 }}
              animate={{ height: `${h}%` }}
              transition={{ duration: 0.5, delay: index * 0.08 + i * 0.04 + 0.4 }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
