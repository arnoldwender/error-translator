import { useState, useCallback, useEffect } from 'react';
import type { Persona } from '../data/errors';

/* ------------------------------------------------------------------ */
/* Achievement system — tracks milestones and shows toast notifs       */
/* ------------------------------------------------------------------ */

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
}

const ALL_ACHIEVEMENTS: Achievement[] = [
  { id: 'first', title: 'First Translation', description: 'Translated your first error', icon: '🎉' },
  { id: 'polyglot', title: 'Polyglot', description: 'Used all 5 translation personas', icon: '🌍' },
  { id: 'connoisseur', title: 'Error Connoisseur', description: 'Translated 20 errors', icon: '🍷' },
  { id: 'speedrun', title: 'Speed Debugger', description: 'Translated 5 errors in one session', icon: '⚡' },
  { id: 'easter', title: 'Easter Egg Hunter', description: 'Found a hidden easter egg', icon: '🥚' },
  { id: 'drama_fan', title: 'Drama Enthusiast', description: 'Used Drama Queen mode 5 times', icon: '👑' },
  { id: 'sharer', title: 'Misery Loves Company', description: 'Copied a translation to share', icon: '📤' },
];

function loadState(): { unlocked: string[]; personas: Persona[]; sessionCount: number; dramaCount: number; totalCount: number } {
  try {
    const raw = localStorage.getItem('et_achievements');
    if (raw) return JSON.parse(raw);
  } catch { /* noop */ }
  return { unlocked: [], personas: [], sessionCount: 0, dramaCount: 0, totalCount: 0 };
}

function saveState(state: ReturnType<typeof loadState>) {
  try {
    localStorage.setItem('et_achievements', JSON.stringify(state));
  } catch { /* noop */ }
}

export function useAchievements() {
  const [state, setState] = useState(loadState);
  const [newAchievement, setNewAchievement] = useState<Achievement | null>(null);

  /* Save to localStorage whenever state changes */
  useEffect(() => {
    saveState(state);
  }, [state]);

  /* Auto-dismiss toast after 4 seconds */
  useEffect(() => {
    if (newAchievement) {
      const t = setTimeout(() => setNewAchievement(null), 4000);
      return () => clearTimeout(t);
    }
  }, [newAchievement]);

  const unlock = useCallback((id: string) => {
    const achievement = ALL_ACHIEVEMENTS.find((a) => a.id === id);
    if (!achievement) return;
    setState((prev) => {
      if (prev.unlocked.includes(id)) return prev;
      setNewAchievement(achievement);
      return { ...prev, unlocked: [...prev.unlocked, id] };
    });
  }, []);

  const recordTranslation = useCallback((persona: Persona) => {
    setState((prev) => {
      const newTotal = prev.totalCount + 1;
      const newSession = prev.sessionCount + 1;
      const newDrama = persona === 'drama' ? prev.dramaCount + 1 : prev.dramaCount;
      const newPersonas = prev.personas.includes(persona) ? prev.personas : [...prev.personas, persona];
      return { ...prev, totalCount: newTotal, sessionCount: newSession, dramaCount: newDrama, personas: newPersonas };
    });
  }, []);

  /* Check and trigger achievements based on current state */
  const checkAchievements = useCallback((persona: Persona) => {
    recordTranslation(persona);

    /* Use timeout so state is updated before checking */
    setTimeout(() => {
      setState((prev) => {
        const toUnlock: string[] = [];

        if (prev.totalCount >= 1 && !prev.unlocked.includes('first')) toUnlock.push('first');
        if (prev.personas.length >= 5 && !prev.unlocked.includes('polyglot')) toUnlock.push('polyglot');
        if (prev.totalCount >= 20 && !prev.unlocked.includes('connoisseur')) toUnlock.push('connoisseur');
        if (prev.sessionCount >= 5 && !prev.unlocked.includes('speedrun')) toUnlock.push('speedrun');
        if (prev.dramaCount >= 5 && !prev.unlocked.includes('drama_fan')) toUnlock.push('drama_fan');

        if (toUnlock.length > 0) {
          const first = ALL_ACHIEVEMENTS.find((a) => a.id === toUnlock[0]);
          if (first) setNewAchievement(first);
          return { ...prev, unlocked: [...prev.unlocked, ...toUnlock] };
        }
        return prev;
      });
    }, 100);
  }, [recordTranslation]);

  return {
    achievements: ALL_ACHIEVEMENTS,
    unlocked: state.unlocked,
    newAchievement,
    dismissAchievement: () => setNewAchievement(null),
    checkAchievements,
    unlock,
  };
}
