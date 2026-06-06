import { AnimatedCard } from './AnimatedIcons';

const BLOBS = [
  `M10 6 Q22 2 34 5 Q46 8 48 18 Q50 28 44 36 Q36 44 22 44 Q8 44 4 34 Q0 24 4 14 Q6 9 10 6Z`,
  `M8 8 Q20 2 34 4 Q48 6 50 18 Q52 30 44 40 Q34 48 20 46 Q6 44 2 32 Q-2 20 4 12 Q6 10 8 8Z`,
  `M12 4 Q24 0 38 4 Q50 8 52 20 Q54 32 44 40 Q34 50 20 48 Q6 46 2 34 Q-2 22 6 12 Q8 6 12 4Z`,
  `M6 10 Q18 2 34 4 Q50 6 52 18 Q54 30 46 40 Q36 50 20 50 Q4 50 0 38 Q-4 26 4 16 Q5 12 6 10Z`,
];

function BrushBlob({ color, path, emoji }) {
  return (
    <div className="relative w-16 h-14 shrink-0">
      <svg viewBox="0 0 56 52" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet">
        <path d={path} fill={color} opacity="0.55"/>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xl leading-none">{emoji}</span>
      </div>
    </div>
  );
}

export default function ProjectCard({ project, index }) {
  const progress = Math.round((project.completed / project.taskCount) * 100);
  const blob = BLOBS[index % BLOBS.length];

  return (
    /* AnimatedCard — entrance fade + hover lift */
    <AnimatedCard
      delay={index * 0.08}
      className="flex-1 min-w-[140px] bg-white rounded-2xl p-4 border border-stone-100 shadow-sm cursor-pointer"
    >
      <BrushBlob color={project.color} path={blob} emoji={project.emoji} />
      <div className="mt-3">
        <p className="text-sm font-semibold text-stone-800 truncate">{project.name}</p>
        <p className="text-[11px] text-stone-400 mt-0.5">{project.taskCount} tasks</p>
      </div>
      {/* Progress bar */}
      <div className="mt-3">
        <div className="h-1.5 bg-stone-100 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{ width: `${progress}%`, backgroundColor: project.color }}
          />
        </div>
        <p className="text-[10px] font-semibold mt-1" style={{ color: project.color }}>{progress}%</p>
      </div>
    </AnimatedCard>
  );
}
