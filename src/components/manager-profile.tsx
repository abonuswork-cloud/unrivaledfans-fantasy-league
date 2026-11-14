import { useState } from 'react'
import { Button } from './ui/button'
import { supabase } from '@/integrations/supabase/client'
import { useFantasy, useFantasyAction } from './fantasy-provider'

export function ManagerProfile({ onSaved }: { onSaved?: () => void }) {
  const f = useFantasy()
  const [first, setFirst] = useState(f.profile?.first_name ?? '')
  const [last, setLast] = useState(f.profile?.last_name ?? '')
  const [team, setTeam] = useState(f.profile?.preferred_team_name ?? '')
  const save = useFantasyAction(async () => {
    if (!f.user) return
    const r = await supabase.from('profiles').update({ first_name: first.trim(), last_name: last.trim(), display_name: `${first.trim()} ${last.trim()}`, preferred_team_name: team.trim() }).eq('id', f.user.id)
    if (r.error) throw new Error(r.error.message)
    onSaved?.()
  })
  return <form onSubmit={e => { e.preventDefault(); save.mutate() }}>
    <label className="field-label">First name<input autoComplete="given-name" required maxLength={60} value={first} onChange={e => setFirst(e.target.value)} /></label>
    <label className="field-label">Last name<input autoComplete="family-name" required maxLength={60} value={last} onChange={e => setLast(e.target.value)} /></label>
    <label className="field-label">Email<input value={f.user?.email ?? ''} readOnly type="email" /></label>
    <label className="field-label">Team name<input required minLength={2} maxLength={40} value={team} onChange={e => setTeam(e.target.value)} placeholder="Name your team" /></label>
    <Button type="submit" disabled={save.isPending}>{save.isPending ? 'Saving…' : 'Save manager details'}</Button>
    {save.error && <p className="form-error" role="alert">{save.error.message}</p>}
    {save.isSuccess && <p className="success-message">Manager details saved.</p>}
  </form>
}