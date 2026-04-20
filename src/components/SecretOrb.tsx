import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useAdventure } from '../context/AdventureContext'
import { secrets } from '../data/memories'

interface SecretOrbProps {
  secretId: string
  className?: string
}

export default function SecretOrb({ secretId, className = '' }: SecretOrbProps) {
  const { discoveredSecrets, discoverSecret } = useAdventure()
  const [wiggle, setWiggle] = useState(false)

  const secret = secrets.find(s => s.id === secretId)
  if (!secret) return null

  const isFound = discoveredSecrets.has(secretId)

  const handleClick = useCallback(() => {
    if (isFound) {
      // Already found — do a little wiggle so she knows she already got this one
      setWiggle(true)
      setTimeout(() => setWiggle(false), 600)
    } else {
      discoverSecret(secretId)
    }
  }, [isFound, discoverSecret, secretId])

  return (
    <motion.button
      onClick={handleClick}
      className={`relative inline-flex items-center justify-center w-8 h-8 focus:outline-none focus-visible:ring-1 focus-visible:ring-gold ${className}`}
      aria-label={isFound ? `Secret already found: ${secret.title}` : 'Something hidden here…'}
      animate={wiggle ? { rotate: [0, -15, 15, -10, 10, 0] } : {}}
      transition={{ duration: 0.5 }}
    >
      <motion.span
        className="text-[13px] select-none"
        style={{ color: isFound ? '#B8957A' : 'rgba(184,149,122,0.18)' }}
        animate={isFound ? { scale: 1, opacity: 1 } : {
          opacity: [0.18, 0.45, 0.18],
          scale:   [1, 1.15, 1],
        }}
        transition={isFound ? {} : {
          duration: 3.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {secret.symbol}
      </motion.span>

      {/* Ripple burst on first discovery — triggered by parent banner appearing */}
      {isFound && (
        <span
          className="absolute inset-0 rounded-full pointer-events-none"
          aria-hidden="true"
        />
      )}
    </motion.button>
  )
}
