'use client'

import { useInView } from '@/lib/use-in-view'

/**
 * A short accent rule that draws itself out from the left as its section
 * arrives. Sits above a major heading and gives the eye something to start
 * on before the words begin to rise.
 *
 * Scales on the x axis rather than animating width, so it costs no layout.
 */
export default function DrawLine({ className = '' }: { className?: string }) {
  const [ref, shown] = useInView<HTMLSpanElement>()
  return (
    <span
      ref={ref}
      aria-hidden="true"
      className={`m-line ${shown ? 'is-in' : ''} block h-[2px] w-14 bg-accent ${className}`}
    />
  )
}
