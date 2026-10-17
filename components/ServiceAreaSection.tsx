import Link from 'next/link'
import { config } from '@/lib/config'
import Button from './Button'
import Em from './Em'
import Eyebrow from './Eyebrow'
import MapEmbed from './MapEmbed'
import Reveal from './Reveal'

/**
 * Where we work, as links rather than a wall of plain text, plus the office on
 * a map. Every city here has its own page; the two counties do too.
 */
export default function ServiceAreaSection() {
  const links = [
    ...config.serviceAreas.map((a) => ({ href: a.path, label: a.name })),
    ...config.counties.map((c) => ({ href: c.path, label: c.name })),
  ]
  return (
    <section className="mx-auto max-w-page px-4 py-20 sm:px-6 md:py-28">
      <div className="grid gap-12 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <Reveal>
            <Eyebrow>Service area</Eyebrow>
            <h2 className="mt-4 font-heading text-3xl font-bold text-primary-dark md:text-4xl">
              Serving <Em>Broward</Em> and Palm Beach
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
              We install anywhere within fifty miles of our {config.primaryCity} office, which covers most of Broward
              County, Palm Beach County down through Boca Raton and Delray Beach, and the northern end of Miami-Dade.
            </p>
          </Reveal>
          <ul className="mt-8 grid gap-x-6 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
            {links.map((l, i) => (
              <Reveal as="li" key={l.href} stagger={i}>
                <Link href={l.href} className="block py-1 text-base text-ink hover:text-primary">
                  {l.label}
                </Link>
              </Reveal>
            ))}
          </ul>
          <div className="mt-8">
            <Button href="/areas" variant="secondary">
              Find your city
            </Button>
          </div>
        </div>
        <Reveal className="lg:col-span-2">
          <MapEmbed />
        </Reveal>
      </div>
    </section>
  )
}
