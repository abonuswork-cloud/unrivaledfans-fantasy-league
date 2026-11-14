import { describe, it, expect } from 'vitest'
import { fantasyPoints, eligible, snakeTeam, standardScoring, projectionBreakdown } from '@/lib/fantasy'
describe('league rules', () => {
  for (const [key, value] of Object.entries({ pts: 1, reb: 1.5, ast: 2, stl: 3, blk: 3, turnovers: -1 })) it(`scores ${key} at ${value}`, () => { expect(standardScoring[key as keyof typeof standardScoring]).toBe(value); expect(fantasyPoints({ pts: 0, reb: 0, ast: 0, stl: 0, blk: 0, turnovers: 0, [key]: 2 })).toBe(value * 2) })
  it('restricts guard and forward while flex and bench accept both', () => { expect(eligible('F',1)).toBe(false); expect(eligible('G',2)).toBe(false); expect(eligible('G',1)).toBe(true); expect(eligible('F',2)).toBe(true); for (const s of [3,4,5,6]) { expect(eligible('G',s)).toBe(true); expect(eligible('F',s)).toBe(true) } })
  it('reverses the second draft round', () => { expect([1,2,3,4,5,6].map(p => snakeTeam(p,3))).toEqual([0,1,2,2,1,0]) })
})
describe('matchup projection data', () => {
  const project = (s: { slot: number; points: number }) => s.points
  it('leaves 0.0 empty and scales all positions proportionally', () => {
    expect(projectionBreakdown([{slot:1,points:0},{slot:2,points:20},{slot:3,points:40}], project)).toEqual([{value:0,percent:0},{value:20,percent:50},{value:40,percent:100}])
  })
  it('matches positions by slot rather than array order and excludes bench', () => {
    expect(projectionBreakdown([{slot:4,points:100},{slot:3,points:30},{slot:1,points:15}], project)).toEqual([{value:15,percent:50},{value:0,percent:0},{value:30,percent:100}])
  })
  it('keeps empty and all-zero lineups empty', () => {
    expect(projectionBreakdown([], project)).toEqual([{value:0,percent:0},{value:0,percent:0},{value:0,percent:0}])
    expect(projectionBreakdown([{slot:1,points:0},{slot:2,points:0},{slot:3,points:0}], project).map(s => s.percent)).toEqual([0,0,0])
  })
  it('uses the displayed precision so a rounded 0.0 has no fill', () => {
    expect(projectionBreakdown([{slot:1,points:0.01},{slot:2,points:10}], project)[0]).toEqual({value:0,percent:0})
  })
})
