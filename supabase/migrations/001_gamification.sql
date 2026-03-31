-- ============================================
-- LATE CULTURE — Gamification Schema
-- Run in Supabase SQL Editor
-- ============================================

-- ── 1. Add XP & taste columns to profiles ──
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS xp_total int DEFAULT 0,
  ADD COLUMN IF NOT EXISTS level int DEFAULT 1,
  ADD COLUMN IF NOT EXISTS taste_tags text[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS taste_label text DEFAULT 'New Explorer',
  ADD COLUMN IF NOT EXISTS venues_saved int DEFAULT 0,
  ADD COLUMN IF NOT EXISTS venues_visited int DEFAULT 0;

-- ── 2. XP Logs ──
CREATE TABLE IF NOT EXISTS public.xp_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  action text NOT NULL,
  xp_amount int NOT NULL,
  source_id text,
  source_type text,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_xp_logs_user ON public.xp_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_xp_logs_dedup ON public.xp_logs(user_id, action, source_id);

ALTER TABLE public.xp_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users see own xp logs" ON public.xp_logs FOR SELECT USING (auth.uid() = user_id);

-- ── 3. Award XP RPC (atomic, deduplicating) ──
CREATE OR REPLACE FUNCTION public.award_xp(
  p_user_id uuid,
  p_action text,
  p_xp_amount int,
  p_source_id text DEFAULT NULL,
  p_source_type text DEFAULT NULL
) RETURNS jsonb AS $$
DECLARE
  v_new_total int;
  v_new_level int;
  v_exists boolean;
BEGIN
  -- Check for duplicate
  IF p_source_id IS NOT NULL THEN
    SELECT EXISTS(
      SELECT 1 FROM public.xp_logs
      WHERE user_id = p_user_id AND action = p_action AND source_id = p_source_id
    ) INTO v_exists;
    IF v_exists THEN
      SELECT xp_total, level INTO v_new_total, v_new_level FROM public.profiles WHERE id = p_user_id;
      RETURN jsonb_build_object('xp_gained', 0, 'total_xp', v_new_total, 'level', v_new_level, 'duplicate', true);
    END IF;
  END IF;

  -- Insert log
  INSERT INTO public.xp_logs (user_id, action, xp_amount, source_id, source_type)
  VALUES (p_user_id, p_action, p_xp_amount, p_source_id, p_source_type);

  -- Update profile XP
  UPDATE public.profiles
  SET xp_total = xp_total + p_xp_amount, updated_at = now()
  WHERE id = p_user_id
  RETURNING xp_total INTO v_new_total;

  -- Calculate new level: level N requires 50*N cumulative XP
  -- Level 1=0, Level 2=50, Level 3=150, Level 4=300, Level 5=500...
  v_new_level := 1;
  DECLARE v_threshold int := 0;
  BEGIN
    LOOP
      v_threshold := v_threshold + 50 * v_new_level;
      EXIT WHEN v_threshold > v_new_total;
      v_new_level := v_new_level + 1;
    END LOOP;
  END;

  -- Update level
  UPDATE public.profiles SET level = v_new_level WHERE id = p_user_id;

  RETURN jsonb_build_object('xp_gained', p_xp_amount, 'total_xp', v_new_total, 'level', v_new_level, 'duplicate', false);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ── 4. Curated Collections ──
CREATE TABLE IF NOT EXISTS public.curated_collections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  description text,
  icon text,
  cover_image text,
  category text,
  venue_count int DEFAULT 0,
  reward_badge_id text REFERENCES public.badges(id),
  reward_xp int DEFAULT 50,
  sort_order int DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.curated_collections ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Active curated collections are public" ON public.curated_collections FOR SELECT USING (is_active = true);

CREATE TABLE IF NOT EXISTS public.curated_collection_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  collection_id uuid REFERENCES public.curated_collections(id) ON DELETE CASCADE NOT NULL,
  venue_sanity_id text NOT NULL,
  venue_type text NOT NULL,
  venue_slug text NOT NULL,
  venue_name text NOT NULL,
  sort_order int DEFAULT 0,
  UNIQUE(collection_id, venue_sanity_id)
);

ALTER TABLE public.curated_collection_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Curated items are public" ON public.curated_collection_items FOR SELECT USING (true);

-- ── 5. User Collection Progress ──
CREATE TABLE IF NOT EXISTS public.user_collection_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  collection_id uuid REFERENCES public.curated_collections(id) ON DELETE CASCADE NOT NULL,
  venue_sanity_id text NOT NULL,
  completed_at timestamptz DEFAULT now(),
  UNIQUE(user_id, collection_id, venue_sanity_id)
);

CREATE INDEX IF NOT EXISTS idx_ucp_user_coll ON public.user_collection_progress(user_id, collection_id);

ALTER TABLE public.user_collection_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users see own progress" ON public.user_collection_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Service role inserts progress" ON public.user_collection_progress FOR INSERT WITH CHECK (true);

-- ── 6. Venue Activity (trending) ──
CREATE TABLE IF NOT EXISTS public.venue_activity (
  venue_sanity_id text PRIMARY KEY,
  venue_type text NOT NULL,
  venue_slug text NOT NULL,
  venue_name text NOT NULL,
  saves_7d int DEFAULT 0,
  visits_7d int DEFAULT 0,
  plans_7d int DEFAULT 0,
  trending_score numeric DEFAULT 0,
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.venue_activity ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Venue activity is public" ON public.venue_activity FOR SELECT USING (true);

-- ── 7. Night Plan Results ──
CREATE TABLE IF NOT EXISTS public.night_plan_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE,
  vibe text NOT NULL,
  budget text NOT NULL,
  area text,
  restaurant_sanity_id text,
  bar_sanity_id text,
  after_sanity_id text,
  is_surprise boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.night_plan_results ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users see own plan results" ON public.night_plan_results FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert own plan results" ON public.night_plan_results FOR INSERT WITH CHECK (auth.uid() = user_id);

-- ── 8. Additional Badges ──
INSERT INTO public.badges (id, name, description, icon, category, is_secret, sort_order) VALUES
  ('rooftop_explorer', 'Rooftop Explorer', 'Saved or visited 10 rooftop places', '🏙', 'collection', false, 20),
  ('cheap_eats_king', 'Cheap Eats King', 'Complete the Cheap Eats collection', '🍜', 'collection', false, 21),
  ('date_master', 'Date Master', 'Complete the Date Spots collection', '💕', 'collection', false, 22),
  ('night_planner', 'Night Planner', 'Generated 5 Plan My Night itineraries', '📋', 'engagement', false, 23),
  ('level_5', 'Rising Star', 'Reached Level 5', '⭐', 'progression', false, 24),
  ('level_10', 'City Insider', 'Reached Level 10', '🌟', 'progression', false, 25),
  ('level_20', 'Bangkok Authority', 'Reached Level 20', '👑', 'progression', false, 26)
ON CONFLICT (id) DO NOTHING;

-- ── 9. Update counters function ──
CREATE OR REPLACE FUNCTION public.update_venue_counters(p_user_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE public.profiles SET
    venues_saved = (SELECT count(*) FROM public.reactions WHERE user_id = p_user_id),
    venues_visited = (SELECT count(DISTINCT venue_sanity_id) FROM public.checkins WHERE user_id = p_user_id),
    updated_at = now()
  WHERE id = p_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
