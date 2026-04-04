import { useState } from 'react';
import { motion } from 'framer-motion';

/* ------------------------------------------------------------------ */
/* Toggle button for sound effects                                     */
/* ------------------------------------------------------------------ */

interface SoundToggleProps {
  onToggle: () => boolean;
}

export function SoundToggle({ onToggle }: SoundToggleProps) {
  const [enabled, setEnabled] = useState(true);

  const handleClick = () => {
    const newState = onToggle();
    setEnabled(newState);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleClick}
      className="text-[0.65rem] border border-[--neon-border] px-2 py-1 bg-transparent text-[--neon-dim] font-[inherit] cursor-pointer hover:bg-[#ff006622] transition-colors"
      title={enabled ? 'Mute sound effects' : 'Enable sound effects'}
    >
      {enabled ? '🔊' : '🔇'}
    </motion.button>
  );
}
