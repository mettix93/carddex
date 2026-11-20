# Notifiche PullTime: installazione
1. SQL Editor: esegui `carddex-supabase-5.sql`.
2. Edge Functions > Deploy a new function > nome `push` > incolla `push-function.ts` > Verify JWT disattivato.
3. Edge Functions > Secrets: VAPID_PUBLIC, VAPID_PRIVATE, VAPID_SUBJECT, PUSH_SECRET (valori non nel repository).
4. SQL Editor: `insert into public.push_cfg(k,v) values ('url','https://<progetto>.supabase.co/functions/v1/push'),('secret','<PUSH_SECRET>') on conflict (k) do update set v=excluded.v;`
5. Nell'app: Account › Notifiche (solo con l'app aggiunta alla Home).
