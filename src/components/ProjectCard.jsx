import { useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'motion/react';
import {
  ArrowUpRight, Target, Code2, Palette, FlaskConical, CheckCircle2,
} from 'lucide-react';

/* ── Card themes — muted, editorial tones ─── */
const THEMES = [
  {
    accent: '#6D5FD5',
    bg: '#F7F5FF',
    border: '#E5E1FC',
    tag: { bg: '#EDE9FE', text: '#5B4FC4' },
    Icon: Code2,
    label: 'Dev',
  },
  {
    accent: '#C48B00',
    bg: '#FFFAEB',
    border: '#F5E6B0',
    tag: { bg: '#FEF3C7', text: '#92400E' },
    Icon: Palette,
    label: 'Design',
  },
  {
    accent: '#16A34A',
    bg: '#F0FDF4',
    border: '#BBF7D0',
    tag: { bg: '#DCFCE7', text: '#14532D' },
    Icon: FlaskConical,
    label: 'Research',
  },
  {
    accent: '#C94040',
    bg: '#FFF5F5',
    border: '#FEC9C9',
    tag: { bg: '#FFE4E6', text: '#9B1C1C' },
    Icon: Target,
    label: 'Goals',
  },
];

/* ── Arc progress ring ─── */
function ArcProgress({ pct, color, size = 48 }) {
  const r = (size / 2) - 5;
  const circ = 2 * Math.PI * r;
  const cx = size / 2;
  const cy = size / 2;

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full -rotate-90">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="4" />
        <motion.circle
          cx={cx} cy={cy} r={r} fill="none"
          stroke={color}
          strokeWidth="4" strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: circ * (1 - pct / 100) }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-[11px] font-semibold" style={{ color }}>{pct}%</span>
      </div>
    </div>
  );
}

/* ── Avatar row ─── */
function Avatars({ count, accent }) {
  const n = Math.min(count, 3);
  return (
    <div className="flex items-center">
      {Array.from({ length: n }).map((_, i) => (
        <div
          key={i}
          className="w-5 h-5 rounded-full border-2 border-white flex items-center justify-center text-[7px] font-bold text-white shrink-0"
          style={{ backgroundColor: accent, marginLeft: i > 0 ? '-5px' : 0, opacity: 1 - i * 0.2 }}
        >
          {String.fromCharCode(65 + i)}
        </div>
      ))}
    </div>
  );
}

/* ── Step dots ─── */
function StepDots({ done, total, color }) {
  const capped = Math.min(total, 5);
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: capped }).map((_, i) => (
        <div
          key={i}
          className="rounded-full transition-all duration-300"
          style={{
            width: i < done ? 10 : 5,
            height: 5,
            backgroundColor: i < done ? color : 'rgba(0,0,0,0.1)',
          }}
        />
      ))}
      {total > capped && (
        <span className="text-[9px] text-stone-400 ml-0.5">+{total - capped}</span>
      )}
    </div>
  );
}

export default function ProjectCard({ project, index }) {
  const theme = THEMES[index % THEMES.length];
  const { Icon } = theme;
  const progress = Math.round((project.completed / project.taskCount) * 100);
  const remaining = project.taskCount - project.completed;
  const avatarCount = (index % 3) + 2;

  const [hovered, setHovered] = useState(false);
  const cardRef = useRef(null);

  /* Gentle 3D tilt */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useTransform(my, [-40, 40], [4, -4]);
  const rotateY = useTransform(mx, [-40, 40], [-4, 4]);

  function onMove(e) {
    const r = cardRef.current?.getBoundingClientRect();
    if (!r) return;
    mx.set(e.clientX - r.left - r.width / 2);
    my.set(e.clientY - r.top - r.height / 2);
  }
  function onLeave() { mx.set(0); my.set(0); setHovered(false); }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
      style={{ rotateX, rotateY, transformPerspective: 700 }}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onLeave}
      className="relative cursor-pointer"
    >
      {/* Card */}
      <motion.div
        animate={{
          borderColor: hovered ? theme.border : '#E7E5E4',
          boxShadow: hovered
            ? `0 8px 24px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)`
            : `0 1px 4px rgba(0,0,0,0.04)`,
        }}
        transition={{ duration: 0.2 }}
        className="rounded-2xl overflow-hidden border bg-white"
      >
        {/* Colored top strip — very thin */}
        <div className="h-0.5 w-full" style={{ backgroundColor: theme.accent }} />

        <div className="p-4">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: theme.bg }}
            >
              <Icon size={17} style={{ color: theme.accent }} strokeWidth={1.8} />
            </div>
            <span
              className="text-[10px] font-semibold px-2 py-0.5 rounded-md"
              style={{ backgroundColor: theme.tag.bg, color: theme.tag.text }}
            >
              {theme.label}
            </span>
          </div>

          {/* Name */}
          <p className="text-[13px] font-semibold text-stone-800 leading-snug mb-2 truncate">
            {project.name}
          </p>

          {/* Step dots */}
          <div className="flex items-center justify-between mb-3">
            <StepDots done={project.completed} total={project.taskCount} color={theme.accent} />
            <span className="text-[10px] text-stone-400">{remaining} left</span>
          </div>

          {/* Progress + avatars row */}
          <div className="flex items-center gap-2">
            <ArcProgress pct={progress} color={theme.accent} size={44} />
            <div className="flex-1 min-w-0">
              {/* Bar */}
              <div className="h-1 bg-stone-100 rounded-full overflow-hidden mb-2">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: theme.accent }}
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1.0, delay: index * 0.08 + 0.2, ease: [0.4, 0, 0.2, 1] }}
                />
              </div>
              {/* Avatars + date */}
              <div className="flex items-center justify-between">
                <Avatars count={avatarCount} accent={theme.accent} />
                <span className="text-[9px] text-stone-400">Jun '26</span>
              </div>
            </div>
          </div>
        </div>

        {/* Hover action */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              className="overflow-hidden"
            >
              <div className="px-4 pb-3">
                <button
                  className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-[11px] font-medium transition-colors duration-150"
                  style={{ backgroundColor: theme.bg, color: theme.accent }}
                >
                  <CheckCircle2 size={11} />
                  Open Project
                  <ArrowUpRight size={10} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
