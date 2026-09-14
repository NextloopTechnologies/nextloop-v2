#!/usr/bin/env node
/**
 * Repository hygiene guard.
 *
 * This exists because of a specific incident, and the incident is worth
 * recording so the rules below are not mistaken for generic paranoia.
 *
 * `config.bat` was added to `.gitignore` — not committed, *ignored*. That is a
 * meaningful difference: an ignored file is invisible to `git status`, so a
 * script sitting in a working tree never shows up as untracked and nobody is
 * ever prompted to notice it. The entry was added in May, July and August 2026,
 * and again in September, so removing it once is not a fix.
 *
 * The September addition arrived inside a commit that also converted every file
 * in the repository from LF to CRLF. That produced a diff of roughly 43,000
 * insertions and 43,000 deletions across 133 files. No human reviews that, which
 * means a one-line change to `.gitignore` rides in unseen. Whether or not that
 * was the intent, it is the effect — so this guard checks for both halves:
 * the payload and the camouflage.
 *
 * Three rules:
 *
 *  1. `.gitignore` may not hide executables or scripts. Ignoring build output is
 *     what the file is for. Ignoring something that *runs* is how you keep a
 *     program in the tree without anyone seeing it.
 *  2. No executable or script file types committed. Blanket, because this repo
 *     is a Next.js site — there is no legitimate `.bat` in it.
 *  3. No CRLF in tracked text files. `.gitattributes` normalises line endings so
 *     this should never trigger, but a guard that only fires when the settings
 *     are already correct is not a guard.
 *
 * Run: node scripts/guard/repo-hygiene.mjs [--staged]
 *   --staged  check what is about to be committed (used by the pre-commit hook)
 *             otherwise checks every tracked file (used by CI)
 */

import { execFileSync } from 'node:child_process';
import fs from 'node:fs';

const STAGED = process.argv.includes('--staged');

/** File types that execute. None of these belong in a Next.js repository. */
const EXECUTABLE = /\.(bat|cmd|com|exe|msi|scr|vbs|vbe|wsf|ps1|psm1|jar|app|dll|so|dylib)$/i;

/**
 * `.sh` is deliberately NOT in the list above. Shell scripts are a normal part
 * of a project, and blocking them would train people to bypass this hook — a
 * guard everyone routinely skips protects nothing.
 */

const git = (...args) => execFileSync('git', args, { encoding: 'utf8' });

const problems = [];

// ---------------------------------------------------------------------------
// 1. .gitignore must not conceal anything that runs
// ---------------------------------------------------------------------------
const readIgnore = () => {
  try {
    return fs.readFileSync('.gitignore', 'utf8');
  } catch {
    return '';
  }
};

readIgnore()
  .split('\n')
  .forEach((raw, i) => {
    const line = raw.replace(/\r$/, '').trim();
    if (!line || line.startsWith('#')) return;
    if (EXECUTABLE.test(line.replace(/^!?\/*/, '').replace(/\/$/, ''))) {
      problems.push(
        `.gitignore:${i + 1} hides an executable or script: "${line}"\n` +
          '    An ignored file is invisible to `git status`. If this file is\n' +
          '    needed, commit it so it can be reviewed. If it is not needed,\n' +
          '    delete it — do not hide it.'
      );
    }
  });

// ---------------------------------------------------------------------------
// 2. no executable file types in the tree
// ---------------------------------------------------------------------------
const files = STAGED
  ? git('diff', '--cached', '--name-only', '--diff-filter=ACMR').split('\n')
  : git('ls-files').split('\n');

files
  .map((f) => f.trim())
  .filter(Boolean)
  .forEach((f) => {
    if (EXECUTABLE.test(f)) problems.push(`${f} is an executable/script type and must not be committed`);
  });

// ---------------------------------------------------------------------------
// 3. no CRLF in tracked text files
// ---------------------------------------------------------------------------
const TEXT = /\.(ts|tsx|js|jsx|mjs|cjs|json|md|css|scss|html|yml|yaml|xml|txt|gitignore|gitattributes)$/i;

const crlf = [];
files
  .map((f) => f.trim())
  .filter((f) => f && TEXT.test(f))
  .forEach((f) => {
    try {
      if (fs.readFileSync(f).includes('\r\n')) crlf.push(f);
    } catch {
      /* deleted or unreadable; not this guard's problem */
    }
  });

if (crlf.length) {
  problems.push(
    `${crlf.length} file(s) contain CRLF line endings, e.g. ${crlf.slice(0, 3).join(', ')}\n` +
      '    A repo-wide line-ending flip rewrites every line of every file, which\n' +
      '    produces a diff too large to review and hides small changes inside it.\n' +
      '    Fix: git add --renormalize . (with the committed .gitattributes)'
  );
}

// ---------------------------------------------------------------------------

if (problems.length === 0) {
  console.log('repo-hygiene: clean');
  process.exit(0);
}

console.error('\nrepo-hygiene: REFUSING\n');
problems.forEach((p) => console.error(`  - ${p}\n`));
console.error(
  'This guard exists because config.bat was repeatedly added to .gitignore,\n' +
    'most recently inside a 43,000-line line-ending rewrite. See the header of\n' +
    'scripts/guard/repo-hygiene.mjs.\n'
);
process.exit(1);
