import RevealGrid from './RevealGrid'
import RevealHeading from './RevealHeading'

/**
 * The five steps from consultation to cleanup, the sequence the current site
 * describes on its shutters page. Shared by every service and product page so
 * the promise is identical wherever a visitor lands.
 */
const STEPS = [
  ['Free in-home consultation', 'We come to you, look at the windows and the room, and bring samples so you can see materials and finishes in the light they will actually sit in.'],
  ['Measure', 'Every opening is measured on site. Very little housing stock here is a standard size, and a quote without a measure is a guess.'],
  ['Custom order', 'You choose the material, color, and operation, and the order goes in built to your measurements rather than cut down from stock.'],
  ['Installation', 'We take down whatever is there now, prepare the opening, and mount the new treatment, either to the trim or inside the recess.'],
  ['Final adjustment and cleanup', 'We check every panel and shade opens and closes properly, make the final adjustments, and clear up before we leave.'],
]

export default function ProcessSteps({ heading = 'How it works' }: { heading?: string }) {
  return (
    <section className="bg-surface">
      <div className="mx-auto max-w-page px-4 py-16 sm:px-6 md:py-20">
        <RevealHeading eyebrow="The process" headingClassName="mt-4 font-heading text-3xl font-bold text-primary-dark">
          {heading}
        </RevealHeading>
        <RevealGrid as="ol" itemAs="li" className="mt-10 grid gap-8 md:grid-cols-5">
          {STEPS.map(([title, body], i) => (
            <div key={title}>
              <span className="font-heading text-sm font-semibold tabular-nums text-accent">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-2 font-heading text-lg font-semibold text-primary-dark">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
            </div>
          ))}
        </RevealGrid>
      </div>
    </section>
  )
}
