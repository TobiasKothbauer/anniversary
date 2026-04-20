import { AnimatePresence, motion } from 'framer-motion'
import { useAdventure } from '../context/AdventureContext'

export default function SecretFoundBanner() {
  const { recentFoundSecret, secretCount, totalSecrets } = useAdventure()

  return (
    <AnimatePresence>
      {recentFoundSecret && (
        <motion.div
          className="fixed bottom-20 left-4 right-4 sm:left-6 sm:right-auto sm:w-72 z-50 pointer-events-none"
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.97 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          role="status"
          aria-live="polite"
        >
          <div className="bg-charcoal border border-gold/20 shadow-2xl px-5 py-4">
            {/* Header row */}
            <div className="flex items-center gap-2.5 mb-2">
              <motion.span
                className="text-gold text-base"
                animate={{ rotate: [0, 20, -20, 0], scale: [1, 1.3, 1] }}
                transition={{ duration: 0.8 }}
                aria-hidden="true"
              >
                {recentFoundSecret.symbol}
              </motion.span>
              <div>
                <p className="text-[9px] tracking-[0.3em] uppercase text-gold leading-none mb-0.5">
                  Secret found — {secretCount} / {totalSecrets}
                </p>
                <p className="text-cream/90 text-xs font-medium tracking-wide">
                  {recentFoundSecret.title}
                </p>
              </div>
            </div>

            {/* Message */}
            <p className="font-serif text-cream/65 italic text-sm leading-relaxed">
              "{recentFoundSecret.message}"
            </p>

            {/* Progress bar */}
            <div className="mt-3 h-px w-full bg-cream/10 overflow-hidden">
              <motion.div
                className="h-full bg-gold/50"
                initial={{ width: `${((secretCount - 1) / totalSecrets) * 100}%` }}
                animate={{ width: `${(secretCount / totalSecrets) * 100}%` }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
