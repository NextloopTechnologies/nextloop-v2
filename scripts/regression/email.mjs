#!/usr/bin/env node
/**
 * Email regression suite.
 *
 * Two halves, and the second one matters more than the first.
 *
 * **Rendering** (always runs, no server needed). Lead notification bodies are
 * built from attacker-controlled input — anyone on the internet can type
 * anything into a contact form — and rendered as HTML into a colleague's inbox.
 * These checks are about what happens when a "name" is `<img onerror=...>`,
 * not about whether a normal name appears.
 *
 * **Delivery** (needs a running server). The property under test is not "email
 * arrives" — it is **"a lead is never lost to a mail problem"**. Notification
 * is a courtesy to staff; the record is the product. So the suite deliberately
 * configures a mailer that cannot possibly work, submits through the real form
 * endpoint, and asserts the submission still succeeds and the row still exists.
 *
 * Run the delivery half with the server started under a *broken* mail config —
 * that is the point, not an accident:
 *
 *   RESEND_API_KEY=re_definitely_invalid \
 *   EMAIL_FROM_ADDRESS=noreply@example.invalid \
 *   LEAD_NOTIFICATION_TO=nobody@example.invalid \
 *   CONTENT_SOURCE=payload npm start
 *
 *   ADMIN_EMAIL=... ADMIN_PASSWORD=... node scripts/regression/email.mjs
 */

import { buildLeadEmailHtml, leadEmailSubject } from '../../src/lib/payload/notify.ts';

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

const call = async (url, init = {}) => {
  const res = await fetch(url, init);
  const text = await res.text();
  let json = null;
  try {
    json = JSON.parse(text);
  } catch {
    /* status is what matters */
  }
  return { status: res.status, json, text };
};

// -----------------------------------------------------------------------
// Rendering
// -----------------------------------------------------------------------
const XSS = '<img src=x onerror="alert(1)">';

const hostile = {
  id: 42,
  fullname: XSS,
  email: 'a"b\'c@example.invalid',
  subject: 'Quotes " and \' and <angles>',
  message: 'line one\nline two & three',
  password: 'should-never-render',
  hashedPassword: 'should-never-render',
  resetPasswordToken: 'should-never-render',
  salt: 'should-never-render',
  updatedAt: '2026-01-01T00:00:00.000Z',
};

const html = buildLeadEmailHtml('enquiry', hostile, 'https://example.invalid/admin/x');

check('ESCAPE-NO-RAW-TAG', !html.includes('<img src=x'));
// The payload may appear as escaped text; what must not exist is a real tag.
check('ESCAPE-NO-LIVE-TAG', !html.includes('<img'));
check('ESCAPE-ENCODES-LT', html.includes('&lt;img'));
check('ESCAPE-ENCODES-QUOTES', html.includes('&quot;') || html.includes('&#39;'));
check('ESCAPE-KEEPS-CONTENT', html.includes('line one') && html.includes('line two'));
check('ESCAPE-NEWLINE-TO-BR', html.includes('line one<br>line two'));
check('ESCAPE-AMPERSAND', html.includes('&amp;'));

// Secrets must never reach an inbox, whatever the collection grows later.
for (const field of ['password', 'hashedPassword', 'resetPasswordToken', 'salt']) {
  check(`SKIP-SENSITIVE[${field}]`, !html.includes('should-never-render'), `${field} rendered`);
}
check('SKIP-INTERNAL[updatedAt]', !html.includes('2026-01-01'));
check('SKIP-INTERNAL[id]', !/>\s*Id\s*</.test(html));

check('ADMIN-LINK-PRESENT', html.includes('https://example.invalid/admin/x'));
check('NO-ADMIN-LINK-WHEN-UNSET', !buildLeadEmailHtml('enquiry', hostile, null).includes('<a href'));

// The subject line is a header, not a body: a newline there is header injection.
const subject = leadEmailSubject('enquiry', { fullname: 'Real\r\nBcc: attacker@example.invalid' });
check('SUBJECT-NO-CRLF', !/[\r\n]/.test(subject), JSON.stringify(subject));

// -----------------------------------------------------------------------
// Delivery — the half that matters
// -----------------------------------------------------------------------
const reachable = await fetch(BASE, { method: 'HEAD' }).then(
  () => true,
  () => false
);

if (!reachable) {
  skipped('DELIVERY-*', `no server at ${BASE}`);
} else {
  const marker = `email-suite-${Date.now()}`;

  const submitted = await call(`${BASE}/api/forms/enquiry/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      fullname: marker,
      email: 'suite@example.invalid',
      subject: 'email suite',
      message: 'submitted while the mailer is deliberately broken',
    }),
  });

  // 429 means an earlier run already used the rate limit budget; not a failure
  // of the property under test, but it does mean we cannot assert it here.
  if (submitted.status === 429) {
    skipped('DELIVERY-LEAD-SURVIVES-MAIL-FAILURE', 'rate limited; wait 60s and re-run');
  } else {
    check(
      'DELIVERY-FORM-STILL-201',
      submitted.status === 201,
      `got ${submitted.status} ${submitted.text.slice(0, 120)}`
    );

    // The decisive assertion: the row exists even though the send could not.
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;

    if (!email || !password) {
      skipped('DELIVERY-LEAD-PERSISTED', 'set ADMIN_EMAIL and ADMIN_PASSWORD to verify the row');
    } else {
      const login = await call(`${API}/users/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const token = login.json?.token;
      check('DELIVERY-LOGIN', Boolean(token), `got ${login.status}`);

      if (token) {
        const found = await call(
          `${API}/enquiries/?where[fullname][equals]=${encodeURIComponent(marker)}`,
          { headers: { Authorization: `JWT ${token}` } }
        );
        check(
          'DELIVERY-LEAD-PERSISTED',
          found.json?.totalDocs === 1,
          `totalDocs=${found.json?.totalDocs}`
        );
      }
    }
  }

  // Payload answers forgot-password identically for known and unknown
  // addresses. That is deliberate anti-enumeration and must stay that way —
  // it is the *silent no-op behind it* that was the bug, not this response.
  const unknown = await call(`${API}/users/forgot-password/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'definitely-not-a-user@example.invalid' }),
  });
  check(
    'FORGOT-PASSWORD-NO-ENUMERATION',
    unknown.status === 200,
    `got ${unknown.status} — an error here would leak which addresses exist`
  );
}

console.log(`\nemail: ${pass} passed, ${fail} failed, ${skip} skipped`);
if (notes.length) console.log(notes.map((n) => `  ${n}`).join('\n'));
process.exit(fail ? 1 : 0);
