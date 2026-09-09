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

# preview + tables. The negative half (401/400/405, forged, expired,
# cross-slug and malformed tokens) always runs; naming an unpublished
# slug adds the positive half rather than skipping it.
PREVIEW_TEST_SLUG=<an-unpublished-slug> node scripts/regression/preview.mjs

# or all three
npm run regression
```

The contract test discovers what to check from the sitemaps, which are
themselves generated from the seam — so it tests whatever that source actually
claims to serve rather than a hardcoded list that would only suit one store.

For a side-by-side, run each source with `--fingerprint` and diff the two
outputs. Ids, timestamps and image hosts legitimately differ between the stores,
so a byte comparison would fail on all of it and prove nothing; the fingerprint
normalises to the properties that must match.

## Draft preview

`getBlogBySlug` filters on `status = 'published'`, so an unpublished post 404s
on the public route. Preview lifts that filter for exactly one post, for one
person, for half an hour — and nothing else.

The chain:

1. **The Preview button** (`admin.preview` on the `blogs` collection) links to
   `/api/preview/?slug=<slug>`, not to `/blog/<slug>/`. It is hidden until the
   document has a slug, so it never offers a link to a 404.
2. **`/api/preview`** calls `payload.auth()` on the incoming request. The admin
   and the site share an origin, so the editor's session cookie is already
   there. Anonymous callers get a 401 before anything is minted.
3. **The token** carries `{ slug, exp }` signed with HMAC-SHA256 over
   `PAYLOAD_SECRET`, and is set as an httpOnly `SameSite=Lax` cookie, then the
   request is redirected to the real article URL.
4. **`/blog/[slug]`** verifies the token against the slug it is about to
   render. Only then does it pass `includeDrafts: true` into the seam.

Four decisions worth keeping:

- **No `?secret=` in the URL.** A URL token is a password that lands in browser
  history, `Referer` headers and every access log between here and the browser,
  and it never expires. The session is the credential; the cookie is derived
  from it.
- **Scoped to one slug, not a global preview mode.** A token minted for one
  draft returns 404 on every other draft. A mode flag would unlock the whole
  unpublished queue at once, which is exactly the failure worth designing out.
- **Thirty minutes.** A link pasted into Slack stops working on its own.
- **Fails closed.** With `PAYLOAD_SECRET` unset, minting returns null and
  verification returns false, so preview breaks rather than opening.

A previewed draft carries both a `noindex` meta tag and an `X-Robots-Tag`
header, is served `Cache-Control: private, no-store`, and shows a sticky banner
— a screenshot of a draft should be recognisable as one. A *published* post
reached with a preview cookie is treated as an ordinary page view: no banner, no
noindex. The banner belongs to the draft, not to the cookie.

**Under `CONTENT_SOURCE=supabase` this is only as strong as RLS.** The Supabase
reader drops the `status` filter the same way, so whether a draft is actually
readable depends on the anon policy, not on this code. Under Payload the Local
API bypasses access control by design and the filter here is the gate. Preview
is intended for the Payload source; the Supabase branch exists so the two
readers keep the same signature.

## Tables in rich text

`EXPERIMENTAL_TableFeature()` is enabled on the shared `lexicalEditor`, so it
applies to `blogs.descp` and `portfolio.descp` alike. The `EXPERIMENTAL_` prefix
is Payload's own and warns only that the stored node shape may change in a
future release — it is shipped, not a flag.

Nothing was needed on the read side: `TableHTMLConverter` is already part of the
default converter set `convertLexicalToHTML` uses, so a table authored in the
admin arrives as real `<table>` markup through `src/lib/content/payload.ts`.

The blog template scopes `display:block; overflow-x:auto` to `table` elements
inside the body, so a wide table scrolls within the article column instead of
pushing the page sideways on a phone. `scripts/regression/preview.mjs` asserts
both that the classes reach the markup and that Tailwind emitted rules for them
— a class with no rule behind it looks right in a diff and does nothing in a
browser.

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

## The REST API is a second front door

`/api/forms/[kind]` enforces a 5-per-minute rate limit, a honeypot, field
validation and (once a real secret is set) reCAPTCHA. **None of that lives in
the database layer.** Payload also exposes every collection at
`/payload-api/<collection>`, and that route does not pass through the forms
handler — so for as long as a collection allowed public `create`, the front door
was locked and the side door was not.

Measured, before the fix: six consecutive anonymous `POST /payload-api/enquiries`
requests returned 201 every time, while the sixth request to
`/api/forms/enquiry/` returned 429. `POST /payload-api/resumes` got past access
control and validation and reached the storage adapter — an unauthenticated file
upload into the project's ImageKit account.

Both are now `adminOnly`, which looks like it should break the public forms and
does not: every legitimate submission is written by `writes.ts` through
`payload.create` on the **Local API**, which runs with `overrideAccess: true` and
never consults access control. Closing REST create costs the forms nothing and
removes the only unauthenticated write path into the database. Staff keep
`create` so a lead can still be added by hand in the panel.

`scripts/regression/access.mjs` probes every collection anonymously for read,
create, update, delete and file upload, then checks the two things that would
make "locked down" indistinguishable from "broken": that `/api/forms/enquiry/`
still returns 201, and that a signed-in admin can still create and read a lead.

```bash
ADMIN_EMAIL=... ADMIN_PASSWORD=... node scripts/regression/access.mjs
```

Without credentials the staff half is reported as skipped, never as passed.

## Still open

- **RLS lockdown.** Nothing in the browser holds the anon key any more, so the
  open policies can be closed. That is a production database change, not a code
  change, and wants doing deliberately.
- **Resume uploads** still go to the external `NEXT_PUBLIC_API_ENDPOINT/upload`
  host rather than through Payload's `resumes` collection. The URL is stored in
  `legacyResumeUrl` rather than pretending it is a Payload upload. When that moves
  onto the `resumes` collection it must upload server-side, through the Local
  API — `resumes.create` is `adminOnly` now, so a browser-side upload straight
  at `/payload-api/resumes` will (correctly) 403.
- **No email adapter**, so a locked-out admin cannot recover — and
  `forgot-password` returns HTTP 200 `{"message":"Success"}` regardless, writing
  the reset link to the server console. Silent failure, not a visible one.
- **No migrations.** `db-postgres` only pushes schema outside production
  (`connect.js:110`), and there are no migration files, so a production deploy
  would start against a database with no `payload` schema.
- **`.env.local` declares `DATABASE_URI` four times and `PAYLOAD_SECRET` twice.**
  Last wins, silently. Needs resolving before any deploy reads from it.
