import Link from 'next/link'
import { config } from '@/lib/config'
import theme from '@/theme'
import Phone from './Phone'

const NAV = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

/**
 * The brand mark. theme.logo is null until the client supplies a transparent
 * logo file, so until then the header renders a two-line wordmark split from
 * config.displayName. No business name is typed into this component.
 */
function Brand() {
  if (theme.logo) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={theme.logo.src} alt={theme.logo.alt} className="h-10 w-auto" />
  }
  const [first, ...rest] = config.displayName.split(' ')
  const second = rest.join(' ')
  return (
    <span className="flex flex-col leading-none">
      <span className="font-heading text-xl font-semibold tracking-[0.2em] text-primary">{(first ?? '').toUpperCase()}</span>
      {second && <span className="mt-1 text-[0.65rem] tracking-[0.3em] text-muted">{second.toUpperCase()}</span>}
    </span>
  )
}

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface/95 backdrop-blur">
      <div className="mx-auto flex max-w-page items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" aria-label={`${config.displayName} home`}>
          <Brand />
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-6 md:flex">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-medium text-ink hover:text-primary">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Phone className="hidden text-sm text-primary-dark sm:inline" />
          <Link
            href="/contact"
            className="rounded-site bg-accent px-4 py-2 text-sm font-semibold text-on-accent hover:bg-accent-dark"
          >
            Free Consultation
          </Link>
        </div>
      </div>
      <nav aria-label="Main mobile" className="flex justify-center gap-5 border-t border-line px-4 py-2 md:hidden">
        {NAV.map((item) => (
          <Link key={item.href} href={item.href} className="text-sm font-medium text-ink hover:text-primary">
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  )
}
