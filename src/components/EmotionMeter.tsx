import { motion, AnimatePresence } from 'framer-motion';

/* ------------------------------------------------------------------ */
/* Animated emoji face that reacts to error severity (1-4)             */
/* 1=mild, 2=moderate, 3=severe, 4=critical                          */
/* ------------------------------------------------------------------ */

interface EmotionMeterProps {
  severity: number;
}

const FACES: Record<number, { emoji: string; label: string; color: string }> = {
  0: { emoji: '😐', label: 'Waiting...', color: '#888' },
  1: { emoji: '😐', label: 'Mild annoyance', color: '#ffcc00' },
  2: { emoji: '😰', label: 'Moderate suffering', color: '#ff9900' },
  3: { emoji: '😱', label: 'Severe distress', color: '#ff4400' },
  4: { emoji: '💀', label: 'Critical meltdown', color: '#ff0066' },
};

export function EmotionMeter({ severity }: EmotionMeterProps) {
  const face = FACES[severity] || FACES[0];
  /* Bar width based on severity (0-4 mapped to 0-100%) */
  const barWidth = (severity / 4) * 100;

  return (
    <div className="mb-4 border border-[--neon-ghost] p-3">
      <div className="text-[0.58rem] tracking-[3px] text-[--neon-faint] mb-2 uppercase">
        Emotional Damage Meter
      </div>
      <div className="flex items-center gap-3">
        {/* Animated emoji */}
        <AnimatePresence mode="wait">
          <motion.div
            key={severity}
            initial={{ scale: 0.5, opacity: 0, rotate: -20 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.5, opacity: 0, rotate: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="text-[2.5rem] leading-none"
          >
            {face.emoji}
          </motion.div>
        </AnimatePresence>

        {/* Progress bar */}
        <div className="flex-1">
          <div className="h-2 bg-[--neon-ghost] overflow-hidden relative">
            <motion.div
              className="h-full"
              style={{ backgroundColor: face.color }}
              initial={{ width: 0 }}
              animate={{ width: `${barWidth}%` }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />
          </div>
          <motion.div
            className="text-[0.55rem] mt-1 tracking-[1px]"
            style={{ color: face.color }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {face.label.toUpperCase()}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
