# Error Translator v6.6.6

> Because Errors Have Feelings Too

A humorous, emotionally-intelligent error message decoder that translates cryptic programming errors into honest, empathetic descriptions with therapeutic advice. Built with a retro-futuristic neon aesthetic.

## Features

- **Error Translation** — Paste any error message and get an honest, human-readable interpretation with emotional support
- **18 Built-in Error Types** — Covers common errors: ECONNREFUSED, TypeError, 404/500/401/403, CORS, git merge conflicts, npm dependency issues, segfaults, and more
- **Quick Suggestions** — 9 one-click buttons for common error messages
- **Simulated Processing** — Animated "translation logs" for dramatic effect (consulting emotional support algorithms...)
- **Retro CRT Aesthetic** — Scanline overlay, glitching title, neon pink (#ff0066) color scheme, JetBrains Mono font
- **Retranslate** — Get a different random translation for unrecognized errors
- **Keyboard Shortcuts** — Ctrl/Cmd+Enter to translate

## Tech Stack

- **React 18** with TypeScript
- **Vite 5** — Build tool and dev server
- **Tailwind CSS 3** — Utility-first styling with custom CSS variables and animations
- **Lucide React** — Icon library
- **ESLint 9** — Code linting with React hooks plugin

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Opens a local dev server (default: http://localhost:5173).

### Build

```bash
npm run build
```

Outputs production files to `dist/`.

### Other Scripts

| Command             | Description                    |
| ------------------- | ------------------------------ |
| `npm run dev`       | Start Vite dev server          |
| `npm run build`     | Production build               |
| `npm run preview`   | Preview production build       |
| `npm run lint`      | Run ESLint                     |
| `npm run typecheck` | Run TypeScript type checking   |

## Project Structure

```
src/
├── components/          # React UI components
│   ├── ErrorInput.tsx   # Textarea input + suggestion buttons
│   ├── Header.tsx       # Glitching title + translation counter
│   ├── ResultCard.tsx   # Error translation result display
│   ├── TranslationLogs.tsx  # Animated processing log lines
│   ├── IdleState.tsx    # Initial state placeholder
│   ├── ScanlineOverlay.tsx  # CRT/scanline visual effect
│   └── Footer.tsx       # Disclaimer footer
├── data/
│   └── errors.ts        # Error database, suggestions, log messages
├── hooks/
│   ├── useTranslation.ts    # Core translation state machine (idle → translating → done)
│   └── useGlitchTitle.ts    # Animated title character replacement
├── utils/
│   └── glitch.ts        # Text glitch helper
├── App.tsx              # Root component
├── main.tsx             # React entry point
└── index.css            # Tailwind base + custom animations & theme variables
```

## How It Works

1. User pastes or selects an error message
2. The app runs a simulated "translation" sequence with animated log messages
3. Error matching uses case-insensitive substring search against the 18-entry database
4. Unrecognized errors get a random translation from the database
5. Results show: emoji, original error, human translation, and therapy advice

## Architecture

- **Client-side only** — No backend required; all translations are from a local database
- **State machine** — `useTranslation` hook manages three phases: `idle` → `translating` → `done`
- **CSS variables** — Neon theme colors defined as custom properties in `index.css`

## License

This project is provided as-is for educational and entertainment purposes.
