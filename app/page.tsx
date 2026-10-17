import type { Metadata } from 'next'
import Button from '@/components/Button'
import CtaBand from '@/components/CtaBand'
import DrawLine from '@/components/DrawLine'
import Em from '@/components/Em'
import FaqAccordion from '@/components/FaqAccordion'
import Gallery from '@/components/Gallery'
import Hero from '@/components/Hero'
import Img from '@/components/Img'
import InstagramGrid from '@/components/InstagramGrid'
import IntroWithForm from '@/components/IntroWithForm'
import JsonLd from '@/components/JsonLd'
import ProductTiles from '@/components/ProductTiles'
import PromoBand from '@/components/PromoBand'
import RevealHeading from '@/components/RevealHeading'
import RevealImage from '@/components/RevealImage'
import RevealText from '@/components/RevealText'
import ServiceAreaSection from '@/components/ServiceAreaSection'
import Testimonials from '@/components/Testimonials'
import TrustBand from '@/components/TrustBand'
import WhyPrestige from '@/components/WhyPrestige'
import { config } from '@/lib/config'
import { loadContent, readFrontmatter } from '@/lib/content'
import { HOMEPAGE_POSTS } from '@/lib/instagram'
import { faqPage, localBusiness, organization, website } from '@/lib/schema'
import { buildMetadata } from '@/lib/seo'

const CONTENT = 'home.mdx'

export function generateMetadata(): Metadata {
  const fm = readFrontmatter(CONTENT)
  return buildMetadata({ kind: 'home', path: '/', description: fm.description, image: fm.image }).metadata
}

export default async function HomePage() {
  const { content } = await loadContent(CONTENT)
  const about = config.images.about

  return (
    <>
      <JsonLd data={localBusiness()} />
      <JsonLd data={organization()} />
      <JsonLd data={website()} />
      <JsonLd data={faqPage(config.faqs)} />

      <Hero />
      <TrustBand />
      <IntroWithForm />
      <ProductTiles />
      <CtaBand />
      <WhyPrestige />

      {/* Recent work: his own Instagram, where the old site shows it. */}
      <section className="mx-auto max-w-page px-4 py-20 sm:px-6 md:py-28">
        <DrawLine className="mb-6" />
        <RevealHeading
          eyebrow="Our work"
          headingClassName="mt-4 font-heading text-3xl font-bold text-primary-dark md:text-4xl"
        >
          Recent <Em>installations</Em>
        </RevealHeading>
        <div className="mt-12">
          <InstagramGrid posts={HOMEPAGE_POSTS} follow />
        </div>
        <RevealText className="mt-8">
          <Button href="/prestige-blinds-portfolio" variant="secondary">
            See more of our work
          </Button>
        </RevealText>
      </section>

      <Testimonials />
      <Gallery />

      {/* Window treatments you will love */}
      <section className="bg-surface">
        <div className="mx-auto grid max-w-page items-center gap-12 px-4 py-20 sm:px-6 md:py-28 lg:grid-cols-2">
          <div>
            <DrawLine className="mb-6" />
            <RevealHeading
              eyebrow="About us"
              headingClassName="mt-4 font-heading text-3xl font-bold text-primary-dark md:text-4xl"
            >
              Window treatments you will <Em>love</Em>
            </RevealHeading>
            <RevealText className="prose-none mt-6 [&>p]:mt-4 [&>p]:text-base [&>p]:leading-relaxed [&>p]:text-ink [&>h2]:hidden [&>h3]:hidden">
              {content}
            </RevealText>
            <RevealText className="mt-8">
              <Button href="/about" variant="secondary">
                More about us
              </Button>
            </RevealText>
          </div>
          {about && (
            <RevealImage>
              <Img name={about} sizes="(min-width: 1024px) 45vw, 100vw" className="h-auto w-full" />
            </RevealImage>
          )}
        </div>
      </section>

      <ServiceAreaSection />
      <PromoBand />
      <FaqAccordion faqs={config.faqs} />
      <CtaBand />
    </>
  )
}
