import type { Faq } from '@/lib/config-schema'
import FaqItem from './FaqItem'
import RevealHeading from './RevealHeading'

/**
 * The questions rendered here are the same objects lib/schema.ts turns into
 * FAQPage markup, so visible content and schema cannot drift.
 *
 * Each row is a client component now, because an accordion that animates open
 * has to interpolate a height and a native <details> cannot. The row keeps
 * the <details>/<summary> pair underneath, so it is still a real disclosure
 * widget to a screen reader and still works with scripting off.
 */
export default function FaqAccordion({ faqs, heading = 'Frequently Asked Questions' }: { faqs: readonly Faq[]; heading?: string }) {
  if (faqs.length === 0) return null
  return (
    <section className="mx-auto max-w-page px-4 py-14 md:py-20 sm:px-6">
      <RevealHeading headingClassName="font-heading text-3xl font-bold text-primary-dark">
        {heading}
      </RevealHeading>
      <div className="mt-6 divide-y divide-line rounded-site border border-line bg-surface">
        {faqs.map((f) => (
          <FaqItem key={f.q} q={f.q} a={f.a} />
        ))}
      </div>
    </section>
  )
}
