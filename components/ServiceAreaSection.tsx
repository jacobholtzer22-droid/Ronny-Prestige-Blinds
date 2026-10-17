import Link from 'next/link'
import { config } from '@/lib/config'
import Button from './Button'
import DrawLine from './DrawLine'
import Em from './Em'
import MapEmbed from './MapEmbed'
import Reveal from './Reveal'
import RevealGrid from './RevealGrid'
import RevealHeading from './RevealHeading'
import RevealText from './RevealText'

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
          <DrawLine className="mb-6" />
          <RevealHeading
            eyebrow="Service area"
            headingClassName="mt-4 font-heading text-3xl font-bold text-primary-dark md:text-4xl"
          >
            Serving <Em>Broward</Em> and Palm Beach
          </RevealHeading>
          <RevealText className="mt-4 max-w-xl text-base leading-relaxed text-muted" as="p">
            We install anywhere within fifty miles of our {config.primaryCity} office, which covers most of Broward
            County, Palm Beach County down through Boca Raton and Delray Beach, and the northern end of Miami-Dade.
          </RevealText>
          <RevealGrid
            as="ul"
            itemAs="li"
            className="mt-8 grid gap-x-6 gap-y-2 sm:grid-cols-2 lg:grid-cols-3"
          >
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="block py-1 text-base text-ink transition-colors hover:text-primary">
                {l.label}
              </Link>
            ))}
          </RevealGrid>
          <RevealText className="mt-8">
            <Button href="/areas" variant="secondary">
              Find your city
            </Button>
          </RevealText>
        </div>
        <Reveal className="lg:col-span-2">
          <MapEmbed />
        </Reveal>
      </div>
    </section>
  )
}
