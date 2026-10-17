import { config } from '@/lib/config'
import CountUp from './CountUp'
import DrawLine from './DrawLine'
import Em from './Em'
import RevealGrid from './RevealGrid'
import RevealHeading from './RevealHeading'

/** Line icons, inline so there is no icon font and no extra request. */
const ICONS: Record<string, JSX.Element> = {
  years: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  selection: (
    <>
      <path d="M4 5h16M4 12h16M4 19h16" />
      <path d="M8 3v18" />
    </>
  ),
  speed: (
    <>
      <path d="M12 21a9 9 0 1 0-9-9" />
      <path d="M3 12H1m2-5 1.5 1.5" />
      <path d="m13 11-3 4" />
    </>
  ),
  custom: (
    <>
      <path d="m12 3 2.3 4.9 5.2.8-3.8 3.8.9 5.4-4.6-2.6-4.6 2.6.9-5.4L4.5 8.7l5.2-.8z" />
    </>
  ),
}

function Icon({ name }: { name: keyof typeof ICONS }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-7 w-7 text-accent"
    >
      {ICONS[name]}
    </svg>
  )
}

export default function WhyPrestige() {
  const years = config.yearsInBusiness
  return (
    <section className="bg-surface">
      <div className="mx-auto max-w-page px-4 py-20 sm:px-6 md:py-28">
        <DrawLine className="mb-6" />
        <RevealHeading
          eyebrow="Why Prestige"
          headingClassName="mt-4 font-heading text-3xl font-bold text-primary-dark md:text-4xl"
        >
          Why choose <Em>Prestige Blinds</Em>?
        </RevealHeading>
        <RevealGrid className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Icon name="years" />
            <h3 className="mt-4 font-heading text-xl font-semibold text-primary-dark">
              {years !== null ? (
                <>
                  <CountUp to={years} /> years in South Florida
                </>
              ) : (
                'Years in South Florida'
              )}
            </h3>
            <p className="mt-2 text-base leading-relaxed text-muted">
              Two decades of choosing treatments for this climate specifically, which is a different judgment call from
              the one a catalog makes.
            </p>
          </div>
          <div>
            <Icon name="selection" />
            <h3 className="mt-4 font-heading text-xl font-semibold text-primary-dark">
              Wide selection of window treatments
            </h3>
            <p className="mt-2 text-base leading-relaxed text-muted">
              Trusted brands including Norman and Lafayette, with hundreds of fabrics and materials to choose from. We
              bring the samples to you.
            </p>
          </div>
          <div>
            <Icon name="speed" />
            <h3 className="mt-4 font-heading text-xl font-semibold text-primary-dark">Same-day estimates</h3>
            <p className="mt-2 text-base leading-relaxed text-muted">
              Same-day installation is available on in-stock products. Custom shutters and special orders are made to
              your windows, so those take longer.
            </p>
          </div>
          <div>
            <Icon name="custom" />
            <h3 className="mt-4 font-heading text-xl font-semibold text-primary-dark">
              Special orders and custom options
            </h3>
            <p className="mt-2 text-base leading-relaxed text-muted">
              Everything is made to the opening, and we can match the color scheme already in the room rather than
              approximate it.
            </p>
          </div>
        </RevealGrid>
      </div>
    </section>
  )
}
