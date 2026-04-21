import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { memories, siteConfig, Memory } from '../data/memories'
import { useAdventure } from '../context/AdventureContext'
import SecretOrb from './SecretOrb'

// ─── Props ───────────────────────────────────────────────────────────────────

interface MemoryWallProps {
  onSelect: (memory: Memory) => void
}

// ─── Deterministic card rotations ────────────────────────────────────────────
// Small tilts give the wall a natural, physical feel without being distracting.
// CUSTOMIZE: Change these values (in degrees) to adjust the tilt angles.
const ROTATIONS = [-1.4, 0.9, -0.6, 1.7, -1.1, 0.7, -1.9, 1.3, -0.4, 1.6, -1.2, 0.5, -0.8, 1.4, -0.3, 1.0]

// How many memories to open before the hidden card reveals itself
const UNLOCK_AT = 3

// ─── Memory Wall ─────────────────────────────────────────────────────────────

export default function MemoryWall({ onSelect }: MemoryWallProps) {
  const { openedMemories } = useAdventure()
  const hiddenUnlocked = openedMemories >= UNLOCK_AT

  // Filter: show normal memories + hidden ones once unlocked
  const visible = memories.filter(m => !m.hidden || hiddenUnlocked)

  return (
    <section
      id="memories"
      className="py-24 md:py-32 bg-cream-dark"
      aria-label="Memory wall"
    >
      <div style={{ maxWidth: '100rem' }} className="mx-auto px-8">

        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85 }}
        >
          <div className="flex items-center justify-center gap-2">
            <p className="section-label mb-5">Our memories</p>
            <SecretOrb secretId="secret-wall-1" className="-mt-4" />
          </div>
          <h2 className="section-title">Click to explore</h2>
          {/* CUSTOMIZE: wallIntro in siteConfig */}
          <p className="text-charcoal-light text-sm mt-5 font-light max-w-md mx-auto leading-relaxed">
            {siteConfig.wallIntro}
          </p>
        </motion.div>

        {/* Masonry photo wall — CSS columns */}
        <div
          className="columns-2 md:columns-3 lg:columns-4"
          style={{ columnGap: '1.25rem' }}
        >
          {visible.map((memory, i) => {
            const rotation = ROTATIONS[i % ROTATIONS.length]
            const isNewlyUnlocked = !!memory.hidden && hiddenUnlocked

            return (
              <motion.div
                key={memory.id}
                style={{ breakInside: 'avoid', marginBottom: '1.25rem' }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, delay: (i % 3) * 0.07 }}
              >
                <MemoryCard
                  memory={memory}
                  baseRotation={rotation}
                  isNewlyUnlocked={isNewlyUnlocked}
                  onSelect={onSelect}
                />
              </motion.div>
            )
          })}
        </div>

        {/* "Unlock" teaser — shown until the hidden card is revealed */}
        <AnimatePresence>
          {!hiddenUnlocked && (
            <motion.div
              className="flex items-center justify-center gap-3 mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 1 }}
            >
              <p className="text-charcoal-light/40 text-xs tracking-[0.25em] uppercase">
                Keep exploring — something is waiting.
              </p>
              <SecretOrb secretId="secret-wall-2" />
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  )
}

// ─── Memory Card ─────────────────────────────────────────────────────────────

interface MemoryCardProps {
  memory: Memory
  baseRotation: number
  isNewlyUnlocked: boolean
  onSelect: (memory: Memory) => void
}

function MemoryCard({ memory, baseRotation, isNewlyUnlocked, onSelect }: MemoryCardProps) {
  const [hovered, setHovered] = useState(false)

  const aspectClass =
    memory.orientation === 'landscape' ? 'aspect-[4/3]' : 'aspect-[3/4]'

  return (
    <motion.button
      className={`
        relative w-full text-left bg-cream cursor-pointer block
        focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2
        ${isNewlyUnlocked ? 'ring-1 ring-gold/50' : ''}
      `}
      style={{
        boxShadow: '0 4px 20px rgba(28,25,23,0.12)',
        transformOrigin: 'center center',
      }}
      animate={{
        rotate: hovered ? 0 : baseRotation,
        scale:  hovered ? 1.03 : 1,
        y:      hovered ? -6 : 0,
        boxShadow: hovered
          ? '0 24px 60px rgba(28,25,23,0.22)'
          : '0 4px 20px rgba(28,25,23,0.12)',
      }}
      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={() => onSelect(memory)}
      aria-label={`Open memory: ${memory.title}`}
    >
      {/* Photo area */}
      <div className={`relative overflow-hidden ${aspectClass}`}>
        <motion.img
          src={memory.coverImage}
          alt={memory.coverImageAlt}
          className="w-full h-full object-cover"
          animate={{ scale: hovered ? 1.06 : 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          loading="lazy"
          decoding="async"
        />

        {/* Hover overlay */}
        <motion.div
          className="absolute inset-0 bg-charcoal flex items-center justify-center"
          animate={{ opacity: hovered ? 0.35 : 0 }}
          transition={{ duration: 0.3 }}
          aria-hidden="true"
        />

        {/* "Open" pill — appears on hover */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.25 }}
          aria-hidden="true"
        >
          <span className="bg-cream/92 text-charcoal text-[10px] tracking-[0.3em] uppercase px-4 py-2 font-medium">
            Open
          </span>
        </motion.div>

        {/* Photo count badge */}
        <div
          className="absolute bottom-2.5 right-2.5 bg-charcoal/60 backdrop-blur-sm text-cream/80 text-[9px] tracking-widest px-2 py-0.5 rounded-sm"
          aria-hidden="true"
        >
          {memory.photos.length} photos
        </div>

        {/* Secret indicator — a small ✦ if this memory has a secret note */}
        {memory.secretNote && (
          <div
            className="absolute top-2.5 right-2.5 text-gold text-[11px] opacity-60"
            aria-hidden="true"
            title="This memory has a secret"
          >
            ✦
          </div>
        )}
      </div>

      {/* Polaroid label area */}
      <div className="px-3 pt-3 pb-4">
        <p className="font-serif text-charcoal text-[1.05rem] font-light leading-snug">
          {memory.title}
        </p>
        <p className="text-charcoal-light text-[10px] tracking-[0.2em] uppercase mt-1">
          {memory.date}
          {memory.location && (
            <span className="text-charcoal-light/60"> · {memory.location}</span>
          )}
        </p>
      </div>

      {/* Newly unlocked glow ring */}
      {isNewlyUnlocked && (
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-sm"
          style={{ border: '1.5px solid rgba(184,149,122,0.5)' }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          aria-hidden="true"
        />
      )}
    </motion.button>
  )
}
