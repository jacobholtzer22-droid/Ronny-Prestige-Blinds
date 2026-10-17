'use client'

import type { ReactNode } from 'react'
import { MOTION } from '@/lib/motion'
import { useInView } from '@/lib/use-in-view'

/**
 * The plain fade-and-rise, kept for the many list and card call sites that
 * want nothing more than that.
 *
 * It is now a thin wrapper over the same `.m-rise` class and the same shared
 * observer the rest of the entrance family uses, so its timing comes from
 * lib/motion.ts along with everything else. Where a group of siblings enters
 * together, prefer RevealGrid: one observer for the group reads better and
 * costs less than one per item.
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
  const [ref, shown] = useInView<HTMLElement>()

  return (
    <Tag
      ref={ref as never}
      className={`m-rise ${shown ? 'is-in' : ''} ${className}`}
      style={shown && stagger ? { transitionDelay: `${Math.min(stagger, 8) * MOTION.stagger}ms` } : undefined}
    >
      {children}
    </Tag>
  )
}
