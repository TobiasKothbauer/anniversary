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
  yourName:        'Tobi',                       // CUSTOMIZE
  herName:         'July',                       // CUSTOMIZE
  anniversaryDate: 'April 30, 2026',            // CUSTOMIZE
  yourCity:        'Linz',                   // CUSTOMIZE
  yourCountry:     'Austria',                  // CUSTOMIZE
  herCity:         'Atlanta',                 // CUSTOMIZE
  herCountry:      'United States',            // CUSTOMIZE
  yourTimezone:    'Europe/Vienna',            // CUSTOMIZE
  herTimezone:     'America/New_York',         // CUSTOMIZE
  heroTitle:       'A Year\nWith You',
  heroSubtitle:    'Twelve months. Many moments. One year of us.',
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
    title: 'Der erste gemeinsame Trip',
    date: '28. Dezember 2024',                           // CUSTOMIZE
    location: 'Passau, Germany',                  // CUSTOMIZE
    coverImage: '/images/01/burg.jpeg',
    coverImageAlt: 'The moment we first met',     // CUSTOMIZE
    orientation: 'portrait',
    photos: [
      {
        src: '/images/01/flammkuchen.jpeg',
        caption: 'Vorfreude auf Flammkuchen',
      },
      {
        src: '/images/01/IMG_4537.JPEG',
        caption: 'Skipboooo woa unser Ding hehe',
      },
      {
        src: '/images/01/IMG_4528.JPEG',
        caption: 'Der Blick wenn ma se denk: Ned schlecht!',
      },
      {
        src: '/images/01/61f1983a-1792-4e59-95ed-04e156a6c2e9.jpg',    // CUSTOMIZE
        caption: '1 Minute später hab i verloren',
      },
    ],
    // CUSTOMIZE: Something only she'll understand. Appears after last photo via ✦.
    secretNote: 'I already knew. I just wasn\'t ready to admit it yet.',
  },

  // ── Memory 02 ──────────────────────────────────────────────────────────────
  {
    id: '02',
    title: 'Botanischer Garten',
    date: '6. Jänner 2025',                             // CUSTOMIZE
    location: 'Linz, Austria',                  // CUSTOMIZE
    coverImage: '/images/02/IMG_4773.JPEG',  // CUSTOMIZE
    coverImageAlt: 'Walking through the city',    // CUSTOMIZE
    orientation: 'landscape',
    photos: [
      {
        src: '/images/02/IMG_4773.JPEG',    // CUSTOMIZE
        caption: 'We walked for hours without really noticing.',
      },
      {
        src: '/images/02/ananas.jpg',    // CUSTOMIZE
        caption: 'ANANAS!!.',   // CUSTOMIZE: specific detail
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
    title: 'Valentinstag',
    date: '14. Februar 2025',                            // CUSTOMIZE
    location: 'Hagenberg, Austria',                  // CUSTOMIZE
    coverImage: '/images/03/IMG_4876.JPEG',  // CUSTOMIZE
    coverImageAlt: 'A quiet evening together',    // CUSTOMIZE
    orientation: 'portrait',
    photos: [
      {
        src: '/images/03/IMG_4880.JPEG',     // CUSTOMIZE
        caption: 'Lecker Schmecker!',
      },
      {
        src: '/images/03/IMG_4881.JPEG',    // CUSTOMIZE
        caption: 'Upsii, kann passieren ;)', // CUSTOMIZE
      },
      {
        src: 'https://picsum.photos/seed/c03c/600/750',    // CUSTOMIZE
      },
    ],
  },

  // ── Memory 04 ──────────────────────────────────────────────────────────────
  {
    id: '04',
    title: 'Erste mal Gym gemeinsam',
    date: 'Jänner 2025',                            // CUSTOMIZE
    location: 'Linz, Austria',              // CUSTOMIZE
    coverImage: '/images/04/IMG_4820.JPEG',  // CUSTOMIZE
    coverImageAlt: 'A long summer evening',       // CUSTOMIZE
    orientation: 'landscape',
    photos: [
      {
        src: '/images/04/IMG_4814.JPEG',    // CUSTOMIZE
        caption: 'lachs hat danach besonders gut gschmeckt  ;)',
      },
      {
        src: '/images/04/IMG_4799.JPEG',    // CUSTOMIZE
        caption: 'vom auto was holen.. mit style!',
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
    title: 'Konzerte',
    date: 'Music o`clock',                          // CUSTOMIZE
    location: 'Wo die Musik spielt',     // CUSTOMIZE
    coverImage: '/images/05/12d57620-af02-4349-a2c7-a27d1362fcbe.jpg',  // CUSTOMIZE
    coverImageAlt: 'The goodbye at the airport',  // CUSTOMIZE
    orientation: 'landscape',
    photos: [
      {
        src: '/images/05/IMG_4936.JPG',     // CUSTOMIZE
        caption: 'sleepy zugfahren',
      },
      {
        src: '/images/05/732785a3-95da-4159-a798-fe01f4175bf5.jpg',    // CUSTOMIZE
        caption: 'CURSED.',
      },
      {
        src: '/images/05/IMG_5085.PNG',    // CUSTOMIZE
        caption: 'KIZ BeReal',
      },
      {
        src: '/images/05/IMG_6219.JPG',    // CUSTOMIZE
        caption: 'Petry Slam ´Konzert´',
      },
      {
        src: '/images/05/IMG_6237.JPEG',    // CUSTOMIZE
        caption: 'Deichind',
      },
      {
        src: '/images/05/IMG_6257.JPEG',    // CUSTOMIZE
        caption: 'Fiebertraum',
      },
      {
        src: '/images/05/IMG_9726.JPEG',    // CUSTOMIZE
        caption: 'cute',
      },
      {
        src: '/images/05/IMG_9730.JPEG',    // CUSTOMIZE
        caption: 'bissl nass',
      },
      {
        src: '/images/05/IMG_6432.JPEG',    // CUSTOMIZE
        caption: 'sogar ba deim Geburtstag hat es a Konzert geben ;)',
      },
    ],
  },

  // ── Memory 06 ──────────────────────────────────────────────────────────────
  {
    id: '06',
    title: 'Birthdayyyys',
    date: 'September 2025',                       // CUSTOMIZE
    location: 'Freistadt, Linz',               // CUSTOMIZE
    coverImage: '/images/06/IMG_4948.JPEG',  // CUSTOMIZE
    coverImageAlt: 'Alle deine friends mal kennenlernen',           // CUSTOMIZE
    orientation: 'landscape',
    photos: [
      {
        src: '/images/06/IMG_4949.JPEG',    // CUSTOMIZE
        caption: 'cuteeeee',
      },
      {
        src: '/images/06/b02a69b1-5b3e-48cb-a8e4-091889821a8a.jpg',    // CUSTOMIZE
        caption: 'Antonia Birthday',
      },
      {
        src: '/images/06/IMG_4992.JPG',    // CUSTOMIZE
        caption: 'BeReal time',      // CUSTOMIZE: add detail only you'd know
      },
      {
        src: '/images/06/92be28ac-dfda-44b4-bbf5-9212a9db5a61.JPEG',    // CUSTOMIZE
        caption: 'shocked!',      // CUSTOMIZE: add detail only you'd know
      },
    ],
  },

  // ── Memory 07 ──────────────────────────────────────────────────────────────
  {
    id: '07',
    title: 'Sommer genießen',
    date: 'Im Grünen',                        // CUSTOMIZE
    location: 'Dort wo die sonne ist',          // CUSTOMIZE
    coverImage: '/images/07/IMG_5940.JPEG',  // CUSTOMIZE
    coverImageAlt: 'Reuniting after the distance', // CUSTOMIZE
    orientation: 'portrait',
    photos: [
      {
        src: '/images/07/IMG_6054.JPEG',    // CUSTOMIZE
        caption: 'war a cooler spot',
      },
      {
        src: '/images/07/IMG_5981.JPEG',    // CUSTOMIZE
        caption: 'lecker erdbeeren',
      },
      {
        src: '/images/07/IMG_6174.JPEG',    // CUSTOMIZE
        isEasterEgg: true,
        caption: 'schmaulin',   // CUSTOMIZE
      },
      {
        src: '/images/07/IMG_6179.JPG',    // CUSTOMIZE
        caption: 'wieder mal am futtern',
      },
      {
        src: '/images/07/IMG_5331.JPEG',    // CUSTOMIZE
        caption: 'der süße boomer',
      },
      {
        src: '/images/07/IMG_5942.JPEG',    // CUSTOMIZE
        caption: 'schau mal, a blumeee',
      },
    ],
    secretNote: 'Seeing you again was worth every terrible minute of that flight.',
  },

  // ── Memory 08 ──────────────────────────────────────────────────────────────
  {
    id: '08',
    title: "Paint & Sip",
    date: 'December 2025',                        // CUSTOMIZE
    location: 'Wg Hagenberg',                // CUSTOMIZE
    coverImage: '/images/08/IMG_6389.JPEG',  // CUSTOMIZE
    coverImageAlt: "the beginning...",      // CUSTOMIZE
    orientation: 'landscape',
    photos: [
      {
        src: '/images/08/IMG_6389.JPEG',    // CUSTOMIZE
        caption: 'the beginning...',
      },
      {
        src: '/images/08/IMG_6410.JPEG',    // CUSTOMIZE
        caption: 'Tobi by July',
      },
      {
        src: '/images/08/IMG_6414.JPEG',    // CUSTOMIZE
        caption: 'July By Tobi',
      },
    ],
    secretNote: 'I stayed up until 6am just to be awake when your midnight happened.',
  },
  // ── Memory 09 ──────────────────────────────────────────────────────────────
  {
    id: '09',
    title: 'Party & friends',
    date: 'Nach Mitternacht',                           // CUSTOMIZE
    location: 'An der Bar',                  // CUSTOMIZE
    coverImage: '/images/09/IMG_4839.JPEG',
    coverImageAlt: 'The moment we first met',     // CUSTOMIZE
    orientation: 'portrait',
    photos: [
      {
        src: '/images/09/269ed78a-b4c0-4c1b-ac6e-e74f1376c6b3.JPEG',
        caption: 'Tobi in Lederhose',
      },
      {
        src: '/images/09/IMG_5912.JPEG',
        caption: 'Machen a gute Figur',
      },
      {
        src: '/images/09/IMG_5998.JPG',
        caption: 'Nina`s Birthday',
      },
      {
        src: '/images/09/IMG_6017.JPEG',
        caption: 'Es war bestimmt kein Alkohol im Spiel',
      },
      {
        src: '/images/09/IMG_6008.JPEG',
        caption: 'Legende!',
      },
      {
        src: '/images/09/IMG_6023.JPEG',
        caption: 'The rest is history...',
      },
      {
        src: '/images/09/IMG_6060.JPG',
        caption: 'JKU Sommerfest mit Jaki',
      },
    ],
    // CUSTOMIZE: Something only she'll understand. Appears after last photo via ✦.
    secretNote: 'I already knew. I just wasn\'t ready to admit it yet.',
  },
  // ── Memory 10 ──────────────────────────────────────────────────────────────
  {
    id: '10',
    title: 'Wein- Abend/Urlaub',
    date: 'Vinoclock',                           // CUSTOMIZE
    location: 'Weinfelder',                  // CUSTOMIZE
    coverImage: '/images/10/16de40af-b452-49b8-8ac9-2481660d708a.jpg',
    coverImageAlt: '',     // CUSTOMIZE
    orientation: 'portrait',
    photos: [
      {
        src: '/images/10/7ed6e8e6-ac28-45b0-8dd8-ea1eb6bc4188.jpg',
        caption: 'immer nu funny',
      },
      {
        src: '/images/10/5807513f-819b-4899-b87c-b75d2f0d6017.jpg',
        caption: 'Der Blick, zu süß',
      },
      {
        src: '/images/10/caeaabe4-f745-4c0c-bbdd-3e27b41329b0.jpg',
      },
      {
        src: '/images/10/IMG_6578.JPEG',
        caption: 'I hoff des Bild is immer nu in da Speisekarte',
      },
      {
        src: '/images/10/IMG_6734.JPG',
        caption: '<3',
      },
      {
        src: '/images/10/CE7181B6-9E70-4D95-BAAA-BE257EC0A83E.jpg',
        caption: 'leider umsonst umgezogen :(',
      },
      {
        src: '/images/10/IMG_2880.JPG',
        caption: 'Wäre eigentlich a süßes Bild wordn... eigentlich ;)',
      },
      {
        src: '/images/10/767928a7-81e2-4747-8a83-de5ea98f9b7c.jpg',
        caption: 'Des is dafür wirklich süß wordn',
      },
    ],
    secretNote: 'I already knew. I just wasn\'t ready to admit it yet.',
  },

  // ── Memory 11 ──────────────────────────────────────────────────────────────
  {
    id: '11',
    title: 'Memory 11',                          // CUSTOMIZE
    date: '2025',                                // CUSTOMIZE
    location: 'Somewhere',                       // CUSTOMIZE
    coverImage: 'https://picsum.photos/seed/m11a/600/800',
    coverImageAlt: 'Memory 11',                  // CUSTOMIZE
    orientation: 'landscape',
    photos: [
      { src: 'https://picsum.photos/seed/m11a/800/600', caption: 'Caption 1' },  // CUSTOMIZE
      { src: 'https://picsum.photos/seed/m11b/800/600', caption: 'Caption 2' },  // CUSTOMIZE
      { src: 'https://picsum.photos/seed/m11c/800/600', caption: 'Caption 3' },  // CUSTOMIZE
    ],
  },

  // ── Memory 12 ──────────────────────────────────────────────────────────────
  {
    id: '12',
    title: 'Memory 12',                          // CUSTOMIZE
    date: '2025',                                // CUSTOMIZE
    location: 'Somewhere',                       // CUSTOMIZE
    coverImage: 'https://picsum.photos/seed/m12a/600/800',
    coverImageAlt: 'Memory 12',                  // CUSTOMIZE
    orientation: 'portrait',
    photos: [
      { src: 'https://picsum.photos/seed/m12a/600/800', caption: 'Caption 1' },  // CUSTOMIZE
      { src: 'https://picsum.photos/seed/m12b/600/800', caption: 'Caption 2' },  // CUSTOMIZE
      { src: 'https://picsum.photos/seed/m12c/600/800', caption: 'Caption 3' },  // CUSTOMIZE
    ],
  },

  // ── Memory 13 ──────────────────────────────────────────────────────────────
  {
    id: '13',
    title: 'Memory 13',                          // CUSTOMIZE
    date: '2025',                                // CUSTOMIZE
    location: 'Somewhere',                       // CUSTOMIZE
    coverImage: 'https://picsum.photos/seed/m13a/600/800',
    coverImageAlt: 'Memory 13',                  // CUSTOMIZE
    orientation: 'landscape',
    photos: [
      { src: 'https://picsum.photos/seed/m13a/800/600', caption: 'Caption 1' },  // CUSTOMIZE
      { src: 'https://picsum.photos/seed/m13b/800/600', caption: 'Caption 2' },  // CUSTOMIZE
      { src: 'https://picsum.photos/seed/m13c/800/600', caption: 'Caption 3' },  // CUSTOMIZE
    ],
  },

  // ── Memory 14 ──────────────────────────────────────────────────────────────
  {
    id: '14',
    title: 'Memory 14',                          // CUSTOMIZE
    date: '2025',                                // CUSTOMIZE
    location: 'Somewhere',                       // CUSTOMIZE
    coverImage: 'https://picsum.photos/seed/m14a/600/800',
    coverImageAlt: 'Memory 14',                  // CUSTOMIZE
    orientation: 'portrait',
    photos: [
      { src: 'https://picsum.photos/seed/m14a/600/800', caption: 'Caption 1' },  // CUSTOMIZE
      { src: 'https://picsum.photos/seed/m14b/600/800', caption: 'Caption 2' },  // CUSTOMIZE
      { src: 'https://picsum.photos/seed/m14c/600/800', caption: 'Caption 3' },  // CUSTOMIZE
    ],
  },

  // ── Memory 15 ──────────────────────────────────────────────────────────────
  {
    id: '15',
    title: 'Memory 15',                          // CUSTOMIZE
    date: '2025',                                // CUSTOMIZE
    location: 'Somewhere',                       // CUSTOMIZE
    coverImage: 'https://picsum.photos/seed/m15a/600/800',
    coverImageAlt: 'Memory 15',                  // CUSTOMIZE
    orientation: 'landscape',
    photos: [
      { src: 'https://picsum.photos/seed/m15a/800/600', caption: 'Caption 1' },  // CUSTOMIZE
      { src: 'https://picsum.photos/seed/m15b/800/600', caption: 'Caption 2' },  // CUSTOMIZE
      { src: 'https://picsum.photos/seed/m15c/800/600', caption: 'Caption 3' },  // CUSTOMIZE
    ],
  },

  // ── Memory 16 ──────────────────────────────────────────────────────────────
  {
    id: '16',
    title: 'Memory 16',                          // CUSTOMIZE
    date: '2025',                                // CUSTOMIZE
    location: 'Somewhere',                       // CUSTOMIZE
    coverImage: 'https://picsum.photos/seed/m16a/600/800',
    coverImageAlt: 'Memory 16',                  // CUSTOMIZE
    orientation: 'portrait',
    photos: [
      { src: 'https://picsum.photos/seed/m16a/600/800', caption: 'Caption 1' },  // CUSTOMIZE
      { src: 'https://picsum.photos/seed/m16b/600/800', caption: 'Caption 2' },  // CUSTOMIZE
      { src: 'https://picsum.photos/seed/m16c/600/800', caption: 'Caption 3' },  // CUSTOMIZE
    ],
  },

]

// ─── Secrets ─────────────────────────────────────────────────────────────────
// CUSTOMIZE: Replace `message` values with your actual inside jokes or private words.
// Symbols and hints are shown in the tracker — edit those too if you like.

export interface Secret {
  id: string
  symbol: string
  title: string
  hint: string
  message: string
}

export const secrets: Secret[] = [
  {
    id: 'secret-hero',
    symbol: '✦',
    title: 'The First Star',
    hint: 'Look where it all begins…',
    message: 'You are the best decision I almost didn\'t make.',  // CUSTOMIZE
  },
  {
    id: 'secret-story',
    symbol: '♡',
    title: 'A Hidden Feeling',
    hint: 'Somewhere in our story…',
    message: 'I started looking forward to your name on my screen more than I\'d like to admit.',  // CUSTOMIZE
  },
  {
    id: 'secret-wall-1',
    symbol: '✈',
    title: 'The Long Way',
    hint: 'Among the memories…',
    message: 'Nine thousand kilometers. Worth every single one.',  // CUSTOMIZE
  },
  {
    id: 'secret-wall-2',
    symbol: '◈',
    title: 'The Secret Door',
    hint: 'Keep exploring the wall…',
    message: 'I knew you\'d find this one. You find everything.',  // CUSTOMIZE
  },
  {
    id: 'secret-bridge',
    symbol: '☽',
    title: 'The Same Moon',
    hint: 'Somewhere between us…',
    message: 'Same moon. Different side of it. Still feels close.',  // CUSTOMIZE
  },
  {
    id: 'secret-note',
    symbol: '✿',
    title: 'What I Almost Wrote',
    hint: 'Hidden in the words…',
    message: 'There was a longer version of this note. It said the same things, just louder.',  // CUSTOMIZE
  },
]

// ─── Story Moments ────────────────────────────────────────────────────────────
// CUSTOMIZE: Edit dates, titles, and text to match your actual story.
// If a moment has a secretId, a hidden orb appears at the end of that card.

export interface StoryMoment {
  id: string
  date: string
  title: string
  text: string
  secretId?: string
}

export const storyMoments: StoryMoment[] = [
  {
    id: 'sm-1',
    date: 'April 2025',                                          // CUSTOMIZE
    title: 'An unexpected beginning.',
    text: 'These things don\'t announce themselves. One day you\'re living your life, and then — slowly, then all at once — there\'s someone in it you can\'t quite imagine not having.',
  },
  {
    id: 'sm-2',
    date: 'May 2025',                                            // CUSTOMIZE
    title: 'The long calls.',
    text: 'We started talking the way people do when they\'re trying to figure something out. Late. Longer than necessary. About nothing important. About everything important.',
    secretId: 'secret-story',
  },
  {
    id: 'sm-3',
    date: 'June 2025',                                           // CUSTOMIZE
    title: 'The quiet ones.',
    text: 'Not every memory is a story. Some are just — an afternoon. A laugh about something small. A look you remember without knowing exactly why.',
  },
  {
    id: 'sm-4',
    date: 'July 2025',                                           // CUSTOMIZE
    title: 'Midsummer.',
    text: 'This was the part of the year where I stopped pretending I wasn\'t completely gone on you. I think you already knew.',
  },
  {
    id: 'sm-5',
    date: 'August 2025',                                         // CUSTOMIZE
    title: 'The airport.',
    text: 'Airports used to be just airports. They\'re not that anymore. They\'re now places where I count down from ten and try to look calm.',
  },
  {
    id: 'sm-6',
    date: 'September – March',                                   // CUSTOMIZE
    title: 'Everything in between.',
    text: 'The calls. The time zones. The small updates about nothing. The mornings where you were already in my afternoon. We built a whole world in the in-between.',
  },
]

// ─── Final Message ────────────────────────────────────────────────────────────
// CUSTOMIZE: Shown after all 6 secrets are discovered.

export const finalMessage = {
  title: 'You found them all.',
  body: `I hid these here on purpose.\n\nNot because I wanted to make things difficult — but because I wanted this to feel like something you actually moved through. Something that took time. Something a little like us.\n\nA year ago I wouldn't have guessed I'd be writing this. But here I am. Completely certain that finding you was the best thing I didn't plan for.\n\nThis is yours. All of it. The whole year, every memory, every secret — I made it for you.\n\nHappy anniversary. I love you.`,  // CUSTOMIZE
  closing:   'Yours,',
  signature: 'L.',                                               // CUSTOMIZE
}

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
