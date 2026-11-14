import { createContext, useContext } from 'react'
import type { useFantasyState } from './fantasy-provider'

// Keep the context identity separate from hot-reloaded provider components.
// Existing consumers and updated providers must reference the same object.
export const FantasyContext = createContext<ReturnType<typeof useFantasyState> | null>(null)

export function useFantasy() {
  const value = useContext(FantasyContext)
  if (!value) throw new Error('Fantasy context is missing')
  return value
}