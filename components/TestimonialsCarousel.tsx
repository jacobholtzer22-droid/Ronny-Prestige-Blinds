'use client'

import { useCallback, useEffect, useState } from 'react'
import { MOTION, prefersReducedMotion } from '@/lib/motion'
import RevealHeading from './RevealHeading'

export interface Quote {
  readonly quote: string
  readonly name: string
}

/**
 * One quote at a time, crossfading with a short slide.
 *
 * Every quote stays in the DOM, stacked in the same box, and only opacity and
 * transform distinguish the one showing from the rest. That is what gives the
 * outgoing quote an exit without any mounting and unmounting: the quote
 * leaving transitions out while the one arriving transitions in, in the same
 * frame, and the band's height is whatever the tallest quote needs, so a
 * change never moves the page.
 *
 * `aria-hidden` and `visibility` keep the quotes that are not showing out of
 * the accessibility tree and out of the tab order; a screen reader hears one
 * quote, the same one a sighted visitor is reading.
 *
 * Under prefers-reduced-motion it is not a carousel at all: every quote is
 * laid out in the original grid, nothing autoplays, nothing moves.
 */
export default function TestimonialsCarousel({
  heading,
  items,
}: {
  heading: string
  items: readonly Quote[]
}) {
  const [i, setI] = useState(0)
  const [reduced, setReduced] = useState(true)
  const [paused, setPaused] = useState(false)
  const [touchX, setTouchX] = useState<number | null>(null)

  // Starts true so the server HTML and the first client render agree: every
  // quote present, nothing moving. The effect turns the carousel on only for
  // a visitor who has not asked for less motion.
  useEffect(() => setReduced(prefersReducedMotion()), [])

  const go = useCallback((n: number) => setI((v) => (n + items.length) % items.length), [items.length])

  useEffect(() => {
    if (reduced || paused || items.length < 2) return
    const id = window.setTimeout(() => go(i + 1), MOTION.interaction.quote)
    return () => window.clearTimeout(id)
  }, [reduced, paused, i, items.length, go])

  const headingBlock = (
    <RevealHeading headingClassName="font-heading text-3xl font-bold text-primary-dark">{heading}</RevealHeading>
  )

  if (reduced || items.length < 2) {
    return (
      <section className="mx-auto max-w-page px-4 py-16 sm:px-6 md:py-24">
        {headingBlock}
        <div className="mt-10 grid gap-x-10 gap-y-10 md:grid-cols-2">
          {items.map((t) => (
            <Card key={t.name} t={t} />
          ))}
        </div>
      </section>
    )
  }

  return (
    <section
      className="mx-auto max-w-page px-4 py-16 sm:px-6 md:py-24"
      aria-roledescription="carousel"
      aria-label={heading}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') {
          e.preventDefault()
          go(i + 1)
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault()
          go(i - 1)
        }
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => setTouchX(e.touches[0]?.clientX ?? null)}
      onTouchEnd={(e) => {
        const to = e.changedTouches[0]?.clientX
        if (touchX === null || to === undefined) return
        const dx = to - touchX
        setTouchX(null)
        if (Math.abs(dx) > 48) go(i + (dx < 0 ? 1 : -1))
      }}
    >
      {headingBlock}

      <div className="relative mt-10 grid">
        {items.map((t, n) => (
          <div
            key={t.name}
            aria-hidden={n === i ? undefined : 'true'}
            // Every quote occupies the same grid cell, so the box is as tall
            // as the longest one and never resizes on a change.
            className={`m-quote ${n === i ? 'is-in' : ''} col-start-1 row-start-1 self-center`}
          >
            <Card t={t} />
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center gap-2.5" role="tablist" aria-label="Choose a quote">
        {items.map((t, n) => (
          <button
            key={t.name}
            type="button"
            role="tab"
            aria-selected={n === i}
            aria-label={`Quote ${n + 1} of ${items.length}`}
            onClick={() => go(n)}
            className={`h-2.5 rounded-full transition-all duration-200 ${
              n === i ? 'w-7 bg-accent' : 'w-2.5 bg-line hover:bg-muted'
            }`}
          />
        ))}
      </div>
    </section>
  )
}

function Card({ t }: { t: Quote }) {
  return (
    <div className="border-l-2 border-accent pl-5">
      <blockquote>
        <p className="font-heading text-lg leading-relaxed text-ink">{t.quote}</p>
      </blockquote>
      <footer className="mt-3 text-sm font-semibold uppercase tracking-wider text-muted">{t.name}</footer>
    </div>
  )
}
