import { config } from '@/lib/config'

/**
 * The office on a map. Google's keyless embed endpoint, lazy loaded, titled
 * for screen readers. Renders nothing when no address is published.
 */
export default function MapEmbed({ className = '' }: { className?: string }) {
  const a = config.address
  if (!a) return null
  const q = encodeURIComponent(`${a.street}, ${a.city}, ${a.state} ${a.zip}`)
  return (
    <div className={`overflow-hidden rounded-site border border-line ${className}`}>
      <iframe
        title={`Map to ${config.displayName} in ${a.city}, ${a.state}`}
        src={`https://maps.google.com/maps?q=${q}&output=embed`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="h-[320px] w-full border-0"
      />
    </div>
  )
}
