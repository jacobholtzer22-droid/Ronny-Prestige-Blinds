import { config } from '@/lib/config'

/**
 * Every town the business travels to, grouped by county, as plain text. No
 * links: the eight service-area pages are the links, and turning a long town
 * list into pages is the doorway pattern that gets sites demoted.
 */
export default function CoverageList({ heading = 'Where We Install' }: { heading?: string }) {
  const coverage = config.coverage
  if (coverage.length === 0) return null
  return (
    <section className="mx-auto max-w-page px-4 py-16 sm:px-6 md:py-20">
      <h2 className="font-heading text-3xl font-bold text-primary-dark">{heading}</h2>
      <div className="mt-8 grid gap-8 md:grid-cols-3">
        {coverage.map((group) => (
          <div key={group.county}>
            <h3 className="font-heading text-lg font-semibold text-primary-dark">{group.county}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{group.towns.join(', ')}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
