import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Achievement } from '../hooks/useAchievements';

/* ------------------------------------------------------------------ */
/* Achievement badge grid showing locked/unlocked status               */
/* ------------------------------------------------------------------ */

interface AchievementBadgesProps {
  achievements: Achievement[];
  unlocked: string[];
}

export function AchievementBadges({ achievements, unlocked }: AchievementBadgesProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="mb-6 border border-[--neon-ghost] p-4">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex justify-between items-center text-[0.7rem] tracking-[3px] text-[--neon-dim] uppercase bg-transparent border-none font-[inherit] cursor-pointer p-0"
      >
        <span>🎖️ Achievements ({unlocked.length}/{achievements.length})</span>
        <span className="text-[--neon-faint]">{expanded ? '▲' : '▼'}</span>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="mt-3 grid grid-cols-2 gap-2">
              {achievements.map((a) => {
                const isUnlocked = unlocked.includes(a.id);
                return (
                  <motion.div
                    key={a.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`border p-2 text-center ${
                      isUnlocked
                        ? 'border-[--neon-border] bg-[#ff006611]'
                        : 'border-[--neon-ghost] opacity-40'
                    }`}
                  >
                    <div className="text-lg mb-1">{isUnlocked ? a.icon : '🔒'}</div>
                    <div className="text-[0.55rem] text-[--neon-dim] tracking-[1px]">
                      {a.title}
                    </div>
                    <div className="text-[0.45rem] text-[--neon-faint] mt-0.5">
                      {isUnlocked ? a.description : '???'}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
