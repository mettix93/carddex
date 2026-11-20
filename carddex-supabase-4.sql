-- PullTime Community (Supabase > SQL Editor > New query > incolla tutto > Run). Eseguire DOPO carddex-supabase-3.sql. Si può rilanciare senza danni.
-- Idea: chi entra resta "in attesa" finché l'admin (tu) non lo approva. I membri approvati sono amici fra loro in automatico.

alter table public.profiles add column if not exists status text not null default 'pending' check (status in ('pending','approved','rejected'));
alter table public.profiles add column if not exists is_admin boolean not null default false;

create or replace function public.is_admin(a uuid) returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.profiles p where p.user_id = a and p.is_admin and p.status = 'approved')
$$;

-- un nuovo profilo parte sempre "in attesa"; solo se non esiste ancora nessun admin, il primo diventa admin
create or replace function public.profiles_init() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if exists (select 1 from public.profiles where is_admin) then new.status := 'pending'; new.is_admin := false;
  else new.status := 'approved'; new.is_admin := true; end if;
  return new;
end $$;
drop trigger if exists profiles_init_trg on public.profiles;
create trigger profiles_init_trg before insert on public.profiles for each row execute function public.profiles_init();

-- nessuno può cambiarsi da solo stato o ruolo: solo nome e data
revoke insert, update on public.profiles from authenticated;
grant insert (user_id, name, code) on public.profiles to authenticated;
grant update (name, updated_at) on public.profiles to authenticated;

drop policy if exists "pr_select" on public.profiles;
create policy "pr_select" on public.profiles for select to authenticated
  using (user_id = auth.uid() or public.has_link(auth.uid(), user_id) or public.is_admin(auth.uid()));

-- l'admin approva o rifiuta/rimuove; approvando crea l'amicizia con tutti i membri già approvati
create or replace function public.community_decide(p_user uuid, p_ok boolean) returns void
language plpgsql security definer set search_path = public as $$
begin
  if not public.is_admin(auth.uid()) then raise exception 'solo l''admin'; end if;
  if p_user = auth.uid() then raise exception 'non puoi cambiare te stesso'; end if;
  if p_ok then
    update public.profiles set status = 'approved' where user_id = p_user;
    insert into public.friendships (requester, addressee, status)
      select p_user, p.user_id, 'accepted' from public.profiles p
      where p.status = 'approved' and p.user_id <> p_user
        and not exists (select 1 from public.friendships f where (f.requester = p_user and f.addressee = p.user_id) or (f.requester = p.user_id and f.addressee = p_user));
  else
    update public.profiles set status = 'rejected' where user_id = p_user;
    delete from public.friendships where requester = p_user or addressee = p_user;
    update public.trades set status = 'cancelled', done_at = now() where status = 'pending' and (from_user = p_user or to_user = p_user);
  end if;
end $$;
revoke all on function public.community_decide(uuid, boolean) from public;
grant execute on function public.community_decide(uuid, boolean) to authenticated;

-- chi c'è già diventa membro, e tutti i membri attuali diventano amici fra loro
update public.profiles set status = 'approved' where status = 'pending';
-- l'admin sei tu: il profilo creato per primo (se vuoi un altro: update public.profiles set is_admin = true where code = 'CODICE';)
update public.profiles set is_admin = true
  where not exists (select 1 from public.profiles where is_admin)
    and user_id = (select p.user_id from public.profiles p join auth.users u on u.id = p.user_id order by u.created_at limit 1);
insert into public.friendships (requester, addressee, status)
  select a.user_id, b.user_id, 'accepted' from public.profiles a join public.profiles b on a.user_id < b.user_id
  where a.status = 'approved' and b.status = 'approved'
    and not exists (select 1 from public.friendships f where (f.requester = a.user_id and f.addressee = b.user_id) or (f.requester = b.user_id and f.addressee = a.user_id));
