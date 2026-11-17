-- CardDex: tabella dei salvataggi nel cloud (incolla tutto in Supabase > SQL Editor > Run)
create table if not exists public.saves (
  user_id uuid not null references auth.users(id) on delete cascade,
  env text not null,
  data jsonb not null,
  updated_at timestamptz not null default now(),
  primary key (user_id, env)
);
alter table public.saves enable row level security;
drop policy if exists "saves_select_own" on public.saves;
drop policy if exists "saves_insert_own" on public.saves;
drop policy if exists "saves_update_own" on public.saves;
create policy "saves_select_own" on public.saves for select to authenticated using (auth.uid() = user_id);
create policy "saves_insert_own" on public.saves for insert to authenticated with check (auth.uid() = user_id);
create policy "saves_update_own" on public.saves for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
