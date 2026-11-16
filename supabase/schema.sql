-- Run this once in the Supabase dashboard (SQL Editor) to set up accounts.
-- It creates the table that stores each learner's progress and makes sure
-- people can only see and change their own rows.

create table if not exists public.lesson_progress (
  user_id     uuid not null references auth.users (id) on delete cascade,
  lesson_slug text not null,
  best_score  int  not null default 0,
  updated_at  timestamptz not null default now(),
  primary key (user_id, lesson_slug)
);

alter table public.lesson_progress enable row level security;

create policy "Learners read their own progress"
  on public.lesson_progress for select
  using (auth.uid() = user_id);

create policy "Learners add their own progress"
  on public.lesson_progress for insert
  with check (auth.uid() = user_id);

create policy "Learners update their own progress"
  on public.lesson_progress for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
