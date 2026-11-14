DROP POLICY IF EXISTS checks_read ON public.schedule_checks;
REVOKE ALL ON public.schedule_checks FROM anon, authenticated;
DROP POLICY IF EXISTS sync_read ON public.stats_sync;
REVOKE ALL ON public.stats_sync FROM anon, authenticated;
CREATE OR REPLACE FUNCTION public.stats_last_success()
RETURNS timestamptz LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$ SELECT last_success FROM public.stats_sync WHERE id = 1 $$;
REVOKE ALL ON FUNCTION public.stats_last_success() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.stats_last_success() TO anon, authenticated;