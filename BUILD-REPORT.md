# BUILD-REPORT — site_update (domain change)

businessSlug: `prestige-blinds-1791991763161`
Branch: `build/prestige-blinds-1791991763161`

## 1. npm run verify

```
#   check                                                                   result  detail
--- ----------------------------------------------------------------------  ------  ------
1   site.config.ts parses against schema                                    PASS
2   businessSlug and identity are filled in (not the template sample)       PASS    slug "prestige-blinds-1791991763161"
3   businessSlug exists in the live platform database                       PASS    platform confirmed slug "prestige-blinds-1791991763161"
4   components/ContactForm.tsx matches sealed checksum                      PASS    10499ee5c991
5   built HTML posts to the www contact endpoint, never the bare apex       PASS    endpoint on /contact, /
6   honeypot hp_7d3a_ref inside hidden wrapper, no "company" field          PASS
7   content/ contains no bare phone, address, email, or price               PASS
8   no placeholder tokens in content/ or site.config.ts                     PASS
9   every JSON-LD block parses, has @context/@type, all types on allowlist  PASS
10  Review/aggregateRating only with real, visible reviews                  PASS
11  every image has a 15+ char alt; no two images share an alt              PASS
12  exactly one <h1> per page                                               PASS
13  titles unique, 30 to 60 chars as rendered                               PASS
14  meta descriptions present, unique, 140 to 160 chars                     PASS
15  canonical present on every page and matches config.domain               PASS
16  sitemap lists every built route and nothing else                        PASS
17  every internal link resolves to a built route                           PASS
18  no blank MDX interpolation in rendered text                             PASS
19  text over the hero photo meets WCAG AA (4.5:1)                          PASS    desktop H1 and CTA (onPrimary) 6.90:1; desktop tagline (onPrimary @ 0.9) 6.31:1; desktop eyebrow (onPrimary @ 0.85) 6.02:1; mobile H1 and CTA (onPrimary) 6.44:1; mobile tagline (onPrimary @ 0.9) 5.90:1; mobile eyebrow (onPrimary @ 0.85) 5.63:1

19/19 checks passed across 43 pages.
All checks passed.
```

## 2. Files and lines changed

| File | Line | Before | After |
| --- | --- | --- | --- |
| `site.config.ts` | 1373 | `domain: 'https://www.prestigewoodblinds.com',` | `domain: 'https://www.prestigeblindsfl.com',` |

That is the only edit to the site. `BUILD-REPORT.md` (this file) is new.

Canonicals, sitemap, JSON-LD `url`/`@id`, Open Graph URLs and `llms.txt` are all derived from `config.domain`, so they picked up the new domain without further edits. After the build, `grep -r prestigewoodblinds out/` returns nothing; 89 files in `out/` reference `prestigeblindsfl.com`.

Not changed, per the instructions: `prelaunch` stays `true`, `launch.indexable` untouched, `robots.txt` still `Disallow: /`, no design or content changes.

## 3. Email addresses on prestigewoodblinds.com

None found. The only email in the repo is `prestigeblind100@gmail.com` (`site.config.ts:23`), which was not touched.

## 4. Remaining references to prestigewoodblinds.com, deliberately left

These refer to the client's **old** WordPress site, not the address of the new live site, so rewriting them would make them false:

- `BRIEF.md:3` and `BRIEF.md:26` — the brief is a workflow input and must never be edited. Note that `BRIEF.md:26` still says the domain is `https://www.prestigewoodblinds.com`; `INSTRUCTIONS.md` supersedes it for this run. The human may want to update the brief source in the dispatch payload so a future `site_build` doesn't revert this.
- `STOCK-PHOTOS.md:6` — records where the photos were pulled from (the client's current site at prestigewoodblinds.com). Historical provenance, still true.
- `CLIENT-TODO.md:10` — "Add Jacob as an owner on the prestigewoodblinds.com Google Search Console property ... through the domain cutover." This is about the old property, which still matters for monitoring the move. With the domain changing outright, a **new** Search Console property for `prestigeblindsfl.com` is also needed; I did not add that item since the instructions limited this run to the domain change — flagging it here for the human.

## 5. UNRESOLVED

- Does `prestigewoodblinds.com` redirect (301) to `prestigeblindsfl.com` at launch? The old WordPress URLs only keep their search equity if the old domain 301s path-for-path to the new one. Nothing in this repo can set that up (it's DNS/hosting on the old domain); `vercel.json` only serves the new one.
- Brief says "www is primary; the apex redirects to www" for the old domain. Assumed the same for `prestigeblindsfl.com` (instructions specify the www URL). Confirm the apex is attached in Vercel and redirects.

## 6. INVENTED

Nothing. The new domain came verbatim from `INSTRUCTIONS.md`.

## 7. Template issues

None found in this run.
