import ContactForm from './ContactForm'
import Em from './Em'
import Eyebrow from './Eyebrow'
import Reveal from './Reveal'
import { config } from '@/lib/config'

/**
 * The intro and the form side by side, which is where the current site puts
 * its form: above the fold, not at the bottom of the page.
 */
export default function IntroWithForm() {
  return (
    <section className="mx-auto max-w-page px-4 py-20 sm:px-6 md:py-28">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <Eyebrow>Custom window treatments</Eyebrow>
          <h2 className="mt-4 font-heading text-3xl font-bold text-primary-dark md:text-4xl">
            Window treatments by <Em>Prestige Blinds</Em>
          </h2>
          <p className="mt-6 text-base leading-relaxed text-ink">
            {config.displayName} sells, measures, and installs custom window treatments for homes and commercial
            properties in {config.primaryCity} and across South Florida. Shutters, shades, blinds, and drapery are made
            to the opening rather than bought off a shelf, with hundreds of materials and fabrics to choose from and a
            color scheme matched to the room they are going into.
          </p>
          <p className="mt-4 text-base leading-relaxed text-ink">
            Twenty years in, the work runs from a single room to commercial and hospitality projects. We carry trusted
            brands including Norman and Lafayette, we offer same-day estimates with same-day installation available, and
            the in-home consultation is free.
          </p>
        </Reveal>
        <Reveal>
          <div className="rounded-site border border-line bg-surface p-6 md:p-8">
            <h3 className="font-heading text-2xl font-semibold text-primary-dark">Request your free consultation</h3>
            <p className="mt-2 text-sm text-muted">
              Tell us how many windows and which rooms. We will come to you, measure, and bring samples.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
