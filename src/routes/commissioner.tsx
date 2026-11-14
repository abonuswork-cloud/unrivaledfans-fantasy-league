import { createFileRoute } from '@tanstack/react-router'
import { CommissionerPage } from '@/components/commissioner-page'
import { fantasyQuery } from '@/components/fantasy-provider'
export const Route = createFileRoute('/commissioner')({
 head: () => ({ meta: [{ title: 'Commissioner Tools · Unrivaled Fantasy' }, { name: 'description', content: 'Manage Unrivaled fantasy league settings, scoring and official stats refreshes.' }, { property: 'og:title', content: 'Commissioner Tools · Unrivaled Fantasy' }, { property: 'og:description', content: 'Manage Unrivaled fantasy league settings, scoring and official stats refreshes.' }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' }] }),
 loader: ({ context }) => context.queryClient.ensureQueryData(fantasyQuery()),
 component: CommissionerPage,
})
