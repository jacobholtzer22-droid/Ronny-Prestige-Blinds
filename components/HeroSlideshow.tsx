'use client'

import { useEffect, useState, type ReactNode } from 'react'

export interface HeroSlide {
  src: string
  srcSet: string
  alt: string
  width: number
  height: number
}

/**
 * Crossfading hero, mirroring the three-slide slider on the client's current
 * site: 1.2s fade, 6s dwell, slow zoom on the active frame.
 *
 * Slide 0 is rendered at full opacity in the server HTML and marked priority,
 * so it is the LCP element and the frame verify check 19 measures. The others
 * only ever change opacity on top of it, so nothing shifts layout.
 *
 * The whole thing stops at one frame under prefers-reduced-motion.
 */
export default function HeroSlideshow({ slides, children }: { slides: HeroSlide[]; children: ReactNode }) {
  const [active, setActive] = useState(0)
  const [ready, setReady] = useState(false)
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    // Stagger the copy in on first paint, the way the old slider does.
    const t = window.setTimeout(() => setReady(true), 60)
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (!reduced && slides.length > 1) setAnimate(true)
    return () => window.clearTimeout(t)
  }, [slides.length])

  useEffect(() => {
    if (!animate) return
    const id = window.setInterval(() => setActive((i) => (i + 1) % slides.length), 6000)
    return () => window.clearInterval(id)
  }, [animate, slides.length])

  return (
    <section className="relative isolate flex min-h-[72vh] items-end overflow-hidden bg-primary-dark text-on-primary">
      {slides.map((s, i) => (
        <img
          key={s.src}
          src={s.src}
          srcSet={s.srcSet}
          sizes="100vw"
          width={s.width}
          height={s.height}
          alt={s.alt}
          loading={i === 0 ? 'eager' : 'lazy'}
          decoding="async"
          style={{ objectPosition: '50% 42%' }}
          className={`absolute inset-0 z-0 h-full w-full object-cover transition-opacity duration-[1200ms] ease-in-out ${
            i === active ? 'opacity-100' : 'opacity-0'
          } ${animate && i === active ? 'hero-slide-active' : ''}`}
        />
      ))}
      {children}
    </section>
  )
}
