import { createFileRoute } from '@tanstack/react-router'
import { DraftPage } from '@/components/draft-page'
import { fantasyQuery } from '@/components/fantasy-provider'
export const Route = createFileRoute('/draft')({
 head: () => ({ meta: [{ title: 'Draft Room · Unrivaled Fantasy' }, { name: 'description', content: 'Draft your six-player Unrivaled roster with a live snake draft and player queue.' }, { property: 'og:title', content: 'Draft Room · Unrivaled Fantasy' }, { property: 'og:description', content: 'Draft your six-player Unrivaled roster with a live snake draft and player queue.' }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' }] }),
 loader: ({ context }) => context.queryClient.ensureQueryData(fantasyQuery()),
 component: DraftPage,
})
