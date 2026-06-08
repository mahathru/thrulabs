-- THRULABS Overhauled Learning Platform Database Schema
-- Database: Supabase PostgreSQL

-- 0. Clean up existing tables if structure needs alignment
drop table if exists public.user_preferences cascade;
drop table if exists public.saved_resources cascade;
drop table if exists public.simulator_history cascade;
drop table if exists public.simulator_progress cascade;
drop table if exists public.project_progress cascade;
drop table if exists public.certificates cascade;
drop table if exists public.quiz_attempts cascade;
drop table if exists public.course_progress cascade;
drop table if exists public.user_profiles cascade;
drop table if exists public.profiles cascade;

-- 1. Create Profiles Table
create table public.profiles (
    id uuid primary key references auth.users(id) on delete cascade,
    full_name text,
    email text,
    avatar_url text,
    created_at timestamp with time zone default now()
);

-- 2. Create Course Progress Table
create table public.course_progress (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references auth.users(id) on delete cascade not null,
    course_id text not null,
    progress_percentage numeric default 0.0,
    completed boolean default false,
    completed_at timestamp with time zone,
    last_accessed timestamp with time zone default now(),
    current_module text,
    modules_completed integer default 0,
    lessons_completed integer default 0,
    quiz_score numeric default 0.0,
    constraint unique_user_course unique (user_id, course_id)
);

-- 3. Create Quiz Attempts Table (Helper table for quizzes)
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

-- 4. Create Project Progress Table
create table public.project_progress (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references auth.users(id) on delete cascade not null,
    project_id text not null,
    progress_percentage numeric default 0.0,
    completed boolean default false,
    completed_at timestamp with time zone,
    current_stage integer default 0,
    completed_stages integer default 0,
    last_accessed timestamp with time zone default now(),
    constraint unique_user_project unique (user_id, project_id)
);

-- 5. Create Simulator Progress Table
create table public.simulator_progress (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references auth.users(id) on delete cascade not null,
    simulator_id text not null,
    progress_percentage numeric default 0.0,
    completed boolean default false,
    completed_at timestamp with time zone,
    settings jsonb not null default '{}'::jsonb,
    results jsonb not null default '{}'::jsonb,
    constraint unique_user_simulator unique (user_id, simulator_id)
);

-- 6. Create Saved Resources Table (Helper table for bookmarks)
create table public.saved_resources (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references auth.users(id) on delete cascade not null,
    resource_id text not null,
    saved_at timestamp with time zone default now(),
    constraint unique_user_resource unique (user_id, resource_id)
);

-- 7. Create Certificates Table
create table public.certificates (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references auth.users(id) on delete cascade not null,
    course_id text not null,
    certificate_id text not null unique,
    issued_at timestamp with time zone default now(),
    certificate_url text,
    constraint unique_user_course_cert unique (user_id, course_id)
);

-- 7.5. Create User Preferences Table
create table public.user_preferences (
    user_id uuid primary key references auth.users(id) on delete cascade,
    theme text default 'dark',
    notifications boolean default true,
    certificate_name text,
    profile_visibility text default 'private',
    learning_hours numeric default 0.0,
    created_at timestamp with time zone default now()
);

-- 7.6. Add learning_hours to existing databases (safe to run multiple times)
alter table public.user_preferences add column if not exists learning_hours numeric default 0.0;

-- 8. Enable Row Level Security (RLS)
alter table public.profiles enable row level security;
alter table public.course_progress enable row level security;
alter table public.quiz_attempts enable row level security;
alter table public.project_progress enable row level security;
alter table public.simulator_progress enable row level security;
alter table public.saved_resources enable row level security;
alter table public.certificates enable row level security;
alter table public.user_preferences enable row level security;

-- 9. Define RLS Policies

-- profiles policies
create policy "Allow profile select for owners" on public.profiles for select using (auth.uid() = id);
create policy "Allow profile insert for owners" on public.profiles for insert with check (auth.uid() = id);
create policy "Allow profile update for owners" on public.profiles for update using (auth.uid() = id) with check (auth.uid() = id);

-- course_progress policies
create policy "Allow progress select for owners" on public.course_progress for select using (auth.uid() = user_id);
create policy "Allow progress insert for owners" on public.course_progress for insert with check (auth.uid() = user_id);
create policy "Allow progress update for owners" on public.course_progress for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- quiz_attempts policies
create policy "Allow quiz select for owners" on public.quiz_attempts for select using (auth.uid() = user_id);
create policy "Allow quiz insert for owners" on public.quiz_attempts for insert with check (auth.uid() = user_id);

-- project_progress policies
create policy "Allow project select for owners" on public.project_progress for select using (auth.uid() = user_id);
create policy "Allow project insert for owners" on public.project_progress for insert with check (auth.uid() = user_id);
create policy "Allow project update for owners" on public.project_progress for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- simulator_progress policies
create policy "Allow simulator select for owners" on public.simulator_progress for select using (auth.uid() = user_id);
create policy "Allow simulator insert for owners" on public.simulator_progress for insert with check (auth.uid() = user_id);
create policy "Allow simulator update for owners" on public.simulator_progress for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- saved_resources policies
create policy "Allow resource select for owners" on public.saved_resources for select using (auth.uid() = user_id);
create policy "Allow resource insert for owners" on public.saved_resources for insert with check (auth.uid() = user_id);
create policy "Allow resource delete for owners" on public.saved_resources for delete using (auth.uid() = user_id);

-- certificates policies
create policy "Allow certificate select for owners" on public.certificates for select using (auth.uid() = user_id);
create policy "Allow certificate insert for owners" on public.certificates for insert with check (auth.uid() = user_id);
create policy "Allow certificate update for owners" on public.certificates for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- user_preferences policies
create policy "Allow preferences select for owners" on public.user_preferences for select using (auth.uid() = user_id);
create policy "Allow preferences insert for owners" on public.user_preferences for insert with check (auth.uid() = user_id);
create policy "Allow preferences update for owners" on public.user_preferences for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- 10. Performance Indexes
create index idx_course_progress_user_course on public.course_progress(user_id, course_id);
create index idx_certificates_user_course on public.certificates(user_id, course_id);
create index idx_certificates_code on public.certificates(certificate_id);
create index idx_project_progress_user_project on public.project_progress(user_id, project_id);
create index idx_simulator_progress_user_sim on public.simulator_progress(user_id, simulator_id);

-- 11. Signup Automation Trigger Function
create or replace function public.handle_new_user()
returns trigger as $$
begin
    insert into public.profiles (id, email, full_name, avatar_url, created_at)
    values (
        new.id,
        new.email,
        coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
        coalesce(new.raw_user_meta_data->>'avatar_url', new.raw_user_meta_data->>'avatar', new.raw_user_meta_data->>'picture', ''),
        new.created_at
    )
    on conflict (id) do update set
        email = excluded.email,
        full_name = coalesce(excluded.full_name, profiles.full_name),
        avatar_url = coalesce(excluded.avatar_url, profiles.avatar_url);
        
    return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
    after insert on auth.users
    for each row execute procedure public.handle_new_user();

-- 12. Secure Check If Email Exists RPC Function
create or replace function public.check_email_exists(email_to_check text)
returns boolean as $$
begin
    return exists (select 1 from auth.users where email = email_to_check);
end;
$$ language plpgsql security definer;

-- 13. Secure Certificate Verification RPC Function (Bypasses RLS for public lookup)
create or replace function public.verify_certificate(cert_id text)
returns table (
    id uuid,
    user_id uuid,
    course_id text,
    certificate_id text,
    issued_at timestamp with time zone,
    certificate_url text,
    full_name text
) as $$
begin
    return query
    select c.id, c.user_id, c.course_id, c.certificate_id, c.issued_at, c.certificate_url, p.full_name
    from public.certificates c
    left join public.profiles p on c.user_id = p.id
    where upper(c.certificate_id) = upper(trim(cert_id));
end;
$$ language plpgsql security definer;

-- 14. Configure Storage Bucket for Certificates (Run in SQL if storage schema exists)
insert into storage.buckets (id, name, public)
values ('certificates', 'certificates', true)
on conflict (id) do nothing;

create policy "Allow public read of certificates" on storage.objects
    for select using (bucket_id = 'certificates');

create policy "Allow owners to upload certificates" on storage.objects
    for insert with check (bucket_id = 'certificates' and (auth.uid())::text = (regexp_split_to_array(name, '/'))[1]);

create policy "Allow owners to update certificates" on storage.objects
    for update using (bucket_id = 'certificates' and (auth.uid())::text = (regexp_split_to_array(name, '/'))[1]);
