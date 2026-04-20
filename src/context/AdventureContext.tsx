import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
  type ReactNode,
} from 'react'
import { secrets, type Secret } from '../data/memories'

interface AdventureState {
  discoveredSecrets: Set<string>
  openedMemories: number
  recentFoundSecret: Secret | null
  allSecretsFound: boolean
  secretCount: number
  totalSecrets: number
  discoverSecret: (id: string) => void
  incrementOpenedMemories: () => void
}

const AdventureContext = createContext<AdventureState | null>(null)

const STORAGE_KEY = 'anniversary-v1'

interface StoredData {
  discovered: string[]
  opened: number
}

function loadStored(): StoredData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { discovered: [], opened: 0 }
    return JSON.parse(raw) as StoredData
  } catch {
    return { discovered: [], opened: 0 }
  }
}

export function AdventureProvider({ children }: { children: ReactNode }) {
  const initialData = useMemo(loadStored, [])

  // Use a ref as the authoritative source for discovered secrets so that
  // discoverSecret never closes over stale state.
  const discoveredRef = useRef<Set<string>>(new Set(initialData.discovered))
  const [discoveredSecrets, setDiscoveredSecrets] = useState<Set<string>>(
    () => new Set(initialData.discovered)
  )
  const [openedMemories, setOpenedMemories] = useState(initialData.opened)
  const [recentFoundSecret, setRecentFoundSecret] = useState<Secret | null>(null)
  const bannerTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Persist to localStorage on every change
  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ discovered: Array.from(discoveredSecrets), opened: openedMemories })
    )
  }, [discoveredSecrets, openedMemories])

  const discoverSecret = useCallback((id: string) => {
    if (discoveredRef.current.has(id)) return  // already found
    const secret = secrets.find(s => s.id === id)
    if (!secret) return

    discoveredRef.current.add(id)
    setDiscoveredSecrets(new Set(discoveredRef.current))

    // Show banner
    if (bannerTimer.current) clearTimeout(bannerTimer.current)
    setRecentFoundSecret(secret)
    bannerTimer.current = setTimeout(() => setRecentFoundSecret(null), 5000)
  }, [])

  const incrementOpenedMemories = useCallback(() => {
    setOpenedMemories(c => c + 1)
  }, [])

  const secretCount = discoveredSecrets.size
  const allSecretsFound = secretCount >= secrets.length

  return (
    <AdventureContext.Provider value={{
      discoveredSecrets,
      openedMemories,
      recentFoundSecret,
      allSecretsFound,
      secretCount,
      totalSecrets: secrets.length,
      discoverSecret,
      incrementOpenedMemories,
    }}>
      {children}
    </AdventureContext.Provider>
  )
}

export function useAdventure() {
  const ctx = useContext(AdventureContext)
  if (!ctx) throw new Error('useAdventure must be used inside AdventureProvider')
  return ctx
}
