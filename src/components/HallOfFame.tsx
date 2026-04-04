import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HALL_OF_FAME, PERSONA_META } from '../data/errors';
import type { HallOfFameEntry } from '../data/errors';

/* ------------------------------------------------------------------ */
/* Scrollable gallery of famous errors with "relatable" counter        */
/* ------------------------------------------------------------------ */

export function HallOfFame() {
  const [entries, setEntries] = useState<HallOfFameEntry[]>(HALL_OF_FAME);
  const [expanded, setExpanded] = useState(false);

  const handleRelatable = (idx: number) => {
    setEntries((prev) =>
      prev.map((e, i) => (i === idx ? { ...e, relatableCount: e.relatableCount + 1 } : e))
    );
  };

  return (
    <div className="mb-6 border border-[--neon-ghost] p-4">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex justify-between items-center text-[0.7rem] tracking-[3px] text-[--neon-dim] uppercase bg-transparent border-none font-[inherit] cursor-pointer p-0"
      >
        <span>🏆 Error Hall of Fame</span>
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
            <div className="mt-3 max-h-[300px] overflow-y-auto space-y-2 pr-1">
              {entries.map((entry, idx) => {
                const meta = PERSONA_META[entry.persona];
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="border border-[--neon-ghost] p-3 hover:border-[--neon-border] transition-colors"
                  >
                    {/* Error code */}
                    <div className="text-[0.62rem] text-[--neon] font-[inherit] mb-1">
                      {entry.error}
                    </div>
                    {/* Translation */}
                    <div className="text-[0.7rem] text-[--neon-dim] mb-2 italic leading-relaxed">
                      "{entry.translation}"
                    </div>
                    {/* Meta row */}
                    <div className="flex justify-between items-center">
                      <span className="text-[0.55rem] text-[--neon-faint] tracking-[1px]">
                        {meta.icon} {meta.label.toUpperCase()} MODE
                      </span>
                      <button
                        onClick={() => handleRelatable(idx)}
                        className="text-[0.58rem] border border-[--neon-border] px-2 py-0.5 bg-transparent text-[--neon-dim] font-[inherit] cursor-pointer hover:bg-[#ff006622] hover:text-[--neon] transition-colors"
                      >
                        😭 Relatable ({entry.relatableCount.toLocaleString()})
                      </button>
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
