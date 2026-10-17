import { config } from '@/lib/config'

/**
 * The band the current site puts directly under its hero. His is a row of
 * review-platform badges with star graphics; ours carries the same signal as
 * plain text, because we do not publish ratings we cannot verify and we do not
 * use other companies' logos.
 *
 * Every claim here is a sourced fact from BRIEF.md or config.
 */
const PROFILE_LABELS: Record<string, string> = {
  gbp: 'Google',
  yelp: 'Yelp',
  angi: 'Angi',
  facebook: 'Facebook',
  instagram: 'Instagram',
}
const ORDER = ['gbp', 'yelp', 'angi']

export default function TrustBand() {
  const facts = [
    config.yearsInBusiness !== null ? `${config.yearsInBusiness} years in South Florida` : null,
    'Free in-home consultation',
    'Same-day estimates',
    'Norman and Lafayette',
  ].filter((f): f is string => f !== null)

  const profiles = ORDER.map(
    (k) => [k, (config.profiles as Record<string, string | null | undefined>)[k]] as const,
  ).filter((e): e is readonly [string, string] => typeof e[1] === 'string')

  return (
    <section aria-label="At a glance" className="border-b border-line bg-surface">
      <div className="mx-auto flex max-w-page flex-col gap-4 px-4 py-5 sm:px-6 md:flex-row md:items-center md:justify-between">
        <ul className="flex flex-wrap items-center gap-x-7 gap-y-2">
          {facts.map((f) => (
            <li key={f} className="flex items-center gap-2 text-sm font-medium text-primary-dark">
              <span aria-hidden="true" className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
              {f}
            </li>
          ))}
        </ul>
        {profiles.length > 0 && (
          <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted">
            <span>Find us on</span>
            {profiles.map(([k, url]) => (
              <a
                key={k}
                href={url}
                rel="noopener"
                target="_blank"
                className="font-medium text-primary underline-offset-2 hover:underline"
              >
                {PROFILE_LABELS[k] ?? k}
              </a>
            ))}
          </p>
        )}
      </div>
    </section>
  )
}
