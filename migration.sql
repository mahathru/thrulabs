-- THRULABS User Profiles Schema Migration
-- Database: Supabase PostgreSQL

-- 1. Create user_profiles table
create table if not exists user_profiles (
 id uuid primary key references auth.users(id) on delete cascade,
 email text,
 full_name text,
 certificate_name text,
 avatar_url text,
 provider text,
 created_at timestamp default now()
);

-- 2. Enable Row Level Security
alter table user_profiles enable row level security;

-- 3. RLS Policies
-- Allow users to retrieve their own profile information
create policy "Users can view their own profile"
  on user_profiles for select
  using (auth.uid() = id);

-- Allow users to insert their own profile
create policy "Users can insert their own profile"
  on user_profiles for insert
  with check (auth.uid() = id);

-- Allow users to update their own profile
create policy "Users can update their own profile"
  on user_profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);
