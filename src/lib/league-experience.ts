export const teamCapacities = [2, 3, 4, 5, 6, 7, 8] as const
export const defaultPickSeconds = 90
export function normalizePickClockInput(value: string) {
  return value.replace(/^0+(?=\d)/, '')
}
export function profileComplete(profile: { first_name: string; last_name: string; preferred_team_name: string } | null | undefined) {
  return !!profile?.first_name.trim() && !!profile.last_name.trim() && profile.preferred_team_name.trim().length >= 2
}
export function roundRobin(ids: string[]) {
  if (ids.length < 2) return []
  const ring: (string | null)[] = [...ids]
  if (ring.length % 2) ring.push(null)
  const weeks: { home: string; away: string | null }[][] = []
  for (let r = 0; r < ring.length - 1; r++) {
    const pairs: { home: string; away: string | null }[] = []
    for (let i = 0; i < ring.length / 2; i++) {
      const a = ring[i], b = ring[ring.length - i - 1]
      if (a) pairs.push({ home: a, away: b ?? null })
      else if (b) pairs.push({ home: b, away: null })
    }
    weeks.push(pairs)
    const last = ring.pop()
    ring.splice(1, 0, last ?? null)
  }
  return weeks
}
/** Invite code is shown only while the league has open team spots. */
export function inviteOpen(teamCount: number, maxTeams: number | null | undefined) { return teamCount < (maxTeams ?? 6) }
