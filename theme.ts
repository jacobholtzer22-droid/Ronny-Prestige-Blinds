/**
 * Visual theme. This is the one file (with app/fonts.ts) where the agent has
 * real freedom: pick a direction, a palette, and a hero layout so two client
 * sites do not look like the same site with different words. No business facts
 * belong here.
 *
 * Rules the palette must satisfy (AGENT.md Phase 2c): one dark neutral, one
 * warm or cool off-white, exactly one accent used on under 5% of any page. No
 * pure #000000 or #FFFFFF. `onPrimary` sits on `primary`, `onAccent` on
 * `accent`, `ink` on `bg` and `surface`. One radius and one shadow for the
 * whole site; components read them as CSS variables and nothing else.
 */
export type HeroVariant = 'full-bleed' | 'split'

export interface Theme {
  /**
   * Header mark. null renders the wordmark built from config.displayName.
   * Set this to the client's logo when a transparent PNG or SVG arrives, and
   * the header swaps automatically. Files already sit in public/brand/.
   */
  logo: { src: string; alt: string } | null
  palette: {
    /** The dark neutral. Also the full-dark section background. */
    primary: string
    primaryDark: string
    primarySoft: string
    /** The single accent. Buttons, the call bar, small marks. Under 5% of any page. */
    accent: string
    accentDark: string
    /** The off-white page ground. */
    bg: string
    surface: string
    /** Body text. Never pure black. */
    ink: string
    muted: string
    line: string
    onPrimary: string
    onAccent: string
  }
  /**
   * 'full-bleed': client photo behind a dark scrim, headline and phone CTA
   * left-aligned in the lower third. Needs a photo that can carry it.
   * 'split': large photo one side, oversized type the other. For weaker photos.
   */
  heroVariant: HeroVariant
  /** The ONE corner radius for the site, in rem. 0 for hard edges. */
  radius: number
  /** The ONE shadow for the site, as a CSS box-shadow value. 'none' is valid. */
  shadow: string
}

// Prestige Blinds: "Cultivated" direction read through an interiors lens. The
// navy and red are sampled from the client's own logo (#202860 and #C02030),
// nudged for contrast; the ground is a warm off-white so photography carries
// the page. The red is the single accent and stays under 5% of any page.
const theme: Theme = {
  logo: null,
  palette: {
    primary: '#1B2A57',
    primaryDark: '#121C3C',
    primarySoft: '#E9ECF4',
    accent: '#B01F2E',
    accentDark: '#8C1823',
    bg: '#FAF8F4',
    surface: '#FEFDFB',
    ink: '#1B1F26',
    muted: '#5C6370',
    line: '#E2DED6',
    onPrimary: '#F7F7F5',
    onAccent: '#FDFBF9',
  },
  heroVariant: 'full-bleed',
  radius: 0.375,
  shadow: '0 1px 2px rgb(27 42 87 / 0.08)',
}

export default theme
