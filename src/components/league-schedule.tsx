import { useState } from 'react'
import { ArrowUpRight, CalendarDays } from 'lucide-react'
import { Button } from './ui/button'
import { useFantasy } from './fantasy-provider'
import { DEMO, clubName } from '@/lib/fantasy'
import { roundRobin } from '@/lib/league-experience'
import games from '@/lib/official-games.json'

export function LeagueSchedule() {
  const f = useFantasy()
  const [week, setWeek] = useState(1)
  const example = roundRobin([...f.teams].sort((a,b)=>a.draft_order-b.draft_order).map(t=>t.id))
  const weeks = f.leagueId===DEMO ? example.map((_,i)=>i+1) : [...new Set(f.matchups.map(m=>m.week_no))]
  const selected = weeks.includes(week) ? week : weeks[0]
  const rows = f.leagueId===DEMO ? (example[(selected ?? 1)-1] ?? []).map(p=>({home_team_id:p.home,away_team_id:p.away,week_start:null})) : f.matchups.filter(m=>m.week_no===selected)
  if (!weeks.length) return <div className="empty-state"><CalendarDays size={28}/><h2>Your fantasy schedule starts after the draft</h2><p>Weekly opponents are set when all teams finish drafting. Odd team counts include bye weeks.</p></div>
  return <><div className="pool-toolbar"><label className="filter-block">Fantasy week<select aria-label="Fantasy week" value={selected} onChange={e=>setWeek(Number(e.target.value))}>{weeks.map(w=><option key={w} value={w}>Week {w}</option>)}</select></label><span className="muted-copy">{f.leagueId===DEMO?'Example pairings · Illustrative schedule':rows[0]?.week_start ? `Week starts ${rows[0].week_start}`:''}</span></div><div className="schedule-list">{rows.map(m=>{const home=f.teams.find(t=>t.id===m.home_team_id);const away=f.teams.find(t=>t.id===m.away_team_id);const hp=f.results.find(r=>r.team_id===m.home_team_id&&r.week_start===m.week_start);const ap=f.results.find(r=>r.team_id===m.away_team_id&&r.week_start===m.week_start);return <article className="schedule-row" key={m.home_team_id}><strong>{home?.name}</strong><span className="schedule-center">{!away?'BYE':hp&&ap?`${hp.points.toFixed(1)} – ${ap.points.toFixed(1)}`:'VS'}</span><strong>{away?.name ?? 'No opponent this week'}</strong><small>{hp?'Final':f.leagueId===DEMO?'Example':'Scheduled'}</small></article>})}</div></>
}

export function OfficialSchedule() {
  const [club, setClub] = useState('All')
  const [month, setMonth] = useState('All')
  const filtered = games.filter(g=>(club==='All'||g.home===club||g.away===club)&&(month==='All'||g.date?.slice(0,7)===month))
  return <><div className="section-heading"><h2>Unrivaled · 2027 Season 3</h2><Button variant="outline" size="sm" asChild><a href="https://www.unrivaled.basketball/schedule" target="_blank" rel="noreferrer">Official schedule<ArrowUpRight size={14}/></a></Button></div><p className="muted-copy">Actual club games · Announced schedule checked November 14, 2026. Times shown in Eastern Time; dates and tipoffs may change. Player averages elsewhere are from 2026.</p><div className="pool-toolbar"><label className="filter-block">Club<select aria-label="Official game club" value={club} onChange={e=>setClub(e.target.value)}><option>All</option>{['lunar-owls','mist','breeze','rose','phantom','vinyl','laces','hive'].map(c=><option key={c}>{clubName(c)}</option>)}</select></label><label className="filter-block">Month<select aria-label="Official game month" value={month} onChange={e=>setMonth(e.target.value)}><option>All</option><option value="2027-01">January</option><option value="2027-02">February</option></select></label></div><div className="schedule-list">{filtered.map(g=><article className="official-game" key={g.url}><div><span>{g.date ? new Date(`${g.date}T12:00:00Z`).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric',timeZone:'UTC'}):'TBD'}</span><strong>{g.time}</strong></div><div><h3>{g.away} <span>vs</span> {g.home}</h3><small>{g.venue}</small></div><Button variant="ghost" size="icon" asChild><a href={g.url} target="_blank" rel="noreferrer" aria-label={`Official ${g.away} versus ${g.home} game`}><ArrowUpRight size={17}/></a></Button></article>)}</div><p className="muted-copy">February 18–20: 1-on-1 tournament, bracket TBD. March 5: flex schedule; game times assigned closer to the date. See the official schedule for those events.</p>{!filtered.length&&<p className="muted-copy">No announced games match these filters.</p>}</>
}