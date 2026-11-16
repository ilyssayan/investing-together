# Investing, together

A beginner investing education prototype for INFO 4505, designed for girls and young women. Includes short lessons and practice questions, progress tracking, market news explanations with source links and article images, a searchable linked glossary, and sample community discussions.

## Run locally

Requires Node.js and npm.

```sh
npm ci
npm run dev
```

Open the local URL printed by Next.js (normally http://localhost:3000).

## Optional services

Copy `.env.example` to `.env.local` and supply your own credentials. Never commit `.env.local`.

- **Supabase:** Set the public project URL and publishable key to enable accounts. Run `supabase/schema.sql` in your project's SQL editor.
- **News explanations:** Set `ANTHROPIC_API_KEY` to enable generated explanations of RSS headlines. API calls may incur charges. Without credentials, the app uses its saved news edition.

The community is a prototype with sample discussions; posting is disabled. News images use public article-preview metadata when available and fall back to text-only cards when unavailable. Educational examples are not personalized financial advice.

## Checks

```sh
npm run lint
npx next typegen
npx tsc --noEmit
npm run build
```

To keep production build artifacts separate from a running development server:

```sh
NEXT_DIST_DIR=.next-check npm run build
```

Built with Next.js App Router, TypeScript, Tailwind CSS, Motion, GSAP, and optional Supabase services. Fonts are downloaded by Next.js at build time, so builds need network access to Google Fonts.
