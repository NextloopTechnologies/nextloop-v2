#!/usr/bin/env node
/**
 * Collection access-control regression suite.
 *
 * Payload's REST API is a second front door onto every collection, and it does
 * not pass through `/api/forms/[kind]` — so none of the rate limiting, honeypot
 * or captcha in that handler applies to it. This suite exercises the REST API
 * the way an attacker would: anonymously, on every collection, for every verb.
 *
 * The rule the suite encodes:
 *
 *   - Public content collections are readable by anyone, and writable by nobody
 *     without a session.
 *   - Lead, application and asset collections are neither readable nor writable
 *     without a session — including create. Public forms reach them through the
 *     Local API in `src/lib/content/writes.ts`, which bypasses access control,
 *     so closing REST create costs the forms nothing.
 *   - Drafts never appear in an anonymous read, on the REST API or the site.
 *
 * The last two sections check the other side of the same coin: that closing the
 * door did not close it on the people who need it. The forms must still submit,
 * and a signed-in admin must still be able to add a lead by hand.
 *
 * Usage:
 *   BASE_URL=http://127.0.0.1:3000 node scripts/regression/access.mjs
 *   ADMIN_EMAIL=... ADMIN_PASSWORD=... node scripts/regression/access.mjs
 */

const BASE = (process.env.BASE_URL || 'http://127.0.0.1:3000').replace(/\/$/, '');
const API = `${BASE}/payload-api`;

let pass = 0;
let fail = 0;
let skip = 0;
const notes = [];

const check = (name, condition, detail = '') => {
  if (condition) {
    pass += 1;
    return;
  }
  fail += 1;
  notes.push(`FAIL ${name}${detail ? ` — ${detail}` : ''}`);
};

const skipped = (name, why) => {
  skip += 1;
  notes.push(`SKIP ${name} — ${why}`);
};

/** Collections the marketing site renders. Anonymous read is the point. */
const PUBLIC_READ = [
  'blogs',
  'authors',
  'categories',
  'portfolio',
  'testimonials',
  'jobs',
  'offers',
  'media',
];

/**
 * Nothing here is public. The lead tables hold PII from the contact, careers,
 * offer and popup forms; `resumes` holds candidate CVs; `users` holds staff
 * accounts. A 200 on any of these is a data breach, not a failing test.
 */
const PRIVATE = [
  'users',
  'enquiries',
  'applied-jobs',
  'popup-submissions',
  'ideas',
  'offer-applications',
  'resumes',
];

/** Minimal valid-looking bodies, so a 403 is an access refusal and not a 400. */
const CREATE_BODY = {
  users: { email: 'probe@example.invalid', password: 'Probe12345!' },
  enquiries: { fullname: 'probe', email: 'p@example.invalid', subject: 's', message: 'm' },
  'applied-jobs': { fullname: 'probe', email: 'p@example.invalid', phone: '1' },
  'popup-submissions': { name: 'probe', email: 'p@example.invalid', service: 's' },
  ideas: { mail: 'p@example.invalid', ideaDescp: 'i' },
  'offer-applications': { name: 'probe', email: 'p@example.invalid', mobile: '1' },
  blogs: { title: 'probe', slug: 'probe-access-suite' },
  testimonials: { name: 'probe' },
  authors: { name: 'probe' },
  categories: { name: 'probe' },
  jobs: { title: 'probe' },
  offers: { title: 'probe' },
  portfolio: { title: 'probe' },
};

const call = async (route, init = {}) => {
  const res = await fetch(route, { redirect: 'follow', ...init });
  const text = await res.text();
  let json = null;
  try {
    json = JSON.parse(text);
  } catch {
    /* not json; status is what matters */
  }
  return { status: res.status, json, text };
};

const post = (collection, body, token) =>
  call(`${API}/${collection}/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `JWT ${token}` } : {}),
    },
    body: JSON.stringify(body),
  });

const run = async () => {
  // -------------------------------------------------------------------
  // Anonymous reads
  // -------------------------------------------------------------------
  for (const c of PUBLIC_READ) {
    const r = await call(`${API}/${c}/?limit=1`);
    check(`READ-PUBLIC[${c}]`, r.status === 200, `got ${r.status}`);
  }

  for (const c of PRIVATE) {
    const r = await call(`${API}/${c}/?limit=1`);
    check(`READ-PRIVATE-403[${c}]`, r.status === 403, `got ${r.status}`);
    check(`READ-PRIVATE-NO-DOCS[${c}]`, !r.json?.docs?.length);
  }

  // -------------------------------------------------------------------
  // Anonymous writes. Every one of these must be refused — this is the
  // side door that bypassed the rate limit, honeypot and captcha.
  // -------------------------------------------------------------------
  for (const [collection, body] of Object.entries(CREATE_BODY)) {
    const r = await post(collection, body);
    check(`CREATE-403[${collection}]`, r.status === 403, `got ${r.status}`);
  }

  // A file upload is a create too, and this one wrote into the project's
  // object storage.
  const pdf = Buffer.from('%PDF-1.4\n1 0 obj<</Type/Catalog>>endobj\n%%EOF\n');
  const form = new FormData();
  form.append('file', new Blob([pdf], { type: 'application/pdf' }), 'probe.pdf');
  const upload = await call(`${API}/resumes/`, { method: 'POST', body: form });
  check('UPLOAD-403[resumes]', upload.status === 403, `got ${upload.status}`);

  // Update and delete on a public collection: readable is not writable.
  const anyBlog = await call(`${API}/blogs/?limit=1`);
  const blogId = anyBlog.json?.docs?.[0]?.id;
  if (blogId === undefined) {
    skipped('MUTATE-403[blogs]', 'no blog to attempt a mutation against');
  } else {
    const patched = await call(`${API}/blogs/${blogId}/`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'probe' }),
    });
    check('UPDATE-403[blogs]', patched.status === 403, `got ${patched.status}`);
    const deleted = await call(`${API}/blogs/${blogId}/`, { method: 'DELETE' });
    check('DELETE-403[blogs]', deleted.status === 403, `got ${deleted.status}`);
  }

  // -------------------------------------------------------------------
  // Drafts stay invisible on the REST API, not only in the content seam.
  // -------------------------------------------------------------------
  const publicBlogs = await call(`${API}/blogs/?limit=100`);
  const statuses = (publicBlogs.json?.docs || []).map((d) => d.status);
  check('NO-DRAFTS-IN-REST', statuses.every((s) => s === 'published'), statuses.join(','));

  // -------------------------------------------------------------------
  // The forms still work. Closing REST create must cost the public path
  // nothing, because it writes through the Local API.
  // -------------------------------------------------------------------
  const submission = await call(`${BASE}/api/forms/enquiry/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      fullname: 'access suite',
      email: 'suite@example.invalid',
      subject: 'access suite',
      message: 'submitted by scripts/regression/access.mjs',
    }),
  });
  check(
    'FORM-STILL-WORKS',
    submission.status === 201 || submission.status === 429,
    `got ${submission.status} ${submission.text.slice(0, 80)}`
  );
  if (submission.status === 429) {
    notes.push('NOTE FORM-STILL-WORKS saw 429 — rate limited from an earlier run, not a failure');
  }

  // -------------------------------------------------------------------
  // Staff can still create by hand. Without this, "locked down" would be
  // indistinguishable from "broken".
  // -------------------------------------------------------------------
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    skipped('AUTHED-CREATE', 'set ADMIN_EMAIL and ADMIN_PASSWORD to exercise the staff path');
  } else {
    const login = await call(`${API}/users/login/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const token = login.json?.token;
    check('AUTHED-LOGIN', Boolean(token), `got ${login.status}`);

    if (token) {
      const created = await post(
        'enquiries',
        {
          fullname: 'access suite (staff)',
          email: 'staff@example.invalid',
          subject: 'access suite',
          message: 'created with a session by scripts/regression/access.mjs',
        },
        token
      );
      check('AUTHED-CREATE[enquiries]', created.status === 201, `got ${created.status}`);

      const read = await call(`${API}/enquiries/?limit=1`, {
        headers: { Authorization: `JWT ${token}` },
      });
      check('AUTHED-READ[enquiries]', read.status === 200, `got ${read.status}`);
    }
  }

  console.log(`\naccess: ${pass} passed, ${fail} failed, ${skip} skipped`);
  if (notes.length) console.log(notes.map((n) => `  ${n}`).join('\n'));
  process.exit(fail ? 1 : 0);
};

run().catch((error) => {
  console.error('access suite could not run:', error.message);
  process.exit(1);
});
