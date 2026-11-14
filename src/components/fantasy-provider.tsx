import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { useQuery, useQueryClient, useMutation, queryOptions } from '@tanstack/react-query'
import { useServerFn } from '@tanstack/react-start'
import { supabase } from '@/integrations/supabase/client'
import { publicFantasy } from '@/lib/fantasy.functions'
import { DEMO } from '@/lib/fantasy'
import type { User } from '@supabase/supabase-js'
export const fantasyQuery = () => queryOptions({ queryKey: ['fantasy-public'], queryFn: () => publicFantasy() })
export function useFantasyState(initialData: Awaited<ReturnType<typeof publicFantasy>>) {
  const queryClient = useQueryClient(); const fetchPublic = useServerFn(publicFantasy)
  const [user, setUser] = useState<User | null>(null); const [ready, setReady] = useState(false); const [leagueId, setLeagueId] = useState(DEMO)
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'INITIAL_SESSION' || event === 'SIGNED_IN' || event === 'SIGNED_OUT' || event === 'USER_UPDATED') { setUser(session?.user ?? null); setReady(true); if (event === 'SIGNED_OUT') { setLeagueId(DEMO); queryClient.removeQueries({ queryKey: ['fantasy-private'] }) } else if (event !== 'INITIAL_SESSION') queryClient.invalidateQueries({ queryKey: ['fantasy-private'] }) }
    })
    supabase.auth.getUser().then(({ data }) => { setUser(data.user); setReady(true) })
    return () => subscription.unsubscribe()
  }, [queryClient])
  const publicData = useQuery({ ...fantasyQuery(), queryFn: () => fetchPublic(), initialData })
  const privateData = useQuery({ queryKey: ['fantasy-private', user?.id], enabled: !!user, queryFn: async () => {
    const [leagues, teams, slots, roles, picks, queue, activity, boxes] = await Promise.all([supabase.from('leagues').select('*').eq('is_demo', false), supabase.from('teams').select('*'), supabase.from('roster_slots').select('*'), supabase.from('league_roles').select('*'), supabase.from('draft_picks').select('*').order('pick_no'), supabase.from('draft_queue').select('*').order('created_at'), supabase.from('league_activity').select('*').order('created_at', { ascending: false }).limit(30), supabase.from('game_boxscores').select('*')])
    for (const r of [leagues, teams, slots, roles, picks, queue, activity, boxes]) if (r.error) throw new Error(r.error.message)
    return { leagues: leagues.data ?? [], teams: teams.data ?? [], slots: slots.data ?? [], roles: roles.data ?? [], picks: picks.data ?? [], queue: queue.data ?? [], activity: activity.data ?? [], boxes: boxes.data ?? [] }
  }, refetchInterval: false })
  const leagues = [...(publicData.data?.leagues ?? []), ...(privateData.data?.leagues ?? [])]
  const league = leagues.find(l => l.id === leagueId) ?? leagues[0]
  const teams = (leagueId === DEMO ? publicData.data?.teams : privateData.data?.teams)?.filter(t => t.league_id === leagueId) ?? []
  const myTeam = teams.find(t => t.owner_id === user?.id) ?? (leagueId === DEMO ? teams[0] : undefined)
  const slots = (leagueId === DEMO ? publicData.data?.slots : privateData.data?.slots)?.filter(s => s.league_id === leagueId) ?? []
  const activity = (leagueId === DEMO ? publicData.data?.activity : privateData.data?.activity)?.filter(a => a.league_id === leagueId) ?? []
  const commissioner = privateData.data?.roles.some(r => r.league_id === leagueId && r.role === 'commissioner') ?? false
  const invalidate = () => Promise.all([queryClient.invalidateQueries({ queryKey: ['fantasy-private'] }), queryClient.invalidateQueries({ queryKey: ['fantasy-public'] })])
  return { user, ready, leagueId, setLeagueId, league, leagues, teams, myTeam, slots, players: publicData.data?.players ?? [], activity, commissioner, picks: privateData.data?.picks.filter(p => p.league_id === leagueId) ?? [], queue: privateData.data?.queue.filter(q => q.league_id === leagueId) ?? [], boxes: privateData.data?.boxes.filter(b => b.league_id === leagueId) ?? [], sync: publicData.data?.sync, loading: publicData.isLoading, error: publicData.error ?? privateData.error, invalidate }
}
type FantasyState = ReturnType<typeof useFantasyState>
const Context = createContext<FantasyState | null>(null)
export function FantasyProvider({ children, initialData }: { children: ReactNode; initialData: Awaited<ReturnType<typeof publicFantasy>> }) { const state = useFantasyState(initialData); return <Context.Provider value={state}>{children}</Context.Provider> }
export function useFantasy() { const value = useContext(Context); if (!value) throw new Error('Fantasy context is missing'); return value }
export function useFantasyAction<T = void>(fn: (data: T) => Promise<unknown>) { const { invalidate } = useFantasy(); return useMutation({ mutationFn: fn, onSuccess: () => invalidate() }) }