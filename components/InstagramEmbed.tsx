'use client'

import Script from 'next/script'
import { useEffect, useRef, useState } from 'react'

/**
 * One official Instagram post embed, loaded late.
 *
 * Until the tile is within 600px of the viewport it is a plain linked
 * placeholder, so a page with twenty of these costs nothing on first load.
 * Once near, it swaps in Instagram's own <blockquote class="instagram-media">
 * and embed.js turns it into the real post. No access token, no third-party
 * widget service, and no scraping: this is the documented public embed.
 *
 * If the account ever goes private, or the script is blocked, the fallback
 * link inside the blockquote is what the visitor sees. That is deliberate.
 *
 * The placeholder shimmers until the tile comes near enough to swap, then the
 * whole placeholder is replaced and the shimmer goes with it.
 */

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } }
  }
}

let scriptRequested = false

export default function InstagramEmbed({ url, label }: { url: string; label: string }) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [near, setNear] = useState(false)
  const [wantScript, setWantScript] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || typeof window === 'undefined') return
    if (!('IntersectionObserver' in window)) {
      setNear(true)
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setNear(true)
          io.disconnect()
        }
      },
      { rootMargin: '600px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!near) return
    if (!scriptRequested) {
      scriptRequested = true
      setWantScript(true)
    }
    // The script may already be present from an earlier tile on the page.
    window.instgrm?.Embeds.process()
  }, [near])

  return (
    <div ref={ref} className="overflow-hidden rounded-site border border-line bg-surface">
      {near ? (
        <>
          <blockquote
            className="instagram-media"
            data-instgrm-permalink={url}
            data-instgrm-version="14"
            style={{ margin: 0, width: '100%', minWidth: 0 }}
          >
            <a href={url} rel="noopener nofollow" target="_blank" className="block p-6 text-sm text-primary underline-offset-2 hover:underline">
              {label}
            </a>
          </blockquote>
          {wantScript && (
            <Script
              src="https://www.instagram.com/embed.js"
              strategy="lazyOnload"
              onReady={() => window.instgrm?.Embeds.process()}
            />
          )}
        </>
      ) : (
        // Not near the viewport yet. The shimmer says "a picture is coming
        // here" rather than leaving a dead panel, and it is a pseudo-element
        // gradient on a transform, so an off-screen grid of these costs a
        // compositor layer each and no layout. It goes away with the
        // placeholder the moment the real embed is requested.
        <a
          href={url}
          rel="noopener nofollow"
          target="_blank"
          className="m-shimmer relative flex aspect-square items-center justify-center overflow-hidden bg-primary-soft/40 p-6 text-center text-sm text-muted transition-colors duration-200 hover:text-primary"
        >
          <span className="relative z-10">{label}</span>
        </a>
      )}
    </div>
  )
}
