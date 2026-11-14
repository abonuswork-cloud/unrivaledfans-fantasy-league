import { renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
const mocks=vi.hoisted(()=>({query:vi.fn(),client:{removeQueries:vi.fn(),invalidateQueries:vi.fn().mockResolvedValue(undefined)}}))
vi.mock('@tanstack/react-query',()=>({queryOptions:(v:unknown)=>v,useQuery:mocks.query,useQueryClient:()=>mocks.client,useMutation:vi.fn()}))
vi.mock('@tanstack/react-start',()=>({useServerFn:()=>vi.fn()}))
vi.mock('@/lib/fantasy.functions',()=>({publicFantasy:vi.fn()}))
vi.mock('@/integrations/supabase/client',()=>({supabase:{auth:{onAuthStateChange:()=>({data:{subscription:{unsubscribe:vi.fn()}}}),getUser:()=>new Promise(()=>{})}}}))
import {useFantasyState} from '@/components/fantasy-provider'
describe('cached league data recovery',()=>{
 it('handles pre-trade cached results with missing new arrays',()=>{
  mocks.query.mockImplementation((options:{queryKey:string[]})=>options.queryKey[0]==='fantasy-public'?{data:{leagues:[],teams:[],slots:[],players:[],activity:[]},isLoading:false,error:null}:{data:{leagues:[],teams:[],slots:[],roles:[],picks:[],queue:[],boxes:[],activity:[]},isPending:false,error:null})
  const {result}=renderHook(()=>useFantasyState({leagues:[],teams:[],slots:[],players:[],activity:[],sync:null}))
  expect(result.current.trades).toEqual([])
  expect(result.current.claims).toEqual([])
  expect(result.current.waivers).toEqual([])
  expect(result.current.priority).toEqual([])
  expect(result.current.matchups).toEqual([])
  expect(result.current.results).toEqual([])
 })
 it('keeps cached content usable when a refresh fails',()=>{
  const error=new TypeError('Failed to fetch')
  mocks.query.mockImplementation((options:{queryKey:string[]})=>options.queryKey[0]==='fantasy-public'?{data:{leagues:[],teams:[],slots:[],players:[],activity:[]},isLoading:false,error}:{data:undefined,isPending:true,error:null})
  const {result}=renderHook(()=>useFantasyState({leagues:[],teams:[],slots:[],players:[],activity:[],sync:null}))
  expect(result.current.error).toBe(error)
  expect(result.current.loading).toBe(false)
  expect(result.current.trades).toEqual([])
 })
})