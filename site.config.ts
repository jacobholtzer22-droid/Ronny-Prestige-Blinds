import type { SiteConfigInput } from './lib/config-schema'

/**
 * Every business fact for this site lives here and nowhere else.
 *
 * Filled from BRIEF.md for Prestige Blinds LLC. Anything the brief listed as
 * UNKNOWN is null or omitted, and the block that depends on it does not render.
 *
 * businessSlug is a PLACEHOLDER. Swap it for the real platform slug before
 * launch, then flip prelaunch to false and redeploy. The open questions for
 * the owner are in the client checklist at the repo root.
 */
const siteConfig = {
  businessSlug: 'replace-before-launch',

  legalName: 'Prestige Blinds LLC',
  displayName: 'Prestige Blinds',
  tagline: 'Custom shutters, shades, blinds, and drapery, measured and installed across South Florida.',

  schemaType: 'HomeAndConstructionBusiness',

  phone: '+19547908436',
  email: 'prestigeblind100@gmail.com',

  address: {
    street: '11555 Heron Bay Blvd, Suite 200',
    city: 'Coral Springs',
    state: 'FL',
    zip: '33076',
    lat: 26.3094582,
    lng: -80.2815225,
  },

  primaryCity: 'Coral Springs',
  primaryState: 'FL',

  serviceAreas: [
    { slug: 'parkland', name: 'Parkland', county: 'Broward County' },
    { slug: 'boca-raton', name: 'Boca Raton', county: 'Palm Beach County' },
    { slug: 'davie', name: 'Davie', county: 'Broward County' },
    { slug: 'fort-lauderdale', name: 'Fort Lauderdale', county: 'Broward County' },
    { slug: 'pompano-beach', name: 'Pompano Beach', county: 'Broward County' },
    { slug: 'weston', name: 'Weston', county: 'Broward County' },
    { slug: 'plantation', name: 'Plantation', county: 'Broward County' },
    { slug: 'delray-beach', name: 'Delray Beach', county: 'Palm Beach County' },
  ],

  services: [
    {
      slug: 'plantation-shutters',
      name: 'Plantation Shutters',
      shortDescription:
        'Custom plantation shutters in wood, vinyl, or composite, measured, made to order, and installed to fit the window.',
      priceFrom: null,
      priceNote: 'quoted after a free in-home consultation',
      image: 'plantation-shutters-pool-view.jpg',
      faqs: [
        {
          q: 'What are plantation shutters made of?',
          a: 'We offer wood, vinyl, and composite. Wood is the classic choice for its look and warmth, while vinyl and composite stand up better to moisture and are easier to keep clean. We go through the trade-offs at the consultation.',
        },
        {
          q: 'What is the difference between traditional and hidden tilt?',
          a: 'A traditional shutter has a center tilt rod running down each panel that you move to angle the louvers. A hidden tilt shutter moves the louvers from a mechanism inside the panel instead, which gives a cleaner, more modern face and even louver spacing.',
        },
        {
          q: 'What works on a sliding glass door?',
          a: 'Panel track shutters. Instead of hinged panels, broad panels slide along a track, so they cover a wide opening or a sliding door without crowding it, and they stack to one side when you want the view back.',
        },
        {
          q: 'Can you match the trim color in my room?',
          a: 'Yes. You choose the frame, the color, and the louver style, and we can match the color scheme already in the room. We look at the trim on site during the consultation so the shutters sit with it rather than against it.',
        },
        {
          q: 'How long does a shutter job take?',
          a: 'Shutters are made to order, so the timeline depends on the size of the order and the options you pick. We give you the schedule at the consultation, once the windows are measured and the style is settled.',
        },
        {
          q: 'Do you install shutters in commercial spaces?',
          a: 'Yes. We cover both homes and commercial properties, from a single room to a hospitality project. The process is the same either way: we measure, you choose the style and finish, and we install.',
        },
      ],
    },
    {
      slug: 'motorized-shades',
      name: 'Motorized Shades',
      shortDescription:
        'Motorized shades, blinds, and drapery you run from a remote, a wall switch, a phone app, or a smart home system.',
      priceFrom: null,
      priceNote: 'quoted after a free in-home consultation',
      image: 'motorized-patio-screen.jpg',
      faqs: [
        {
          q: 'How do motorized shades get their power?',
          a: 'Two ways. A rechargeable battery motor needs no wiring and suits a window that is hard to get to, and a hardwired motor runs off the electrical system. We talk through which one fits the window and the room before anything is ordered.',
        },
        {
          q: 'Do they work with Alexa or Google Assistant?',
          a: 'Yes. Motorized shades run from a remote, a wall switch, or a phone app, and they can be added to a smart home system, so voice control sits alongside the rest of your automation.',
        },
        {
          q: 'Which windows are worth motorizing?',
          a: 'Tall and hard-to-reach windows, skylights, wide spans, sliding glass doors, and media rooms are the usual ones. Anywhere you would otherwise reach for a cord several times a day is a good candidate.',
        },
        {
          q: 'Are motorized shades better with children and pets?',
          a: 'There is no hanging cord to pull, which removes a hazard that cords create in a home with small children or pets. That is one of the more common reasons people move to motorized shades.',
        },
        {
          q: 'Can my existing shades be motorized?',
          a: 'That depends on the product and how it was built, so it is not something to answer sight unseen. Call us and describe what you have, and we will tell you whether it can be converted or whether new shades make more sense.',
        },
        {
          q: 'Which shades can be motorized?',
          a: 'Roller, Roman, and zebra shades can all be motorized, and so can drapery. Our team fits the motors and programs the controls, so everything works the way you expect before we leave.',
        },
      ],
    },
    {
      slug: 'zebra-shades',
      name: 'Zebra Shades',
      shortDescription:
        'Custom zebra shades with alternating sheer and solid bands, manual or motorized, for light control and privacy.',
      priceFrom: null,
      priceNote: 'quoted after a free in-home consultation',
      image: 'zebra-shades-sliding-door.jpg',
      faqs: [
        {
          q: 'What is a zebra shade?',
          a: 'A zebra shade carries alternating sheer and solid bands on one shade. Line the bands up and the shade reads as solid for privacy. Offset them and light filters through the sheer sections while you keep the view out.',
        },
        {
          q: 'Do zebra shades filter light or darken the room?',
          a: 'They do both, which is why they are also called transitional shades. The same shade carries light filtering and room darkening fabric, so how much light comes in is set by how far you offset the bands.',
        },
        {
          q: 'Can zebra shades be motorized?',
          a: 'Yes. Zebra shades are available motorized, so you can run them from a remote, a wall switch, or a phone app. We fit and program the motor as part of the installation.',
        },
        {
          q: 'Do they work on a sliding glass door?',
          a: 'Yes. Zebra shades are built to the opening, so a wide span or a sliding glass door is a normal job for them. We measure the opening at the consultation and make the shade to fit it.',
        },
        {
          q: 'Which rooms suit zebra shades best?',
          a: 'Living rooms, bedrooms, and studies are the usual ones, because those are the rooms where you want the view through the day and privacy at night. They sit particularly well in a contemporary room.',
        },
      ],
    },
    {
      slug: 'shades',
      name: 'Roller and Roman Shades',
      shortDescription:
        'Roller shades in light filtering, room darkening, and blackout fabrics, plus Roman shades, sheer shades, and outdoor patio shades.',
      priceFrom: null,
      priceNote: 'quoted after a free in-home consultation',
      image: 'solar-screen-shade-lanai.jpg',
      faqs: [
        {
          q: 'What is the difference between light filtering and blackout?',
          a: 'A light filtering shade softens direct sun and keeps a soft glow in the room. A blackout shade is heavy opaque fabric that shuts the light out, which is what you want in a bedroom, a nursery, or a media room.',
        },
        {
          q: 'What is a solar screen shade?',
          a: 'A solar screen is a woven fabric that cuts glare and heat while you can still see out. It is the usual choice on a lanai or a tall window facing the sun, where you want to keep the view but not the glare.',
        },
        {
          q: 'Can outdoor patio shades handle the weather here?',
          a: 'Screen enclosure patio shades are made for it. They cut UV, glare, and heat, hold off wind and rain across the patio, keep bugs out, and protect outdoor furniture from direct sun. They run on a rope system or a motor.',
        },
        {
          q: 'What styles of Roman shade can I choose from?',
          a: 'Flat, cascade, pleated, aventura, relaxed, and tulip. Each is a different way the fabric folds as the shade is raised, from a clean flat stack to a soft drape along the bottom. Roman shades can also be motorized.',
        },
        {
          q: 'Can I put a screen and a blackout shade on the same window?',
          a: 'Yes. A double roller setup carries a solar screen and a blackout shade on one window, so you can cut the glare through the day and close the room down completely at night.',
        },
      ],
    },
    {
      slug: 'blinds',
      name: 'Blinds',
      shortDescription:
        'Custom blinds made to measure in wood, vinyl, or metal, in horizontal and vertical styles and the finish you choose.',
      priceFrom: null,
      priceNote: 'quoted after a free in-home consultation',
      image: 'wood-blinds-closeup.jpg',
      faqs: [
        {
          q: 'What styles of blinds do you carry?',
          a: 'Horizontal blinds with slats that tilt, vertical blinds for sliding glass doors and wide windows, and Roman blinds that fold into pleats as they rise. We bring samples so you can see the materials in the room.',
        },
        {
          q: 'What are the slats made of?',
          a: 'Wood, metal, and vinyl are the usual materials, and each comes in a range of colors and finishes. Wood gives the warmest look, while vinyl and metal hold up better where there is moisture.',
        },
        {
          q: 'Can you match the colors already in my room?',
          a: 'Yes. Blinds are custom made from a wide range of materials and finishes, and we can match the color scheme in the room. Special orders and custom options are available when nothing standard fits.',
        },
        {
          q: 'Can blinds be motorized?',
          a: 'Yes. Blinds can take a motor and run from a remote, a wall switch, or a phone app, which is worth doing on a high window or on any blind you find yourself adjusting several times a day.',
        },
        {
          q: 'What goes on a sliding glass door?',
          a: 'Vertical blinds are the usual answer, because the slats stack to one side and leave the doorway clear. Panel track shutters and wide zebra shades also work there, and we will show you all three.',
        },
      ],
    },
    {
      slug: 'drapery',
      name: 'Drapery',
      shortDescription:
        'Custom drapery and curtains made from hundreds of fabrics, with the hardware, lining, and length chosen to suit the room.',
      priceFrom: null,
      priceNote: 'quoted after a free in-home consultation',
      image: 'custom-drapery-tieback.jpg',
      faqs: [
        {
          q: 'Do you supply the drapery hardware?',
          a: 'Yes. We handle the whole job, hardware included. Drapes can hang from rod pockets, hooks, or tab tops, and you choose whether they are finished with tie-backs or left to hang straight.',
        },
        {
          q: 'What lengths can drapes be made to?',
          a: 'Floor length, puddle length, cafe style, or an exact length you specify. We measure the window and the drop at the consultation so the drape hangs the way you pictured it rather than an inch off.',
        },
        {
          q: 'Can drapery go over shades or blinds?',
          a: 'Yes, and it is a common pairing. The shade does the light control and the drapery softens the window and finishes the room. We plan the two together so the mount points and the stack work.',
        },
        {
          q: 'Can drapery be motorized?',
          a: 'Yes. Motorized drapery runs from a remote or a phone app, can be scheduled to open and close at set times, and has no cords, which makes it safer around children and pets. It can join a home automation system.',
        },
        {
          q: 'Should drapes be lined or unlined?',
          a: 'Both are available. A lining adds weight and body, blocks more light, and protects the face fabric from the sun. Unlined panels hang lighter and let more light through. We show you both in the fabric you pick.',
        },
      ],
    },
  ],

  hours: [
    { day: 'Monday', open: '09:00', close: '18:00' },
    { day: 'Tuesday', open: '09:00', close: '18:00' },
    { day: 'Wednesday', open: '09:00', close: '18:00' },
    { day: 'Thursday', open: '09:00', close: '18:00' },
    { day: 'Friday', open: '09:00', close: '18:00' },
    { day: 'Saturday', open: '09:00', close: '18:00' },
  ],

  yearsInBusiness: 20,
  licenseNumber: null,
  insured: null,

  // Intentionally empty. Review and aggregateRating schema render from this
  // array, and the quotes carried over from the client's own site have no
  // rating and no source URL. They render visibly from `testimonials` instead.
  reviews: [],

  profiles: {
    gbp: 'https://www.google.com/maps?cid=1258823617679300456',
    facebook: 'https://www.facebook.com/prestigeblind100/',
    instagram: 'https://www.instagram.com/prestige.blinds/',
    yelp: 'https://www.yelp.com/biz/prestige-blinds-davie-2',
  },

  faqs: [
    {
      q: 'What window treatments do you install?',
      a: 'Plantation shutters, motorized shades, zebra shades, roller and Roman shades, blinds, and custom drapery. Everything is measured, made to order, and installed by our own team.',
    },
    {
      q: 'Is the in-home consultation free?',
      a: 'Yes. We come to you, measure the windows, and show you materials and finishes in the room they are going into, under the light they will actually sit in. There is no charge for that visit.',
    },
    {
      q: 'How quickly can you get this done?',
      a: 'We offer same-day estimates, with same-day installation available. Custom shutters and special orders are made to your windows, so those take longer, and we give you the timeline at the consultation.',
    },
    {
      q: 'Which areas do you cover?',
      a: 'Anywhere within fifty miles of Coral Springs. That takes in most of Broward County, Palm Beach County down through Boca Raton and Delray Beach, and the northern end of Miami-Dade.',
    },
    {
      q: 'Do you work on commercial properties as well as homes?',
      a: 'Yes, both. The range runs from shades for a single apartment to commercial and hospitality window coverings, and the process is the same at either end.',
    },
    {
      q: 'Which brands do you carry?',
      a: 'We work with trusted brands including Norman and Lafayette. We bring samples to the consultation so you can compare materials and finishes side by side before anything is ordered.',
    },
    {
      q: 'How are motorized shades controlled?',
      a: 'From a remote, a wall switch, a phone app, or a smart home system with voice control. The motors are either rechargeable battery or hardwired, and we fit and program them as part of the job.',
    },
    {
      q: 'Do you have any offers running?',
      a: 'Yes, there is a standing offer on shades: order ten shades and get one free. The details are on the offer band on this page, and you mention it when you book your free in-home consultation.',
    },
    {
      q: 'How do I get started?',
      a: 'Call us, or send the contact form on this site with a note about how many windows you have and what you are thinking. We will set up the free in-home consultation from there.',
    },
    {
      q: 'When are you open?',
      a: 'Monday through Saturday, nine in the morning to six in the evening, Eastern time. We are closed on Sunday. Send the contact form outside those hours and we will pick it up the next working day.',
    },
  ],

  images: {
    hero: 'plantation-shutters-dining-room.jpg',
    about: 'prestige-blinds-team.jpg',
    gallery: [
      'solar-screen-shade-lanai.jpg',
      'plantation-shutters-pool-view.jpg',
      'crew-installing-shutters.jpg',
      'zebra-shades-dining-window.jpg',
      'sheer-shades-dining-room.jpg',
      'light-filtering-shades-pair.jpg',
      'motorized-patio-screen.jpg',
      'wood-blinds-closeup.jpg',
      'sheer-shades-yacht-salon.jpg',
    ],
    heroVideo: null,
  },

  offer: {
    headline: 'Buy 10 Shades, Get 1 Free',
    detail: 'Order ten shades and get one free. Mention this offer when you book your free in-home consultation.',
    finePrint: null,
  },

  contactForm: {
    splitName: false,
    address: 'off',
    zip: 'optional',
    serviceDropdown: true,
    emailRequired: false,
    timeframe: {
      label: 'When do you want them installed?',
      options: ['As soon as possible', 'Within a month', 'Just getting prices'],
      required: false,
    },
    messageLabel: 'Tell us about your windows',
    messagePlaceholder:
      'How many windows, which rooms, and what you have in mind: shutters, shades, blinds, or drapery.',
    submitLabel: 'Request My Free Consultation',
  },

  coverage: [
    {
      county: 'Broward County',
      towns: [
        'Coral Springs',
        'Parkland',
        'Coconut Creek',
        'Margate',
        'Tamarac',
        'North Lauderdale',
        'Deerfield Beach',
        'Pompano Beach',
        'Lighthouse Point',
        'Lauderdale-by-the-Sea',
        'Oakland Park',
        'Wilton Manors',
        'Fort Lauderdale',
        'Lauderhill',
        'Sunrise',
        'Plantation',
        'Davie',
        'Weston',
        'Southwest Ranches',
        'Cooper City',
        'Pembroke Pines',
        'Miramar',
        'Hollywood',
        'Dania Beach',
        'Hallandale Beach',
      ],
    },
    {
      county: 'Palm Beach County',
      towns: [
        'Boca Raton',
        'Highland Beach',
        'Delray Beach',
        'Boynton Beach',
        'Lake Worth Beach',
        'Wellington',
        'Royal Palm Beach',
        'West Palm Beach',
        'Palm Beach',
        'Palm Beach Gardens',
        'Jupiter',
      ],
    },
    {
      county: 'Miami-Dade County',
      towns: [
        'Aventura',
        'Sunny Isles Beach',
        'North Miami Beach',
        'North Miami',
        'Miami Gardens',
        'Miami Lakes',
        'Hialeah',
        'Doral',
        'Miami',
        'Miami Beach',
        'Coral Gables',
      ],
    },
  ],

  testimonials: [
    {
      quote:
        'Ronnie was such a pleasure to work with! Excellent prices, wonderful customer service and super helpful! We didn’t know much about what we wanted and he was very patient and accommodating to our specific requests with zebra blinds downstairs and honeycomb shades upstairs! Very happy with our purchase!',
      name: 'C. Butler',
    },
    {
      quote:
        'My blinds look amazing! Was hesitant to go with Ronnie’s recommendation of streamline blinds, so glad I listened to him!! Looks like a brand new room! Beautiful job I highly recommend!!!!',
      name: 'T. Fathers',
    },
    {
      quote:
        'I had Prestige blinds installed done by Ronny and crew. They were clean and did a great job. I did allure shades and it came out awesome! He will give you opition for your home design. Thank so much.',
      name: 'B. Lakhani',
    },
    {
      quote:
        'Ronny at Prestige Blinds delivered! Not just on time but also with a beautiful product. My wife and I are so happy with our Plantation Shutters! Great job by this company. Would definitely recommend!',
      name: 'J. Figueroa',
    },
    {
      quote:
        'We called Prestige Blinds for our large four panel sliding glass door. The shades they installed are amazing. Love the style, color, easy to use. They installed them quickly and did not leave any mess behind. Would highly recommend them and will use again for our next home project! Thank you Prestige Blinds!',
      name: 'A. Morrill',
    },
  ],

  // Pre-launch: noindex everywhere and robots.txt disallows all.
  // Flip to false at launch, then redeploy.
  prelaunch: true,

  domain: 'https://www.prestigewoodblinds.com',
} satisfies SiteConfigInput

export default siteConfig
