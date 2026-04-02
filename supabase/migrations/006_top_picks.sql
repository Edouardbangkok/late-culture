-- ============================================
-- LATE CULTURE — Top 3 Picks System
-- Run in Supabase SQL Editor
-- ============================================

-- User's top 3 restaurant picks
CREATE TABLE IF NOT EXISTS public.top_picks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  rank int NOT NULL CHECK (rank >= 1 AND rank <= 3),
  venue_sanity_id text NOT NULL,
  venue_type text NOT NULL DEFAULT 'restaurant',
  venue_slug text NOT NULL,
  venue_name text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, rank)
);

CREATE INDEX IF NOT EXISTS idx_top_picks_user ON public.top_picks(user_id);
CREATE INDEX IF NOT EXISTS idx_top_picks_venue ON public.top_picks(venue_sanity_id);

ALTER TABLE public.top_picks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Top picks are public if user allows" ON public.top_picks FOR SELECT USING (true);
CREATE POLICY "Users manage own picks" ON public.top_picks FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own picks" ON public.top_picks FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users delete own picks" ON public.top_picks FOR DELETE USING (auth.uid() = user_id);

-- Add hide_top_picks to profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS hide_top_picks boolean DEFAULT false;

-- Aggregate function: get restaurant rankings by vote count
CREATE OR REPLACE FUNCTION public.get_restaurant_rankings()
RETURNS TABLE(
  venue_sanity_id text,
  venue_slug text,
  venue_name text,
  vote_count bigint,
  avg_rank numeric
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    t.venue_sanity_id,
    t.venue_slug,
    t.venue_name,
    count(*) as vote_count,
    round(avg(t.rank), 1) as avg_rank
  FROM public.top_picks t
  WHERE t.venue_type = 'restaurant'
  GROUP BY t.venue_sanity_id, t.venue_slug, t.venue_name
  HAVING count(*) >= 1
  ORDER BY count(*) DESC, avg(t.rank) ASC
  LIMIT 20;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
