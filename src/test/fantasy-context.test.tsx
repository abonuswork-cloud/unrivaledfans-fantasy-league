import { describe, expect, it } from 'vitest'
import { FantasyContext, useFantasy } from '@/components/fantasy-context'

describe('shared fantasy context', () => {
  it('exports the exact same consumer hook as the shared context module', async () => {
    const provider = await import('@/components/fantasy-provider')
    expect(provider.useFantasy).toBe(useFantasy)
    const source = await import('@/components/fantasy-context')
    expect(source.FantasyContext).toBe(FantasyContext)
  })
})