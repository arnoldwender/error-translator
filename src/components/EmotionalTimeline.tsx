import { useMemo } from 'react';
import { motion } from 'framer-motion';
import type { ErrorEntry } from '../data/errors';

/* ------------------------------------------------------------------ */
/* Grafana-styled emotional state timeline — fake metrics dashboard    */
/* showing emotional state over time, MTTER, burnout risk score,       */
/* and color-coded severity bands                                      */
/* ------------------------------------------------------------------ */

interface EmotionalTimelineProps {
  result: ErrorEntry;
  translationCount: number;
}

/* Deterministic pseudo-random seeded generator */
function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    return s / 0x7fffffff;
  };
}

/* Generate emotional state data points for the SVG chart */
function generateTimeline(severity: number, count: number): number[] {
  const rng = seededRandom(severity * 1000 + count);
  const points: number[] = [];
  /* 30 data points representing the past 60 minutes */
  let state = 50 + (severity * 8);
  for (let i = 0; i < 30; i++) {
    /* Emotional state fluctuates, trending worse with higher severity */
    const drift = (rng() - 0.45) * 25;
    state = Math.max(10, Math.min(95, state + drift));
    points.push(state);
  }
  return points;
}

/* Severity bands for the chart background */
const SEVERITY_BANDS = [
  { y: 0, height: 25, color: '#ff006622', label: 'CRITICAL' },
  { y: 25, height: 25, color: '#ff440011', label: 'SEVERE' },
  { y: 50, height: 25, color: '#ffaa0008', label: 'MODERATE' },
  { y: 75, height: 25, color: '#44ff8805', label: 'CALM' },
];

/* Metric card data */
function getMetrics(severity: number, count: number) {
  const mtter = Math.max(12, 47 + (severity * 11) - Math.min(count, 20));
  const burnout = Math.min(99, 40 + (severity * 12) + Math.min(count * 2, 30));
  const copingScore = Math.max(5, 80 - (severity * 15) - Math.min(count, 15));
  const coffeeNeeded = Math.ceil(severity * 1.5 + count * 0.3);

  return { mtter, burnout, copingScore, coffeeNeeded };
}

export function EmotionalTimeline({ result, translationCount }: EmotionalTimelineProps) {
  const dataPoints = useMemo(
    () => generateTimeline(result.severity, translationCount),
    [result.severity, translationCount]
  );

  const metrics = useMemo(
    () => getMetrics(result.severity, translationCount),
    [result.severity, translationCount]
  );

  /* Build SVG polyline from data — invert Y since SVG 0 is top */
  const linePoints = dataPoints
    .map((val, i) => `${(i / 29) * 280},${100 - val}`)
    .join(' ');

  /* Area polygon for gradient fill */
  const areaPoints = `0,100 ${linePoints} 280,100`;

  /* Color for burnout indicator */
  const burnoutColor = metrics.burnout > 80 ? '#ff0066' : metrics.burnout > 60 ? '#ff4444' : metrics.burnout > 40 ? '#ffaa00' : '#44ff88';

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="border border-[--neon-ghost] mb-4 overflow-hidden"
    >
      {/* Dashboard header — Grafana style */}
      <div
        className="flex items-center justify-between px-4 py-2 border-b border-[--neon-ghost]"
        style={{ background: 'linear-gradient(90deg, #050010 0%, #0a0015 100%)' }}
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: burnoutColor }} />
          <span className="text-[0.6rem] text-[--neon-dim] tracking-[2px] uppercase">
            Developer Emotional State
          </span>
        </div>
        <span className="text-[0.45rem] text-[--neon-ghost] tracking-[1px]">
          LAST 60 MIN
        </span>
      </div>

      {/* Metric cards row */}
      <div className="grid grid-cols-4 border-b border-[--neon-ghost]">
        {/* MTTER */}
        <div className="px-3 py-2 border-r border-[--neon-ghost]">
          <div className="text-[0.38rem] text-[--neon-faint] tracking-[1px] uppercase mb-0.5">MTTER</div>
          <div className="text-[0.7rem] text-[--neon]">{metrics.mtter}m</div>
          <div className="text-[0.35rem] text-[--neon-ghost] mt-0.5">Mean Time to Emotional Recovery</div>
        </div>
        {/* Burnout Risk */}
        <div className="px-3 py-2 border-r border-[--neon-ghost]">
          <div className="text-[0.38rem] text-[--neon-faint] tracking-[1px] uppercase mb-0.5">Burnout Risk</div>
          <div className="text-[0.7rem]" style={{ color: burnoutColor }}>{metrics.burnout}%</div>
          <div className="text-[0.35rem] text-[--neon-ghost] mt-0.5">
            {metrics.burnout > 80 ? 'CRITICAL' : metrics.burnout > 60 ? 'Elevated' : metrics.burnout > 40 ? 'Moderate' : 'Low'}
          </div>
        </div>
        {/* Coping Score */}
        <div className="px-3 py-2 border-r border-[--neon-ghost]">
          <div className="text-[0.38rem] text-[--neon-faint] tracking-[1px] uppercase mb-0.5">Coping Score</div>
          <div className="text-[0.7rem] text-[--neon-dim]">{metrics.copingScore}/100</div>
          <div className="text-[0.35rem] text-[--neon-ghost] mt-0.5">Self-assessment</div>
        </div>
        {/* Coffee Required */}
        <div className="px-3 py-2">
          <div className="text-[0.38rem] text-[--neon-faint] tracking-[1px] uppercase mb-0.5">Coffee Req.</div>
          <div className="text-[0.7rem] text-[--neon-dim]">{metrics.coffeeNeeded} cups</div>
          <div className="text-[0.35rem] text-[--neon-ghost] mt-0.5">To survive this</div>
        </div>
      </div>

      {/* SVG Chart — Grafana-style emotional timeline */}
      <div className="px-4 py-3">
        <svg viewBox="0 0 280 100" className="w-full h-24" preserveAspectRatio="none">
          {/* Severity band backgrounds */}
          {SEVERITY_BANDS.map((band) => (
            <rect
              key={band.label}
              x="0" y={band.y}
              width="280" height={band.height}
              fill={band.color}
            />
          ))}

          {/* Horizontal grid lines */}
          {[25, 50, 75].map((y) => (
            <line key={y} x1="0" y1={y} x2="280" y2={y} stroke="#ff006615" strokeWidth="0.5" strokeDasharray="4,4" />
          ))}

          {/* Area fill under the line */}
          <polygon points={areaPoints} fill="url(#emoGradient)" />

          {/* The emotional state line */}
          <motion.polyline
            points={linePoints}
            fill="none"
            stroke="var(--neon)"
            strokeWidth="1.5"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />

          {/* Current state dot */}
          <motion.circle
            cx={(29 / 29) * 280}
            cy={100 - dataPoints[29]}
            r="3"
            fill="var(--neon)"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.5 }}
          />

          <defs>
            <linearGradient id="emoGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ff006633" />
              <stop offset="100%" stopColor="#ff006600" />
            </linearGradient>
          </defs>
        </svg>

        {/* Severity band labels on the right */}
        <div className="flex justify-between text-[0.38rem] text-[--neon-ghost] mt-1">
          <span>60 min ago</span>
          <div className="flex gap-3">
            <span style={{ color: '#44ff8866' }}>CALM</span>
            <span style={{ color: '#ffaa0066' }}>MOD</span>
            <span style={{ color: '#ff444466' }}>SEV</span>
            <span style={{ color: '#ff006666' }}>CRIT</span>
          </div>
          <span>now</span>
        </div>
      </div>

      {/* Burnout risk progress bar */}
      <div className="px-4 py-2 border-t border-[--neon-ghost]">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[0.42rem] text-[--neon-faint] tracking-[2px] uppercase">Burnout Risk Score</span>
          <span className="text-[0.5rem] font-bold" style={{ color: burnoutColor }}>{metrics.burnout}%</span>
        </div>
        <div className="h-1.5 bg-[--neon-ghost] overflow-hidden">
          <motion.div
            className="h-full"
            style={{ background: `linear-gradient(90deg, #44ff88, #ffaa00, #ff4444, ${burnoutColor})` }}
            initial={{ width: 0 }}
            animate={{ width: `${metrics.burnout}%` }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.5 }}
          />
        </div>
      </div>
    </motion.div>
  );
}
