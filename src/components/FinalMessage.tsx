import { motion, AnimatePresence } from 'framer-motion'
import { useAdventure } from '../context/AdventureContext'
import { finalMessage, secrets } from '../data/memories'

export default function FinalMessage() {
  const { allSecretsFound, secretCount, totalSecrets } = useAdventure()

  return (
    <section
      className="py-28 md:py-44 bg-charcoal relative overflow-hidden"
      aria-label="Final message"
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: allSecretsFound
            ? 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(184,149,122,0.1) 0%, transparent 70%)'
            : 'radial-gradient(ellipse 50% 40% at 50% 50%, rgba(184,149,122,0.04) 0%, transparent 70%)',
          transition: 'background 1.5s ease',
        }}
      />

      <div className="relative max-w-lg mx-auto px-6 text-center">

        <AnimatePresence mode="wait">
          {!allSecretsFound ? (
            /* ── Locked state ─────────────────────────────────────────────── */
            <motion.div
              key="locked"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
            >
              {/* Lock icon */}
              <motion.div
                className="text-3xl mb-8 text-cream/20 select-none"
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                aria-hidden="true"
              >
                ✦
              </motion.div>

              <p className="text-[10px] tracking-[0.35em] uppercase text-gold/50 mb-5">
                Hidden message
              </p>
              <h2
                className="font-serif font-light text-cream/50 leading-tight mb-6"
                style={{ fontSize: 'clamp(1.8rem, 5vw, 2.8rem)' }}
              >
                There is one more thing.
              </h2>
              <p className="font-serif text-cream/25 italic text-base">
                Find all {totalSecrets} secrets to unlock it.
              </p>

              {/* Secret constellation dots */}
              <div className="flex items-center justify-center gap-3 mt-8" aria-hidden="true">
                {secrets.map((s, i) => {
                  const found = i < secretCount
                  return (
                    <motion.div
                      key={s.id}
                      className="text-[11px] transition-colors duration-700"
                      style={{ color: found ? '#B8957A' : 'rgba(255,255,255,0.1)' }}
                      animate={found ? { scale: [1, 1.3, 1] } : { opacity: [0.1, 0.2, 0.1] }}
                      transition={found
                        ? { duration: 0.5 }
                        : { duration: 2, repeat: Infinity, delay: i * 0.3 }
                      }
                    >
                      {s.symbol}
                    </motion.div>
                  )
                })}
              </div>

              <p className="text-cream/15 text-xs tracking-widest mt-5 tabular-nums">
                {secretCount} of {totalSecrets} discovered
              </p>
            </motion.div>

          ) : (
            /* ── Unlocked state ───────────────────────────────────────────── */
            <motion.div
              key="unlocked"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <motion.div
                className="text-3xl mb-8 text-gold select-none"
                animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.15, 1] }}
                transition={{ duration: 1.2, delay: 0.3 }}
                aria-hidden="true"
              >
                ✉
              </motion.div>

              <motion.p
                className="text-[10px] tracking-[0.35em] uppercase text-gold mb-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                All secrets found ✦
              </motion.p>

              <motion.h2
                className="font-serif font-light text-cream leading-tight mb-10"
                style={{ fontSize: 'clamp(1.8rem, 5vw, 2.8rem)' }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                {finalMessage.title}
              </motion.h2>

              <motion.div
                className="space-y-5 text-left"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                {finalMessage.body.split('\n\n').map((para, i) => (
                  <p
                    key={i}
                    className="font-serif text-cream/65 text-base md:text-lg leading-[1.9] font-light italic"
                  >
                    {para}
                  </p>
                ))}

                <div className="pt-8 space-y-1">
                  <p className="text-cream/40 text-base font-light">
                    {finalMessage.closing}
                  </p>
                  <p
                    className="font-script text-5xl text-gold"
                    aria-label={`Signed: ${finalMessage.signature}`}
                  >
                    {finalMessage.signature}
                  </p>
                </div>
              </motion.div>

              {/* Decorative bottom stars */}
              <motion.div
                className="flex items-center justify-center gap-4 mt-16 text-gold/30 text-xs"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8 }}
                aria-hidden="true"
              >
                <span>✦</span>
                <span className="opacity-50">✦</span>
                <span className="opacity-25">✦</span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
