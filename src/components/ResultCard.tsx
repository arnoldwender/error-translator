import { motion } from 'framer-motion';
import type { ErrorEntry, Persona } from '../data/errors';
import { PERSONA_META } from '../data/errors';
import { EmotionMeter } from './EmotionMeter';
import { ShareCard } from './ShareCard';

/* ------------------------------------------------------------------ */
/* Translation result card with emotion meter, share options           */
/* ------------------------------------------------------------------ */

interface ResultCardProps {
  result: ErrorEntry;
  persona: Persona;
  onReset: () => void;
  onRetranslate: () => void;
  onShare?: () => void;
}

export function ResultCard({ result, persona, onReset, onRetranslate, onShare }: ResultCardProps) {
  const translation = result.translations[persona];
  const meta = PERSONA_META[persona];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
    >
      {/* Emotion meter */}
      <EmotionMeter severity={result.severity} />

      {/* Main result card */}
      <div className="border border-[--neon-faint] bg-[--neon-bg] p-6 mb-4">
        <div className="text-center text-[4rem] mb-4 leading-none">
          {result.emoji}
        </div>

        {/* Persona badge */}
        <div className="text-center mb-4">
          <span className="text-[0.55rem] tracking-[2px] text-[--neon-faint] border border-[--neon-ghost] px-2 py-0.5 uppercase">
            {meta.icon} {meta.label} Mode
          </span>
        </div>

        {/* Original error */}
        <div className="mb-4">
          <div className="text-[0.58rem] tracking-[4px] text-[--neon-faint] mb-1.5 uppercase">
            Original Error
          </div>
          <div className="text-[0.72rem] text-[--neon-dim] font-[inherit] bg-[--neon-bg] px-3 py-2 border border-[--neon-ghost]">
            {result.code}
          </div>
        </div>

        {/* Translation */}
        <motion.div
          className="mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="text-[0.58rem] tracking-[4px] text-[--neon-faint] mb-1.5 uppercase">
            What It Really Means
          </div>
          <div
            className="text-[0.9rem] text-[--neon] leading-[1.7]"
            style={{ textShadow: '0 0 10px #ff006633' }}
          >
            {translation}
          </div>
        </motion.div>

        {/* Therapy */}
        <motion.div
          className="border-t border-[--neon-ghost] pt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="text-[0.58rem] tracking-[4px] text-[--neon-faint] mb-1.5 uppercase">
            Recommended Therapy
          </div>
          <div className="text-[0.75rem] text-[--neon-dim] leading-[1.7] italic">
            {result.therapy}
          </div>
        </motion.div>
      </div>

      {/* Share card & download */}
      <ShareCard result={result} persona={persona} onShare={onShare} />

      {/* Action buttons */}
      <div className="grid grid-cols-2 gap-2 mb-6">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onReset}
          className="bg-transparent border border-[--neon-border] text-[--neon-faint] font-[inherit] text-[0.65rem] py-2.5 cursor-pointer tracking-[2px] transition-all duration-200 hover:border-[--neon] hover:text-[--neon]"
        >
          TRANSLATE ANOTHER
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onRetranslate}
          className="bg-transparent border border-[--neon-border] text-[--neon-faint] font-[inherit] text-[0.65rem] py-2.5 cursor-pointer tracking-[2px] transition-all duration-200 hover:border-[--neon] hover:text-[--neon]"
        >
          DIFFERENT TRANSLATION
        </motion.button>
      </div>
    </motion.div>
  );
}
