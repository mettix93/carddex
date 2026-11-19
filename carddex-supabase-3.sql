-- CardDex: amici e scambi (Supabase > SQL Editor > New query > incolla tutto > Run). Si può rilanciare senza danni.

-- 1) Profilo pubblico: nome e codice amico (6 caratteri, diverso dal codice di accesso, che resta segreto)
create table if not exists public.profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  name text not null default '',
  code text not null unique,
  updated_at timestamptz not null default now()
);
-- 2) Collezione delle carte delle bustine: { "idCarta": quantità }
create table if not exists public.collections (
  user_id uuid primary key references auth.users(id) on delete cascade,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);
-- 3) Amicizie (richiesta -> accettata)
create table if not exists public.friendships (
  id bigint generated always as identity primary key,
  requester uuid not null references auth.users(id) on delete cascade,
  addressee uuid not null references auth.users(id) on delete cascade,
  status text not null default 'pending' check (status in ('pending','accepted')),
  created_at timestamptz not null default now(),
  check (requester <> addressee)
);
create unique index if not exists friendships_pair on public.friendships (least(requester, addressee), greatest(requester, addressee));
-- 4) Proposte di scambio (scadono dopo 24 ore)
create table if not exists public.trades (
  id uuid primary key default gen_random_uuid(),
  from_user uuid not null references auth.users(id) on delete cascade,
  to_user uuid not null references auth.users(id) on delete cascade,
  give text[] not null,
  get text[] not null,
  status text not null default 'pending' check (status in ('pending','accepted','declined','cancelled')),
  created_at timestamptz not null default now(),
  expires_at timestamptz not null default now() + interval '24 hours',
  done_at timestamptz,
  check (from_user <> to_user),
  check (cardinality(give) between 1 and 12 and cardinality(get) between 1 and 12)
);
create index if not exists trades_from on public.trades (from_user, created_at desc);
create index if not exists trades_to on public.trades (to_user, created_at desc);

-- funzioni di appoggio (non danno accesso a nulla da sole)
create or replace function public.is_friend(a uuid, b uuid) returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.friendships f where f.status = 'accepted'
    and ((f.requester = a and f.addressee = b) or (f.requester = b and f.addressee = a)))
$$;
create or replace function public.has_link(a uuid, b uuid) returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.friendships f
    where (f.requester = a and f.addressee = b) or (f.requester = b and f.addressee = a))
$$;

alter table public.profiles enable row level security;
alter table public.collections enable row level security;
alter table public.friendships enable row level security;
alter table public.trades enable row level security;

drop policy if exists "pr_select" on public.profiles;
drop policy if exists "pr_insert" on public.profiles;
drop policy if exists "pr_update" on public.profiles;
create policy "pr_select" on public.profiles for select to authenticated using (user_id = auth.uid() or public.has_link(auth.uid(), user_id));
create policy "pr_insert" on public.profiles for insert to authenticated with check (user_id = auth.uid());
create policy "pr_update" on public.profiles for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());

drop policy if exists "co_select" on public.collections;
drop policy if exists "co_insert" on public.collections;
drop policy if exists "co_update" on public.collections;
create policy "co_select" on public.collections for select to authenticated using (user_id = auth.uid() or public.is_friend(auth.uid(), user_id));
create policy "co_insert" on public.collections for insert to authenticated with check (user_id = auth.uid());
create policy "co_update" on public.collections for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());

-- amicizie: si creano solo con la funzione friend_request (sotto); l'altro accetta o rifiuta; chiunque dei due può togliere
drop policy if exists "fr_select" on public.friendships;
drop policy if exists "fr_update" on public.friendships;
drop policy if exists "fr_delete" on public.friendships;
create policy "fr_select" on public.friendships for select to authenticated using (auth.uid() in (requester, addressee));
create policy "fr_update" on public.friendships for update to authenticated using (addressee = auth.uid()) with check (addressee = auth.uid() and status = 'accepted');
create policy "fr_delete" on public.friendships for delete to authenticated using (auth.uid() in (requester, addressee));
revoke update on public.friendships from authenticated;
grant update (status) on public.friendships to authenticated;

create or replace function public.friend_request(p_code text) returns json
language plpgsql security definer set search_path = public as $$
declare me uuid := auth.uid(); other uuid; oname text; ex public.friendships;
begin
  if me is null then raise exception 'non autenticato'; end if;
  select user_id, name into other, oname from public.profiles where code = upper(trim(p_code));
  if other is null then raise exception 'Codice amico non trovato'; end if;
  if other = me then raise exception 'È il tuo codice'; end if;
  select * into ex from public.friendships f
    where (f.requester = me and f.addressee = other) or (f.requester = other and f.addressee = me);
  if found then
    if ex.status = 'accepted' then return json_build_object('state', 'already', 'name', oname); end if;
    if ex.requester = other then
      update public.friendships set status = 'accepted' where id = ex.id;
      return json_build_object('state', 'accepted', 'name', oname);
    end if;
    return json_build_object('state', 'waiting', 'name', oname);
  end if;
  insert into public.friendships (requester, addressee) values (me, other);
  return json_build_object('state', 'sent', 'name', oname);
end $$;
revoke all on function public.friend_request(text) from public;
grant execute on function public.friend_request(text) to authenticated;

-- proposte: le vede solo chi le manda e chi le riceve; si mandano solo ad amici (max 20 in attesa)
drop policy if exists "tr_select" on public.trades;
drop policy if exists "tr_insert" on public.trades;
drop policy if exists "tr_update" on public.trades;
create policy "tr_select" on public.trades for select to authenticated using (auth.uid() in (from_user, to_user));
create policy "tr_insert" on public.trades for insert to authenticated with check (
  from_user = auth.uid() and status = 'pending' and public.is_friend(from_user, to_user)
  and (select count(*) from public.trades t where t.from_user = auth.uid() and t.status = 'pending' and t.expires_at > now()) < 20);
create policy "tr_update" on public.trades for update to authenticated using (auth.uid() in (from_user, to_user)) with check (auth.uid() in (from_user, to_user));
revoke update on public.trades from authenticated;
grant update (status) on public.trades to authenticated;

-- regole di cambio stato: il destinatario accetta (solo se non scaduta) o rifiuta; chi l'ha mandata la annulla; tutto solo se ancora in attesa
create or replace function public.trades_guard() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if old.status <> 'pending' then raise exception 'scambio già chiuso'; end if;
  if auth.uid() = old.to_user then
    if new.status = 'accepted' then
      if old.expires_at <= now() then raise exception 'scambio scaduto'; end if;
    elsif new.status <> 'declined' then raise exception 'azione non valida'; end if;
  elsif auth.uid() = old.from_user then
    if new.status <> 'cancelled' then raise exception 'azione non valida'; end if;
  else raise exception 'non autorizzato'; end if;
  new.done_at := now();
  return new;
end $$;
drop trigger if exists trades_guard_trg on public.trades;
create trigger trades_guard_trg before update on public.trades for each row execute function public.trades_guard();
