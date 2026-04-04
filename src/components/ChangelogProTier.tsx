import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ------------------------------------------------------------------ */
/* Fake changelog + Pro tier upsell — satirical product release notes  */
/* and an absurd enterprise pricing tier                               */
/* ------------------------------------------------------------------ */

/* Changelog entries — newest first */
const CHANGELOG = [
  {
    version: 'v6.6.6',
    date: 'Current',
    tag: 'LATEST',
    tagColor: '#44ff88',
    entries: [
      'Added Sentry-style error dashboard with emotional metrics',
      'New Jira ticket generator (infinity story points included)',
      'Grafana-styled developer burnout timeline',
      'CLI mode for terminal purists who hate GUIs',
      'Pro tier announced (your wallet is not ready)',
    ],
  },
  {
    version: 'v6.5.0',
    date: 'Last week',
    tag: 'STABLE',
    tagColor: '#4488ff',
    entries: [
      'Added support for translating errors you caused yourself',
      'Now detects when you\'re about to mass-Google the error',
      'Shakespeare mode now includes stage directions',
      'Fixed bug where therapy suggestions were too helpful',
    ],
  },
  {
    version: 'v6.4.0',
    date: '2 weeks ago',
    tag: null,
    tagColor: null,
    entries: [
      'Gen Z persona now uses current slang (updated hourly)',
      'Corporate mode adds "per my last email" to everything',
      'Drama Queen confetti now 40% more dramatic',
      'Removed feature that accidentally fixed errors',
    ],
  },
  {
    version: 'v6.3.0',
    date: '1 month ago',
    tag: null,
    tagColor: null,
    entries: [
      'Added emotional damage meter (legally distinct from health bars)',
      'Sound effects for maximum psychological impact',
      'Achievement system because gamifying pain is on-brand',
      'Fixed issue where the app was too optimistic',
    ],
  },
  {
    version: 'v6.0.0',
    date: 'The beginning',
    tag: 'BREAKING',
    tagColor: '#ff4444',
    entries: [
      'Initial release: 48 error types, 5 personas, 0 solutions',
      'Therapist mode approved by zero licensed professionals',
      'Hall of Fame with curated worst errors in history',
      'Share cards for telling the world about your suffering',
    ],
  },
];

/* Pro tier features — increasingly absurd */
const PRO_FEATURES = [
  { icon: '🧠', title: 'AI Emotional Analysis', desc: 'GPT-powered feelings detection for your stack traces' },
  { icon: '📊', title: 'Team Burnout Dashboard', desc: 'Real-time emotional state of your entire engineering org' },
  { icon: '💬', title: 'Slack Integration', desc: 'Auto-DMs your therapist when production goes down' },
  { icon: '🎯', title: 'Sprint Emotional Forecast', desc: 'Predicts team morale based on Jira ticket count' },
  { icon: '📱', title: 'PagerDuty for Feelings', desc: 'Escalation policy: Developer -> Manager -> Therapist -> Bartender' },
  { icon: '🔔', title: 'Burnout Alerts', desc: 'Get notified before you rage-quit (30 second warning)' },
  { icon: '📈', title: 'Emotional SLA', desc: '99.9% uptime on developer feelings (downtime = crying)' },
  { icon: '🤝', title: 'Enterprise SSO', desc: 'Single Sign-On for Single Source of Pain' },
];

export function ChangelogProTier() {
  const [activeTab, setActiveTab] = useState<'changelog' | 'pro'>('changelog');

  return (
    <div className="mb-6 border border-[--neon-ghost] overflow-hidden">
      {/* Tab switcher */}
      <div className="flex border-b border-[--neon-ghost]">
        <button
          onClick={() => setActiveTab('changelog')}
          className={`flex-1 text-[0.6rem] py-2.5 tracking-[2px] uppercase font-[inherit] cursor-pointer border-none transition-colors ${
            activeTab === 'changelog'
              ? 'bg-[#ff006611] text-[--neon] border-b-2 border-b-[--neon]'
              : 'bg-transparent text-[--neon-faint] hover:bg-[#ff006608]'
          }`}
          style={activeTab === 'changelog' ? { borderBottom: '2px solid var(--neon)' } : {}}
        >
          CHANGELOG
        </button>
        <button
          onClick={() => setActiveTab('pro')}
          className={`flex-1 text-[0.6rem] py-2.5 tracking-[2px] uppercase font-[inherit] cursor-pointer border-none transition-colors ${
            activeTab === 'pro'
              ? 'bg-[#ff006611] text-[--neon] border-b-2 border-b-[--neon]'
              : 'bg-transparent text-[--neon-faint] hover:bg-[#ff006608]'
          }`}
          style={activeTab === 'pro' ? { borderBottom: '2px solid var(--neon)' } : {}}
        >
          PRO TIER
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'changelog' ? (
          <motion.div
            key="changelog"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="max-h-[350px] overflow-y-auto"
          >
            <div className="p-4 space-y-4">
              {CHANGELOG.map((release) => (
                <div key={release.version}>
                  {/* Version header */}
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[0.65rem] text-[--neon] font-bold tracking-[1px]">
                      {release.version}
                    </span>
                    {release.tag && (
                      <span
                        className="text-[0.4rem] px-1.5 py-0.5 tracking-[1px] font-bold"
                        style={{
                          color: release.tagColor!,
                          background: release.tagColor + '22',
                          border: `1px solid ${release.tagColor}44`,
                        }}
                      >
                        {release.tag}
                      </span>
                    )}
                    <span className="text-[0.45rem] text-[--neon-ghost]">{release.date}</span>
                  </div>
                  {/* Entry list */}
                  <div className="space-y-1 pl-3 border-l border-[--neon-ghost]">
                    {release.entries.map((entry, i) => (
                      <div key={i} className="text-[0.55rem] text-[--neon-dim] leading-relaxed flex items-start gap-1.5">
                        <span className="text-[--neon-faint] mt-0.5 shrink-0">-</span>
                        <span>{entry}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="pro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Pro tier header */}
            <div
              className="px-4 py-4 text-center border-b border-[--neon-ghost]"
              style={{ background: 'linear-gradient(180deg, #1a0020 0%, #0a0010 100%)' }}
            >
              <div className="text-[0.45rem] text-[--neon-faint] tracking-[4px] uppercase mb-1">
                Introducing
              </div>
              <div
                className="text-[1rem] tracking-[3px] font-bold mb-1"
                style={{ color: 'var(--neon)', textShadow: '0 0 20px var(--neon), 0 0 40px var(--neon)' }}
              >
                ERROR TRANSLATOR PRO
              </div>
              <div className="text-[0.55rem] text-[--neon-dim] tracking-[1px]">
                Enterprise Emotional Support Suite
              </div>
            </div>

            {/* Pricing */}
            <div className="px-4 py-3 border-b border-[--neon-ghost] text-center">
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-[1.5rem] text-[--neon] font-bold">$999</span>
                <span className="text-[0.55rem] text-[--neon-faint]">/dev/month</span>
              </div>
              <div className="text-[0.45rem] text-[--neon-ghost] mt-0.5">
                billed annually | your soul accepted as payment
              </div>
            </div>

            {/* Features grid */}
            <div className="p-4 space-y-2 max-h-[250px] overflow-y-auto">
              {PRO_FEATURES.map((feat) => (
                <div key={feat.title} className="flex items-start gap-2 p-2 border border-[--neon-ghost] hover:border-[--neon-border] transition-colors">
                  <span className="text-base shrink-0">{feat.icon}</span>
                  <div>
                    <div className="text-[0.58rem] text-[--neon] tracking-[1px]">{feat.title}</div>
                    <div className="text-[0.48rem] text-[--neon-faint] mt-0.5">{feat.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="px-4 py-3 border-t border-[--neon-ghost]">
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => alert('Just kidding. This is free. Like your therapy should be.')}
                className="w-full text-[0.6rem] py-2.5 tracking-[2px] font-[inherit] cursor-pointer border border-[--neon] text-[--neon] bg-transparent hover:bg-[--neon] hover:text-black transition-colors"
                style={{ boxShadow: '0 0 15px #ff006633' }}
              >
                UPGRADE NOW (JK IT'S FREE)
              </motion.button>
              <div className="text-[0.4rem] text-[--neon-ghost] text-center mt-1.5 tracking-[1px]">
                30-day free trial | No credit card needed | No actual support
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
