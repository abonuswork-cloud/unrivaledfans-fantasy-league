import { createServerFn } from '@tanstack/react-start'
import { createClient } from '@supabase/supabase-js'
import { requireSupabaseAuth } from '@/integrations/supabase/auth-middleware'
import type { Database } from '@/integrations/supabase/types'
export const publicFantasy = createServerFn({ method: 'GET' }).handler(async () => {
  const url = process.env['SUPABASE_URL']; const key = process.env['SUPABASE_PUBLISHABLE_KEY']
  if (!url || !key) throw new Error('League data is unavailable')
  const db = createClient<Database>(url, key, { auth: { persistSession: false, autoRefreshToken: false }, global: { fetch: (input, init) => { const headers = new Headers(init?.headers); if (key.startsWith('sb_') && headers.get('Authorization') === `Bearer ${key}`) headers.delete('Authorization'); headers.set('apikey', key); return fetch(input, { ...init, headers }) } } })
  const [players, leagues, teams, slots, activity, sync] = await Promise.all([db.from('players').select('*').order('pts', { ascending: false }), db.from('leagues').select('*').eq('is_demo', true), db.from('teams').select('*'), db.from('roster_slots').select('*'), db.from('league_activity').select('*').order('created_at', { ascending: false }).limit(8), db.from('stats_sync').select('*').eq('id', 1).single()])
  for (const result of [players, leagues, teams, slots, activity, sync]) if (result.error) throw new Error(result.error.message)
  return { players: players.data ?? [], leagues: leagues.data ?? [], teams: teams.data ?? [], slots: slots.data ?? [], activity: activity.data ?? [], sync: sync.data }
})
export const refreshStats = createServerFn({ method: 'POST' }).middleware([requireSupabaseAuth]).inputValidator((data: { leagueId: string }) => data).handler(async ({ data, context }) => {
  const permission = await context.supabase.rpc('league_commissioner', { lid: data.leagueId })
  if (!permission.data) throw new Error('Only a league commissioner can refresh official stats')
  const { syncOfficialStats } = await import('./stats-sync.server')
  return syncOfficialStats()
})