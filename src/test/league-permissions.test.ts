import { describe, expect, it } from 'vitest'
import { leaguePermissions } from '@/lib/league-permissions'
const league = { id: 'league', owner_id: 'creator', is_demo: false }
const roles = [
  { league_id: 'league', user_id: 'creator', role: 'commissioner', is_co_commissioner: false },
  { league_id: 'league', user_id: 'delegate', role: 'member', is_co_commissioner: true },
  { league_id: 'league', user_id: 'member', role: 'member', is_co_commissioner: false },
]
describe('league tools permissions', () => {
  it('only the creator can appoint co-commissioners', () => {
    expect(leaguePermissions(league, 'creator', roles).creator).toBe(true)
    expect(leaguePermissions(league, 'delegate', roles).creator).toBe(false)
    expect(leaguePermissions(league, 'member', roles).creator).toBe(false)
  })
  it('co-commissioners can use league tools', () => {
    expect(leaguePermissions(league, 'delegate', roles).commissioner).toBe(true)
  })
  it('ordinary members cannot use commissioner tools even when other roles are visible', () => {
    expect(leaguePermissions(league, 'member', roles).commissioner).toBe(false)
  })
  it('permissions do not carry between leagues or into the example league', () => {
    expect(leaguePermissions({ ...league, id: 'other' }, 'delegate', roles).commissioner).toBe(false)
    expect(leaguePermissions({ ...league, is_demo: true }, 'creator', roles).commissioner).toBe(false)
    expect(leaguePermissions(league, undefined, roles).commissioner).toBe(false)
  })
})
