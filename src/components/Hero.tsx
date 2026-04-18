import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { siteConfig } from '../data/memories'

// ─── Floating Particles ────────────────────────────────────────────────────
// Decorative ambient dots that float gently in the background.
// CUSTOMIZE: Adjust count, colors, or remove this component entirely if you prefer a cleaner look.
function FloatingParticles() {
  // useMemo so values are stable — no recalculation on re-render
  const particles = useMemo(
    () =>
      Array.from({ length: 22 }, (_, i) => ({
        id: i,
        // Deterministic pseudo-random positions using index
        x:        ((i * 47 + 13) % 97) + 1.5,
        y:        ((i * 31 + 7)  % 91) + 1.5,
        size:     ((i * 3)       % 4)  + 1.5,
        duration: ((i * 7)       % 8)  + 5,
        delay:    ((i * 5)       % 6),
        opacity:  (((i * 11) % 3) + 1) * 0.06,
      })),
    []
  )

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-gold"
          style={{
            left:    `${p.x}%`,
            top:     `${p.y}%`,
            width:   p.size,
            height:  p.size,
            opacity: p.opacity,
          }}
          animate={{
            y:       [0, -14, 0],
            opacity: [p.opacity, p.opacity * 2.8, p.opacity],
          }}
          transition={{
            duration:  p.duration,
            delay:     p.delay,
            repeat:    Infinity,
            ease:      'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

// ─── Animation Variants ───────────────────────────────────────────────────
const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay:    i * 0.16,
      duration: 1.0,
      ease:     [0.25, 0.46, 0.45, 0.94],
    },
  }),
}

// ─── Hero Component ───────────────────────────────────────────────────────
export default function Hero() {
  const titleLines = siteConfig.heroTitle.split('\n')

  const handleScroll = () => {
    document.getElementById('timeline')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center bg-cream px-6 overflow-hidden"
      aria-label="Opening"
    >
      <FloatingParticles />

      {/* Vertical top accent line */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-px bg-gradient-to-b from-transparent via-gold-light to-transparent opacity-50"
        style={{ height: '80px' }}
        initial={{ scaleY: 0, transformOrigin: 'top' }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 0.2, duration: 1.2 }}
        aria-hidden="true"
      />

      {/* Main content */}
      <div className="relative text-center max-w-3xl mx-auto">

        {/* Date label — CUSTOMIZE in siteConfig.anniversaryDate */}
        <motion.p
          className="section-label mb-8 text-gold"
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          {siteConfig.anniversaryDate}
        </motion.p>

        {/* Main headline */}
        <motion.h1
          className="font-serif font-light leading-[1.02] tracking-tight text-charcoal mb-6"
          style={{ fontSize: 'clamp(3.2rem, 10vw, 7.5rem)' }}
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          {titleLines.map((line, i) => (
            <span key={i} className="block">
              {/* Second line rendered italic for visual contrast */}
              {i === 1 ? <em className="italic font-light">{line}</em> : line}
            </span>
          ))}
        </motion.h1>

        {/* Decorative separator */}
        <motion.div
          className="mx-auto mb-7 flex items-center justify-center gap-3"
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          aria-hidden="true"
        >
          <div className="h-px w-14 bg-gold-light" />
          <div className="w-1.5 h-1.5 rounded-full bg-gold" />
          <div className="h-px w-14 bg-gold-light" />
        </motion.div>

        {/* Subtitle — CUSTOMIZE in siteConfig.heroSubtitle */}
        <motion.p
          className="font-serif text-xl md:text-2xl font-light italic text-charcoal-muted leading-relaxed mb-12 max-w-lg mx-auto"
          custom={3}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          {siteConfig.heroSubtitle}
        </motion.p>

        {/* CTA button — CUSTOMIZE text in siteConfig.heroCtaText */}
        <motion.div
          custom={4}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <button
            onClick={handleScroll}
            className="btn-primary"
            aria-label="Scroll to our story"
          >
            {siteConfig.heroCtaText}
          </button>
        </motion.div>
      </div>

      {/* Scroll breathing indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 2.5, duration: 1 }}
        aria-hidden="true"
      >
        <motion.div
          className="w-px h-10 bg-gradient-to-b from-gold-light to-transparent"
          animate={{ scaleY: [0.4, 1, 0.4], transformOrigin: 'top' }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* Subtle bottom gradient to fade into next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-cream-dark pointer-events-none"
        aria-hidden="true"
      />
    </section>
  )
}
