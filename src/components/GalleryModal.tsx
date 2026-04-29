import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Memory } from '../data/memories'

// ─── Props ───────────────────────────────────────────────────────────────────

interface GalleryModalProps {
  memory: Memory
  onClose: () => void
}

// ─── Photo slide animation ────────────────────────────────────────────────────

const slideVariants = {
  enter: (dir: number) => ({
    x:       dir > 0 ? '55%' : '-55%',
    opacity: 0,
    scale:   0.97,
  }),
  center: {
    x:       0,
    opacity: 1,
    scale:   1,
    transition: { duration: 0.38, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  exit: (dir: number) => ({
    x:       dir > 0 ? '-55%' : '55%',
    opacity: 0,
    scale:   0.97,
    transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

// ─── Gallery Modal ────────────────────────────────────────────────────────────

export default function GalleryModal({ memory, onClose }: GalleryModalProps) {
  const [index, setIndex]           = useState(0)
  const [direction, setDirection]   = useState(0)
  const [showSecret, setShowSecret] = useState(false)

  const photos   = memory.photos
  const current  = photos[index]
  const isFirst  = index === 0
  const isLast   = index === photos.length - 1
  const hasSecret = !!memory.secretNote

  // ── Navigation ─────────────────────────────────────────────────────────────
  const goTo = useCallback((newIndex: number) => {
    setDirection(newIndex > index ? 1 : -1)
    setIndex(newIndex)
  }, [index])

  const prev = useCallback(() => {
    if (showSecret) { setShowSecret(false); return }
    if (!isFirst) goTo(index - 1)
  }, [showSecret, isFirst, goTo, index])

  const next = useCallback(() => {
    if (showSecret) return
    if (isLast) {
      if (hasSecret) setShowSecret(true)
    } else {
      goTo(index + 1)
    }
  }, [showSecret, isLast, hasSecret, goTo, index])

  // ── Keyboard navigation ──────────────────────────────────────────────────
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape')      { showSecret ? setShowSecret(false) : onClose() }
      if (e.key === 'ArrowRight')  next()
      if (e.key === 'ArrowLeft')   prev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev, showSecret, onClose])

  // ── Body scroll lock ─────────────────────────────────────────────────────
  useEffect(() => {
    document.body.classList.add('modal-open')
    return () => document.body.classList.remove('modal-open')
  }, [])

  // ── Easter egg photo flash ───────────────────────────────────────────────
  const [eggFlash, setEggFlash] = useState(false)
  useEffect(() => {
    if (current?.isEasterEgg) {
      setEggFlash(true)
      const t = setTimeout(() => setEggFlash(false), 1200)
      return () => clearTimeout(t)
    }
  }, [current])

  return (
    // ── Full-screen backdrop ─────────────────────────────────────────────────
    <motion.div
      className="fixed inset-0 z-50 bg-charcoal flex flex-col select-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.28 }}
      role="dialog"
      aria-modal="true"
      aria-label={`Gallery: ${memory.title}`}
    >

      {/* ── Top bar ─────────────────────────────────────────────────────── */}
      <div className="flex items-start justify-between px-8 md:px-12 py-5 flex-shrink-0">
        <div>
          <h2 className="font-serif text-cream text-xl md:text-2xl font-light leading-tight">
            {memory.title}
          </h2>
          <p className="text-[10px] tracking-[0.28em] uppercase mt-1 text-gold">
            {memory.date}
            {memory.location && <span className="text-gold/60"> · {memory.location}</span>}
          </p>
        </div>

        <button
          onClick={onClose}
          className="text-cream/35 hover:text-cream transition-colors duration-200 text-lg leading-none p-1 mt-0.5 flex-shrink-0 ml-6"
          aria-label="Close gallery"
        >
          ✕
        </button>
      </div>

      {/* ── Main photo area ──────────────────────────────────────────────── */}
      <div className="flex-1 relative flex items-center justify-center overflow-hidden">

        {/* Left arrow */}
        <AnimatePresence>
          {(!isFirst || showSecret) && (
            <motion.button
              className="absolute left-4 md:left-8 z-20 text-cream/25 hover:text-cream/80 transition-colors duration-200 p-4 text-2xl"
              onClick={prev}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              aria-label={showSecret ? 'Back to photos' : 'Previous photo'}
            >
              ←
            </motion.button>
          )}
        </AnimatePresence>

        {/* Photo / Secret reveal */}
        <AnimatePresence mode="wait">
          {showSecret ? (
            <SecretReveal key="secret" memory={memory} />
          ) : (
            <motion.div
              key={index}
              className="relative flex flex-col items-center gap-5 px-16 md:px-24 max-w-5xl w-full"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              {/* Easter egg ring flash */}
              <AnimatePresence>
                {eggFlash && (
                  <motion.div
                    className="absolute inset-0 rounded-sm border border-gold/70 pointer-events-none"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    aria-hidden="true"
                  />
                )}
              </AnimatePresence>

              {/* The photo */}
              <div className="relative">
                {/* Golden border for easter egg photos */}
                {current.isEasterEgg && (
                  <div
                    className="absolute -inset-[3px] rounded-sm border border-gold/40 pointer-events-none"
                    aria-hidden="true"
                  />
                )}
                <img
                  src={`${import.meta.env.BASE_URL}${current.src.replace(/^\//, '')}`}
                  alt={`${memory.title}, photo ${index + 1} of ${photos.length}`}
                  className="max-h-[62vh] max-w-full object-contain shadow-2xl"
                  style={{ display: 'block' }}
                  draggable={false}
                />

                {/* Easter egg sparkle indicator */}
                {current.isEasterEgg && (
                  <motion.div
                    className="absolute top-2 right-2 text-gold text-sm"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, rotate: [0, 15, -15, 0] }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    aria-label="Easter egg photo"
                  >
                    ✦
                  </motion.div>
                )}
              </div>

              {/* Caption */}
              <AnimatePresence mode="wait">
                {current.caption && (
                  <motion.p
                    key={`caption-${index}`}
                    className="font-serif text-cream/65 italic text-center text-base md:text-lg max-w-xl leading-relaxed"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    {current.caption}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Right arrow / Secret trigger */}
        <AnimatePresence>
          {!showSecret && (
            <motion.button
              className={`
                absolute right-4 md:right-8 z-20 p-4 text-2xl transition-colors duration-200
                ${isLast && hasSecret
                  ? 'text-gold hover:text-gold-light'
                  : isLast
                  ? 'text-cream/10 cursor-default'
                  : 'text-cream/25 hover:text-cream/80'
                }
              `}
              onClick={isLast && !hasSecret ? undefined : next}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              aria-label={
                isLast && hasSecret
                  ? 'Reveal secret'
                  : isLast
                  ? 'Last photo'
                  : 'Next photo'
              }
              disabled={isLast && !hasSecret}
            >
              {isLast && hasSecret ? '✦' : '→'}
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* ── Bottom dot navigation ────────────────────────────────────────── */}
      <div className="flex items-center justify-center gap-2 pb-6 pt-3 flex-shrink-0">
        {photos.map((_, i) => (
          <button
            key={i}
            onClick={() => !showSecret && goTo(i)}
            className="transition-all duration-300 rounded-full"
            style={{
              width:           i === index && !showSecret ? '1rem' : '0.4rem',
              height:          '0.4rem',
              backgroundColor: i === index && !showSecret
                                 ? 'rgba(212,184,150,0.9)'
                                 : 'rgba(255,255,255,0.15)',
            }}
            aria-label={`Go to photo ${i + 1}`}
          />
        ))}

        {/* Secret dot — slightly offset, golden */}
        {hasSecret && (
          <button
            onClick={() => setShowSecret(s => !s)}
            className={`ml-1 text-[11px] transition-all duration-300 ${
              showSecret ? 'text-gold' : 'text-gold/30 hover:text-gold/70'
            }`}
            aria-label={showSecret ? 'Back to photos' : 'Reveal secret note'}
            title="There might be something hidden here…"
          >
            ✦
          </button>
        )}
      </div>
    </motion.div>
  )
}

// ─── Secret Reveal Panel ──────────────────────────────────────────────────────

function SecretReveal({ memory }: { memory: Memory }) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center text-center max-w-lg mx-auto px-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Animated star */}
      <motion.div
        className="text-gold text-3xl mb-8"
        animate={{ rotate: [0, 20, -20, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
        aria-hidden="true"
      >
        ✦
      </motion.div>

      <p className="section-label text-gold mb-6">
        A secret
      </p>

      {/* The secret note — CUSTOMIZE in memories.ts → secretNote */}
      <p className="font-serif text-cream text-xl md:text-2xl font-light italic leading-[1.7]">
        {memory.secretNote}
      </p>

      <div
        className="mt-10 w-8 h-px bg-gold/30 mx-auto"
        aria-hidden="true"
      />
    </motion.div>
  )
}
