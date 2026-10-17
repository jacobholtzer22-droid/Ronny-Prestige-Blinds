import type { Metadata } from 'next'
import ContactDetails from '@/components/ContactDetails'
import ContactForm from '@/components/ContactForm'
import JsonLd from '@/components/JsonLd'
import CoverageList from '@/components/CoverageList'
import Em from '@/components/Em'
import InnerHero from '@/components/InnerHero'
import PromoBand from '@/components/PromoBand'
import { config } from '@/lib/config'
import { loadContent, readFrontmatter } from '@/lib/content'
import { breadcrumbList } from '@/lib/schema'
import { buildMetadata } from '@/lib/seo'

const CONTENT = 'contact.mdx'
const CRUMBS = [
  { name: 'Home', path: '/' },
  { name: 'Contact', path: '/contact' },
]

export function generateMetadata(): Metadata {
  const fm = readFrontmatter(CONTENT)
  return buildMetadata({ kind: 'contact', path: '/contact', description: fm.description, image: fm.image }).metadata
}

export default async function ContactPage() {
  const { content } = await loadContent(CONTENT)
  return (
    <>
      <JsonLd data={breadcrumbList(CRUMBS)} />
      <InnerHero
        eyebrow="Contact"
        title={
          <>
            Book a free <Em>in-home</Em> consultation
          </>
        }
        intro={`We come to you anywhere within fifty miles of ${config.primaryCity}, measure, and bring samples.`}
        crumbs={CRUMBS}
        secondaryHref="/custom-window-treatments"
        secondaryLabel="See What We Install"
      />
      <PromoBand />
      <div className="mx-auto grid max-w-page gap-10 px-4 pt-10 sm:px-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <article className="mb-8">{content}</article>
          <div id="contact-form" className="scroll-mt-28">
            <ContactForm />
          </div>
        </div>
        <aside>
          <ContactDetails />
        </aside>
      </div>
      <CoverageList />
    </>
  )
}
