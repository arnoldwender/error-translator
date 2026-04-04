import { SUGGESTIONS } from '../data/errors';
import type { Phase } from '../hooks/useTranslation';

interface ErrorInputProps {
  input: string;
  onInputChange: (value: string) => void;
  phase: Phase;
  onTranslate: () => void;
}

export function ErrorInput({ input, onInputChange, phase, onTranslate }: ErrorInputProps) {
  return (
    <div className="mb-6">
      <div className="text-[0.62rem] tracking-[3px] text-[--neon-dim] mb-2 uppercase">
        Paste your error:
      </div>

      <div className="flex gap-1.5 flex-wrap mb-3">
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            onClick={() => onInputChange(s)}
            className="text-[0.58rem] border border-[--neon-border] px-2 py-1 text-[--neon-dim] bg-transparent font-[inherit] cursor-pointer transition-colors duration-150 hover:bg-[#ff006622]"
          >
            {s}
          </button>
        ))}
      </div>

      <textarea
        value={input}
        onChange={(e) => onInputChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
            onTranslate();
          }
        }}
        placeholder={"ECONNREFUSED\nTypeError: Cannot read properties of undefined\n404 Not Found\n// paste any error here"}
        className="w-full h-[120px] bg-[--bg-panel] border border-[--neon-border] text-[--neon] font-[inherit] text-[0.72rem] p-3 outline-none resize-none leading-[1.8] mb-2 transition-all duration-200"
        style={{ caretColor: 'var(--neon)' }}
      />

      <button
        onClick={onTranslate}
        disabled={phase === 'translating'}
        className="w-full bg-transparent border border-[--neon] text-[--neon] font-[inherit] text-[0.85rem] py-3 cursor-pointer tracking-[3px] transition-all duration-200 animate-pulse-glow hover:bg-[--neon] hover:text-black disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-[--neon]"
      >
        {phase === 'translating' ? 'TRANSLATING YOUR PAIN...' : '▶ TRANSLATE ERROR'}
      </button>
    </div>
  );
}
