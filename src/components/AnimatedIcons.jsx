/**
 * AnimatedIcons.jsx
 * ─────────────────────────────────────────────────────────────
 * Centralized animated icon components built on:
 *   - lucide-react  → base SVG icon shapes
 *   - motion/react  → smooth animations
 *
 * Usage philosophy:
 *   • Static icon  → straight lucide-react import, no wrapper
 *   • Animated icon → component from this file, animates on hover/state
 *
 * Animations used per context:
 *   Bell         → wiggle/ring on notification, pulse on active
 *   CheckSquare  → stroke draw on completion
 *   Timer/Clock  → rotation on active focus
 *   Plus         → rotate 45° to X on open
 *   Search       → pulse on focus
 *   Flag         → wave on pending
 *   CheckCircle  → draw stroke on complete
 *   Star         → spin + scale on priority
 *   Trash        → shake on hover
 *   ChevronDown  → rotate smoothly
 *   Loader       → continuous spin (loading states)
 * ─────────────────────────────────────────────────────────────
 */

import { motion, useAnimation, AnimatePresence } from 'motion/react';
import {
  Bell, BellRing,
  CheckSquare, CheckCircle2,
  Timer, Clock,
  Plus, X,
  Search,
  Flag,
  Star,
  Trash2,
  ChevronDown, ChevronUp,
  Loader2,
  RotateCcw,
  Play, Pause,
  MoreHorizontal,
  ArrowUpRight,
  Sparkles,
  Zap,
  TrendingUp,
} from 'lucide-react';
import { useState } from 'react';

/* ─── Reusable motion wrapper ─────────────────────────────── */
const M = motion.div;

/* ─── 1. AnimatedBell ─────────────────────────────────────── */
// Wiggles when there are unread notifications
export function AnimatedBell({ count = 0, size = 16, className = '' }) {
  const [ringing, setRinging] = useState(false);

  return (
    <motion.div
      className={`relative cursor-pointer ${className}`}
      onHoverStart={() => setRinging(true)}
      onHoverEnd={() => setRinging(false)}
      animate={ringing || count > 0 ? {
        rotate: [0, -15, 15, -12, 12, -8, 8, 0],
        transformOrigin: 'top center',
      } : { rotate: 0 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      {count > 0 ? (
        <BellRing size={size} className="text-stone-500" />
      ) : (
        <Bell size={size} className="text-stone-500" />
      )}
      {count > 0 && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-400 text-white text-[9px] font-bold rounded-full flex items-center justify-center"
        >
          {count}
        </motion.span>
      )}
    </motion.div>
  );
}

/* ─── 2. AnimatedCheckbox ─────────────────────────────────── */
// Draws a checkmark stroke on completion
export function AnimatedCheckbox({ checked, onToggle, size = 18 }) {
  return (
    <motion.button
      onClick={onToggle}
      whileTap={{ scale: 0.85 }}
      className={`w-[${size}px] h-[${size}px] rounded-[4px] border-2 flex items-center justify-center shrink-0 ${
        checked
          ? 'bg-violet-600 border-violet-600'
          : 'border-stone-300 hover:border-violet-400 bg-white'
      }`}
      style={{ width: size, height: size }}
    >
      <AnimatePresence>
        {checked && (
          <motion.svg
            key="check"
            viewBox="0 0 10 10"
            style={{ width: size * 0.6, height: size * 0.6 }}
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.4 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          >
            <motion.path
              d="M2 5 L4.2 7.2 L8 3"
              stroke="white"
              strokeWidth="1.6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            />
          </motion.svg>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

/* ─── 3. AnimatedPlus ─────────────────────────────────────── */
// Rotates to X when active (add task toggle)
export function AnimatedPlus({ isOpen, size = 14, className = '' }) {
  return (
    <motion.div
      animate={{ rotate: isOpen ? 45 : 0 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={`flex items-center justify-center ${className}`}
    >
      <Plus size={size} />
    </motion.div>
  );
}

/* ─── 4. AnimatedSearch ───────────────────────────────────── */
// Gentle pulse on focus
export function AnimatedSearch({ size = 14, focused = false, className = '' }) {
  return (
    <motion.div
      animate={focused ? { scale: 1.15, opacity: 1 } : { scale: 1, opacity: 0.6 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className={`flex items-center justify-center ${className}`}
    >
      <Search size={size} />
    </motion.div>
  );
}

/* ─── 5. AnimatedTimer ────────────────────────────────────── */
// Clock hands spin while timer is running
export function AnimatedTimer({ running = false, size = 16, className = '' }) {
  return (
    <motion.div
      animate={running ? { rotate: 360 } : { rotate: 0 }}
      transition={running
        ? { duration: 4, repeat: Infinity, ease: 'linear' }
        : { duration: 0.3 }
      }
      className={`flex items-center justify-center ${className}`}
    >
      <Timer size={size} />
    </motion.div>
  );
}

/* ─── 6. AnimatedRotateReset ──────────────────────────────── */
// Spins 360° on click (reset button)
export function AnimatedRotateReset({ onClick, size = 14, className = '' }) {
  const controls = useAnimation();

  async function handleClick() {
    await controls.start({ rotate: -360, transition: { duration: 0.5, ease: 'easeInOut' } });
    controls.set({ rotate: 0 });
    onClick?.();
  }

  return (
    <motion.button
      onClick={handleClick}
      animate={controls}
      whileTap={{ scale: 0.9 }}
      className={`w-8 h-8 rounded-lg border border-stone-200 flex items-center justify-center text-stone-400 hover:text-stone-700 hover:border-stone-300 hover:bg-stone-50 transition-colors duration-150 ${className}`}
    >
      <RotateCcw size={size} />
    </motion.button>
  );
}

/* ─── 7. AnimatedPlayPause ────────────────────────────────── */
// Smooth icon swap between play and pause
export function AnimatedPlayPause({ running, onToggle, className = '' }) {
  return (
    <motion.button
      onClick={onToggle}
      whileTap={{ scale: 0.97 }}
      animate={{ backgroundColor: running ? '#44403C' : '#1C1917' }}
      transition={{ duration: 0.25 }}
      className={`w-full flex items-center justify-center gap-1.5 py-2 text-white text-[12px] font-medium rounded-lg ${className}`}
    >
      <AnimatePresence mode="wait">
        {running ? (
          <motion.div
            key="pause"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.12 }}
            className="flex items-center gap-1.5"
          >
            <Pause size={12} /> Pause
          </motion.div>
        ) : (
          <motion.div
            key="play"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.12 }}
            className="flex items-center gap-1.5"
          >
            <Play size={12} fill="white" /> Start Focus
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

/* ─── 8. AnimatedStar ─────────────────────────────────────── */
// Scales up and spins briefly on priority toggle
export function AnimatedStar({ filled = false, size = 16, className = '' }) {
  return (
    <motion.div
      animate={filled ? { scale: [1, 1.4, 1], rotate: [0, 20, -10, 0] } : { scale: 1, rotate: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={`flex items-center justify-center ${className}`}
    >
      <Star size={size} className={filled ? 'text-amber-400 fill-amber-400' : 'text-stone-400'} />
    </motion.div>
  );
}

/* ─── 9. AnimatedTrash ────────────────────────────────────── */
// Shakes on hover as a delete warning cue
export function AnimatedTrash({ onClick, size = 14, className = '' }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ x: [0, -2, 2, -2, 2, 0], transition: { duration: 0.35 } }}
      whileTap={{ scale: 0.9 }}
      className={`w-6 h-6 flex items-center justify-center text-stone-300 hover:text-red-400 rounded-lg hover:bg-red-50 ${className}`}
    >
      <Trash2 size={size} />
    </motion.button>
  );
}

/* ─── 10. AnimatedChevron ─────────────────────────────────── */
// Smooth chevron rotation for expand/collapse
export function AnimatedChevron({ open, size = 14, className = '' }) {
  return (
    <motion.div
      animate={{ rotate: open ? 180 : 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className={`flex items-center justify-center ${className}`}
    >
      <ChevronDown size={size} />
    </motion.div>
  );
}

/* ─── 11. AnimatedLoader ──────────────────────────────────── */
// Continuous spin for loading states
export function AnimatedLoader({ size = 16, className = '' }) {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      className={className}
    >
      <Loader2 size={size} />
    </motion.div>
  );
}

/* ─── 12. AnimatedTrendBadge ──────────────────────────────── */
// Counts up the trend number with a slide-in entrance
export function AnimatedTrendBadge({ up, change, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.3 }}
      className={`flex items-center gap-1 ${className}`}
    >
      <motion.span
        animate={up ? { y: [0, -2, 0] } : { y: [0, 2, 0] }}
        transition={{ duration: 0.6, delay: 0.4, ease: 'easeInOut' }}
      >
        {up ? <TrendingUp size={10} className="text-emerald-500" /> : <TrendingUp size={10} className="text-red-400 rotate-180" />}
      </motion.span>
      <span className={`text-xs font-semibold ${up ? 'text-emerald-500' : 'text-red-400'}`}>
        {up ? '+' : '-'}{change}
      </span>
      <span className="text-[10px] text-stone-400">from last week</span>
    </motion.div>
  );
}

/* ─── 13. AnimatedStatIcon ────────────────────────────────── */
// Icon box with spring entrance + idle float animation
export function AnimatedStatIcon({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20, delay }}
    >
      {children}
    </motion.div>
  );
}

/* ─── 14. AnimatedFilterButton ────────────────────────────── */
export function AnimatedFilterButton({ onClick, children, className = '' }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.03, y: -1 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className={className}
    >
      {children}
    </motion.button>
  );
}

/* ─── 15. AnimatedNavItem ─────────────────────────────────── */
// Sidebar nav item with active indicator slide
export function AnimatedNavItem({ isActive, onClick, children, className = '' }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={!isActive ? { x: 3 } : {}}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={className}
    >
      {children}
    </motion.button>
  );
}

/* ─── 16. AnimatedMoreDots ────────────────────────────────── */
// Three-dot menu — pulses on hover
export function AnimatedMoreDots({ onClick, className = '' }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
      className={`opacity-0 group-hover:opacity-100 w-6 h-6 flex items-center justify-center text-stone-400 hover:text-stone-600 rounded-lg hover:bg-stone-100 shrink-0 ${className}`}
    >
      <MoreHorizontal size={14} />
    </motion.button>
  );
}

/* ─── 17. AnimatedZapStat ─────────────────────────────────── */
// Quick zap entrance animation for stat values
export function AnimatedStatValue({ value, accent }) {
  return (
    <motion.div
      className="relative inline-block mb-3"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.1 }}
    >
      <span
        className="text-4xl font-bold leading-none"
        style={{ fontFamily: 'var(--font-display)', color: accent }}
      >
        {value}
      </span>
      {/* Hand-drawn underline */}
      <svg className="absolute -bottom-1 left-0 w-full" height="4" viewBox="0 0 50 4" preserveAspectRatio="none">
        <motion.path
          d="M2 3 Q12 1 25 2.5 Q38 4 48 2"
          stroke={accent}
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
        />
      </svg>
    </motion.div>
  );
}

/* ─── 18. AnimatedCard ────────────────────────────────────── */
// Generic card with hover lift effect
export function AnimatedCard({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={{ y: -2, boxShadow: '0 8px 24px rgba(0,0,0,0.06)' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── 19. AnimatedTabPill ─────────────────────────────────── */
// Tab switch with layout transition
export function AnimatedTabPill({ active, onClick, children }) {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.96 }}
      className={`relative px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
        active ? 'text-white' : 'text-stone-500 hover:text-stone-700 hover:bg-stone-100'
      }`}
    >
      {active && (
        <motion.div
          layoutId="activeTab"
          className="absolute inset-0 bg-stone-800 rounded-lg"
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        />
      )}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}

/* ─── 20. AnimatedIntegrationIcon ────────────────────────── */
// Scales on connect/disconnect toggle
export function AnimatedIntegrationIcon({ connected, onClick, children, label }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
      animate={connected ? { opacity: 1, filter: 'grayscale(0%)' } : { opacity: 0.5, filter: 'grayscale(80%)' }}
      transition={{ duration: 0.25 }}
      title={label}
      className="rounded-xl"
    >
      {children}
    </motion.button>
  );
}
