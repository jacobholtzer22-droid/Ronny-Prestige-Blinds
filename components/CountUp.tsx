'use client'

import { useEffect, useRef, useState } from 'react'
import { MOTION, prefersReducedMotion } from '@/lib/motion'

/**
 * Counts up to `to` over MOTION.interaction.count the first time it scrolls
 * into view. Renders the
 * final number immediately under prefers-reduced-motion, and server-side, so
 * the value is in the HTML whether or not the script ever runs.
 */
export default function CountUp({ to, className = '' }: { to: number; className?: string }) {
  const ref = useRef<HTMLSpanElement | null>(null)
  const [value, setValue] = useState(to)
  const [armed, setArmed] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || typeof window === 'undefined') return
    if (prefersReducedMotion() || !('IntersectionObserver' in window)) return
    setValue(0)
    setArmed(true)
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return
        io.disconnect()
        const start = performance.now()
        const tick = (now: number) => {
          const t = Math.min((now - start) / MOTION.interaction.count, 1)
          // ease-out cubic
          setValue(Math.round(to * (1 - Math.pow(1 - t, 3))))
          if (t < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [to])

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {armed ? value : to}
    </span>
  )
}
