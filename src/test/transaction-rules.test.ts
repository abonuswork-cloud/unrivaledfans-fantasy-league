import {describe,it,expect} from 'vitest'
import {WAIVER_HOURS,easternDate,clubPlaysToday,tradeFits} from '@/lib/transaction-rules'
describe('agreed transaction rules',()=>{
 it('keeps dropped players on waivers for 24 hours',()=>expect(WAIVER_HOURS).toBe(24))
 it('uses Eastern Time for the full game-day trade lock',()=>{
  expect(easternDate(new Date('2027-01-09T02:00:00Z'))).toBe('2027-01-08')
  const days=[{club_id:'mist',game_date:'2027-01-08'}]
  expect(clubPlaysToday('mist',days,new Date('2027-01-08T13:00:00Z'))).toBe(true)
  expect(clubPlaysToday('mist',days,new Date('2027-01-09T02:00:00Z'))).toBe(true)
  expect(clubPlaysToday('mist',days,new Date('2027-01-09T06:00:00Z'))).toBe(false)
  expect(clubPlaysToday('rose',days,new Date('2027-01-08T13:00:00Z'))).toBe(false)
 })
 it('one-for-one swaps must preserve both positional slots',()=>{
  expect(tradeFits('G','F',1,2)).toBe(false)
  expect(tradeFits('G','G',1,4)).toBe(true)
  expect(tradeFits('G','F',4,3)).toBe(true)
 })
})