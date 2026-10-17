'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { MOTION } from '@/lib/motion'

/**
 * One question.
 *
 * Still a native <details>/<summary>: that is what makes it a disclosure
 * widget to assistive technology and what gives it keyboard behaviour for
 * free. React only owns *when* the `open` attribute comes off, which is the
 * whole trick: a browser hides the contents of a closed <details>
 * immediately, so a close can never animate unless something holds the
 * attribute on until the animation has finished.
 *
 * Open and close both interpolate `grid-template-rows` from 0fr to 1fr. That
 * is the one layout property this site animates, and it is the only honest
 * way to animate to a height nobody has measured: the alternative is reading
 * scrollHeight on every toggle, which reflows and breaks the moment the text
 * rewraps at a different width. The answer fades a beat behind the height so
 * the text is never legible in a half-open box.
 *
 * With scripting off this component never hydrates, the click goes to the
 * native <details>, and the <noscript> rule in app/layout.tsx holds every
 * answer open so nothing is unreachable.
 */
export default function FaqItem({ q, a }: { q: string; a: string }) {
  // `mounted` is the DOM attribute, `open` is the visual state. They differ
  // only for the length of a close.
  const [mounted, setMounted] = useState(false)
  const [open, setOpen] = useState(false)
  const timer = useRef<number | null>(null)

  useEffect(() => () => {
    if (timer.current) window.clearTimeout(timer.current)
  }, [])

  const toggle = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      if (timer.current) window.clearTimeout(timer.current)
      if (open) {
        setOpen(false)
        timer.current = window.setTimeout(() => setMounted(false), MOTION.interaction.accordion)
      } else {
        setMounted(true)
        // Next frame, so the 0fr resting state is painted before it moves.
        requestAnimationFrame(() => requestAnimationFrame(() => setOpen(true)))
      }
    },
    [open],
  )

  return (
    <details open={mounted} className="m-faq px-5 py-4">
      <summary
        onClick={toggle}
        aria-expanded={open}
        className="cursor-pointer list-none font-semibold text-ink marker:content-none"
      >
        <span className="flex items-center justify-between gap-4">
          {q}
          {/* A chevron, so a half turn reads as a direction rather than as a
              plus sign spinning for no reason. */}
          <span aria-hidden="true" className={`m-faq-chev ${open ? 'is-open' : ''} inline-block text-primary`}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </span>
        </span>
      </summary>
      <div className={`m-faq-body ${open ? 'is-open' : ''} grid`}>
        <div className="overflow-hidden">
          <p className="m-faq-answer mt-3 text-sm leading-relaxed text-muted">{a}</p>
        </div>
      </div>
    </details>
  )
}
