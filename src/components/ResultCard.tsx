import type { ErrorEntry } from '../data/errors';

interface ResultCardProps {
  result: ErrorEntry;
  onReset: () => void;
  onRetranslate: () => void;
}

export function ResultCard({ result, onReset, onRetranslate }: ResultCardProps) {
  return (
    <div className="animate-float-in">
      <div className="border border-[--neon-faint] bg-[--neon-bg] p-6 mb-4">
        <div className="text-center text-[4rem] mb-4 leading-none">
          {result.emoji}
        </div>

        <div className="mb-4">
          <div className="text-[0.58rem] tracking-[4px] text-[--neon-faint] mb-1.5 uppercase">
            Original Error
          </div>
          <div className="text-[0.72rem] text-[--neon-dim] font-[inherit] bg-[--neon-bg] px-3 py-2 border border-[--neon-ghost]">
            {result.code}
          </div>
        </div>

        <div className="mb-4">
          <div className="text-[0.58rem] tracking-[4px] text-[--neon-faint] mb-1.5 uppercase">
            What It Really Means
          </div>
          <div
            className="text-[0.9rem] text-[--neon] leading-[1.7]"
            style={{ textShadow: '0 0 10px #ff006633' }}
          >
            {result.human}
          </div>
        </div>

        <div className="border-t border-[--neon-ghost] pt-4">
          <div className="text-[0.58rem] tracking-[4px] text-[--neon-faint] mb-1.5 uppercase">
            Recommended Therapy
          </div>
          <div className="text-[0.75rem] text-[--neon-dim] leading-[1.7] italic">
            {result.therapy}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-6">
        <button
          onClick={onReset}
          className="bg-transparent border border-[--neon-border] text-[--neon-faint] font-[inherit] text-[0.65rem] py-2.5 cursor-pointer tracking-[2px] transition-all duration-200 hover:border-[--neon] hover:text-[--neon]"
        >
          TRANSLATE ANOTHER
        </button>
        <button
          onClick={onRetranslate}
          className="bg-transparent border border-[--neon-border] text-[--neon-faint] font-[inherit] text-[0.65rem] py-2.5 cursor-pointer tracking-[2px] transition-all duration-200 hover:border-[--neon] hover:text-[--neon]"
        >
          DIFFERENT TRANSLATION
        </button>
      </div>
    </div>
  );
}
