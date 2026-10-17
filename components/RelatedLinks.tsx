import Link from 'next/link'
import RevealGrid from './RevealGrid'
import RevealHeading from './RevealHeading'

export interface RelatedLink {
  href: string
  label: string
  note?: string
}

/**
 * The "where to go next" block at the foot of a service, product, local or
 * area page. Every page carries one, which is what keeps the internal link
 * graph connected rather than leaving leaf pages orphaned.
 */
export default function RelatedLinks({
  heading = 'Related pages',
  eyebrow = 'Keep looking',
  links,
}: {
  heading?: string
  eyebrow?: string
  links: RelatedLink[]
}) {
  if (links.length === 0) return null
  return (
    <section className="mx-auto max-w-page px-4 py-12 sm:px-6 md:py-16">
      <RevealHeading eyebrow={eyebrow} headingClassName="mt-4 font-heading text-3xl font-bold text-primary-dark">
        {heading}
      </RevealHeading>
      <RevealGrid as="ul" itemAs="li" className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="m-card block h-full rounded-site border border-line bg-surface p-5"
          >
            <span className="font-heading text-lg font-semibold text-primary-dark">{l.label}</span>
            {l.note && <span className="mt-1 block text-sm leading-relaxed text-muted">{l.note}</span>}
          </Link>
        ))}
      </RevealGrid>
    </section>
  )
}
