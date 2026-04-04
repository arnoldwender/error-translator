import { useCallback, useRef } from 'react';

/* ------------------------------------------------------------------ */
/* Web Audio API sound effects engine                                  */
/* Uses oscillators and noise to generate sounds without external files */
/* ------------------------------------------------------------------ */

type SoundKey = 'sadTrombone' | 'glassBreak' | 'clockTick' | 'dramaticReveal' | 'errorBeep' | 'dial' | 'boom';

function getAudioContext(): AudioContext | null {
  try {
    return new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
  } catch {
    return null;
  }
}

/* Sad trombone: descending notes */
function playSadTrombone(ctx: AudioContext) {
  const notes = [311, 293, 277, 233];
  notes.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.15, ctx.currentTime + i * 0.3);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.3 + 0.35);
    osc.connect(gain).connect(ctx.destination);
    osc.start(ctx.currentTime + i * 0.3);
    osc.stop(ctx.currentTime + i * 0.3 + 0.4);
  });
}

/* Glass breaking: white noise burst */
function playGlassBreak(ctx: AudioContext) {
  const bufferSize = ctx.sampleRate * 0.4;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.15));
  }
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  const filter = ctx.createBiquadFilter();
  filter.type = 'highpass';
  filter.frequency.value = 3000;
  const gain = ctx.createGain();
  gain.gain.value = 0.2;
  source.connect(filter).connect(gain).connect(ctx.destination);
  source.start();
}

/* Clock ticking: short clicks */
function playClockTick(ctx: AudioContext) {
  for (let i = 0; i < 4; i++) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'square';
    osc.frequency.value = 800;
    gain.gain.setValueAtTime(0.1, ctx.currentTime + i * 0.25);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.25 + 0.05);
    osc.connect(gain).connect(ctx.destination);
    osc.start(ctx.currentTime + i * 0.25);
    osc.stop(ctx.currentTime + i * 0.25 + 0.06);
  }
}

/* Dramatic reveal: rising chord */
function playDramaticReveal(ctx: AudioContext) {
  const freqs = [220, 277, 330, 440];
  freqs.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.3 + i * 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.0 + i * 0.1);
    osc.connect(gain).connect(ctx.destination);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 1.2);
  });
}

/* Error beep: short descending tone */
function playErrorBeep(ctx: AudioContext) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'square';
  osc.frequency.setValueAtTime(600, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.2);
  gain.gain.setValueAtTime(0.1, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
  osc.connect(gain).connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.3);
}

/* Dial tone: phone dialing sound */
function playDial(ctx: AudioContext) {
  const freqs = [350, 440];
  freqs.forEach((freq) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.7);
  });
}

/* Boom: low frequency explosion */
function playBoom(ctx: AudioContext) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(80, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(20, ctx.currentTime + 0.5);
  gain.gain.setValueAtTime(0.3, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
  osc.connect(gain).connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.7);
}

const SOUND_MAP: Record<SoundKey, (ctx: AudioContext) => void> = {
  sadTrombone: playSadTrombone,
  glassBreak: playGlassBreak,
  clockTick: playClockTick,
  dramaticReveal: playDramaticReveal,
  errorBeep: playErrorBeep,
  dial: playDial,
  boom: playBoom,
};

export function useSoundEffects() {
  const ctxRef = useRef<AudioContext | null>(null);
  const enabledRef = useRef(true);

  const play = useCallback((key: SoundKey) => {
    if (!enabledRef.current) return;
    if (!ctxRef.current) {
      ctxRef.current = getAudioContext();
    }
    const ctx = ctxRef.current;
    if (!ctx) return;
    /* Resume context if suspended (browser autoplay policy) */
    if (ctx.state === 'suspended') {
      ctx.resume();
    }
    const fn = SOUND_MAP[key];
    if (fn) fn(ctx);
  }, []);

  const toggle = useCallback(() => {
    enabledRef.current = !enabledRef.current;
    return enabledRef.current;
  }, []);

  return { play, toggle, isEnabled: () => enabledRef.current };
}
