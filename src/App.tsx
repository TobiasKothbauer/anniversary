import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'

import { AdventureProvider, useAdventure } from './context/AdventureContext'
import Hero from './components/Hero'
import ChapterDivider from './components/ChapterDivider'
import StoryScroll from './components/StoryScroll'
import MemoryWall from './components/MemoryWall'
import DistanceBridge from './components/DistanceBridge'
import LoveNote from './components/LoveNote'
import FinalMessage from './components/FinalMessage'
import GalleryModal from './components/GalleryModal'
import LetterModal from './components/LetterModal'
import ExplorationTracker from './components/ExplorationTracker'
import SecretFoundBanner from './components/SecretFoundBanner'
import type { Memory } from './data/memories'

// Inner app has access to AdventureContext
function AppInner() {
  const { incrementOpenedMemories } = useAdventure()
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null)
  const [isLetterOpen, setIsLetterOpen]     = useState(false)

  const handleOpenMemory = (memory: Memory) => {
    setSelectedMemory(memory)
    if (!memory.hidden) incrementOpenedMemories()
  }

  return (
    <main className="relative bg-cream min-h-screen overflow-x-hidden">
      <Hero />

      <ChapterDivider id="story" number="I" title="Where It Started" />
      <StoryScroll />

      <ChapterDivider number="II" title="The Memories" />
      <MemoryWall onSelect={handleOpenMemory} />

      <ChapterDivider number="III" title="Across the Distance" dark />
      <DistanceBridge />

      <ChapterDivider number="IV" title="What I Want You to Know" />
      <LoveNote onOpenLetter={() => setIsLetterOpen(true)} />

      <FinalMessage />

      {/* Gallery modal */}
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

      {/* Fixed UI overlays */}
      <ExplorationTracker />
      <SecretFoundBanner />
    </main>
  )
}

export default function App() {
  return (
    <AdventureProvider>
      <AppInner />
    </AdventureProvider>
  )
}
