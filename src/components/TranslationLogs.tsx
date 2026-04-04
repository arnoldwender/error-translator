import { motion } from 'framer-motion';
import type { Phase } from '../hooks/useTranslation';

/* ------------------------------------------------------------------ */
/* Staggered log reveals during the translation animation phase        */
/* ------------------------------------------------------------------ */

interface TranslationLogsProps {
  logs: string[];
  phase: Phase;
}

export function TranslationLogs({ logs, phase }: TranslationLogsProps) {
  if (logs.length === 0) return null;

  return (
    <div className="bg-[--bg-panel] border border-[--neon-ghost] p-3 mb-6 text-[0.68rem] leading-[1.9]">
      {logs.map((log, i) => {
        const isComplete = log === 'Translation complete.';
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05, duration: 0.3 }}
            style={{
              color: isComplete ? 'var(--neon)' : 'var(--neon-dim)',
              textShadow: '0 0 4px currentColor',
            }}
          >
            {isComplete ? '✓ ' : '> '}{log}
          </motion.div>
        );
      })}
      {phase === 'translating' && (
        <span className="animate-blink text-[--neon]">▊</span>
      )}
    </div>
  );
}
