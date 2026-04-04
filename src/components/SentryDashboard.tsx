import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import type { ErrorEntry, Persona } from '../data/errors';

/* ------------------------------------------------------------------ */
/* Sentry-style issue dashboard — fake monitoring UI for translated    */
/* errors, complete with issue ID, event counts, frequency graph,      */
/* assignee dropdown, and status management                            */
/* ------------------------------------------------------------------ */

interface SentryDashboardProps {
  result: ErrorEntry;
  persona: Persona;
}

/* Deterministic pseudo-random from error code string */
function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

/* Generate a fake frequency sparkline as SVG points */
function generateSparkline(seed: number): string {
  const points: number[] = [];
  let val = 20 + (seed % 40);
  for (let i = 0; i < 24; i++) {
    val = Math.max(5, Math.min(55, val + (((seed * (i + 1) * 7) % 21) - 10)));
    points.push(val);
  }
  return points
    .map((y, i) => `${(i / 23) * 200},${60 - y}`)
    .join(' ');
}

/* Assignee options with humorous labels */
const ASSIGNEES = [
  'Yourself',
  'Future You',
  'The Intern',
  'Nobody (won\'t fix)',
  'Stack Overflow',
  'The Universe',
];

/* Status options with emotional flair */
const STATUSES = [
  { key: 'unresolved', label: 'Unresolved', color: '#ff4444' },
  { key: 'resolved', label: 'Resolved', color: '#44ff88' },
  { key: 'ignored', label: 'Ignored', color: '#888888' },
  { key: 'cried', label: 'Cried About It', color: '#8844ff' },
  { key: 'blamed', label: 'Blamed the Framework', color: '#ff8844' },
];

/* "First seen" options — all absurd */
const FIRST_SEEN_OPTIONS = [
  'the moment you touched this codebase',
  'when you ran npm install',
  'since the Big Bang (of your git init)',
  'right after you said "this should be easy"',
  'the second you opened VS Code',
  'when Mercury was in retrograde',
];

export function SentryDashboard({ result, persona }: SentryDashboardProps) {
  const seed = hashCode(result.code + persona);
  const issueNumber = 1000 + (seed % 9000);
  const eventCount = 100 + (seed % 2000);
  const firstSeen = FIRST_SEEN_OPTIONS[seed % FIRST_SEEN_OPTIONS.length];

  const [assignee, setAssignee] = useState(ASSIGNEES[0]);
  const [status, setStatus] = useState(STATUSES[0]);
  const [showAssigneeDropdown, setShowAssigneeDropdown] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);

  /* SVG sparkline polyline points */
  const sparklinePoints = useMemo(() => generateSparkline(seed), [seed]);

  /* Severity to Sentry-style level mapping */
  const levelMap: Record<number, { label: string; color: string }> = {
    1: { label: 'INFO', color: '#4488ff' },
    2: { label: 'WARNING', color: '#ffaa00' },
    3: { label: 'ERROR', color: '#ff4444' },
    4: { label: 'FATAL', color: '#ff0066' },
  };
  const level = levelMap[result.severity] || levelMap[2];

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="border border-[--neon-ghost] mb-4 overflow-hidden"
    >
      {/* Header bar — mimics Sentry issue header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-[--neon-ghost]"
        style={{ background: 'linear-gradient(90deg, #0a0005 0%, #120008 100%)' }}
      >
        <div className="flex items-center gap-2">
          <span
            className="text-[0.5rem] font-bold px-1.5 py-0.5 tracking-[1px]"
            style={{ background: level.color + '22', color: level.color, border: `1px solid ${level.color}44` }}
          >
            {level.label}
          </span>
          <span className="text-[0.65rem] text-[--neon] tracking-[2px] font-bold">
            FEELINGS-{issueNumber}
          </span>
        </div>
        <div className="text-[0.5rem] text-[--neon-faint] tracking-[1px]">
          EMOTIONAL DEBUG SUITE
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 border-b border-[--neon-ghost]">
        <div className="px-3 py-2 border-r border-[--neon-ghost]">
          <div className="text-[0.45rem] text-[--neon-faint] tracking-[2px] uppercase mb-0.5">Events</div>
          <div className="text-[0.75rem] text-[--neon]">{eventCount.toLocaleString()}</div>
        </div>
        <div className="px-3 py-2 border-r border-[--neon-ghost]">
          <div className="text-[0.45rem] text-[--neon-faint] tracking-[2px] uppercase mb-0.5">Users Affected</div>
          <div className="text-[0.75rem] text-[--neon]">just you</div>
        </div>
        <div className="px-3 py-2">
          <div className="text-[0.45rem] text-[--neon-faint] tracking-[2px] uppercase mb-0.5">Occurrences/hr</div>
          <div className="text-[0.75rem] text-[--neon]">{Math.floor(eventCount / 24)}</div>
        </div>
      </div>

      {/* Timeline row */}
      <div className="grid grid-cols-2 border-b border-[--neon-ghost]">
        <div className="px-3 py-2 border-r border-[--neon-ghost]">
          <div className="text-[0.45rem] text-[--neon-faint] tracking-[2px] uppercase mb-0.5">First Seen</div>
          <div className="text-[0.6rem] text-[--neon-dim] italic">{firstSeen}</div>
        </div>
        <div className="px-3 py-2">
          <div className="text-[0.45rem] text-[--neon-faint] tracking-[2px] uppercase mb-0.5">Last Seen</div>
          <div className="text-[0.6rem] text-[--neon-dim]">3 seconds ago</div>
        </div>
      </div>

      {/* Frequency graph — mini SVG sparkline */}
      <div className="px-4 py-3 border-b border-[--neon-ghost]">
        <div className="text-[0.45rem] text-[--neon-faint] tracking-[2px] uppercase mb-2">
          Error Frequency (24h)
        </div>
        <svg viewBox="0 0 200 60" className="w-full h-12" preserveAspectRatio="none">
          {/* Grid lines */}
          {[15, 30, 45].map((y) => (
            <line key={y} x1="0" y1={y} x2="200" y2={y} stroke="#ff006611" strokeWidth="0.5" />
          ))}
          {/* Area fill */}
          <polygon
            points={`0,60 ${sparklinePoints} 200,60`}
            fill="url(#sparkGradient)"
          />
          {/* Line */}
          <polyline
            points={sparklinePoints}
            fill="none"
            stroke="var(--neon)"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <defs>
            <linearGradient id="sparkGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ff006644" />
              <stop offset="100%" stopColor="#ff006600" />
            </linearGradient>
          </defs>
        </svg>
        <div className="flex justify-between text-[0.4rem] text-[--neon-ghost] mt-1">
          <span>24h ago</span>
          <span>12h ago</span>
          <span>now</span>
        </div>
      </div>

      {/* Controls — Assignee + Status */}
      <div className="grid grid-cols-2 gap-0">
        {/* Assignee dropdown */}
        <div className="px-3 py-2 border-r border-[--neon-ghost] relative">
          <div className="text-[0.45rem] text-[--neon-faint] tracking-[2px] uppercase mb-1">Assigned To</div>
          <button
            onClick={() => { setShowAssigneeDropdown(!showAssigneeDropdown); setShowStatusDropdown(false); }}
            className="w-full text-left text-[0.6rem] text-[--neon-dim] bg-[--bg-panel] border border-[--neon-ghost] px-2 py-1.5 font-[inherit] cursor-pointer hover:border-[--neon-border] transition-colors flex justify-between items-center"
          >
            <span>{assignee}</span>
            <span className="text-[--neon-faint]">{showAssigneeDropdown ? '▲' : '▼'}</span>
          </button>
          {showAssigneeDropdown && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute left-3 right-3 top-full mt-0.5 z-20 border border-[--neon-border] bg-[#0a0005]"
            >
              {ASSIGNEES.map((a) => (
                <button
                  key={a}
                  onClick={() => { setAssignee(a); setShowAssigneeDropdown(false); }}
                  className={`w-full text-left text-[0.55rem] px-2 py-1.5 bg-transparent border-none font-[inherit] cursor-pointer transition-colors ${
                    a === assignee ? 'text-[--neon] bg-[#ff006622]' : 'text-[--neon-dim] hover:bg-[#ff006611]'
                  }`}
                >
                  {a}
                </button>
              ))}
            </motion.div>
          )}
        </div>

        {/* Status dropdown */}
        <div className="px-3 py-2 relative">
          <div className="text-[0.45rem] text-[--neon-faint] tracking-[2px] uppercase mb-1">Status</div>
          <button
            onClick={() => { setShowStatusDropdown(!showStatusDropdown); setShowAssigneeDropdown(false); }}
            className="w-full text-left text-[0.6rem] bg-[--bg-panel] border border-[--neon-ghost] px-2 py-1.5 font-[inherit] cursor-pointer hover:border-[--neon-border] transition-colors flex justify-between items-center"
            style={{ color: status.color }}
          >
            <span>{status.label}</span>
            <span className="text-[--neon-faint]">{showStatusDropdown ? '▲' : '▼'}</span>
          </button>
          {showStatusDropdown && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute left-3 right-3 top-full mt-0.5 z-20 border border-[--neon-border] bg-[#0a0005]"
            >
              {STATUSES.map((s) => (
                <button
                  key={s.key}
                  onClick={() => { setStatus(s); setShowStatusDropdown(false); }}
                  className="w-full text-left text-[0.55rem] px-2 py-1.5 bg-transparent border-none font-[inherit] cursor-pointer hover:bg-[#ff006611] transition-colors"
                  style={{ color: s.color }}
                >
                  {s.label}
                </button>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      {/* Tags row */}
      <div className="px-4 py-2 border-t border-[--neon-ghost] flex flex-wrap gap-1.5">
        {['emotional-damage', `severity:${result.severity}`, persona, 'needs-therapy', 'wont-fix'].map((tag) => (
          <span
            key={tag}
            className="text-[0.45rem] px-1.5 py-0.5 border border-[--neon-ghost] text-[--neon-faint] tracking-[1px]"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
