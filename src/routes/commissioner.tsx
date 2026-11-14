import { createFileRoute } from '@tanstack/react-router'
import { CommissionerPage } from '@/components/commissioner-page'
import { fantasyQuery } from '@/components/fantasy-provider'
export const Route = createFileRoute('/commissioner')({
 head: () => ({ meta: [{ title: 'League Tools · Unrivaled Fantasy' }, { name: 'description', content: 'View your league member details and rulebook, or manage league settings as a commissioner.' }, { property: 'og:title', content: 'League Tools · Unrivaled Fantasy' }, { property: 'og:description', content: 'View your league member details and rulebook, or manage league settings as a commissioner.' }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' }] }),
 loader: ({ context }) => context.queryClient.ensureQueryData(fantasyQuery()),
 component: CommissionerPage,
})
