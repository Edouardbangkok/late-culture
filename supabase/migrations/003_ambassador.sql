-- ============================================
-- LATE CULTURE — Venue Ambassador System
-- Run in Supabase SQL Editor
-- ============================================

-- Get the ambassador (top visitor with 3+ check-ins) for a venue
CREATE OR REPLACE FUNCTION public.get_venue_ambassador(p_venue_id text)
RETURNS TABLE(
  user_id uuid,
  username text,
  display_name text,
  avatar_url text,
  visit_count bigint
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    c.user_id,
    p.username,
    p.display_name,
    p.avatar_url,
    count(*) as visit_count
  FROM public.checkins c
  JOIN public.profiles p ON p.id = c.user_id
  WHERE c.venue_sanity_id = p_venue_id
  GROUP BY c.user_id, p.username, p.display_name, p.avatar_url
  HAVING count(*) >= 3
  ORDER BY count(*) DESC
  LIMIT 1;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Get visit counts per venue for a user (for profile page)
CREATE OR REPLACE FUNCTION public.get_user_venue_visits(p_user_id uuid)
RETURNS TABLE(
  venue_sanity_id text,
  venue_name text,
  venue_type text,
  venue_slug text,
  visit_count bigint,
  last_visit timestamptz
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    c.venue_sanity_id,
    c.venue_name,
    c.venue_type,
    c.venue_slug,
    count(*) as visit_count,
    max(c.checked_in_at) as last_visit
  FROM public.checkins c
  WHERE c.user_id = p_user_id
  GROUP BY c.venue_sanity_id, c.venue_name, c.venue_type, c.venue_slug
  ORDER BY count(*) DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
