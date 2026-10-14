import { config } from '@/lib/config'

/**
 * Customer quotes, shown and nothing more. No stars, no avatars, no platform
 * logos, and no JSON-LD: these come from the client's own site without a
 * rating or a source URL, so claiming a rating in schema would be a fabrication.
 * config.reviews stays empty, which is what lib/schema.ts keys Review markup on.
 *
 * The attribution sits OUTSIDE the <blockquote>, which is what the HTML spec
 * asks for: a blockquote is the quoted text, and nothing else.
 */
export default function Testimonials({ heading = 'What Customers Say' }: { heading?: string }) {
  const testimonials = config.testimonials
  if (testimonials.length === 0) return null
  return (
    <section className="mx-auto max-w-page px-4 py-16 sm:px-6 md:py-24">
      <h2 className="font-heading text-3xl font-bold text-primary-dark">{heading}</h2>
      <div className="mt-10 grid gap-x-10 gap-y-10 md:grid-cols-2">
        {testimonials.map((t) => (
          <div key={t.name} className="border-l-2 border-accent pl-5">
            <blockquote>
              <p className="font-heading text-lg leading-relaxed text-ink">{t.quote}</p>
            </blockquote>
            <footer className="mt-3 text-sm font-semibold uppercase tracking-wider text-muted">{t.name}</footer>
          </div>
        ))}
      </div>
    </section>
  )
}
