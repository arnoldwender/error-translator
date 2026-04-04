import { motion } from 'framer-motion';

/* ------------------------------------------------------------------ */
/* "X errors translated, X developers comforted" global counter        */
/* ------------------------------------------------------------------ */

interface GlobalCounterProps {
  count: number;
}

export function GlobalCounter({ count }: GlobalCounterProps) {
  if (count === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mb-1 text-[0.55rem] text-[--neon-border] tracking-[2px]"
    >
      <span>{count.toLocaleString()} ERROR{count !== 1 ? 'S' : ''} TRANSLATED</span>
      <span className="mx-2">--</span>
      <span>{count.toLocaleString()} DEVELOPER{count !== 1 ? 'S' : ''} COMFORTED</span>
    </motion.div>
  );
}
