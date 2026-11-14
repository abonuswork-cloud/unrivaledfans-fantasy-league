import { createFileRoute } from '@tanstack/react-router'
import { PlayersPage } from '@/components/players-page'
import { fantasyQuery } from '@/components/fantasy-provider'
export const Route = createFileRoute('/players')({
 head: () => ({ meta: [{ title: 'Players & Waivers · Unrivaled Fantasy' }, { name: 'description', content: 'Explore official Unrivaled season statistics and manage fantasy player claims.' }, { property: 'og:title', content: 'Players & Waivers · Unrivaled Fantasy' }, { property: 'og:description', content: 'Explore official Unrivaled season statistics and manage fantasy player claims.' }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' }] }),
 loader: ({ context }) => context.queryClient.ensureQueryData(fantasyQuery()),
 component: PlayersPage,
})
