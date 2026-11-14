import { createFileRoute } from '@tanstack/react-router'
import { StandingsPage } from '@/components/standings-page'
import { fantasyQuery } from '@/components/fantasy-provider'
export const Route = createFileRoute('/standings')({
 validateSearch: (search: Record<string, unknown>): { view?: 'rules' } => ({ view: search.view === 'rules' ? 'rules' : undefined }),
 head: () => ({ meta: [{ title: 'League Standings · Unrivaled Fantasy' }, { name: 'description', content: 'Compare head-to-head records and total points in your Unrivaled league.' }, { property: 'og:title', content: 'League Standings · Unrivaled Fantasy' }, { property: 'og:description', content: 'Compare head-to-head records and total points in your Unrivaled league.' }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' }] }),
 loader: ({ context }) => context.queryClient.ensureQueryData(fantasyQuery()),
 component: StandingsPage,
})
