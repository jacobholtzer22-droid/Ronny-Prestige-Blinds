import { config } from '@/lib/config'
import { MOTION } from '@/lib/motion'
import Img from './Img'
import RevealHeading from './RevealHeading'
import RevealImage from './RevealImage'

/**
 * config.images.gallery on a full-dark section: the homepage's guaranteed
 * change of visual treatment. Nothing renders when the list is empty.
 *
 * Each photograph is uncovered by a wipe rather than faded, and they go one
 * after another, so the band reads as a reel being laid out rather than as a
 * block appearing.
 *
 * The stagger is a delay on each wipe rather than a RevealGrid around them:
 * a grid would fade each wrapper from zero on top of the wipe, and on a
 * section this size two stacked hidden states means most of a second of flat
 * dark blue before anything shows.
 */
export default function Gallery({ heading = 'Recent Work' }: { heading?: string }) {
  const images = config.images.gallery
  if (images.length === 0) return null
  return (
    <section className="bg-primary-dark text-on-primary">
      <div className="mx-auto max-w-page px-4 py-16 sm:px-6 md:py-24">
        <RevealHeading headingClassName="font-heading text-3xl font-bold md:text-4xl">
          {heading}
        </RevealHeading>
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((name, i) => (
            <figure key={name} className={i === 0 ? 'sm:col-span-2 sm:row-span-2' : ''}>
              <RevealImage className="h-full" delay={i * MOTION.stagger}>
                <Img
                  name={name}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="h-full w-full object-cover"
                />
              </RevealImage>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
