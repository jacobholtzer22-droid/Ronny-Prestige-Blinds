import { config, formatTime } from '@/lib/config'
import { routeEntries } from '@/lib/routes'

export const dynamic = 'force-static'

/** Plain-text summary for LLM crawlers, generated from config. */
export function GET() {
  const c = config
  const url = (path: string) => new URL(path, c.domain).toString()
  const lines: string[] = [
    `# ${c.displayName}`,
    '',
    `> ${c.tagline}`,
    '',
    `${c.legalName} provides ${c.services.map((s) => s.name.toLowerCase()).join(', ')} in ${c.primaryCity}, ${c.primaryState} and surrounding areas.`,
    '',
    '## Contact',
    `- Phone: ${c.phoneDisplay}`,
    ...(c.email ? [`- Email: ${c.email}`] : []),
    ...(c.address ? [`- Address: ${c.address.street}, ${c.address.city}, ${c.address.state} ${c.address.zip}`] : []),
    `- Website: ${c.domain}`,
    `- Contact page: ${url('/contact')}`,
    '',
    '## Services',
    ...c.services.map((s) => `- [${s.name}](${url(s.path)}): ${s.shortDescription}`),
    '',
    '## Products',
    ...c.products.map((p) => `- [${p.name}](${url(p.path)}): ${p.shortDescription}`),
    '',
    '## Service areas',
    ...c.serviceAreas.map((a) => `- [${a.name}, ${c.primaryState}](${url(a.path)})`),
    ...c.counties.map((x) => `- [${x.name}](${url(x.path)})`),
  ]
  if (c.hours) {
    lines.push('', '## Hours', ...c.hours.map((h) => `- ${h.day}: ${formatTime(h.open)} to ${formatTime(h.close)}`))
  }
  const facts: string[] = []
  if (c.yearsInBusiness !== null) facts.push(`- Years in business: ${c.yearsInBusiness}`)
  if (c.insured === true) facts.push('- Insured: yes')
  if (c.licenseNumber) facts.push(`- License: ${c.licenseNumber}`)
  if (facts.length) lines.push('', '## Credentials', ...facts)
  lines.push('', '## Every page', ...routeEntries().map((r) => `- ${url(r.path)}`))
  lines.push('', `- [Sitemap](${url('/sitemap.xml')})`)

  return new Response(lines.join('\n') + '\n', {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
