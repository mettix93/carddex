-- PullTime notifiche (Supabase > SQL Editor > New query > incolla tutto > Run). Eseguire DOPO il 4. Si può rilanciare senza danni.
create extension if not exists pg_net with schema extensions;
create extension if not exists pg_cron with schema extensions;

-- dispositivi che hanno attivato le notifiche
create table if not exists public.push_subs (
  endpoint text primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  p256dh text not null,
  auth text not null,
  created_at timestamptz not null default now()
);
alter table public.push_subs enable row level security;
drop policy if exists "ps_all" on public.push_subs;
create policy "ps_all" on public.push_subs for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());

-- indirizzo della funzione e password segreta (si impostano a parte, vedi istruzioni): nessuno dall'app può leggerli
create table if not exists public.push_cfg (k text primary key, v text not null);
alter table public.push_cfg enable row level security;
revoke all on public.push_cfg from anon, authenticated;

create or replace function public.push_call(body jsonb) returns void
language plpgsql security definer set search_path = public, extensions as $$
declare u text; s text;
begin
  select v into u from public.push_cfg where k = 'url';
  select v into s from public.push_cfg where k = 'secret';
  if u is null or s is null then return; end if;
  perform net.http_post(url := u, headers := jsonb_build_object('Content-Type', 'application/json', 'x-push-secret', s), body := body);
exception when others then null;
end $$;
revoke all on function public.push_call(jsonb) from public, anon, authenticated;

create or replace function public.push_trade_trg() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if tg_op = 'INSERT' then perform public.push_call(jsonb_build_object('type', 'trade_new', 'id', new.id));
  elsif new.status <> old.status then perform public.push_call(jsonb_build_object('type', 'trade_upd', 'id', new.id)); end if;
  return null;
end $$;
drop trigger if exists push_trade_ins on public.trades;
create trigger push_trade_ins after insert on public.trades for each row execute function public.push_trade_trg();
drop trigger if exists push_trade_upd on public.trades;
create trigger push_trade_upd after update of status on public.trades for each row execute function public.push_trade_trg();

create or replace function public.push_profile_trg() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if tg_op = 'INSERT' and new.status = 'pending' then perform public.push_call(jsonb_build_object('type', 'join_req', 'user', new.user_id));
  elsif tg_op = 'UPDATE' and new.status = 'approved' and old.status <> 'approved' then perform public.push_call(jsonb_build_object('type', 'approved', 'user', new.user_id)); end if;
  return null;
end $$;
drop trigger if exists push_prof_ins on public.profiles;
create trigger push_prof_ins after insert on public.profiles for each row execute function public.push_profile_trg();
drop trigger if exists push_prof_upd on public.profiles;
create trigger push_prof_upd after update of status on public.profiles for each row execute function public.push_profile_trg();

-- ogni ora in punto: la funzione invia «nuove bustine» solo a mezzanotte, ora italiana
do $$ begin perform cron.unschedule('pulltime-midnight'); exception when others then null; end $$;
select cron.schedule('pulltime-midnight', '0 * * * *', $$select public.push_call('{"type":"midnight"}'::jsonb)$$);
