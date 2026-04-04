import { motion, AnimatePresence } from 'framer-motion';
import type { Achievement } from '../hooks/useAchievements';

/* ------------------------------------------------------------------ */
/* Toast notification for newly unlocked achievements                  */
/* ------------------------------------------------------------------ */

interface AchievementToastProps {
  achievement: Achievement | null;
  onDismiss: () => void;
}

export function AchievementToast({ achievement, onDismiss }: AchievementToastProps) {
  return (
    <AnimatePresence>
      {achievement && (
        <motion.div
          initial={{ opacity: 0, y: -40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] border border-[--neon] bg-[--bg-panel] px-5 py-3 cursor-pointer"
          style={{ boxShadow: '0 0 20px var(--neon), 0 0 40px var(--neon-dim)' }}
          onClick={onDismiss}
        >
          <div className="text-[0.55rem] tracking-[3px] text-[--neon-faint] uppercase mb-1">
            Achievement Unlocked!
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xl">{achievement.icon}</span>
            <div>
              <div className="text-[0.75rem] text-[--neon] tracking-[1px]">
                {achievement.title}
              </div>
              <div className="text-[0.55rem] text-[--neon-dim]">
                {achievement.description}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
