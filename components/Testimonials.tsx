import { config } from '@/lib/config'
import TestimonialsCarousel from './TestimonialsCarousel'

/**
 * Customer quotes, shown and nothing more. No stars, no avatars, no platform
 * logos, and no JSON-LD: these come from the client's own site without a
 * rating or a source URL, so claiming a rating in schema would be a fabrication.
 * config.reviews stays empty, which is what lib/schema.ts keys Review markup on.
 *
 * The attribution sits OUTSIDE the <blockquote>, which is what the HTML spec
 * asks for: a blockquote is the quoted text, and nothing else.
 *
 * The quotes themselves, their order and their attributions are unchanged;
 * this now hands them to a carousel instead of a grid. Under
 * prefers-reduced-motion the carousel renders all of them stacked, so no
 * quote is ever behind an autoplay a visitor did not ask for.
 */
export default function Testimonials({ heading = 'What Customers Say' }: { heading?: string }) {
  const testimonials = config.testimonials
  if (testimonials.length === 0) return null
  return <TestimonialsCarousel heading={heading} items={testimonials} />
}
