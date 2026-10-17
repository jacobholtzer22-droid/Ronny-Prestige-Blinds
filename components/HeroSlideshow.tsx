'use client'

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { MOTION, prefersReducedMotion } from '@/lib/motion'

export interface HeroSlide {
  src: string
  srcSet: string
  alt: string
  width: number
  height: number
}

/**
 * The hero slideshow.
 *
 * The client's current site opens on a three-slide Slider Revolution module.
 * This is that, built honestly: a crossfade between the three photographs he
 * already has, a slow zoom with a drift across each slide's life, and the
 * copy re-entering on every change. His slider has no Ken Burns at all and
 * his text layers only fade; this moves, which is the point of the pass.
 *
 * On top of the crossfade, a slide change also plays his own transition: the
 * incoming photograph sweeps in as five vertical columns from the right, one
 * behind the last. That is `col:5` on every rs-slide of his module and the
 * single gesture his hero is recognisable for, so a pass that claims to match
 * his motion has to have it.
 *
 * The columns are five clipped copies of the same <img>, mounted only while a
 * change is in flight and thrown away after. Same src and srcset, so the
 * browser reuses one decoded bitmap and no second request is made, and
 * because each copy is laid out exactly like the real slide the five slices
 * line up seamlessly. Nothing of this exists on first paint: slide 0 is the
 * plain <img> it always was, which is what keeps it the LCP element.
 *
 * What is load-bearing here:
 *
 *   - Slide 0 and the copy are in the server HTML at full size. The copy
 *     animates through CSS animations with `backwards` fill, which run at
 *     first paint without waiting for hydration, so there is no flash of an
 *     empty hero and no layout shift. `children` is keyed on the active index
 *     so a slide change remounts it and the sequence restarts.
 *   - Only opacity and transform ever change. The photographs are stacked in
 *     the same absolutely positioned box, so a crossfade moves nothing.
 *   - Autoplay stops while the pointer is over the hero and while the tab is
 *     hidden, and never starts at all under prefers-reduced-motion. In that
 *     case the hero is slide 0, still, with working dots: pressing one cuts
 *     to that photograph rather than crossfading, because a visitor who has
 *     asked for less motion should get the picture, not the transition.
 *
 * Controls: dots at the lower left, arrows on pointer devices, swipe on
 * touch, and left/right arrow keys once the region has focus.
 */
export default function HeroSlideshow({ slides, children }: { slides: HeroSlide[]; children: ReactNode }) {
  const [active, setActive] = useState(0)
  const [animate, setAnimate] = useState(false)
  const [paused, setPaused] = useState(false)
  // Non-null only while a change is in flight; this is the slide whose
  // columns are sweeping in.
  const [slotting, setSlotting] = useState<number | null>(null)
  const touchX = useRef<number | null>(null)
  const many = slides.length > 1

  useEffect(() => {
    if (!prefersReducedMotion() && many) setAnimate(true)
  }, [many])

  const go = useCallback(
    (next: number) => {
      const n = (next + slides.length) % slides.length
      setActive((i) => {
        if (i !== n) setSlotting(n)
        return n
      })
    },
    [slides.length],
  )

  // Tear the columns down once they have finished, so the hero is back to
  // three plain <img> between changes.
  useEffect(() => {
    if (slotting === null) return
    const id = window.setTimeout(
      () => setSlotting(null),
      MOTION.hero.crossfade + MOTION.slots.count * MOTION.slots.stagger,
    )
    return () => window.clearTimeout(id)
  }, [slotting])

  // Autoplay. Rebuilt on every change so a manual move restarts the dwell
  // rather than cutting the next slide short.
  useEffect(() => {
    if (!animate || paused) return
    const id = window.setTimeout(() => go(active + 1), MOTION.hero.slide)
    return () => window.clearTimeout(id)
  }, [animate, paused, active, go])

  // A slideshow running in a tab nobody is looking at is wasted work, and it
  // means the visitor comes back to a slide that moved without them.
  useEffect(() => {
    const onVis = () => setPaused(document.hidden)
    document.addEventListener('visibilitychange', onVis)
    return () => document.removeEventListener('visibilitychange', onVis)
  }, [])

  const onKey = (e: React.KeyboardEvent) => {
    if (!many) return
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      go(active + 1)
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      go(active - 1)
    }
  }

  return (
    <section
      aria-roledescription={many ? 'carousel' : undefined}
      aria-label={many ? 'Our work' : undefined}
      tabIndex={many ? 0 : undefined}
      onKeyDown={onKey}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => {
        touchX.current = e.touches[0]?.clientX ?? null
      }}
      onTouchEnd={(e) => {
        const from = touchX.current
        const to = e.changedTouches[0]?.clientX
        touchX.current = null
        if (from === null || to === undefined) return
        const dx = to - from
        if (Math.abs(dx) > 48) go(active + (dx < 0 ? 1 : -1))
      }}
      className="relative isolate flex min-h-[72vh] items-end overflow-hidden bg-primary-dark text-on-primary focus-visible:outline-none"
    >
      {slides.map((s, i) => (
        <div
          key={s.src}
          aria-hidden={i === active ? undefined : 'true'}
          className="absolute inset-0 z-0 transition-opacity ease-in-out motion-reduce:transition-none"
          style={{
            opacity: i === active ? 1 : 0,
            transitionDuration: `${MOTION.hero.crossfade}ms`,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            // Keyed on the active index so the pan restarts with the slide.
            key={`${s.src}-${i === active ? active : 'idle'}`}
            src={s.src}
            srcSet={s.srcSet}
            sizes="100vw"
            width={s.width}
            height={s.height}
            alt={s.alt}
            loading={i === 0 ? 'eager' : 'lazy'}
            // eslint-disable-next-line @next/next/no-unknown-property
            fetchPriority={i === 0 ? 'high' : undefined}
            decoding="async"
            style={{ objectPosition: '50% 42%' }}
            className={`h-full w-full object-cover ${animate && i === active ? 'hero-pan' : ''}`}
          />
        </div>
      ))}

      {/* His transition: five columns of the incoming photograph sweeping in
          from the right. Mounted only for the length of the change. */}
      {animate && slotting !== null && slides[slotting] && (
        <div aria-hidden="true" className="absolute inset-0 z-[2] overflow-hidden">
          {Array.from({ length: MOTION.slots.count }, (_, c) => {
            const w = 100 / MOTION.slots.count
            return (
              <div
                key={c}
                className="hero-slot absolute inset-0"
                style={{
                  clipPath: `inset(0 ${100 - (c + 1) * w}% 0 ${c * w}%)`,
                  animationDelay: `${c * MOTION.slots.stagger}ms`,
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={slides[slotting]!.src}
                  srcSet={slides[slotting]!.srcSet}
                  sizes="100vw"
                  alt=""
                  aria-hidden="true"
                  decoding="async"
                  style={{ objectPosition: '50% 42%' }}
                  className="h-full w-full object-cover"
                />
              </div>
            )
          })}
        </div>
      )}

      {/* Keyed on the slide: a remount is what restarts the copy sequence. */}
      <div key={active} className="contents">
        {children}
      </div>

      {many && (
        <>
          <div className="absolute inset-x-0 bottom-0 z-20 mx-auto flex max-w-page items-center justify-between gap-4 px-4 pb-6 sm:px-6">
            <div className="flex items-center gap-2.5" role="tablist" aria-label="Choose a photograph">
              {slides.map((s, i) => (
                <button
                  key={s.src}
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  aria-label={`Photograph ${i + 1} of ${slides.length}`}
                  onClick={() => go(i)}
                  className={`h-2.5 rounded-full transition-all duration-200 ${
                    i === active ? 'w-7 bg-on-primary' : 'w-2.5 bg-on-primary/45 hover:bg-on-primary/75'
                  }`}
                />
              ))}
            </div>
            <div className="hidden items-center gap-2 md:flex">
              <HeroArrow label="Previous photograph" onClick={() => go(active - 1)} d="M15 5 8 12l7 7" />
              <HeroArrow label="Next photograph" onClick={() => go(active + 1)} d="m9 5 7 7-7 7" />
            </div>
          </div>

          {/* Dwell indicator. Scales rather than growing a width, so it costs
              no layout, and is keyed on the slide so it resets on a change.
              It is not drawn at all when nothing is advancing: a full bar
              under a hero that never moves is just a wrong reading. */}
          {animate && (
            <div aria-hidden="true" className="absolute inset-x-0 bottom-0 z-20 h-[3px] bg-on-primary/15">
              <div key={active} className={`h-full bg-accent ${paused ? '' : 'hero-progress'}`} />
            </div>
          )}
        </>
      )}
    </section>
  )
}

function HeroArrow({ label, onClick, d }: { label: string; onClick: () => void; d: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-on-primary/40 bg-black/25 text-on-primary backdrop-blur-sm transition-colors duration-200 hover:border-on-primary hover:bg-black/45"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-5 w-5">
        <path d={d} />
      </svg>
    </button>
  )
}
