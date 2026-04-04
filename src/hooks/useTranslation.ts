import { useState, useCallback, useRef } from 'react';
import { ERROR_DATABASE, TRANSLATE_LOGS } from '../data/errors';
import type { ErrorEntry } from '../data/errors';

export type Phase = 'idle' | 'translating' | 'done';

export function useTranslation() {
  const [phase, setPhase] = useState<Phase>('idle');
  const [result, setResult] = useState<ErrorEntry | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const [count, setCount] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const translate = useCallback((input: string) => {
    if (!input.trim()) return;
    setPhase('translating');
    setLogs([]);
    setResult(null);

    let i = 0;
    intervalRef.current = setInterval(() => {
      if (i < TRANSLATE_LOGS.length) {
        setLogs((prev) => [...prev, TRANSLATE_LOGS[i]]);
        i++;
      } else {
        if (intervalRef.current) clearInterval(intervalRef.current);
        const match =
          ERROR_DATABASE.find((e) =>
            input.toLowerCase().includes(e.code.toLowerCase())
          ) || ERROR_DATABASE[Math.floor(Math.random() * ERROR_DATABASE.length)];
        setResult(match);
        setCount((c) => c + 1);
        setPhase('done');
      }
    }, 300);
  }, []);

  const reset = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setPhase('idle');
    setResult(null);
    setLogs([]);
  }, []);

  return { phase, result, logs, count, translate, reset };
}
