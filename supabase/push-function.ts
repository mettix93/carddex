// Funzione Supabase «push»: invia le notifiche. Incollala in Edge Functions > Deploy a new function > nome: push (Verify JWT: DISATTIVATO).
// Segreti da impostare (Edge Functions > Secrets): VAPID_PUBLIC, VAPID_PRIVATE, VAPID_SUBJECT (mailto:tua@email), PUSH_SECRET.
import webpush from "npm:web-push@3.6.7";
import { createClient } from "npm:@supabase/supabase-js@2";

const sb = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
webpush.setVapidDetails(Deno.env.get("VAPID_SUBJECT")!, Deno.env.get("VAPID_PUBLIC")!, Deno.env.get("VAPID_PRIVATE")!);

async function send(users: string[] | null, p: { title: string; body: string; tag?: string }) {
  let q = sb.from("push_subs").select("endpoint,p256dh,auth,user_id");
  if (users) { if (!users.length) return 0; q = q.in("user_id", users); }
  const { data } = await q;
  let n = 0;
  await Promise.all((data || []).map(async (s) => {
    try {
      await webpush.sendNotification({ endpoint: s.endpoint, keys: { p256dh: s.p256dh, auth: s.auth } }, JSON.stringify(p), { TTL: 86400 });
      n++;
    } catch (e) {
      const c = (e as { statusCode?: number }).statusCode;
      if (c === 404 || c === 410) await sb.from("push_subs").delete().eq("endpoint", s.endpoint);
    }
  }));
  return n;
}
const members = async (not?: string) => {
  const { data } = await sb.from("profiles").select("user_id").eq("status", "approved");
  return (data || []).map((x) => x.user_id as string).filter((u) => u !== not);
};
const name = async (u: string) => {
  const { data } = await sb.from("profiles").select("name").eq("user_id", u).maybeSingle();
  return (data && data.name) || "Un amico";
};

Deno.serve(async (req) => {
  if (req.headers.get("x-push-secret") !== Deno.env.get("PUSH_SECRET")) return new Response("no", { status: 401 });
  const b = await req.json().catch(() => ({}));
  let n = 0;
  try {
    if (b.type === "trade_new" || b.type === "trade_upd") {
      const { data: t } = await sb.from("trades").select("from_user,to_user,status").eq("id", b.id).maybeSingle();
      if (t) {
        if (b.type === "trade_new" && t.status === "pending") n = await send([t.to_user], { title: "Proposta di scambio", body: (await name(t.from_user)) + " ti ha proposto uno scambio", tag: "tr" + b.id });
        else if (t.status === "accepted") n = await send([t.from_user], { title: "Scambio accettato!", body: (await name(t.to_user)) + " ha accettato il tuo scambio: apri l'app e premi Concludi", tag: "tr" + b.id });
        else if (t.status === "declined") n = await send([t.from_user], { title: "Scambio rifiutato", body: (await name(t.to_user)) + " ha rifiutato la tua proposta", tag: "tr" + b.id });
      }
    } else if (b.type === "join_req") {
      const { data: a } = await sb.from("profiles").select("user_id").eq("is_admin", true).eq("status", "approved");
      n = await send((a || []).map((x) => x.user_id), { title: "Nuova richiesta", body: (await name(b.user)) + " vuole entrare nella community", tag: "jr" + b.user });
    } else if (b.type === "approved") {
      const nm = await name(b.user);
      n = await send([b.user], { title: "Sei dentro!", body: "Benvenuto nella community di PullTime", tag: "ap" + b.user });
      n += await send(await members(b.user), { title: "Nuovo membro", body: nm + " è entrato nella community", tag: "nm" + b.user });
    } else if (b.type === "midnight") {
      const h = new Date().toLocaleString("en-GB", { timeZone: "Europe/Rome", hour: "2-digit", hour12: false });
      if (h === "00" || h === "24") n = await send(await members(), { title: "Nuove bustine!", body: "Hai nuove bustine da aprire", tag: "midnight" });
    }
  } catch (e) { return new Response(String(e), { status: 500 }); }
  return new Response(JSON.stringify({ sent: n }), { headers: { "Content-Type": "application/json" } });
});
