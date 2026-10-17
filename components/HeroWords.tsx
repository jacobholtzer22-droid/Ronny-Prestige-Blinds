import { Children, Fragment, isValidElement, type ReactNode } from 'react'
import { MOTION } from '@/lib/motion'

/**
 * The hero headline, split into words that rise from behind their own
 * baseline.
 *
 * Same effect as components/MaskedWords.tsx, but driven by a CSS animation
 * with `backwards` fill instead of a transition toggled by an observer. That
 * difference matters only here: the hero is above the fold and in the server
 * HTML, so its sequence has to run at first paint rather than wait for
 * hydration. Everything below the fold has already been scrolled to by the
 * time it animates, so a transition is fine there and costs less.
 *
 * The children are walked, not retyped: text runs split on whitespace, and an
 * element such as <Em> passes through whole with its markup intact.
 */

type Unit = { kind: 'space'; text: string } | { kind: 'word'; node: ReactNode }

function split(node: ReactNode, out: Unit[]): void {
  if (node === null || node === undefined || typeof node === 'boolean') return
  if (typeof node === 'string' || typeof node === 'number') {
    for (const part of String(node).split(/(\s+)/)) {
      if (part.length === 0) continue
      if (/^\s+$/.test(part)) out.push({ kind: 'space', text: part })
      else out.push({ kind: 'word', node: part })
    }
    return
  }
  if (Array.isArray(node)) {
    Children.toArray(node).forEach((c) => split(c, out))
    return
  }
  if (isValidElement(node) && node.type === Fragment) {
    split((node.props as { children?: ReactNode }).children, out)
    return
  }
  out.push({ kind: 'word', node })
}

export default function HeroWords({ children }: { children: ReactNode }) {
  const units: Unit[] = []
  split(children, units)

  let w = -1
  return (
    <>
      {units.map((u, i) => {
        if (u.kind === 'space') return <Fragment key={i}>{u.text}</Fragment>
        w += 1
        return (
          <span key={i} className="m-mask">
            <span
              className="m-mask-in hero-word"
              style={{
                animationDelay: `${MOTION.hero.delay.headline + w * MOTION.heroWordStagger}ms`,
              }}
            >
              {u.node}
            </span>
          </span>
        )
      })}
    </>
  )
}
