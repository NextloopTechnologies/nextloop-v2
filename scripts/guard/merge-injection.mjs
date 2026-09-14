#!/usr/bin/env node
/**
 * Detects code injected directly into merge commits.
 *
 * This is the check that would have caught the actual attack on this
 * repository, and the reason it needs to exist is worth stating precisely.
 *
 * A merge commit normally contains nothing of its own — every line comes from
 * one parent or the other. Git only records content in the merge itself when a
 * human resolved a conflict. So content in a merge commit that appears in
 * NEITHER parent is, by definition, hand-written into the merge.
 *
 * That is where the payload was hidden here:
 *
 *   origin/staging  f9d76b2  "Merge pull request #215…"  INFECTED
 *     parent 2240c25                                     clean
 *     parent 8bdfd63                                     clean
 *
 *   origin/master   0546fd5  "Merge pull request #153…"  INFECTED
 *     parent 2c3733e                                     clean
 *     parent 5d1d806                                     clean
 *
 * It is chosen because it is invisible to ordinary review:
 *
 *   - `git log -S<string>` skips merge commits by default, so searching the
 *     history for the payload finds nothing.
 *   - GitHub's "Files changed" tab on a pull request diffs the branch against
 *     its base. The merge commit's own content is not shown there.
 *   - `git log -p` likewise omits merge diffs unless asked.
 *
 * `git show --cc` is the exception: the combined diff shows exactly the content
 * that differs from all parents — i.e. the conflict resolution and nothing
 * else. On an honest merge that is small and about conflicting edits. On this
 * attack it is a 37,000-character line.
 *
 * So: flag merge commits whose combined diff introduces anything that looks
 * like code rather than a plausible conflict resolution.
 *
 * Run:
 *   node scripts/guard/merge-injection.mjs              # merges on HEAD not in origin/main
 *   node scripts/guard/merge-injection.mjs <rev-range>  # explicit range
 *   node scripts/guard/merge-injection.mjs --commit <sha>
 */

import { execFileSync } from 'node:child_process';

const git = (...args) => {
  try {
    return execFileSync('git', args, { encoding: 'utf8', maxBuffer: 256 * 1024 * 1024 });
  } catch {
    return '';
  }
};

const args = process.argv.slice(2);
let commits;

if (args[0] === '--commit') {
  commits = [args[1]];
} else {
  const range = args[0] || 'origin/main..HEAD';
  commits = git('rev-list', '--merges', range).split('\n').filter(Boolean);
}

/** Content this size in a conflict resolution is not a conflict resolution. */
const MAX_RESOLUTION_LINE = 2000;
const OBFUSCATION = [
  [/_0x[0-9a-f]{4,6}/g, 'hex-named identifiers (javascript-obfuscator)'],
  [/global\s*\[\s*['"]!['"]\s*\]/g, "global['!'] marker"],
  [/(\\x[0-9a-fA-F]{2}){20,}/g, 'long hex-escape runs'],
  [/createRequire\s*\(/g, 'createRequire shim in ESM'],
  [/\beval\s*\(/g, 'eval('],
  [/child_process/g, 'child_process'],
];

/**
 * Commits already known to be compromised.
 *
 * These are in the published history. Nothing removes them from a branch that
 * descends from them short of rewriting history and having everyone re-clone —
 * a coordinated decision, not something a CI check should force. Until that
 * happens this guard would fail every build for a fact everybody already knows,
 * and a check that is always red gets ignored, which defeats the point of it.
 *
 * So they are listed here by exact SHA, with what each contains. The list is
 * deliberately not a pattern: a new injection cannot hide behind it. Only these
 * specific objects are exempt, and every branch tip has been cleaned, so nothing
 * checked out today executes them.
 *
 * When the history is rewritten these SHAs stop existing and this list can go.
 * Until then it is the audit trail.
 */
const KNOWN_COMPROMISED = new Map([
  // Every merge across main, staging and master whose combined diff carries a
  // payload — or removes one. Collected by scanning all 228+ merges, not by
  // hand, so the list is the full set rather than what happened to be noticed.
  //
  // main is the production branch and was infected three times:
  //   25 Apr -> 6 May, 12 May -> 2 Jul, 25 Aug -> 26 Aug  (~63 days total)
  //
  // WHAT AN ENTRY HERE MEANS, EXACTLY: this commit is known-bad, it is in
  // history, and the content is gone at the branch tip. It is NOT a statement
  // that the commit is harmless, and it does not suppress anything at the tip —
  // repo-hygiene.mjs checks the working tree independently and does not consult
  // this list. Entries stay until history is rewritten.
  //
  // Full 40-character SHAs, matched exactly. The 7-character prefixes this file
  // used previously were 28 bits: short enough that a crafted commit could be
  // made to collide with an allowlisted one, which would turn the allowlist
  // into a way to smuggle a payload past the guard. An allowlist is the one
  // place in this script where that matters, so it is exact-match only.
  ['0546fd5659de8aa1a545977f9f70ee9efd79e1a4', '2026-03-31 Piyush Shrivastava  — master tip, 29,956-char payload'],
  ['fe42f18beb25e903d2cf0c9f8b9b6a0035f8c9dc', '2026-04-25 Piyush Shrivastava  — ADDED payload to main (PR #155)'],
  ['070994bb71334d5db4b2f1c58c6648b7b6db5659', '2026-05-12 Piyush Shrivastava  — payload transition'],
  ['955b90ca0c5899effbd128ae55ee9474f08e517f', '2026-05-12 Pritesh Singh Bhati — ADDED payload to main (PR #166)'],
  ['9c3e56d0504c990bb35bf2120d415441d564a793', '2026-07-02 Pritesh Singh Bhati — removed payload from main (PR #174)'],
  ['a95523faa36c1220cf70aaa00afe8a4d56da7df8', '2026-08-24 Pritesh Singh Bhati — 29,956-char payload'],
  ['f905a43ceb6f29f4ad88f466094c7ece996e0beb', '2026-08-25 Piyush Shrivastava  — ADDED payload to main (PR #206)'],
  ['f9d76b225795490cb6bccbc0bf9d1b8030c69ffe', '2026-09-09 Pritesh Singh Bhati — staging tip, 37,505-char payload'],
  ['192d482ac20eb5aca961e292526052b3ec9951e2', 'pre-dates ab1e246, which removed the payload from that line'],

  // Added during the 14 Sep investigation. These two are NOT historical: they
  // are the current tips of origin/main and origin/master, created by a force
  // push that reverted both branches to an infected state after main had been
  // clean for 19 days. They are allowlisted only because sec/payload-main and
  // sec/payload-master remove the content on top of them. If either of those
  // fixes is dropped, repo-hygiene.mjs fails on the tree — this list will not
  // cover for it.
  ['d27ded0271330bcc20ee099077399c403c3d5e1e', '2026-08-26 Piyush Shrivastava  — main tip after force push, 37,505-char payload'],
  ['6fd11b84b3c38c0aae57c193a4d40c509364d5ee', '2026-09-09 Piyush Shrivastava  — master tip after force push, 37,505-char payload'],
]);

const isKnown = (sha) => {
  // Exact match only — see the note on the list above. A short-prefix match
  // here would let a crafted SHA inherit another commit's exemption.
  return KNOWN_COMPROMISED.has(sha) ? sha : null;
};

const problems = [];
const acknowledged = [];

for (const sha of commits) {
  // The combined diff: only content differing from ALL parents.
  const cc = git('show', '--cc', '--no-color', '--format=', sha);
  if (!cc.trim()) continue; // honest merge, nothing of its own

  const added = cc
    .split('\n')
    .filter((l) => /^[+ ]{1,2}[^+ -]/.test(l) || (l.startsWith('+') && !l.startsWith('+++')))
    .join('\n');

  const subject = git('log', '-1', '--format=%s%n%an%n%ad', '--date=short', sha).split('\n');
  const where = `${sha.slice(0, 9)}  ${subject[1] || '?'}  ${subject[2] || '?'}  ${(subject[0] || '').slice(0, 44)}`;

  const reasons = [];

  const longest = Math.max(...cc.split('\n').map((l) => l.length), 0);
  if (longest > MAX_RESOLUTION_LINE) reasons.push(`a ${longest}-character line`);

  for (const [rx, label] of OBFUSCATION) {
    const n = (added.match(rx) || []).length;
    if (n) reasons.push(`${label} ×${n}`);
  }

  if (reasons.length) {
    const known = isKnown(sha);
    if (known) {
      acknowledged.push(`${sha.slice(0, 9)}  ${KNOWN_COMPROMISED.get(known)}`);
      continue;
    }
    const files = git('show', '--cc', '--name-only', '--format=', sha).split('\n').filter(Boolean);
    problems.push(
      `${where}\n      introduces, in the merge itself: ${reasons.join('; ')}\n` +
        `      files: ${files.slice(0, 6).join(', ')}\n` +
        `      inspect with: git show --cc ${sha.slice(0, 9)}`
    );
  }
}

if (acknowledged.length) {
  console.log('merge-injection: known-compromised history present (documented, not a new finding):');
  acknowledged.forEach((a) => console.log(`  ! ${a}`));
  console.log('  These stay in history until it is rewritten. Branch tips are clean.\n');
}

if (problems.length === 0) {
  console.log(`merge-injection: no NEW injection (${commits.length} merge commit(s) checked)`);
  process.exit(0);
}

console.error('\nmerge-injection: REFUSING\n');
problems.forEach((p) => console.error(`  - ${p}\n`));
console.error(
  'Content in a merge commit that is in neither parent was hand-written into\n' +
    'the merge. It is invisible to `git log -S` and to GitHub\'s Files-changed\n' +
    'tab, which is why this repository carried an obfuscated payload on master\n' +
    'for 167 days. See the header of scripts/guard/merge-injection.mjs.\n'
);
process.exit(1);
