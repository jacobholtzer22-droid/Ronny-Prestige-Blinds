'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { MOTION, prefersReducedMotion } from '@/lib/motion'

/**
 * The photograph behind an inner-page hero, travelling at a fraction of the
 * page's scroll speed.
 *
 * Three things keep this honest:
 *
 *   - It is a transform on a child that is already oversized by the parallax
 *     range, so the picture can never slide far enough to show an edge. The
 *     overscale is derived from the depth, not guessed, so changing
 *     MOTION.interaction.parallax cannot open a gap at the top or bottom.
 *   - The work happens in a requestAnimationFrame, and the scroll listener
 *     only sets a flag. A listener that writes a style on every scroll event
 *     is how a parallax ends up janky.
 *   - It stops entirely once the hero is off screen, and never starts under
 *     prefers-reduced-motion.
 */
export default function ParallaxBg({ children }: { children: ReactNode }) {
  const host = useRef<HTMLDivElement | null>(null)
  const inner = useRef<HTMLDivElement | null>(null)
  const [on, setOn] = useState(false)

  useEffect(() => {
    if (prefersReducedMotion()) return
    setOn(true)

    let frame = 0
    const depth = MOTION.interaction.parallax

    const draw = () => {
      frame = 0
      const el = host.current
      const pic = inner.current
      if (!el || !pic) return
      const r = el.getBoundingClientRect()
      if (r.bottom < 0 || r.top > window.innerHeight) return
      // 0 when the hero's top is at the top of the viewport, growing as the
      // page scrolls past it. Clamped to the hero's own height so the offset
      // can never exceed the headroom the overscale bought.
      const travelled = Math.min(Math.max(-r.top, 0), r.height)
      pic.style.transform = `translate3d(0, ${travelled * depth}px, 0)`
    }

    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(draw)
    }

    draw()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div ref={host} className="absolute inset-0 z-0 overflow-hidden">
      <div
        ref={inner}
        className="absolute inset-x-0 top-0"
        style={
          on
            ? {
                // Exactly the headroom the travel needs, and not a pixel more.
                height: `${100 * (1 + MOTION.interaction.parallax)}%`,
                willChange: 'transform',
              }
            : { height: '100%' }
        }
      >
        {children}
      </div>
    </div>
  )
}
