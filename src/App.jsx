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
import IntroScreen from './components/IntroScreen';
import { TASKS, PROJECTS, INTEGRATIONS, FOCUS_TASKS } from './data/sampleData';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

const BASE_STATS = [
  { label: 'Total Tasks', change: '12%', up: true,  accent: '#7C6FF7' },
  { label: 'In Progress', change: '8%',  up: true,  accent: '#F5A623' },
  { label: 'Completed',   change: '20%', up: true,  accent: '#22C55E' },
  { label: 'Pending',     change: '5%',  up: false, accent: '#EAB308' },
];

export default function App() {
  const [introDone, setIntroDone]       = useState(false);
  const [activeNav, setActiveNav]       = useState('dashboard');
  const [tasks, setTasks]               = useState(TASKS);
  const [integrations, setIntegrations] = useState(INTEGRATIONS);
  const [searchQuery, setSearchQuery]   = useState('');

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
    <>
      {/* ── Intro screen ─────────────────────────────── */}
      <IntroScreen onComplete={() => setIntroDone(true)} />

      {/* ── Main app (fades in after intro) ──────────── */}
      <motion.div
        className="flex h-screen overflow-hidden"
        style={{ backgroundColor: '#EDEBE4' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: introDone ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* ── Desktop sidebar ── */}
        <div className="hidden md:block">
          <Sidebar activeNav={activeNav} onNavChange={setActiveNav} />
        </div>

        {/* ── Main content ── */}
        <div className="flex flex-1 overflow-hidden">

          {/* Center column */}
          <main className="flex-1 overflow-y-auto flex flex-col min-w-0">
            <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />

            <div className="flex flex-col gap-5 px-4 md:px-6 pt-2 pb-24 md:pb-8">

              {/* Stat cards */}
              <motion.div
                className="grid grid-cols-2 lg:grid-cols-4 gap-3"
                initial="hidden"
                animate="show"
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
              >
                {stats.map((s, i) => (
                  <StatCard key={s.label} stat={s} index={i} />
                ))}
              </motion.div>

              {/* Task list */}
              <motion.div
                className="bg-white rounded-3xl border border-stone-100 shadow-sm p-4 md:p-5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <TaskList
                  tasks={tasks}
                  searchQuery={searchQuery}
                  onToggle={handleToggle}
                  onDelete={handleDelete}
                  onAdd={handleAdd}
                />
              </motion.div>

              {/* Projects section */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2
                      className="text-stone-900 leading-tight"
                      style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 400 }}
                    >
                      My Projects
                    </h2>
                    <p className="text-xs text-stone-400 mt-0.5">{PROJECTS.length} active projects</p>
                  </div>
                  <motion.button
                    whileHover={{ x: 2 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-1 text-xs font-semibold text-violet-500 hover:text-violet-700 transition-colors"
                  >
                    View all <ArrowRight size={12} />
                  </motion.button>
                </div>

                {/* Grid — 2 cols on mobile, 4 on desktop */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  {PROJECTS.map((p, i) => (
                    <ProjectCard key={p.id} project={p} index={i} />
                  ))}
                </div>
              </motion.section>

              {/* Mobile: right sidebar widgets inline */}
              <div className="block lg:hidden">
                <MobileRightSidebar />
              </div>
            </div>
          </main>

          {/* ── Right sidebar (desktop) ── */}
          <aside className="hidden lg:flex w-[248px] shrink-0 flex-col gap-4 overflow-y-auto border-l border-stone-200 bg-[#F8F6F0] p-4">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.4 }}>
              <CalendarWidget />
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.5 }}>
              <IntegrationWidget integrations={integrations} onToggle={handleToggleIntegration} />
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.6 }}>
              <FocusWidget focusTasks={FOCUS_TASKS} />
            </motion.div>
          </aside>
        </div>

        {/* ── Mobile bottom nav ── */}
        <div className="md:hidden">
          <MobileNav
            activeNav={activeNav}
            onNavChange={setActiveNav}
            onAddTask={() => {}}
          />
        </div>
      </motion.div>
    </>
  );
}
