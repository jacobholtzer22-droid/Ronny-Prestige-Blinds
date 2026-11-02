# BUILD-REPORT — site_update (Google Ads tracking install): NOT APPLIED, BLOCKED BY TEMPLATE

businessSlug: `prestige-blinds-1791991763161`
Kind: `site_update`. `INSTRUCTIONS.md` said to add this `tracking` block to `site.config.ts`, change nothing else, and get check 22 to pass:

```ts
tracking: {
  googleAdsId: 'AW-18523532236',
  conversions: { form: 'AW-18523532236/JqfSCKf5jawdEMzX2oBF' },
},
```

**Outcome: the tracking block is not installed. This branch makes no change to the site.** This repo's copy of the template doesn't support tracking yet, and every way to add support means editing a file that CI is forbidden to touch.

## 1. `npm run verify` output

### Attempt 1: with the tracking block added exactly as given (FAILED, before any check ran)

```
Failed to compile.

./site.config.ts:1375:3
Type error: Object literal may only specify known properties, and 'tracking' does not exist in type '{ businessSlug: string; legalName: string; displayName: string; tagline: string; schemaType: "HomeAndConstructionBusiness" | "Plumber" | "Electrician" | "HVACBusiness" | "RoofingContractor" | ... 6 more ... | "HousePainter"; ... 24 more ...; testimonials?: { ...; }[] | undefined; }'.

  1373 |   domain: 'https://www.prestigeblindsfl.com',
  1374 |
> 1375 |   tracking: {
       |   ^
  1376 |     googleAdsId: 'AW-18523532236',
  1377 |     conversions: { form: 'AW-18523532236/JqfSCKf5jawdEMzX2oBF' },
  1378 |   },
Next.js build worker exited with code: 1 and signal: null
```

### Final: block reverted, site unchanged (this is the state committed on this branch)

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

**There is no check 22.** This repo's `scripts/verify.ts` has checks 1 to 19 only. The instruction "check 22 must pass" can't be met because that check doesn't exist here.

## 2. `site.config.ts`

Unchanged from `main`. No diff.

## 3. Alt-text spot checks

Not applicable. Images weren't touched.

## 4. Design direction

Not applicable. Design wasn't touched.

## 5. Templated-looking things

Not applicable. No design or content work was requested.

## 6. UNRESOLVED

- **Google Ads tracking (`AW-18523532236`, form conversion `AW-18523532236/JqfSCKf5jawdEMzX2oBF`) is not installed.** No gtag script loads, and contact form submissions don't fire a conversion. Why:
  1. `lib/config-schema.ts` defines the config schema as `.strict()` and has no `tracking` key. Adding the block fails TypeScript (`satisfies SiteConfigInput`), which breaks `next build`, and it would also fail check 1 (schema parse). AGENT.md forbids editing `lib/config-schema.ts` in CI.
  2. Nothing in the template reads a `tracking` config. No gtag loader in `app/layout.tsx`, and no conversion call in `components/ContactForm.tsx` (the form is checksum-sealed and forbidden).
  3. `scripts/verify.ts` has no check 22, and editing it is forbidden.
  4. The instruction cites "AGENT.md, CI mode, Tracking installs". This repo's `AGENT.md` has no "Tracking installs" section.
- Everything listed as unresolved in earlier reports still stands. This run didn't change it.

## 7. INVENTED

Nothing. I wasn't tempted to fill in anything; the only values involved came verbatim from `INSTRUCTIONS.md`.

## 8. Problems with the template itself

- **This client repo is behind AA-Template.** The tracking feature that `INSTRUCTIONS.md` assumes is missing: the `tracking` schema field, the gtag loader, the form-conversion hook, check 22, and the "Tracking installs" section of AGENT.md. The recent `ci:` commits synced the workflow from AA-Template but not `lib/`, `scripts/`, `app/layout.tsx`, `components/ContactForm.tsx`, or `AGENT.md`.
- **Fix:** a human syncs those files from the AA-Template version that ships tracking support (and re-seals `ContactForm.tsx` there, not in CI). Then re-dispatch this same `site_update`. After that, the instruction as written should apply cleanly.
- Separately, `site.config.ts` has no `launch.indexable` field (it still uses `prelaunch: false`). That also suggests the repo predates the current template. I left it alone.

## Files changed in this run

- `BUILD-REPORT.md`: this report. No other file changed.
