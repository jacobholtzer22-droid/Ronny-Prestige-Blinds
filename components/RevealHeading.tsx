'use client'

import type { ElementType, ReactNode } from 'react'
import { MOTION } from '@/lib/motion'
import { useInView } from '@/lib/use-in-view'
import MaskedWords from './MaskedWords'

/**
 * A section's eyebrow and heading, entering as a pair: the eyebrow fades up
 * first, then the heading's words rise one after another from behind their
 * own masks.
 *
 * Used on every section H2 and every inner-page H1. The heading text is
 * passed through as children and split in place, so wrapping an existing
 * heading in this component never retypes a word of it.
 *
 * Space is reserved before either part moves: the eyebrow and the heading
 * occupy their final boxes from first paint and only opacity and transform
 * change, so nothing below them shifts.
 */
export default function RevealHeading({
  eyebrow,
  children,
  as: Tag = 'h2',
  className = '',
  eyebrowClassName = '',
  headingClassName = '',
}: {
  eyebrow?: string
  children: ReactNode
  as?: ElementType
  className?: string
  eyebrowClassName?: string
  headingClassName?: string
}) {
  const [ref, shown] = useInView<HTMLDivElement>()

  return (
    <div ref={ref} className={className}>
      {eyebrow && (
        <p
          className={`m-rise ${shown ? 'is-in' : ''} text-xs font-semibold uppercase tracking-[0.2em] text-muted ${eyebrowClassName}`}
        >
          {eyebrow}
        </p>
      )}
      <Tag className={headingClassName}>
        <MaskedWords
          shown={shown}
          stagger={MOTION.wordStagger}
          delay={eyebrow ? MOTION.stagger : 0}
          duration={MOTION.duration.base}
        >
          {children}
        </MaskedWords>
      </Tag>
    </div>
  )
}
