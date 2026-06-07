-- THRULABS Complete User-Based Learning Platform Migration Schema
-- Database: Supabase PostgreSQL

-- 0. Clean up existing tables if structure needs alignment
drop table if exists public.user_preferences cascade;
drop table if exists public.saved_resources cascade;
drop table if exists public.simulator_history cascade;
drop table if exists public.project_progress cascade;
drop table if exists public.certificates cascade;
drop table if exists public.quiz_attempts cascade;
drop table if exists public.course_progress cascade;
drop table if exists public.user_profiles cascade;

-- 1. Create User Profiles Table
create table public.user_profiles (
    id uuid primary key references auth.users(id) on delete cascade,
    full_name text,
    first_name text,
    last_name text,
    email text,
    avatar_url text,
    certificate_name text,
    provider text,
    joined_at timestamp with time zone default now(),
    last_login timestamp with time zone default now()
);

-- 2. Create Learning Progress Table
create table public.course_progress (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references auth.users(id) on delete cascade not null,
    course_id text not null,
    current_module text,
    modules_completed integer default 0,
    lessons_completed integer default 0,
    quiz_score numeric default 0.0,
    completion_percentage numeric default 0.0,
    last_accessed timestamp with time zone default now(),
    completed boolean default false,
    constraint unique_user_course unique (user_id, course_id)
);

-- 3. Create Quiz Attempts Table
create table public.quiz_attempts (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references auth.users(id) on delete cascade not null,
    course_id text not null,
    module_id text not null,
    score numeric not null,
    total_questions integer not null,
    passed boolean not null,
    submitted_at timestamp with time zone default now()
);

-- 4. Create Certificate Records Table
create table public.certificates (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references auth.users(id) on delete cascade not null,
    course_id text not null,
    certificate_id text not null unique,
    certificate_name text not null,
    issued_at timestamp with time zone default now(),
    verification_code text not null unique,
    constraint unique_user_course_cert unique (user_id, course_id)
);

-- 5. Create Project Progress Table
create table public.project_progress (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references auth.users(id) on delete cascade not null,
    project_id text not null,
    current_stage integer default 0,
    completed_stages integer default 0,
    progress_percentage numeric default 0.0,
    last_accessed timestamp with time zone default now(),
    constraint unique_user_project unique (user_id, project_id)
);

-- 6. Create Simulator History Table
create table public.simulator_history (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references auth.users(id) on delete cascade not null,
    simulator_name text not null,
    settings jsonb not null default '{}'::jsonb,
    results jsonb not null default '{}'::jsonb,
    created_at timestamp with time zone default now()
);

-- 7. Create Saved Resources Bookmarks Table
create table public.saved_resources (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references auth.users(id) on delete cascade not null,
    resource_id text not null,
    saved_at timestamp with time zone default now(),
    constraint unique_user_resource unique (user_id, resource_id)
);

-- 8. Create User Preferences Table
create table public.user_preferences (
    user_id uuid primary key references auth.users(id) on delete cascade,
    theme text default 'dark',
    notifications boolean default true,
    certificate_name text,
    profile_visibility text default 'private'
);

-- 9. Enable Row Level Security (RLS)
alter table public.user_profiles enable row level security;
alter table public.course_progress enable row level security;
alter table public.quiz_attempts enable row level security;
alter table public.certificates enable row level security;
alter table public.project_progress enable row level security;
alter table public.simulator_history enable row level security;
alter table public.saved_resources enable row level security;
alter table public.user_preferences enable row level security;

-- 10. Define RLS Policies

-- public.user_profiles policies
create policy "Allow profile select for owners" on public.user_profiles for select using (auth.uid() = id);
create policy "Allow profile insert for owners" on public.user_profiles for insert with check (auth.uid() = id);
create policy "Allow profile update for owners" on public.user_profiles for update using (auth.uid() = id) with check (auth.uid() = id);

-- public.course_progress policies
create policy "Allow progress select for owners" on public.course_progress for select using (auth.uid() = user_id);
create policy "Allow progress insert for owners" on public.course_progress for insert with check (auth.uid() = user_id);
create policy "Allow progress update for owners" on public.course_progress for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Allow progress delete for owners" on public.course_progress for delete using (auth.uid() = user_id);

-- public.quiz_attempts policies
create policy "Allow quiz select for owners" on public.quiz_attempts for select using (auth.uid() = user_id);
create policy "Allow quiz insert for owners" on public.quiz_attempts for insert with check (auth.uid() = user_id);
create policy "Allow quiz update for owners" on public.quiz_attempts for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- public.certificates policies (Public Read for verification site logic)
create policy "Allow public certificate select" on public.certificates for select using (true);
create policy "Allow certificate insert for owners" on public.certificates for insert with check (auth.uid() = user_id);
create policy "Allow certificate update for owners" on public.certificates for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- public.project_progress policies
create policy "Allow project progress select for owners" on public.project_progress for select using (auth.uid() = user_id);
create policy "Allow project progress insert for owners" on public.project_progress for insert with check (auth.uid() = user_id);
create policy "Allow project progress update for owners" on public.project_progress for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- public.simulator_history policies
create policy "Allow simulator select for owners" on public.simulator_history for select using (auth.uid() = user_id);
create policy "Allow simulator insert for owners" on public.simulator_history for insert with check (auth.uid() = user_id);

-- public.saved_resources policies
create policy "Allow resource select for owners" on public.saved_resources for select using (auth.uid() = user_id);
create policy "Allow resource insert for owners" on public.saved_resources for insert with check (auth.uid() = user_id);
create policy "Allow resource delete for owners" on public.saved_resources for delete using (auth.uid() = user_id);

-- public.user_preferences policies
create policy "Allow preference select for owners" on public.user_preferences for select using (auth.uid() = user_id);
create policy "Allow preference insert for owners" on public.user_preferences for insert with check (auth.uid() = user_id);
create policy "Allow preference update for owners" on public.user_preferences for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- 11. Create Performance Query Indexes
create index idx_course_progress_user_course on public.course_progress(user_id, course_id);
create index idx_quiz_attempts_user_course on public.quiz_attempts(user_id, course_id);
create index idx_certificates_user_course on public.certificates(user_id, course_id);
create index idx_certificates_code on public.certificates(verification_code);
create index idx_project_progress_user_project on public.project_progress(user_id, project_id);
create index idx_simulator_history_user on public.simulator_history(user_id, simulator_name);
create index idx_saved_resources_user on public.saved_resources(user_id);

-- 12. Signup Automation Triggers for public tables synchronization
create or replace function public.handle_new_user()
returns trigger as $$
begin
    insert into public.user_profiles (id, email, full_name, first_name, last_name, certificate_name, avatar_url, provider, joined_at)
    values (
        new.id,
        new.email,
        coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
        coalesce(new.raw_user_meta_data->>'first_name', new.raw_user_meta_data->>'given_name', split_part(new.email, '@', 1)),
        coalesce(new.raw_user_meta_data->>'last_name', new.raw_user_meta_data->>'family_name', ''),
        coalesce(new.raw_user_meta_data->>'certificate_name', new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
        coalesce(new.raw_user_meta_data->>'avatar_url', new.raw_user_meta_data->>'avatar', new.raw_user_meta_data->>'picture', ''),
        coalesce(new.app_metadata->>'provider', 'email'),
        new.created_at
    )
    on conflict (id) do update set
        email = excluded.email,
        full_name = coalesce(excluded.full_name, user_profiles.full_name),
        avatar_url = coalesce(excluded.avatar_url, user_profiles.avatar_url);
        
    insert into public.user_preferences (user_id, theme, notifications, certificate_name, profile_visibility)
    values (
        new.id,
        'dark',
        true,
        coalesce(new.raw_user_meta_data->>'certificate_name', new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
        'private'
    )
    on conflict (user_id) do nothing;
    
    return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
    after insert on auth.users
    for each row execute procedure public.handle_new_user();

-- 13. Secure check if email exists RPC
create or replace function public.check_email_exists(email_to_check text)
returns boolean as $$
begin
    return exists (select 1 from auth.users where email = email_to_check);
end;
$$ language plpgsql security definer;
