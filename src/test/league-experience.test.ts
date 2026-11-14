import { describe, expect, it } from 'vitest'
import { defaultPickSeconds, normalizePickClockInput, profileComplete, roundRobin, teamCapacities } from '@/lib/league-experience'
import games from '@/lib/official-games.json'
describe('league setup and schedules', () => {
  it('defaults the pick clock to 90 seconds', () => {
    expect(defaultPickSeconds).toBe(90)
  })
  it('allows clearing 60 and entering 90 without a leading zero', () => {
    expect(normalizePickClockInput('60')).toBe('60')
    expect(normalizePickClockInput('')).toBe('')
    expect(normalizePickClockInput('09')).toBe('9')
    expect(normalizePickClockInput('090')).toBe('90')
    expect(normalizePickClockInput('0090')).toBe('90')
  })
  it('allows 2 through 8 teams with six players per team', () => {
    expect(teamCapacities).toEqual([2,3,4,5,6,7,8])
    expect(Math.max(...teamCapacities)*6).toBe(48)
  })
  it('requires first name, last name and custom team name', () => {
    expect(profileComplete({first_name:'Amy',last_name:'Bonus',preferred_team_name:'Heatcheck'})).toBe(true)
    expect(profileComplete({first_name:'Amy',last_name:'',preferred_team_name:'Heatcheck'})).toBe(false)
    expect(profileComplete({first_name:'',last_name:'Bonus',preferred_team_name:'Heatcheck'})).toBe(false)
    expect(profileComplete({first_name:'Amy',last_name:'Bonus',preferred_team_name:''})).toBe(false)
  })
  it('pairs every fantasy team once per week with rotating opponents', () => {
    const weeks=roundRobin(['a','b','c','d','e','f'])
    expect(weeks).toHaveLength(5)
    const pairs=weeks.flat().map(p=>[p.home,p.away].sort().join(':'))
    expect(new Set(pairs).size).toBe(15)
    for(const week of weeks) expect(new Set(week.flatMap(p=>[p.home,p.away])).size).toBe(6)
  })
  it('assigns one bye per week for odd team counts',()=> {
    const weeks=roundRobin(['a','b','c'])
    expect(weeks).toHaveLength(3)
    for(const week of weeks) expect(week.filter(p=>p.away===null)).toHaveLength(1)
  })
  it('keeps actual games from the supplied official schedule separate',()=> {
    expect(games.find(g=>g.date==='2027-01-08'&&g.away==='Phantom'&&g.home==='Mist')?.time).toBe('7:00 PM ET')
    expect(games.every(g=>g.url.startsWith('https://www.unrivaled.basketball/game/'))).toBe(true)
  })
})