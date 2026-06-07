import { useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'motion/react';
import {
  ArrowUpRight, MoreHorizontal, Zap, Target, BookOpen,
  Code2, Palette, FlaskConical, CheckCircle2,
} from 'lucide-react';

/* ── Card themes — one per project slot ─── */
const THEMES = [
  {
    accent: '#7C6FF7',
    accentAlt: '#a78bfa',
    bg: 'linear-gradient(135deg, #f3f1ff 0%, #ede9fe 60%, #faf5ff 100%)',
    dot: '#7C6FF7',
    tag: 'bg-violet-100 text-violet-600',
    glow: 'rgba(124,111,247,0.25)',
    Icon: Code2,
    label: 'Dev',
  },
  {
    accent: '#F5A623',
    accentAlt: '#fbbf24',
    bg: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 60%, #fff7ed 100%)',
    dot: '#F5A623',
    tag: 'bg-amber-100 text-amber-600',
    glow: 'rgba(245,166,35,0.25)',
    Icon: Palette,
    label: 'Design',
  },
  {
    accent: '#22C55E',
    accentAlt: '#4ade80',
    bg: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 60%, #ecfdf5 100%)',
    dot: '#22C55E',
    tag: 'bg-emerald-100 text-emerald-600',
    glow: 'rgba(34,197,94,0.25)',
    Icon: FlaskConical,
    label: 'Research',
  },
  {
    accent: '#E57373',
    accentAlt: '#f87171',
    bg: 'linear-gradient(135deg, #fff1f2 0%, #ffe4e6 60%, #fdf2f8 100%)',
    dot: '#E57373',
    tag: 'bg-rose-100 text-rose-600',
    glow: 'rgba(229,115,115,0.25)',
    Icon: Target,
    label: 'Goals',
  },
];

/* ── Animated arc progress ─── */
function ArcProgress({ pct, color, colorAlt, size = 64 }) {
  const r = (size / 2) - 6;
  const circ = 2 * Math.PI * r;
  const dash = circ * (pct / 100);
  const cx = size / 2;
  const cy = size / 2;

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full -rotate-90">
        {/* Track */}
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="5" />
        {/* Gradient definition */}
        <defs>
          <linearGradient id={`pg-${color.replace('#','')}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={color} />
            <stop offset="100%" stopColor={colorAlt} />
          </linearGradient>
        </defs>
        {/* Animated fill */}
        <motion.circle
          cx={cx} cy={cy} r={r} fill="none"
          stroke={`url(#pg-${color.replace('#','')})`}
          strokeWidth="5" strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: circ - dash }}
          transition={{ duration: 1.4, delay: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
        />
      </svg>
      {/* Center % */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-0">
        <span className="text-[13px] font-bold leading-none" style={{ color }}>{pct}</span>
        <span className="text-[8px] text-stone-400 font-medium">%</span>
      </div>
    </div>
  );
}

/* ── Mini avatar row ─── */
function Avatars({ count }) {
  const colors = ['#7C6FF7', '#22C55E', '#F5A623', '#E57373'];
  const n = Math.min(count, 4);
  return (
    <div className="flex items-center">
      {Array.from({ length: n }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, x: -8 }}
          animate={{ scale: 1, x: 0 }}
          transition={{ delay: i * 0.06 + 0.5, type: 'spring', stiffness: 400, damping: 20 }}
          className="w-[22px] h-[22px] rounded-full border-2 border-white flex items-center justify-center text-[8px] font-bold text-white shrink-0"
          style={{ backgroundColor: colors[i % colors.length], marginLeft: i > 0 ? '-7px' : 0, zIndex: n - i }}
        >
          {String.fromCharCode(65 + i)}
        </motion.div>
      ))}
      {count > 4 && (
        <div
          className="w-[22px] h-[22px] rounded-full border-2 border-white bg-stone-200 flex items-center justify-center text-[7px] font-bold text-stone-500"
          style={{ marginLeft: '-7px' }}
        >+{count - 4}</div>
      )}
    </div>
  );
}

/* ── Step dots timeline ─── */
function StepDots({ done, total, color }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: Math.min(total, 6) }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: i * 0.05 + 0.5 }}
          className="rounded-full"
          style={{
            width: i < done ? 10 : 6,
            height: 6,
            backgroundColor: i < done ? color : 'rgba(0,0,0,0.1)',
            transition: 'all 0.3s ease',
          }}
        />
      ))}
    </div>
  );
}

export default function ProjectCard({ project, index }) {
  const theme = THEMES[index % THEMES.length];
  const { Icon } = theme;
  const progress = Math.round((project.completed / project.taskCount) * 100);
  const remaining = project.taskCount - project.completed;

  const avatarCount = (index % 3) + 2; // deterministic: 2, 3, or 4
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef(null);

  /* 3D tilt */
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-60, 60], [6, -6]);
  const rotateY = useTransform(x, [-60, 60], [-6, 6]);

  function handleMouseMove(e) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  }
  function handleMouseLeave() {
    x.set(0);
    y.set(0);
    setHovered(false);
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 24, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.34, 1.2, 0.64, 1] }}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="group relative cursor-pointer"
    >
      {/* Glow shadow */}
      <motion.div
        className="absolute inset-0 rounded-3xl -z-10"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ background: theme.glow, filter: 'blur(16px)', transform: 'translateY(8px) scale(0.9)' }}
      />

      {/* Card body */}
      <div
        className="relative rounded-3xl overflow-hidden border border-white/80"
        style={{ background: theme.bg, boxShadow: hovered ? `0 16px 48px ${theme.glow}` : '0 1px 8px rgba(0,0,0,0.06)' }}
      >
        {/* Decorative mesh circle */}
        <div
          className="absolute -top-8 -right-8 w-28 h-28 rounded-full opacity-20 pointer-events-none"
          style={{ background: `radial-gradient(circle, ${theme.accent}, transparent 70%)` }}
        />
        <div
          className="absolute -bottom-6 -left-6 w-20 h-20 rounded-full opacity-10 pointer-events-none"
          style={{ background: `radial-gradient(circle, ${theme.accentAlt}, transparent 70%)` }}
        />

        <div className="relative p-4">
          {/* Top row */}
          <div className="flex items-start justify-between mb-3">
            {/* Icon badge */}
            <motion.div
              whileHover={{ rotate: [0, -8, 8, 0], scale: 1.1 }}
              transition={{ duration: 0.4 }}
              className="w-11 h-11 rounded-2xl flex items-center justify-center shadow-sm"
              style={{ backgroundColor: `${theme.accent}20`, border: `1.5px solid ${theme.accent}30` }}
            >
              <Icon size={20} style={{ color: theme.accent }} strokeWidth={1.8} />
            </motion.div>

            {/* Category tag */}
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${theme.tag}`}>
              {theme.label}
            </span>
          </div>

          {/* Name */}
          <h3
            className="font-semibold text-stone-800 leading-tight mb-0.5"
            style={{ fontSize: '14px', fontFamily: 'var(--font-body)' }}
          >
            {project.name}
          </h3>

          {/* Task step dots */}
          <div className="flex items-center justify-between mb-3 mt-2">
            <StepDots done={project.completed} total={project.taskCount} color={theme.accent} />
            <span className="text-[10px] text-stone-400 font-medium">{remaining} left</span>
          </div>

          {/* Progress arc + bar row */}
          <div className="flex items-center gap-3">
            {/* Arc */}
            <ArcProgress pct={progress} color={theme.accent} colorAlt={theme.accentAlt} size={52} />

            {/* Right side: bar + team */}
            <div className="flex-1 min-w-0">
              {/* Thin segmented bar */}
              <div className="h-1.5 bg-stone-100 rounded-full overflow-hidden mb-2.5">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: `linear-gradient(90deg, ${theme.accent}, ${theme.accentAlt})` }}
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1.2, delay: index * 0.1 + 0.2, ease: [0.4, 0, 0.2, 1] }}
                />
              </div>

              {/* Team + deadline */}
              <div className="flex items-center justify-between">
                <Avatars count={avatarCount} />
                <span className="text-[10px] text-stone-400">Jun '26</span>
              </div>
            </div>
          </div>
        </div>

        {/* Hover reveal action bar */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.2 }}
              className="px-4 pb-4"
            >
              <motion.button
                whileTap={{ scale: 0.97 }}
                className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl text-[11px] font-semibold"
                style={{
                  backgroundColor: `${theme.accent}18`,
                  color: theme.accent,
                  border: `1px solid ${theme.accent}30`,
                }}
              >
                <CheckCircle2 size={12} strokeWidth={2} />
                Open Project
                <ArrowUpRight size={11} />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
