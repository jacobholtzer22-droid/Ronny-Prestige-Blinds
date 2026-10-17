'use client'

import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'

/**
 * A short opacity fade on each route so a navigation resolves instead of
 * snapping. Opacity only: a transform here would fight the inner-hero
 * parallax and would move type that is already in its final place.
 *
 * Keyed on the path, so the animation restarts on every navigation. It is a
 * CSS animation rather than a transition, which means it runs on first paint
 * without waiting for hydration and leaves the content visible when it ends.
 * With scripting off the animation simply never starts and the page is
 * already at full opacity, because `m-page` sets no resting opacity of its
 * own: the keyframes carry the whole effect.
 *
 * The children stay server components; only this wrapper is client code.
 */
export default function PageFade({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  return (
    <div key={pathname} className="m-page">
      {children}
    </div>
  )
}
