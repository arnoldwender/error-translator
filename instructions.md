# instructions.md — Development Instructions

## Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The dev server runs at http://localhost:5173 with hot module replacement.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | TypeScript compile + Vite production build |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint on the project |
| `npm run typecheck` | Run TypeScript type checking without emitting |

## Project Structure

```
src/
├── components/       # UI components (ErrorInput, Header, ResultCard, etc.)
├── data/             # Static data (error database, suggestions, log messages)
├── hooks/            # Custom React hooks (useTranslation, useGlitchTitle)
├── utils/            # Utility functions (glitch text helper)
├── App.tsx           # Root component
├── main.tsx          # Entry point (React DOM render)
└── index.css         # Global styles, Tailwind directives, CSS variables, animations
```

## How the App Works

### Translation Flow

1. User types or selects an error message in the input textarea
2. Pressing "Translate" (or Ctrl/Cmd+Enter) starts the translation
3. The `useTranslation` hook transitions from `idle` → `translating` → `done`
4. During `translating`, six log messages appear sequentially (300ms apart) simulating processing
5. After all logs display, the matched (or random) error translation appears as a result card
6. User can "Retranslate" for a different result or "New Error" to reset

### Error Matching

The error database (`src/data/errors.ts`) contains 18 entries. Matching works by:
- Converting input to lowercase
- Checking if any `ErrorEntry.code` is a substring of the input (case-insensitive)
- If no match: selecting a random entry from the database

### Theming

The visual theme uses CSS custom properties defined in `src/index.css`:
- Primary neon color: `--neon: #ff0066`
- Various opacity variants: `--neon-dim`, `--neon-faint`, `--neon-ghost`, `--neon-whisper`
- Dark backgrounds: `--bg-deep: #000000`, `--bg-panel: #0a0005`
- Font: JetBrains Mono (monospace, loaded from Google Fonts)

### Animations

Defined in `src/index.css` via `@keyframes`:
- `blink` — Cursor/prompt indicator
- `scandown` — CRT scanline sweep (7s loop)
- `fade-in` — Log entry appearance (0.4s)
- `float-in` — Result card entrance (0.5s)
- `pulse-glow` — Button glow effect (2s)

## Configuration

- **TypeScript**: Strict mode enabled, target ES2020 (`tsconfig.app.json`)
- **Tailwind**: Scans `index.html` and `src/**/*.{js,ts,jsx,tsx}` (`tailwind.config.js`)
- **Vite**: React plugin enabled (`vite.config.ts`)
- **ESLint**: Flat config with React hooks and React Refresh plugins (`eslint.config.js`)

## Contributing

- Follow TypeScript strict mode — no `any` types
- Use functional components with hooks
- Style with Tailwind utilities; use CSS variables only for theme values
- Keep the humorous, empathetic voice consistent across all user-facing copy
- Run `npm run typecheck && npm run lint` before committing
