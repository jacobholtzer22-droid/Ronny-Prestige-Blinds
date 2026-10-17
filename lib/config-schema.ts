import { z } from 'zod'

/**
 * The schema every site.config.ts is parsed against.
 *
 * This file deliberately does NOT parse anything at import time, so
 * scripts/verify.ts can import the schema and report a parse failure as a
 * check result instead of crashing. lib/config.ts is the module that parses
 * at load and throws, which is what makes an invalid config fail `next build`.
 */

/**
 * Where every contact form submission goes. Frozen, never an env var.
 * The bare apex (alignandacquire.com without www) answers with a 308 that
 * the platform's own tooling does not follow, so the "www." is load-bearing.
 */
export const CONTACT_ENDPOINT = 'https://www.alignandacquire.com/api/contact' as const

/** The honeypot field name the platform checks. Must match lib/spam-constants.ts there. */
export const HONEYPOT_FIELD = 'hp_7d3a_ref' as const

/**
 * Real schema.org types a site may declare itself as. "LandscapingBusiness" and
 * "LandscapeService" do not exist on schema.org and are not accepted. Landscaping
 * and other outdoor trades use HomeAndConstructionBusiness.
 */
export const SCHEMA_TYPES = [
  'HomeAndConstructionBusiness',
  'Plumber',
  'Electrician',
  'HVACBusiness',
  'RoofingContractor',
  'MovingCompany',
  'AutoRepair',
  'GeneralContractor',
  'LocalBusiness',
  'ProfessionalService',
  'Locksmith',
  'HousePainter',
] as const

export type SchemaType = (typeof SCHEMA_TYPES)[number]

export const SLUG_REGEX = /^[a-z0-9]+(-[a-z0-9]+)*$/
const TIME_REGEX = /^([01]\d|2[0-3]):[0-5]\d$/

const slug = z.string().regex(SLUG_REGEX, 'must be kebab-case: lowercase letters, digits, single hyphens')

/**
 * A page's real URL path. The old WordPress site's URLs are the canonical ones
 * now, so a page's path is authored here rather than derived from its slug:
 * `/plantation-shutters`, not `/services/plantation-shutters`. lib/routes.ts
 * reads these and is the single registry the sitemap, nav, llms.txt and verify
 * checks 16 and 17 all resolve from.
 */
export const PATH_REGEX = /^\/[a-z0-9]+(?:[-/][a-z0-9]+)*$/
const pagePath = z.string().regex(PATH_REGEX, 'must be an absolute kebab-case path, e.g. /plantation-shutters')

/** Explicit <title>. 30 to 60 characters, because verify check 13 measures the rendered title. */
const seoTitle = z.string().min(30).max(60)

const faq = z.object({
  q: z.string().min(8),
  a: z.string().min(20),
})

export const siteConfigSchema = z
  .object({
    /**
     * Sent with every contact form submission and must match a live Business
     * row in the platform database, or every lead from this site is lost.
     * verify.ts confirms it against the platform (check 3) and rejects the
     * shipped sample identity (check 2).
     */
    businessSlug: slug,

    legalName: z.string().min(2),
    displayName: z.string().min(2),
    tagline: z.string().min(10),

    schemaType: z.enum(SCHEMA_TYPES),

    /** E.164. The single source of truth for the phone number; phoneDisplay is derived from it. */
    phone: z.string().regex(/^\+1\d{10}$/, 'must be E.164: +1 followed by 10 digits'),
    email: z.string().email().nullable(),

    /**
     * null when the business does not publish an address. Address-dependent
     * schema properties and the address block do not render.
     */
    address: z
      .object({
        street: z.string().min(3),
        city: z.string().min(2),
        state: z.string().length(2),
        zip: z.string().regex(/^\d{5}$/),
        lat: z.number().nullable(),
        lng: z.number().nullable(),
      })
      .nullable(),

    primaryCity: z.string().min(2),
    /** Two-letter state for titles and area pages. Kept top-level because address may be null. */
    primaryState: z.string().length(2),

    serviceAreas: z
      .array(
        z.object({
          slug,
          /** The old site's pattern: /<city>-window-treatments */
          path: pagePath,
          seoTitle,
          name: z.string().min(2),
          county: z.string().nullable(),
          /** Which entry in `counties` this city belongs to. */
          countySlug: slug,
          faqs: z.array(faq).min(3).max(6),
        }),
      )
      .min(1),

    services: z
      .array(
        z.object({
          slug,
          /** The old site's URL for this service. Serving it keeps indexed links alive. */
          path: pagePath,
          seoTitle,
          name: z.string().min(2),
          shortDescription: z.string().min(40).max(200),
          priceFrom: z.number().nullable(),
          priceNote: z.string().nullable(),
          /** Filename in public/images/originals to use as the page image, or null. */
          image: z.string().nullable(),
          faqs: z.array(faq).min(3).max(6),
        }),
      )
      .min(1),

    /**
     * Individual products that sit under a service, each at its own old URL
     * (/roller-shades, /panel-track-shutters, ...). Same shape as a service
     * plus `parent`, so one page template renders both.
     */
    products: z
      .array(
        z.object({
          slug,
          path: pagePath,
          seoTitle,
          name: z.string().min(2),
          /** Slug of the service in `services` this product belongs under. */
          parent: slug,
          shortDescription: z.string().min(40).max(200),
          priceFrom: z.number().nullable(),
          priceNote: z.string().nullable(),
          image: z.string().nullable(),
          faqs: z.array(faq).min(3).max(6),
        }),
      )
      .default([]),

    /**
     * County hub pages. `towns` names the entries in `coverage` for that
     * county; a town that also has a serviceArea entry is linked.
     */
    counties: z
      .array(
        z.object({
          slug,
          path: pagePath,
          seoTitle,
          name: z.string().min(4),
        }),
      )
      .default([]),

    /**
     * Service-plus-city pages the old site ranked for, each at its exact old
     * URL. These are NOT the service page with a city swapped in: each needs
     * its own body. `term` is the primary search term the old page used.
     */
    localPages: z
      .array(
        z.object({
          slug,
          path: pagePath,
          seoTitle,
          /** Slug in `services` this page funnels to. */
          service: slug,
          /**
           * Slug in `serviceAreas` for the city, or null when the page is for
           * the primary city, which has no separate area page of its own.
           */
          area: slug.nullable(),
          city: z.string().min(2),
          /** The old page's primary term, kept in the H1. */
          term: z.string().min(4),
          h1: z.string().min(10),
          faqs: z.array(faq).min(3).max(6),
        }),
      )
      .default([]),

    /** null means hours are unknown. openingHoursSpecification is omitted entirely. Never guess hours. */
    hours: z
      .array(
        z.object({
          day: z.enum(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']),
          open: z.string().regex(TIME_REGEX, 'HH:MM 24-hour'),
          close: z.string().regex(TIME_REGEX, 'HH:MM 24-hour'),
        }),
      )
      .nullable(),

    yearsInBusiness: z.number().int().positive().nullable(),
    licenseNumber: z.string().nullable(),
    insured: z.boolean().nullable(),

    /**
     * Review and aggregateRating schema render ONLY when this array is non-empty,
     * and the same reviews render visibly on the page. Empty by default. Only real
     * reviews with a source URL belong here.
     */
    reviews: z
      .array(
        z.object({
          author: z.string().min(2),
          rating: z.number().min(1).max(5),
          text: z.string().min(10),
          source: z.string().min(2),
          url: z.string().url(),
        }),
      )
      .default([]),

    profiles: z
      .object({
        gbp: z.string().url().nullable(),
        facebook: z.string().url().nullable(),
        instagram: z.string().url().nullable(),
        yelp: z.string().url().nullable(),
        angi: z.string().url().nullable(),
      })
      .partial(),

    /** "Leave us a review" destination. null hides the link. */
    reviewLink: z.string().url().nullable().default(null),

    /** Homepage FAQs. FAQPage schema on the homepage renders only when non-empty. */
    faqs: z.array(faq).default([]),

    /** Which processed images go where. Filenames are keys in public/images/manifest.json. */
    images: z.object({
      hero: z.string().nullable(),
      about: z.string().nullable(),
      gallery: z.array(z.string()).default([]),
      /**
       * Optional full-bleed hero footage, paths under /public.
       *
       * There is no poster field on purpose: `hero` above IS the poster. It
       * is already processed, already preloaded by <Img priority>, already
       * the LCP element, and already what verify check 19 measures the hero
       * copy against. A separate poster would be a second source of truth
       * for the frame a visitor actually reads the H1 over.
       *
       * Requires `hero` to be set; the refine below enforces it.
       */
      heroVideo: z.object({ desktop: z.string().min(2), mobile: z.string().min(2) }).nullable().default(null),
      /**
       * Full-bleed hero slideshow. Two or more entries turn the hero into a
       * crossfading slideshow; fewer and it stays a single static image.
       * The FIRST entry must equal `hero`, because that is the frame rendered
       * server-side, the LCP element, and the one verify check 19 measures.
       */
      heroSlides: z.array(z.string().min(2)).default([]),
    }),

    /**
     * Extra fields on the contact form. OPTIONAL, and off by default.
     *
     * Omit the whole block and the form renders exactly the fields it has
     * always rendered and posts exactly the payload it has always posted, so
     * every site built before this existed is unaffected. Each option is
     * additive on top of that baseline.
     *
     * What never changes, whatever is switched on: the endpoint, the payload
     * keys { name, phone, email, message, smsConsent, businessSlug } plus the
     * honeypot, and the SMS consent checkbox. Extra answers are folded into
     * `name` and `message`, because those are the two fields the platform
     * already parses.
     */
    contactForm: z
      .object({
        /**
         * Ask for first and last name separately. `name` is still posted as
         * one string, "First Last".
         */
        splitName: z.boolean().default(false),
        /**
         * Street address and city. 'optional' renders them and lets the form
         * through empty; 'required' blocks submission until both are filled.
         * Trades that quote on site need the address; a consultant does not.
         */
        address: z.enum(['off', 'optional', 'required']).default('off'),
        /**
         * Ask for a ZIP or postal code. Independent of `address`.
         *
         * With `address` on, the ZIP sits in the address group and folds into
         * the Address line, which is how a street address is normally written.
         * With `address` off, it renders on its own and folds in as its own
         * "ZIP:" line. A business that quotes from local data needs the ZIP and
         * has no use for the street.
         */
        zip: z.enum(['off', 'optional', 'required']).default('off'),
        /**
         * A "how soon do you need this" dropdown.
         *
         * The label and the choices are per-client because the useful answers
         * are: a water treatment company cares about install timing, a roofer
         * about whether it is leaking now. An empty first choice means the
         * select has no default, so a required timeframe cannot be satisfied by
         * the visitor ignoring it.
         */
        timeframe: z
          .object({
            label: z.string().min(4),
            options: z.array(z.string().min(1)).min(2),
            required: z.boolean().default(false),
          })
          .optional(),
        /**
         * A dropdown of config.services by name, plus "Not sure yet" so nobody
         * is forced to self-diagnose before they can send a message.
         */
        serviceDropdown: z.boolean().default(false),
        /** Require the email address. It is optional by default. */
        emailRequired: z.boolean().default(false),

        /**
         * COPY ONLY. The three options below change wording, never a field,
         * never a payload key, and never a validation rule. They exist because
         * the message box and the submit button are the two places where
         * generic wording costs conversions, and a DJ, a roofer and a
         * consultant need different words there.
         *
         * Each default is the exact text this form has always rendered, so a
         * site that omits them is byte-identical to before they existed.
         */

        /** Label above the message textarea. */
        messageLabel: z.string().min(4).default('What do you need done?'),
        /**
         * Placeholder inside the message textarea. OPTIONAL WITH NO DEFAULT on
         * purpose: the form has never had a placeholder here, and defaulting to
         * an empty string would emit `placeholder=""` where there was no
         * attribute at all. Unset means the attribute is absent.
         *
         * This is the one place to ask for several facts without adding
         * several fields: a short form converts better than a long one, so the
         * extra questions go in the box the visitor is already typing in.
         */
        messagePlaceholder: z.string().min(4).optional(),
        /** Submit button text. "Sending" while in flight is not configurable. */
        submitLabel: z.string().min(4).default('Send Message'),
      })
      .optional(),

    /**
     * Pre-launch mode. True keeps the site out of every index: the layout emits
     * robots noindex/nofollow and robots.txt disallows everything. Flip to
     * false at launch, then redeploy.
     */
    prelaunch: z.boolean().default(false),

    /**
     * One standing promotion, rendered by components/PromoBand.tsx on the
     * homepage, every service page, and the contact page. null renders nothing.
     * The only place a numeral offer figure is allowed to live; never in MDX.
     */
    offer: z
      .object({
        headline: z.string().min(8),
        detail: z.string().min(20),
        finePrint: z.string().nullable(),
      })
      .nullable(),

    /**
     * Towns the business will travel to, grouped by county, rendered as plain
     * text by components/CoverageList.tsx. These are NOT links and NOT pages:
     * serviceAreas above is the short list that gets its own page each.
     */
    coverage: z
      .array(
        z.object({
          county: z.string().min(3),
          towns: z.array(z.string().min(2)).min(1),
        }),
      )
      .default([]),

    /**
     * Customer quotes shown on the page and NOWHERE in schema. Deliberately
     * separate from `reviews` above: that field emits Review and
     * aggregateRating JSON-LD, which needs a verifiable rating and source URL.
     * Quotes carried over from a client's own site have neither, so they live
     * here and `reviews` stays empty.
     */
    testimonials: z
      .array(
        z.object({
          quote: z.string().min(20),
          name: z.string().min(2),
        }),
      )
      .default([]),

    /** Full origin including https:// and www. when www is the primary host. No trailing slash. */
    domain: z
      .string()
      .url()
      .regex(/^https:\/\/[^/]+$/, 'origin only: https://www.example-host.com with no path or trailing slash'),
  })
  .strict()
  .superRefine((cfg, ctx) => {
    // Footage with no poster would leave the hero blank until the clip
    // decodes, and would leave check 19 with nothing to measure.
    if (cfg.images.heroSlides.length > 0 && cfg.images.heroSlides[0] !== cfg.images.hero) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['images', 'heroSlides'],
        message: 'the first slide must be images.hero: it is the server-rendered frame and the one check 19 measures',
      })
    }
    if (cfg.images.heroVideo && !cfg.images.hero) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['images', 'heroVideo'],
        message: 'images.hero must be set when images.heroVideo is: the hero image is the video poster and the LCP element',
      })
    }
  })

export type SiteConfigInput = z.input<typeof siteConfigSchema>
export type SiteConfigParsed = z.output<typeof siteConfigSchema>

export type Service = SiteConfigParsed['services'][number]
export type Product = SiteConfigParsed['products'][number]
export type County = SiteConfigParsed['counties'][number]
export type LocalPage = SiteConfigParsed['localPages'][number]
export type ServiceArea = SiteConfigParsed['serviceAreas'][number]
export type Review = SiteConfigParsed['reviews'][number]
export type Faq = SiteConfigParsed['faqs'][number]
export type Hours = NonNullable<SiteConfigParsed['hours']>

/** Derived fields that are computed, never authored. */
export type SiteConfig = SiteConfigParsed & {
  phoneDisplay: string
  /** The first service in config, used in the home and area page titles. */
  primaryService: Service
}

/** "+15555550123" -> "(555) 555-0123". Authored nowhere; derived from config.phone. */
export function formatPhoneDisplay(e164: string): string {
  const d = e164.replace(/\D/g, '').slice(-10)
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`
}

export function deriveConfig(parsed: SiteConfigParsed): SiteConfig {
  const primaryService = parsed.services[0]
  if (!primaryService) throw new Error('services must have at least one entry')
  return { ...parsed, phoneDisplay: formatPhoneDisplay(parsed.phone), primaryService }
}
