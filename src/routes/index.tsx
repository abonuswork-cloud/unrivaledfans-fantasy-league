import { createFileRoute } from "@tanstack/react-router";
import { RosterPage } from '@/components/roster-page';
import { fantasyQuery } from '@/components/fantasy-provider';

// The home route ships no og:image, so serve-time hosting can inject the
// project's social preview (explicit og:image or latest screenshot).
export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title: 'My Roster · Unrivaled Fantasy' }, { name: 'description', content: 'Manage your starting three, bench and weekly Unrivaled fantasy matchup.' }, { property: 'og:title', content: 'My Roster · Unrivaled Fantasy' }, { property: 'og:description', content: 'Set your Guard, Forward and Flex for Unrivaled fantasy basketball.' }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' }] }),
  loader: ({ context }) => context.queryClient.ensureQueryData(fantasyQuery()),
  component: Index,
});

// IMPORTANT: Replace this placeholder. See ./README.md for routing conventions.
function Index() {
  return <RosterPage/>;
}
