-- ============================================
-- LATE CULTURE — Rare & Ultra-Rare Badges
-- Run in Supabase SQL Editor
-- ============================================

INSERT INTO public.badges (id, name, description, icon, category, is_secret, sort_order) VALUES
  -- Hard badges
  ('city_king', 'City King', 'Visit every single venue on Late Culture Bangkok', '👑', 'exploration', false, 4),
  ('the_marathon', 'The Marathon', 'Visit 4 different venues in one night (same day)', '🏃', 'timing', false, 28),
  ('the_diplomat', 'The Diplomat', 'Visit venues in 10 different neighborhoods', '🌐', 'exploration', false, 29),
  ('full_moon', 'Full Moon', 'Check in every day for 30 consecutive days', '🌕', 'timing', false, 30),

  -- Ultra-rare badges
  ('the_founder', 'The Founder', 'Among the first 10 users ever', '💎', 'exclusive', false, 31),
  ('centurion', 'Centurion', 'Reach 100 total check-ins', '🏛', 'exploration', false, 32),
  ('ambassador_5', 'Multi-Ambassador', 'Be the ambassador of 5 different venues simultaneously', '🎖', 'exclusive', false, 33),
  ('night_king', 'Night King', 'Check in at 3 venues after midnight in one night', '🦇', 'timing', true, 34),
  ('all_categories', 'The Connoisseur', 'Visit at least one venue in every category that exists', '🎓', 'category', false, 35),
  ('thousand_xp', 'Thousand', 'Accumulate 1000 XP', '🔥', 'progression', false, 36),
  ('five_thousand_xp', 'Five Thousand', 'Accumulate 5000 XP', '💫', 'progression', false, 37),
  ('ten_thousand_xp', 'Legend', 'Accumulate 10000 XP', '🏆', 'progression', true, 38),
  ('ghost', 'Ghost', 'Visit a venue at 3am or later', '👻', 'timing', true, 39),
  ('loyal', 'Loyal', 'Visit the same venue 10 times', '💍', 'timing', false, 40)
ON CONFLICT (id) DO NOTHING;
