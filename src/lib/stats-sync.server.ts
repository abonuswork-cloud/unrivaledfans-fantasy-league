import { load } from 'cheerio'
export async function syncOfficialStats() {
  const { supabaseAdmin: db } = await import('@/integrations/supabase/client.server')
  const now = new Date().toISOString()
  const lease = await db.from('stats_sync').update({ lease_until: new Date(Date.now() + 120000).toISOString(), last_attempt: now, status: 'running', error: null }).eq('id', 1).or(`lease_until.is.null,lease_until.lt.${now}`).select('id')
  if (lease.error) throw new Error(lease.error.message)
  if (!lease.data?.length) return { message: 'A stats refresh is already running' }
  try {
    const players = await db.from('players').select('id,name,club_id')
    if (players.error) throw new Error(players.error.message)
    let count = 0
    for (const club of ['lunar-owls', 'mist', 'breeze', 'rose', 'phantom', 'vinyl', 'laces', 'hive']) {
      const response = await fetch(`https://www.unrivaled.basketball/${club}/stats`)
      if (!response.ok) throw new Error(`Official ${club} stats could not be reached`)
      const $ = load(await response.text()); const rows = $('table').first().find('tr').toArray()
      if (rows.length < 2 || !$.text().includes('2026')) throw new Error('Official stats format or season changed; existing stats were preserved')
      const headers = $(rows[0]).find('th,td').toArray().map(c => $(c).text().trim())
      for (const row of rows.slice(1)) {
        const cells = $(row).find('th,td').toArray().map(c => $(c).text().trim()); const player = players.data?.find(p => p.name === cells[0] && p.club_id === club)
        if (!player) continue
        const num = (name: string) => { const val = Number(cells[headers.indexOf(name)]); if (!Number.isFinite(val)) throw new Error('Official stats contain an invalid number'); return val }
        const updated = await db.from('players').update({ gp: num('GP'), pts: num('PTS'), reb: num('REB'), ast: num('AST'), stl: num('STL'), blk: num('BLK'), turnovers: num('TO'), updated_at: now }).eq('id', player.id)
        if (updated.error) throw new Error(updated.error.message)
        count++
      }
    }
    await db.from('stats_sync').update({ status: 'ready', last_success: now, lease_until: null }).eq('id', 1)
    return { message: `Official averages refreshed for ${count} players` }
  } catch (error) {
    await db.from('stats_sync').update({ status: 'error', lease_until: null, error: error instanceof Error ? error.message : 'Stats refresh failed' }).eq('id', 1)
    throw error
  }
}