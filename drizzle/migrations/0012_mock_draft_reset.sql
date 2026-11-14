ALTER TABLE public.leagues ADD COLUMN IF NOT EXISTS is_mock boolean NOT NULL DEFAULT false;
CREATE OR REPLACE FUNCTION public.start_mock_draft(lid uuid) RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $$
DECLARE l leagues;
BEGIN
 IF NOT public.league_commissioner(lid) THEN RAISE EXCEPTION 'Only the commissioner can start a mock draft'; END IF;
 SELECT * INTO l FROM leagues WHERE id=lid FOR UPDATE;
 IF l.draft_status<>'waiting' THEN RAISE EXCEPTION 'Reset the draft before starting a mock draft'; END IF;
 IF (SELECT count(*) FROM teams WHERE league_id=lid)<2 THEN RAISE EXCEPTION 'At least two teams are required'; END IF;
 UPDATE leagues SET is_mock=true,draft_status='live',current_pick=1,pick_deadline=now()+make_interval(secs=>pick_seconds) WHERE id=lid;
 INSERT INTO league_activity(league_id,message) VALUES(lid,'Mock draft started');
END $$;
CREATE OR REPLACE FUNCTION public.reset_league_draft(lid uuid) RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $$
BEGIN
 IF NOT public.league_commissioner(lid) THEN RAISE EXCEPTION 'Only the commissioner can reset the draft'; END IF;
 PERFORM 1 FROM leagues WHERE id=lid FOR UPDATE;
 DELETE FROM waiver_claims WHERE waiver_id IN (SELECT id FROM player_waivers WHERE league_id=lid);
 DELETE FROM player_waivers WHERE league_id=lid;
 DELETE FROM player_trades WHERE league_id=lid;
 DELETE FROM waiver_priority WHERE league_id=lid;
 DELETE FROM weekly_results WHERE league_id=lid;
 DELETE FROM league_matchups WHERE league_id=lid;
 DELETE FROM draft_picks WHERE league_id=lid;
 UPDATE roster_slots SET player_id=NULL WHERE league_id=lid;
 UPDATE teams SET wins=0,losses=0,ties=0,total_points=0 WHERE league_id=lid;
 UPDATE leagues SET draft_status='waiting',current_pick=1,pick_deadline=NULL,is_mock=false WHERE id=lid;
 INSERT INTO league_activity(league_id,message) VALUES(lid,'Draft reset by the commissioner');
END $$;
REVOKE ALL ON FUNCTION public.start_mock_draft(uuid),public.reset_league_draft(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.start_mock_draft(uuid),public.reset_league_draft(uuid) TO authenticated;