import type { Metadata } from 'next'
import Credentials from '@/components/Credentials'
import CtaBand from '@/components/CtaBand'
import Img from '@/components/Img'
import RevealImage from '@/components/RevealImage'
import JsonLd from '@/components/JsonLd'
import Em from '@/components/Em'
import InnerHero from '@/components/InnerHero'
import Testimonials from '@/components/Testimonials'
import { config } from '@/lib/config'
import { loadContent, readFrontmatter } from '@/lib/content'
import { breadcrumbList } from '@/lib/schema'
import { buildMetadata } from '@/lib/seo'

const CONTENT = 'about.mdx'
const CRUMBS = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
]

export function generateMetadata(): Metadata {
  const fm = readFrontmatter(CONTENT)
  return buildMetadata({ kind: 'about', path: '/about', description: fm.description, image: fm.image ?? config.images.about }).metadata
}

export default async function AboutPage() {
  const { content } = await loadContent(CONTENT)
  return (
    <>
      <JsonLd data={breadcrumbList(CRUMBS)} />
      <InnerHero
        eyebrow="About"
        title={
          <>
            Twenty years of <Em>custom</Em> window treatments
          </>
        }
        intro={config.tagline}
        crumbs={CRUMBS}
        image={config.images.about}
      />
      <div className="mx-auto grid max-w-page gap-10 px-4 pt-10 sm:px-6 lg:grid-cols-3">
        <article className="lg:col-span-2">
          <Credentials />
          {content}
        </article>
        {config.images.about && (
          <aside>
            <RevealImage>
              <Img name={config.images.about} sizes="(min-width: 1024px) 33vw, 100vw" className="h-auto w-full" />
            </RevealImage>
          </aside>
        )}
      </div>
      <Testimonials />
      <CtaBand />
    </>
  )
}
