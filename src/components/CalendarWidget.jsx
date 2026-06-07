import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const DAYS_SHORT = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

function getDaysInMonth(y, m) { return new Date(y, m + 1, 0).getDate(); }
function getFirstDay(y, m) { return (new Date(y, m, 1).getDay() + 6) % 7; } // Mon=0

export default function CalendarWidget() {
  const today = new Date();
  const [cur, setCur] = useState({ y: today.getFullYear(), m: today.getMonth() });

  const daysInMonth = getDaysInMonth(cur.y, cur.m);
  const firstDay    = getFirstDay(cur.y, cur.m);
  const isCurrentMonth = cur.y === today.getFullYear() && cur.m === today.getMonth();
  const todayD = isCurrentMonth ? today.getDate() : -1;

  // sample marked dates (task deadlines)
  const marked = [3, 8, 14, 19, 25];

  function prev() {
    setCur(c => c.m === 0 ? { y: c.y - 1, m: 11 } : { y: c.y, m: c.m - 1 });
  }
  function next() {
    setCur(c => c.m === 11 ? { y: c.y + 1, m: 0 } : { y: c.y, m: c.m + 1 });
  }

  const cells = [...Array(firstDay).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];

  return (
    <div className="bg-white rounded-2xl border border-stone-100 p-4 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-stone-800" style={{ fontFamily: 'var(--font-display)', fontSize: '18px' }}>
          Calendar
        </h3>
        <div className="flex gap-0.5">
          <button onClick={prev} className="w-6 h-6 flex items-center justify-center text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-50">
            <ChevronLeft size={14} />
          </button>
          <button onClick={next} className="w-6 h-6 flex items-center justify-center text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-50">
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* Month label */}
      <p className="text-xs font-semibold text-stone-500 mb-3">
        {MONTHS[cur.m]} {cur.y}
      </p>

      {/* Day headers */}
      <div className="grid grid-cols-7 mb-1">
        {DAYS_SHORT.map(d => (
          <div key={d} className="text-[9px] text-stone-400 text-center font-semibold py-0.5">{d}</div>
        ))}
      </div>

      {/* Date cells */}
      <div className="grid grid-cols-7 gap-y-0.5">
        {cells.map((day, idx) => (
          <div key={idx} className="flex items-center justify-center">
            {day ? (
              <div className="relative flex items-center justify-center">
                <button
                  className={`w-7 h-7 text-[11px] rounded-full flex items-center justify-center font-medium transition-colors ${
                    day === todayD
                      ? 'bg-violet-600 text-white font-bold shadow-sm'
                      : 'text-stone-600 hover:bg-stone-100'
                  }`}
                >
                  {day}
                </button>
                {marked.includes(day) && day !== todayD && (
                  <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 flex gap-0.5">
                    <span className="w-1 h-1 rounded-full bg-violet-300" />
                    <span className="w-1 h-1 rounded-full bg-amber-300" />
                  </span>
                )}
              </div>
            ) : <div className="w-7 h-7" />}
          </div>
        ))}
      </div>
    </div>
  );
}
