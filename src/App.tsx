import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Hero from './components/Hero'
import MemoryWall from './components/MemoryWall'
import GalleryModal from './components/GalleryModal'
import DistanceBridge from './components/DistanceBridge'
import LoveNote from './components/LoveNote'
import LetterModal from './components/LetterModal'
import type { Memory } from './data/memories'

export default function App() {
  // Which memory gallery is open (null = none)
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null)
  // Track how many memories have been opened — used to unlock the hidden card
  const [openedCount, setOpenedCount] = useState(0)
  // Surprise letter modal
  const [isLetterOpen, setIsLetterOpen] = useState(false)

  const handleOpenMemory = (memory: Memory) => {
    setSelectedMemory(memory)
    // Only increment for non-hidden memories to keep the easter egg fair
    if (!memory.hidden) setOpenedCount(c => c + 1)
  }

  return (
    <main className="relative bg-cream min-h-screen overflow-x-hidden">
      <Hero />

      <MemoryWall
        onSelect={handleOpenMemory}
        openedCount={openedCount}
      />

      <DistanceBridge />
      <LoveNote onOpenLetter={() => setIsLetterOpen(true)} />

      {/* Gallery modal — opens when a memory card is clicked */}
      <AnimatePresence>
        {selectedMemory && (
          <GalleryModal
            key="gallery"
            memory={selectedMemory}
            onClose={() => setSelectedMemory(null)}
          />
        )}
      </AnimatePresence>

      {/* Surprise letter modal */}
      <AnimatePresence>
        {isLetterOpen && (
          <LetterModal
            key="letter"
            onClose={() => setIsLetterOpen(false)}
          />
        )}
      </AnimatePresence>
    </main>
  )
}
