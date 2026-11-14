import { load } from 'cheerio'
import { easternDate } from './transaction-rules'
export async function refreshTradeSchedule() {
  const { supabaseAdmin: db } = await import('@/integrations/supabase/client.server')
  const today = easternDate()
  const existing = await db.from('schedule_checks').select('checked_at').eq('check_date',today).maybeSingle()
  if (existing.data && Date.now()-new Date(existing.data.checked_at).getTime()<300000) return
  const response = await fetch('https://www.unrivaled.basketball/schedule', { signal: AbortSignal.timeout(12000) })
  if (!response.ok) throw new Error('Official schedule unavailable. Trades are paused until game-day checks can be verified.')
  const $ = load(await response.text())
  const events = $('article').filter((_,e)=>!!$(e).find('time[datetime]').length)
  if (!events.length) throw new Error('Official schedule could not be verified; please try again later.')
  const clubs = ['lunar-owls','mist','breeze','rose','phantom','vinyl','laces','hive']
  const days: { club_id: string; game_date: string }[] = []
  events.each((_,e)=> { const day=$(e).find('time[datetime]').attr('datetime'); if (!day || !/^\d{4}-\d{2}-\d{2}$/.test(day)) return; $(e).find('[class*="teamName__"]').each((_,t)=> {const club=$(t).text().trim().toLowerCase().replaceAll(' ','-'); if(clubs.includes(club)) days.push({club_id:club,game_date:day})}) })
  if (!days.length) throw new Error('Official club games could not be verified; trades are temporarily paused.')
  const unique=[...new Map(days.map(d=>[`${d.club_id}:${d.game_date}`,d])).values()]
  const cleared=await db.from('official_game_days').delete().gte('game_date',today)
  if(cleared.error) throw new Error('Game-day checks could not refresh')
  const inserted=await db.from('official_game_days').upsert(unique)
  if(inserted.error) throw new Error('Game-day checks could not refresh')
  const check=await db.from('schedule_checks').upsert({check_date:today,checked_at:new Date().toISOString()})
  if(check.error) throw new Error('Game-day checks could not refresh')
}