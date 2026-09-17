const U=process.env.NEXT_PUBLIC_SUPABASE_URL;
const K=process.env.SERVICE_ROLE_KEY||process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
if(!U||!K){console.error('run with --env-file=.env.local');process.exit(2);}
const h={apikey:K,Authorization:'Bearer '+K};
const get=async q=>(await fetch(U+'/rest/v1/'+q,{headers:h})).json();
const cats=await get('categories?select=id,name,slug');
console.log('categories in source:', cats.length);
for(const c of cats) console.log('   id=%s name=%j slug=%j', c.id, c.name, c.slug);
const blogs=await get('blogs?select=id,title,slug,category_id,author_id,status');
console.log('\nblogs in source:', blogs.length);
const catIds=new Set(cats.map(c=>String(c.id)));
for(const b of blogs){
  const ok=b.category_id!=null&&catIds.has(String(b.category_id));
  console.log('   id=%s category_id=%s %s  slug=%j',
    String(b.id).padEnd(5), String(b.category_id).padEnd(8),
    ok?'resolves        ':'NO SUCH CATEGORY', String(b.slug||'').slice(0,60));
}
const slugs=blogs.map(b=>b.slug);
console.log('\nduplicate blog slugs:', JSON.stringify(slugs.filter((s,i)=>slugs.indexOf(s)!==i)));
console.log('null/empty blog slugs:', blogs.filter(b=>!b.slug).length);
const offers=await get('offers?select=id,title');
const t=offers.map(o=>o.title);
console.log('\nduplicate offer titles:', JSON.stringify([...new Set(t.filter((s,i)=>t.indexOf(s)!==i))]));
