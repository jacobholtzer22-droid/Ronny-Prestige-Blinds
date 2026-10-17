/**
 * Small uppercase label above a heading. Letterspacing and size live here only.
 */
export default function Eyebrow({ children, className = '' }: { children: string; className?: string }) {
  return (
    <p className={`text-xs font-semibold uppercase tracking-[0.2em] text-muted ${className}`}>{children}</p>
  )
}
