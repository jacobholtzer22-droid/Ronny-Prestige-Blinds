import Link from 'next/link'
import { config } from '@/lib/config'

/**
 * The standing offer. Renders nothing when config.offer is null, so a site
 * without a promotion has no empty band. The offer figure lives in config and
 * never in MDX, which is what keeps verify check 7 clean.
 */
export default function PromoBand() {
  const offer = config.offer
  if (!offer) return null
  return (
    <section className="border-y border-line bg-primary-soft">
      <div className="mx-auto flex max-w-page flex-col items-start gap-6 px-4 py-14 sm:px-6 md:flex-row md:items-center md:justify-between md:py-16">
        <div className="max-w-2xl">
          <h2 className="font-heading text-2xl font-bold text-primary-dark md:text-3xl">{offer.headline}</h2>
          <p className="mt-3 text-base leading-relaxed text-ink">{offer.detail}</p>
          {offer.finePrint && <p className="mt-2 text-sm text-muted">{offer.finePrint}</p>}
        </div>
        <Link
          href="/contact#contact-form"
          className="rounded-full bg-accent px-6 py-3.5 text-base font-semibold text-on-accent hover:bg-accent-dark"
        >
          Claim This Offer
        </Link>
      </div>
    </section>
  )
}
