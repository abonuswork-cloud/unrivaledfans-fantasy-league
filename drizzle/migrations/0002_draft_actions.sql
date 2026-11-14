CREATE FUNCTION public.fantasy_draft(lid uuid,pid uuid DEFAULT NULL) RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $$
DECLARE l leagues;t teams;n int;r int;ord int;chosen uuid;s int;required_pos text;
BEGIN
 IF NOT public.league_member(lid) THEN RAISE EXCEPTION 'Join this league first'; END IF;
 SELECT * INTO l FROM leagues WHERE id=lid FOR UPDATE;
 SELECT count(*) INTO n FROM teams WHERE league_id=lid;
 IF l.draft_status='waiting' THEN
  IF NOT public.league_commissioner(lid) THEN RAISE EXCEPTION 'Only the commissioner can start'; END IF;
  IF n<2 THEN RAISE EXCEPTION 'At least two teams are required'; END IF;
  UPDATE leagues SET draft_status='live',pick_deadline=now()+make_interval(secs=>pick_seconds) WHERE id=lid; RETURN;
 END IF;
 IF l.draft_status<>'live' THEN RAISE EXCEPTION 'The draft is complete'; END IF;
 r:=(l.current_pick-1)/n;ord:=(l.current_pick-1)%n+1;
 IF r%2=1 THEN ord:=n-ord+1; END IF;
 SELECT * INTO t FROM teams WHERE league_id=lid AND draft_order=ord;
 IF pid IS NOT NULL AND t.owner_id IS DISTINCT FROM auth.uid() THEN RAISE EXCEPTION 'Another team is on the clock'; END IF;
 IF pid IS NULL AND now()<l.pick_deadline AND t.owner_id IS DISTINCT FROM auth.uid() THEN RAISE EXCEPTION 'The pick clock has not expired'; END IF;
 SELECT slot INTO s FROM roster_slots WHERE team_id=t.id AND player_id IS NULL ORDER BY slot LIMIT 1;
 required_pos:=CASE WHEN s=1 THEN 'G' WHEN s=2 THEN 'F' ELSE NULL END;
 IF pid IS NULL THEN
  SELECT p.id INTO chosen FROM draft_queue q JOIN players p ON p.id=q.player_id WHERE q.league_id=lid AND q.user_id=t.owner_id AND NOT EXISTS(SELECT 1 FROM roster_slots rs WHERE rs.league_id=lid AND rs.player_id=p.id) AND (required_pos IS NULL OR p.position=required_pos) ORDER BY q.created_at LIMIT 1;
  IF chosen IS NULL THEN SELECT p.id INTO chosen FROM players p WHERE NOT EXISTS(SELECT 1 FROM roster_slots rs WHERE rs.league_id=lid AND rs.player_id=p.id) AND (required_pos IS NULL OR p.position=required_pos) ORDER BY pts+reb*1.5+ast*2+stl*3+blk*3-turnovers DESC LIMIT 1; END IF;
 ELSE chosen:=pid; END IF;
 IF chosen IS NULL OR s IS NULL THEN RAISE EXCEPTION 'No eligible players remain'; END IF;
 IF EXISTS(SELECT 1 FROM roster_slots WHERE league_id=lid AND player_id=chosen) THEN RAISE EXCEPTION 'Player was already drafted'; END IF;
 IF required_pos IS NOT NULL AND (SELECT position FROM players WHERE id=chosen)<>required_pos THEN RAISE EXCEPTION 'This pick must fill your required position'; END IF;
 INSERT INTO draft_picks(league_id,team_id,player_id,pick_no,auto_pick) VALUES(lid,t.id,chosen,l.current_pick,pid IS NULL);
 UPDATE roster_slots SET player_id=chosen WHERE team_id=t.id AND slot=s;
 UPDATE leagues SET current_pick=current_pick+1,draft_status=CASE WHEN current_pick>=n*6 THEN 'complete' ELSE 'live' END,pick_deadline=now()+make_interval(secs=>pick_seconds) WHERE id=lid;
 INSERT INTO league_activity(league_id,message) SELECT lid,t.name||' drafted '||name FROM players WHERE id=chosen;
END $$;
CREATE FUNCTION public.update_fantasy_settings(lid uuid,league_name text,score jsonb,seconds int,lock_time timestamptz) RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $$ BEGIN
 IF NOT public.league_commissioner(lid) THEN RAISE EXCEPTION 'Only the commissioner can edit settings'; END IF;
 IF length(trim(league_name)) NOT BETWEEN 2 AND 60 OR seconds NOT BETWEEN 15 AND 180 THEN RAISE EXCEPTION 'Invalid league settings'; END IF;
 IF NOT (score ?& ARRAY['pts','reb','ast','stl','blk','turnovers']) THEN RAISE EXCEPTION 'All six scoring rules are required'; END IF;
 IF EXISTS(SELECT 1 FROM jsonb_each_text(score) WHERE value::numeric NOT BETWEEN -10 AND 10) THEN RAISE EXCEPTION 'Scoring values must be between -10 and 10'; END IF;
 UPDATE leagues SET name=trim(league_name),scoring=score,pick_seconds=seconds,lock_at=lock_time WHERE id=lid;
END $$;
CREATE FUNCTION public.record_fantasy_boxscore(lid uuid,pid uuid,gdate date,stats jsonb) RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $$ BEGIN
 IF NOT public.league_commissioner(lid) THEN RAISE EXCEPTION 'Only the commissioner can record results'; END IF;
 IF EXISTS(SELECT 1 FROM jsonb_each_text(stats) WHERE value::numeric<0) THEN RAISE EXCEPTION 'Box scores cannot be negative'; END IF;
 INSERT INTO game_boxscores(league_id,player_id,game_date,pts,reb,ast,stl,blk,turnovers) VALUES(lid,pid,gdate,(stats->>'pts')::numeric,(stats->>'reb')::numeric,(stats->>'ast')::numeric,(stats->>'stl')::numeric,(stats->>'blk')::numeric,(stats->>'turnovers')::numeric) ON CONFLICT(league_id,player_id,game_date) DO UPDATE SET pts=excluded.pts,reb=excluded.reb,ast=excluded.ast,stl=excluded.stl,blk=excluded.blk,turnovers=excluded.turnovers;
 INSERT INTO league_activity(league_id,message) SELECT lid,'Recorded box score for '||name FROM players WHERE id=pid;
END $$;
REVOKE ALL ON FUNCTION public.fantasy_draft(uuid,uuid),public.update_fantasy_settings(uuid,text,jsonb,int,timestamptz),public.record_fantasy_boxscore(uuid,uuid,date,jsonb) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.fantasy_draft(uuid,uuid),public.update_fantasy_settings(uuid,text,jsonb,int,timestamptz),public.record_fantasy_boxscore(uuid,uuid,date,jsonb) TO authenticated;