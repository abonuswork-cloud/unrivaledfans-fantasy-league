import { describe, it, expect } from 'vitest'
import { fantasyPoints, eligible, snakeTeam, standardScoring } from '@/lib/fantasy'
describe('league rules', () => {
  for (const [key, value] of Object.entries({ pts: 1, reb: 1.5, ast: 2, stl: 3, blk: 3, turnovers: -1 })) it(`scores ${key} at ${value}`, () => { expect(standardScoring[key as keyof typeof standardScoring]).toBe(value); expect(fantasyPoints({ pts: 0, reb: 0, ast: 0, stl: 0, blk: 0, turnovers: 0, [key]: 2 })).toBe(value * 2) })
  it('restricts guard and forward while flex and bench accept both', () => { expect(eligible('F',1)).toBe(false); expect(eligible('G',2)).toBe(false); expect(eligible('G',1)).toBe(true); expect(eligible('F',2)).toBe(true); for (const s of [3,4,5,6]) { expect(eligible('G',s)).toBe(true); expect(eligible('F',s)).toBe(true) } })
  it('reverses the second draft round', () => { expect([1,2,3,4,5,6].map(p => snakeTeam(p,3))).toEqual([0,1,2,2,1,0]) })
})