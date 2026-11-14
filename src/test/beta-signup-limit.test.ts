import { expect, it } from 'vitest'
import postgres from 'postgres'

it.skipIf(!process.env['BETA_TEST_DATABASE_URL'])('allows Google user 30, rejects user 31, and leaves existing sign-ins unaffected', async () => {
  const url = process.env['BETA_TEST_DATABASE_URL']
  if (!url) return
  const sql = postgres(url, { max: 1 })
  try {
    await sql.begin(async tx => {
      await tx`CREATE TEMP TABLE beta_signup_test (id integer PRIMARY KEY, raw_app_meta_data jsonb)`
      await tx`CREATE TRIGGER beta_test BEFORE INSERT ON beta_signup_test FOR EACH ROW EXECUTE FUNCTION public.enforce_beta_google_signup_limit()`
      await tx`UPDATE public.beta_signup_capacity SET google_users=29 WHERE id=1`
      await tx`INSERT INTO beta_signup_test VALUES (30, '{"provider":"google"}'::jsonb)`
      const [capacity] = await tx`SELECT google_users,max_google_users FROM public.beta_signup_capacity WHERE id=1`
      expect(capacity?.['max_google_users']).toBe(30)
      expect(capacity?.['google_users']).toBe(30)
      await tx.savepoint(async sp => {
        await expect(sp`INSERT INTO beta_signup_test VALUES (31, '{"provider":"google"}'::jsonb)`).rejects.toThrow('30 Google user limit')
        throw new Error('restore rejected signup savepoint')
      }).catch(error => {
        if (error.message !== 'restore rejected signup savepoint') throw error
      })
      await tx`UPDATE beta_signup_test SET raw_app_meta_data='{"provider":"google","signed_in":true}'::jsonb WHERE id=30`
      await tx`INSERT INTO beta_signup_test VALUES (32, '{"provider":"email"}'::jsonb)`
      const [after] = await tx`SELECT google_users FROM public.beta_signup_capacity WHERE id=1`
      expect(after?.['google_users']).toBe(30)
      throw new Error('rollback beta signup test')
    }).catch(error => {
      if (error.message !== 'rollback beta signup test') throw error
    })
  } finally {
    await sql.end()
  }
})