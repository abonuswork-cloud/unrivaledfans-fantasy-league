import { createFileRoute } from '@tanstack/react-router'
import { authenticateCronRequest } from '@/integrations/supabase/cron-auth'
export const Route = createFileRoute('/api/public/jobs/stats')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const failure = await authenticateCronRequest(request)
        if (failure) return failure
        const { syncOfficialStats } = await import('@/lib/stats-sync.server')
        try { return Response.json(await syncOfficialStats()) }
        catch { return Response.json({ error: 'Official stats refresh failed; previous stats preserved' }, { status: 502 }) }
      },
    },
  },
})