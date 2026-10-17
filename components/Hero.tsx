import { config } from '@/lib/config'
import { heroScrimCss } from '@/lib/hero-scrim'
import { getImage, hasImage } from '@/lib/images'
import Button from './Button'
import Em from './Em'
import HeroSlideshow, { type HeroSlide } from './HeroSlideshow'
import Phone from './Phone'

/**
 * Homepage hero. Owns the page's single <h1>.
 *
 * Mirrors the current site: full-bleed photography under a dark scrim, with
 * the eyebrow, headline, supporting line and two pill buttons stacked at the
 * lower left and staggered in on load.
 *
 * The scrim comes from lib/hero-scrim.ts, which is also what
 * scripts/contrast-check.ts rebuilds, so the gradient a visitor sees and the
 * one the contrast gate measures cannot drift apart.
 */
export default function Hero() {
  const names = config.images.heroSlides.filter((n) => hasImage(n))
  const resolved: HeroSlide[] = names.map((n) => {
    const img = getImage(n)
    return { src: img.src, srcSet: img.srcSet, alt: img.alt, width: img.width, height: img.height }
  })

  const copy = (
    <>
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[1]"
        style={{ background: heroScrimCss() }}
      />
      <div className="hero-ready relative z-10 mx-auto w-full max-w-page px-4 pb-16 pt-36 sm:px-6 md:pb-28">
        <p className="hero-item text-xs font-semibold uppercase tracking-[0.2em] text-on-primary/85">
          {config.primaryCity} &middot; Broward &middot; Palm Beach
        </p>
        <h1 className="hero-item mt-5 max-w-4xl font-heading text-hero font-bold">
          Custom Window Treatments, <Em>Installed</Em> Right
        </h1>
        <p className="hero-item mt-6 max-w-2xl text-lg text-on-primary/90 md:text-xl">
          {config.tagline}
        </p>
        <div className="hero-item mt-9 flex flex-wrap items-center gap-x-5 gap-y-4">
          <Button href="/contact#contact-form">Book a Free In-Home Consultation</Button>
          <Button href="/prestige-blinds-portfolio" variant="secondary" tone="dark">
            See Our Work
          </Button>
          <span className="text-base text-on-primary/90">
            or call <Phone className="text-on-primary" />
          </span>
        </div>
      </div>
    </>
  )

  if (resolved.length === 0) {
    // No usable hero photograph: type on the dark ground rather than a gap.
    return (
      <section className="relative isolate flex min-h-[72vh] items-end overflow-hidden bg-primary-dark text-on-primary">
        {copy}
      </section>
    )
  }

  return <HeroSlideshow slides={resolved}>{copy}</HeroSlideshow>
}
