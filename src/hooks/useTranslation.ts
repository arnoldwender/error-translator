import { useState, useCallback, useRef } from 'react';
import { ERROR_DATABASE, EASTER_EGGS, TRANSLATE_LOGS } from '../data/errors';
import type { ErrorEntry, Persona } from '../data/errors';

export type Phase = 'idle' | 'translating' | 'done';

/* Global counter persisted in localStorage */
function getGlobalCount(): number {
  try {
    return parseInt(localStorage.getItem('et_globalCount') || '0', 10) || 0;
  } catch {
    return 0;
  }
}

function setGlobalCount(n: number) {
  try {
    localStorage.setItem('et_globalCount', String(n));
  } catch { /* noop */ }
}

export function useTranslation() {
  const [phase, setPhase] = useState<Phase>('idle');
  const [result, setResult] = useState<ErrorEntry | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const [count, setCount] = useState(getGlobalCount);
  const [persona, setPersona] = useState<Persona>('therapist');
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const translate = useCallback((input: string) => {
    /* Easter egg: empty input */
    const trimmed = input.trim();
    const isEmptyEaster = trimmed === '';

    if (isEmptyEaster) {
      /* Still show logs then the easter egg */
    }

    setPhase('translating');
    setLogs([]);
    setResult(null);

    const logMessages = TRANSLATE_LOGS[persona];
    let i = 0;

    intervalRef.current = setInterval(() => {
      if (i < logMessages.length) {
        setLogs((prev) => [...prev, logMessages[i]]);
        i++;
      } else {
        if (intervalRef.current) clearInterval(intervalRef.current);

        let match: ErrorEntry;

        if (isEmptyEaster) {
          match = EASTER_EGGS[''];
        } else {
          /* Try to find a matching error in the database */
          const found = ERROR_DATABASE.find((e) =>
            trimmed.toLowerCase().includes(e.code.toLowerCase())
          );
          match = found || ERROR_DATABASE[Math.floor(Math.random() * ERROR_DATABASE.length)];
        }

        setResult(match);
        const newCount = getGlobalCount() + 1;
        setGlobalCount(newCount);
        setCount(newCount);
        setPhase('done');
      }
    }, 300);
  }, [persona]);

  const reset = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setPhase('idle');
    setResult(null);
    setLogs([]);
  }, []);

  return { phase, result, logs, count, persona, setPersona, translate, reset };
}
