import { config } from './config'
import type { County, LocalPage, Product, Service, ServiceArea } from './config-schema'

/**
 * THE ROUTE REGISTRY. Every public route on the site is derived here, from the
 * `path` fields authored in site.config.ts.
 *
 * The old WordPress site's URLs are the canonical ones: a service lives at
 * /plantation-shutters, not /services/plantation-shutters, because that is the
 * URL Google has indexed. app/[...slug]/page.tsx resolves a request against
 * this registry, and sitemap.ts, llms.txt, the header nav, and verify checks 16
 * and 17 all read the same list, so none of them can drift from what is built.
 */

export type RouteKind =
  | 'home'
  | 'hub'
  | 'service'
  | 'product'
  | 'local'
  | 'area'
  | 'county'
  | 'areas'
  | 'portfolio'
  | 'about'
  | 'contact'
  | 'privacy'
  | 'thankyou'

export interface RouteEntry {
  path: string
  kind: RouteKind
  slug: string | null
}

/** Routes rendered by their own app/ folder, not by the catch-all. */
export const FIXED_ROUTES: RouteEntry[] = [
  { path: '/', kind: 'home', slug: null },
  { path: '/about', kind: 'about', slug: null },
  { path: '/contact', kind: 'contact', slug: null },
  { path: '/privacy-policy', kind: 'privacy', slug: null },
]

/** Routes the catch-all renders. Order is the order the sitemap lists them. */
export function dynamicRoutes(): RouteEntry[] {
  return [
    { path: '/custom-window-treatments', kind: 'hub', slug: null },
    ...config.services.map((s): RouteEntry => ({ path: s.path, kind: 'service', slug: s.slug })),
    ...config.products.map((p): RouteEntry => ({ path: p.path, kind: 'product', slug: p.slug })),
    ...config.localPages.map((l): RouteEntry => ({ path: l.path, kind: 'local', slug: l.slug })),
    { path: '/areas', kind: 'areas', slug: null },
    ...config.serviceAreas.map((a): RouteEntry => ({ path: a.path, kind: 'area', slug: a.slug })),
    ...config.counties.map((c): RouteEntry => ({ path: c.path, kind: 'county', slug: c.slug })),
    { path: '/prestige-blinds-portfolio', kind: 'portfolio', slug: null },
    { path: '/thank-you', kind: 'thankyou', slug: null },
  ]
}

export function routeEntries(): RouteEntry[] {
  return [...FIXED_ROUTES, ...dynamicRoutes()]
}

export function allRoutes(): string[] {
  return routeEntries().map((r) => r.path)
}

/** `/a/b` -> `['a','b']`, for generateStaticParams on the catch-all. */
export function pathToSegments(path: string): string[] {
  return path.replace(/^\//, '').split('/')
}

export function findDynamicRoute(segments: string[]): RouteEntry | null {
  const path = '/' + segments.join('/')
  return dynamicRoutes().find((r) => r.path === path) ?? null
}

/**
 * Pages that carry a noindex meta tag. They stay in the sitemap because verify
 * check 16 requires the sitemap and the built routes to match exactly, and the
 * meta tag is what actually keeps them out of an index.
 */
export const NOINDEX_PATHS = new Set<string>(['/thank-you'])

export function sitemapRoutes(): string[] {
  return allRoutes()
}

// ---------- lookups used by the page templates ----------

export function serviceByPath(path: string): Service | null {
  return config.services.find((s) => s.path === path) ?? null
}
export function productsOf(serviceSlug: string): Product[] {
  return config.products.filter((p) => p.parent === serviceSlug)
}
export function parentOf(product: Product): Service | null {
  return config.services.find((s) => s.slug === product.parent) ?? null
}
export function siblingsOf(product: Product): Product[] {
  return config.products.filter((p) => p.parent === product.parent && p.slug !== product.slug)
}
export function localPagesOf(serviceSlug: string): LocalPage[] {
  return config.localPages.filter((l) => l.service === serviceSlug)
}
export function areasOf(countySlug: string): ServiceArea[] {
  return config.serviceAreas.filter((a) => a.countySlug === countySlug)
}
export function countyOf(area: ServiceArea): County | null {
  return config.counties.find((c) => c.slug === area.countySlug) ?? null
}
