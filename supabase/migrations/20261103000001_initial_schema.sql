-- ==============================================================================
-- ImVerde Supabase Initial Migration
-- Tables: profiles, analyses, actions_log
-- Storage: private bucket "bills" with user-restricted policies
-- Auth Trigger: auto-create profile on signup
-- Row Level Security: enabled and enforced on all tables
-- ==============================================================================

-- 1. EXTENSIONS & UTILITIES
create extension if not exists "pgcrypto";

-- 2. TABLE: profiles
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  region text default 'India',
  household_size integer default 1 check (household_size > 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Enable RLS for profiles
alter table public.profiles enable row level security;

-- Policies for profiles
create policy "Users can view own profile"
  on public.profiles
  for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles
  for update
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles
  for insert
  with check (auth.uid() = id);

-- 3. TABLE: analyses
create table if not exists public.analyses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  billing_period text not null,
  kwh numeric(10, 2) not null check (kwh >= 0),
  amount_inr numeric(12, 2) not null check (amount_inr >= 0),
  co2_kg numeric(10, 2) not null check (co2_kg >= 0),
  score integer not null check (score >= 0 and score <= 100),
  provider text not null,
  created_at timestamptz not null default now()
);

-- Index for performant queries by user
create index if not exists idx_analyses_user_id on public.analyses(user_id);
create index if not exists idx_analyses_created_at on public.analyses(created_at desc);

-- Enable RLS for analyses
alter table public.analyses enable row level security;

-- Policies for analyses
create policy "Users can view own analyses"
  on public.analyses
  for select
  using (auth.uid() = user_id);

create policy "Users can insert own analyses"
  on public.analyses
  for insert
  with check (auth.uid() = user_id);

create policy "Users can update own analyses"
  on public.analyses
  for update
  using (auth.uid() = user_id);

create policy "Users can delete own analyses"
  on public.analyses
  for delete
  using (auth.uid() = user_id);

-- 4. TABLE: actions_log
create table if not exists public.actions_log (
  id uuid primary key default gen_random_uuid(),
  analysis_id uuid not null references public.analyses(id) on delete cascade,
  action_key text not null,
  est_savings_inr numeric(12, 2) not null default 0 check (est_savings_inr >= 0),
  est_co2_kg numeric(10, 2) not null default 0 check (est_co2_kg >= 0),
  created_at timestamptz not null default now()
);

-- Index for performant lookups by analysis
create index if not exists idx_actions_log_analysis_id on public.actions_log(analysis_id);

-- Enable RLS for actions_log
alter table public.actions_log enable row level security;

-- Policies for actions_log (restricted to owner of the parent analysis)
create policy "Users can view actions for own analyses"
  on public.actions_log
  for select
  using (
    exists (
      select 1 from public.analyses
      where analyses.id = actions_log.analysis_id
        and analyses.user_id = auth.uid()
    )
  );

create policy "Users can insert actions for own analyses"
  on public.actions_log
  for insert
  with check (
    exists (
      select 1 from public.analyses
      where analyses.id = actions_log.analysis_id
        and analyses.user_id = auth.uid()
    )
  );

create policy "Users can update actions for own analyses"
  on public.actions_log
  for update
  using (
    exists (
      select 1 from public.analyses
      where analyses.id = actions_log.analysis_id
        and analyses.user_id = auth.uid()
    )
  );

create policy "Users can delete actions for own analyses"
  on public.actions_log
  for delete
  using (
    exists (
      select 1 from public.analyses
      where analyses.id = actions_log.analysis_id
        and analyses.user_id = auth.uid()
    )
  );

-- 5. FUNCTION & TRIGGER: Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
declare
  user_display_name text;
begin
  -- Extract display name from metadata or fall back to email prefix
  user_display_name := coalesce(
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'name',
    split_part(new.email, '@', 1)
  );

  insert into public.profiles (id, display_name, region, household_size)
  values (
    new.id,
    user_display_name,
    'India',
    1
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

-- Drop trigger if exists and recreate
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 6. STORAGE BUCKET: "bills" (Private)
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'bills',
  'bills',
  false,
  10485760, -- 10MB limit
  array['application/pdf', 'image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update set
  public = false,
  file_size_limit = 10485760,
  allowed_mime_types = array['application/pdf', 'image/jpeg', 'image/png', 'image/webp'];

-- Enable RLS on storage.objects if not already enabled
alter table storage.objects enable row level security;

-- Storage Policies for "bills" bucket
-- Upload policy: Users can only upload to their own user_id directory
create policy "Allow authenticated uploads to own folder"
  on storage.objects
  for insert
  to authenticated
  with check (
    bucket_id = 'bills'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

-- Select policy: Users can only read their own files
create policy "Allow users to read own bill files"
  on storage.objects
  for select
  to authenticated
  using (
    bucket_id = 'bills'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

-- Delete policy: Users can delete their own files
create policy "Allow users to delete own bill files"
  on storage.objects
  for delete
  to authenticated
  using (
    bucket_id = 'bills'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

