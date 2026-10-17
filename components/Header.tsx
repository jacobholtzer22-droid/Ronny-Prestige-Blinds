'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { config, hoursSummary } from '@/lib/config'
import { MOTION } from '@/lib/motion'
import { navGroups } from '@/lib/nav'
import theme from '@/theme'

/**
 * Conventional two-row header, mirroring the current site: identity and the
 * phone on top, the navigation on its own row beneath. The nav row is sticky
 * and gains a shadow once the page moves, so it stays legible over the hero
 * photograph without sitting on a permanent slab.
 *
 * Dropdowns open on hover AND on click, because hover alone is unusable on a
 * touch screen and on a keyboard. Mobile collapses to a wordmark, a call pill,
 * and a full-height drawer with each group expanded.
 *
 * Motion notes:
 *
 *   - Past MOTION.interaction.shrinkAt the header tightens. The tightening is
 *     a transform on the wordmark and on the nav row's contents, never a
 *     change of padding or height: the row keeps its box, so the page below
 *     never shifts under a scrolling visitor. The shadow and the background
 *     opacity change with it; neither affects layout.
 *   - A dropdown closes on a short timer rather than on mouseleave, so the
 *     pointer can cross the hairline between a trigger and its panel without
 *     the panel vanishing underneath it.
 *   - The dropdowns and the drawer are always in the DOM and hidden with
 *     `visibility`, rather than mounted and unmounted. That is what lets them
 *     animate on the way out as well as in without an animation runtime, and
 *     `visibility: hidden` is what keeps a closed panel out of the tab order
 *     and out of the accessibility tree while it is away.
 */

/**
 * Three rules that fold into a cross. Transform and opacity only, so the
 * button never changes size and never moves the controls beside it.
 */
function Bars({ crossed }: { crossed: boolean }) {
  return (
    <span aria-hidden="true" className="relative block h-[14px] w-5">
      <span
        className="absolute left-0 top-0 block h-[2px] w-5 bg-current transition-transform duration-200 ease-[var(--m-ease)] motion-reduce:transition-none"
        style={{ transform: crossed ? 'translateY(6px) rotate(45deg)' : 'none' }}
      />
      <span
        className="absolute left-0 top-[6px] block h-[2px] w-5 bg-current transition-opacity duration-200 motion-reduce:transition-none"
        style={{ opacity: crossed ? 0 : 1 }}
      />
      <span
        className="absolute left-0 top-[12px] block h-[2px] w-5 bg-current transition-transform duration-200 ease-[var(--m-ease)] motion-reduce:transition-none"
        style={{ transform: crossed ? 'translateY(-6px) rotate(-45deg)' : 'none' }}
      />
    </span>
  )
}

export default function Header() {
  const pathname = usePathname()
  const groups = navGroups()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState<string | null>(null)
  const [drawer, setDrawer] = useState(false)
  const hours = hoursSummary()
  const closeTimer = useRef<number | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > MOTION.interaction.shrinkAt)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setDrawer(false)
    setOpen(null)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = drawer ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [drawer])

  useEffect(() => () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current)
  }, [])

  const holdOpen = (label: string) => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current)
    setOpen(label)
  }
  const releaseOpen = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current)
    closeTimer.current = window.setTimeout(() => setOpen(null), MOTION.duration.fast)
  }

  const brand = theme.logo ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={theme.logo.src} alt={theme.logo.alt} className="h-10 w-auto" />
  ) : (
    (() => {
      const [first, ...rest] = config.displayName.split(' ')
      const second = rest.join(' ')
      return (
        <span className="flex flex-col leading-none">
          <span className="font-heading text-xl font-semibold tracking-[0.2em] text-primary">
            {(first ?? '').toUpperCase()}
          </span>
          {second && <span className="mt-1 text-[0.65rem] tracking-[0.3em] text-muted">{second.toUpperCase()}</span>}
        </span>
      )
    })()
  )

  return (
    <header className="relative z-50">
        {/* identity row */}
        <div className="border-b border-line bg-surface">
          <div className="mx-auto flex max-w-page items-center justify-between gap-4 px-4 py-3 sm:px-6">
            <Link
              href="/"
              aria-label={`${config.displayName} home`}
              className="origin-left transition-transform duration-200 ease-[var(--m-ease)] motion-reduce:transition-none"
              style={{ transform: scrolled ? 'scale(0.85)' : 'none' }}
            >
              {brand}
            </Link>
            <div className="flex items-center gap-4">
              <div className="hidden text-right sm:block">
                <a href={`tel:${config.phone}`} className="block text-lg font-bold leading-tight text-primary-dark hover:underline">
                  {config.phoneDisplay}
                </a>
                {hours && <span className="block text-xs text-muted">{hours}</span>}
              </div>
              <Link
                href="/contact#contact-form"
                className="m-btn hidden rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-on-accent hover:bg-accent-dark sm:inline-flex"
              >
                Free Consultation
              </Link>
              <a
                href={`tel:${config.phone}`}
                className="m-btn rounded-full bg-accent px-4 py-2 text-sm font-semibold text-on-accent sm:hidden"
              >
                Call
              </a>
              <button
                type="button"
                aria-label="Open menu"
                aria-expanded={drawer}
                onClick={() => setDrawer(true)}
                className="flex h-11 w-11 items-center justify-center rounded-site border border-line text-primary-dark lg:hidden"
              >
                <Bars crossed={false} />
              </button>
            </div>
          </div>
        </div>

        {/* nav row */}
        <div
          className={`sticky top-0 z-40 hidden border-b border-line backdrop-blur transition-[box-shadow,background-color] duration-200 ease-[var(--m-ease)] motion-reduce:transition-none lg:block ${
            scrolled ? 'bg-surface shadow-site' : 'bg-surface/95'
          }`}
        >
          <nav
            aria-label="Main"
            className="mx-auto flex max-w-page origin-top items-center gap-1 px-4 transition-transform duration-200 ease-[var(--m-ease)] motion-reduce:transition-none sm:px-6"
            style={{ transform: scrolled ? 'scale(0.9)' : 'none' }}
          >
            {groups.map((g) => {
              const hasMenu = g.items.length > 0
              const isOpen = open === g.label
              return (
                <div
                  key={g.label}
                  className="relative"
                  onMouseEnter={() => hasMenu && holdOpen(g.label)}
                  onMouseLeave={() => hasMenu && releaseOpen()}
                >
                  <span className="flex items-center">
                    <Link
                      href={g.href ?? '#'}
                      className="px-4 py-4 text-[0.95rem] font-medium text-ink transition-colors hover:text-primary"
                    >
                      {g.label}
                    </Link>
                    {hasMenu && (
                      <button
                        type="button"
                        aria-label={`${g.label} menu`}
                        aria-expanded={isOpen}
                        onClick={() => (isOpen ? setOpen(null) : holdOpen(g.label))}
                        className="-ml-2.5 px-1.5 py-4 text-xs text-muted transition-colors hover:text-primary"
                      >
                        <span
                          aria-hidden="true"
                          className="inline-block transition-transform duration-200 ease-[var(--m-ease)] motion-reduce:transition-none"
                          style={{ transform: isOpen ? 'rotate(45deg)' : 'none' }}
                        >
                          +
                        </span>
                      </button>
                    )}
                  </span>
                  {hasMenu && (
                    <div
                      className={`m-menu ${isOpen ? 'is-open' : ''} absolute left-0 top-full min-w-[15rem] rounded-site border border-line bg-surface py-2 shadow-site`}
                    >
                      {g.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block px-4 py-2 text-sm text-ink transition-colors duration-200 hover:bg-primary-soft hover:text-primary"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </nav>
        </div>

        {/* mobile drawer. Always mounted, hidden with `visibility`, so it
            animates out as well as in and stays out of the tab order while
            it is away. */}
        {/* The wrapper is exactly the viewport and clips what it holds. Without
            it the closed drawer, parked at translateX(100%), would sit a full
            panel-width past the right edge and give every page a horizontal
            scrollbar. It takes no pointer events of its own; its children are
            visibility:hidden while closed, so nothing here is in the way. */}
        <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden lg:hidden">
          <div
            aria-hidden={drawer ? undefined : 'true'}
            onClick={() => setDrawer(false)}
            className={`m-scrim ${drawer ? 'is-open' : ''} pointer-events-auto absolute inset-0 bg-black/40`}
          />
          <div className={`m-drawer ${drawer ? 'is-open' : ''} pointer-events-auto absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-surface`}>
          <div className="flex items-center justify-between border-b border-line px-4 py-3">
            <Link href="/" aria-label={`${config.displayName} home`}>
              {brand}
            </Link>
            {/* The same control in the same place as the one that opened the
                drawer, so as the panel arrives the three rules resolve into a
                cross rather than being replaced by an unrelated glyph. The
                drawer covers the header it came from, which is why the close
                has to live in here: a toggle left behind in the header would
                be under the panel and unreachable. */}
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setDrawer(false)}
              className="flex h-11 w-11 items-center justify-center rounded-site border border-line text-primary-dark"
            >
              <Bars crossed={drawer} />
            </button>
          </div>
          <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-4 py-5">
            {groups.map((g, i) => (
              <div
                key={g.label}
                className="m-drawer-item border-b border-line py-4 last:border-b-0"
                style={{
                  // On the way in the links follow one another; on the way
                  // out they leave together, because a staggered exit reads
                  // as the menu being slow to let go.
                  transitionDelay: drawer ? `${MOTION.interaction.drawerStagger * i}ms` : '0ms',
                }}
              >
                {g.href ? (
                  <Link href={g.href} className="font-heading text-lg font-semibold text-primary-dark">
                    {g.label}
                  </Link>
                ) : (
                  <span className="font-heading text-lg font-semibold text-primary-dark">{g.label}</span>
                )}
                {g.items.length > 0 && (
                  <ul className="mt-3 space-y-2">
                    {g.items.map((item) => (
                      <li key={item.href}>
                        <Link href={item.href} className="block py-1 text-base text-ink">
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </nav>
          <div className="border-t border-line p-4">
            <Link
              href="/contact#contact-form"
              className="m-btn flex min-h-[3rem] items-center justify-center rounded-full bg-accent px-6 text-base font-semibold text-on-accent"
            >
              Free Consultation
            </Link>
            </div>
          </div>
        </div>
    </header>
  )
}
