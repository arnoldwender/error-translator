import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ErrorEntry, Persona } from '../data/errors';
import { PERSONA_META, ERROR_DATABASE, EASTER_EGGS } from '../data/errors';

/* ------------------------------------------------------------------ */
/* CLI Mode — terminal emulator that renders error translations as     */
/* ANSI-style colored CLI output, with a working command prompt        */
/* ------------------------------------------------------------------ */

interface CliModeProps {
  isActive: boolean;
  onToggle: () => void;
  persona: Persona;
  onPersonaChange: (p: Persona) => void;
}

/* Simulated ANSI color wrappers for display */
interface CliLine {
  text: string;
  color: string;
  bold?: boolean;
  indent?: number;
}

/* Available CLI "commands" */
const HELP_TEXT: CliLine[] = [
  { text: 'Error Translator CLI v6.6.6', color: 'var(--neon)', bold: true },
  { text: '', color: '' },
  { text: 'COMMANDS:', color: '#ffaa00', bold: true },
  { text: '  translate <error>   Translate an error message', color: '#44ff88' },
  { text: '  persona <name>      Switch persona (therapist|drama|genz|shakespeare|corporate)', color: '#44ff88' },
  { text: '  list                List all known error types', color: '#44ff88' },
  { text: '  status              Show current session stats', color: '#44ff88' },
  { text: '  clear               Clear terminal output', color: '#44ff88' },
  { text: '  help                Show this help message', color: '#44ff88' },
  { text: '  exit                Exit CLI mode', color: '#44ff88' },
  { text: '', color: '' },
  { text: 'TIPS:', color: '#ffaa00', bold: true },
  { text: '  - Tab to autocomplete error types', color: '#888888' },
  { text: '  - Up/Down arrows for command history', color: '#888888' },
  { text: '  - Type any error message to translate it', color: '#888888' },
];

export function CliMode({ isActive, onToggle, persona, onPersonaChange }: CliModeProps) {
  const [lines, setLines] = useState<CliLine[]>([]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [translateCount, setTranslateCount] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  /* Auto-scroll to bottom when new lines are added */
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  /* Focus input when CLI is opened */
  useEffect(() => {
    if (isActive && inputRef.current) {
      /* Show welcome message on first open */
      if (lines.length === 0) {
        setLines([
          { text: '  ___  ____  ____  _____  ____', color: 'var(--neon)', bold: true },
          { text: ' | __|| _ \\| _ \\|_   _||  _ \\', color: 'var(--neon)', bold: true },
          { text: ' | _| |   /|   /  | |  | |_) |', color: 'var(--neon)', bold: true },
          { text: ' |___||_|\\_\\|_|\\_\\  |_|  |____/', color: 'var(--neon)', bold: true },
          { text: '', color: '' },
          { text: 'Error Translator CLI v6.6.6', color: 'var(--neon)' },
          { text: 'Because errors have feelings too. Type "help" for commands.', color: '#888888' },
          { text: `Current persona: ${PERSONA_META[persona].icon} ${PERSONA_META[persona].label}`, color: '#4488ff' },
          { text: '', color: '' },
        ]);
      }
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isActive]);

  /* Find a matching error from the database */
  const findError = useCallback((query: string): ErrorEntry | null => {
    const trimmed = query.trim().toLowerCase();
    if (trimmed === '') return EASTER_EGGS[''];
    return ERROR_DATABASE.find((e) => trimmed.includes(e.code.toLowerCase())) || null;
  }, []);

  /* Process a CLI command */
  const processCommand = useCallback((cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    /* Add to history */
    setHistory((prev) => [trimmed, ...prev.slice(0, 49)]);
    setHistoryIndex(-1);

    /* Echo the command */
    const newLines: CliLine[] = [
      { text: `$ ${trimmed}`, color: '#44ff88', bold: true },
    ];

    const parts = trimmed.split(/\s+/);
    const command = parts[0].toLowerCase();
    const args = parts.slice(1).join(' ');

    switch (command) {
      case 'help':
        newLines.push(...HELP_TEXT);
        break;

      case 'clear':
        setLines([]);
        setInput('');
        return;

      case 'exit':
        onToggle();
        return;

      case 'persona': {
        const validPersonas = ['therapist', 'drama', 'genz', 'shakespeare', 'corporate'];
        if (validPersonas.includes(args.toLowerCase())) {
          const p = args.toLowerCase() as Persona;
          onPersonaChange(p);
          const meta = PERSONA_META[p];
          newLines.push({ text: `[OK] Persona switched to ${meta.icon} ${meta.label}`, color: '#44ff88' });
        } else {
          newLines.push({ text: `[ERR] Unknown persona: "${args}"`, color: '#ff4444' });
          newLines.push({ text: '  Available: therapist, drama, genz, shakespeare, corporate', color: '#888888' });
        }
        break;
      }

      case 'list':
        newLines.push({ text: `Known error types (${ERROR_DATABASE.length}):`, color: '#ffaa00', bold: true });
        newLines.push({ text: '', color: '' });
        ERROR_DATABASE.forEach((e, i) => {
          newLines.push({
            text: `  ${String(i + 1).padStart(2, ' ')}. ${e.emoji} ${e.code}`,
            color: '#888888',
          });
        });
        break;

      case 'status':
        newLines.push({ text: '--- SESSION STATUS ---', color: '#ffaa00', bold: true });
        newLines.push({ text: `  Persona:      ${PERSONA_META[persona].icon} ${PERSONA_META[persona].label}`, color: '#4488ff' });
        newLines.push({ text: `  Translations: ${translateCount}`, color: '#4488ff' });
        newLines.push({ text: `  Error DB:     ${ERROR_DATABASE.length} types`, color: '#4488ff' });
        newLines.push({ text: `  Emotional HP: ${Math.max(0, 100 - translateCount * 7)}/100`, color: translateCount > 10 ? '#ff4444' : '#44ff88' });
        newLines.push({ text: `  Will to code: ${translateCount > 5 ? 'Fading' : 'Moderate'}`, color: translateCount > 5 ? '#ff4444' : '#ffaa00' });
        break;

      case 'translate':
      default: {
        /* If user typed "translate <error>" or just typed an error directly */
        const query = command === 'translate' ? args : trimmed;

        if (!query.trim()) {
          newLines.push({ text: '[ERR] Usage: translate <error message>', color: '#ff4444' });
          break;
        }

        /* Show translating animation */
        newLines.push({ text: '', color: '' });
        newLines.push({ text: '[...] Scanning emotional registers...', color: '#888888' });
        newLines.push({ text: '[...] Calibrating empathy module...', color: '#888888' });
        newLines.push({ text: '[...] Consulting the feelings API...', color: '#888888' });
        newLines.push({ text: '', color: '' });

        const match = findError(query);
        if (match) {
          const meta = PERSONA_META[persona];
          const translation = match.translations[persona];
          setTranslateCount((c) => c + 1);

          newLines.push({ text: '=== TRANSLATION RESULT ===', color: 'var(--neon)', bold: true });
          newLines.push({ text: '', color: '' });
          newLines.push({ text: `  ${match.emoji} Error:    ${match.code}`, color: '#ff4444' });
          newLines.push({ text: `  ${meta.icon} Persona:  ${meta.label}`, color: '#4488ff' });
          newLines.push({ text: `  Severity: ${'█'.repeat(match.severity)}${'░'.repeat(4 - match.severity)} (${match.severity}/4)`, color: match.severity >= 3 ? '#ff4444' : '#ffaa00' });
          newLines.push({ text: '', color: '' });
          newLines.push({ text: '  Translation:', color: '#ffaa00', bold: true });
          /* Word-wrap the translation for terminal display */
          const words = translation.split(' ');
          let line = '    ';
          words.forEach((word) => {
            if ((line + word).length > 70) {
              newLines.push({ text: line, color: 'var(--neon)' });
              line = '    ' + word + ' ';
            } else {
              line += word + ' ';
            }
          });
          if (line.trim()) {
            newLines.push({ text: line, color: 'var(--neon)' });
          }
          newLines.push({ text: '', color: '' });
          newLines.push({ text: `  Therapy: ${match.therapy}`, color: '#888888' });
        } else {
          newLines.push({ text: `[WARN] No exact match for "${query}"`, color: '#ffaa00' });
          newLines.push({ text: '  Picking a random translation (because why not)', color: '#888888' });
          const random = ERROR_DATABASE[Math.floor(Math.random() * ERROR_DATABASE.length)];
          const meta = PERSONA_META[persona];
          setTranslateCount((c) => c + 1);

          newLines.push({ text: '', color: '' });
          newLines.push({ text: `  ${random.emoji} ${random.code}`, color: '#ff4444' });
          newLines.push({ text: `  ${meta.icon} ${random.translations[persona]}`, color: 'var(--neon)' });
          newLines.push({ text: `  Therapy: ${random.therapy}`, color: '#888888' });
        }

        newLines.push({ text: '', color: '' });
        newLines.push({ text: '=========================', color: 'var(--neon-faint)' });
        break;
      }
    }

    newLines.push({ text: '', color: '' });
    setLines((prev) => [...prev, ...newLines]);
    setInput('');
  }, [persona, onPersonaChange, onToggle, findError, translateCount]);

  /* Handle key events for history navigation */
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      processCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const newIndex = Math.min(historyIndex + 1, history.length - 1);
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      } else {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  }, [input, history, historyIndex, processCommand]);

  return (
    <>
      {/* Toggle button — always visible */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onToggle}
        className={`w-full text-[0.6rem] tracking-[2px] uppercase font-[inherit] cursor-pointer border py-2 mb-4 transition-colors ${
          isActive
            ? 'border-[--neon] bg-[#ff006622] text-[--neon]'
            : 'border-[--neon-ghost] bg-transparent text-[--neon-faint] hover:border-[--neon-border]'
        }`}
      >
        {isActive ? '[ EXIT CLI MODE ]' : '[ > ENTER CLI MODE ]'}
      </motion.button>

      {/* Terminal overlay */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="border border-[--neon-border] mb-6 overflow-hidden"
            style={{ background: '#050005' }}
          >
            {/* Terminal title bar */}
            <div className="flex items-center justify-between px-3 py-1.5 border-b border-[--neon-ghost]"
              style={{ background: '#0a0008' }}
            >
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-[#ff4444]" />
                <div className="w-2 h-2 rounded-full bg-[#ffaa00]" />
                <div className="w-2 h-2 rounded-full bg-[#44ff88]" />
              </div>
              <span className="text-[0.45rem] text-[--neon-faint] tracking-[2px]">
                error-translator -- zsh -- 80x24
              </span>
              <span className="text-[0.45rem] text-[--neon-ghost]">
                {PERSONA_META[persona].icon} {PERSONA_META[persona].label}
              </span>
            </div>

            {/* Terminal output */}
            <div
              ref={scrollRef}
              className="p-3 h-[400px] overflow-y-auto font-[inherit]"
              onClick={() => inputRef.current?.focus()}
            >
              {lines.map((line, i) => (
                <div
                  key={i}
                  className="leading-relaxed whitespace-pre-wrap"
                  style={{
                    color: line.color || '#888888',
                    fontSize: '0.65rem',
                    fontWeight: line.bold ? 700 : 400,
                    paddingLeft: line.indent ? `${line.indent}ch` : undefined,
                    textShadow: line.bold ? `0 0 8px ${line.color}44` : undefined,
                  }}
                >
                  {line.text || '\u00A0'}
                </div>
              ))}

              {/* Input prompt */}
              <div className="flex items-center gap-0" style={{ fontSize: '0.65rem' }}>
                <span style={{ color: '#44ff88' }}>$</span>
                <span style={{ color: '#44ff88' }}>&nbsp;</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent border-none outline-none font-[inherit] text-[--neon] p-0 m-0"
                  style={{ fontSize: '0.65rem', caretColor: 'var(--neon)' }}
                  spellCheck={false}
                  autoComplete="off"
                />
                <span className="animate-blink text-[--neon]">|</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
