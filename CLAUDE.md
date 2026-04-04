# CLAUDE.md — Instructions for Claude Code

This file provides context for Claude Code (and other AI assistants) working on this repository.

## Project Overview

Error Translator is a client-side React app that humorously translates programming error messages into empathetic, human-readable descriptions with therapeutic advice. It uses a retro neon CRT aesthetic.

## Commands

```bash
npm run dev        # Start dev server (Vite, port 5173)
npm run build      # Production build to dist/
npm run lint       # ESLint
npm run typecheck  # TypeScript type checking (tsc --noEmit)
npm run preview    # Preview production build
```

## Tech Stack

- React 18 + TypeScript (strict mode)
- Vite 5 (bundler/dev server)
- Tailwind CSS 3 (utility classes + CSS custom properties for neon theme)
- ESLint 9 with react-hooks and react-refresh plugins

## Code Architecture

### Key Patterns

- **Components** are in `src/components/` — functional React components with TypeScript interfaces for props
- **Hooks** are in `src/hooks/` — `useTranslation` is the core state machine (idle → translating → done), `useGlitchTitle` handles the animated title effect
- **Data** is in `src/data/errors.ts` — the `ERROR_DATABASE` array contains all 18 error translations; `SUGGESTIONS` lists quick-access buttons; `TRANSLATE_LOGS` defines the simulated processing messages
- **Styling** uses Tailwind utilities combined with CSS custom properties defined in `src/index.css` (neon color scheme: `--neon: #ff0066`)
- **No backend** — everything runs client-side with a hardcoded error database

### State Flow

1. `App.tsx` manages input state and delegates translation to `useTranslation` hook
2. `useTranslation` uses `setInterval` to simulate processing (300ms per log line)
3. Error matching is case-insensitive substring search; unmatched errors get a random entry
4. Result includes: emoji, original error code, human translation, therapy advice

### File Naming

- Components: PascalCase (e.g., `ErrorInput.tsx`)
- Hooks: camelCase with `use` prefix (e.g., `useTranslation.ts`)
- Utils: camelCase (e.g., `glitch.ts`)
- Data: camelCase (e.g., `errors.ts`)

## Style Guidelines

- Use TypeScript strict mode — no `any` types
- Prefer functional components with hooks
- Export interfaces for component props
- Use Tailwind utility classes for styling; only use `index.css` for animations and CSS variables
- Keep the humorous, empathetic tone in error translations and UI copy
- Maintain the retro-futuristic neon aesthetic (pink/magenta on black)

## Notes

- `@supabase/supabase-js` is installed but currently unused — it was included for potential future backend integration
- The app is fully self-contained with no external API calls
- Font: JetBrains Mono (loaded from Google Fonts in `index.html`)
