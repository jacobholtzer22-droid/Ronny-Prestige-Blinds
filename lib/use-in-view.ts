'use client'

import { useEffect, useRef, useState } from 'react'
import { MOTION, prefersReducedMotion } from './motion'

/**
 * One IntersectionObserver per element, fires once, disconnects itself.
 *
 * Returns `false` for `shown` on the server and on the first client render, so
 * the element is painted in its hidden state and then transitions in. Under
 * prefers-reduced-motion, or in a browser with no IntersectionObserver, it
 * returns `true` on the first effect and nothing ever animates.
 *
 * The hidden state is always a CSS class, never an inline style, so the
 * <noscript> rule in app/layout.tsx can switch every one of them off at once.
 * Without that, a visitor with scripting disabled would get a page of
 * invisible sections: the markup is all there, waiting on an observer that is
 * never going to run.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(
  amount: number = MOTION.inViewAmount,
): [React.MutableRefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || typeof window === 'undefined') return
    if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
      setShown(true)
      return
    }
    // Already past it on load (a deep link, or a restored scroll position):
    // show it without waiting for a scroll that may never come.
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true)
          io.disconnect()
        }
      },
      { threshold: Math.min(amount, 1) },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [amount])

  return [ref, shown]
}
