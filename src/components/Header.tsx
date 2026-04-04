import { useGlitchTitle } from '../hooks/useGlitchTitle';

interface HeaderProps {
  translationCount: number;
}

export function Header({ translationCount }: HeaderProps) {
  const title = useGlitchTitle();

  return (
    <header className="text-center mb-8 border-b border-[--neon-border] pb-6">
      <div className="text-[0.65rem] tracking-[6px] text-[--neon-ghost] mb-2 uppercase">
        Wender Media Emotional Debug Suite
      </div>

      <h1
        className="text-[clamp(1.4rem,5vw,2.5rem)] font-normal m-0 mb-1 tracking-[4px]"
        style={{
          color: 'var(--neon)',
          textShadow: '0 0 20px var(--neon), 0 0 40px var(--neon)',
        }}
      >
        {title}
      </h1>

      <div className="text-[0.7rem] text-[--neon-dim] tracking-[2px]">
        v6.6.6 -- BECAUSE ERRORS HAVE FEELINGS TOO
      </div>

      <div className="mt-3 flex justify-center gap-6 text-[0.6rem] text-[--neon-faint] flex-wrap">
        <span>EMPATHY ENABLED</span>
        <span>STACK TRACE THERAPY</span>
        <span>18 ERROR TYPES</span>
        <span>0 SOLUTIONS</span>
      </div>

      {translationCount > 0 && (
        <div className="mt-2 text-[0.6rem] text-[--neon-border]">
          ERRORS TRANSLATED: {translationCount} -- ERRORS FIXED: 0
        </div>
      )}
    </header>
  );
}
