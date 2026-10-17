import rawConfig from '@/site.config'
import { deriveConfig, siteConfigSchema, type SiteConfig } from './config-schema'

export { CONTACT_ENDPOINT, HONEYPOT_FIELD } from './config-schema'
export type { County, Faq, LocalPage, Product, Review, Service, ServiceArea, SiteConfig } from './config-schema'

function parseOrThrow(): SiteConfig {
  const result = siteConfigSchema.safeParse(rawConfig)
  if (!result.success) {
    const lines = result.error.issues.map((i) => `  - ${i.path.join('.') || '(root)'}: ${i.message}`)
    throw new Error(`site.config.ts failed validation:\n${lines.join('\n')}`)
  }
  return deriveConfig(result.data)
}

/**
 * The validated, typed config. Parsed once at module load: an invalid
 * site.config.ts throws here and fails `next build` before any page renders.
 */
export const config: SiteConfig = parseOrThrow()

export function getService(slug: string) {
  return config.services.find((s) => s.slug === slug) ?? null
}

export function getArea(slug: string) {
  return config.serviceAreas.find((a) => a.slug === slug) ?? null
}

export function getProduct(slug: string) {
  return config.products.find((p) => p.slug === slug) ?? null
}

export function getLocalPage(slug: string) {
  return config.localPages.find((l) => l.slug === slug) ?? null
}

export function getCounty(slug: string) {
  return config.counties.find((c) => c.slug === slug) ?? null
}

/** Minutes-since-midnight "HH:MM" -> "8:00 AM". */
export function formatTime(hhmm: string): string {
  const [h = 0, m = 0] = hhmm.split(':').map(Number)
  const suffix = h >= 12 ? 'PM' : 'AM'
  const hour12 = h % 12 === 0 ? 12 : h % 12
  return `${hour12}:${String(m).padStart(2, '0')} ${suffix}`
}

const DAY_ABBR: Record<string, string> = {
  Monday: 'Mon',
  Tuesday: 'Tue',
  Wednesday: 'Wed',
  Thursday: 'Thu',
  Friday: 'Fri',
  Saturday: 'Sat',
  Sunday: 'Sun',
}

/** "09:00" -> "9am", "18:30" -> "6:30pm". For the compact header line only. */
function shortTime(hhmm: string): string {
  const [h = 0, m = 0] = hhmm.split(':').map(Number)
  const suffix = h >= 12 ? 'pm' : 'am'
  const hour12 = h % 12 === 0 ? 12 : h % 12
  return m === 0 ? `${hour12}${suffix}` : `${hour12}:${String(m).padStart(2, '0')}${suffix}`
}

/**
 * One line of opening hours for the header, derived from config.hours:
 * "Mon to Sat 9am to 6pm". Consecutive days that share the same hours are
 * collapsed into a range; anything irregular falls back to listing the groups.
 * Returns null when hours are unknown, so the line simply does not render.
 */
export function hoursSummary(): string | null {
  const hours = config.hours
  if (!hours || hours.length === 0) return null
  const groups: { days: string[]; open: string; close: string }[] = []
  for (const h of hours) {
    const last = groups.at(-1)
    if (last && last.open === h.open && last.close === h.close) last.days.push(h.day)
    else groups.push({ days: [h.day], open: h.open, close: h.close })
  }
  return groups
    .map((g) => {
      const first = DAY_ABBR[g.days[0] ?? ''] ?? g.days[0]
      const last = DAY_ABBR[g.days.at(-1) ?? ''] ?? g.days.at(-1)
      const span = g.days.length > 1 ? `${first} to ${last}` : first
      return `${span} ${shortTime(g.open)} to ${shortTime(g.close)}`
    })
    .join(', ')
}
