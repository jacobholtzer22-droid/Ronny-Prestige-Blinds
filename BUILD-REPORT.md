# BUILD-REPORT: site_update (tracking install), BLOCKED

businessSlug: `prestige-blinds-1791991763161`
Kind: `site_update`, per `INSTRUCTIONS.md`: add a `tracking` key to `site.config.ts` (Google Ads `AW-18523532236`, form conversion `AW-18523532236/JqfSCKf5jawdEMzX2oBF`), then run the gate. The instructions say check 22 must pass.

**Result: not applied.** This repo's template has no tracking support. The instruction cannot be carried out without editing files that CI mode forbids me to touch. `site.config.ts` is unchanged. The site is still green (19/19), and no Google Ads tag is installed.

## 1. `npm run verify` output (final, on the unchanged config)

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

**There is no check 22.** The gate in this repo (`scripts/verify.ts`) has 19 checks. "Check 22 must pass" cannot be met here, whatever goes into the config.

## What I tried

Gate attempt 1: I added the block exactly as given, as the last key of the `siteConfig` object in `site.config.ts`:

```ts
  tracking: {
    googleAdsId: 'AW-18523532236',
    conversions: { form: 'AW-18523532236/JqfSCKf5jawdEMzX2oBF' },
  },
```

Both `npx tsc --noEmit` and `npm run verify` failed at the type-check step:

```
./site.config.ts:1375:3
Type error: Object literal may only specify known properties, and 'tracking' does not exist in type '{ businessSlug: string; legalName: string; ... }'.
Next.js build worker exited with code: 1 and signal: null
```

The cause: `siteConfigSchema` in `lib/config-schema.ts` is `.strict()` and defines no `tracking` field. Even if the type error were bypassed, check 1 would reject the unknown key. Nothing in `app/`, `components/` or `lib/` reads a tracking config or renders a gtag script, so even a parsing config would install no tag. `AGENT.md` also has no "Tracking installs" section, although `INSTRUCTIONS.md` cites one.

I reverted the edit. The fix needs `lib/config-schema.ts`, which is forbidden in CI. Writing a gtag `<Script>` by hand into the layout would be a template feature built ad hoc in one client repo, with no gate check covering it. So I stopped there. Gate attempt 2 (above) is the unchanged tree, and it passes.

## Files changed

| File | Change |
|---|---|
| `BUILD-REPORT.md` | this report (replaces the previous domain-change report) |

`site.config.ts`: no change. `INSTRUCTIONS.md`: written by the workflow, not edited by me.

## 2. `site.config.ts`

Unchanged from `main` (commit `5c9d168`). See that file. Nothing in it was touched this run.

## 3–5. Alt-text spot checks / design direction / templated-look fixes

Not applicable to this `site_update`. No images, design or content were touched.

## 6. UNRESOLVED

- The Google Ads tag `AW-18523532236` and the form conversion `AW-18523532236/JqfSCKf5jawdEMzX2oBF` are **not installed**. No conversion tracking fires on form submit.
- The privacy policy (`app/privacy-policy/page.tsx:83`) currently says the site sets no tracking cookies. Once the Ads tag ships, that text needs revisiting (and possibly a consent mechanism). That belongs with the template change below, not this run.

## 7. INVENTED

Nothing. I did not hand-roll a gtag snippet, and I did not loosen the schema to make the key parse.

## 8. Template problems (for the human, in AA-Template)

1. **This client repo is on a template version that predates tracking support.** The schema has no `tracking` key, the layout renders no gtag, and the gate has no check 20–22. (Check 20 and `launch.indexable` are cited in `AGENT.md` but also don't exist here. This repo still uses top-level `prelaunch`.) The dispatch sent a tracking install to a repo that can't take one. Fix: migrate this repo to the current AA-Template (schema with `tracking`, the layout tag/conversion component, verify check 22, the matching AGENT.md section), then re-dispatch the same `INSTRUCTIONS.md`. After that it should be a one-key change.
2. The dispatcher should check the target repo's template version (or that check 22 exists) before sending a tracking install, so this fails before an agent run.
