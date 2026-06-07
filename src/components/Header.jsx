import { useState } from 'react';
import { motion } from 'motion/react';
import { AnimatedBell, AnimatedSearch } from './AnimatedIcons';

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

function getDate() {
  return new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
}

export default function Header({ searchQuery, onSearchChange }) {
  const [focused, setFocused] = useState(false);

  return (
    <header className="flex items-center justify-between px-6 pt-5 pb-4 shrink-0 border-b border-stone-100">
      {/* Greeting */}
      <div>
        <h1
          className="text-stone-900 leading-tight"
          style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 400 }}
        >
          {getGreeting()}, Rafli.
        </h1>
        <p className="text-[12px] text-stone-400 font-medium mt-0.5 tracking-wide">
          {getDate()}
        </p>
      </div>

      {/* Right side controls */}
      <div className="flex items-center gap-2">
        {/* Search */}
        <div className="relative hidden sm:flex items-center">
          <div className="absolute left-3 pointer-events-none">
            <AnimatedSearch size={13} focused={focused} className="text-stone-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={e => onSearchChange(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="Search…"
            className={`pl-8 pr-12 py-1.5 text-[13px] bg-stone-50 border rounded-lg text-stone-700 placeholder:text-stone-300 focus:outline-none w-52 transition-all duration-200 ${
              focused
                ? 'border-stone-300 bg-white ring-2 ring-stone-100 w-64'
                : 'border-stone-200 hover:border-stone-300'
            }`}
          />
          <span className="absolute right-3 text-[10px] text-stone-300 font-mono">
            ⌘K
          </span>
        </div>

        {/* Bell */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-8 h-8 rounded-lg bg-white border border-stone-200 flex items-center justify-center hover:border-stone-300 transition-colors duration-150"
        >
          <AnimatedBell count={3} size={14} />
        </motion.button>
      </div>
    </header>
  );
}
