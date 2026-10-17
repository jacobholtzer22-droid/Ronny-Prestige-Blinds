import Link from 'next/link'
import { config } from '@/lib/config'
import { getImage, hasImage } from '@/lib/images'
import DrawLine from './DrawLine'
import Em from './Em'
import RevealGrid from './RevealGrid'
import RevealHeading from './RevealHeading'

/**
 * The eight product tiles the current site leads with, in its order. Each tile
 * is a photograph with a dark gradient and the name across the bottom, and the
 * whole tile is the link.
 *
 * A tile with no photograph falls back to a solid panel rather than a gap, so
 * the grid never breaks when a product has no image yet.
 *
 * The tiles enter as one staggered group, which is the section the client's
 * current site animates hardest: his slides its two tile rows in from the
 * sides on a slow Elementor slideInLeft. Hover is in `.m-tile` in
 * app/globals.css.
 */
const TILE_SLUGS = [
  'blinds',
  'motorized-blinds',
  'plantation-shutters',
  'zebra-shades',
  'roller-shades',
  'outdoor-patio-shades',
  'tenera-sheer-shades',
  'roman-shades',
]

export default function ProductTiles() {
  const bySlug = new Map<string, { name: string; path: string; image: string | null }>()
  for (const s of config.services) bySlug.set(s.slug, { name: s.name, path: s.path, image: s.image })
  for (const p of config.products) bySlug.set(p.slug, { name: p.name, path: p.path, image: p.image })
  const tiles = TILE_SLUGS.map((slug) => bySlug.get(slug)).filter((t): t is NonNullable<typeof t> => Boolean(t))

  return (
    <section className="mx-auto max-w-page px-4 py-20 sm:px-6 md:py-28">
      <DrawLine className="mb-6" />
      <RevealHeading
        eyebrow="Premium quality blinds and shutters in Florida"
        headingClassName="mt-4 max-w-3xl font-heading text-3xl font-bold text-primary-dark md:text-4xl"
      >
        Designer looks at <Em>affordable</Em> prices
      </RevealHeading>
      <RevealGrid perRow={4} className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {tiles.map((t) => {
          const img = t.image && hasImage(t.image) ? getImage(t.image) : null
          return (
            <Link
              key={t.path}
              href={t.path}
              className="m-tile relative block aspect-[4/5] overflow-hidden rounded-site bg-primary"
            >
              {img && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={img.src}
                  srcSet={img.srcSet}
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  alt={img.alt}
                  loading="lazy"
                  decoding="async"
                  className="m-tile-img absolute inset-0 h-full w-full object-cover"
                />
              )}
              <span
                aria-hidden="true"
                className="m-tile-scrim absolute inset-x-0 bottom-0 h-2/3"
                style={{ background: 'linear-gradient(180deg, rgb(0 0 0 / 0) 0%, rgb(0 0 0 / 0.72) 100%)' }}
              />
              <span className="m-tile-name absolute inset-x-0 bottom-0 flex items-center gap-1.5 p-4 font-heading text-base font-semibold text-on-primary md:text-lg">
                {t.name}
                <span aria-hidden="true" className="m-tile-arrow">
                  &rarr;
                </span>
              </span>
            </Link>
          )
        })}
      </RevealGrid>
    </section>
  )
}
