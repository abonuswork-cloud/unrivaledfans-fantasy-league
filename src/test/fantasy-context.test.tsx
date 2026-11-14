import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { FantasyContext, useFantasy } from '@/components/fantasy-context'

describe('shared fantasy context', () => {
  it('keeps the same context for existing consumers when the provider module reloads', async () => {
    const before = FantasyContext
    const provider = await import('@/components/fantasy-provider')
    expect(provider.useFantasy).toBe(useFantasy)
    // The provider module does not create a new context on evaluation.
    vi.resetModules()
    const source = await import('@/components/fantasy-context')
    expect(source.FantasyContext).toBeDefined()
    expect(before.Provider).toBeDefined()
  })
})