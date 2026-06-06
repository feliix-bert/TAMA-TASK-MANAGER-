import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import StatCard from './components/StatCard';
import TaskList from './components/TaskList';
import ProjectCard from './components/ProjectCard';
import CalendarWidget from './components/CalendarWidget';
import IntegrationWidget from './components/IntegrationWidget';
import FocusWidget from './components/FocusWidget';
import MobileNav from './components/MobileNav';
import { TASKS, PROJECTS, INTEGRATIONS, FOCUS_TASKS } from './data/sampleData';

const BASE_STATS = [
  { label: 'Total Tasks', change: '12%', up: true,  accent: '#7C6FF7' },
  { label: 'In Progress', change: '8%',  up: true,  accent: '#F5A623' },
  { label: 'Completed',   change: '20%', up: true,  accent: '#22C55E' },
  { label: 'Pending',     change: '5%',  up: false, accent: '#EAB308' },
];

export default function App() {
  const [activeNav, setActiveNav]       = useState('dashboard');
  const [tasks, setTasks]               = useState(TASKS);
  const [integrations, setIntegrations] = useState(INTEGRATIONS);
  const [searchQuery, setSearchQuery]   = useState('');
  const [showAddForm, setShowAddForm]   = useState(false);

  /* ── Task handlers ─────────────────────────────────── */
  function handleToggle(id) {
    setTasks(ts => ts.map(t =>
      t.id === id ? { ...t, completed: !t.completed, status: !t.completed ? 'completed' : 'todo' } : t
    ));
  }
  function handleDelete(id) {
    setTasks(ts => ts.filter(t => t.id !== id));
  }
  function handleAdd(title) {
    setTasks(ts => [{
      id: Date.now(), title,
      project: 'TAMA Project', projectColor: '#7C6FF7',
      dueDate: 'TBD', priority: 'Medium',
      status: 'todo', assignee: 'RA', completed: false,
      tags: [], type: 'doc',
    }, ...ts]);
  }
  function handleToggleIntegration(id) {
    setIntegrations(is => is.map(i => i.id === id ? { ...i, connected: !i.connected } : i));
  }

  /* ── Live stats ────────────────────────────────────── */
  const stats = [
    { ...BASE_STATS[0], value: tasks.length },
    { ...BASE_STATS[1], value: tasks.filter(t => t.status === 'in-progress' && !t.completed).length },
    { ...BASE_STATS[2], value: tasks.filter(t => t.completed).length },
    { ...BASE_STATS[3], value: tasks.filter(t => t.status === 'todo').length },
  ];

  /* ── Mobile section rendering ──────────────────────── */
  function MobileRightSidebar() {
    return (
      <div className="flex flex-col gap-4 mt-4">
        <CalendarWidget />
        <IntegrationWidget integrations={integrations} onToggle={handleToggleIntegration} />
        <FocusWidget focusTasks={FOCUS_TASKS} />
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: '#EDEBE4' }}>

      {/* ══ Desktop sidebar (hidden on mobile) ══ */}
      <div className="hidden md:block">
        <Sidebar activeNav={activeNav} onNavChange={setActiveNav} />
      </div>

      {/* ══ Main content area ══ */}
      <div className="flex flex-1 overflow-hidden">

        {/* Center column */}
        <main className="flex-1 overflow-y-auto flex flex-col min-w-0">
          <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />

          <div className="flex flex-col gap-4 px-4 md:px-6 pt-2 pb-24 md:pb-8">

            {/* Stat cards — 2 cols on mobile, 4 on desktop */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {stats.map((s, i) => (
                <StatCard key={s.label} stat={s} index={i} />
              ))}
            </div>

            {/* Task list card */}
            <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-4 md:p-5">
              <TaskList
                tasks={tasks}
                searchQuery={searchQuery}
                onToggle={handleToggle}
                onDelete={handleDelete}
                onAdd={handleAdd}
              />
            </div>

            {/* Projects section */}
            <section>
              <div className="flex items-center justify-between mb-3">
                <h2
                  className="text-stone-900"
                  style={{ fontFamily: "'Caveat', cursive", fontSize: '24px', fontWeight: 700 }}
                >
                  My Projects
                </h2>
                <button className="text-xs font-semibold text-violet-500 hover:text-violet-700 transition-colors">
                  View all
                </button>
              </div>
              {/* Horizontal scroll on mobile, grid on desktop */}
              <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1 md:grid md:grid-cols-4 md:overflow-visible md:pb-0">
                {PROJECTS.map((p, i) => (
                  <div key={p.id} className="shrink-0 w-40 md:w-auto">
                    <ProjectCard project={p} index={i} />
                  </div>
                ))}
              </div>
            </section>

            {/* Mobile: show right-sidebar widgets inline */}
            <div className="block lg:hidden">
              <MobileRightSidebar />
            </div>
          </div>
        </main>

        {/* ══ Right sidebar (desktop only, ≥ lg) ══ */}
        <aside className="hidden lg:flex w-[245px] shrink-0 flex-col gap-4 overflow-y-auto border-l border-stone-200 bg-[#F8F6F0] p-4">
          <CalendarWidget />
          <IntegrationWidget integrations={integrations} onToggle={handleToggleIntegration} />
          <FocusWidget focusTasks={FOCUS_TASKS} />
        </aside>
      </div>

      {/* ══ Mobile bottom nav ══ */}
      <div className="md:hidden">
        <MobileNav
          activeNav={activeNav}
          onNavChange={setActiveNav}
          onAddTask={() => setShowAddForm(true)}
        />
      </div>
    </div>
  );
}
