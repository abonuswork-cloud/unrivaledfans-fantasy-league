export const WAIVER_HOURS = 24
export function easternDate(date = new Date()) { return new Intl.DateTimeFormat('en-CA', { timeZone: 'America/New_York', year: 'numeric', month: '2-digit', day: '2-digit' }).format(date) }
export function clubPlaysToday(club: string | null, days: { club_id: string; game_date: string }[], date = new Date()) {
  return days.some(g => g.club_id === club && g.game_date === easternDate(date))
}
export function tradeFits(givePosition: string, receivePosition: string, giveSlot: number, receiveSlot: number) {
  const eligible = (p: string, s: number) => s >= 3 || (s === 1 && p === 'G') || (s === 2 && p === 'F')
  return eligible(receivePosition, giveSlot) && eligible(givePosition, receiveSlot)
}