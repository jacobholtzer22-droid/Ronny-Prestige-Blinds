'use client'

import { useState } from 'react'
import { config } from '@/lib/config'

/**
 * The office on a map. Google's keyless embed endpoint, lazy loaded, titled
 * for screen readers. Renders nothing when no address is published.
 *
 * The frame fades in on its own load event rather than appearing as a white
 * rectangle and then snapping to a map. With scripting off the load handler
 * never runs, so the <noscript> rule in app/layout.tsx covers `.m-frame`
 * along with the rest of the entrance classes.
 */
export default function MapEmbed({ className = '' }: { className?: string }) {
  const [loaded, setLoaded] = useState(false)
  const a = config.address
  if (!a) return null
  const q = encodeURIComponent(`${a.street}, ${a.city}, ${a.state} ${a.zip}`)
  return (
    <div className={`overflow-hidden rounded-site border border-line bg-surface ${className}`}>
      <iframe
        title={`Map to ${config.displayName} in ${a.city}, ${a.state}`}
        src={`https://maps.google.com/maps?q=${q}&output=embed`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        onLoad={() => setLoaded(true)}
        className={`m-frame ${loaded ? 'is-in' : ''} h-[320px] w-full border-0`}
      />
    </div>
  )
}
