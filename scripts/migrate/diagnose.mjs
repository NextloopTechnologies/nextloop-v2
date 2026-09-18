/**
 * Throwaway diagnostic for the current migration question.
 *
 *   node --env-file=.env.local scripts/migrate/diagnose.mjs [blogId]
 *
 * Prints field-by-field shape for a source blog row against the constraints the
 * Payload collection actually declares, so a create failure stops being a
 * guessing game. Nothing sensitive — blog content, not lead data.
 */

const U = process.env.NEXT_PUBLIC_SUPABASE_URL;
const K = process.env.SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
if (!U || !K) { console.error('run with --env-file=.env.local'); process.exit(2); }
const h = { apikey: K, Authorization: 'Bearer ' + K };
const get = async (q) => (await fetch(U + '/rest/v1/' + q, { headers: h })).json();

const TARGET = process.argv[2] ?? '82';

// What Payload will reject, taken from src/collections/Blogs.ts.
const CONSTRAINTS = {
  title: { required: true },
  slug: { required: true, unique: true, max: 200 },
  status: { required: true, oneOf: ['draft', 'published'] },
  read_time: { required: true, asNumber: true, payloadField: 'readTime' },
  meta_title: { max: 60, payloadField: 'metaTitle' },
  meta_description: { max: 160, payloadField: 'metaDescription' },
  canonical_url: { payloadField: 'canonicalUrl' },
  tags: { array: true },
  meta_keywords: { array: true, payloadField: 'metaKeywords' },
  author_id: { fk: 'author' },
  category_id: { fk: 'categories' },
};

const rows = await get(`blogs?id=eq.${encodeURIComponent(TARGET)}&select=*`);
const row = rows[0];
if (!row) { console.error(`no blog with id=${TARGET}`); process.exit(1); }

const authors = await get('author?select=id');
const cats = await get('categories?select=id');
const fkSets = { author: new Set(authors.map((r) => String(r.id))), categories: new Set(cats.map((r) => String(r.id))) };

const allSlugs = (await get('blogs?select=id,slug')).map((b) => b.slug);

console.log(`blog id=${TARGET}\n`);
const problems = [];

for (const [col, rule] of Object.entries(CONSTRAINTS)) {
  const v = row[col];
  const shown =
    v === null ? 'NULL'
    : Array.isArray(v) ? `array(${v.length})`
    : typeof v === 'string' ? `${JSON.stringify(v.slice(0, 54))}${v.length > 54 ? '…' : ''}`
    : JSON.stringify(v);
  const len = typeof v === 'string' ? v.length : null;

  const flags = [];
  if (rule.required && (v === null || v === undefined || v === '')) flags.push('REQUIRED but empty');
  if (rule.max && len !== null && len > rule.max) flags.push(`${len} chars, cap is ${rule.max}`);
  if (rule.oneOf && v != null && !rule.oneOf.includes(String(v))) flags.push(`"${v}" not in ${rule.oneOf.join('|')} (migration coerces to draft)`);
  if (rule.asNumber && v != null && Number.isNaN(Number(v))) flags.push(`"${v}" is not a number`);
  if (rule.array && v != null && !Array.isArray(v)) flags.push(`expected an array, got ${typeof v}`);
  if (rule.fk && v != null && !fkSets[rule.fk].has(String(v))) flags.push(`points at ${rule.fk}.${v}, which does not exist`);
  if (rule.unique && v != null && allSlugs.filter((s) => s === v).length > 1) flags.push('duplicate among blog slugs');

  const name = rule.payloadField ? `${col} -> ${rule.payloadField}` : col;
  console.log(`  ${name.padEnd(34)} ${(len !== null ? `[${len}] ` : '').padStart(7)}${shown}`);
  for (const f of flags) { console.log(`  ${' '.repeat(34)} ^^ ${f}`); problems.push(`${col}: ${f}`); }
}

// descp is the other candidate: it is converted HTML -> Lexical and can fail.
const descp = row.descp;
console.log(`\n  descp                              ${typeof descp === 'string' ? `[${descp.length}] HTML` : String(descp)}`);
if (typeof descp === 'string') {
  const tags = [...descp.matchAll(/<\s*([a-zA-Z][a-zA-Z0-9]*)/g)].map((m) => m[1].toLowerCase());
  const uniq = [...new Set(tags)];
  console.log(`  tags used: ${uniq.join(', ') || '(none)'}`);
  const exotic = uniq.filter((t) => !['p','br','b','strong','i','em','u','a','ul','ol','li','h1','h2','h3','h4','h5','h6','blockquote','img','pre','code','span','div','table','thead','tbody','tr','td','th','hr'].includes(t));
  if (exotic.length) { console.log(`  UNUSUAL TAGS: ${exotic.join(', ')} — these are what trip the Lexical converter`); problems.push(`descp contains ${exotic.join(', ')}`); }
  const iframes = (descp.match(/<iframe/gi) || []).length;
  if (iframes) problems.push(`descp has ${iframes} iframe(s)`);
}

// image jsonb shape
console.log(`\n  image (raw)                        ${JSON.stringify(row.image)?.slice(0, 120) ?? 'null'}`);

console.log('\n' + '='.repeat(64));
if (problems.length === 0) {
  console.log('\nNothing here violates a declared constraint. The failure is likely in');
  console.log('the rich-text conversion or the cover-image fetch — re-run:');
  console.log('\n  npm run migrate:data -- --phase content\n');
  console.log('and read the FAILED block; it prints the message Payload returned.');
} else {
  console.log(`\n${problems.length} likely cause(s):\n`);
  for (const p of problems) console.log(`  - ${p}`);
}
