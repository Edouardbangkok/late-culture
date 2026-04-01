-- ============================================
-- LATE CULTURE — Visit Highlights
-- Run in Supabase SQL Editor
-- ============================================

ALTER TABLE public.checkins ADD COLUMN IF NOT EXISTS highlight text;
