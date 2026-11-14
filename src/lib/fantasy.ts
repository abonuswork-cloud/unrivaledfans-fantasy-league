import type { Database } from '@/integrations/supabase/types'
export type Player = Database['public']['Tables']['players']['Row']
export type League = Database['public']['Tables']['leagues']['Row']
export type Team = Database['public']['Tables']['teams']['Row']
export type Slot = Database['public']['Tables']['roster_slots']['Row']
export const DEMO = '00000000-0000-4000-8000-000000000001'
export const standardScoring = { pts: 1, reb: 1.5, ast: 2, stl: 3, blk: 3, turnovers: -1 }
export type Scoring = typeof standardScoring
export function scoringFor(value: League['scoring']): Scoring {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return standardScoring
  const result = { ...standardScoring }
  for (const key of Object.keys(result) as (keyof Scoring)[]) if (typeof value[key] === 'number') result[key] = value[key]
  return result
}
export function fantasyPoints(stats: Pick<Player, keyof Scoring>, rules = standardScoring) {
  return Math.round((Object.keys(rules) as (keyof Scoring)[]).reduce((sum, key) => sum + Number(stats[key]) * rules[key], 0) * 100) / 100
}
export function eligible(position: string, slot: number) { return slot >= 3 || (slot === 1 && position === 'G') || (slot === 2 && position === 'F') }
export function snakeTeam(pick: number, teams: number) { const round = Math.floor((pick - 1) / teams); const index = (pick - 1) % teams; return round % 2 ? teams - index - 1 : index }
export const slotNames = ['Guard', 'Forward', 'Flex', 'Bench', 'Bench', 'Bench']
export function initials(name: string) { return name.split(' ').map(word => word[0]).slice(0, 2).join('') }
export function clubName(slug: string | null) { return (slug ?? '').split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') }
export function projectionBreakdown<T extends Pick<Slot, 'slot'>>(slots: readonly T[], project: (slot: T) => number) {
  const values = [1, 2, 3].map(position => {
    const slot = slots.find(s => s.slot === position)
    const value = slot ? project(slot) : 0
    return Number.isFinite(value) ? Number(value.toFixed(1)) : 0
  })
  const maximum = Math.max(0, ...values)
  return values.map(value => ({ value, percent: maximum > 0 ? Math.max(0, value) / maximum * 100 : 0 }))
}
