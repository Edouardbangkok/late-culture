-- ============================================
-- LATE CULTURE — Database Schema
-- Run this in Supabase SQL Editor
-- ============================================

-- ── Profiles ──
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique,
  display_name text,
  avatar_url text,
  bio text,
  city_score_level text default 'Explorer',
  is_og boolean default false,
  is_editors_circle boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.profiles enable row level security;
create policy "Profiles are viewable by everyone" on public.profiles for select using (true);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);
create policy "Users can insert own profile" on public.profiles for insert with check (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, username, display_name, avatar_url, is_og)
  values (
    new.id,
    'user_' || left(new.id::text, 8),
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', 'Late Culture User'),
    coalesce(new.raw_user_meta_data->>'avatar_url', new.raw_user_meta_data->>'picture', null),
    (select count(*) < 100 from public.profiles)
  );
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ── Badges (seed data) ──
create table if not exists public.badges (
  id text primary key,
  name text not null,
  description text,
  icon text,
  category text not null,
  is_secret boolean default false,
  sort_order int default 0
);

alter table public.badges enable row level security;
create policy "Badges are viewable by everyone" on public.badges for select using (true);

-- Seed 19 badges
insert into public.badges (id, name, description, icon, category, is_secret, sort_order) values
  ('first_door', 'First Door', 'First venue check-in', '🚪', 'exploration', false, 1),
  ('night_walker', 'Night Walker', '10 venues visited', '🌃', 'exploration', false, 2),
  ('neighbourhood', 'Neighbourhood', '5 check-ins in the same neighbourhood', '🗺', 'exploration', false, 3),
  ('city_king', 'City King', 'All venues in Bangkok visited', '👑', 'exploration', false, 4),
  ('the_palate', 'The Palate', '5 restaurants visited', '🍽', 'category', false, 5),
  ('the_pour', 'The Pour', '5 bars visited', '🍸', 'category', false, 6),
  ('the_suite', 'The Suite', '3 hotels visited', '🏨', 'category', false, 7),
  ('after_dark', 'After Dark', '3 party venues visited', '🎉', 'category', false, 8),
  ('the_full_set', 'The Full Set', 'At least 1 in each category', '⭐', 'category', false, 9),
  ('first_note', 'First Note', 'First insider note posted', '📝', 'engagement', false, 10),
  ('curator', 'Curator', 'First collection created', '📋', 'engagement', false, 11),
  ('the_voice', 'The Voice', 'Voted 4 weeks in a row', '🗳', 'engagement', false, 12),
  ('golden_hour', 'Golden Hour', 'Check-in between 17h-19h Bangkok time', '🌅', 'timing', false, 13),
  ('midnight', 'Midnight', 'Check-in after midnight', '🌙', 'timing', false, 14),
  ('regular', 'Regular', 'Same venue visited 3 times', '📆', 'timing', false, 15),
  ('og', 'OG', 'Among the first 100 members', '🥇', 'exclusive', false, 16),
  ('editors_circle', 'Editor''s Circle', 'Invited by the Late Culture team', '✍️', 'exclusive', false, 17),
  ('river_rat', 'River Rat', '3 riverside venues visited', '🌊', 'secret', true, 18),
  ('speakeasy', 'Speakeasy', '3 "Behind the Door" venues visited', '🔒', 'secret', true, 19)
on conflict (id) do nothing;

-- ── User Badges ──
create table if not exists public.user_badges (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  badge_id text references public.badges(id) not null,
  earned_at timestamptz default now(),
  unique(user_id, badge_id)
);

alter table public.user_badges enable row level security;
create policy "User badges are viewable by everyone" on public.user_badges for select using (true);
create policy "Service role can insert badges" on public.user_badges for insert with check (true);

-- ── Check-ins ──
create table if not exists public.checkins (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  venue_sanity_id text not null,
  venue_type text not null,
  venue_slug text not null,
  venue_name text not null,
  venue_neighborhood text,
  venue_category text,
  venue_lat numeric,
  venue_lng numeric,
  checked_in_at timestamptz default now(),
  bangkok_hour int generated always as (extract(hour from checked_in_at at time zone 'Asia/Bangkok')::int) stored
);

alter table public.checkins enable row level security;
create policy "Users can view own checkins" on public.checkins for select using (auth.uid() = user_id);
create policy "Public checkin counts" on public.checkins for select using (true);
create policy "Users can insert own checkins" on public.checkins for insert with check (auth.uid() = user_id);
create policy "Users can delete own checkins" on public.checkins for delete using (auth.uid() = user_id);

-- ── Reactions (saves/bookmarks) ──
create table if not exists public.reactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  venue_sanity_id text not null,
  venue_type text not null,
  venue_slug text not null,
  reaction_type text default 'save',
  created_at timestamptz default now(),
  unique(user_id, venue_sanity_id, reaction_type)
);

alter table public.reactions enable row level security;
create policy "Users can view own reactions" on public.reactions for select using (auth.uid() = user_id);
create policy "Users can insert own reactions" on public.reactions for insert with check (auth.uid() = user_id);
create policy "Users can delete own reactions" on public.reactions for delete using (auth.uid() = user_id);

-- ── Collections ──
create table if not exists public.collections (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  slug text not null,
  description text,
  is_public boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(user_id, slug)
);

alter table public.collections enable row level security;
create policy "Public collections are viewable by everyone" on public.collections for select using (is_public = true or auth.uid() = user_id);
create policy "Users can insert own collections" on public.collections for insert with check (auth.uid() = user_id);
create policy "Users can update own collections" on public.collections for update using (auth.uid() = user_id);
create policy "Users can delete own collections" on public.collections for delete using (auth.uid() = user_id);

-- ── Collection Items ──
create table if not exists public.collection_items (
  id uuid primary key default gen_random_uuid(),
  collection_id uuid references public.collections(id) on delete cascade not null,
  venue_sanity_id text not null,
  venue_type text not null,
  venue_slug text not null,
  venue_name text not null,
  venue_image_ref text,
  sort_order int default 0,
  added_at timestamptz default now()
);

alter table public.collection_items enable row level security;
create policy "Collection items follow collection visibility" on public.collection_items for select using (
  exists (select 1 from public.collections where id = collection_id and (is_public = true or auth.uid() = user_id))
);
create policy "Users can manage items in own collections" on public.collection_items for insert with check (
  exists (select 1 from public.collections where id = collection_id and auth.uid() = user_id)
);
create policy "Users can delete items from own collections" on public.collection_items for delete using (
  exists (select 1 from public.collections where id = collection_id and auth.uid() = user_id)
);

-- ── Insider Notes ──
create table if not exists public.insider_notes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  venue_sanity_id text not null,
  venue_type text not null,
  venue_slug text not null,
  content text not null check (char_length(content) <= 140),
  is_approved boolean default false,
  created_at timestamptz default now()
);

alter table public.insider_notes enable row level security;
create policy "Approved notes are viewable by everyone" on public.insider_notes for select using (is_approved = true or auth.uid() = user_id);
create policy "Users can insert own notes" on public.insider_notes for insert with check (auth.uid() = user_id);
create policy "Users can delete own notes" on public.insider_notes for delete using (auth.uid() = user_id);

-- ── Votes (Hot Right Now) ──
create table if not exists public.votes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  venue_sanity_id text not null,
  venue_type text not null,
  venue_slug text not null,
  venue_name text not null,
  week_start date not null,
  created_at timestamptz default now(),
  unique(user_id, week_start)
);

alter table public.votes enable row level security;
create policy "Vote aggregates are viewable by everyone" on public.votes for select using (true);
create policy "Users can insert own vote" on public.votes for insert with check (auth.uid() = user_id);

-- ── Night Plans (My Night Builder) ──
create table if not exists public.night_plans (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade,
  share_slug text unique not null,
  title text,
  slots jsonb not null default '[]',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.night_plans enable row level security;
create policy "Night plans are viewable by share slug" on public.night_plans for select using (true);
create policy "Users can insert own night plans" on public.night_plans for insert with check (auth.uid() = user_id);
create policy "Users can update own night plans" on public.night_plans for update using (auth.uid() = user_id);
create policy "Users can delete own night plans" on public.night_plans for delete using (auth.uid() = user_id);
