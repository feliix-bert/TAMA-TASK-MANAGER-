import {
  CheckSquare, Timer, CheckCircle2, Flag,
} from 'lucide-react';
import { AnimatedStatIcon, AnimatedStatValue, AnimatedTrendBadge, AnimatedCard } from './AnimatedIcons';

/* Lucide-based icon boxes for each stat */
function StatIconBox({ index }) {
  const configs = [
    { Icon: CheckSquare, bg: '#EDE9FE', color: '#7C6FF7' },
    { Icon: Timer,       bg: '#FEF3C7', color: '#F5A623' },
    { Icon: CheckCircle2,bg: '#DCFCE7', color: '#22C55E' },
    { Icon: Flag,        bg: '#FEF9C3', color: '#EAB308' },
  ];
  const { Icon, bg, color } = configs[index] || configs[0];

  return (
    <AnimatedStatIcon delay={index * 0.05}>
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center"
        style={{ backgroundColor: bg }}
      >
        <Icon size={20} style={{ color }} strokeWidth={2} />
      </div>
    </AnimatedStatIcon>
  );
}

export default function StatCard({ stat, index }) {
  return (
    <AnimatedCard
      delay={index * 0.07}
      className="flex-1 min-w-0 bg-white rounded-2xl p-4 border border-stone-100 shadow-sm"
    >
      {/* Icon + Label row */}
      <div className="flex items-center gap-2.5 mb-3">
        <StatIconBox index={index} />
        <p className="text-xs font-medium text-stone-500 leading-tight">{stat.label}</p>
      </div>

      {/* Animated number with drawn underline */}
      <AnimatedStatValue value={stat.value} accent={stat.accent} />

      {/* Animated trend badge */}
      <AnimatedTrendBadge up={stat.up} change={stat.change} />
    </AnimatedCard>
  );
}
