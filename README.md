# Unrivaled Fantasy (Beta)

Fan-built, unofficial fantasy basketball for Unrivaled's 3-on-3 women's league. Not affiliated with Unrivaled.

## Features
- **Welcome popup** for first-time visitors (once per session): app summary, read-only example league notice, Google sign-up call to action.
- **Beta label** beside the "Unrivaled Fantasy" header brand.
- **My Roster** — Guard / Forward / Flex starters + 3 bench, swaps, matchup bars derived from active slots.
- **Draft Room** — 6-round snake draft, queue, 90-second default clock, auto-pick; ownerless teams pick instantly.
  - **Mock drafts**: commissioner can Start mock draft (dashed "MOCK DRAFT · Practice only" banner) and Reset draft.
  - Invite code shows only while the league has open spots (hidden at max teams, shown again if capacity is raised).
- **Players & Waivers** — player pool, free-agent pickups, one-for-one trades with game-day lock, 24-hour rolling waivers.
- **League Standings** — records with **View roster** for every team, fantasy schedule, official Unrivaled games, rulebook.
- **Commissioner Tools** — capacity (2–8), invitation/pickup/swap switches, pick clock, scoring, box scores, weekly finalization.

## Stack
React 19 + TypeScript, TanStack Start/Router/Query, Tailwind CSS v4, Vite, Vitest, PostgreSQL via Lovable Cloud (RLS + stored procedures, migrations in `drizzle/migrations`).

## Development
```sh
bun install
bun run dev
bunx vitest run
```

See the developer handoff guide (v2, with screenshots) for setup, data model, migration and mobile-port details.
