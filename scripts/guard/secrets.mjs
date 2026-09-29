#!/usr/bin/env node
/**
 * Secret and credential guard.
 *
 * The hygiene guard next door catches things that *run*. This one catches
 * things that *authenticate*, because this repository has a track record with
 * them and every instance was found by a person reading a file rather than by
 * anything automatic:
 *
 *  - A GitHub personal access token lived in the `origin` remote URL, in
 *    plaintext, so it was printed by `git remote -v` and sat in `.git/config`.
 *  - `.env.local` carried `NEXT_PUBLIC_IK_PRIVATE_KEY` — an ImageKit *private*
 *    key behind the one prefix that inlines a value into the browser bundle.
 *    `.env.example` warns about exactly this in its header, which is how you
 *    know the warning alone is not enough.
 *  - A `backup-*.sql` dump and `.migrate-rejected.jsonl` (real candidate names,
 *    emails, phone numbers, cover letters) sat untracked in the working tree,
 *    one `git add -A` away from being permanent.
 *
 * A credential in git history is not fixed by deleting it in a later commit.
 * It is fixed by rotating it — so the only cheap moment is before the commit.
 *
 * Two rules:
 *
 *  1. Some files never belong in the repo at all, whatever is inside them.
 *  2. Some patterns never belong in a diff, whatever file they are in.
 *
 * Deliberately tuned to be quiet. The comment in repo-hygiene.mjs applies just
 * as much here: a guard everyone routinely skips protects nothing. So the
 * patterns are high-confidence shapes, obvious placeholders are allowed
 * through, and there is no generic entropy heuristic.
 *
 * Run: node scripts/guard/secrets.mjs [--staged]
 *   --staged  scan the lines about to be committed (pre-commit hook)
 *             otherwise scan every tracked file (CI, where nothing is staged)
 */

import { execFileSync } from 'node:child_process';
import fs from 'node:fs';

const STAGED = process.argv.includes('--staged');
const git = (...args) => execFileSync('git', args, { encoding: 'utf8', maxBuffer: 256 * 1024 * 1024 });

const problems = [];

// ---------------------------------------------------------------------------
// 1. Files that must never be committed
// ---------------------------------------------------------------------------

const FORBIDDEN_FILES = [
  [/(^|\/)\.env($|\.)(?!example)/i, 'a real environment file — only .env.example belongs in the repo'],
  [/(^|\/)backup[-_].*\.sql$/i, 'a database dump'],
  [/(^|\/)\.migrate-rejected\.jsonl$/i, 'rejected migration rows, which carry real candidate PII'],
  [/(^|\/)\.migrate-state\.json$/i, 'migration checkpoint state, which is machine state and not source'],
  [/(^|\/)(id_rsa|id_dsa|id_ecdsa|id_ed25519)$/i, 'an SSH private key'],
  [/\.(pem|p12|pfx|jks|keystore)$/i, 'a certificate or key store'],
  [/(^|\/)\.npmrc$/i, 'an npm config, which commonly carries a registry auth token'],
  [/(^|\/)\.seed-data\//i, 'a production data snapshot'],
];

// ---------------------------------------------------------------------------
// 2. Patterns that must never appear in a diff
//
// Each is a shape a real credential has and a placeholder does not.
// ---------------------------------------------------------------------------

const PATTERNS = [
  [/-----BEGIN (RSA |EC |DSA |OPENSSH |PGP )?PRIVATE KEY-----/, 'a private key block'],
  [/\bgh[pousr]_[A-Za-z0-9]{30,}/, 'a GitHub token'],
  [/\bgithub_pat_[A-Za-z0-9_]{50,}/, 'a GitHub fine-grained token'],
  [/\bAKIA[0-9A-Z]{16}\b/, 'an AWS access key id'],
  [/\bre_[A-Za-z0-9][A-Za-z0-9_-]{20,}/, 'a Resend API key'],
  [/\bprivate_[A-Za-z0-9+/=]{20,}/, 'an ImageKit private key'],
  [/\bxox[baprs]-[A-Za-z0-9-]{10,}/, 'a Slack token'],
  [/\beyJ[A-Za-z0-9_-]{8,}\.[A-Za-z0-9_-]{8,}\.[A-Za-z0-9_-]{8,}/, 'a JWT (Supabase anon/service key shape)'],
  [/\bpostgres(ql)?:\/\/[^:\s'"]+:[^@\s'"]+@/, 'a Postgres URL with an inline password'],
  [/\bmongodb(\+srv)?:\/\/[^:\s'"]+:[^@\s'"]+@/, 'a MongoDB URL with an inline password'],
  [
    /\b(?:SECRET|TOKEN|PASSWORD|PASSWD|API_?KEY|PRIVATE_?KEY|SERVICE_ROLE_KEY)\s*[=:]\s*['"][^'"\s]{16,}['"]/i,
    'a hard-coded credential assignment',
  ],
];

/**
 * The prefix rule, and the one most specific to this codebase.
 *
 * Anything named NEXT_PUBLIC_* is inlined into the browser bundle by Next and
 * is readable by every visitor. A name that says PRIVATE, SECRET, PASSWORD,
 * TOKEN or SERVICE_ROLE under that prefix is a contradiction, and this repo has
 * shipped one. Caught on the *name*, so it fires even when the value is still a
 * placeholder — the placeholder gets filled in later.
 *
 * It must match a DECLARATION (`NAME=`) or a READ (`process.env.NAME`), not a
 * prose mention. Without that this file refuses itself: the header above names
 * the variable in order to explain the incident, and a guard that cannot
 * document the thing it guards against is not one anybody keeps.
 */
const PUBLIC_SECRET_NAME = /NEXT_PUBLIC_[A-Z0-9_]*(?:PRIVATE|SECRET|PASSWORD|PASSWD|SERVICE_ROLE|_TOKEN)[A-Z0-9_]*/;

const PUBLIC_PREFIXED_SECRET = new RegExp(
  `(?:process\\.env\\.${PUBLIC_SECRET_NAME.source}\\b)` +
    `|(?:\\b${PUBLIC_SECRET_NAME.source}\\s*[=:])`
);

/**
 * Obvious placeholders. `.env.example` is full of them by design and must keep
 * passing, or the guard blocks the very file that teaches people what to set.
 */
const PLACEHOLDER =
  /(x{8,}|your[-_]?|<[a-z-]+>|placeholder|example\.com|example\.invalid|changeme|generate-a-long-random-string|dummy|sample|redacted|\*{6,})/i;

/**
 * A connection string whose credentials are the words "user" and "password".
 * .env.example ships exactly this and must keep passing.
 */
const PLACEHOLDER_URL =
  /:\/\/(user|username|admin|<[^>]+>):(password|pass|secret|<[^>]+>)@/i;

/**
 * A value made only of lowercase words and hyphens is prose, not a credential.
 *
 * Real keys carry mixed case, digits or both. Test fixtures carry things like
 * `password: 'should-never-render'` — which is what scripts/regression/email.mjs
 * uses to assert that password fields never reach a notification email. Firing
 * on a test that exists to prove secrets do not leak is precisely the kind of
 * false positive that gets a guard commented out.
 */
const isProseValue = (line) => {
  const m = line.match(/['"]([^'"\s]{8,})['"]/);
  return Boolean(m) && /^[a-z][a-z-]*$/.test(m[1]);
};

const isPlaceholder = (line) =>
  PLACEHOLDER.test(line) || PLACEHOLDER_URL.test(line) || isProseValue(line);

// ---------------------------------------------------------------------------

const stagedFiles = () =>
  git('diff', '--cached', '--name-only', '--diff-filter=ACMR').split('\n').map((f) => f.trim()).filter(Boolean);

const trackedFiles = () => git('ls-files').split('\n').map((f) => f.trim()).filter(Boolean);

const files = STAGED ? stagedFiles() : trackedFiles();

files.forEach((f) => {
  FORBIDDEN_FILES.forEach(([rx, what]) => {
    if (rx.test(f)) {
      problems.push(
        `${f} is ${what}.\n` +
          '    Add it to .gitignore and remove it from the index:\n' +
          `      git rm --cached ${f}`
      );
    }
  });
});

/**
 * Only *added* lines are scanned when staged. Content already in history is not
 * this commit's problem — flagging it would fire on every unrelated commit
 * touching the same file, which is how a guard gets disabled.
 */
const scanTargets = () => {
  if (!STAGED) {
    return files.flatMap((f) => {
      try {
        const buf = fs.readFileSync(f);
        if (buf.includes(0)) return [];
        return buf.toString('utf8').split('\n').map((line, i) => ({ file: f, line, n: i + 1 }));
      } catch {
        return [];
      }
    });
  }
  const out = [];
  let current = '?';
  git('diff', '--cached', '-U0', '--no-color')
    .split('\n')
    .forEach((raw) => {
      const header = raw.match(/^\+\+\+ b\/(.+)$/);
      if (header) {
        current = header[1];
        return;
      }
      if (raw.startsWith('+') && !raw.startsWith('+++')) out.push({ file: current, line: raw.slice(1), n: null });
    });
  return out;
};

scanTargets().forEach(({ file, line, n }) => {
  const where = n ? `${file}:${n}` : file;

  if (PUBLIC_PREFIXED_SECRET.test(line)) {
    const name = line.match(PUBLIC_SECRET_NAME)[0];
    problems.push(
      `${where} declares ${name}\n` +
        '    NEXT_PUBLIC_ is inlined into the browser bundle and is readable by\n' +
        '    every visitor. A credential must never carry that prefix — drop the\n' +
        '    prefix and read it server-side instead.'
    );
    return;
  }

  if (isPlaceholder(line)) return;

  for (const [rx, what] of PATTERNS) {
    if (rx.test(line)) {
      problems.push(
        `${where} looks like ${what}.\n` +
          '    If this is real: do not commit it, and rotate it — a credential in\n' +
          '    git history is not fixed by deleting it in a later commit.\n' +
          '    If it is a placeholder: make it obviously one (xxxx, <your-key>).'
      );
      return;
    }
  }
});

// ---------------------------------------------------------------------------

if (problems.length === 0) {
  console.log(`secrets: clean (${files.length} file${files.length === 1 ? '' : 's'} checked)`);
  process.exit(0);
}

console.error('\nsecrets: REFUSING\n');
problems.forEach((p) => console.error(`  - ${p}\n`));
console.error(
  'A credential that reaches the remote must be rotated, not deleted. This guard\n' +
    'exists because a GitHub token sat in the origin URL and an ImageKit private\n' +
    'key sat behind NEXT_PUBLIC_. See the header of scripts/guard/secrets.mjs.\n'
);
process.exit(1);
