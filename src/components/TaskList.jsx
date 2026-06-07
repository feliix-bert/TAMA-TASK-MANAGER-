import { useState } from 'react';
import { Filter, MoreHorizontal } from 'lucide-react';
import TaskItem from './TaskItem';
import { AnimatedPlus, AnimatedTabPill, AnimatedFilterButton, AnimatedCard } from './AnimatedIcons';

const TABS = ['All Tasks', 'Today', 'This Week', 'Important'];

function filterTasks(tasks, tab, search) {
  let list = tasks;
  if (search) {
    const q = search.toLowerCase();
    list = list.filter(t => t.title.toLowerCase().includes(q) || t.project.toLowerCase().includes(q));
  }
  if (tab === 'Today')     list = list.filter(t => !t.completed);
  if (tab === 'This Week') list = list.filter(t => t.status !== 'completed');
  if (tab === 'Important') list = list.filter(t => t.priority === 'High');
  return list;
}

export default function TaskList({ tasks, searchQuery, onToggle, onDelete, onAdd }) {
  const [activeTab, setActiveTab] = useState('All Tasks');
  const [showForm, setShowForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [showAll, setShowAll] = useState(false);

  const filtered  = filterTasks(tasks, activeTab, searchQuery);
  const displayed = showAll ? filtered : filtered.slice(0, 5);

  function handleAdd(e) {
    e.preventDefault();
    if (!newTitle.trim()) return;
    onAdd(newTitle.trim());
    setNewTitle('');
    setShowForm(false);
  }

  return (
    <section>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-stone-900" style={{ fontFamily: 'var(--font-display)', fontSize: '22px' }}>
          My Tasks
        </h2>
        <div className="flex items-center gap-2">
          {/* Filter button — animated hover */}
          <AnimatedFilterButton
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-500 bg-white border border-stone-200 rounded-lg hover:border-stone-300"
          >
            <Filter size={12} /> Filter
          </AnimatedFilterButton>

          {/* Add Task — Plus rotates to X */}
          <AnimatedFilterButton
            onClick={() => setShowForm(f => !f)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-violet-600 rounded-lg hover:bg-violet-700 shadow-sm"
          >
            <AnimatedPlus isOpen={showForm} size={14} />
            Add Task
          </AnimatedFilterButton>

          <button className="w-7 h-7 flex items-center justify-center text-stone-400 hover:text-stone-600 rounded-lg hover:bg-white">
            <MoreHorizontal size={16} />
          </button>
        </div>
      </div>

      {/* Animated tab pills with layout transition */}
      <div className="flex items-center gap-1 mb-3">
        {TABS.map(tab => (
          <AnimatedTabPill
            key={tab}
            active={activeTab === tab}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </AnimatedTabPill>
        ))}
      </div>

      {/* Add task inline form */}
      {showForm && (
        <form onSubmit={handleAdd} className="flex items-center gap-2 px-3 py-2.5 mb-2 bg-violet-50 border border-violet-200 rounded-xl">
          <span className="text-violet-400 text-sm">✏️</span>
          <input
            autoFocus
            type="text"
            value={newTitle}
            onChange={e => setNewTitle(e.target.value)}
            placeholder="Type task name and press Enter…"
            className="flex-1 text-sm bg-transparent outline-none text-stone-700 placeholder:text-violet-300"
          />
          <button type="submit" className="text-xs font-semibold text-violet-600 hover:text-violet-800 px-2">Add</button>
          <button type="button" onClick={() => setShowForm(false)} className="text-xs text-stone-400 hover:text-stone-600">✕</button>
        </form>
      )}

      {/* Divider */}
      <div className="h-px bg-stone-100 mb-1" />

      {/* Task list */}
      <div className="divide-y divide-stone-100">
        {displayed.length === 0 ? (
          <div className="text-center py-10 text-stone-300">
            <p className="text-4xl mb-2">📭</p>
            <p className="text-sm">No tasks found</p>
          </div>
        ) : (
          displayed.map(task => (
            <TaskItem key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} />
          ))
        )}
      </div>

      {/* View all */}
      {filtered.length > 5 && (
        <AnimatedFilterButton
          onClick={() => setShowAll(s => !s)}
          className="flex items-center justify-center gap-1 w-full text-xs text-stone-400 hover:text-violet-600 py-3 mt-1"
        >
          {showAll ? 'Show less ↑' : `View all tasks (${filtered.length}) ↓`}
        </AnimatedFilterButton>
      )}
    </section>
  );
}
