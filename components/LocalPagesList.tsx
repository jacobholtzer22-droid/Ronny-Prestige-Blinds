import Link from 'next/link'
import { config } from '@/lib/config'
import Eyebrow from './Eyebrow'
import Reveal from './Reveal'

/**
 * The service-plus-city pages, listed where people and crawlers can actually
 * reach them. Without this block the Coral Springs ones are reachable from
 * their parent service alone, because the primary city has no area page of
 * its own to link them from.
 */
export default function LocalPagesList({ heading = 'Service and city pages' }: { heading?: string }) {
  const pages = config.localPages
  if (pages.length === 0) return null
  return (
    <section className="mx-auto max-w-page px-4 py-12 sm:px-6 md:py-16">
      <Reveal>
        <Eyebrow>By service and city</Eyebrow>
        <h2 className="mt-4 font-heading text-3xl font-bold text-primary-dark">{heading}</h2>
      </Reveal>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {pages.map((l, i) => (
          <Reveal as="li" key={l.path} stagger={i}>
            <Link
              href={l.path}
              className="block h-full rounded-site border border-line bg-surface p-5 transition-colors hover:border-primary"
            >
              <span className="font-heading text-lg font-semibold text-primary-dark">
                {l.term} in {l.city}
              </span>
            </Link>
          </Reveal>
        ))}
      </ul>
    </section>
  )
}
