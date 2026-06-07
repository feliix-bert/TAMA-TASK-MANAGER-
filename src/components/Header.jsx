import { useState } from 'react';
import { AnimatedBell, AnimatedSearch } from './AnimatedIcons';

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

export default function Header({ searchQuery, onSearchChange }) {
  const [focused, setFocused] = useState(false);

  return (
    <header className="flex items-start justify-between px-6 pt-5 pb-3 shrink-0">
      {/* Greeting */}
      <div>
        <h1
          className="text-stone-900 leading-tight"
          style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 400 }}
        >
          {getGreeting()}, Rafli! ☀️
        </h1>
        <div className="relative inline-block mt-0.5">
          <p className="text-sm text-stone-500 pb-1">Let's get your tasks done today!</p>
          <svg className="absolute -bottom-0.5 left-0 w-full" height="5" viewBox="0 0 220 5" preserveAspectRatio="none">
            <path
              d="M2 3.5 Q20 1 40 3 Q60 5 80 3 Q100 1 120 3 Q140 5 160 3 Q180 1 200 3 Q210 4 218 3"
              stroke="#7C6FF7" strokeWidth="2" fill="none" strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3 mt-1">
        {/* Search with AnimatedSearch icon */}
        <div className={`relative hidden sm:flex items-center transition-all ${focused ? 'ring-2 ring-violet-200' : ''} rounded-xl`}>
          <div className="absolute left-3">
            <AnimatedSearch size={14} focused={focused} className="text-stone-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={e => onSearchChange(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="Search tasks, projects..."
            className="pl-8 pr-16 py-2 text-sm bg-white border border-stone-200 rounded-xl text-stone-700 placeholder:text-stone-300 focus:outline-none focus:border-violet-300 w-60"
          />
          <span className="absolute right-3 text-[10px] text-stone-300 font-mono bg-stone-50 px-1.5 py-0.5 rounded border border-stone-200">
            ⌘K
          </span>
        </div>

        {/* AnimatedBell with wiggle + badge */}
        <button className="w-9 h-9 rounded-xl bg-white border border-stone-200 flex items-center justify-center hover:border-stone-300">
          <AnimatedBell count={3} size={16} />
        </button>
      </div>
    </header>
  );
}
