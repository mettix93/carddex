// finto Supabase in memoria (auth + saves + profili, collezioni, amicizie, proposte) con le stesse regole di carddex-supabase-3.sql
const DB={comm:false,users:{},saves:{},profiles:{},collections:{},friendships:[],trades:[],fid:0};let N=0;
const uuid=()=>"uid"+(++N);
const isFriend=(a,b)=>DB.friendships.some(f=>f.status==="accepted"&&((f.requester===a&&f.addressee===b)||(f.requester===b&&f.addressee===a)));
const hasLink=(a,b)=>DB.friendships.some(f=>(f.requester===a&&f.addressee===b)||(f.requester===b&&f.addressee===a));
function filt(rows,u,skip){for(const [k,v] of u.searchParams){if(skip.includes(k))continue;let m;
  if(m=v.match(/^eq\.(.*)$/))rows=rows.filter(r=>String(r[k])===m[1]);
  else if(m=v.match(/^in\.\((.*)\)$/)){const s=m[1].split(",");rows=rows.filter(r=>s.includes(String(r[k])))}}
  return rows}
function mock(p,opt){opt=opt||{};return p.route(/supabase\.co/,async r=>{const q=r.request(),u=new URL(q.url()),m=q.method(),b=q.postData()?JSON.parse(q.postData()):null,H=q.headers();
  const J=(o,s=200)=>r.fulfill({status:s,contentType:"application/json",headers:{"access-control-allow-origin":"*","access-control-allow-headers":"*","access-control-allow-methods":"*"},body:JSON.stringify(o)});
  if(m==="OPTIONS")return r.fulfill({status:204,headers:{"access-control-allow-origin":"*","access-control-allow-headers":"*","access-control-allow-methods":"*"}});
  if(opt.offline)return r.abort();
  const P=u.pathname;
  if(P==="/auth/v1/signup"){const id=uuid();DB.users[b.email]={id,pw:b.password,name:(b.data||{}).name};return J({access_token:"t."+id,refresh_token:"r."+id,expires_in:3600,user:{id}})}
  if(P==="/auth/v1/token"){const g=u.searchParams.get("grant_type");if(g==="password"){const x=DB.users[b.email];if(!x||x.pw!==b.password)return J({error_description:"Invalid login credentials"},400);return J({access_token:"t."+x.id,refresh_token:"r."+x.id,expires_in:3600,user:{id:x.id}})}
    if(g==="refresh_token"){const id=b.refresh_token.slice(2);return J({access_token:"t."+id,refresh_token:"r."+id,expires_in:3600,user:{id}})}}
  const au=H.authorization||"";if(!au.startsWith("Bearer t."))return J({message:"no auth"},401);const me=au.slice(9);
  const ret=(rows)=>(H.prefer||"").includes("return=representation")?J(rows):r.fulfill({status:204,headers:{"access-control-allow-origin":"*"}});
  if(P==="/rest/v1/saves_hist")return J([]);
  if(P==="/rest/v1/saves"){
    if(m==="GET"){const k=u.searchParams.get("user_id").slice(3)+"|"+u.searchParams.get("env").slice(3);const x=DB.saves[k];return J(x?[{data:x.data,updated_at:x.updated_at}]:[])}
    if(m==="POST"){if(b.user_id!==me)return J({message:"rls"},403);DB.saves[b.user_id+"|"+b.env]={data:b.data,updated_at:b.updated_at};return J([])}}
  // profili
  if(P==="/rest/v1/profiles"){
    if(m==="GET"){const ad=DB.profiles[me]&&DB.profiles[me].is_admin&&DB.profiles[me].status==="approved";rows=Object.values(DB.profiles).filter(x=>x.user_id===me||hasLink(me,x.user_id)||ad);rows=filt(rows,u,["select","order","limit"]);return J(rows)}
    if(m==="POST"){if(b.user_id!==me)return J({message:"rls"},403);if(Object.values(DB.profiles).some(x=>x.code===b.code&&x.user_id!==me))return J({message:'duplicate key value violates unique constraint "profiles_code_key"',code:"23505"},409);{const any=Object.values(DB.profiles).some(x=>x.is_admin);const nb={updated_at:new Date().toISOString(),user_id:b.user_id,name:b.name,code:b.code};if(DB.comm)Object.assign(nb,any?{status:"pending",is_admin:false}:{status:"approved",is_admin:true});else Object.assign(nb,{status:"approved",is_admin:false});DB.profiles[me]=nb}return ret([DB.profiles[me]])}
    if(m==="PATCH"){if(!DB.profiles[me])return J([]);{const nb={};if("name" in b)nb.name=b.name;nb.updated_at=b.updated_at;Object.assign(DB.profiles[me],nb)}return ret([DB.profiles[me]])}}
  if(P==="/rest/v1/collections"){
    if(m==="GET"){let rows=Object.values(DB.collections).filter(x=>x.user_id===me||isFriend(me,x.user_id));rows=filt(rows,u,["select","order","limit"]);return J(rows)}
    if(m==="POST"){if(b.user_id!==me)return J({message:"rls"},403);DB.collections[me]=b;return ret([b])}}
  if(P==="/rest/v1/rpc/community_decide"){const a=DB.profiles[me];if(!a||!a.is_admin||a.status!=="approved")return J({message:"solo l'admin"},400);const t=DB.profiles[b.p_user];if(!t)return J({message:"?"},400);
    if(b.p_ok){t.status="approved";Object.values(DB.profiles).forEach(o=>{if(o.status==="approved"&&o.user_id!==t.user_id&&!hasLink(o.user_id,t.user_id))DB.friendships.push({id:++DB.fid,requester:t.user_id,addressee:o.user_id,status:"accepted",created_at:new Date().toISOString()})})}
    else{t.status="rejected";DB.friendships=DB.friendships.filter(f=>f.requester!==t.user_id&&f.addressee!==t.user_id);DB.trades.forEach(x=>{if(x.status==="pending"&&(x.from_user===t.user_id||x.to_user===t.user_id))x.status="cancelled"})}return r.fulfill({status:204,headers:{"access-control-allow-origin":"*"}})}
  if(P==="/rest/v1/rpc/friend_request"){const code=String(b.p_code||"").trim().toUpperCase();const o=Object.values(DB.profiles).find(x=>x.code===code);if(!o)return J({message:"Codice amico non trovato"},400);if(o.user_id===me)return J({message:"È il tuo codice"},400);
    const ex=DB.friendships.find(f=>(f.requester===me&&f.addressee===o.user_id)||(f.requester===o.user_id&&f.addressee===me));
    if(ex){if(ex.status==="accepted")return J({state:"already",name:o.name});if(ex.requester===o.user_id){ex.status="accepted";return J({state:"accepted",name:o.name})}return J({state:"waiting",name:o.name})}
    DB.friendships.push({id:++DB.fid,requester:me,addressee:o.user_id,status:"pending",created_at:new Date().toISOString()});return J({state:"sent",name:o.name})}
  if(P==="/rest/v1/friendships"){
    const mine=DB.friendships.filter(f=>f.requester===me||f.addressee===me);
    if(m==="GET")return J(filt(mine,u,["select","order","limit"]));
    if(m==="PATCH"){const rows=filt(mine.filter(f=>f.addressee===me),u,[]);if(b.status!=="accepted"||Object.keys(b).length!==1)return J({message:"rls"},403);rows.forEach(f=>f.status="accepted");return ret(rows)}
    if(m==="DELETE"){const rows=filt(mine,u,[]);DB.friendships=DB.friendships.filter(f=>!rows.includes(f));return ret(rows)}}
  if(P==="/rest/v1/trades"){
    const mine=DB.trades.filter(t=>t.from_user===me||t.to_user===me);
    if(m==="GET"){let rows=filt(mine,u,["select","order","limit"]).sort((a,b)=>b.created_at<a.created_at?-1:1);return J(rows)}
    if(m==="POST"){const rows=Array.isArray(b)?b:[b];for(const x of rows){if(x.from_user!==me||!isFriend(me,x.to_user))return J({message:"new row violates row-level security policy"},403);if(!x.give.length||!x.get.length||x.give.length>12||x.get.length>12)return J({message:"check"},400);
      if(DB.trades.filter(t=>t.from_user===me&&t.status==="pending"&&Date.parse(t.expires_at)>Date.now()).length>=20)return J({message:"rls"},403)
      const t={id:"trd"+(++N),status:"pending",created_at:new Date().toISOString(),expires_at:new Date(Date.now()+(opt.ttl||86400e3)).toISOString(),done_at:null,...x};DB.trades.push(t)}return ret(DB.trades.slice(-rows.length))}
    if(m==="PATCH"){const rows=filt(mine,u,[]);const out=[];for(const t of rows){if(t.status!=="pending")continue;
      if(Object.keys(b).length!==1||!b.status)return J({message:"permission denied"},403);
      if(me===t.to_user){if(b.status==="accepted"){if(Date.parse(t.expires_at)<=Date.now())return J({message:"scambio scaduto"},400)}else if(b.status!=="declined")return J({message:"azione non valida"},400)}
      else if(me===t.from_user){if(b.status!=="cancelled")return J({message:"azione non valida"},400)}
      t.status=b.status;t.done_at=new Date().toISOString();out.push(t)}return ret(out)}}
  return J({error:"x "+P},404)})}
module.exports={DB,mock};
