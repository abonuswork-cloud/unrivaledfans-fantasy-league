const key = 'fantasy-league-after-sign-in'

export function rememberLeagueSignIn(storage: Storage) {
  storage.setItem(key, 'pending')
}

export function hasPendingLeagueSignIn(storage: Storage) {
  return storage.getItem(key) === 'pending'
}

export function clearLeagueSignIn(storage: Storage) {
  storage.removeItem(key)
}

export function canResumeLeagueSignIn(pending: boolean, signedIn: boolean, profileLoading: boolean, complete: boolean) {
  return pending && signedIn && !profileLoading && complete
}