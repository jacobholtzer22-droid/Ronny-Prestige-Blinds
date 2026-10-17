import type { Metadata } from 'next'
import type { CSSProperties, ReactNode } from 'react'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import MobileCallBar from '@/components/MobileCallBar'
import PageFade from '@/components/PageFade'
import { config } from '@/lib/config'
import { motionVars } from '@/lib/motion'
import { buildTitle, renderTitle, TITLE_TEMPLATE } from '@/lib/seo'
import theme from '@/theme'
import { bodyFont, headingFont } from './fonts'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(config.domain),
  title: {
    default: renderTitle(buildTitle({ kind: 'home' })),
    template: TITLE_TEMPLATE,
  },
  applicationName: config.displayName,
  // Pre-launch: noindex until config.prelaunch is flipped to false at launch.
  robots: config.prelaunch ? { index: false, follow: false } : { index: true, follow: true },
}

const cssVars = {
  '--c-primary': theme.palette.primary,
  '--c-primary-dark': theme.palette.primaryDark,
  '--c-primary-soft': theme.palette.primarySoft,
  '--c-accent': theme.palette.accent,
  '--c-accent-dark': theme.palette.accentDark,
  '--c-bg': theme.palette.bg,
  '--c-surface': theme.palette.surface,
  '--c-ink': theme.palette.ink,
  '--c-muted': theme.palette.muted,
  '--c-line': theme.palette.line,
  '--c-on-primary': theme.palette.onPrimary,
  '--c-on-accent': theme.palette.onAccent,
  '--radius': `${theme.radius}rem`,
  '--shadow': theme.shadow,
  // Durations, easing and distances, from lib/motion.ts. app/globals.css
  // reads these, so the stylesheet and the JS-driven pieces share one source.
  ...motionVars,
} as CSSProperties

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${headingFont.variable} ${bodyFont.variable}`} style={cssVars}>
      <head>
        {/* Without JavaScript the IntersectionObserver in lib/use-in-view.ts
            never runs, so every entrance class would stay at its hidden
            resting state. The markup is all present; this makes it visible.
            Every class with a hidden resting state in app/globals.css has to
            appear here, or a visitor with scripting off loses that content.

            The hero copy and the route fade are not listed: those are CSS
            animations with `backwards` fill, which run at first paint and do
            not depend on a script. */}
        <noscript>
          <style>
            {
              '.m-rise,.m-slide-x,.m-wipe,.m-wipe-in,.m-line,.m-frame{opacity:1 !important;transform:none !important;clip-path:none !important;transition:none !important}' +
              '.m-mask{overflow:visible;padding-bottom:0;margin-bottom:0}' +
              '.m-mask-in{transform:none !important;transition:none !important}' +
              // A closed <details> hides its own contents, so with no script to
              // drive the open state every answer is simply shown.
              '.m-faq-body{grid-template-rows:1fr !important}.m-faq-answer{opacity:1 !important}'
            }
          </style>
        </noscript>
      </head>
      <body className="flex min-h-screen flex-col pb-16 md:pb-0">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-site focus:bg-surface focus:px-3 focus:py-2"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          <PageFade>{children}</PageFade>
        </main>
        <Footer />
        <MobileCallBar />
      </body>
    </html>
  )
}
