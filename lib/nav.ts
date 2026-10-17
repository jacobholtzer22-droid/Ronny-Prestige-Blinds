import { config } from './config'

/**
 * The header and drawer menus, derived from the route registry so a page
 * cannot exist without being reachable, and a menu cannot point at a route
 * that was never built.
 */
export interface NavLink {
  href: string
  label: string
}
export interface NavGroup {
  label: string
  /** The group's own landing page, if it has one. */
  href: string | null
  items: NavLink[]
}

function svc(slug: string): NavLink | null {
  const s = config.services.find((x) => x.slug === slug)
  return s ? { href: s.path, label: s.name } : null
}
function prod(slug: string): NavLink | null {
  const p = config.products.find((x) => x.slug === slug)
  return p ? { href: p.path, label: p.name } : null
}
const keep = (xs: (NavLink | null)[]): NavLink[] => xs.filter((x): x is NavLink => x !== null)

export function navGroups(): NavGroup[] {
  const blinds = config.services.find((s) => s.slug === 'blinds')
  const shutters = config.services.find((s) => s.slug === 'plantation-shutters')
  const shades = config.services.find((s) => s.slug === 'shades')
  const drapery = config.services.find((s) => s.slug === 'drapery-services')

  return [
    {
      label: 'Blinds',
      href: blinds?.path ?? null,
      items: keep([svc('blinds'), svc('motorized-blinds')]),
    },
    {
      label: 'Shutters',
      href: shutters?.path ?? null,
      items: keep([svc('plantation-shutters'), prod('panel-track-shutters')]),
    },
    {
      label: 'Shades',
      href: shades?.path ?? null,
      items: keep([
        svc('shades'),
        prod('roller-shades'),
        prod('blackout-roller-shades'),
        svc('zebra-shades'),
        prod('roman-shades'),
        prod('tenera-sheer-shades'),
        prod('outdoor-patio-shades'),
      ]),
    },
    { label: 'Drapery', href: drapery?.path ?? null, items: [] },
    {
      label: 'Locations',
      href: '/areas',
      items: [
        ...config.serviceAreas.map((a) => ({ href: a.path, label: a.name })),
        ...config.counties.map((c) => ({ href: c.path, label: c.name })),
      ],
    },
    { label: 'Our Work', href: '/prestige-blinds-portfolio', items: [] },
    { label: 'About', href: '/about', items: [] },
    { label: 'Contact', href: '/contact', items: [] },
  ]
}
