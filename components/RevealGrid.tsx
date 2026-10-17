'use client'

import { Children, type ElementType, type ReactNode } from 'react'
import { MOTION } from '@/lib/motion'
import { useInView } from '@/lib/use-in-view'

/**
 * A row or grid of cards entering one after another.
 *
 * One observer for the whole group rather than one per card. That matters at
 * the scale this site uses it: the service-area list alone is dozens of
 * items, and dozens of IntersectionObservers for a single fade is a cost with
 * nothing to show for it. It also makes the stagger read correctly, because
 * every child is timed from the same moment the group arrived rather than
 * from whenever each card happened to cross the line.
 *
 * `childClassName` is applied to the wrapper around each child, so a grid can
 * keep its own layout classes on the items.
 *
 * `perRow` switches the entrance from a rise to a lateral travel that
 * alternates direction by row: the first row arrives from the left, the next
 * from the right, and so on. That is what the client's current site does to
 * its two rows of product tiles, on Elementor's slideInLeft and slideInRight,
 * and it is the scroll gesture his site is known by. Leave it unset for the
 * quieter rise everywhere else.
 */
export default function RevealGrid({
  children,
  as: Tag = 'div',
  itemAs: Item = 'div',
  className = '',
  childClassName = '',
  stagger = MOTION.stagger,
  /** Milliseconds before the first child moves. */
  delay = 0,
  perRow,
}: {
  children: ReactNode
  as?: ElementType
  itemAs?: ElementType
  className?: string
  childClassName?: string
  stagger?: number
  delay?: number
  /** Columns per row. Set it to get the alternating lateral entrance. */
  perRow?: number
}) {
  const [ref, shown] = useInView<HTMLDivElement>()
  const items = Children.toArray(children)

  return (
    // A lateral entrance starts a full x-distance outside the grid, which on
    // a narrow screen is a full x-distance outside the viewport and a
    // horizontal scrollbar on every page that uses one. `overflow-x: clip`
    // cuts that off without creating a scroll container and without touching
    // the y axis, so a card can still lift on hover past the top edge.
    <Tag ref={ref} className={`${perRow ? 'overflow-x-clip' : ''} ${className}`}>
      {items.map((child, i) => {
        const lateral = perRow ? Math.floor(i / perRow) % 2 === 1 : false
        const base = perRow ? `m-slide-x ${lateral ? '' : 'm-slide-x-left'}` : 'm-rise'
        return (
          <Item
            key={i}
            className={`${base} ${shown ? 'is-in' : ''} ${childClassName}`}
            style={shown ? { transitionDelay: `${delay + i * stagger}ms` } : undefined}
          >
            {child}
          </Item>
        )
      })}
    </Tag>
  )
}
