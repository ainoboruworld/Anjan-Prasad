# Anjan Prasad

A modern Next.js application scaffolded with the App Router, TypeScript,
Tailwind CSS, and ESLint.

## Design system

Global theme tokens live in [`src/app/globals.css`](src/app/globals.css) as
CSS custom properties, exposed to Tailwind through Tailwind v4's `@theme`
layer. The system targets an elite advisory aesthetic: a deep-navy primary
with a warm gold accent, restrained neutral surfaces, crisp typography, and
full light/dark support. Rebrand the whole surface by editing the tokens in
one place.

## Getting started

```bash
npm install
npm run dev      # start the dev server at http://localhost:3000
npm run build    # production build
npm run lint     # run ESLint
```

## Structure

- `src/app` — App Router entry points (`layout.tsx`, `page.tsx`, `globals.css`)
- `public` — static assets (starts empty; add your own)
