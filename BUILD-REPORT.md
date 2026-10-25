# BUILD-REPORT — site_update (domain change)

businessSlug: `prestige-blinds-1791991763161`
Kind: `site_update`, per `INSTRUCTIONS.md`: change the site's domain to `https://www.prestigeblindsfl.com`.

## 1. `npm run verify` output

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

Check 15 (canonical matches `config.domain`) passes against the new domain. In the built `./out`, 89 files now reference `prestigeblindsfl.com` and none reference `prestigewoodblinds.com`. Those files include canonicals, sitemap.xml, robots.txt, llms.txt and JSON-LD, and all of them read from `config.domain`.

## Files and lines changed

| File | Line | Before | After |
|---|---|---|---|
| `site.config.ts` | 1373 | `domain: 'https://www.prestigewoodblinds.com',` | `domain: 'https://www.prestigeblindsfl.com',` |
| `BUILD-REPORT.md` | new file | — | this report |

No other file changed. `prelaunch` is still `true`. I did not touch `launch.indexable`, robots behaviour, design, content, images or components.

### Email addresses on prestigewoodblinds.com

None found. The only email in config is `prestigeblind100@gmail.com` (`site.config.ts:23`), and I left it unchanged. No `@prestigewoodblinds.com` address appears anywhere in the repo.

### References to prestigewoodblinds.com I deliberately did not change

These mention the **client's existing WordPress site** (where the brief facts and photos came from), not the new site's address. Swapping the domain would turn a true statement about provenance into a false one. If they should change anyway, a human needs to make that call:

- `BRIEF.md:3` and `BRIEF.md:26`: the brief is an input and may not be edited. **The brief still names `https://www.prestigewoodblinds.com` as the domain, so it now contradicts `INSTRUCTIONS.md` and the config.** Update the source brief/dispatch payload so a future `site_build` does not revert this.
- `CLIENT-TODO.md:10`: "Add Jacob as an owner on the prestigewoodblinds.com Google Search Console property…". This is the existing property for the old site. If the launch moves to prestigeblindsfl.com, the client also needs a Search Console property for prestigeblindsfl.com. Someone should also decide whether prestigewoodblinds.com should 301-redirect to the new domain so the old URLs keep their equity. Neither is set up in this repo.
- `STOCK-PHOTOS.md:6`: says the photos were "pulled from the client's current website at prestigewoodblinds.com". That is a historical fact about where the photos came from.
- `INSTRUCTIONS.md`: this is the run's input file.

## 2. `site.config.ts`

```ts
import type { SiteConfigInput } from './lib/config-schema'

/**
 * Every business fact for this site lives here and nowhere else.
 *
 * Filled from BRIEF.md for Prestige Blinds LLC. Anything the brief listed as
 * UNKNOWN is null or omitted, and the block that depends on it does not render.
 *
 * businessSlug is a PLACEHOLDER. Swap it for the real platform slug before
 * launch, then flip prelaunch to false and redeploy. The open questions for
 * the owner are in the client checklist at the repo root.
 */
const siteConfig = {
  businessSlug: 'prestige-blinds-1791991763161',

  legalName: 'Prestige Blinds LLC',
  displayName: 'Prestige Blinds',
  tagline: 'Custom shutters, shades, blinds, and drapery, measured and installed across South Florida.',

  schemaType: 'HomeAndConstructionBusiness',

  phone: '+19547908436',
  email: 'prestigeblind100@gmail.com',

  address: {
    street: '11555 Heron Bay Blvd, Suite 200',
    city: 'Coral Springs',
    state: 'FL',
    zip: '33076',
    lat: 26.3094582,
    lng: -80.2815225,
  },

  primaryCity: 'Coral Springs',
  primaryState: 'FL',

  serviceAreas: [
    {
      slug: 'parkland',
      path: '/parkland-window-treatments',
      seoTitle: 'Parkland Window Treatments | Prestige Blinds',
      name: 'Parkland',
      county: 'Broward County',
      countySlug: 'broward-county',
      faqs: [
        {
          q: 'Do you work with Parkland HOA and architectural review rules?',
          a:
            'Yes. Many Parkland communities review exterior-facing changes, and shutters and shades read from the street on a two-story front window. We note what the community expects at the consultation and pick a frame and color that will pass without a second trip.',
        },
        {
          q: 'What goes on the tall entry windows in Parkland homes?',
          a:
            'Most of these houses have a two-story entry or a window above the stairs. Motorized shades are the usual answer, because nothing there is reachable without a ladder. We size the motor to the drop and program the stop points before we leave.',
        },
        {
          q: 'Can you cover the wide sliders onto the yard?',
          a:
            'Yes. Parkland lots are large and the rear glass is usually wide. Panel track shutters, vertical blinds, and wide zebra shades all cover that opening, and we bring samples of all three so you can see them against the room.',
        },
        {
          q: 'How long does a Parkland job take?',
          a:
            'We measure at the free in-home consultation and give you the schedule there. Same-day estimates are standard, and same-day installation is available on in-stock products. Custom shutters are made to your windows, so those take longer.',
        },
      ],
    },
    {
      slug: 'boca-raton',
      path: '/boca-raton-window-treatments',
      seoTitle: 'Boca Raton Window Treatments | Prestige Blinds',
      name: 'Boca Raton',
      county: 'Palm Beach County',
      countySlug: 'palm-beach-county',
      faqs: [
        {
          q: 'Do you install in Boca Raton condo buildings?',
          a:
            'Yes. We cover both houses and condos, including oceanfront buildings. Many associations have rules about what the window reads like from outside, usually a white or off-white backing, and we pick a product that satisfies that while you still get the inside you want.',
        },
        {
          q: 'What works best on east-facing oceanfront glass?',
          a:
            'Solar screen shades are usually the starting point. They cut the glare and the heat of a direct sunrise while you keep the water view. Where privacy matters as much as view, zebra shades do both jobs in one shade.',
        },
        {
          q: 'Do plantation shutters suit the older Boca neighborhoods?',
          a:
            'They suit them very well. The single-family neighborhoods inland have the window proportions shutters were made for, and a framed shutter finishes a Mediterranean Revival or mid-century opening better than a soft treatment does.',
        },
        {
          q: 'Is the consultation in Boca Raton free?',
          a:
            'Yes. We come to you anywhere in Palm Beach County, measure, and bring samples so you see the material in the room and the light it will actually sit in. You get an estimate from that visit at no charge.',
        },
      ],
    },
    {
      slug: 'davie',
      path: '/davie-window-treatments',
      seoTitle: 'Davie Window Treatments | Prestige Blinds',
      name: 'Davie',
      county: 'Broward County',
      countySlug: 'broward-county',
      faqs: [
        {
          q: 'Do you cover acreage properties and ranch homes in Davie?',
          a:
            'Yes. Davie keeps more acreage than the rest of Broward, and older ranch houses tend to have wide, low windows that were never covered well. Those are measured on site rather than estimated, because very little of that housing stock is a standard size.',
        },
        {
          q: 'Can you match window treatments across an older house?',
          a:
            'Yes. Where a house has been added to over the years the openings rarely match, so we measure every one and build to it. Keeping one material and color across the house is what makes a mixed set of windows read as deliberate.',
        },
        {
          q: 'What do you recommend for a Davie home with a lot of west glass?',
          a:
            'Solar screens or room darkening rollers. Late sun across open ground is harsh here, and a screen fabric cuts the glare and heat without closing the room off from the yard.',
        },
        {
          q: 'Do you serve both homes and businesses in Davie?',
          a:
            'Yes, both. The range runs from a single room in a house to commercial and hospitality window coverings, and the process is the same either way: measure, choose, install.',
        },
      ],
    },
    {
      slug: 'fort-lauderdale',
      path: '/fort-lauderdale-window-treatments',
      seoTitle: 'Fort Lauderdale Window Treatments | Prestige Blinds',
      name: 'Fort Lauderdale',
      county: 'Broward County',
      countySlug: 'broward-county',
      faqs: [
        {
          q: 'What works on a canal-front wall of glass?',
          a:
            'Solar screen shades. On a canal you have light coming off the water as well as straight sun, and a screen fabric takes the glare down without taking the view away. That is the whole reason the house faces the water.',
        },
        {
          q: 'Do you install in downtown Fort Lauderdale high-rises?',
          a:
            'Yes. Tall glass with no easy access is the normal case there, so motorized shades on a wall switch or a phone app usually make more sense than anything you have to reach for.',
        },
        {
          q: 'Are plantation shutters right for Victoria Park or Rio Vista?',
          a:
            'Often, yes. The original windows in those neighborhoods are smaller and better proportioned for a framed shutter, and shutters suit the period of the houses rather than fighting it.',
        },
        {
          q: 'How far into Fort Lauderdale do you travel?',
          a:
            'All of it, and the rest of Broward County. We work within fifty miles of our Coral Springs office, so the whole city is inside our normal service area.',
        },
      ],
    },
    {
      slug: 'pompano-beach',
      path: '/pompano-beach-window-treatments',
      seoTitle: 'Pompano Beach Window Treatments | Prestige Blinds',
      name: 'Pompano Beach',
      county: 'Broward County',
      countySlug: 'broward-county',
      faqs: [
        {
          q: 'Which materials hold up near the ocean in Pompano Beach?',
          a:
            'Vinyl and composite shutters hold up where wood would rather not, and they wipe clean, which counts on a balcony slider that gets opened every day. We talk material before style on anything close to the water.',
        },
        {
          q: 'What should go on an east-facing bedroom?',
          a:
            'Blackout roller shades are the usual request. A bedroom facing the sunrise gets full light early, and a heavy opaque fabric is the only thing that actually stops it. You can pair it with a solar screen for the daytime.',
        },
        {
          q: 'Do you work in the older single-family neighborhoods?',
          a:
            'Yes. Those houses are a few streets back from the beach and usually have smaller, more numerous windows, which suits shutters and horizontal blinds. Every opening gets measured because the sizes are rarely standard.',
        },
        {
          q: 'Can you do a whole condo at once?',
          a:
            'Yes. Doing the whole unit in one order is how you get the material, color, and operation to match from room to room, and it is usually one installation visit rather than several.',
        },
      ],
    },
    {
      slug: 'deerfield-beach',
      path: '/deerfield-beach-window-treatments',
      seoTitle: 'Deerfield Beach Window Treatments | Prestige Blinds',
      name: 'Deerfield Beach',
      county: 'Broward County',
      countySlug: 'broward-county',
      faqs: [
        {
          q: 'Do you install in Deerfield Beach condo and 55+ communities?',
          a:
            'Yes. Those communities often have rules about what the window shows from outside, and we pick a product and a backing color that meets them. We also do whole-building style matching where an association asks for it.',
        },
        {
          q: 'What is best for a beachfront unit?',
          a:
            'Solar screen for the day and a blackout layer for the night, often on one window as a double roller. That combination handles glare, heat, and sleep without giving up the view.',
        },
        {
          q: 'Can you work around sliding glass doors onto a balcony?',
          a:
            'Yes, and they are the most common opening here. Vertical blinds, panel track shutters, and wide zebra shades all leave the doorway usable, and we will show you all three against the room.',
        },
        {
          q: 'Is there a charge to come out to Deerfield Beach?',
          a:
            'No. The in-home consultation is free anywhere in our service area, and Deerfield Beach is well inside it. We measure, bring samples, and leave you with an estimate.',
        },
      ],
    },
    {
      slug: 'coconut-creek',
      path: '/coconut-creek-window-treatments',
      seoTitle: 'Coconut Creek Window Treatments | Prestige Blinds',
      name: 'Coconut Creek',
      county: 'Broward County',
      countySlug: 'broward-county',
      faqs: [
        {
          q: 'Do you handle HOA-governed villages in Coconut Creek?',
          a:
            'Yes. Much of the city is organized into planned villages with their own rules on what shows from the street. We note the requirement at the consultation and choose a frame and backing that satisfies it.',
        },
        {
          q: 'Does the tree canopy change what I need?',
          a:
            'It does. Streets with real shade get softer, more dappled light, so a light filtering shade or a shutter often reads better than the heaviest solar fabric. The brief is softening light rather than fighting a wall of it.',
        },
        {
          q: 'What suits a townhome or villa here?',
          a:
            'Smaller, repeated window sizes, which is good news: one material and color across the whole unit looks deliberate and usually installs in a single visit.',
        },
        {
          q: 'Do you cover the 55+ communities?',
          a:
            'Yes. Cordless and motorized options come up a lot there, because they remove the reaching and the cords entirely, and we fit and program the motors ourselves.',
        },
      ],
    },
    {
      slug: 'weston',
      path: '/weston-window-treatments',
      seoTitle: 'Weston Window Treatments | Prestige Blinds',
      name: 'Weston',
      county: 'Broward County',
      countySlug: 'broward-county',
      faqs: [
        {
          q: 'Do the floor plans in Weston repeat?',
          a:
            'Within a community, often yes, which helps. Once we have measured one of a plan we know what the rest of the house needs, and ordering the whole house at once keeps the material and color consistent.',
        },
        {
          q: 'What handles the late afternoon sun?',
          a:
            'Solar screens and room darkening rollers. West-facing rooms here take low, hard sun across open ground at exactly the hour people are home, and a screen fabric cuts the heat and glare while you keep the view.',
        },
        {
          q: 'Can you reach a two-story great room window?',
          a:
            'Yes, and that is where motorized shades stop being a luxury. We size the motor to the drop, set the limits, and program the control so you are not handling a pole.',
        },
        {
          q: 'Do you work with Weston community associations?',
          a:
            'Yes. Where a community specifies how a window reads from outside, we pick a product and backing that meets it and say so before anything is ordered.',
        },
      ],
    },
    {
      slug: 'plantation',
      path: '/plantation-window-treatments',
      seoTitle: 'Plantation Window Treatments | Prestige Blinds',
      name: 'Plantation',
      county: 'Broward County',
      countySlug: 'broward-county',
      faqs: [
        {
          q: 'Do older Plantation homes need custom sizes?',
          a:
            'Usually. Houses from the 1960s through the 1980s have original openings that are rarely a standard size, and additions make it worse. Every window is measured rather than assumed.',
        },
        {
          q: 'What works under a mature tree canopy?',
          a:
            'Light filtering shades and plantation shutters. With real shade outside you are softening dappled light rather than blocking a wall of it, so the heaviest solar fabric is usually more than the room needs.',
        },
        {
          q: 'Do you cover Plantation Acres?',
          a:
            'Yes. The larger lots out there tend to have bigger rear glass and more of it, and wide sliders are common, so panel track shutters and wide shades come up often.',
        },
        {
          q: 'Can you match treatments across a house done in stages?',
          a:
            'Yes. Keeping one material, color, and operation across mismatched openings is what makes the house read as finished. We plan that across the whole order rather than room by room.',
        },
      ],
    },
    {
      slug: 'southwest-ranches',
      path: '/southwest-ranches-window-treatments',
      seoTitle: 'Southwest Ranches Window Treatments | Prestige Blinds',
      name: 'Southwest Ranches',
      county: 'Broward County',
      countySlug: 'broward-county',
      faqs: [
        {
          q: 'Do you travel out to Southwest Ranches?',
          a:
            'Yes. It is inside our normal service area and the consultation is free. Because the properties are spread out we will confirm a window of time rather than leave you waiting.',
        },
        {
          q: 'What suits a large custom home on acreage?',
          a:
            'Big openings and tall glass, usually. Motorized shades for anything high, panel track shutters or wide shades for the rear glass, and one material carried across the house so it reads as one decision.',
        },
        {
          q: 'Is privacy a concern on an acre lot?',
          a:
            'Less than in a subdivision, which changes the brief. You can often use a lighter, more open fabric and keep the view, because you are not looking at a neighbor twenty feet away.',
        },
        {
          q: 'Can you handle a whole-house order?',
          a:
            'Yes, and on a house this size it is the sensible way to buy. One measure, one order, consistent material and color, and usually one installation rather than several visits.',
        },
      ],
    },
    {
      slug: 'sunrise',
      path: '/sunrise-window-treatments',
      seoTitle: 'Sunrise Window Treatments | Prestige Blinds',
      name: 'Sunrise',
      county: 'Broward County',
      countySlug: 'broward-county',
      faqs: [
        {
          q: 'What is typical in Sunrise homes?',
          a:
            'A lot of the housing went up in the 1970s and 1980s, with single-family streets alongside townhomes and newer construction further west. Window sizes repeat within a development, which keeps a whole-house order straightforward.',
        },
        {
          q: 'Do you cover the 55+ communities in Sunrise?',
          a:
            'Yes. Cordless and motorized options are popular there because they take the reaching and the cords out, and we fit and program the motor as part of the job.',
        },
        {
          q: 'What goes on a screened patio slider?',
          a:
            'Vertical blinds or a wide zebra shade usually, and outdoor screen shades on the patio itself if the sun is the problem rather than the privacy.',
        },
        {
          q: 'Is the estimate free in Sunrise?',
          a:
            'Yes. We come out, measure, and bring samples, and you get an estimate from that visit at no charge. Same-day estimates are standard.',
        },
      ],
    },
    {
      slug: 'pembroke-pines',
      path: '/pembroke-pines-window-treatments',
      seoTitle: 'Pembroke Pines Window Treatments | Prestige Blinds',
      name: 'Pembroke Pines',
      county: 'Broward County',
      countySlug: 'broward-county',
      faqs: [
        {
          q: 'Do you serve all of Pembroke Pines?',
          a:
            'Yes, from the older eastern neighborhoods through to the newer master-planned communities in the west. It is a large city and all of it is inside our service area.',
        },
        {
          q: 'What suits newer construction out west?',
          a:
            'Taller windows, wide sliders, and open-plan rooms with a lot of glass. Motorized shades on the high openings and panel track or wide zebra on the sliders is the usual combination.',
        },
        {
          q: 'Do you work with 55+ community rules?',
          a:
            'Yes. Several of the large communities here specify how a window reads from outside, and we pick a backing and frame that meets the requirement before anything is ordered.',
        },
        {
          q: 'Can you do one room rather than the whole house?',
          a:
            'Yes. There is no minimum. Plenty of jobs start as one room that was unbearable in the afternoon and grow from there once you see the difference.',
        },
      ],
    },
    {
      slug: 'delray-beach',
      path: '/delray-beach-window-treatments',
      seoTitle: 'Delray Beach Window Treatments | Prestige Blinds',
      name: 'Delray Beach',
      county: 'Palm Beach County',
      countySlug: 'palm-beach-county',
      faqs: [
        {
          q: 'What suits the historic bungalows near Atlantic Avenue?',
          a:
            'Smaller windows with trim worth keeping, which is why custom drapery or a traditional tilt shutter usually reads better there than a modern flat shade. The treatment should suit the period rather than argue with it.',
        },
        {
          q: 'What about the beachfront condos?',
          a:
            'The opposite brief: wide glass, hard light, and a view to protect. Solar screen shades or zebra shades handle that, and both leave the water visible.',
        },
        {
          q: 'Do you cover the country club communities west of town?',
          a:
            'Yes. Those houses have the tall windows and wide sliders that motorized shades were made for, and they are well inside our service area.',
        },
        {
          q: 'How soon can you come out to Delray Beach?',
          a:
            'Usually quickly. We offer same-day estimates and the in-home consultation is free. Call during business hours and we will set a time that works.',
        },
      ],
    },
    {
      slug: 'boynton-beach',
      path: '/boynton-beach-window-treatments',
      seoTitle: 'Boynton Beach Window Treatments | Prestige Blinds',
      name: 'Boynton Beach',
      county: 'Palm Beach County',
      countySlug: 'palm-beach-county',
      faqs: [
        {
          q: 'Do you install in Boynton Beach 55+ communities?',
          a:
            'Yes, and they are a large share of the work here. Cordless and motorized options come up constantly because they remove the cords and the reaching, and we program the controls before we leave.',
        },
        {
          q: 'What works on Intracoastal-facing glass?',
          a:
            'Solar screen shades. Light coming off the water adds to the direct sun, and a screen fabric brings the glare down while the view stays. A blackout layer can go behind it for the bedrooms.',
        },
        {
          q: 'Can you match what my neighbor has?',
          a:
            'Often, yes. If a community has settled on a look we can usually match the material and color, and where an association specifies the backing color we meet that requirement.',
        },
        {
          q: 'Is Boynton Beach inside your service area?',
          a:
            'Yes. We work within fifty miles of our Coral Springs office, which covers Boynton Beach and the rest of southern Palm Beach County.',
        },
      ],
    },
  ],

  services: [
    {
      slug: 'plantation-shutters',
      path: '/plantation-shutters',
      seoTitle: 'Coral Springs Plantation Shutters - Prestige Blinds',
      name: 'Plantation Shutters',
      shortDescription:
        'Custom plantation shutters in wood, vinyl, or composite, measured, made to order, and installed to fit the window.',
      priceFrom: null,
      priceNote: 'quoted after a free in-home consultation',
      image: 'plantation-shutters-pool-view.jpg',
      faqs: [
        {
          q: 'What are plantation shutters made of?',
          a: 'We offer wood, vinyl, and composite. Wood is the classic choice for its look and warmth, while vinyl and composite stand up better to moisture and are easier to keep clean. We go through the trade-offs at the consultation.',
        },
        {
          q: 'What is the difference between traditional and hidden tilt?',
          a: 'A traditional shutter has a center tilt rod running down each panel that you move to angle the louvers. A hidden tilt shutter moves the louvers from a mechanism inside the panel instead, which gives a cleaner, more modern face and even louver spacing.',
        },
        {
          q: 'What works on a sliding glass door?',
          a: 'Panel track shutters. Instead of hinged panels, broad panels slide along a track, so they cover a wide opening or a sliding door without crowding it, and they stack to one side when you want the view back.',
        },
        {
          q: 'Can you match the trim color in my room?',
          a: 'Yes. You choose the frame, the color, and the louver style, and we can match the color scheme already in the room. We look at the trim on site during the consultation so the shutters sit with it rather than against it.',
        },
        {
          q: 'How long does a shutter job take?',
          a: 'Shutters are made to order, so the timeline depends on the size of the order and the options you pick. We give you the schedule at the consultation, once the windows are measured and the style is settled.',
        },
        {
          q: 'Do you install shutters in commercial spaces?',
          a: 'Yes. We cover both homes and commercial properties, from a single room to a hospitality project. The process is the same either way: we measure, you choose the style and finish, and we install.',
        },
      ],
    },
    {
      slug: 'motorized-blinds',
      path: '/motorized-blinds',
      seoTitle: 'Motorized Blinds in Coral Springs | Prestige Blinds',
      name: 'Motorized Blinds',
      shortDescription:
        'Motorized shades, blinds, and drapery you run from a remote, a wall switch, a phone app, or a smart home system.',
      priceFrom: null,
      priceNote: 'quoted after a free in-home consultation',
      image: 'motorized-patio-screen.jpg',
      faqs: [
        {
          q: 'How do motorized shades get their power?',
          a: 'Two ways. A rechargeable battery motor needs no wiring and suits a window that is hard to get to, and a hardwired motor runs off the electrical system. We talk through which one fits the window and the room before anything is ordered.',
        },
        {
          q: 'Do they work with Alexa or Google Assistant?',
          a: 'Yes. Motorized shades run from a remote, a wall switch, or a phone app, and they can be added to a smart home system, so voice control sits alongside the rest of your automation.',
        },
        {
          q: 'Which windows are worth motorizing?',
          a: 'Tall and hard-to-reach windows, skylights, wide spans, sliding glass doors, and media rooms are the usual ones. Anywhere you would otherwise reach for a cord several times a day is a good candidate.',
        },
        {
          q: 'Are motorized shades better with children and pets?',
          a: 'There is no hanging cord to pull, which removes a hazard that cords create in a home with small children or pets. That is one of the more common reasons people move to motorized shades.',
        },
        {
          q: 'Can my existing shades be motorized?',
          a: 'That depends on the product and how it was built, so it is not something to answer sight unseen. Call us and describe what you have, and we will tell you whether it can be converted or whether new shades make more sense.',
        },
        {
          q: 'Which shades can be motorized?',
          a: 'Roller, Roman, and zebra shades can all be motorized, and so can drapery. Our team fits the motors and programs the controls, so everything works the way you expect before we leave.',
        },
      ],
    },
    {
      slug: 'zebra-shades',
      path: '/zebra-shades',
      seoTitle: 'Zebra Shades - Florida Zebra Shades - Prestige Blinds',
      name: 'Zebra Shades',
      shortDescription:
        'Custom zebra shades with alternating sheer and solid bands, manual or motorized, for light control and privacy.',
      priceFrom: null,
      priceNote: 'quoted after a free in-home consultation',
      image: 'zebra-shades-sliding-door.jpg',
      faqs: [
        {
          q: 'What is a zebra shade?',
          a: 'A zebra shade carries alternating sheer and solid bands on one shade. Line the bands up and the shade reads as solid for privacy. Offset them and light filters through the sheer sections while you keep the view out.',
        },
        {
          q: 'Do zebra shades filter light or darken the room?',
          a: 'They do both, which is why they are also called transitional shades. The same shade carries light filtering and room darkening fabric, so how much light comes in is set by how far you offset the bands.',
        },
        {
          q: 'Can zebra shades be motorized?',
          a: 'Yes. Zebra shades are available motorized, so you can run them from a remote, a wall switch, or a phone app. We fit and program the motor as part of the installation.',
        },
        {
          q: 'Do they work on a sliding glass door?',
          a: 'Yes. Zebra shades are built to the opening, so a wide span or a sliding glass door is a normal job for them. We measure the opening at the consultation and make the shade to fit it.',
        },
        {
          q: 'Which rooms suit zebra shades best?',
          a: 'Living rooms, bedrooms, and studies are the usual ones, because those are the rooms where you want the view through the day and privacy at night. They sit particularly well in a contemporary room.',
        },
      ],
    },
    {
      slug: 'shades',
      path: '/shades',
      seoTitle: 'Shades Installation Company in Coral Springs, Florida',
      name: 'Shades',
      shortDescription:
        'Roller shades in light filtering, room darkening, and blackout fabrics, plus Roman shades, sheer shades, and outdoor patio shades.',
      priceFrom: null,
      priceNote: 'quoted after a free in-home consultation',
      image: 'sheer-shades-dining-room.jpg',
      faqs: [
        {
          q: 'What is the difference between light filtering and blackout?',
          a: 'A light filtering shade softens direct sun and keeps a soft glow in the room. A blackout shade is heavy opaque fabric that shuts the light out, which is what you want in a bedroom, a nursery, or a media room.',
        },
        {
          q: 'What is a solar screen shade?',
          a: 'A solar screen is a woven fabric that cuts glare and heat while you can still see out. It is the usual choice on a lanai or a tall window facing the sun, where you want to keep the view but not the glare.',
        },
        {
          q: 'Can outdoor patio shades handle the weather here?',
          a: 'Screen enclosure patio shades are made for it. They cut UV, glare, and heat, hold off wind and rain across the patio, keep bugs out, and protect outdoor furniture from direct sun. They run on a rope system or a motor.',
        },
        {
          q: 'What styles of Roman shade can I choose from?',
          a: 'Flat, cascade, pleated, aventura, relaxed, and tulip. Each is a different way the fabric folds as the shade is raised, from a clean flat stack to a soft drape along the bottom. Roman shades can also be motorized.',
        },
        {
          q: 'Can I put a screen and a blackout shade on the same window?',
          a: 'Yes. A double roller setup carries a solar screen and a blackout shade on one window, so you can cut the glare through the day and close the room down completely at night.',
        },
      ],
    },
    {
      slug: 'blinds',
      path: '/blinds',
      seoTitle: 'Blinds Installation | Electric Blinds | Plantation Shutters',
      name: 'Blinds',
      shortDescription:
        'Custom blinds made to measure in wood, vinyl, or metal, in horizontal and vertical styles and the finish you choose.',
      priceFrom: null,
      priceNote: 'quoted after a free in-home consultation',
      image: 'wood-blinds-closeup.jpg',
      faqs: [
        {
          q: 'What styles of blinds do you carry?',
          a: 'Horizontal blinds with slats that tilt, vertical blinds for sliding glass doors and wide windows, and Roman blinds that fold into pleats as they rise. We bring samples so you can see the materials in the room.',
        },
        {
          q: 'What are the slats made of?',
          a: 'Wood, metal, and vinyl are the usual materials, and each comes in a range of colors and finishes. Wood gives the warmest look, while vinyl and metal hold up better where there is moisture.',
        },
        {
          q: 'Can you match the colors already in my room?',
          a: 'Yes. Blinds are custom made from a wide range of materials and finishes, and we can match the color scheme in the room. Special orders and custom options are available when nothing standard fits.',
        },
        {
          q: 'Can blinds be motorized?',
          a: 'Yes. Blinds can take a motor and run from a remote, a wall switch, or a phone app, which is worth doing on a high window or on any blind you find yourself adjusting several times a day.',
        },
        {
          q: 'What goes on a sliding glass door?',
          a: 'Vertical blinds are the usual answer, because the slats stack to one side and leave the doorway clear. Panel track shutters and wide zebra shades also work there, and we will show you all three.',
        },
      ],
    },
    {
      slug: 'drapery-services',
      path: '/drapery-services',
      seoTitle: 'Coral Springs Drapery & Drapes Installation Company',
      name: 'Drapery',
      shortDescription:
        'Custom drapery and curtains made from hundreds of fabrics, with the hardware, lining, and length chosen to suit the room.',
      priceFrom: null,
      priceNote: 'quoted after a free in-home consultation',
      image: 'custom-drapery-tieback.jpg',
      faqs: [
        {
          q: 'Do you supply the drapery hardware?',
          a: 'Yes. We handle the whole job, hardware included. Drapes can hang from rod pockets, hooks, or tab tops, and you choose whether they are finished with tie-backs or left to hang straight.',
        },
        {
          q: 'What lengths can drapes be made to?',
          a: 'Floor length, puddle length, cafe style, or an exact length you specify. We measure the window and the drop at the consultation so the drape hangs the way you pictured it rather than an inch off.',
        },
        {
          q: 'Can drapery go over shades or blinds?',
          a: 'Yes, and it is a common pairing. The shade does the light control and the drapery softens the window and finishes the room. We plan the two together so the mount points and the stack work.',
        },
        {
          q: 'Can drapery be motorized?',
          a: 'Yes. Motorized drapery runs from a remote or a phone app, can be scheduled to open and close at set times, and has no cords, which makes it safer around children and pets. It can join a home automation system.',
        },
        {
          q: 'Should drapes be lined or unlined?',
          a: 'Both are available. A lining adds weight and body, blocks more light, and protects the face fabric from the sun. Unlined panels hang lighter and let more light through. We show you both in the fabric you pick.',
        },
      ],
    },
  ],

  products: [
    {
      slug: 'panel-track-shutters',
      path: '/panel-track-shutters',
      seoTitle: 'Panel Track Shutters in Coral Springs | Prestige Blinds',
      name: 'Panel Track Shutters',
      parent: 'plantation-shutters',
      shortDescription:
        'Broad shutter panels that slide along a track to cover a sliding door or a wide opening without crowding the room.',
      priceFrom: null,
      priceNote: 'quoted after a free in-home consultation',
      image: 'plantation-shutters-dining-room.jpg',
      faqs: [
        {
          q: 'What are panel track shutters?',
          a:
            'Broad panels, in wood or poly PVC, that slide along a track rather than swinging on hinges. Because the panels are wide they cover far more opening than a hinged shutter, which is why they suit sliding doors and long window walls.',
        },
        {
          q: 'Where do panel track shutters work best?',
          a:
            'Sliding glass doors, french doors, patio doors, and any wide window wall. They stack to one side when you want the opening clear, so you keep the view and the walkway that the door exists for.',
        },
        {
          q: 'How much light can I let in?',
          a:
            'As much or as little as you want. The wide panels adjust the same way a shutter louver does, so you can set the room bright, dim, or closed, and the panels block the view in completely when they overlap.',
        },
        {
          q: 'Are they easy to operate?',
          a:
            'Yes. The panels glide along the track with very little effort, manually or motorized, which matters on a wide opening you use every day rather than once a season.',
        },
        {
          q: 'How do I look after them?',
          a:
            'Wipe them with a soft cloth or a mild cleaning solution. Poly PVC and wood both hold up well here, and neither needs more than dusting between proper cleans. Avoid harsh chemicals and abrasives on the panel surface.',
        },
      ],
    },
    {
      slug: 'roller-shades',
      path: '/roller-shades',
      seoTitle: 'Roller Shades Installation in Coral Springs, Florida',
      name: 'Roller Shades',
      parent: 'shades',
      shortDescription:
        'A single panel of fabric on a roller, in light filtering, room darkening, blackout, or solar screen, raised by cord, chain, or motor.',
      priceFrom: null,
      priceNote: 'quoted after a free in-home consultation',
      image: 'solar-screen-shade-lanai.jpg',
      faqs: [
        {
          q: 'What fabric options do roller shades come in?',
          a:
            'Vinyl, which wipes clean and handles humidity, and fabric in three weights: light filtering to soften direct sun, room darkening for a cozier room, and blackout for full dark. Solar screen is the open weave that cuts glare while you still see out.',
        },
        {
          q: 'What is a solar screen roller shade?',
          a:
            'A woven open-weave fabric that blocks glare and heat without blocking the view. It is the usual answer on a wall of glass facing the afternoon sun, or anywhere you want the brightness down and the view kept.',
        },
        {
          q: 'Can I have two shades on one window?',
          a:
            'Yes. A double roller setup carries a solar screen and a blackout shade on the same window, so you cut the glare through the day and close the room down completely at night.',
        },
        {
          q: 'Do roller shades suit a humid room?',
          a:
            'Vinyl does particularly well in a bathroom, kitchen, or any room that stays humid, because it resists moisture and wipes clean. We will steer you to the right material for the room at the consultation.',
        },
        {
          q: 'Can roller shades be motorized?',
          a:
            'Yes. A roller is the simplest shade to motorize, and on a tall or wide window it is usually worth doing. Our motorized blinds and shades page covers the control and power options.',
        },
      ],
    },
    {
      slug: 'blackout-roller-shades',
      path: '/blackout-roller-shades',
      seoTitle: 'Blackout Roller Shades - Roller Shades - Prestige Blinds',
      name: 'Blackout Roller Shades',
      parent: 'shades',
      shortDescription:
        'Heavy opaque roller shades that shut the light out completely, for bedrooms, nurseries, and media rooms in bright South Florida homes.',
      priceFrom: null,
      priceNote: 'quoted after a free in-home consultation',
      image: null,
      faqs: [
        {
          q: 'How dark does a blackout roller shade make a room?',
          a:
            'The fabric itself is opaque, so no light passes through it. A small amount still comes around the edges of any roller shade; mounting outside the frame with a generous overlap is how we keep that to a minimum.',
        },
        {
          q: 'Where do blackout shades make the most difference?',
          a:
            'Bedrooms facing the sunrise, nurseries, media rooms, and anywhere somebody sleeps during the day. In this climate they also cut the heat that comes with the light, which helps the room stay comfortable.',
        },
        {
          q: 'What is the difference between blackout and room darkening?',
          a:
            'Room darkening fabric cuts most of the light and keeps a dim glow. Blackout fabric is opaque and stops it. If you want a room genuinely dark in the middle of the afternoon, blackout is the one.',
        },
        {
          q: 'Can I keep the view and still have blackout?',
          a:
            'Yes, with a double roller. A solar screen shade handles the day and keeps the view, and the blackout shade behind it comes down when you want the room closed. Both run off the same window.',
        },
        {
          q: 'Do blackout roller shades come motorized?',
          a:
            'Yes, and a bedroom is a good place for it, because you can set the shade to close on a schedule or run it from the bedside without getting up. We fit and program the motor as part of the job.',
        },
      ],
    },
    {
      slug: 'tenera-sheer-shades',
      path: '/tenera-sheer-shades',
      seoTitle: 'Tenera Sheer Shades in Coral Springs, Florida',
      name: 'Tenera Sheer Shades',
      parent: 'shades',
      shortDescription:
        'Lightweight sheer fabric shades that diffuse incoming light and soften a room while keeping a view through to the outside.',
      priceFrom: null,
      priceNote: 'quoted after a free in-home consultation',
      image: 'sheer-shades-yacht-salon.jpg',
      faqs: [
        {
          q: 'What is a sheer shade?',
          a:
            'A lightweight sheer fabric that filters light rather than blocking it. The room keeps its brightness but loses the hard edge of direct sun, and you can still see out through the fabric.',
        },
        {
          q: 'Do sheer shades give any privacy?',
          a:
            'Some, and more at night than during the day. They soften what anyone outside can see without closing the window off. Where privacy matters more, we pair them with a second shade or point you at zebra shades instead.',
        },
        {
          q: 'What colors do they come in?',
          a:
            'A range of colors and patterns, chosen to match the room rather than stand out from it. We bring samples to the consultation so you can hold them against your own wall color and flooring.',
        },
        {
          q: 'Which rooms suit sheer shades?',
          a:
            'Living rooms and bedrooms most often, and anywhere the light is good and you want to keep it. They finish a window softly, which is why they turn up in rooms that are already well decorated.',
        },
        {
          q: 'Can sheer shades be motorized?',
          a:
            'Yes. They are a light shade, so the motor work is straightforward, and on a tall window it saves the reaching. We install and program the controls as part of the job.',
        },
      ],
    },
    {
      slug: 'roman-shades',
      path: '/roman-shades',
      seoTitle: 'Roman Shades Installation Coral Springs, Florida',
      name: 'Roman Shades',
      parent: 'shades',
      shortDescription:
        'Soft fabric shades that fold into pleats as they rise, in cotton, linen, silk, or polyester, in six folding styles.',
      priceFrom: null,
      priceNote: 'quoted after a free in-home consultation',
      image: 'light-filtering-shades-pair.jpg',
      faqs: [
        {
          q: 'What styles of Roman shade are there?',
          a:
            'Flat for a clean stack, cascade for classic waterfall pleats, pleated for an accordion, aventura for a precise horizontal line, relaxed for a soft drape across the bottom, and tulip for gathered sides.',
        },
        {
          q: 'What fabrics can Roman shades be made in?',
          a:
            'Cotton, linen, silk, or polyester, in a wide range of colors, patterns, and textures. The fabric is what decides how the shade folds and how it hangs, so it is worth seeing samples in the room.',
        },
        {
          q: 'Are Roman shades good for light control?',
          a:
            'Yes. Most styles are available in solar and UV filtering fabric, and even the ones that are not give you better temperature control than a bare window. For full dark, a lining or a blackout roller behind them is the answer.',
        },
        {
          q: 'Which rooms suit Roman shades?',
          a:
            'Any of them. They read as fabric rather than as a mechanism, which is why they suit a living room or bedroom you have already decorated, and they work just as well in an office.',
        },
        {
          q: 'Can Roman shades be motorized?',
          a:
            'Yes. A motorized Roman shade lifts on a hidden tube rather than a cord, which is useful on a tall window and safer in a house with small children or pets.',
        },
      ],
    },
    {
      slug: 'outdoor-patio-shades',
      path: '/outdoor-patio-shades',
      seoTitle: 'Outdoor Patio Shades in Coral Springs, Florida',
      name: 'Outdoor Patio Shades',
      parent: 'shades',
      shortDescription:
        'Screen enclosure shades for a patio or lanai, on a rope system or a motor, cutting UV, glare, heat, wind, rain, and bugs.',
      priceFrom: null,
      priceNote: 'quoted after a free in-home consultation',
      image: 'solar-screen-shade-lanai.jpg',
      faqs: [
        {
          q: 'What do outdoor patio shades actually do?',
          a:
            'They cut UV, glare, and heat, hold off wind and rain across the opening, keep bugs out, and protect outdoor furniture from direct sun. In practice they turn a patio you avoid in August into one you use.',
        },
        {
          q: 'Do they block the view?',
          a:
            'No. The screen fabric is an open weave, so you see through it to the yard or the water. It takes the brightness and the heat down rather than closing the space in.',
        },
        {
          q: 'Can outdoor patio shades be motorized?',
          a:
            'Yes. Motorized patio shades run at the press of a button, and side channels cover the working parts so the look of the patio is kept. Manual versions run on a rope system.',
        },
        {
          q: 'Will they handle the weather here?',
          a:
            'That is what they are built for. They hold off wind and rain across the opening and shield the furniture from direct sun, which is most of what wears an outdoor room out in this climate.',
        },
        {
          q: 'Do they help with bugs?',
          a:
            'Yes. The screen is an extra barrier across the opening, which keeps mosquitoes and other insects out of the covered area. In the warmer, more humid months that is often the main reason people ask for them.',
        },
      ],
    },
  ],

  counties: [
    {
      slug: 'broward-county',
      path: '/broward-county-window-treatments',
      seoTitle: 'Broward County Window Treatments | Prestige Blinds',
      name: 'Broward County',
    },
    {
      slug: 'palm-beach-county',
      path: '/palm-beach-county-window-treatments',
      seoTitle: 'Palm Beach County Window Treatments | Prestige Blinds',
      name: 'Palm Beach County',
    },
  ],

  localPages: [
    {
      slug: 'blinds-coral-springs-florida',
      path: '/blinds-coral-springs-florida',
      seoTitle: 'Blinds Coral Springs FL - Installation & Service',
      service: 'blinds',
      area: null,
      city: 'Coral Springs',
      term: 'Blinds',
      h1: 'Blinds in Coral Springs, Florida',
      faqs: [
        {
          q: 'Do you have a showroom in Coral Springs?',
          a:
            'We work the other way round: we bring the showroom to you. The in-home consultation is free, and seeing a material against your own wall and in your own light beats a showroom every time.',
        },
        {
          q: 'How quickly can you install blinds in Coral Springs?',
          a:
            'We offer same-day estimates, and same-day installation is available on in-stock products. Custom orders are built to your windows, so those take longer, and we give you the date at the consultation.',
        },
        {
          q: 'What blinds suit a Coral Springs home?',
          a:
            'Horizontal wood or faux-look blinds for most windows, verticals for the sliders onto the patio. Humidity and strong sun are the two constraints here, so vinyl and composite are worth considering where a room takes direct afternoon light.',
        },
        {
          q: 'Do you cover the gated communities?',
          a:
            'Yes. Much of Coral Springs is under an association with rules about what a window shows from the street, and we pick a frame and backing that meets the requirement before anything is ordered.',
        },
      ],
    },
    {
      slug: 'blinds-parkland-florida',
      path: '/blinds-parkland-florida',
      seoTitle: 'Parkland Blinds, Window Treatments, & Plantation Shutters',
      service: 'blinds',
      area: 'parkland',
      city: 'Parkland',
      term: 'Blinds and Window Treatments',
      h1: 'Blinds and Window Treatments in Parkland, Florida',
      faqs: [
        {
          q: 'What blinds work on Parkland\'s tall windows?',
          a:
            'On anything above the first floor, motorized is the practical answer, because a two-story entry window is not somewhere to be handling a wand or a cord. On normal openings, wood and faux wood horizontals are the common choice.',
        },
        {
          q: 'Can you match blinds across a large Parkland house?',
          a:
            'Yes, and on a house this size it is the right way to buy. One measure, one order, and the same material and color across every room, which is what makes a big house read as finished rather than assembled.',
        },
        {
          q: 'Do Parkland HOAs restrict window treatments?',
          a:
            'Many communities review what is visible from the street. We note the requirement at the consultation and choose a product and backing that satisfies it, so nothing has to come back down.',
        },
        {
          q: 'Is the Parkland consultation free?',
          a:
            'Yes. We come to you, measure every opening, and bring samples so you can see the materials in the room. You get an estimate from that visit at no charge.',
        },
      ],
    },
    {
      slug: 'electric-blinds-coral-springs',
      path: '/electric-blinds-coral-springs',
      seoTitle: 'Electric Blinds in Coral Springs | Prestige Blinds',
      service: 'motorized-blinds',
      area: null,
      city: 'Coral Springs',
      term: 'Electric Blinds',
      h1: 'Electric Blinds in Coral Springs, Florida',
      faqs: [
        {
          q: 'What is the difference between electric and motorized blinds?',
          a:
            'Nothing. Electric blinds, motorized blinds, and remote-controlled blinds all describe the same thing: a blind or shade with a motor in the headrail instead of a cord.',
        },
        {
          q: 'How are electric blinds powered?',
          a:
            'A rechargeable battery motor, which needs no wiring, or a hardwired motor that runs off the electrical system. Which one suits depends on the window rather than on preference, and we go through that on site.',
        },
        {
          q: 'Can they run on a schedule?',
          a:
            'Yes. Through a smart home system you can set them to open and close at set times, which helps with heat in a west-facing room and gives an occupied look when nobody is home.',
        },
        {
          q: 'Which Coral Springs windows are worth motorizing?',
          a:
            'Two-story entry windows, anything above a staircase, skylights, wide sliders onto the patio, and media rooms. Anywhere you would otherwise be reaching for a cord several times a day is a good candidate.',
        },
      ],
    },
    {
      slug: 'electric-blinds-parkland',
      path: '/electric-blinds-parkland',
      seoTitle: 'Electric Blinds in Parkland | Prestige Blinds',
      service: 'motorized-blinds',
      area: 'parkland',
      city: 'Parkland',
      term: 'Electric Blinds',
      h1: 'Electric Blinds in Parkland, Florida',
      faqs: [
        {
          q: 'Why do Parkland homes end up motorized so often?',
          a:
            'Because of the ceiling heights. Parkland houses are built on large lots with two-story entries and tall great-room glass, and those are the windows nobody adjusts by hand twice a day.',
        },
        {
          q: 'Do electric blinds work with Alexa or Google Assistant?',
          a:
            'Yes. They can run from a remote, a wall switch, or a phone app, and they can be added to a smart home system so voice control sits alongside the lights and the thermostat.',
        },
        {
          q: 'Battery or hardwired in a Parkland house?',
          a:
            'Battery suits a window that is hard to open up, and hardwired suits new construction or a remodel where the wiring is already accessible. We look at the opening and tell you which is sensible.',
        },
        {
          q: 'Are motorized blinds safer with children and pets?',
          a:
            'There is no hanging cord to pull, which removes a hazard. That is one of the more common reasons families here move to motorized.',
        },
      ],
    },
    {
      slug: 'plantation-shutters-coral-springs-florida',
      path: '/plantation-shutters-coral-springs-florida',
      seoTitle: 'Plantation Shutters in Coral Springs, Florida',
      service: 'plantation-shutters',
      area: null,
      city: 'Coral Springs',
      term: 'Plantation Shutters',
      h1: 'Plantation Shutters in Coral Springs, Florida',
      faqs: [
        {
          q: 'Which shutter material suits Coral Springs humidity?',
          a:
            'Vinyl and composite hold their shape in humidity and wipe clean, which is why they turn up in bathrooms, kitchens, and any window taking direct sun. Wood is the warmer-looking choice for rooms that stay dry and shaded.',
        },
        {
          q: 'Do plantation shutters help with the heat?',
          a:
            'They do. A closed shutter puts a solid layer between the glass and the room, which keeps a west-facing room noticeably cooler through the afternoon and takes load off the air conditioning.',
        },
        {
          q: 'What goes on the sliding doors?',
          a:
            'Panel track shutters. Broad panels slide along a track and stack to one side, so you keep the doorway usable and the view back when you want it.',
        },
        {
          q: 'How long do custom shutters take?',
          a:
            'They are made to your windows, so the lead time depends on the size of the order and the options. We measure at the free consultation and give you the schedule then, rather than guessing at it beforehand.',
        },
      ],
    },
    {
      slug: 'plantation-shutters-boca-raton',
      path: '/plantation-shutters-boca-raton',
      seoTitle: 'Plantation Shutters in Boca Raton, Florida',
      service: 'plantation-shutters',
      area: 'boca-raton',
      city: 'Boca Raton',
      term: 'Plantation Shutters',
      h1: 'Plantation Shutters in Boca Raton',
      faqs: [
        {
          q: 'Do plantation shutters suit Boca Raton architecture?',
          a:
            'Very well. The Mediterranean Revival and mid-century houses inland have the window proportions that suit shutters, and a framed shutter finishes an arched or specialty opening in a way a soft treatment cannot.',
        },
        {
          q: 'Can you shutter an arched or specialty window?',
          a:
            'Yes. Shutters are made to the opening, so arches, angles, and specialty shapes are a normal order rather than a special one. We template the shape on site at the consultation.',
        },
        {
          q: 'Do you install shutters in Boca Raton condos?',
          a:
            'Yes. Associations often specify what the window reads like from outside, usually a white or off-white face, and we pick a frame and color that meets the rule while the inside still suits your room.',
        },
        {
          q: 'What does a Boca Raton shutter job cost?',
          a:
            'It depends on the number of windows, the material, and the options, so we quote after the free in-home consultation rather than over the phone. Same-day estimates are standard.',
        },
      ],
    },
    {
      slug: 'plantation-shutters-parkland-florida',
      path: '/plantation-shutters-parkland-florida',
      seoTitle: 'Plantation Shutters in Parkland, Florida',
      service: 'plantation-shutters',
      area: 'parkland',
      city: 'Parkland',
      term: 'Plantation Shutters',
      h1: 'Plantation Shutters in Parkland, Florida',
      faqs: [
        {
          q: 'What shutter style suits a newer Parkland house?',
          a:
            'Hidden tilt, usually. There is no center rod down the panel, so the face stays clean and the louver spacing stays even, which suits the newer architecture out here better than a traditional rod does.',
        },
        {
          q: 'Can shutters go on a two-story entry window?',
          a:
            'Yes, and they are a good answer there because once set they rarely need adjusting. Where you do want daily control at that height, we pair shutters below with a motorized shade above.',
        },
        {
          q: 'Will shutters pass Parkland community review?',
          a:
            'In nearly every case, because a white or off-white shutter is what most communities already expect. We confirm the requirement at the consultation and pick a frame and color that meets it.',
        },
        {
          q: 'Do you measure before quoting?',
          a:
            'Always. Shutters are built to the opening and Parkland houses have very few standard sizes, so a quote without a measure is a guess. The measure and the estimate are both free.',
        },
      ],
    },
  ],

  hours: [
    { day: 'Monday', open: '09:00', close: '18:00' },
    { day: 'Tuesday', open: '09:00', close: '18:00' },
    { day: 'Wednesday', open: '09:00', close: '18:00' },
    { day: 'Thursday', open: '09:00', close: '18:00' },
    { day: 'Friday', open: '09:00', close: '18:00' },
    { day: 'Saturday', open: '09:00', close: '18:00' },
  ],

  yearsInBusiness: 20,
  licenseNumber: null,
  insured: null,

  // Intentionally empty. Review and aggregateRating schema render from this
  // array, and the quotes carried over from the client's own site have no
  // rating and no source URL. They render visibly from `testimonials` instead.
  reviews: [],

  profiles: {
    gbp: 'https://www.google.com/maps?cid=1258823617679300456',
    facebook: 'https://www.facebook.com/prestigeblind100/',
    instagram: 'https://www.instagram.com/prestige.blinds/',
    yelp: 'https://www.yelp.com/biz/prestige-blinds-davie-2',
    angi: 'https://www.angi.com/companylist/us/fl/fort-lauderdale/prestige-blinds-llc-reviews-6281682.htm',
  },

  // The client's own review shortlink, published on his current site.
  reviewLink: 'https://reviewthis.biz/Prestigeblinds',

  faqs: [
    {
      q: 'What window treatments do you install?',
      a: 'Plantation shutters, motorized shades, zebra shades, roller and Roman shades, blinds, and custom drapery. Everything is measured, made to order, and installed by our own team.',
    },
    {
      q: 'Is the in-home consultation free?',
      a: 'Yes. We come to you, measure the windows, and show you materials and finishes in the room they are going into, under the light they will actually sit in. There is no charge for that visit.',
    },
    {
      q: 'How quickly can you get this done?',
      a: 'We offer same-day estimates, with same-day installation available. Custom shutters and special orders are made to your windows, so those take longer, and we give you the timeline at the consultation.',
    },
    {
      q: 'Which areas do you cover?',
      a: 'Anywhere within fifty miles of Coral Springs. That takes in most of Broward County, Palm Beach County down through Boca Raton and Delray Beach, and the northern end of Miami-Dade.',
    },
    {
      q: 'Do you work on commercial properties as well as homes?',
      a: 'Yes, both. The range runs from shades for a single apartment to commercial and hospitality window coverings, and the process is the same at either end.',
    },
    {
      q: 'Which brands do you carry?',
      a: 'We work with trusted brands including Norman and Lafayette. We bring samples to the consultation so you can compare materials and finishes side by side before anything is ordered.',
    },
    {
      q: 'How are motorized shades controlled?',
      a: 'From a remote, a wall switch, a phone app, or a smart home system with voice control. The motors are either rechargeable battery or hardwired, and we fit and program them as part of the job.',
    },
    {
      q: 'Do you have any offers running?',
      a: 'Yes, there is a standing offer on shades: order ten shades and get one free. The details are on the offer band on this page, and you mention it when you book your free in-home consultation.',
    },
    {
      q: 'How do I get started?',
      a: 'Call us, or send the contact form on this site with a note about how many windows you have and what you are thinking. We will set up the free in-home consultation from there.',
    },
    {
      q: 'When are you open?',
      a: 'Monday through Saturday, nine in the morning to six in the evening, Eastern time. We are closed on Sunday. Send the contact form outside those hours and we will pick it up the next working day.',
    },
  ],

  images: {
    // First slide, and the frame scripts/contrast-check.ts measures.
    hero: 'stock-hero-shutters.jpg',
    about: 'prestige-blinds-team.jpg',
    gallery: [
      'solar-screen-shade-lanai.jpg',
      'plantation-shutters-pool-view.jpg',
      'crew-installing-shutters.jpg',
      'zebra-shades-dining-window.jpg',
      'sheer-shades-dining-room.jpg',
      'light-filtering-shades-pair.jpg',
      'motorized-patio-screen.jpg',
      'wood-blinds-closeup.jpg',
      'sheer-shades-yacht-salon.jpg',
    ],
    heroVideo: null,
    // Crossfading hero, mirroring the three-slide slider on the current site.
    // The first entry is `hero` above: the frame rendered server-side.
    //
    // These three are licensed stock, and the only stock anywhere on the site.
    // The hero is the one place that is drawn full-bleed, so on a 1920 screen
    // at devicePixelRatio 2 it needs 3840 device pixels across. The client's
    // own photographs are 1024 to 1290 wide copies pulled off his current
    // WordPress site, which the pipeline could only emit at 1024w: that is a
    // 3.75x upscale, and it looked it. Every one of them is still on the site,
    // on its product tile, in the gallery and on About; none was removed.
    //
    // Swap these back out the moment the client sends original job photos.
    // STOCK-PHOTOS.md carries the source and photographer for each one, and
    // the client questions file asks him for the originals as its first item.
    heroSlides: ['stock-hero-shutters.jpg', 'stock-hero-shades.jpg', 'stock-hero-drapery.jpg'],
  },

  offer: {
    headline: 'Buy 10 Shades, Get 1 Free',
    detail: 'Order ten shades and get one free. Mention this offer when you book your free in-home consultation.',
    finePrint: null,
  },

  contactForm: {
    splitName: false,
    address: 'off',
    zip: 'optional',
    serviceDropdown: true,
    emailRequired: false,
    timeframe: {
      label: 'When do you want them installed?',
      options: ['As soon as possible', 'Within a month', 'Just getting prices'],
      required: false,
    },
    messageLabel: 'Tell us about your windows',
    messagePlaceholder:
      'How many windows, which rooms, and what you have in mind: shutters, shades, blinds, or drapery.',
    submitLabel: 'Request My Free Consultation',
  },

  coverage: [
    {
      county: 'Broward County',
      towns: [
        'Coral Springs',
        'Parkland',
        'Coconut Creek',
        'Margate',
        'Tamarac',
        'North Lauderdale',
        'Deerfield Beach',
        'Pompano Beach',
        'Lighthouse Point',
        'Lauderdale-by-the-Sea',
        'Oakland Park',
        'Wilton Manors',
        'Fort Lauderdale',
        'Lauderhill',
        'Sunrise',
        'Plantation',
        'Davie',
        'Weston',
        'Southwest Ranches',
        'Cooper City',
        'Pembroke Pines',
        'Miramar',
        'Hollywood',
        'Dania Beach',
        'Hallandale Beach',
      ],
    },
    {
      county: 'Palm Beach County',
      towns: [
        'Boca Raton',
        'Highland Beach',
        'Delray Beach',
        'Boynton Beach',
        'Lake Worth Beach',
        'Wellington',
        'Royal Palm Beach',
        'West Palm Beach',
        'Palm Beach',
        'Palm Beach Gardens',
        'Jupiter',
      ],
    },
    {
      county: 'Miami-Dade County',
      towns: [
        'Aventura',
        'Sunny Isles Beach',
        'North Miami Beach',
        'North Miami',
        'Miami Gardens',
        'Miami Lakes',
        'Hialeah',
        'Doral',
        'Miami',
        'Miami Beach',
        'Coral Gables',
      ],
    },
  ],

  testimonials: [
    {
      quote:
        'Ronnie was such a pleasure to work with! Excellent prices, wonderful customer service and super helpful! We didn’t know much about what we wanted and he was very patient and accommodating to our specific requests with zebra blinds downstairs and honeycomb shades upstairs! Very happy with our purchase!',
      name: 'C. Butler',
    },
    {
      quote:
        'My blinds look amazing! Was hesitant to go with Ronnie’s recommendation of streamline blinds, so glad I listened to him!! Looks like a brand new room! Beautiful job I highly recommend!!!!',
      name: 'T. Fathers',
    },
    {
      quote:
        'I had Prestige blinds installed done by Ronny and crew. They were clean and did a great job. I did allure shades and it came out awesome! He will give you opition for your home design. Thank so much.',
      name: 'B. Lakhani',
    },
    {
      quote:
        'Ronny at Prestige Blinds delivered! Not just on time but also with a beautiful product. My wife and I are so happy with our Plantation Shutters! Great job by this company. Would definitely recommend!',
      name: 'J. Figueroa',
    },
    {
      quote:
        'We called Prestige Blinds for our large four panel sliding glass door. The shades they installed are amazing. Love the style, color, easy to use. They installed them quickly and did not leave any mess behind. Would highly recommend them and will use again for our next home project! Thank you Prestige Blinds!',
      name: 'A. Morrill',
    },
  ],

  // Pre-launch: noindex everywhere and robots.txt disallows all.
  // Flip to false at launch, then redeploy.
  prelaunch: true,

  domain: 'https://www.prestigeblindsfl.com',
} satisfies SiteConfigInput

export default siteConfig
```

## 3. Alt-text spot checks

Not applicable. No images or alts were touched in this domain-only update.

## 4. Design direction

Unchanged. This run did no design work, as instructed.

## 5. Templated-looking things

Not applicable. This was a domain-only change with no design or content edits, so there was no self-check of the design.

## 6. UNRESOLVED

- The domain in `BRIEF.md` (`prestigewoodblinds.com`) disagrees with `INSTRUCTIONS.md` (`prestigeblindsfl.com`). I followed the instructions. The brief needs correcting at its source.
- DNS for `www.prestigeblindsfl.com` and redirects from `prestigewoodblinds.com` are outside this repo and are not set up here. The apex→www redirect is a hosting/DNS setting.
- No change to the existing UNRESOLVED facts from the original build.

## 7. INVENTED

Nothing. I made no fact-bearing change other than the domain the instructions supplied.

## 8. Template issues

None found in this run. The domain flows entirely from `config.domain`, so this change needed exactly one line.
