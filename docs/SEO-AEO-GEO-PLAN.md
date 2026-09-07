# SEO / AEO / GEO plan — nextlooptechnologies.com

Written against the live site audit and the production schema. Everything here
is specific to this codebase; nothing is generic advice.

**SEO** — ranking in classic search results.
**AEO** (Answer Engine Optimisation) — being the source an AI Overview, Perplexity
or ChatGPT quotes.
**GEO** (Generative Engine Optimisation) — being *cited by name* in generated
answers, not just scraped.

The three overlap but reward different things. SEO rewards pages. AEO rewards
**extractable, self-contained answers**. GEO rewards **entity clarity** — a
machine being confident that "Nextloop Technologies" is a specific company with
specific capabilities, people and evidence.

---

## Already shipped

### Commit `417a994`

| Fix | Was |
|---|---|
| `<Seo>` component + keyed defaults in `_app` | No OG or Twitter tags anywhere on the site |
| Titles on 8 routes | Blog posts, portfolio/career detail, `/domain`, `/domain/hotel`, `/get-offer`, `/get-offer/specialoffers`, 404 all shipped an empty `<title>` |
| `BlogPosting` + `BreadcrumbList` JSON-LD on posts | None |
| **`JobPosting` JSON-LD** on career detail | 64 live postings invisible to Google Jobs |
| `CreativeWork` on portfolio detail | None |
| Soft-404 fix on `blog/[slug]` and `portfolio/[id]` | HTTP 200 + raw PostgREST error; Google could index unlimited junk URLs |
| Canonical strips query strings | `/portfolio/4/?scrollToHeader=true` self-canonicalised |
| `career/[id]` meta moved inside `<Head>` | Tags rendered in the body, never reached the head; all 64 jobs shared one title |
| `/domain/` is a real hub page | Was `<div>Domain</div>`, live and indexable |
| e-commerce page title/description | Was a copy of the custom-software title, 293-char description |
| `BaseServicePages` moved out of `pages/` | Shared component served as a public route |

### Commit `__COMMIT__`

| Fix | Was |
|---|---|
| `/sitemap.xml` generated from the database, as an index over three children | A hand-maintained file with 22 URLs and `lastmod` dates frozen at whenever it was last generated |
| `/sitemap-jobs.xml` | Job URLs had no path into the index at all |
| Seven live pages added to the sitemap | `/domain/`, `/domain/ecommerce/`, `/domain/events/`, `/domain/hotel/`, `/domain/travel-and-hospitality/`, `/services/e-commerce-development/`, `/services/software-testing-qa-services/` were all omitted |
| **`/domain/ecommerce/` server-renders** | Every component was `dynamic({ ssr: false })`, so the server sent 695 characters — the nav and nothing else. Now 5,496 |
| Exactly one H1 on every page | healthcare 8, fintech 7, food-and-beverages 7, hotel 6, travel 6, events 4, oil-and-gas 2, cookies 2, privacy 2; contact-us, ecommerce and get-offer had none |
| Portfolio bodies out of the H1 | `parse(\`<h1>${descp}</h1>\`)` wrapped each entire case study in a second H1 |
| robots.txt groups repeat their own rules | Named crawlers carried only `Allow: /`; robots.txt groups do not inherit, so **Googlebot was free to crawl `/admin/`** |

---

## Part 1 — What the admin still needs

Ordered by impact per unit of work.

### 1.1 Editable SEO for static pages — **highest impact**
The 11 service pages and 9 industry pages take their titles and descriptions
from `src/utils/staticTextImgData.tsx`, a 3,400-line TypeScript file. **Marketing
cannot change a page title without a developer and a deploy.** That single fact
caps how fast SEO can iterate more than anything else on this list.

Add a `pages` collection keyed by route path, holding title, description,
`ogImage`, `noindex` and an optional JSON-LD override. The front end reads the
override and falls back to the hardcoded default, so it can ship before the
content is migrated.

### 1.2 Redirects collection
Slugs now exist on jobs and portfolio, and slugs change. Without managed 301s
every rename silently drops the ranking it had. `@payloadcms/plugin-redirects`
gives editors a from/to table. **Do this before anyone renames anything.**

### 1.3 FAQ collection — the single biggest AEO lever
`FAQPage` is the schema most often lifted verbatim into AI answers. The domain
pages already render FAQ content as plain markup, so the words exist and are
earning nothing. Make FAQs a collection, attach them to services and industries,
and emit `FAQPage` JSON-LD automatically.

### 1.4 Answer-first summary field on blogs
Add a required `summary` (40–60 words) and optional `keyTakeaways` (3–5 bullets)
to `blogs`. Answer engines extract self-contained passages that answer a question
without needing surrounding context. A post that opens with three paragraphs of
scene-setting gets skipped; one that opens with a direct answer gets quoted.

This is the highest-leverage *content* change on the list, and it needs a field
before it can become a habit.

### 1.5 Author E-E-A-T fields
`author` currently holds name, designation, description and a LinkedIn URL.
Google's helpful-content signals and every answer engine weigh author authority.
Add: `credentials`, `yearsExperience`, `expertiseAreas`, and a `sameAs` array
(LinkedIn, X, GitHub, personal site) so `Person` schema can assert identity
across the web.

Also make "Reviewed by NextLoop Team" — currently hardcoded in `blog/[slug].tsx`
— a real `reviewedBy` relationship. A named reviewer is a trust signal; a
hardcoded string is decoration.

### 1.6 Real publish and review dates
Posts sort by `created_at`, which is a database artefact, not an editorial fact.
Add `publishedAt` (backdatable, schedulable) and `lastReviewedAt`. Freshness is a
ranking factor and a citation factor — and the old schema emitted
`dateModified: today` on every page, which is a false signal answer engines
increasingly discount.

### 1.7 Per-document robots and canonical controls
`blogs` has `canonical_url`; nothing else does. Every public collection wants a
`noindex` toggle and a `canonicalOverride`. Cheap, and it stops thin pages
diluting the site.

### 1.8 Services and industries as collections
Eleven service pages and nine industry pages are hardcoded. As collections they
get consistent `Service` schema, editable meta, and — importantly — a **single
place to express relationships**, which is what builds topical authority.

### 1.9 Internal linking fields
Add `relatedServices`, `relatedIndustries`, `relatedPosts` to the content
collections. Topical clusters are how a site convinces a crawler it has depth on
a subject rather than one page about everything.

Note there are currently **orphan pages with no inbound links at all**:
`/services/e-commerce-development/`, `/services/software-testing-qa-services/`,
`/domain/ecommerce/`, `/domain/events/`, `/domain/hotel/`,
`/domain/travel-and-hospitality/`. They are indexable and unreachable.

### 1.10 Global SEO settings
Organisation details, social profiles, default OG image and verification codes
are hardcoded across `seoSchemas.ts` and `_document.tsx`. A Payload global makes
them editable and keeps `Organization` schema in one place.

### 1.11 Case-study outcome fields
Portfolio entries are prose. Add `client`, `industry`, `problem`, `solution`,
`results` (metric + value + timeframe) and `techStack`. Concrete numbers are what
generative engines cite — "reduced processing time 40%" gets quoted, "improved
efficiency" does not.

---

## Part 2 — Front-end work still outstanding

### 2.1 Dynamic sitemap — ~~do this next~~ **done** (`__COMMIT__`)
Static pages deliberately carry no `lastmod`. The old file claimed dates it could
not know, and a build-time timestamp would be worse — every page would claim to
change on every deploy. Only database-backed URLs get one, because only they have
a real edit date.

### 2.2 Heading structure — **done** (`__COMMIT__`)
Every route now has exactly one H1, asserted in the regression suite so it stays
that way. Two things were worth more than the H1 counts themselves:

- `/domain/ecommerce/` was not a heading problem. Every component was imported
  `dynamic({ ssr: false })`, so the whole page was invisible to a crawler; the
  missing H1 was just the symptom that happened to get measured.
- The suite now asserts a **floor on server-rendered text** per route. Counting
  tags could not see a page collapse to nav-only while still reporting a healthy
  title and description. This can.

### 2.3 FAQPage and Service schema on the static pages
Once 1.3 and 1.8 exist, emit them. `structuredData.ts` already has `faqSchema`
ready to use.

### 2.4 Visible breadcrumbs
The JSON-LD is shipped; the UI is not. Visible breadcrumbs help users and give
crawlers a second, corroborating signal.

### 2.5 `llms.txt` maintained, not static
`public/llm.txt` and `llm-full.txt` exist and are hand-written. They are a real
GEO surface — several answer engines read them. Generate them from content so
they cannot go stale, and include: what the company does, service definitions,
notable clients, and canonical URLs for each topic.

### 2.6 Core Web Vitals
Shared JS is 114 kB and the homepage first load is ~354 kB. Worth a Lighthouse
pass once functionality settles — `framer-motion` across 12 files and Swiper on
the homepage are the obvious candidates for dynamic import.

### 2.7 Image alt text
Enforced in Payload now (`alt` is required on `media`), but the front end must
actually render it once reading from Payload.

---

### 2.8 `/get-offer/` is thin and stays out of the sitemap
It renders 80 characters of text — a heading and four form fields. It is a real
destination and remains crawlable and linkable from campaigns, but it is not
advertised in the sitemap: thin pages listed there dilute the quality signal for
everything around them. The regression suite asserts it stays out. Give it a
paragraph explaining the offer and it can go back in.

---

## Part 3 — Content patterns that decide AEO/GEO outcomes

No amount of schema compensates for content that is not extractable.

1. **Answer the question in the first 60 words.** Then elaborate. This single
   habit determines whether a passage is quotable.
2. **Question-shaped H2s.** "How much does MVP development cost?" beats "Pricing".
   Answer engines match against question phrasing.
3. **One idea per section**, 150–300 words, self-contained enough to stand alone
   when lifted out of context. That is exactly what extraction does.
4. **Cite sources and give numbers.** Generative engines prefer content that
   looks verifiable. Specific figures with attribution get cited; adjectives do not.
5. **Comparison tables.** Heavily favoured for "X vs Y" queries, which is most of
   the commercial-intent long tail.
6. **Define your entities.** State plainly what Nextloop is, where it operates,
   what it specialises in, who leads it. GEO is largely entity disambiguation —
   the engine has to be confident which company you are.
7. **Keep `Organization` schema rich and consistent** — `sameAs`, founders,
   address, awards. This is the anchor every other citation hangs off.

---

## Suggested order

**Now** — ~~dynamic sitemap (2.1)~~, ~~heading fixes (2.2)~~, redirects collection
(1.2). 1.2 must precede any slug rename.

**Next** — editable page SEO (1.1) and FAQ collection (1.3). The first unblocks
marketing entirely; the second is the largest AEO gain available.

**Then** — answer-first summaries (1.4), author E-E-A-T (1.5), publish dates (1.6).

**Later, with the migration** — services and industries as collections (1.8),
internal linking (1.9), case-study outcomes (1.11).

One caution: several of these change collection shapes, and changing a collection
after data has been migrated is more expensive than before. Worth settling
1.1–1.7 while the panel is still empty.
