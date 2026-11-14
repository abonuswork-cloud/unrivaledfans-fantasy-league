import { createServerFn } from '@tanstack/react-start'
import { requireSupabaseAuth } from '@/integrations/supabase/auth-middleware'
export const offerTrade = createServerFn({method:'POST'}).middleware([requireSupabaseAuth]).inputValidator((data:{from:string;to:string;give:string;get:string;parent?:string})=>data).handler(async({data,context})=>{
  const own=await context.supabase.from('teams').select('id').eq('id',data.from).eq('owner_id',context.userId).maybeSingle()
  if(!own.data) throw new Error('You can only offer your own players')
  const {refreshTradeSchedule}=await import('./trade-schedule.server'); await refreshTradeSchedule()
  const result=await context.supabase.rpc('offer_player_trade',{from_id:data.from,to_id:data.to,give_id:data.give,get_id:data.get,...(data.parent?{parent_id:data.parent}:{})})
  if(result.error)throw new Error(result.error.message); return result.data
})
export const respondTrade = createServerFn({method:'POST'}).middleware([requireSupabaseAuth]).inputValidator((data:{id:string;decision:'accept'|'deny'|'cancel'})=>data).handler(async({data,context})=>{
  const visible=await context.supabase.from('player_trades').select('id').eq('id',data.id).maybeSingle()
  if(!visible.data)throw new Error('Trade not found')
  if(data.decision==='accept'){const {refreshTradeSchedule}=await import('./trade-schedule.server');await refreshTradeSchedule()}
  const result=await context.supabase.rpc('respond_player_trade',{trade_id:data.id,decision:data.decision})
  if(result.error)throw new Error(result.error.message)
})