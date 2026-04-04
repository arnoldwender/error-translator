import { useState, useCallback, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useTranslation } from './hooks/useTranslation';
import { useAchievements } from './hooks/useAchievements';
import { useSoundEffects } from './hooks/useSoundEffects';
import { ScanlineOverlay } from './components/ScanlineOverlay';
import { Header } from './components/Header';
import { PersonaSelector } from './components/PersonaSelector';
import { ErrorInput } from './components/ErrorInput';
import { TranslationLogs } from './components/TranslationLogs';
import { ResultCard } from './components/ResultCard';
import { SentryDashboard } from './components/SentryDashboard';
import { JiraTicket } from './components/JiraTicket';
import { EmotionalTimeline } from './components/EmotionalTimeline';
import { CliMode } from './components/CliMode';
import { IdleState } from './components/IdleState';
import { ChangelogProTier } from './components/ChangelogProTier';
import { HallOfFame } from './components/HallOfFame';
import { AchievementBadges } from './components/AchievementBadges';
import { AchievementToast } from './components/AchievementToast';
import { Footer } from './components/Footer';

/* ------------------------------------------------------------------ */
/* Main app — orchestrates translation, sound, confetti, achievements  */
/* Now includes Sentry dashboard, Jira tickets, emotional timeline,   */
/* CLI mode, changelog, and pro tier                                   */
/* ------------------------------------------------------------------ */

export default function App() {
  const [input, setInput] = useState('');
  const [cliMode, setCliMode] = useState(false);
  const { phase, result, logs, count, persona, setPersona, translate, reset } = useTranslation();
  const { achievements, unlocked, newAchievement, dismissAchievement, checkAchievements, unlock } = useAchievements();
  const { play, toggle } = useSoundEffects();

  /* Fire confetti on drama queen translations */
  useEffect(() => {
    if (phase === 'done' && result) {
      /* Play the error-specific sound effect */
      play(result.sound);

      /* Drama queen mode gets confetti on severity >= 2 */
      if (persona === 'drama' && result.severity >= 2) {
        setTimeout(() => {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#ff0066', '#ff3388', '#ff66aa', '#cc0055'],
          });
        }, 300);
      }

      /* High severity always gets a smaller confetti burst */
      if (result.severity >= 4) {
        setTimeout(() => {
          confetti({
            particleCount: 50,
            spread: 100,
            origin: { y: 0.5 },
            colors: ['#ff0066', '#ff0000', '#ff3300'],
          });
        }, 500);
      }

      /* Track achievement */
      checkAchievements(persona);

      /* Easter egg achievement for empty input */
      if (result.code === '(empty input)') {
        unlock('easter');
      }
    }
  }, [phase, result, persona, play, checkAchievements, unlock]);

  const handleTranslate = useCallback(() => {
    /* Easter egg: allow empty input (it has a special result) */
    translate(input);
  }, [input, translate]);

  const handleReset = useCallback(() => {
    reset();
    setInput('');
  }, [reset]);

  const handleShare = useCallback(() => {
    unlock('sharer');
  }, [unlock]);

  const handleCliToggle = useCallback(() => {
    setCliMode((prev) => !prev);
  }, []);

  return (
    <div className="min-h-screen bg-black text-[--neon] font-[inherit] overflow-hidden relative">
      <ScanlineOverlay />

      {/* Achievement toast */}
      <AchievementToast achievement={newAchievement} onDismiss={dismissAchievement} />

      <div className="max-w-[700px] mx-auto px-6 py-8 relative z-10">
        <Header translationCount={count} onSoundToggle={toggle} />

        {/* CLI Mode toggle + terminal */}
        <CliMode
          isActive={cliMode}
          onToggle={handleCliToggle}
          persona={persona}
          onPersonaChange={setPersona}
        />

        {/* Standard GUI mode — hidden when CLI is active */}
        {!cliMode && (
          <>
            {/* Persona selector */}
            <PersonaSelector persona={persona} onChange={setPersona} />

            <ErrorInput
              input={input}
              onInputChange={setInput}
              phase={phase}
              onTranslate={handleTranslate}
            />

            <TranslationLogs logs={logs} phase={phase} />

            <AnimatePresence mode="wait">
              {result && phase === 'done' && (
                <>
                  {/* Sentry-style issue dashboard */}
                  <SentryDashboard
                    key={`sentry-${result.code}-${persona}`}
                    result={result}
                    persona={persona}
                  />

                  {/* Original translation result card */}
                  <ResultCard
                    key={result.code + persona}
                    result={result}
                    persona={persona}
                    onReset={handleReset}
                    onRetranslate={handleTranslate}
                    onShare={handleShare}
                  />

                  {/* Jira ticket generator */}
                  <JiraTicket
                    key={`jira-${result.code}-${persona}`}
                    result={result}
                    persona={persona}
                  />

                  {/* Developer emotional state timeline */}
                  <EmotionalTimeline
                    key={`timeline-${result.code}-${persona}`}
                    result={result}
                    translationCount={count}
                  />
                </>
              )}
            </AnimatePresence>

            {phase === 'idle' && <IdleState />}

            {/* Changelog + Pro Tier */}
            <ChangelogProTier />

            {/* Hall of Fame */}
            <HallOfFame />

            {/* Achievements */}
            <AchievementBadges achievements={achievements} unlocked={unlocked} />
          </>
        )}

        <Footer />
      </div>
    </div>
  );
}
