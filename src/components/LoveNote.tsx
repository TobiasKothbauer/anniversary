import { motion } from 'framer-motion'
import { loveNote, siteConfig } from '../data/memories'
import SecretOrb from './SecretOrb'

interface LoveNoteProps {
  onOpenLetter: () => void
}

export default function LoveNote({ onOpenLetter }: LoveNoteProps) {
  return (
    <section
      className="py-24 md:py-40 bg-cream"
      aria-label="A personal note"
    >
      <div className="max-w-xl mx-auto px-6">

        {/* ── Section header ──────────────────────────────────────────────── */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85 }}
        >
          <p className="section-label mb-5">A note</p>
          {/* CUSTOMIZE: Title in loveNote.title */}
          <h2 className="section-title">{loveNote.title}</h2>
          <div className="mx-auto mt-7 flex items-center justify-center gap-3" aria-hidden="true">
            <div className="h-px w-12 bg-gold-light" />
            <div className="w-1.5 h-1.5 rounded-full bg-gold" />
            <div className="h-px w-12 bg-gold-light" />
          </div>
        </motion.div>

        {/* ── Letter body ─────────────────────────────────────────────────── */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.15 }}
        >
          {/* Preface — italic, centered, slightly larger */}
          {/* CUSTOMIZE: loveNote.preface */}
          <p className="font-serif text-xl md:text-2xl text-charcoal font-light italic leading-relaxed text-center mb-10">
            {loveNote.preface}
          </p>

          {/* Body paragraphs — split on double newlines */}
          {/* CUSTOMIZE: loveNote.body */}
          {loveNote.body.split('\n\n').map((paragraph, i) => (
            <p
              key={i}
              className="text-charcoal-muted text-[1.05rem] leading-[1.85] font-light"
            >
              {paragraph}
            </p>
          ))}

          {/* Sign-off */}
          {/* CUSTOMIZE: loveNote.signOff and loveNote.signature */}
          <div className="pt-8 space-y-1">
            <p className="text-charcoal-muted text-base font-light">
              {loveNote.signOff}
            </p>
            <div className="flex items-end gap-3">
              <p className="font-script text-5xl text-charcoal" aria-label={`Signature: ${loveNote.signature}`}>
                {loveNote.signature}
              </p>
              <SecretOrb secretId="secret-note" className="mb-2" />
            </div>
          </div>
        </motion.div>

        {/* ── Divider ─────────────────────────────────────────────────────── */}
        <motion.div
          className="my-16 flex items-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          aria-hidden="true"
        >
          <div className="h-px flex-1 bg-cream-subtle" />
          <div className="w-1.5 h-1.5 rounded-full bg-gold-light" />
          <div className="h-px flex-1 bg-cream-subtle" />
        </motion.div>

        {/* ── Surprise letter CTA ─────────────────────────────────────────── */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <p className="text-charcoal-light text-sm mb-7 font-light tracking-wide">
            There's one more thing.
          </p>
          <button
            onClick={onOpenLetter}
            className="btn-primary"
            aria-label="Open the personal letter"
          >
            Open my letter to you
          </button>
        </motion.div>

        {/* ── Page footer ─────────────────────────────────────────────────── */}
        <motion.p
          className="text-center text-charcoal-light/40 text-[10px] tracking-[0.3em] uppercase mt-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          {siteConfig.yourCity} → {siteConfig.herCity} · {new Date().getFullYear()}
        </motion.p>
      </div>
    </section>
  )
}
