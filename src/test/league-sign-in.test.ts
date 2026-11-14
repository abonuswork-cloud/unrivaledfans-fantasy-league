import { beforeEach, describe, expect, it } from 'vitest'
import { canResumeLeagueSignIn, clearLeagueSignIn, hasPendingLeagueSignIn, rememberLeagueSignIn } from '@/lib/league-sign-in'

describe('Create/join after Google sign-in', () => {
  beforeEach(() => sessionStorage.clear())

  it('retains the popup intent across a redirect and clears it after resuming', () => {
    rememberLeagueSignIn(sessionStorage)
    expect(hasPendingLeagueSignIn(sessionStorage)).toBe(true)
    clearLeagueSignIn(sessionStorage)
    expect(hasPendingLeagueSignIn(sessionStorage)).toBe(false)
  })

  it('automatically resumes after authentication with a complete profile', () => {
    expect(canResumeLeagueSignIn(true, true, false, true)).toBe(true)
  })

  it('waits for sign-in and manager details before opening the league form', () => {
    expect(canResumeLeagueSignIn(true, false, false, true)).toBe(false)
    expect(canResumeLeagueSignIn(true, true, true, true)).toBe(false)
    expect(canResumeLeagueSignIn(true, true, false, false)).toBe(false)
  })

  it('does not reopen on an ordinary signed-in reload without an intent', () => {
    expect(canResumeLeagueSignIn(false, true, false, true)).toBe(false)
  })
})