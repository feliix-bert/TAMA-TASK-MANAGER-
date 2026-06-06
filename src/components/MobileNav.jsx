import { LayoutDashboard, CheckSquare, FolderOpen, Calendar, Timer } from 'lucide-react';
import { AnimatedPlus, AnimatedNavItem } from './AnimatedIcons';

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Home',     Icon: LayoutDashboard },
  { id: 'tasks',     label: 'Tasks',    Icon: CheckSquare },
  null, // center add button placeholder
  { id: 'calendar',  label: 'Calendar', Icon: Calendar },
  { id: 'focus',     label: 'Focus',    Icon: Timer },
];

export default function MobileNav({ activeNav, onNavChange, onAddTask }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-stone-200">
      <div className="flex items-center justify-around px-2 pt-2 pb-3 max-w-lg mx-auto">
        {NAV_ITEMS.map((item, idx) => {
          if (!item) {
            /* Floating Add button in center */
            return (
              <div key="add" className="flex flex-col items-center gap-1 -mt-6">
                <button
                  onClick={onAddTask}
                  className="w-12 h-12 rounded-full bg-violet-600 flex items-center justify-center shadow-lg shadow-violet-200 hover:bg-violet-700 border-4 border-white"
                >
                  <AnimatedPlus isOpen={false} size={22} className="text-white" />
                </button>
                <span className="text-[9px] text-stone-400 font-medium">Add</span>
              </div>
            );
          }

          const { Icon, label, id } = item;
          const isActive = activeNav === id;

          return (
            <AnimatedNavItem
              key={id}
              isActive={isActive}
              onClick={() => onNavChange(id)}
              className="flex flex-col items-center gap-1 min-w-[48px]"
            >
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${isActive ? 'bg-amber-100' : ''}`}>
                <Icon
                  size={18}
                  className={isActive ? 'text-amber-700' : 'text-stone-400'}
                  strokeWidth={isActive ? 2.2 : 1.8}
                />
              </div>
              <span className={`text-[9px] font-medium ${isActive ? 'text-amber-700' : 'text-stone-400'}`}>{label}</span>
            </AnimatedNavItem>
          );
        })}
      </div>
    </nav>
  );
}
