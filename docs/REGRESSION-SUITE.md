# nextloop-v2 — Upgrade Regression Suite

Scope: verifying that the Next 13.4.4 → 15.4.x + React 19 upgrade, and the later Payload
integration, change **nothing** observable on the public site.

**How to use.** Run the whole suite once against the pre-upgrade baseline to record actual
results, then again after each hop (A2 Next 14, A3 Next 15.4, A4 React 19, B* Payload).
A scenario passes only if it matches the *baseline*, not merely "looks fine".

Baseline captured 2026-09-02 on commit `ab1e246` (branch `new-admin-panel`):
build green in 1m13s, 40 routes, `tsc --noEmit` clean, `next lint` clean.

Legend — **P0** blocks release · **P1** fix before deploy · **P2** track, don't block.
`AUTO` = covered by `scripts/regression/smoke.mjs` · `MAN` = manual.

---

## Test-harness preconditions (read before any browser scenario)

**The browser tab must be visible.** A hidden or collapsed browser pane reports
`document.hidden === true` and `window.innerWidth === 0`, and the browser throttles it:
React hydration is *deferred*, not failed. In that state a page renders correct server HTML
while `#__next` has no `__reactFiber$` / `__reactContainer$` key, no `useEffect` ever runs,
and anything effect-driven — the blog Table of Contents, entrance animations, the delayed
popup, scroll listeners — is simply absent.

This looks exactly like a hydration regression and is not one. It cost a full investigation
on 2026-09-02: an empty blog TOC was chased through three disproved hypotheses (the Tawk
snippet, a Next dev HMR warning, a stale `.next` cache) before the real cause turned out to
be a hidden pane. Forcing a render (taking a screenshot) made React attach immediately and
the TOC render 12 items, matching production exactly.

Before trusting any browser-based result, assert:

```js
({ hidden: document.hidden, width: window.innerWidth,
   reactAttached: !!Object.keys(document.getElementById('__next') || {})
     .find(k => k.startsWith('__reactContainer$') || k.startsWith('__reactFiber$')) })
```

`hidden` must be `false`, `width` must be the intended viewport, and `reactAttached` must be
`true`. If not, force a render and re-measure — do not record a result.

Two related traps seen the same day, both false alarms:

- **Images read as broken** when measured mid-decode. `naturalWidth === 0` on a `complete`
  image means nothing until `await img.decode()` has settled. Probe the URL before believing it.
- **Description lengths differed by exactly 4 chars per `&`** because the baseline was captured
  as raw HTML and the check decoded entities first. Compare like with like.

---

## A. Build, tooling and static analysis (14)

| # | Pri | Scenario | Expected |
|---|---|---|---|
| A01 | P0 | `npm ci` on clean checkout | Completes, no peer-dep errors AUTO |
| A02 | P0 | `next build` | Exits 0 AUTO |
| A03 | P0 | Route table vs baseline | Same 40 routes, same static/SSR marker per route AUTO |
| A04 | P1 | First Load JS shared bundle | Within +10% of 93.9 kB AUTO |
| A05 | P1 | Per-route First Load JS | No route grows >15% vs baseline AUTO |
| A06 | P0 | `tsc --noEmit` | Exits 0, zero errors AUTO |
| A07 | P0 | `next lint` | Zero errors AUTO |
| A08 | P1 | Build produces no new warnings | Warning set ⊆ baseline AUTO |
| A09 | P0 | `next start` boots | Serves on :3000 AUTO |
| A10 | P0 | `next dev` boots | Compiles, no hydration errors in console MAN |
| A11 | P1 | `npm audit` high/critical count | Not worse than baseline AUTO |
| A12 | P2 | Build time | Within 2× baseline (73s) AUTO |
| A13 | P0 | No `react-quill` in dependency tree after A4 | `npm ls react-quill` empty AUTO |
| A14 | P1 | Node 20 and 22 both build | Both exit 0 AUTO |

## B. Global shell — header, nav, footer (28)

| # | Pri | Scenario | Expected |
|---|---|---|---|
| B01 | P0 | Header renders on every route | Logo + 8 nav items present AUTO |
| B02 | P0 | Logo click from any page | Navigates to `/` MAN |
| B03 | P0 | Nav: Home / About us / Portfolio / Careers / Blogs / Culture | Each navigates, 200 AUTO |
| B04 | P0 | Services dropdown opens on hover | 8 service links visible MAN |
| B05 | P0 | Industries dropdown opens on hover | 4 industry links visible MAN |
| B06 | P1 | Industries dropdown via keyboard Tab+Enter | Known-failing at baseline (hover-only) — must not regress further MAN |
| B07 | P0 | Active route highlighted orange | Matches baseline per route MAN |
| B08 | P0 | Contact Us CTA in header | Navigates to `/contact-us/` AUTO |
| B09 | P0 | Hamburger appears < 768px | Visible, desktop nav hidden MAN |
| B10 | P0 | Hamburger opens drawer | Drawer renders all nav items MAN |
| B11 | P0 | Hamburger Industries accordion | Expands on tap, 4 links MAN |
| B12 | P0 | Hamburger Services accordion | Expands on tap, 8 links MAN |
| B13 | P0 | Drawer link closes drawer on click | Drawer dismisses, route changes MAN |
| B14 | P1 | Drawer body-scroll lock | Background does not scroll MAN |
| B15 | P0 | Footer renders on every route | Present except `/contact-us/` (showFooter=false) AUTO |
| B16 | P0 | Footer service links ×8 | All 200 AUTO |
| B17 | P0 | Footer industry links ×4 | All 200 AUTO |
| B18 | P0 | Footer quick links ×7 | All 200 AUTO |
| B19 | P0 | Footer legal links ×2 | Cookie Policy + Privacy, 200 AUTO |
| B20 | P0 | `mailto:` link | `info@nextlooptechnologies.com` AUTO |
| B21 | P0 | `tel:` links ×2 | `+919893738323`, `+919924299318` AUTO |
| B22 | P1 | Google Maps address link | Opens maps, correct address AUTO |
| B23 | P0 | Social links ×3 | Facebook/Instagram/LinkedIn, correct URLs AUTO |
| B24 | P1 | Social links have accessible names | Known-failing at baseline — record, don't regress AUTO |
| B25 | P0 | Certificates strip renders | Images load, no broken refs MAN |
| B26 | P0 | Scroll-to-footer arrow (ContactUs component) | Scrolls to `#footer` MAN |
| B27 | P1 | Header on scroll | Behaviour matches baseline MAN |
| B28 | P1 | No layout shift on header mount | CLS unchanged vs baseline MAN |

## C. Home page (22)

| # | Pri | Scenario | Expected |
|---|---|---|---|
| C01 | P0 | `/` returns 200 | AUTO |
| C02 | P0 | Exactly one H1 | Text matches baseline AUTO |
| C03 | P0 | Title tag | `IT Staff Augmentation \| Custom Software Solutions \| AI Remote Teams` AUTO |
| C04 | P0 | Meta description | 172 chars, unchanged AUTO |
| C05 | P0 | Canonical | `https://www.nextlooptechnologies.com/` AUTO |
| C06 | P0 | JSON-LD present and valid | 1 script, parses, `@graph` intact AUTO |
| C07 | P0 | Hero renders | Heading + CTA visible MAN |
| C08 | P0 | Stat counters animate | Count up on scroll into view MAN |
| C09 | P0 | Client logo carousel (Swiper) | Autoplays, loops MAN |
| C10 | P1 | Second logo carousel | Renders (duplicate at baseline — preserve) MAN |
| C11 | P0 | Services grid | 8 cards, each links correctly MAN |
| C12 | P0 | Industry solutions section | 4 cards link correctly MAN |
| C13 | P0 | Portfolio teaser → `/portfolio/4/?scrollToHeader=true` | 200, scrolls to header MAN |
| C14 | P0 | Framer-motion entrance animations | Fire on scroll, no jank MAN |
| C15 | P1 | `isMobile` hydration branch | No hydration mismatch warning in console MAN |
| C16 | P0 | Popup form appears after 15s | Modal renders MAN |
| C17 | P0 | Popup dismiss sets sessionStorage | `popupDismissed=true`, no re-show MAN |
| C18 | P0 | All 52 images load | Zero `naturalWidth===0` AUTO |
| C19 | P0 | All images have alt text | Zero empty alts AUTO |
| C20 | P1 | Tawk.to widget loads | Chat bubble appears MAN |
| C21 | P2 | Tawk overwrites document.title | Known baseline defect — record MAN |
| C22 | P0 | Zero console errors beyond baseline | Baseline had 1 (a 400) AUTO |

## D. Service pages — 11 routes (26)

Applies to: `ai-ml`, `mvp-development`, `web-development`, `it-staff-augmentation`,
`mobile-app-development`, `custom-software-development`, `cloud-computing-solutions`,
`digital-marketing-services`, `e-commerce-development`, `software-testing-qa-services`, and `/services/`.

| # | Pri | Scenario | Expected |
|---|---|---|---|
| D01–D11 | P0 | Each route returns 200 | 11 scenarios AUTO |
| D12 | P0 | Each has exactly one H1 | AUTO |
| D13 | P0 | Each title matches baseline exactly | Incl. the known-wrong e-commerce title AUTO |
| D14 | P0 | Each meta description matches baseline | AUTO |
| D15 | P0 | Each canonical is self-referential, no query | AUTO |
| D16 | P0 | JSON-LD on the 6 pages that have `schemaKey` | Present + valid AUTO |
| D17 | P0 | The 4 pages without `schemaKey` emit none | No accidental Organization schema AUTO |
| D18 | P0 | `BaseServicePages` shared component renders | Hero, sections, CTA MAN |
| D19 | P0 | Latest-blogs block fetches | 3 posts or graceful empty MAN |
| D20 | P1 | Blog fetch failure path | Logs, renders empty, no crash MAN |
| D21 | P0 | Internal CTAs navigate | MAN |
| D22 | P0 | Images load on each | AUTO |
| D23 | P1 | `/services/BaseServicePages/` still 200 | **Known defect** — component leaked as route; must not silently change AUTO |
| D24 | P0 | Services index lists all 8 linked services | MAN |
| D25 | P1 | Orphan pages still reachable | e-commerce + QA return 200 AUTO |
| D26 | P0 | No hydration warnings | MAN |

## E. Domain / industry pages — 9 routes (22)

Applies to: `/domain/`, `fintech`, `healthcare`, `oil-and-gas`, `food-and-beverages`,
`ecommerce`, `events`, `hotel`, `travel-and-hospitality`.

| # | Pri | Scenario | Expected |
|---|---|---|---|
| E01–E09 | P0 | Each returns 200 | 9 scenarios AUTO |
| E10 | P0 | Title per page matches baseline | Incl. empty titles on `/domain/` and `/domain/hotel/` AUTO |
| E11 | P0 | Meta description matches baseline | Incl. missing on `/domain/` + `/domain/hotel/` AUTO |
| E12 | P0 | H1 count per page matches baseline | fintech 7, healthcare 8, F&B 7, hotel 6, travel 6, events 4, ecommerce 0 AUTO |
| E13 | P0 | Canonical self-referential | AUTO |
| E14 | P0 | HexagonGrid renders (travel) | MAN |
| E15 | P0 | BoxGridDiamond renders | MAN |
| E16 | P0 | FAQ accordion expand/collapse | MAN |
| E17 | P0 | Client review carousel | MAN |
| E18 | P0 | CustomRequestQuote CTA | MAN |
| E19 | P0 | `dangerouslySetInnerHTML` title (WhyBuild) | Renders markup, not escaped text MAN |
| E20 | P0 | Images load | AUTO |
| E21 | P1 | Framer-motion sections | Animate as baseline MAN |
| E22 | P0 | No console errors | AUTO |

## F. Blog (28)

| # | Pri | Scenario | Expected |
|---|---|---|---|
| F01 | P0 | `/blog/` returns 200, SSR | AUTO |
| F02 | P0 | 7 published posts listed | Count matches DB AUTO |
| F03 | P0 | Featured (newest) post renders in hero | Title, date, excerpt MAN |
| F04 | P1 | Featured post also appears in grid | Duplicate at baseline — preserve MAN |
| F05 | P0 | Cards filtered to those with title+descp | AUTO |
| F06 | P0 | `stripHtml` strips tags from excerpts | No raw `<p>` visible AUTO |
| F07 | P0 | Card click navigates to `/blog/<slug>/` | MAN |
| F08 | P0 | "Read More" button navigates (stopPropagation) | Single navigation, not double MAN |
| F09 | P0 | Load More appears when >9 posts | Currently hidden (7 posts) MAN |
| F10 | P1 | Load More increments by 9 | Seed >9 posts to test MAN |
| F11 | P0 | Date format `DD Month YYYY` en-GB | AUTO |
| F12 | P0 | Missing image → gradient placeholder | No broken img MAN |
| F13 | P0 | `getServerSideProps` DB error path | Renders error div, no crash MAN |
| F14 | P0 | Each of 7 post pages returns 200 | 7 scenarios AUTO |
| F15 | P0 | Post body HTML renders | `dangerouslySetInnerHTML` intact MAN |
| F16 | P0 | Table of contents builds from headings | Links jump correctly MAN |
| F17 | P0 | TOC active-section highlight on scroll | MAN |
| F18 | P0 | Author card renders | Name, designation, description MAN |
| F19 | P1 | Author LinkedIn link | `target=_blank rel=noreferrer` AUTO |
| F20 | P0 | Share to Facebook opens sharer | Correct encoded URL MAN |
| F21 | P0 | Share to LinkedIn | MAN |
| F22 | P0 | Share to X/Twitter | MAN |
| F23 | P1 | Instagram share `href="#"` | **Known dead link** — record AUTO |
| F24 | P0 | Post pages have no `<Head>` | **Known defect**: empty title, no description AUTO |
| F25 | P0 | Canonical on post page is self-referential | AUTO |
| F26 | P0 | Invalid slug `/blog/does-not-exist/` | **Known defect**: 200 + raw PG error. Record exactly AUTO |
| F27 | P1 | Slug with special chars / SQL-ish input | No 500, no error leak AUTO |
| F28 | P0 | Very long slug (>500 chars) | Handled, no 500 AUTO |

## G. Careers and application form (30)

| # | Pri | Scenario | Expected |
|---|---|---|---|
| G01 | P0 | `/career/` returns 200, SSR | AUTO |
| G02 | P0 | Job list renders from DB | Count matches visible jobs AUTO |
| G03 | P0 | Jobs with `visibility=false` hidden | AUTO |
| G04 | P0 | JSON-LD careers schema present | AUTO |
| G05 | P0 | Job card click → `/career/<id>/` | MAN |
| G06 | P0 | `/career/<valid id>/` 200 | AUTO |
| G07 | P0 | `/career/999999/` returns **404** | Correct at baseline — must stay AUTO |
| G08 | P0 | Hidden job by direct id → 404 | AUTO |
| G09 | P0 | Job detail renders responsibilities/qualifications/skills arrays | MAN |
| G10 | P0 | Perks and benefits section | MAN |
| G11 | P0 | Application form renders | All fields present MAN |
| G12 | P0 | Submit empty form | All required errors show, no submit MAN |
| G13 | P0 | Name: valid letters/spaces/hyphen/apostrophe | Accepted MAN |
| G14 | P0 | Name: digits or symbols | Rejected MAN |
| G15 | P0 | Name: leading/trailing whitespace only | Rejected MAN |
| G16 | P0 | Email: valid | Accepted MAN |
| G17 | P0 | Email: `a@b`, `a@@b.com`, spaces | Rejected MAN |
| G18 | P0 | LinkedIn: `https://linkedin.com/in/x` | Accepted MAN |
| G19 | P0 | LinkedIn: `http://` or non-linkedin host | Rejected MAN |
| G20 | P0 | Phone empty | Rejected (required) MAN |
| G21 | P1 | Phone with letters | Baseline only checks non-empty — record MAN |
| G22 | P0 | Resume upload: valid PDF | **Known defect**: blocked by CSP. Record exact behaviour MAN |
| G23 | P0 | Resume upload failure is surfaced | **Known defect**: silent. Record MAN |
| G24 | P0 | Submit with no resume attached | **Known defect**: succeeds. Record MAN |
| G25 | P1 | Resume: .exe / 100MB file | No validation at baseline — record MAN |
| G26 | P0 | Successful submit shows thank-you and resets form | MAN |
| G27 | P0 | Submit twice rapidly | No duplicate row MAN |
| G28 | P0 | DB failure path shows error message | MAN |
| G29 | P1 | Cover letter with HTML/script tags | Stored escaped, not executed MAN |
| G30 | P0 | File input cleared after submit | MAN |

## H. Portfolio (16)

| # | Pri | Scenario | Expected |
|---|---|---|---|
| H01 | P0 | `/portfolio/` 200, SSR | AUTO |
| H02 | P0 | 4 entries render | AUTO |
| H03 | P0 | JSON-LD portfolio schema | AUTO |
| H04 | P0 | Card → `/portfolio/<id>/` | MAN |
| H05 | P0 | `/portfolio/4/` 200 | AUTO |
| H06 | P0 | `?scrollToHeader=true` scrolls to header | MAN |
| H07 | P0 | Canonical includes the query string | **Known defect** — record AUTO |
| H08 | P0 | `/portfolio/999999/` | **Known defect**: 200 + PG error. Record AUTO |
| H09 | P0 | Portfolio detail has no `<Head>` | Empty title — record AUTO |
| H10 | P0 | Images render from ImageKit | `remotePatterns` allows host AUTO |
| H11 | P0 | Description HTML renders | MAN |
| H12 | P0 | Slider/carousel works | MAN |
| H13 | P1 | Non-numeric id `/portfolio/abc/` | No 500 AUTO |
| H14 | P1 | Negative id | No 500 AUTO |
| H15 | P0 | Inactive portfolio entries | Behaviour matches baseline AUTO |
| H16 | P0 | No console errors | AUTO |

## I. Contact form (22)

| # | Pri | Scenario | Expected |
|---|---|---|---|
| I01 | P0 | `/contact-us/` 200 | AUTO |
| I02 | P0 | Footer hidden (`showFooter={false}`) | AUTO |
| I03 | P0 | Page has zero H1 | **Known defect** — record AUTO |
| I04 | P0 | Title + description match baseline | AUTO |
| I05 | P0 | Submit empty | 6 field errors MAN |
| I06 | P0 | First name invalid chars | Rejected MAN |
| I07 | P0 | Last name invalid chars | Rejected MAN |
| I08 | P0 | Email invalid formats ×5 | All rejected MAN |
| I09 | P0 | Phone valid for selected country | Accepted MAN |
| I10 | P0 | Phone invalid for selected country | Rejected MAN |
| I11 | P0 | Country change re-validates phone | MAN |
| I12 | P0 | Phone left empty | Accepted (optional) MAN |
| I13 | P0 | Subject dropdown required | Rejected when unset MAN |
| I14 | P0 | Message required | Rejected when blank/whitespace MAN |
| I15 | P0 | Valid submit inserts row | Success message shows MAN |
| I16 | P0 | Success message clears after 3s | MAN |
| I17 | P0 | Form resets after success | All fields + subject cleared MAN |
| I18 | P0 | DB error path | Error on message field MAN |
| I19 | P1 | Very long message (10k chars) | Handled MAN |
| I20 | P1 | Unicode / emoji in name and message | Stored correctly MAN |
| I21 | P1 | XSS payload in message | Escaped, not executed MAN |
| I22 | P0 | Double submit | No duplicate row MAN |

## J. Popup form (16)

| # | Pri | Scenario | Expected |
|---|---|---|---|
| J01 | P0 | Appears 15s after home load | MAN |
| J02 | P0 | Does not appear if `popupDismissed` set | MAN |
| J03 | P0 | Close button dismisses + persists | MAN |
| J04 | P0 | Book Consultation opens Calendly in new tab | `noopener,noreferrer` MAN |
| J05 | P0 | Name required + format | MAN |
| J06 | P0 | Email required + format | MAN |
| J07 | P0 | Service select required | MAN |
| J08 | P0 | Phone optional, validated when present | MAN |
| J09 | P0 | Country free-text optional | MAN |
| J10 | P0 | Submit without reCAPTCHA | Blocked with message MAN |
| J11 | P0 | reCAPTCHA expiry clears token | MAN |
| J12 | P0 | Valid submit inserts to `popup_form` | MAN |
| J13 | P0 | Form + captcha reset after success | MAN |
| J14 | P1 | Enter key in a text field | **Known defect**: does not submit — record MAN |
| J15 | P1 | Modal has no focus trap / Esc | Known defect — record MAN |
| J16 | P0 | Error path shows message | MAN |

## K. Get-offer flow (16)

| # | Pri | Scenario | Expected |
|---|---|---|---|
| K01 | P0 | `/get-offer/` 200 | AUTO |
| K02 | P0 | No title/description | **Known defect** — record AUTO |
| K03 | P0 | Submit with empty fields | No validation at baseline — record MAN |
| K04 | P0 | Valid submit creates `offer_applications` row | MAN |
| K05 | P0 | Redirects to `/get-offer/specialoffers?application_detail=…` | MAN |
| K06 | P0 | PII appears in URL query | **Known defect** — record exactly AUTO |
| K07 | P0 | `/get-offer/specialoffers/` without query | Redirects to `/get-offer` MAN |
| K08 | P0 | Offers list loads from DB | 8 offers MAN |
| K09 | P0 | Offer icons matched from local data | Fallback when unmatched MAN |
| K10 | P0 | Select offer updates the row | MAN |
| K11 | P1 | Tampered `id` in query | **Known IDOR** — record MAN |
| K12 | P1 | Malformed JSON in query | Caught, error shown, no crash MAN |
| K13 | P1 | `useEffect` dep on `router` | No fetch loop MAN |
| K14 | P0 | Modal open/close | MAN |
| K15 | P0 | Error path | MAN |
| K16 | P0 | `specialoffers` is indexable with no title | Record AUTO |

## L. SEO, metadata and structured data (24)

| # | Pri | Scenario | Expected |
|---|---|---|---|
| L01 | P0 | Every route's title matches baseline byte-for-byte | AUTO |
| L02 | P0 | Every route's meta description matches baseline | AUTO |
| L03 | P0 | Every canonical matches baseline | AUTO |
| L04 | P0 | Canonical with `?utm_source=` on `/` | Clean canonical AUTO |
| L05 | P0 | Canonical on SSR route with query | Query retained — known defect AUTO |
| L06 | P0 | No OG tags anywhere | Known defect — record count 0 AUTO |
| L07 | P0 | No Twitter card tags | Record 0 AUTO |
| L08 | P0 | JSON-LD valid on all 6 schema pages | Parses AUTO |
| L09 | P1 | Schema `dateModified` is today | Known defect — record AUTO |
| L10 | P0 | `robots.txt` served, unchanged | AUTO |
| L11 | P0 | `sitemap.xml` served, 22 URLs | AUTO |
| L12 | P0 | `llm.txt` and `llm-full.txt` served | AUTO |
| L13 | P0 | `favicon.ico` served | AUTO |
| L14 | P0 | Google site-verification meta present | AUTO |
| L15 | P0 | `<html lang="en">` | AUTO |
| L16 | P1 | Viewport meta unchanged | `width=device-width` AUTO |
| L17 | P0 | `trailingSlash` behaviour preserved | `/about-us` → 308 → `/about-us/` AUTO |
| L18 | P0 | All security headers present | CSP, HSTS, XFO, XCTO, Referrer-Policy AUTO |
| L19 | P0 | CSP string identical to baseline | AUTO |
| L20 | P0 | `poweredByHeader:false` | No `x-powered-by` AUTO |
| L21 | P0 | 404 page returns real 404 status | AUTO |
| L22 | P0 | 404 page has no title | Known defect — record AUTO |
| L23 | P1 | Every internal link on every page resolves | No 404s AUTO |
| L24 | P1 | No mixed content | All subresources https AUTO |

## M. Responsive and cross-browser (18)

| # | Pri | Scenario | Expected |
|---|---|---|---|
| M01–M05 | P0 | Home at 375 / 768 / 1024 / 1440 / 1920 | No horizontal scroll, no overlap MAN |
| M06 | P0 | Service page at 375 and 1440 | MAN |
| M07 | P0 | Domain page at 375 and 1440 | MAN |
| M08 | P0 | Blog list at 375 | Cards stack MAN |
| M09 | P0 | Blog post + TOC at 375 | TOC collapses or hides MAN |
| M10 | P0 | Career detail + form at 375 | MAN |
| M11 | P0 | Contact form at 375 | Phone input usable MAN |
| M12 | P0 | Popup modal at 375 | Fits, scrolls internally MAN |
| M13 | P0 | Footer at 375 | MAN |
| M14 | P1 | Landscape orientation on phone | MAN |
| M15 | P0 | Chrome, Safari, Firefox — home + one form | MAN |
| M16 | P1 | iOS Safari phone input | MAN |
| M17 | P1 | Swiper touch-drag on mobile | MAN |
| M18 | P0 | No horizontal body scroll anywhere | AUTO |

## N. Accessibility (14)

| # | Pri | Scenario | Expected |
|---|---|---|---|
| N01 | P0 | Every image has alt | Record baseline count AUTO |
| N02 | P0 | Every form input has a label | AUTO |
| N03 | P1 | Buttons/links have accessible names | 3 known failures in footer AUTO |
| N04 | P1 | Keyboard tab order through header | MAN |
| N05 | P1 | Industries/Services dropdowns via keyboard | Known failure MAN |
| N06 | P1 | Focus visible on all interactive elements | MAN |
| N07 | P1 | Popup modal focus trap | Known failure MAN |
| N08 | P1 | Esc closes popup | Known failure MAN |
| N09 | P1 | Heading order sane per page | Record baseline MAN |
| N10 | P1 | Form errors announced to AT | `aria-describedby` / live region MAN |
| N11 | P2 | Colour contrast on orange CTAs | Record MAN |
| N12 | P1 | Skip-to-content link | Absent at baseline — record MAN |
| N13 | P1 | Reduced-motion honoured by framer-motion | MAN |
| N14 | P1 | Screen-reader pass on contact form | MAN |

## O. Performance and assets (12)

| # | Pri | Scenario | Expected |
|---|---|---|---|
| O01 | P0 | No 404 subresources on any route | AUTO |
| O02 | P1 | LCP on home | Not worse than baseline MAN |
| O03 | P1 | CLS on home | Not worse than baseline MAN |
| O04 | P1 | Lighthouse perf score | Within 5 points of baseline MAN |
| O05 | P0 | `next/image` optimisation still active | `/_next/image` requests present AUTO |
| O06 | P0 | ImageKit remote images load | AUTO |
| O07 | P1 | Lazy-loaded images below fold | Count matches baseline AUTO |
| O08 | P1 | Font loading | No FOIT regression MAN |
| O09 | P1 | Total page weight on home | Within 10% AUTO |
| O10 | P0 | No duplicate script tags | AUTO |
| O11 | P1 | Static routes still static after upgrade | Route table markers AUTO |
| O12 | P1 | SSR routes TTFB | Within 2× baseline AUTO |

## P. Error handling and edge cases (24)

| # | Pri | Scenario | Expected |
|---|---|---|---|
| P01 | P0 | Unknown route | 404 + 404 page AUTO |
| P02 | P0 | Deep unknown route | 404 AUTO |
| P03 | P0 | Route with `..` traversal | No file disclosure AUTO |
| P04 | P0 | URL-encoded traversal | No disclosure AUTO |
| P05 | P0 | Very long URL (>2000 chars) | 404 or 414, no 500 AUTO |
| P06 | P0 | Null byte in path | No 500 AUTO |
| P07 | P0 | Unicode/emoji in path | No 500 AUTO |
| P08 | P1 | XSS payload in query string | Not reflected unescaped AUTO |
| P09 | P0 | Supabase unreachable during SSR | Error div, no 500 MAN |
| P10 | P0 | Supabase returns empty set | Empty state, no crash MAN |
| P11 | P0 | Blog post with null image | Placeholder MAN |
| P12 | P0 | Blog post with null author | Author card omitted MAN |
| P13 | P0 | Blog post with null category | Renders (5 of 7 are like this) MAN |
| P14 | P0 | Job with empty arrays | No crash MAN |
| P15 | P1 | Portfolio with empty image array | No crash MAN |
| P16 | P0 | JS disabled | Content still readable, GTM noscript fires MAN |
| P17 | P1 | Slow 3G throttling | No broken layout MAN |
| P18 | P1 | Offline after load | No unhandled rejection MAN |
| P19 | P0 | `/api/hello` | Still 200 (known defect — record) AUTO |
| P20 | P1 | Rapid back/forward navigation | No stale render MAN |
| P21 | P1 | Direct deep-link to every SSR route | All 200 AUTO |
| P22 | P1 | Refresh mid-form | Expected data loss, no crash MAN |
| P23 | P1 | Two tabs submitting simultaneously | Both succeed MAN |
| P24 | P0 | Server restart during SSR request | Graceful MAN |

## Q. Third-party integrations (10)

| # | Pri | Scenario | Expected |
|---|---|---|---|
| Q01 | P0 | GA4 gtag loads, `G-1Z6KPDDQSB` config fires | AUTO |
| Q02 | P1 | GTM noscript iframe present | Known defect: uses a GA id, not GTM AUTO |
| Q03 | P0 | Apollo tracker loads | `aplo-evnt.com` requests AUTO |
| Q04 | P0 | Tawk.to loads and opens | MAN |
| Q05 | P0 | reCAPTCHA widget renders | MAN |
| Q06 | P0 | All third parties allowed by CSP | Zero CSP violations beyond baseline AUTO |
| Q07 | P0 | ImageKit CSP allowance | AUTO |
| Q08 | P1 | Supabase connect allowed by CSP | AUTO |
| Q09 | P1 | Calendly opens from popup | MAN |
| Q10 | P1 | Blocking third parties doesn't break the page | MAN |

---

## Totals

| Section | Scenarios |
|---|---|
| A Build & tooling | 14 |
| B Global shell | 28 |
| C Home | 22 |
| D Service pages | 26 |
| E Domain pages | 22 |
| F Blog | 28 |
| G Careers & application | 30 |
| H Portfolio | 16 |
| I Contact form | 22 |
| J Popup form | 16 |
| K Get-offer | 16 |
| L SEO & metadata | 24 |
| M Responsive | 18 |
| N Accessibility | 14 |
| O Performance | 12 |
| P Errors & edge cases | 24 |
| Q Third parties | 10 |
| **Total** | **342** |

Roughly 150 are automatable via HTTP + headless browser assertions; the rest are manual
or semi-manual.

## Important: known defects are baselined, not fixed

Scenarios marked **Known defect** exist to prove the upgrade did not *change* behaviour that
is already broken. They are recorded from the pre-upgrade site, and the upgrade is judged
against that record. Fixing them is separate work — tracked in the audit list, not here.
Two consequences worth stating plainly:

1. If a known defect silently *disappears* during the upgrade, that is still a diff and needs
   explaining before release.
2. None of these scenarios should be read as "the site is fine". Several baselined behaviours
   (the soft-404s, the silent resume-upload failure, the PII in URLs) are defects that want
   fixing on their own schedule.
