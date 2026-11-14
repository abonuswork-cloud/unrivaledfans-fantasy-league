import { createFileRoute } from '@tanstack/react-router'
import { authenticateCronRequest } from '@/integrations/supabase/cron-auth'
export const Route=createFileRoute('/api/public/jobs/waivers')({server:{handlers:{POST:async({request})=>{
  const failure=await authenticateCronRequest(request);if(failure)return failure
  const {supabaseAdmin:db}=await import('@/integrations/supabase/client.server')
  const pending=await db.from('player_waivers').select('league_id').eq('resolved',false).lte('expires_at',new Date().toISOString())
  if(pending.error)return Response.json({error:'Waiver processing failed'},{status:500})
  for(const id of new Set(pending.data.map(w=>w.league_id))){const result=await db.rpc('resolve_league_waivers',{lid:id});if(result.error)return Response.json({error:'Waiver processing failed'},{status:500})}
  return Response.json({success:true})
}}}})