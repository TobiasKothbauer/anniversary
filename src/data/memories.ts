// ============================================================
//  MEMORIES DATA FILE
//  Main customization file. Edit everything below.
// ============================================================

// ─── Types ──────────────────────────────────────────────────────────────────

export interface Photo {
  src: string
  /**
   * Caption shown below the photo inside the gallery.
   * Great place for inside jokes, specific details, or things only you two know.
   */
  caption?: string
  /**
   * Mark a photo as an easter egg — it gets a subtle golden border
   * and a small hidden-star indicator when it appears.
   */
  isEasterEgg?: boolean
}

export interface Memory {
  id: string
  title: string
  /** Display date: e.g. "March 2024", "That one Friday in July" */
  date: string
  location?: string
  /**
   * Cover image shown on the wall card.
   * Usually the best or most recognizable photo from this memory.
   */
  coverImage: string
  coverImageAlt: string
  /**
   * Card aspect ratio — 'portrait' (3:4) or 'landscape' (4:3).
   * Mix these to give the wall a natural, varied feel.
   */
  orientation?: 'portrait' | 'landscape'
  /**
   * All photos for this memory's gallery.
   * Include the cover image here too (usually as the first entry).
   * Aim for 3–6 photos per memory.
   */
  photos: Photo[]
  /**
   * Secret note revealed after the last photo.
   * Appears when the user reaches the end of the gallery and sees the ✦ button.
   * Perfect for inside references, things only she would understand.
   */
  secretNote?: string
  /**
   * Hidden memories only appear after the user has opened 3 or more other memories.
   * Use this for a special easter egg card that rewards exploration.
   */
  hidden?: boolean
}

export interface SiteConfig {
  yourName: string
  herName: string
  anniversaryDate: string
  yourCity: string
  yourCountry: string
  herCity: string
  herCountry: string
  yourTimezone: string   // IANA, e.g. "Europe/Vienna"
  herTimezone: string    // IANA, e.g. "America/New_York"
  heroTitle: string
  heroSubtitle: string
  heroCtaText: string
  distanceKm: string
  distanceLabel: string
  /** Subtitle on the memory wall section */
  wallIntro: string
}

// ─── Site Configuration ──────────────────────────────────────────────────────

export const siteConfig: SiteConfig = {
  yourName:        'L.',                       // CUSTOMIZE
  herName:         'S.',                       // CUSTOMIZE
  anniversaryDate: 'April 6, 2025',            // CUSTOMIZE
  yourCity:        'Vienna',                   // CUSTOMIZE
  yourCountry:     'Austria',                  // CUSTOMIZE
  herCity:         'New York',                 // CUSTOMIZE
  herCountry:      'United States',            // CUSTOMIZE
  yourTimezone:    'Europe/Vienna',            // CUSTOMIZE
  herTimezone:     'America/New_York',         // CUSTOMIZE
  heroTitle:       'A Year\nWith You',
  heroSubtitle:    'Twelve months. A hundred thousand moments. One year of us.',
  heroCtaText:     'Begin our story',
  distanceKm:      '9,000',                   // CUSTOMIZE
  distanceLabel:   'Atlantic Ocean',           // CUSTOMIZE
  wallIntro:       'Click any memory to open it. Some have more inside than you might expect.',
}

// ─── Memories ────────────────────────────────────────────────────────────────
//
// CUSTOMIZE GUIDE:
//
// Images:
//   - Put your photos in /public/images/ (create this folder)
//   - Reference them as '/images/your-photo.jpg'
//   - Placeholder picsum.photos URLs are used below — they're consistent per seed
//     and will show the same image each time until you replace them.
//
// Photos array:
//   - First photo = shown when gallery opens (usually the cover image again)
//   - You can add as many photos per memory as you want
//   - Captions support any text — including inside jokes, references, small poems
//
// secretNote:
//   - Shown only when the user clicks ✦ at the end of the gallery
//   - Not visible anywhere else — perfect for something personal
//
// hidden:
//   - The card only appears on the wall after the user has opened 3+ memories
//   - Acts as a reward for exploration

export const memories: Memory[] = [
  // ── Memory 01 ──────────────────────────────────────────────────────────────
  {
    id: '01',
    title: 'The First Hello',
    date: 'April 2025',                           // CUSTOMIZE
    location: 'Vienna, Austria',                  // CUSTOMIZE
    coverImage: 'https://picsum.photos/seed/c01/600/800',  // CUSTOMIZE → '/images/...'
    coverImageAlt: 'The moment we first met',     // CUSTOMIZE
    orientation: 'portrait',
    photos: [
      {
        src: 'https://picsum.photos/seed/c01/800/1000',    // CUSTOMIZE
        caption: 'There are moments you only recognize in hindsight.',
      },
      {
        src: 'https://picsum.photos/seed/c01b/800/600',    // CUSTOMIZE
        caption: 'This was one of them.',                  // CUSTOMIZE: inside detail
      },
      {
        src: 'https://picsum.photos/seed/c01c/600/800',    // CUSTOMIZE
        // No caption — some photos don't need words
      },
    ],
    // CUSTOMIZE: Something only she'll understand. Appears after last photo via ✦.
    secretNote: 'I already knew. I just wasn\'t ready to admit it yet.',
  },

  // ── Memory 02 ──────────────────────────────────────────────────────────────
  {
    id: '02',
    title: 'Our First Walk',
    date: 'May 2025',                             // CUSTOMIZE
    location: 'Vienna, Austria',                  // CUSTOMIZE
    coverImage: 'https://picsum.photos/seed/c02/800/600',  // CUSTOMIZE
    coverImageAlt: 'Walking through the city',    // CUSTOMIZE
    orientation: 'landscape',
    photos: [
      {
        src: 'https://picsum.photos/seed/c02/1000/700',    // CUSTOMIZE
        caption: 'We walked for hours without really noticing.',
      },
      {
        src: 'https://picsum.photos/seed/c02b/800/600',    // CUSTOMIZE
        caption: 'You stopped here to point something out.',   // CUSTOMIZE: specific detail
        isEasterEgg: true,                         // marks this photo with a golden border
      },
      {
        src: 'https://picsum.photos/seed/c02c/700/900',    // CUSTOMIZE
        caption: 'The city became a backdrop.',
      },
      {
        src: 'https://picsum.photos/seed/c02d/900/600',    // CUSTOMIZE
        // CUSTOMIZE: a caption only you two would understand
        caption: '[your inside joke or reference here]',
      },
    ],
    secretNote: 'You laughed at something I said and I thought — there it is.',
  },

  // ── Memory 03 ──────────────────────────────────────────────────────────────
  {
    id: '03',
    title: 'The Quiet Evening',
    date: 'June 2025',                            // CUSTOMIZE
    location: 'Vienna, Austria',                  // CUSTOMIZE
    coverImage: 'https://picsum.photos/seed/c03/600/750',  // CUSTOMIZE
    coverImageAlt: 'A quiet evening together',    // CUSTOMIZE
    orientation: 'portrait',
    photos: [
      {
        src: 'https://picsum.photos/seed/c03/700/900',     // CUSTOMIZE
        caption: 'Not every memory needs to be a headline.',
      },
      {
        src: 'https://picsum.photos/seed/c03b/800/600',    // CUSTOMIZE
        caption: 'Some of the ones I hold closest are the quiet ones.', // CUSTOMIZE
      },
      {
        src: 'https://picsum.photos/seed/c03c/600/750',    // CUSTOMIZE
      },
    ],
  },

  // ── Memory 04 ──────────────────────────────────────────────────────────────
  {
    id: '04',
    title: 'Midsummer',
    date: 'July 2025',                            // CUSTOMIZE
    location: 'Somewhere beautiful',              // CUSTOMIZE
    coverImage: 'https://picsum.photos/seed/c04/900/600',  // CUSTOMIZE
    coverImageAlt: 'A long summer evening',       // CUSTOMIZE
    orientation: 'landscape',
    photos: [
      {
        src: 'https://picsum.photos/seed/c04/1100/700',    // CUSTOMIZE
        caption: 'We stayed out too late.',
      },
      {
        src: 'https://picsum.photos/seed/c04b/800/600',    // CUSTOMIZE
        caption: 'The light never quite left the sky.',
      },
      {
        src: 'https://picsum.photos/seed/c04c/700/900',    // CUSTOMIZE
        caption: 'This exact moment.',                     // CUSTOMIZE
        isEasterEgg: true,
      },
      {
        src: 'https://picsum.photos/seed/c04d/900/600',    // CUSTOMIZE
      },
    ],
    secretNote: 'You were mid-sentence about something when I decided I was in serious trouble.',
  },

  // ── Memory 05 ──────────────────────────────────────────────────────────────
  {
    id: '05',
    title: 'Saying Goodbye (For Now)',
    date: 'August 2025',                          // CUSTOMIZE
    location: 'Vienna International Airport',     // CUSTOMIZE
    coverImage: 'https://picsum.photos/seed/c05/600/800',  // CUSTOMIZE
    coverImageAlt: 'The goodbye at the airport',  // CUSTOMIZE
    orientation: 'portrait',
    photos: [
      {
        src: 'https://picsum.photos/seed/c05/700/900',     // CUSTOMIZE
        caption: 'I used to be indifferent to airports.',
      },
      {
        src: 'https://picsum.photos/seed/c05b/900/600',    // CUSTOMIZE
        caption: 'I am no longer indifferent to airports.',
      },
    ],
  },

  // ── Memory 06 ──────────────────────────────────────────────────────────────
  {
    id: '06',
    title: 'Long Distance, Long Calls',
    date: 'September 2025',                       // CUSTOMIZE
    location: 'Vienna ↔ New York',               // CUSTOMIZE
    coverImage: 'https://picsum.photos/seed/c06/800/600',  // CUSTOMIZE
    coverImageAlt: 'Staying connected',           // CUSTOMIZE
    orientation: 'landscape',
    photos: [
      {
        src: 'https://picsum.photos/seed/c06/1000/700',    // CUSTOMIZE
        caption: 'We figured out the time zones.',
      },
      {
        src: 'https://picsum.photos/seed/c06b/700/900',    // CUSTOMIZE
        caption: 'You became my last thing before sleep.',
      },
      {
        src: 'https://picsum.photos/seed/c06c/900/600',    // CUSTOMIZE
        caption: 'And my first thought upon waking.',      // CUSTOMIZE: add detail only you'd know
      },
    ],
  },

  // ── Memory 07 ──────────────────────────────────────────────────────────────
  {
    id: '07',
    title: 'The Visit',
    date: 'November 2025',                        // CUSTOMIZE
    location: 'New York, United States',          // CUSTOMIZE
    coverImage: 'https://picsum.photos/seed/c07/600/800',  // CUSTOMIZE
    coverImageAlt: 'Reuniting after the distance', // CUSTOMIZE
    orientation: 'portrait',
    photos: [
      {
        src: 'https://picsum.photos/seed/c07/800/1000',    // CUSTOMIZE
        caption: 'Walking out of arrivals.',
      },
      {
        src: 'https://picsum.photos/seed/c07b/900/600',    // CUSTOMIZE
        caption: 'One of the better moments of my year.',
      },
      {
        src: 'https://picsum.photos/seed/c07c/700/900',    // CUSTOMIZE
        isEasterEgg: true,
        caption: '[the thing you said when you saw me]',   // CUSTOMIZE
      },
      {
        src: 'https://picsum.photos/seed/c07d/800/600',    // CUSTOMIZE
        caption: 'Possibly my life. I am deliberately understating it.',
      },
    ],
    secretNote: 'Seeing you again was worth every terrible minute of that flight.',
  },

  // ── Memory 08 ──────────────────────────────────────────────────────────────
  {
    id: '08',
    title: "New Year's Eve",
    date: 'December 2025',                        // CUSTOMIZE
    location: 'Vienna & New York',                // CUSTOMIZE
    coverImage: 'https://picsum.photos/seed/c08/900/600',  // CUSTOMIZE
    coverImageAlt: "New Year's celebration",      // CUSTOMIZE
    orientation: 'landscape',
    photos: [
      {
        src: 'https://picsum.photos/seed/c08/1100/700',    // CUSTOMIZE
        caption: 'Two countdowns. Two different cities.',
      },
      {
        src: 'https://picsum.photos/seed/c08b/700/900',    // CUSTOMIZE
        caption: 'Same sky, different side of it.',
      },
      {
        src: 'https://picsum.photos/seed/c08c/900/600',    // CUSTOMIZE
        caption: 'It still felt like we were together.',
      },
    ],
    secretNote: 'I stayed up until 6am just to be awake when your midnight happened.',
  },

  // ── Hidden Memory (Easter Egg) ─────────────────────────────────────────────
  // This card only appears after the user has opened 3 or more memories.
  // CUSTOMIZE: Make this something genuinely surprising — a memory they wouldn't expect,
  // a private joke, or something that makes her laugh or cry.
  {
    id: '99',
    title: 'Something Only We Know',
    date: 'All year',                             // CUSTOMIZE
    location: 'Everywhere',                       // CUSTOMIZE
    coverImage: 'https://picsum.photos/seed/c99/600/800',  // CUSTOMIZE
    coverImageAlt: 'A hidden memory',             // CUSTOMIZE
    orientation: 'portrait',
    hidden: true,                                 // ← revealed after opening 3 memories
    photos: [
      {
        src: 'https://picsum.photos/seed/c99/700/900',     // CUSTOMIZE
        caption: 'You found it.',                          // CUSTOMIZE
      },
      {
        src: 'https://picsum.photos/seed/c99b/900/600',    // CUSTOMIZE
        caption: '[your most private inside joke here]',   // CUSTOMIZE
        isEasterEgg: true,
      },
    ],
    secretNote: 'I hid this one for you. Consider it found.',  // CUSTOMIZE
  },
]

// ─── Love Note ───────────────────────────────────────────────────────────────
// CUSTOMIZE: The closing section before the letter button.

export const loveNote = {
  title:    'What I Want You to Know',
  preface:  'If I could write you a year, it would look something like this.',
  body: `There's a version of this past year where I talk about the distance, the time zones, the complications. But that's not the version I want to tell.

The version I want to tell is the one where I realized — somewhere between the long calls and the longer silences — that I'd found someone I'm genuinely glad to know. Someone I'm still curious about. Someone who makes the ordinary feel worth paying attention to.

I don't know exactly what the next year looks like. But I know I want to spend it finding out.

Thank you for this one.`,
  signOff:   'With everything I have,',
  signature: 'L.',                       // CUSTOMIZE
}

// ─── Surprise Letter ─────────────────────────────────────────────────────────
// CUSTOMIZE: The hidden letter revealed when she clicks "Open my letter to you".

export const surpriseLetter = {
  salutation: 'For you, on our anniversary —',
  body: `I started writing this a dozen times.

The first version was too long. The second was trying too hard. The third sounded like someone who'd read too many poems about love without actually being in one.

So here's the honest version:

You are one of the best things that has happened to me in a long time. Possibly ever. And I say that knowing you'll read it and think I'm being dramatic — which is fine, because you're usually right about most things and I'm willing to be wrong about this one.

I love the way you think. I love the way you argue a point and then actually change your mind when you're wrong. I love that you have opinions and hold them seriously.

I love that you're across an ocean and still the first person I want to call when something good happens.

This year was a gift. You are a gift. And I'm very glad you're mine.`,
  closing:   'Yours,',
  signature: 'L.',                       // CUSTOMIZE
}
