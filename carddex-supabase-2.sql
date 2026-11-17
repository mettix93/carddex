-- CardDex: cronologia delle versioni nel cloud (Supabase > SQL Editor > New query > incolla > Run)
create table if not exists public.saves_hist (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  env text not null,
  data jsonb not null,
  updated_at timestamptz not null,
  saved_at timestamptz not null default now()
);
create index if not exists saves_hist_u on public.saves_hist (user_id, env, saved_at desc);
alter table public.saves_hist enable row level security;
drop policy if exists "hist_select_own" on public.saves_hist;
create policy "hist_select_own" on public.saves_hist for select to authenticated using (auth.uid() = user_id);
create or replace function public.saves_keep_history() returns trigger language plpgsql security definer set search_path = public as $$
begin
  if not exists (select 1 from public.saves_hist h where h.user_id = old.user_id and h.env = old.env and h.saved_at > now() - interval '2 hours') then
    insert into public.saves_hist (user_id, env, data, updated_at) values (old.user_id, old.env, old.data, old.updated_at);
    delete from public.saves_hist where user_id = old.user_id and env = old.env
      and id not in (select id from public.saves_hist where user_id = old.user_id and env = old.env order by saved_at desc limit 12);
  end if;
  return new;
end $$;
drop trigger if exists saves_hist_trg on public.saves;
create trigger saves_hist_trg before update on public.saves for each row execute function public.saves_keep_history();
