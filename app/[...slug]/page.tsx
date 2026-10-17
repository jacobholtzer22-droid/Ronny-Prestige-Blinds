import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { ReactNode } from 'react'
import CoverageList from '@/components/CoverageList'
import CtaBand from '@/components/CtaBand'
import Em from '@/components/Em'
import Eyebrow from '@/components/Eyebrow'
import FaqAccordion from '@/components/FaqAccordion'
import Gallery from '@/components/Gallery'
import InnerHero from '@/components/InnerHero'
import InstagramGrid from '@/components/InstagramGrid'
import JsonLd from '@/components/JsonLd'
import LocalPagesList from '@/components/LocalPagesList'
import ProcessSteps from '@/components/ProcessSteps'
import PromoBand from '@/components/PromoBand'
import RelatedLinks, { type RelatedLink } from '@/components/RelatedLinks'
import Reveal from '@/components/Reveal'
import ServiceGrid from '@/components/ServiceGrid'
import { config, formatTime, getArea, getCounty, getLocalPage, getProduct, getService } from '@/lib/config'
import { loadContent, readFrontmatter } from '@/lib/content'
import { INSTAGRAM_POSTS, postsFor, type InstagramPost } from '@/lib/instagram'
import {
  areasOf,
  countyOf,
  dynamicRoutes,
  findDynamicRoute,
  localPagesOf,
  parentOf,
  pathToSegments,
  productsOf,
  siblingsOf,
  type RouteEntry,
} from '@/lib/routes'
import { breadcrumbList, faqPage, localBusiness, service as serviceSchema, type Crumb } from '@/lib/schema'
import { buildMetadata } from '@/lib/seo'

/**
 * Every registry-driven page. The old WordPress site's URLs are the canonical
 * ones, so a service lives at /plantation-shutters rather than under a
 * /services/ prefix, and one catch-all resolves all of them against
 * lib/routes.ts. app/about, app/contact, app/privacy-policy and app/page.tsx
 * keep their own folders and take precedence over this route.
 */

export function generateStaticParams() {
  return dynamicRoutes().map((r) => ({ slug: pathToSegments(r.path) }))
}

type Params = { params: { slug: string[] } }

function contentPath(route: RouteEntry): string | null {
  switch (route.kind) {
    case 'hub':
      return 'custom-window-treatments.mdx'
    case 'service':
      return `services/${route.slug}.mdx`
    case 'product':
      return `products/${route.slug}.mdx`
    case 'local':
      return `local/${route.slug}.mdx`
    case 'area':
      return `areas/${route.slug}.mdx`
    case 'county':
      return `counties/${route.slug}.mdx`
    default:
      return null
  }
}

export function generateMetadata({ params }: Params): Metadata {
  const route = findDynamicRoute(params.slug)
  if (!route) return {}
  const file = contentPath(route)
  const fm = file ? readFrontmatter(file) : {}
  const common = { path: route.path, description: fm.description }

  switch (route.kind) {
    case 'service': {
      const s = getService(route.slug ?? '')
      if (!s) return {}
      return buildMetadata({ ...common, kind: 'service', service: s, title: s.seoTitle, image: fm.image ?? s.image })
        .metadata
    }
    case 'product': {
      const p = getProduct(route.slug ?? '')
      if (!p) return {}
      return buildMetadata({ ...common, kind: 'other', title: p.seoTitle, image: fm.image ?? p.image }).metadata
    }
    case 'local': {
      const l = getLocalPage(route.slug ?? '')
      if (!l) return {}
      return buildMetadata({ ...common, kind: 'other', title: l.seoTitle, image: fm.image }).metadata
    }
    case 'area': {
      const a = getArea(route.slug ?? '')
      if (!a) return {}
      return buildMetadata({ ...common, kind: 'area', area: a, title: a.seoTitle, image: fm.image }).metadata
    }
    case 'county': {
      const c = getCounty(route.slug ?? '')
      if (!c) return {}
      return buildMetadata({ ...common, kind: 'other', title: c.seoTitle, image: fm.image }).metadata
    }
    case 'hub':
      return buildMetadata({ ...common, kind: 'services', image: fm.image }).metadata
    case 'areas':
      return buildMetadata({
        ...common,
        kind: 'other',
        title: `Service Areas in Broward and Palm Beach | ${config.displayName}`,
        description: common.description ?? 'Every city Prestige Blinds installs custom blinds, shades, shutters, and drapery in, across Broward County, Palm Beach County, and north Miami-Dade.',
      }).metadata
    case 'portfolio':
      return buildMetadata({
        ...common,
        kind: 'other',
        title: `Our Work: Recent Installations | ${config.displayName}`,
        description: common.description ?? 'Recent window treatment installations by Prestige Blinds across Coral Springs, Broward County, and Palm Beach County, from jobs we finished lately.',
      }).metadata
    case 'thankyou':
      return {
        ...buildMetadata({
          ...common,
          kind: 'other',
          title: `Thank You for Your Request | ${config.displayName}`,
          description: common.description ?? 'Thanks for your request. Prestige Blinds will call you back in business hours to set up your free in-home window treatment consultation and measure.',
        }).metadata,
        robots: { index: false, follow: false },
      }
    default:
      return {}
  }
}

export default async function RegistryPage({ params }: Params) {
  const route = findDynamicRoute(params.slug)
  if (!route) notFound()

  switch (route.kind) {
    case 'service':
      return ServicePage(route)
    case 'product':
      return ProductPage(route)
    case 'local':
      return LocalPage(route)
    case 'area':
      return AreaPage(route)
    case 'county':
      return CountyPage(route)
    case 'hub':
      return HubPage()
    case 'areas':
      return AreasIndexPage()
    case 'portfolio':
      return PortfolioPage()
    case 'thankyou':
      return ThankYouPage()
    default:
      notFound()
  }
}

const crumbHome: Crumb = { name: 'Home', path: '/' }

async function ServicePage(route: RouteEntry) {
  const s = getService(route.slug ?? '')
  if (!s) notFound()
  const { content } = await loadContent(`services/${s.slug}.mdx`, { service: s })
  const crumbs: Crumb[] = [
    crumbHome,
    { name: 'Window Treatments', path: '/custom-window-treatments' },
    { name: s.name, path: s.path },
  ]
  const kids = productsOf(s.slug)
  const locals = localPagesOf(s.slug)
  const others = config.services.filter((x) => x.slug !== s.slug).slice(0, 3)
  const related: RelatedLink[] = [
    ...kids.map((p) => ({ href: p.path, label: p.name, note: p.shortDescription })),
    ...locals.map((l) => ({ href: l.path, label: `${l.term} in ${l.city}`, note: `Our ${l.city} page for this service.` })),
    ...others.map((o) => ({ href: o.path, label: o.name, note: o.shortDescription })),
  ]

  return (
    <>
      <JsonLd data={serviceSchema(s)} />
      <JsonLd data={faqPage(s.faqs)} />
      <JsonLd data={breadcrumbList(crumbs)} />
      <InnerHero
        eyebrow={`Window Treatments · ${s.name}`}
        title={
          <>
            {s.name} in <Em>{config.primaryCity}</Em>
          </>
        }
        intro={s.shortDescription}
        crumbs={crumbs}
        image={s.image}
      />
      <Body>{content}</Body>
      <SeeItInstalled posts={postsFor(s.slug)} />
      <ProcessSteps />
      <PromoBand />
      <FaqAccordion faqs={s.faqs} heading={`${s.name} questions`} />
      <RelatedLinks links={related} />
      <CtaBand heading={`Need ${s.name.toLowerCase()} in ${config.primaryCity}?`} />
    </>
  )
}

async function ProductPage(route: RouteEntry) {
  const p = getProduct(route.slug ?? '')
  if (!p) notFound()
  const parent = parentOf(p)
  const { content } = await loadContent(`products/${p.slug}.mdx`, {})
  const crumbs: Crumb[] = [
    crumbHome,
    { name: 'Window Treatments', path: '/custom-window-treatments' },
    ...(parent ? [{ name: parent.name, path: parent.path }] : []),
    { name: p.name, path: p.path },
  ]
  const related: RelatedLink[] = [
    ...(parent ? [{ href: parent.path, label: parent.name, note: parent.shortDescription }] : []),
    ...siblingsOf(p)
      .slice(0, 2)
      .map((x) => ({ href: x.path, label: x.name, note: x.shortDescription })),
  ]

  return (
    <>
      <JsonLd data={serviceSchema(p)} />
      <JsonLd data={faqPage(p.faqs)} />
      <JsonLd data={breadcrumbList(crumbs)} />
      <InnerHero
        eyebrow={`${parent?.name ?? 'Window Treatments'} · ${p.name}`}
        title={
          <>
            {p.name} in <Em>{config.primaryCity}</Em>
          </>
        }
        intro={p.shortDescription}
        crumbs={crumbs}
        image={p.image}
      />
      <Body>{content}</Body>
      <SeeItInstalled posts={postsFor(p.slug)} />
      <ProcessSteps />
      <PromoBand />
      <FaqAccordion faqs={p.faqs} heading={`${p.name} questions`} />
      <RelatedLinks links={related} />
      <CtaBand heading={`Want ${p.name.toLowerCase()} in ${config.primaryCity}?`} />
    </>
  )
}

async function LocalPage(route: RouteEntry) {
  const l = getLocalPage(route.slug ?? '')
  if (!l) notFound()
  const svc = getService(l.service)
  const area = l.area ? getArea(l.area) : null
  const { content } = await loadContent(`local/${l.slug}.mdx`, {})
  const crumbs: Crumb[] = [
    crumbHome,
    ...(svc ? [{ name: svc.name, path: svc.path }] : []),
    { name: `${l.term} in ${l.city}`, path: l.path },
  ]
  const related: RelatedLink[] = [
    ...(svc ? [{ href: svc.path, label: svc.name, note: svc.shortDescription }] : []),
    ...(area
      ? [{ href: area.path, label: `${area.name} window treatments`, note: `Everything we install in ${area.name}.` }]
      : []),
    {
      href: '/custom-window-treatments',
      label: 'All window treatments',
      note: 'Shutters, shades, blinds, and drapery in one place.',
    },
  ]

  return (
    <>
      {svc && <JsonLd data={serviceSchema(svc)} />}
      <JsonLd data={faqPage(l.faqs)} />
      <JsonLd data={breadcrumbList(crumbs)} />
      <InnerHero
        eyebrow={`${l.city} · ${l.term}`}
        title={
          <>
            {l.term} in <Em>{l.city}</Em>
          </>
        }
        crumbs={crumbs}
        image={svc?.image}
      />
      <Body>{content}</Body>
      <SeeItInstalled posts={postsFor(l.slug)} />
      <ProcessSteps />
      <PromoBand />
      <FaqAccordion faqs={l.faqs} heading={`${l.term} in ${l.city}: common questions`} />
      <RelatedLinks links={related} />
      <CtaBand heading={`${l.term} in ${l.city}?`} />
    </>
  )
}

async function AreaPage(route: RouteEntry) {
  const a = getArea(route.slug ?? '')
  if (!a) notFound()
  const county = countyOf(a)
  const { content } = await loadContent(`areas/${a.slug}.mdx`, { area: a })
  const crumbs: Crumb[] = [crumbHome, { name: 'Service Areas', path: '/areas' }, { name: a.name, path: a.path }]
  const locals = config.localPages.filter((l) => l.area === a.slug)
  const related: RelatedLink[] = [
    ...(county ? [{ href: county.path, label: county.name, note: `Every city we cover in ${county.name}.` }] : []),
    ...locals.map((l) => ({ href: l.path, label: `${l.term} in ${l.city}`, note: 'Our page for this service in your city.' })),
    ...config.services.slice(0, 3).map((s) => ({ href: s.path, label: s.name, note: s.shortDescription })),
  ]

  return (
    <>
      <JsonLd data={localBusiness([a])} />
      <JsonLd data={faqPage(a.faqs)} />
      <JsonLd data={breadcrumbList(crumbs)} />
      <InnerHero
        eyebrow={`Service Area · ${a.name}`}
        title={
          <>
            {a.name} Window Treatments: Custom Blinds, Shades and <Em>Plantation Shutters</Em>
          </>
        }
        intro={a.county ? `Serving ${a.name} and the rest of ${a.county}.` : undefined}
        crumbs={crumbs}
      />
      <Body>{content}</Body>
      <AreaOptions cityName={a.name} />
      <ProcessSteps heading={`How the process works in ${a.name}`} />
      <PromoBand />
      <FaqAccordion faqs={a.faqs} heading={`${a.name} questions`} />
      <RelatedLinks links={related} />
      <CoverageList />
      <CtaBand heading={`Book a free consultation in ${a.name}`} />
    </>
  )
}

function AreaOptions({ cityName }: { cityName: string }) {
  const svcPicks = ['plantation-shutters', 'motorized-blinds', 'zebra-shades', 'blinds']
    .map((slug) => config.services.find((s) => s.slug === slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s))
  const roller = config.products.find((p) => p.slug === 'roller-shades')
  const items = [...svcPicks.slice(0, 2), ...(roller ? [roller] : []), ...svcPicks.slice(2)]

  return (
    <section className="bg-surface">
      <div className="mx-auto max-w-page px-4 py-16 sm:px-6 md:py-20">
        <Reveal>
          <Eyebrow>What we install</Eyebrow>
          <h2 className="mt-4 font-heading text-3xl font-bold text-primary-dark">
            Window treatment options in {cityName}
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {items.map((item, i) => (
            <Reveal key={item.path} stagger={i}>
              <h3 className="font-heading text-xl font-semibold text-primary-dark">{item.name}</h3>
              <p className="mt-2 text-base leading-relaxed text-muted">{item.shortDescription}</p>
              <Link
                href={item.path}
                className="mt-2 inline-block text-sm font-medium text-primary underline-offset-2 hover:underline"
              >
                More about {item.name.toLowerCase()}
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

async function CountyPage(route: RouteEntry) {
  const c = getCounty(route.slug ?? '')
  if (!c) notFound()
  const { content } = await loadContent(`counties/${c.slug}.mdx`, {})
  const crumbs: Crumb[] = [crumbHome, { name: 'Service Areas', path: '/areas' }, { name: c.name, path: c.path }]
  const cities = areasOf(c.slug)
  const group = config.coverage.find((g) => g.county === c.name)
  const linkable = new Map(cities.map((a) => [a.name, a.path]))

  return (
    <>
      <JsonLd data={localBusiness(cities.length > 0 ? cities : config.serviceAreas)} />
      <JsonLd data={breadcrumbList(crumbs)} />
      <InnerHero
        eyebrow={`Service Area · ${c.name}`}
        title={
          <>
            Window Treatments across <Em>{c.name}</Em>
          </>
        }
        crumbs={crumbs}
      />
      <Body>{content}</Body>
      {group && (
        <section className="bg-surface">
          <div className="mx-auto max-w-page px-4 py-16 sm:px-6 md:py-20">
            <Reveal>
              <Eyebrow>Towns we cover</Eyebrow>
              <h2 className="mt-4 font-heading text-3xl font-bold text-primary-dark">{c.name}</h2>
            </Reveal>
            <ul className="mt-8 grid gap-x-6 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
              {group.towns.map((town, i) => {
                const href = linkable.get(town)
                return (
                  <Reveal as="li" key={town} stagger={i}>
                    {href ? (
                      <Link href={href} className="block py-1 text-base text-ink hover:text-primary">
                        {town}
                      </Link>
                    ) : (
                      <span className="block py-1 text-base text-muted">{town}</span>
                    )}
                  </Reveal>
                )
              })}
            </ul>
          </div>
        </section>
      )}
      <ServiceGrid heading={`What we install in ${c.name}`} />
      <CtaBand heading={`Book a free consultation in ${c.name}`} />
    </>
  )
}

async function HubPage() {
  const { content } = await loadContent('custom-window-treatments.mdx')
  const crumbs: Crumb[] = [crumbHome, { name: 'Window Treatments', path: '/custom-window-treatments' }]
  const groups: { label: string; slugs: string[] }[] = [
    { label: 'Shutters', slugs: ['plantation-shutters', 'panel-track-shutters'] },
    {
      label: 'Shades',
      slugs: [
        'shades',
        'roller-shades',
        'blackout-roller-shades',
        'zebra-shades',
        'roman-shades',
        'tenera-sheer-shades',
        'outdoor-patio-shades',
      ],
    },
    { label: 'Blinds', slugs: ['blinds', 'motorized-blinds'] },
    { label: 'Drapery', slugs: ['drapery-services'] },
  ]
  const bySlug = new Map<string, { name: string; path: string; shortDescription: string }>()
  for (const s of config.services) bySlug.set(s.slug, s)
  for (const p of config.products) bySlug.set(p.slug, p)

  return (
    <>
      <JsonLd data={breadcrumbList(crumbs)} />
      <InnerHero
        eyebrow="Window Treatments"
        title={
          <>
            Custom window treatments in <Em>{config.primaryCity}</Em>
          </>
        }
        intro={config.tagline}
        crumbs={crumbs}
      />
      <Body>{content}</Body>
      {groups.map((g) => (
        <section key={g.label} className="mx-auto max-w-page px-4 py-10 sm:px-6">
          <Reveal>
            <h2 className="font-heading text-2xl font-bold text-primary-dark md:text-3xl">{g.label}</h2>
          </Reveal>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {g.slugs
              .map((s) => bySlug.get(s))
              .filter((x): x is NonNullable<typeof x> => Boolean(x))
              .map((item, i) => (
                <Reveal as="li" key={item.path} stagger={i}>
                  <Link
                    href={item.path}
                    className="block h-full rounded-site border border-line bg-surface p-5 transition-colors hover:border-primary"
                  >
                    <span className="font-heading text-lg font-semibold text-primary-dark">{item.name}</span>
                    <span className="mt-1 block text-sm leading-relaxed text-muted">{item.shortDescription}</span>
                  </Link>
                </Reveal>
              ))}
          </ul>
        </section>
      ))}
      <LocalPagesList />
      <PromoBand />
      <CtaBand />
    </>
  )
}

function AreasIndexPage() {
  const crumbs: Crumb[] = [crumbHome, { name: 'Service Areas', path: '/areas' }]
  return (
    <>
      <JsonLd data={localBusiness()} />
      <JsonLd data={breadcrumbList(crumbs)} />
      <InnerHero
        eyebrow="Service Area"
        title={
          <>
            Where <Em>Prestige Blinds</Em> installs
          </>
        }
        intro={`Within fifty miles of ${config.primaryCity}: Broward County, Palm Beach County, and the northern end of Miami-Dade.`}
        crumbs={crumbs}
      />
      <section className="mx-auto max-w-page px-4 py-16 sm:px-6 md:py-20">
        <Reveal>
          <Eyebrow>Cities</Eyebrow>
          <h2 className="mt-4 font-heading text-3xl font-bold text-primary-dark">Find your city</h2>
        </Reveal>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {config.serviceAreas.map((a, i) => (
            <Reveal as="li" key={a.path} stagger={i}>
              <Link
                href={a.path}
                className="block h-full rounded-site border border-line bg-surface p-5 transition-colors hover:border-primary"
              >
                <span className="font-heading text-lg font-semibold text-primary-dark">{a.name}</span>
                {a.county && <span className="mt-1 block text-sm text-muted">{a.county}</span>}
              </Link>
            </Reveal>
          ))}
        </ul>
        <h2 className="mt-14 font-heading text-3xl font-bold text-primary-dark">By county</h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {config.counties.map((c, i) => (
            <Reveal as="li" key={c.path} stagger={i}>
              <Link
                href={c.path}
                className="block h-full rounded-site border border-line bg-surface p-5 transition-colors hover:border-primary"
              >
                <span className="font-heading text-lg font-semibold text-primary-dark">{c.name}</span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </section>
      <LocalPagesList />
      <CoverageList />
      <CtaBand />
    </>
  )
}

function PortfolioPage() {
  const crumbs: Crumb[] = [crumbHome, { name: 'Our Work', path: '/prestige-blinds-portfolio' }]
  return (
    <>
      <JsonLd data={breadcrumbList(crumbs)} />
      <InnerHero
        eyebrow="Our Work"
        title={
          <>
            Our <Em>work</Em>
          </>
        }
        intro="Installations from across Broward and Palm Beach, straight from the jobs we finished."
        crumbs={crumbs}
        secondaryHref="/custom-window-treatments"
        secondaryLabel="What We Install"
      />
      <Gallery heading="Recent installations" />
      <section className="mx-auto max-w-page px-4 py-16 sm:px-6 md:py-20">
        <Reveal>
          <Eyebrow>From Instagram</Eyebrow>
          <h2 className="mt-4 font-heading text-3xl font-bold text-primary-dark">More of what we have been fitting</h2>
        </Reveal>
        <div className="mt-10">
          <InstagramGrid posts={INSTAGRAM_POSTS} follow />
        </div>
      </section>
      <CtaBand />
    </>
  )
}

function ThankYouPage() {
  return (
    <>
      <InnerHero
        eyebrow="Thank You"
        title={
          <>
            Thanks, we have your <Em>request</Em>
          </>
        }
        crumbs={[crumbHome, { name: 'Thank You', path: '/thank-you' }]}
        secondaryHref="/custom-window-treatments"
        secondaryLabel="Browse Window Treatments"
      />
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-20">
        <p className="text-lg leading-relaxed text-ink">
          We will call you back during business hours. If it is quicker, call us and we can talk it through now.
        </p>
        <dl className="mt-8 space-y-3 text-base">
          <div>
            <dt className="font-semibold text-ink">Phone</dt>
            <dd>
              <a href={`tel:${config.phone}`} className="font-semibold text-primary underline-offset-2 hover:underline">
                {config.phoneDisplay}
              </a>
            </dd>
          </div>
          {config.hours && (
            <div>
              <dt className="font-semibold text-ink">Hours</dt>
              <dd className="text-muted">
                {config.hours.map((h) => `${h.day} ${formatTime(h.open)} to ${formatTime(h.close)}`).join(', ')}
              </dd>
            </div>
          )}
        </dl>
      </section>
      <CtaBand />
    </>
  )
}

function Body({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto max-w-page px-4 pt-14 sm:px-6">
      <article className="max-w-3xl">{children}</article>
    </div>
  )
}

function SeeItInstalled({ posts }: { posts: InstagramPost[] }) {
  if (posts.length === 0) return null
  return (
    <section className="mx-auto max-w-page px-4 py-16 sm:px-6 md:py-20">
      <Reveal>
        <Eyebrow>Our work</Eyebrow>
        <h2 className="mt-4 font-heading text-3xl font-bold text-primary-dark">See it installed</h2>
      </Reveal>
      <div className="mt-10 max-w-3xl">
        <InstagramGrid posts={posts} columns={2} />
      </div>
    </section>
  )
}
