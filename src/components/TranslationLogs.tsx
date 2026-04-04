import type { Phase } from '../hooks/useTranslation';

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
          <div
            key={i}
            className="animate-fade-in"
            style={{
              color: isComplete ? 'var(--neon)' : 'var(--neon-dim)',
              textShadow: '0 0 4px currentColor',
              animationDelay: `${i * 50}ms`,
            }}
          >
            {isComplete ? '✓ ' : '> '}{log}
          </div>
        );
      })}
      {phase === 'translating' && (
        <span className="animate-blink text-[--neon]">▊</span>
      )}
    </div>
  );
}
