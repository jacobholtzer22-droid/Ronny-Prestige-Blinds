import { config } from '@/lib/config'
import { heroScrimCss } from '@/lib/hero-scrim'
import { getImage, hasImage } from '@/lib/images'
import Button from './Button'
import Em from './Em'
import HeroSlideshow, { type HeroSlide } from './HeroSlideshow'
import HeroWords from './HeroWords'
import Phone from './Phone'

/**
 * Homepage hero. Owns the page's single <h1>.
 *
 * Mirrors the current site: full-bleed photography under a dark scrim, with
 * the eyebrow, headline, supporting line and two pill buttons stacked at the
 * lower left. The layer order and timing follow the old slider's: the eyebrow
 * slides in from the left, the headline's words rise one at a time from
 * behind their own baseline, then the supporting line, then the buttons, then
 * the scroll cue.
 *
 * All of it is CSS animation with `backwards` fill, declared in
 * app/globals.css against the tokens in lib/motion.ts. That means the whole
 * sequence runs on the server-rendered markup at first paint, with no flash
 * of an empty hero and nothing waiting on hydration.
 * components/HeroSlideshow.tsx remounts this block on a slide change, which
 * is what replays it.
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
      <div className="relative z-10 mx-auto w-full max-w-page px-4 pb-24 pt-36 sm:px-6 md:pb-32">
        <p className="hero-eyebrow text-xs font-semibold uppercase tracking-[0.2em] text-on-primary/85">
          {config.primaryCity} &middot; Broward &middot; Palm Beach
        </p>
        <h1 className="mt-5 max-w-4xl font-heading text-hero font-bold">
          <HeroWords>
            Custom Window Treatments, <Em>Installed</Em> Right
          </HeroWords>
        </h1>
        <p className="hero-tagline mt-6 max-w-2xl text-lg text-on-primary/90 md:text-xl">
          {config.tagline}
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-4">
          <span className="hero-cta-1 inline-flex">
            <Button href="/contact#contact-form">Book a Free In-Home Consultation</Button>
          </span>
          <span className="hero-cta-2 inline-flex">
            <Button href="/prestige-blinds-portfolio" variant="secondary" tone="dark">
              See Our Work
            </Button>
          </span>
          <span className="hero-cta-3 text-base text-on-primary/90">
            or call <Phone className="text-on-primary" />
          </span>
        </div>
      </div>

      {/* Scroll cue. Decorative: the page is navigable without it, and the
          nav and the copy above already say what this page is. */}
      <span
        aria-hidden="true"
        className="hero-cue absolute bottom-16 right-6 z-10 hidden flex-col items-center gap-2 text-[0.6rem] uppercase tracking-[0.25em] text-on-primary/70 md:flex"
      >
        Scroll
        <span className="hero-cue-line block h-8 w-px bg-on-primary/70" />
      </span>
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
