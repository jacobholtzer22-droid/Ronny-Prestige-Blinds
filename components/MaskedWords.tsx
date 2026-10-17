import { Children, Fragment, isValidElement, type ReactNode } from 'react'

/**
 * A line of text whose words rise into place from behind their own baseline.
 *
 * Each word gets an overflow-hidden wrapper and an inner span that starts one
 * full line-height below; sliding the inner span up makes the word appear to
 * be uncovered rather than to fly in. This is the effect the client's current
 * slider uses on its headline layers, and it is the reason the headline reads
 * as deliberate rather than as a fade.
 *
 * Copy is never retyped. `split` walks the children it is handed: runs of
 * text are broken on whitespace, and any element (an <Em>, a <br />) is passed
 * through whole as a single unit with its markup intact. The whitespace is
 * kept as its own entry and rendered as plain text outside the masks, so the
 * heading still line-wraps normally and still copies out as one sentence.
 *
 * The mask carries a small bottom pad with a matching negative margin:
 * without it `overflow: hidden` would shave the descenders off g, y and p.
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
    Children.toArray(node).forEach((child) => split(child, out))
    return
  }

  if (isValidElement(node) && node.type === Fragment) {
    split((node.props as { children?: ReactNode }).children, out)
    return
  }

  // Anything else (an <Em>, an <br />) travels as one unit, markup untouched.
  out.push({ kind: 'word', node })
}

export default function MaskedWords({
  children,
  shown,
  stagger,
  delay = 0,
  duration,
}: {
  children: ReactNode
  /** When false the words sit below their masks; when true they rise. */
  shown: boolean
  /** Milliseconds between one word and the next. */
  stagger: number
  /** Milliseconds before the first word moves. */
  delay?: number
  /** Milliseconds for one word's travel. */
  duration: number
}) {
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
              className={`m-mask-in ${shown ? 'is-in' : ''}`}
              style={{
                transitionDuration: `${duration}ms`,
                transitionDelay: shown ? `${delay + w * stagger}ms` : '0ms',
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
