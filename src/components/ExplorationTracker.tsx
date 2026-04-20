import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAdventure } from '../context/AdventureContext'
import { secrets } from '../data/memories'

export default function ExplorationTracker() {
  const { discoveredSecrets, secretCount, totalSecrets, allSecretsFound } = useAdventure()
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed bottom-6 right-4 sm:right-6 z-40">
      {/* Expanded panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="absolute bottom-full right-0 mb-3 w-56 bg-charcoal/96 backdrop-blur-sm border border-gold/15 shadow-2xl p-4"
            initial={{ opacity: 0, y: 10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.97 }}
            transition={{ duration: 0.2 }}
          >
            <p className="text-[9px] tracking-[0.35em] uppercase text-gold mb-3">
              Secrets discovered
            </p>

            <div className="space-y-2.5">
              {secrets.map(secret => {
                const found = discoveredSecrets.has(secret.id)
                return (
                  <div key={secret.id} className="flex items-start gap-2.5">
                    <span
                      className="text-[12px] flex-shrink-0 mt-px transition-colors duration-500"
                      style={{ color: found ? '#B8957A' : 'rgba(255,255,255,0.15)' }}
                    >
                      {secret.symbol}
                    </span>
                    <span
                      className="text-[11px] leading-snug font-light transition-colors duration-500"
                      style={{ color: found ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.25)' }}
                    >
                      {found ? secret.title : secret.hint}
                    </span>
                  </div>
                )
              })}
            </div>

            {allSecretsFound && (
              <motion.p
                className="text-[10px] tracking-widest uppercase text-gold text-center mt-4 pt-3 border-t border-gold/15"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                All found ✦
              </motion.p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        className="flex items-center gap-2 bg-charcoal/90 backdrop-blur-sm border border-gold/20 shadow-lg px-3 py-2 focus:outline-none focus-visible:ring-1 focus-visible:ring-gold"
        onClick={() => setOpen(o => !o)}
        aria-label={`Exploration progress: ${secretCount} of ${totalSecrets} secrets found`}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        <motion.span
          className="text-gold text-xs"
          animate={allSecretsFound ? { rotate: [0, 20, -20, 0] } : {}}
          transition={{ duration: 1.5, repeat: allSecretsFound ? Infinity : 0, repeatDelay: 3 }}
          aria-hidden="true"
        >
          ✦
        </motion.span>
        <span className="text-[11px] tracking-[0.2em] text-cream/60 font-light tabular-nums">
          {secretCount} / {totalSecrets}
        </span>
      </motion.button>
    </div>
  )
}
