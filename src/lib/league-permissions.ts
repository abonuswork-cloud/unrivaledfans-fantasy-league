type LeagueIdentity = { id: string; owner_id: string | null; is_demo: boolean }
type LeagueRole = { league_id: string; user_id: string; role: string; is_co_commissioner: boolean }
export function leaguePermissions(league: LeagueIdentity | undefined, userId: string | undefined, roles: LeagueRole[]) {
  const ownRole = roles.find(r => r.league_id === league?.id && r.user_id === userId)
  const creator = !!userId && !!league && !league.is_demo && league.owner_id === userId
  const commissioner = !!userId && !!league && !league.is_demo && !!ownRole && (creator || ownRole.role === 'commissioner' || ownRole.is_co_commissioner)
  return { creator, commissioner }
}
