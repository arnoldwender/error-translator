import { useState, useCallback } from 'react';
import { useTranslation } from './hooks/useTranslation';
import { ScanlineOverlay } from './components/ScanlineOverlay';
import { Header } from './components/Header';
import { ErrorInput } from './components/ErrorInput';
import { TranslationLogs } from './components/TranslationLogs';
import { ResultCard } from './components/ResultCard';
import { IdleState } from './components/IdleState';
import { Footer } from './components/Footer';

export default function App() {
  const [input, setInput] = useState('');
  const { phase, result, logs, count, translate, reset } = useTranslation();

  const handleTranslate = useCallback(() => {
    translate(input);
  }, [input, translate]);

  const handleReset = useCallback(() => {
    reset();
    setInput('');
  }, [reset]);

  return (
    <div className="min-h-screen bg-black text-[--neon] font-[inherit] overflow-hidden relative">
      <ScanlineOverlay />

      <div className="max-w-[700px] mx-auto px-6 py-8 relative z-10">
        <Header translationCount={count} />

        <ErrorInput
          input={input}
          onInputChange={setInput}
          phase={phase}
          onTranslate={handleTranslate}
        />

        <TranslationLogs logs={logs} phase={phase} />

        {result && phase === 'done' && (
          <ResultCard
            result={result}
            onReset={handleReset}
            onRetranslate={handleTranslate}
          />
        )}

        {phase === 'idle' && <IdleState />}

        <Footer />
      </div>
    </div>
  );
}
