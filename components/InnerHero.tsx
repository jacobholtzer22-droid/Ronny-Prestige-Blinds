import Link from 'next/link'
import type { ReactNode } from 'react'
import { config } from '@/lib/config'
import { heroScrimCss } from '@/lib/hero-scrim'
import { getImage, hasImage } from '@/lib/images'
import type { Crumb } from '@/lib/schema'
import Button from './Button'
import HeroWords from './HeroWords'
import ParallaxBg from './ParallaxBg'
import Phone from './Phone'

/**
 * Every page except the homepage opens with this: a photograph under the same
 * scrim as the hero, breadcrumbs, an eyebrow in the "SECTION / PAGE" pattern,
 * the page's single H1, one supporting line, and two pill buttons. Replaces
 * the flat PageHeader band the template shipped with.
 *
 * `image` falls back to the first hero slide so no page opens on a blank band.
 *
 * Motion: the photograph travels at a quarter of the scroll speed behind the
 * copy (components/ParallaxBg.tsx, off under reduced motion), and the H1's
 * words rise from behind their own baseline the way the homepage hero's do.
 * The eyebrow, the supporting line and the buttons follow on the same delays.
 */
export default function InnerHero({
  eyebrow,
  title,
  intro,
  crumbs,
  image,
  secondaryHref = '/prestige-blinds-portfolio',
  secondaryLabel = 'See Our Work',
}: {
  eyebrow: string
  title: ReactNode
  intro?: string
  crumbs?: readonly Crumb[]
  image?: string | null
  secondaryHref?: string
  secondaryLabel?: string
}) {
  const name = image && hasImage(image) ? image : (config.images.heroSlides[0] ?? config.images.hero)
  const img = name && hasImage(name) ? getImage(name) : null

  return (
    <section className="relative isolate flex min-h-[55vh] items-end overflow-hidden bg-primary-dark text-on-primary">
      {img && (
        <ParallaxBg>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={img.src}
            srcSet={img.srcSet}
            sizes="100vw"
            width={img.width}
            height={img.height}
            alt={img.alt}
            decoding="async"
            className="h-full w-full object-cover"
          />
        </ParallaxBg>
      )}
      <div aria-hidden="true" className="absolute inset-0 z-[1]" style={{ background: heroScrimCss() }} />
      <div className="relative z-10 mx-auto w-full max-w-page px-4 pb-14 pt-32 sm:px-6 md:pb-18">
        {crumbs && crumbs.length > 1 && (
          <nav aria-label="Breadcrumb" className="mb-4 text-sm text-on-primary/75">
            <ol className="flex flex-wrap gap-2">
              {crumbs.map((c, i) => (
                <li key={c.path} className="flex gap-2">
                  {i < crumbs.length - 1 ? (
                    <Link href={c.path} className="underline-offset-2 hover:underline">
                      {c.name}
                    </Link>
                  ) : (
                    <span aria-current="page">{c.name}</span>
                  )}
                  {i < crumbs.length - 1 && <span aria-hidden="true">/</span>}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <p className="hero-eyebrow text-xs font-semibold uppercase tracking-[0.2em] text-on-primary/85">{eyebrow}</p>
        <h1 className="mt-4 max-w-4xl font-heading text-4xl font-bold leading-tight md:text-5xl">
          <HeroWords>{title}</HeroWords>
        </h1>
        {intro && <p className="hero-tagline mt-5 max-w-2xl text-lg text-on-primary/90">{intro}</p>}
        <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-4">
          <span className="hero-cta-1 inline-flex">
            <Button href="/contact#contact-form">Book a Free Consultation</Button>
          </span>
          <span className="hero-cta-2 inline-flex">
            <Button href={secondaryHref} variant="secondary" tone="dark">
              {secondaryLabel}
            </Button>
          </span>
          <span className="hero-cta-3 text-base text-on-primary/90">
            or call <Phone className="text-on-primary" />
          </span>
        </div>
      </div>
    </section>
  )
}
