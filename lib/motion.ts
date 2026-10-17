/**
 * The site's one motion vocabulary.
 *
 * Every duration, delay, easing, distance and stagger used anywhere on the
 * site is named here. Components import these names; no component writes a
 * raw millisecond or a raw pixel offset of its own. When the client asks for
 * "a bit slower" or "less movement", this file is the only edit.
 *
 * The numbers are read in two places and must agree in both:
 *
 *   - TypeScript, by the components that drive motion in JS (the hero, the
 *     testimonial carousel).
 *   - CSS, by the entrance family, which animates through class toggles and a
 *     plain CSS transition rather than a per-element animation runtime.
 *
 * `motionVars` is what keeps those two honest: app/layout.tsx spreads it onto
 * <html> as custom properties, and app/globals.css reads those properties. A
 * change here lands on both sides at once.
 *
 * The easing is the one the client's current site uses on its Slider
 * Revolution layers (Power3.easeOut). Everything that enters uses it, so the
 * new site decelerates the way the old one does.
 */

/** Entrance easing. Power3.easeOut in the old site's vocabulary. */
export const EASE_ENTRANCE = 'cubic-bezier(0.22, 1, 0.36, 1)'

/** The same curve as control points, for the JS-driven pieces. */
export const EASE_ENTRANCE_POINTS = [0.22, 1, 0.36, 1] as const

export const MOTION = {
  duration: {
    /** Hovers, presses, header shrink: fast enough to feel like a response. */
    fast: 200,
    /** The default entrance. */
    base: 600,
    /** Image wipes and anything that covers distance. */
    slow: 900,
    /** Hero layers. */
    hero: 1000,
  },

  /** Gap between siblings entering as a group. */
  stagger: 80,
  /** Gap between words inside one masked heading. Tighter than a grid. */
  wordStagger: 40,
  /** The hero headline reads faster than an inner heading. */
  heroWordStagger: 50,

  distance: {
    /** Vertical entrance offset. */
    y: 24,
    /** Horizontal entrance offset, the old site's slideInLeft/Right. */
    x: 40,
    /** A masked line travels its own full height, not a fixed pixel count. */
    maskY: '110%',
    /** Hover lift on a tile. */
    lift: 4,
    /** Dropdown panel drop. */
    menuY: 8,
    /** Carousel quote slide. */
    quoteX: 16,
  },

  /**
   * The old slider's transition: the incoming photograph arrives as five
   * vertical columns sliding in from the right, one slightly behind the
   * last. `data-in="o:1;x:(100%);m:true;col:5;"` on every rs-slide of his
   * Slider Revolution module, and the thing his hero is recognisable for.
   */
  slots: {
    count: 5,
    stagger: 90,
  },

  /** Fraction of an element that must be visible before it enters. */
  inViewAmount: 0.15,

  hero: {
    /** How long one slide holds before the next begins. */
    slide: 7000,
    /** Crossfade between two slides. */
    crossfade: 1200,
    /** Background zoom over the slide's life. */
    zoomFrom: 1,
    zoomTo: 1.08,
    /** Background drift, as a percentage of its own width. */
    driftTo: -2,
    delay: {
      eyebrow: 100,
      headline: 300,
      tagline: 700,
      buttons: 900,
      /** Gap between the two hero buttons. */
      buttonGap: 100,
      cue: 1400,
    },
    /** The eyebrow and the masked headline words are quicker than `hero`. */
    eyebrowDuration: 800,
    wordDuration: 700,
  },

  interaction: {
    /** Header tightens past this many pixels of scroll. */
    shrinkAt: 80,
    /** Mobile drawer slide. */
    drawer: 350,
    /** Links inside the drawer. */
    drawerStagger: 50,
    /** Product tile photograph on hover. */
    tileImage: 500,
    /** Accordion open and close. */
    accordion: 300,
    /** The answer text fades a touch behind the height. */
    accordionFade: 100,
    /** Quote dwell in the testimonial carousel. */
    quote: 6000,
    /** Inner-page hero parallax, as a fraction of scroll distance. */
    parallax: 0.25,
    /** Count-up run. */
    count: 1400,
    /** Route change fade. */
    page: 300,
  },
} as const

/**
 * The tokens CSS needs, as custom properties. Spread onto <html> in
 * app/layout.tsx. Durations carry their unit so a stylesheet can use them
 * directly in a transition.
 */
export const motionVars: Record<string, string> = {
  '--m-ease': EASE_ENTRANCE,
  '--m-fast': `${MOTION.duration.fast}ms`,
  '--m-base': `${MOTION.duration.base}ms`,
  '--m-slow': `${MOTION.duration.slow}ms`,
  '--m-hero': `${MOTION.duration.hero}ms`,
  '--m-stagger': `${MOTION.stagger}ms`,
  '--m-word-stagger': `${MOTION.wordStagger}ms`,
  '--m-y': `${MOTION.distance.y}px`,
  '--m-x': `${MOTION.distance.x}px`,
  '--m-mask-y': MOTION.distance.maskY,
  '--m-lift': `${MOTION.distance.lift}px`,
  '--m-menu-y': `${MOTION.distance.menuY}px`,
  '--m-tile-image': `${MOTION.interaction.tileImage}ms`,
  '--m-accordion': `${MOTION.interaction.accordion}ms`,
  '--m-accordion-fade': `${MOTION.interaction.accordionFade}ms`,
  '--m-drawer': `${MOTION.interaction.drawer}ms`,
  '--m-drawer-stagger': `${MOTION.interaction.drawerStagger}ms`,
  '--m-page': `${MOTION.interaction.page}ms`,
  '--m-quote-x': `${MOTION.distance.quoteX}px`,
  '--m-slot-stagger': `${MOTION.slots.stagger}ms`,

  // Hero. The copy sequence and the background pan run as CSS animations so
  // they start on the server-rendered markup at first paint.
  '--m-hero-slide': `${MOTION.hero.slide}ms`,
  '--m-hero-crossfade': `${MOTION.hero.crossfade}ms`,
  '--m-hero-eyebrow': `${MOTION.hero.eyebrowDuration}ms`,
  '--m-hero-word': `${MOTION.hero.wordDuration}ms`,
  '--m-hero-d-eyebrow': `${MOTION.hero.delay.eyebrow}ms`,
  '--m-hero-d-tagline': `${MOTION.hero.delay.tagline}ms`,
  '--m-hero-d-cta1': `${MOTION.hero.delay.buttons}ms`,
  '--m-hero-d-cta2': `${MOTION.hero.delay.buttons + MOTION.hero.delay.buttonGap}ms`,
  '--m-hero-d-cta3': `${MOTION.hero.delay.buttons + MOTION.hero.delay.buttonGap * 2}ms`,
  '--m-hero-d-cue': `${MOTION.hero.delay.cue}ms`,
  '--m-hero-zoom-from': String(MOTION.hero.zoomFrom),
  '--m-hero-zoom-to': String(MOTION.hero.zoomTo),
  '--m-hero-drift': `${MOTION.hero.driftTo}%`,
}

/** True when the visitor has asked for less motion. Safe before hydration. */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
}

/**
 * Split a string into words for a masked line reveal, keeping the spaces as
 * their own entries so the original text is reproduced exactly on join. The
 * caller renders each word in its own overflow-hidden span; the spaces stay
 * plain text, so copying the heading still yields the sentence.
 */
export function splitWords(text: string): string[] {
  return text.split(/(\s+)/).filter((p) => p.length > 0)
}
