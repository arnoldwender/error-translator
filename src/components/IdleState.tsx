import { motion } from 'framer-motion';

/* ------------------------------------------------------------------ */
/* Idle state shown when no translation is in progress                 */
/* ------------------------------------------------------------------ */

export function IdleState() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center py-8 text-[--neon-ghost] text-[0.72rem] tracking-[3px]"
    >
      <motion.div
        className="text-[2.5rem] mb-4 leading-none"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        🔴
      </motion.div>
      <div>PASTE AN ERROR. GET EMOTIONAL CLARITY.</div>
      <div className="text-[0.6rem] mt-2 text-[--neon-whisper]">
        STILL WON'T FIX IT THOUGH
      </div>
    </motion.div>
  );
}
