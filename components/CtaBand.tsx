import Link from 'next/link'
import { config } from '@/lib/config'
import Phone from './Phone'
import RevealGrid from './RevealGrid'
import RevealHeading from './RevealHeading'

/**
 * The closing call to action. The heading's words rise, the line under it
 * follows, and the button lands last, so the band assembles toward the thing
 * it wants the visitor to press.
 */
export default function CtaBand({ heading }: { heading?: string }) {
  return (
    <section className="border-t-2 border-primary-dark bg-primary-soft">
      <RevealGrid className="mx-auto flex max-w-page flex-col items-start justify-between gap-8 px-4 py-16 sm:px-6 md:flex-row md:items-center md:py-24">
        <div>
          <RevealHeading headingClassName="font-heading text-3xl font-bold text-primary-dark md:text-4xl">
            {heading ?? 'Amazing windows are just a phone call away'}
          </RevealHeading>
          <p className="mt-3 text-base text-muted md:text-lg">
            Call <Phone className="text-primary-dark" /> or send a message and we will set up your free in-home consultation.
          </p>
        </div>
        <Link href="/contact#contact-form" className="m-btn rounded-full bg-accent px-6 py-3.5 text-base font-semibold text-on-accent hover:bg-accent-dark">
          Book a Free Consultation
        </Link>
      </RevealGrid>
    </section>
  )
}
