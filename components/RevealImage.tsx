'use client'

import type { ReactNode } from 'react'
import { useInView } from '@/lib/use-in-view'

/**
 * A photograph uncovered by a left-to-right wipe while the picture inside it
 * settles out of a slight overscale.
 *
 * The wipe is a clip-path; the settle is a transform on the child. Neither
 * touches layout, and the frame holds its full box from first paint, so a
 * wipe never moves the copy beside it.
 *
 * The overscale is what stops the wipe reading as a plain curtain: the
 * picture is still arriving as the curtain passes, which is the texture the
 * client's current site gets from its slider and loses everywhere else.
 *
 * ⚠️ The observed element and the clipped element MUST stay separate, which
 * is why this is three divs and not two. An IntersectionObserver measures the
 * target's *visible* area, and the target's own clip-path counts toward that:
 * an element resting at `inset(0 100% 0 0)` has zero visible area, reports a
 * ratio of 0 forever, and never crosses any threshold. Put the clip on the
 * element you observe and the photograph stays invisible for good. The outer
 * div is deliberately free of clip-path for that reason.
 *
 * Do NOT put one of these inside a RevealGrid child either. The grid would
 * fade the wrapper from zero while the wipe was still uncovering it, and two
 * hidden states stacked on one element is not a richer reveal, it is a blank
 * space for the length of the longer one. Use `delay` for a staggered row
 * instead; that is what the dark gallery band does.
 */
export default function RevealImage({
  children,
  className = '',
  rounded = true,
  delay = 0,
}: {
  children: ReactNode
  className?: string
  /** Off for a photograph that is already inside a rounded frame. */
  rounded?: boolean
  /** Milliseconds, for a row of photographs uncovering one after another. */
  delay?: number
}) {
  const [ref, shown] = useInView<HTMLDivElement>()
  const d = shown && delay ? { transitionDelay: `${delay}ms` } : undefined

  return (
    <div ref={ref} className={`${rounded ? 'overflow-hidden rounded-site' : ''} ${className}`}>
      <div className={`m-wipe ${shown ? 'is-in' : ''} h-full`} style={d}>
        <div className="m-wipe-in h-full" style={d}>
          {children}
        </div>
      </div>
    </div>
  )
}
