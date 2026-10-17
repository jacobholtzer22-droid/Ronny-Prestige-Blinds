'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'

/**
 * Fade-up on first scroll into view. One observer per element, fires once,
 * and never animates anything but opacity and transform.
 *
 * The hidden state is a CSS class rather than a Tailwind opacity utility, so
 * app/globals.css can force every .reveal visible inside <noscript>. Without
 * that, a visitor with JavaScript off would get a page of invisible sections:
 * the markup is all there, it is just at opacity 0 waiting for an observer
 * that will never run. prefers-reduced-motion shows everything immediately.
 */
export default function Reveal({
  children,
  stagger = 0,
  as: Tag = 'div',
  className = '',
}: {
  children: ReactNode
  stagger?: number
  as?: 'div' | 'li' | 'section' | 'article'
  className?: string
}) {
  const ref = useRef<HTMLElement | null>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || typeof window === 'undefined') return
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reduced || !('IntersectionObserver' in window)) {
      setShown(true)
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true)
          io.disconnect()
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <Tag
      ref={ref as never}
      className={`reveal ${shown ? 'is-visible' : ''} ${className}`}
      style={shown && stagger ? { transitionDelay: `${Math.min(stagger, 8) * 60}ms` } : undefined}
    >
      {children}
    </Tag>
  )
}
