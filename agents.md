# agents.md — AI Agent Guidelines

Guidelines for AI agents and coding assistants working on the Error Translator project.

## Repository Context

- **Repo**: `arnoldwender/error-translator`
- **Type**: Client-side React web application
- **Purpose**: Humorously translates programming errors into empathetic, human-readable messages with therapeutic advice
- **Stack**: React 18, TypeScript, Vite 5, Tailwind CSS 3

## Development Workflow

1. **Before making changes**: Run `npm run typecheck` and `npm run lint` to establish a clean baseline
2. **After making changes**: Run `npm run typecheck && npm run lint` to verify no regressions
3. **Testing**: No test framework is currently configured — verify changes manually via `npm run dev`
4. **Building**: Run `npm run build` to ensure production build succeeds

## Key Files to Know

| File | Purpose |
| --- | --- |
| `src/data/errors.ts` | Error database — add new error translations here |
| `src/hooks/useTranslation.ts` | Core translation logic and state machine |
| `src/App.tsx` | Root component, wires everything together |
| `src/index.css` | Theme variables (neon colors), animations, custom scrollbar |
| `tailwind.config.js` | Tailwind configuration |
| `vite.config.ts` | Vite bundler configuration |

## Adding New Error Translations

To add a new error type, add an entry to `ERROR_DATABASE` in `src/data/errors.ts`:

```typescript
{
  code: "ERROR_CODE_OR_SUBSTRING",  // matched case-insensitively
  human: "Empathetic, witty translation",
  therapy: "Therapeutic advice with humor",
  emoji: "🎯",
}
```

Optionally add the error code to the `SUGGESTIONS` array to make it a quick-access button.

## Coding Conventions

- TypeScript strict mode — avoid `any`, prefer explicit types
- Functional React components only (no class components)
- Props defined as TypeScript interfaces
- Tailwind utility classes for styling; CSS variables for theme colors
- Component files are PascalCase, hooks use `use` prefix, data/utils are camelCase
- Maintain the humorous, empathetic tone in all user-facing text

## Architecture Constraints

- **Client-side only** — no server-side rendering, no API calls
- **No state management library** — React hooks (`useState`, `useCallback`) are sufficient
- **Error matching** is simple substring search — no regex or fuzzy matching currently
- **Supabase** dependency exists but is unused; do not remove without explicit instruction
