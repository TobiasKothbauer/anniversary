import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { surpriseLetter } from '../data/memories'

interface LetterModalProps {
  onClose: () => void
}

// ─── Letter Modal ─────────────────────────────────────────────────────────────
// The hidden "surprise" interaction — an open letter that reveals a personal message.
// CUSTOMIZE all content in src/data/memories.ts → surpriseLetter

export default function LetterModal({ onClose }: LetterModalProps) {

  // Close on Escape key + lock body scroll while open
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    document.body.classList.add('modal-open')

    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.classList.remove('modal-open')
    }
  }, [onClose])

  return (
    // ── Backdrop ────────────────────────────────────────────────────────────
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      role="dialog"
      aria-modal="true"
      aria-label="Personal letter"
    >
      {/* Clickable dim overlay */}
      <motion.div
        className="absolute inset-0 bg-charcoal/75 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* ── Letter card ───────────────────────────────────────────────────── */}
      <motion.div
        className="
          relative bg-cream max-w-lg w-full
          max-h-[88vh] overflow-y-auto
          rounded-sm shadow-2xl
          flex flex-col
        "
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 20 }}
        transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
      >

        {/* ── Letter header ─────────────────────────────────────────────── */}
        <div className="pt-10 pb-6 px-8 md:px-12 border-b border-cream-subtle text-center flex-shrink-0">
          {/* Decorative envelope icon */}
          <div
            className="text-gold text-3xl mb-4 select-none"
            aria-hidden="true"
          >
            ✉
          </div>
          {/* CUSTOMIZE: surpriseLetter.salutation */}
          <p className="font-serif text-lg text-charcoal-muted font-light italic">
            {surpriseLetter.salutation}
          </p>
        </div>

        {/* ── Letter body ───────────────────────────────────────────────── */}
        {/* CUSTOMIZE: surpriseLetter.body — each \n\n becomes a new paragraph */}
        <div className="px-8 md:px-12 py-8 space-y-5 flex-1">
          {surpriseLetter.body.split('\n\n').map((paragraph, i) => {
            // Short paragraphs (< 80 chars) are rendered as italic lead-ins
            const isShort = paragraph.trim().length < 80
            return (
              <p
                key={i}
                className={
                  isShort
                    ? 'font-serif text-lg md:text-xl italic text-charcoal font-light text-center leading-relaxed'
                    : 'text-charcoal-muted text-[1.02rem] leading-[1.85] font-light'
                }
              >
                {paragraph}
              </p>
            )
          })}

          {/* Sign-off + script signature */}
          {/* CUSTOMIZE: surpriseLetter.closing and .signature */}
          <div className="pt-6 space-y-1">
            <p className="text-charcoal-muted text-base font-light">
              {surpriseLetter.closing}
            </p>
            <p
              className="font-script text-5xl text-charcoal"
              aria-label={`Signed: ${surpriseLetter.signature}`}
            >
              {surpriseLetter.signature}
            </p>
          </div>
        </div>

        {/* ── Close button ──────────────────────────────────────────────── */}
        <div className="px-8 md:px-12 pb-8 pt-6 border-t border-cream-subtle text-center flex-shrink-0">
          <button
            onClick={onClose}
            className="btn-primary"
            autoFocus
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}
