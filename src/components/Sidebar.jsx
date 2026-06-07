import { motion } from 'motion/react';
import {
  LayoutDashboard, CheckSquare, FolderOpen, Calendar,
  Star, FileText, BookOpen, BarChart2, Users, Settings,
} from 'lucide-react';

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard',  Icon: LayoutDashboard },
  { id: 'tasks',     label: 'My Tasks',   Icon: CheckSquare },
  { id: 'projects',  label: 'Projects',   Icon: FolderOpen },
  { id: 'calendar',  label: 'Calendar',   Icon: Calendar },
  { id: 'priority',  label: 'Priority',   Icon: Star },
  { id: 'notes',     label: 'Notes',      Icon: FileText },
  { id: 'focus',     label: 'Study Plan', Icon: BookOpen },
  { id: 'analytics', label: 'Analytics',  Icon: BarChart2 },
  { id: 'team',      label: 'Team',       Icon: Users },
  { id: 'settings',  label: 'Settings',   Icon: Settings },
];

export default function Sidebar({ activeNav, onNavChange }) {
  return (
    <aside className="relative w-[180px] shrink-0 h-screen flex flex-col bg-white border-r border-stone-100">

      {/* ── Brand ─── */}
      <div className="px-5 pt-6 pb-4 shrink-0">
        <div className="flex items-baseline gap-1.5">
          <span
            className="text-[22px] font-bold tracking-tight text-stone-900 leading-none"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            TAMA
          </span>
          <span className="text-[10px] text-stone-300 font-medium tracking-widest uppercase">v1</span>
        </div>
        <p className="text-[10px] text-stone-400 font-medium mt-1 tracking-wide">Task Manager</p>
      </div>

      {/* ── Divider ─── */}
      <div className="mx-4 h-px bg-stone-100 shrink-0" />

      {/* ── Nav ─── */}
      <nav className="flex-1 overflow-y-auto px-2.5 py-3 flex flex-col gap-0.5">
        {NAV_ITEMS.map(({ id, label, Icon }) => {
          const isActive = activeNav === id;
          return (
            <button
              key={id}
              onClick={() => onNavChange(id)}
              className="relative w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium text-left group"
            >
              {/* Sliding background pill — uses layoutId for smooth transition */}
              {isActive && (
                <motion.div
                  layoutId="sidebar-active-pill"
                  className="absolute inset-0 rounded-lg bg-stone-100"
                  transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                />
              )}

              {/* Hover background (only when not active) */}
              {!isActive && (
                <span className="absolute inset-0 rounded-lg bg-stone-50 opacity-0 group-hover:opacity-100 transition-opacity duration-150" />
              )}

              {/* Left accent bar for active */}
              {isActive && (
                <motion.div
                  layoutId="sidebar-accent-bar"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 rounded-full bg-stone-800"
                  transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                />
              )}

              {/* Icon */}
              <Icon
                size={15}
                className={`relative z-10 shrink-0 transition-colors duration-150 ${
                  isActive ? 'text-stone-800' : 'text-stone-400 group-hover:text-stone-600'
                }`}
                strokeWidth={isActive ? 2.2 : 1.8}
              />

              {/* Label */}
              <span className={`relative z-10 transition-colors duration-150 ${
                isActive ? 'text-stone-800' : 'text-stone-500 group-hover:text-stone-700'
              }`}>
                {label}
              </span>
            </button>
          );
        })}

        {/* ── Quote card ─── */}
        <div className="mx-1 mt-4 p-3 rounded-lg border border-stone-100 bg-stone-50 shrink-0">
          <p
            className="text-stone-500 leading-relaxed text-[12px]"
            style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic' }}
          >
            "Focus on progress,<br />not perfection."
          </p>
        </div>
      </nav>

      {/* ── Divider ─── */}
      <div className="mx-4 h-px bg-stone-100 shrink-0" />

      {/* ── Profile ─── */}
      <div className="shrink-0 px-2.5 py-3">
        <button className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:bg-stone-50 transition-colors duration-150 group">
          <div className="w-7 h-7 rounded-full overflow-hidden border border-stone-200 bg-stone-100 shrink-0">
            <svg viewBox="0 0 32 32" className="w-full h-full">
              <circle cx="16" cy="16" r="16" fill="#E8E5DD"/>
              <circle cx="16" cy="13" r="5" fill="#A89880"/>
              <ellipse cx="16" cy="27" rx="9" ry="7" fill="#A89880"/>
            </svg>
          </div>
          <div className="min-w-0">
            <p className="text-[12px] font-semibold text-stone-700 truncate">Felix</p>
            <p className="text-[10px] text-stone-400 truncate">felix@email.com</p>
          </div>
          <Settings size={11} className="text-stone-300 group-hover:text-stone-500 shrink-0 transition-colors duration-150" />
        </button>
      </div>
    </aside>
  );
}
