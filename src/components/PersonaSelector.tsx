import { motion } from 'framer-motion';
import { PERSONA_META } from '../data/errors';
import type { Persona } from '../data/errors';

/* ------------------------------------------------------------------ */
/* Dropdown to select the translation persona / style                  */
/* ------------------------------------------------------------------ */

interface PersonaSelectorProps {
  persona: Persona;
  onChange: (p: Persona) => void;
}

const personas = Object.keys(PERSONA_META) as Persona[];

export function PersonaSelector({ persona, onChange }: PersonaSelectorProps) {
  return (
    <div className="mb-4">
      <div className="text-[0.62rem] tracking-[3px] text-[--neon-dim] mb-2 uppercase">
        Translation Style
      </div>
      <div className="flex gap-1.5 flex-wrap">
        {personas.map((p) => {
          const meta = PERSONA_META[p];
          const isActive = p === persona;
          return (
            <motion.button
              key={p}
              onClick={() => onChange(p)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`text-[0.62rem] border px-3 py-1.5 font-[inherit] cursor-pointer transition-colors duration-150 flex items-center gap-1.5 ${
                isActive
                  ? 'border-[--neon] bg-[#ff006622] text-[--neon]'
                  : 'border-[--neon-border] bg-transparent text-[--neon-dim] hover:bg-[#ff006611]'
              }`}
              title={meta.description}
            >
              <span>{meta.icon}</span>
              <span className="tracking-[1px] uppercase">{meta.label}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
