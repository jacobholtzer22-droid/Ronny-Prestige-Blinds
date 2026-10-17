'use client'

import type { ElementType, ReactNode } from 'react'
import { MOTION } from '@/lib/motion'
import { useInView } from '@/lib/use-in-view'

/**
 * Body copy and lists, entering a beat after the heading above them has
 * finished its last word. Fade and a short rise, nothing else.
 *
 * `delayAfterHeading` is on by default because the common case is a paragraph
 * directly under a RevealHeading; set it false for copy that stands alone.
 */
export default function RevealText({
  children,
  as: Tag = 'div',
  className = '',
  delayAfterHeading = true,
}: {
  children: ReactNode
  as?: ElementType
  className?: string
  delayAfterHeading?: boolean
}) {
  const [ref, shown] = useInView<HTMLDivElement>()
  const delay = delayAfterHeading ? MOTION.stagger - MOTION.wordStagger / 2 : 0

  return (
    <Tag
      ref={ref}
      className={`m-rise ${shown ? 'is-in' : ''} ${className}`}
      style={shown && delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  )
}
