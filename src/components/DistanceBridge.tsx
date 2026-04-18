import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { siteConfig } from '../data/memories'

// ─── Live clock hook ─────────────────────────────────────────────────────────
function useLocalTime(timezone: string) {
  const [time, setTime] = useState<string>('')

  useEffect(() => {
    const format = () =>
      new Date().toLocaleTimeString('en-US', {
        timeZone:  timezone,
        hour:      '2-digit',
        minute:    '2-digit',
        hour12:    true,
      })

    setTime(format())
    const id = setInterval(() => setTime(format()), 1000)
    return () => clearInterval(id)
  }, [timezone])

  return time
}

// ─── Animated arc SVG ────────────────────────────────────────────────────────
// A curved dashed line with a traveling dot connecting the two cities.
// Pure SVG — no dependencies beyond framer-motion for the path-draw animation.
function ConnectionArc() {
  return (
    <div
      className="relative w-full max-w-sm mx-auto my-10 select-none"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 320 100"
        className="w-full"
        preserveAspectRatio="xMidYMid meet"
        overflow="visible"
      >
        {/* Dashed arc path */}
        <motion.path
          d="M 24 72 Q 160 8 296 72"
          fill="none"
          stroke="#B8957A"
          strokeWidth="1"
          strokeDasharray="5 7"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.7 }}
          viewport={{ once: true }}
          transition={{ duration: 2.2, ease: 'easeInOut', delay: 0.4 }}
        />

        {/* Traveling dot — uses SVG animateMotion (SMIL), supported in all modern browsers */}
        <circle r="3.5" fill="#D4B896">
          <animateMotion
            dur="4s"
            repeatCount="indefinite"
            begin="2.4s"
            path="M 24 72 Q 160 8 296 72"
            calcMode="spline"
            keySplines="0.4 0 0.6 1"
            keyTimes="0;1"
          >
            <mpath href="#arcPath" />
          </animateMotion>
          <animate
            attributeName="opacity"
            values="0;1;1;0"
            dur="4s"
            repeatCount="indefinite"
            begin="2.4s"
          />
        </circle>

        {/* City anchor dots */}
        <circle cx="24"  cy="72" r="4" fill="#B8957A" opacity="0.7" />
        <circle cx="296" cy="72" r="4" fill="#B8957A" opacity="0.7" />

        {/* Subtle glow behind dots */}
        <circle cx="24"  cy="72" r="8" fill="#B8957A" opacity="0.12" />
        <circle cx="296" cy="72" r="8" fill="#B8957A" opacity="0.12" />
      </svg>
    </div>
  )
}

// ─── Distance Bridge Section ─────────────────────────────────────────────────
export default function DistanceBridge() {
  const yourTime = useLocalTime(siteConfig.yourTimezone)
  const herTime  = useLocalTime(siteConfig.herTimezone)

  return (
    <section
      className="py-24 md:py-36 bg-charcoal relative overflow-hidden"
      aria-label="Connecting across the distance"
    >
      {/* Ambient glow blobs */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: `
            radial-gradient(ellipse 60% 40% at 15% 50%, rgba(184,149,122,0.07) 0%, transparent 70%),
            radial-gradient(ellipse 60% 40% at 85% 50%, rgba(184,149,122,0.07) 0%, transparent 70%)
          `,
        }}
      />

      <div className="relative max-w-4xl mx-auto px-6 text-center">

        {/* ── Label ──────────────────────────────────────────────────────── */}
        <motion.p
          className="text-[10px] tracking-[0.35em] uppercase text-gold mb-7"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          Across the distance
        </motion.p>

        {/* ── Headline — CUSTOMIZE distance and subtext ────────────────── */}
        <motion.h2
          className="font-serif font-light text-cream leading-[1.1] tracking-tight"
          style={{ fontSize: 'clamp(2rem, 6vw, 4rem)' }}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.95, delay: 0.1 }}
        >
          {siteConfig.distanceKm} kilometers apart.
          <br />
          <em className="italic text-gold-light">
            Still the first person I think of.
          </em>
        </motion.h2>

        {/* ── Arc visualization ────────────────────────────────────────── */}
        <ConnectionArc />

        {/* ── City cards row ───────────────────────────────────────────── */}
        <motion.div
          className="flex items-start justify-between max-w-xs sm:max-w-sm mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.7 }}
        >
          {/* Your city — CUSTOMIZE via siteConfig */}
          <div className="text-left">
            <p className="text-[9px] tracking-[0.3em] uppercase text-gold mb-1">
              {siteConfig.yourCountry}
            </p>
            <p className="font-serif text-cream text-lg font-light">
              {siteConfig.yourCity}
            </p>
            {yourTime && (
              <p className="text-cream/35 text-xs mt-1 tabular-nums font-light">
                {yourTime}
              </p>
            )}
          </div>

          {/* Ocean label */}
          <div className="pt-2 opacity-30">
            <p className="text-cream text-[9px] tracking-widest uppercase">
              {siteConfig.distanceLabel}
            </p>
          </div>

          {/* Her city — CUSTOMIZE via siteConfig */}
          <div className="text-right">
            <p className="text-[9px] tracking-[0.3em] uppercase text-gold mb-1">
              {siteConfig.herCountry}
            </p>
            <p className="font-serif text-cream text-lg font-light">
              {siteConfig.herCity}
            </p>
            {herTime && (
              <p className="text-cream/35 text-xs mt-1 tabular-nums font-light">
                {herTime}
              </p>
            )}
          </div>
        </motion.div>

        {/* ── Emotional quote ──────────────────────────────────────────── */}
        {/* CUSTOMIZE: Replace with something that feels true to your situation */}
        <motion.blockquote
          className="mt-16 max-w-xl mx-auto"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.95, delay: 0.3 }}
        >
          <p className="font-serif text-lg md:text-xl text-cream/60 font-light italic leading-relaxed">
            "Every morning I wake up knowing you're still asleep. Every night
            I fall asleep knowing you're just getting started. Different clocks.
            Same person."
          </p>
        </motion.blockquote>

      </div>
    </section>
  )
}
