import {
  LayoutDashboard, CheckSquare, FolderOpen, Calendar,
  Star, FileText, BookOpen, BarChart2, Users, Settings,
} from 'lucide-react';
import { AnimatedNavItem } from './AnimatedIcons';

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

function NotebookHoles() {
  return (
    <div className="absolute right-0 top-0 bottom-0 flex flex-col justify-around items-end pointer-events-none">
      {Array.from({ length: 14 }).map((_, i) => (
        <div key={i} className="w-px h-3 bg-stone-200" />
      ))}
    </div>
  );
}

export default function Sidebar({ activeNav, onNavChange }) {
  return (
    <aside className="relative w-[185px] shrink-0 h-screen flex flex-col bg-white border-r border-stone-200">
      <NotebookHoles />
      <div className="flex flex-col h-full px-3 py-5 gap-5">

        {/* Brand */}
        <div className="px-2">
          <span
            className="text-[28px] font-bold tracking-tight text-stone-900 leading-none block"
            style={{ fontFamily: "'Caveat', cursive" }}
          >
            TAMA
          </span>
          <svg width="80" height="6" viewBox="0 0 80 6" className="mt-0.5 ml-0.5">
            <path d="M2 4 Q20 1 40 3 Q60 5 78 3" stroke="#F5A623" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
          </svg>
          <p className="text-[10px] text-stone-400 font-medium tracking-widest uppercase mt-1 ml-0.5">
            Task Manager
          </p>
        </div>

        {/* Nav */}
        <nav className="flex flex-col gap-0.5 flex-1">
          {NAV_ITEMS.map(({ id, label, Icon }) => {
            const isActive = activeNav === id;
            return (
              <AnimatedNavItem
                key={id}
                isActive={isActive}
                onClick={() => onNavChange(id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-left ${
                  isActive
                    ? 'bg-amber-100 text-stone-800'
                    : 'text-stone-500 hover:bg-stone-100 hover:text-stone-700'
                }`}
              >
                <Icon
                  size={17}
                  className={isActive ? 'text-stone-700' : 'text-stone-400'}
                  strokeWidth={isActive ? 2.2 : 1.8}
                />
                <span>{label}</span>
                {isActive && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                )}
              </AnimatedNavItem>
            );
          })}
        </nav>

        {/* Sticky note */}
        <div className="mx-1 rounded-xl bg-violet-100 border border-violet-200 p-3 relative">
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-amber-300 border border-amber-400 shadow-sm" />
          <p className="text-stone-600 leading-snug" style={{ fontFamily: "'Caveat', cursive", fontSize: '15px' }}>
            Focus on progress,<br />not perfection.
          </p>
          <p className="mt-1" style={{ fontFamily: "'Caveat', cursive", fontSize: '18px' }}>☺</p>
        </div>

        {/* Profile */}
        <div className="flex items-center gap-2.5 px-2 py-2 rounded-xl hover:bg-stone-50 cursor-pointer group">
          <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-stone-200 bg-stone-100 shrink-0">
            <svg viewBox="0 0 32 32" className="w-full h-full">
              <circle cx="16" cy="16" r="16" fill="#E8E5DD"/>
              <circle cx="16" cy="13" r="5" fill="#A89880"/>
              <ellipse cx="16" cy="27" rx="9" ry="7" fill="#A89880"/>
            </svg>
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-stone-700 truncate">Rafli Alfarezi</p>
            <p className="text-[10px] text-stone-400 truncate">rafli@email.com</p>
          </div>
          <Settings size={12} className="ml-auto text-stone-300 group-hover:text-stone-500" />
        </div>
      </div>
    </aside>
  );
}
