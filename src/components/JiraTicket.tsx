import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ErrorEntry, Persona } from '../data/errors';
import { PERSONA_META } from '../data/errors';

/* ------------------------------------------------------------------ */
/* Fake Jira ticket generator — creates a hilarious issue from the     */
/* translated error complete with priority, story points, acceptance   */
/* criteria, and sarcastic PM comments                                 */
/* ------------------------------------------------------------------ */

interface JiraTicketProps {
  result: ErrorEntry;
  persona: Persona;
}

/* Deterministic pseudo-random from string */
function hash(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) - h) + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

/* PM comments — always passive-aggressive */
const PM_COMMENTS = [
  'Can we scope this down to just the promise part?',
  'I don\'t think this needs to be in the current sprint.',
  'Can we get an estimate on this? Ideally under 2 hours.',
  'Let\'s circle back on this after the retro.',
  'Is this really a blocker? Can\'t we ship without it?',
  'The client says this is P0 but I think it\'s fine.',
  'Can we just add a try-catch and call it done?',
  'I\'ve already told the stakeholders this is fixed.',
  'Have we considered not having this error?',
  'Let\'s discuss in standup. Actually, let\'s skip standup.',
];

/* Acceptance criteria — absurd but relatable */
const ACCEPTANCE_CRITERIA = [
  'Developer achieves inner peace',
  'Error never appears again (in this browser tab)',
  'Code compiles without developer crying',
  'The test suite passes (we don\'t have tests)',
  'Stack Overflow confirms this is not a duplicate',
  'Developer can explain the fix without using the word "somehow"',
  'No new errors are introduced (lol)',
  'The intern understands the fix',
];

/* Priority descriptions */
const PRIORITIES = [
  { label: 'Highest', desc: 'developer questioning life choices', color: '#ff0066', icon: '!!!' },
  { label: 'High', desc: 'developer considering career change', color: '#ff4444', icon: '!!' },
  { label: 'Medium', desc: 'developer mildly inconvenienced', color: '#ffaa00', icon: '!' },
  { label: 'Low', desc: 'developer will fix it "later"', color: '#4488ff', icon: '...' },
];

export function JiraTicket({ result, persona }: JiraTicketProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const seed = hash(result.code + persona);
  const issueNum = 1000 + (seed % 9000);
  const meta = PERSONA_META[persona];
  const translation = result.translations[persona];

  /* Map severity to priority */
  const priority = PRIORITIES[Math.min(result.severity - 1, 3)];
  const pmComment = PM_COMMENTS[seed % PM_COMMENTS.length];
  const criteria1 = ACCEPTANCE_CRITERIA[seed % ACCEPTANCE_CRITERIA.length];
  const criteria2 = ACCEPTANCE_CRITERIA[(seed + 3) % ACCEPTANCE_CRITERIA.length];

  /* Copy ticket to clipboard as formatted text */
  const copyTicket = useCallback(() => {
    const ticket = [
      `FEELINGS-${issueNum}: Developer experiencing ${result.code.toLowerCase()} and unresolved emotions`,
      '',
      `Priority: ${priority.label} (${priority.desc})`,
      `Story Points: Infinity`,
      `Sprint: Emotional Recovery Sprint ${Math.floor(seed % 42)}`,
      `Reporter: The Runtime`,
      `Assignee: Future You`,
      '',
      `Description:`,
      `${translation}`,
      '',
      `Acceptance Criteria:`,
      `- [ ] ${criteria1}`,
      `- [ ] ${criteria2}`,
      `- [ ] No regressions in developer morale`,
      '',
      `PM Comment: "${pmComment}"`,
      '',
      `Labels: ${persona}, emotional-damage, needs-therapy, wont-fix`,
    ].join('\n');
    navigator.clipboard.writeText(ticket).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [issueNum, result, persona, translation, priority, pmComment, criteria1, criteria2, seed]);

  return (
    <div className="mb-4">
      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-[0.62rem] tracking-[2px] text-[--neon-dim] uppercase bg-transparent border border-[--neon-ghost] px-4 py-2.5 font-[inherit] cursor-pointer hover:border-[--neon-border] transition-colors"
      >
        <span>GENERATE JIRA TICKET</span>
        <span className="text-[--neon-faint]">{isOpen ? '▲' : '▼'}</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="border border-t-0 border-[--neon-ghost] p-0 overflow-hidden">
              {/* Jira-like header */}
              <div
                className="px-4 py-2 flex items-center justify-between"
                style={{ background: 'linear-gradient(90deg, #1a1030 0%, #0a0015 100%)' }}
              >
                <div className="flex items-center gap-2">
                  {/* Fake Jira icon */}
                  <div className="w-4 h-4 border border-[#4488ff44] flex items-center justify-center text-[0.45rem] text-[#4488ff]">
                    J
                  </div>
                  <span className="text-[0.6rem] text-[#4488ff] tracking-[1px] font-bold">
                    FEELINGS-{issueNum}
                  </span>
                </div>
                <span
                  className="text-[0.45rem] px-1.5 py-0.5 tracking-[1px] font-bold"
                  style={{ background: priority.color + '22', color: priority.color, border: `1px solid ${priority.color}44` }}
                >
                  {priority.icon} {priority.label.toUpperCase()}
                </span>
              </div>

              {/* Title */}
              <div className="px-4 py-3 border-b border-[--neon-ghost]">
                <div className="text-[0.75rem] text-[--neon] leading-relaxed">
                  Developer experiencing {result.code.toLowerCase()} and unresolved emotions
                </div>
              </div>

              {/* Meta grid */}
              <div className="grid grid-cols-2 border-b border-[--neon-ghost]">
                <div className="px-4 py-2 border-r border-[--neon-ghost]">
                  <div className="text-[0.42rem] text-[--neon-faint] tracking-[2px] uppercase mb-0.5">Priority</div>
                  <div className="text-[0.58rem]" style={{ color: priority.color }}>
                    {priority.label} ({priority.desc})
                  </div>
                </div>
                <div className="px-4 py-2">
                  <div className="text-[0.42rem] text-[--neon-faint] tracking-[2px] uppercase mb-0.5">Story Points</div>
                  <div className="text-[0.58rem] text-[--neon-dim]">Infinity</div>
                </div>
              </div>

              <div className="grid grid-cols-2 border-b border-[--neon-ghost]">
                <div className="px-4 py-2 border-r border-[--neon-ghost]">
                  <div className="text-[0.42rem] text-[--neon-faint] tracking-[2px] uppercase mb-0.5">Reporter</div>
                  <div className="text-[0.58rem] text-[--neon-dim]">The Runtime</div>
                </div>
                <div className="px-4 py-2">
                  <div className="text-[0.42rem] text-[--neon-faint] tracking-[2px] uppercase mb-0.5">Sprint</div>
                  <div className="text-[0.58rem] text-[--neon-dim]">Emotional Recovery #{Math.floor(seed % 42)}</div>
                </div>
              </div>

              {/* Description */}
              <div className="px-4 py-3 border-b border-[--neon-ghost]">
                <div className="text-[0.42rem] text-[--neon-faint] tracking-[2px] uppercase mb-1">Description</div>
                <div className="text-[0.6rem] text-[--neon-dim] leading-relaxed italic">
                  {meta.icon} [{meta.label} Mode] {translation}
                </div>
              </div>

              {/* Acceptance criteria */}
              <div className="px-4 py-3 border-b border-[--neon-ghost]">
                <div className="text-[0.42rem] text-[--neon-faint] tracking-[2px] uppercase mb-1.5">Acceptance Criteria</div>
                <div className="space-y-1">
                  {[criteria1, criteria2, 'No regressions in developer morale'].map((c, i) => (
                    <div key={i} className="flex items-start gap-1.5">
                      <span className="text-[0.55rem] text-[--neon-ghost] mt-px">[ ]</span>
                      <span className="text-[0.55rem] text-[--neon-dim]">{c}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* PM Comment */}
              <div className="px-4 py-3 border-b border-[--neon-ghost]"
                style={{ background: '#0a001a' }}
              >
                <div className="flex items-center gap-1.5 mb-1.5">
                  <div className="w-4 h-4 rounded-full bg-[#4488ff22] border border-[#4488ff33] flex items-center justify-center text-[0.4rem] text-[#4488ff]">
                    PM
                  </div>
                  <span className="text-[0.45rem] text-[#4488ff] tracking-[1px]">Product Manager</span>
                  <span className="text-[0.4rem] text-[--neon-ghost]">- 2 minutes ago</span>
                </div>
                <div className="text-[0.58rem] text-[--neon-dim] italic pl-6">
                  "{pmComment}"
                </div>
              </div>

              {/* Copy button */}
              <div className="px-4 py-2">
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={copyTicket}
                  className="w-full text-[0.55rem] border border-[--neon-border] py-2 bg-transparent text-[--neon-dim] font-[inherit] cursor-pointer tracking-[2px] hover:bg-[#ff006622] hover:text-[--neon] transition-colors"
                >
                  {copied ? '✓ TICKET COPIED TO CLIPBOARD' : 'COPY TICKET AS TEXT'}
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
