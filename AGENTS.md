<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Project guidance

## Project structure

This repository is a Next.js 16 App Router application using React 19,
TypeScript, Tailwind CSS 4, and npm.

- `app/`: routes, pages, layouts, and global styles
- `components/`: reusable, domain-independent UI components
- `features/`: domain-specific components, hooks, contexts, API modules,
  constants, types, and mocks
- `lib/`: shared library configuration and providers
- `services/`: shared service-layer code
- `store/`: shared Zustand state
- `constants/`: application-wide constants
- `utils/`: small reusable utilities
- `public/`: static assets

The `@/*` alias resolves from the repository root. Prefer it for
cross-directory imports. Relative imports may be used for closely related
files within the same feature.

## Next.js and React

- Use the App Router conventions already present under `app/`.
- Treat components as Server Components by default.
- Add `'use client'` only when the component needs state, effects, browser
  APIs, event handlers, client-side context, or client-only libraries.
- Keep the client boundary as narrow as practical.
- Use `next/link` and `next/navigation` rather than React Router.
- Before changing framework behavior, read the relevant documentation in
  `node_modules/next/dist/docs/` as required by the generated rules above.
- Do not modify or remove the generated `nextjs-agent-rules` block.

## Code organization

- Put reusable, domain-independent UI in `components/`.
- Put domain-specific code under `features/<domain>/`.
- Keep route files focused on route composition. Move substantial UI and
  domain behavior into the appropriate feature.
- Keep domain types, constants, mocks, hooks, and API code within their
  feature unless they are genuinely shared across the application.
- Reuse existing providers and utilities before creating parallel
  abstractions.

## TypeScript and formatting

- Preserve strict TypeScript behavior and avoid weakening `tsconfig.json`.
- Prefer explicit domain types over `any`, even though the ESLint rule
  currently permits explicit `any`.
- Use type-only imports where an import is used only as a type.
- Follow the repository Prettier configuration: 80-column width, single
  quotes, and Tailwind class sorting.
- Follow the existing ESLint flat configuration and Next.js TypeScript and
  Core Web Vitals rules.

## Installed application patterns

- Use React Hook Form for form state.
- Use Zod and `@hookform/resolvers` when runtime validation is required.
- Use TanStack React Query for remote server state.
- Use the shared Axios configuration for HTTP communication.
- Use Zustand with Immer for shared client state that does not belong in
  server state.
- Do not add an alternative library for an established concern without a
  concrete need.

## Development workflow

For non-trivial features and bug fixes:

1. Inspect the affected routes, features, types, and configuration.
2. State a concise implementation plan before editing.
3. Implement the smallest coherent change that follows existing patterns.
4. Review the diff for unrelated changes, client-boundary expansion, missing
   states, and type regressions.
5. Run the applicable validation commands.

Do not overwrite or revert unrelated changes already present in the working
tree.

## Commands and validation

```bash
npm run dev
npm run lint
npx tsc --noEmit
npm run build
npm run start
