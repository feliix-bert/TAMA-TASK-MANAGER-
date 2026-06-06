import { CalendarDays, MoreHorizontal } from 'lucide-react';
import { AnimatedCheckbox, AnimatedTrash, AnimatedMoreDots } from './AnimatedIcons';

/* Colored mini app-icon squares using lucide-friendly styling */
function DocIcon() {
  return (
    <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: '#E8F0FE' }}>
      <svg viewBox="0 0 20 20" className="w-4 h-4">
        <rect x="4" y="2" width="12" height="16" rx="2" fill="#4285F4"/>
        <rect x="7" y="6" width="6" height="1.2" rx="0.6" fill="white"/>
        <rect x="7" y="9" width="6" height="1.2" rx="0.6" fill="white"/>
        <rect x="7" y="12" width="4" height="1.2" rx="0.6" fill="white"/>
      </svg>
    </div>
  );
}

function SheetIcon() {
  return (
    <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: '#E6F4EA' }}>
      <svg viewBox="0 0 20 20" className="w-4 h-4">
        <rect x="3" y="2" width="14" height="16" rx="2" fill="#0F9D58"/>
        <line x1="3" y1="7" x2="17" y2="7" stroke="white" strokeWidth="1"/>
        <line x1="3" y1="12" x2="17" y2="12" stroke="white" strokeWidth="1"/>
        <line x1="10" y1="2" x2="10" y2="18" stroke="white" strokeWidth="1"/>
      </svg>
    </div>
  );
}

function DriveIcon() {
  return (
    <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: '#FEF8E7' }}>
      <svg viewBox="0 0 20 20" className="w-4 h-4">
        <path d="M2 15 L7 6 L10 11 L5 15 Z" fill="#4285F4"/>
        <path d="M10 11 L13 6 L18 15 H13 Z" fill="#34A853"/>
        <path d="M7 6 L10 2 L13 6 Z" fill="#FBBC04"/>
      </svg>
    </div>
  );
}

const TYPE_ICONS = { doc: DocIcon, sheet: SheetIcon, drive: DriveIcon };

const PRIORITY = {
  High:   { color: 'text-red-500',    bg: 'bg-red-50'     },
  Medium: { color: 'text-orange-500', bg: 'bg-orange-50'  },
  Low:    { color: 'text-emerald-500',bg: 'bg-emerald-50' },
};

function Avatar() {
  return (
    <div className="w-7 h-7 rounded-full overflow-hidden border-2 border-stone-200 bg-stone-100 shrink-0">
      <svg viewBox="0 0 28 28" className="w-full h-full">
        <circle cx="14" cy="14" r="14" fill="#E8E5DD"/>
        <circle cx="14" cy="11" r="4.5" fill="#A89880"/>
        <ellipse cx="14" cy="24" rx="8" ry="6" fill="#A89880"/>
      </svg>
    </div>
  );
}

export default function TaskItem({ task, onToggle, onDelete }) {
  const p = PRIORITY[task.priority] || PRIORITY.Low;
  const TypeIcon = TYPE_ICONS[task.type] || DocIcon;

  return (
    <div className={`flex items-center gap-3 px-2 py-3 group hover:bg-stone-50 rounded-xl border border-transparent hover:border-stone-100 ${task.completed ? 'opacity-50' : ''}`}>

      {/* Animated checkbox — draws stroke on complete */}
      <AnimatedCheckbox
        checked={task.completed}
        onToggle={() => onToggle(task.id)}
        size={18}
      />

      {/* App type icon */}
      <TypeIcon />

      {/* Title + project */}
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium text-stone-800 truncate ${task.completed ? 'line-through text-stone-400' : ''}`}>
          {task.title}
        </p>
        <p className="text-[11px] text-stone-400 truncate flex items-center gap-1 mt-0.5">
          <span className="w-1.5 h-1.5 rounded-full shrink-0 inline-block" style={{ backgroundColor: task.projectColor }} />
          {task.project}
        </p>
      </div>

      {/* Due date with lucide CalendarDays icon */}
      <div className="hidden sm:flex items-center gap-1 text-[11px] text-stone-400 shrink-0 w-20">
        <CalendarDays size={12} className="text-stone-300 shrink-0" />
        {task.dueDate}
      </div>

      {/* Priority badge */}
      <div className={`hidden sm:flex items-center gap-1 text-[11px] font-semibold px-2 py-1 rounded-lg shrink-0 ${p.bg} ${p.color}`}>
        <span>↑</span>
        <span>{task.priority}</span>
      </div>

      {/* Avatar */}
      <Avatar />

      {/* Animated three-dot (shake on hover as "delete warning") */}
      <AnimatedTrash onClick={() => onDelete(task.id)} size={13} />
    </div>
  );
}
