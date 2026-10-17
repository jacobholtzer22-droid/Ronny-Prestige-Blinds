/**
 * The client's public Instagram posts, embedded through Instagram's own
 * documented embed. No API token, no third-party widget, and nothing scraped:
 * the only thing stored here is the permalink.
 *
 * `topics` is only filled in where the post's subject is known. Instagram
 * captions are not readable without scraping, so the fourteen posts whose
 * subject was not supplied carry no topics and appear on the portfolio page
 * only. A service or product with no matching post simply shows no embeds.
 */
export interface InstagramPost {
  url: string
  /** Visible fallback text, used before the embed loads and if it never does. */
  label: string
  /** Service and product slugs this post illustrates. */
  topics: string[]
}

const IG = 'https://www.instagram.com'

export const INSTAGRAM_POSTS: InstagramPost[] = [
  { url: `${IG}/p/C7P3WOWJRPC/`, label: 'Plantation shutters on Instagram', topics: ['plantation-shutters'] },
  {
    url: `${IG}/reel/DAUK7YxpfB0/`,
    label: 'Motorized zebra shades on Instagram',
    topics: ['zebra-shades', 'motorized-blinds'],
  },
  { url: `${IG}/reel/C-dsW1SJJJI/`, label: 'Roller shades on Instagram', topics: ['roller-shades', 'shades'] },
  { url: `${IG}/reel/C74fXbQJpQK/`, label: 'Custom drapery on Instagram', topics: ['drapery-services'] },
  {
    url: `${IG}/reel/DArHDXfppOm/`,
    label: 'Patio screen shades on Instagram',
    topics: ['outdoor-patio-shades', 'shades'],
  },
  { url: `${IG}/p/C7P4OGBpVy0/`, label: 'French door shutters on Instagram', topics: ['plantation-shutters'] },
  {
    url: `${IG}/reel/DDIWiAxv8ux/`,
    label: 'A sheer shade on Instagram',
    topics: ['tenera-sheer-shades', 'shades'],
  },
  {
    url: `${IG}/reel/DBwfC3BJLj4/`,
    label: 'Sheer drapery over a blackout shade on Instagram',
    topics: ['drapery-services'],
  },
  { url: `${IG}/p/DArIpGDpfF3/`, label: 'Patio screen shades on Instagram', topics: ['outdoor-patio-shades'] },
  { url: `${IG}/reel/DAq9SBopYKf/`, label: 'Patio screen shades on Instagram', topics: ['outdoor-patio-shades'] },
  {
    url: `${IG}/reel/DAV1K1mpZSV/`,
    label: 'Three motorized zebra shades on Instagram',
    topics: [
      'motorized-blinds',
      'zebra-shades',
      'electric-blinds-coral-springs',
      'electric-blinds-parkland',
    ],
  },
  { url: `${IG}/p/C-5pyHTpvrw/`, label: 'Room darkening zebra shades on Instagram', topics: ['zebra-shades'] },
  {
    url: `${IG}/reel/C9FWwl-RMOI/`,
    label: 'Plantation shutters on Instagram',
    topics: [
      'plantation-shutters',
      'plantation-shutters-coral-springs-florida',
      'plantation-shutters-boca-raton',
      'plantation-shutters-parkland-florida',
    ],
  },
  {
    url: `${IG}/reel/C8fR9AcJban/`,
    label: 'A large motorized roller shade on Instagram',
    topics: ['roller-shades', 'motorized-blinds'],
  },
  {
    url: `${IG}/reel/C8XshEgJ-MN/`,
    label: 'A motorized cellular shade on Instagram',
    topics: ['motorized-blinds', 'shades'],
  },
  { url: `${IG}/p/C77WTflpypF/`, label: 'Drapery hardware on Instagram', topics: ['drapery-services'] },
  { url: `${IG}/reel/C72CZzZpoc3/`, label: 'Zebra shade fabric on Instagram', topics: ['zebra-shades'] },
  { url: `${IG}/reel/C7SWY1Np-tQ/`, label: 'Cellular shades on Instagram', topics: ['shades'] },
  {
    url: `${IG}/reel/C7P1-RupEce/`,
    label: 'Cellular shades on a sliding glass door on Instagram',
    topics: ['shades'],
  },
  {
    url: `${IG}/p/C6tb_hsAe4L/`,
    label: 'A double roller, screen plus blackout, on Instagram',
    topics: ['blackout-roller-shades', 'roller-shades'],
  },
]

export const INSTAGRAM_PROFILE = `${IG}/prestige.blinds/`
export const INSTAGRAM_HANDLE = '@prestige.blinds'

/** The six the homepage shows, in order. */
export const HOMEPAGE_POSTS: InstagramPost[] = INSTAGRAM_POSTS.slice(0, 6)

/** Up to two posts that illustrate a given service or product slug. */
export function postsFor(slug: string, limit = 2): InstagramPost[] {
  return INSTAGRAM_POSTS.filter((p) => p.topics.includes(slug)).slice(0, limit)
}
