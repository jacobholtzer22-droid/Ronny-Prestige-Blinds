import Link from 'next/link'
import type { ReactNode } from 'react'

/**
 * The ONE button shape on the site: a pill, mirroring the current site's
 * rounded call-to-action. Primary is the accent fill; secondary is a 1px
 * outline with an arrow glyph. Cards and images keep theme.radius; only
 * buttons are pills.
 */
const BASE =
  'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-base font-semibold transition-colors'

export default function Button({
  href,
  children,
  variant = 'primary',
  tone = 'light',
  className = '',
}: {
  href: string
  children: ReactNode
  variant?: 'primary' | 'secondary'
  /** 'dark' when the button sits on the primary or a scrim, for outline color. */
  tone?: 'light' | 'dark'
  className?: string
}) {
  const style =
    variant === 'primary'
      ? 'bg-accent text-on-accent hover:bg-accent-dark'
      : tone === 'dark'
        ? 'border border-on-primary/60 text-on-primary hover:border-on-primary hover:bg-on-primary/10'
        : 'border border-primary/35 text-primary-dark hover:border-primary hover:bg-primary-soft'
  return (
    <Link href={href} className={`${BASE} ${style} ${className}`}>
      {children}
      {variant === 'secondary' && (
        <span aria-hidden="true" className="text-[1.05em] leading-none">
          &rarr;
        </span>
      )}
    </Link>
  )
}
