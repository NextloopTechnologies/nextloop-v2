# The content seam

The front end reads through one module — `src/lib/content` — which talks to
either Supabase or Payload depending on `CONTENT_SOURCE`.

```
CONTENT_SOURCE unset | anything else   →  Supabase   (default, what production serves)
CONTENT_SOURCE=payload                 →  Payload Local API
```

**The default is Supabase on purpose.** A deploy that forgets the flag serves
exactly what it serves today. Nothing about this change alters the live site
until someone sets that variable deliberately.

## Why a flag instead of a cutover

The data has not moved. Migrating ~7,590 rows is one-way, and the agreed order
is: trust the panel, then move the data, then read from it. Those are three
separate decisions and this seam lets them happen on three separate days. Flip
the flag locally, exercise the site against Payload, flip it back — the live
site never participates in the experiment.

## What the seam does

The two stores disagree about nearly everything below the component boundary,
and every difference is absorbed in `payload.ts` rather than pushed into pages:

| | Supabase | Payload | Handled by |
|---|---|---|---|
| Body copy | HTML string | Lexical document | `richTextToHtml` |
| Images | `image[0].url` jsonb | upload relationship | `toFileUploads` |
| Casing | `created_at`, `meta_title` | `createdAt`, `metaTitle` | field adapters |
| Author / category | joined rows | relationships (`depth: 2`) | `toAuthor` / `toCategory` |

The pages and components are untouched by the switch. That is the design
constraint, not a nice-to-have: if a page renders differently under the two
sources, the adapter is wrong.

The rich-text conversion is the one worth understanding. `blog/[slug]` builds
its table of contents by assigning `descp` to `innerHTML` and walking the
headings. If the Lexical→HTML conversion ever stops happening the page does not
crash — it renders serialised JSON as body copy and the TOC silently empties.
Both look like a healthy page to a status check, which is why the contract test
asserts it directly.

## Detail routes accept a slug or a numeric id

`/career/4/` and `/portfolio/4/` are the live URLs; slugs exist in Payload but
have never been served. `refWhere()` matches either, so slug URLs can go live
without breaking a single existing link — and the redirects collection decides
when, rather than the cutover forcing that decision on the same day.

## Known divergence

`listPortfolio` filters on `active === true` under Payload and does not filter
at all under Supabase, where every row is public regardless of the column.
Payload's own access rule is `active === true`, so an anonymous REST read
already hides inactive entries; leaving the filter off would make the Local API
disagree with the REST API about what is public. Deliberate, and the only one.

## Testing it

```bash
# default source — asserts nothing changed
npm run build && npm start
node scripts/regression/smoke.mjs http://localhost:3000

# Payload source
CONTENT_SOURCE=payload npm start
node scripts/regression/content-parity.mjs http://localhost:3000
```

The contract test discovers what to check from the sitemaps, which are
themselves generated from the seam — so it tests whatever that source actually
claims to serve rather than a hardcoded list that would only suit one store.

For a side-by-side, run each source with `--fingerprint` and diff the two
outputs. Ids, timestamps and image hosts legitimately differ between the stores,
so a byte comparison would fail on all of it and prove nothing; the fingerprint
normalises to the properties that must match.

## Cutover, when the time comes

1. Migrate the data.
2. Run the contract test against Payload in staging.
3. Set `CONTENT_SOURCE=payload`.
4. Leave the Supabase reader in place until it has been quiet for a release —
   reverting should be an env var, not a deploy.
5. Only then delete `src/utils/client.ts` and the reader.

## Writes

All four forms — contact, job application, offer, popup — post to
`/api/forms/[kind]/` and are written server-side through `lib/content/writes.ts`,
following the same `CONTENT_SOURCE` flag as the reads.

They previously inserted into Supabase **from the browser** with the anon key.
Three things followed from that:

- The anon key had to be public and RLS had to be `FOR ALL TO public USING
  (true)`, so anyone holding it could read, write and delete every row in every
  table. The site could not function otherwise — the open RLS was load-bearing,
  not an oversight.
- The popup's reCAPTCHA was decorative: the token was checked for existence in
  the browser and never sent anywhere. Anything that skipped the form and posted
  straight to PostgREST was unaffected by it.
- Nothing was rate-limited or validated beyond what each form did for itself.

**The anon key is now absent from the client bundle** — verified by grepping the
built `.next/static` output for the key, the project URL and the string
`supabase`: zero matches, where every page previously carried it.

The endpoint validates each of the five known shapes and rejects everything
else, rate-limits per IP, answers a honeypot with a decoy success, and never
returns a database error to the caller.

### reCAPTCHA is not currently enforcing anything

In `.env.local`, `RECAPTCHA_SECRET_KEY` and `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`
hold the **same 11-character placeholder**. A secret equal to the published site
key is not a secret, and neither value is long enough to be a real key.

Enforcing would reject every popup submission until real keys are set; skipping
silently would be the theatre this endpoint exists to remove. So enforcement is
skipped **only** when the secret is definitionally absent — missing, or
identical to the public key — and logs an error every time it is. The moment a
real secret is set, enforcement is strict and there is no flag to turn it off.

Validation and rate limiting apply either way.

## Still open

- **RLS lockdown.** Nothing in the browser holds the anon key any more, so the
  open policies can be closed. That is a production database change, not a code
  change, and wants doing deliberately.
- **Resume uploads** still go to the external `NEXT_PUBLIC_API_ENDPOINT/upload`
  host rather than through Payload's `resumes` collection. The URL is stored in
  `legacyResumeUrl` rather than pretending it is a Payload upload.
- **No email adapter**, so a locked-out admin cannot recover.
