<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

## Application architecture
- Keep public fantasy browsing at top-level content routes; private mutations use authenticated database RPCs and owner/commissioner checks so the seeded example stays read-only.
- Store roles separately in league_roles and execute roster/draft changes atomically in PostgreSQL to prevent concurrent ownership conflicts.
- Fetch official club statistics in the shared server-only sync module; the daily managed callback and authenticated commissioner action share it to preserve one parsing contract.
- Use FantasyProvider for identity and query state and FantasyShell for shared kit chrome; private queries remain disabled without an authenticated session.
- Define fantasy context identity in a component-free module separate from the provider so preview hot updates cannot disconnect mounted consumers.
- Persist fantasy round-robin pairings at draft completion and use them for weekly result finalization so displayed opponents match recorded results.
- Keep announced official club games separate from fantasy pairings; label the checked date and link to the official source because tipoffs can change.
- Collect manager names and preferred team names in the existing profile, and enforce league control switches inside the corresponding database actions.
- Execute trade acceptance, direct pickups, and rolling-waiver resolution under a league row lock; only owners submit or respond, preventing conflicting player transfers.
- Verify fresh official club game days before trade offers and acceptance; fail closed if schedule verification fails so the game-day restriction cannot be bypassed.
- Resolve expired waivers with the managed minute callback and authenticated league reads; claims retain the original dropped-player identity to reject stale roster changes.

- Derive matchup projection values and proportional widths together from numbered active slots, never array positions or fixed CSS widths, so empty and missing positions stay accurate.
- Keep editable pick-clock values as normalized strings until submission and share the numeric fallback through league-experience so clearing the field never inserts a zero.
- Hide the draft-room invite code when team count reaches max_teams (inviteOpen in league-experience); raising capacity re-shows it.

- Delegate tools access through creator-managed league_roles.is_co_commissioner; use the authenticated league_commissioner helper for every management action and restrict role appointments to leagues.owner_id.
- Enforce beta Google signup capacity with an auth insert trigger and an atomic private reservation counter; test boundary behavior in rollback-only transactions without creating managed auth users.
