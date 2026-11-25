import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'dark' | 'light'

type ThemeProviderProps = {
  children: React.ReactNode
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

function getSystemTheme(): Theme {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return 'dark'
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function getInitialThemeState(): { theme: Theme; hasExplicitPreference: boolean } {
  let stored: string | null = null
  try {
    stored = window.localStorage.getItem('theme')
  } catch {
    // Ignore storage access errors in restricted contexts
  }
  if (stored === 'dark' || stored === 'light') {
    return { theme: stored, hasExplicitPreference: true }
  }
  return { theme: getSystemTheme(), hasExplicitPreference: false }
}

const ThemeProviderContext = createContext<ThemeProviderState | undefined>(undefined)

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [initialThemeState] = useState(getInitialThemeState)
  const [theme, setThemeState] = useState<Theme>(initialThemeState.theme)
  const [hasExplicitPreference, setHasExplicitPreference] = useState<boolean>(
    initialThemeState.hasExplicitPreference
  )

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(theme)

    const metaTheme = window.document.querySelector('meta[name="theme-color"]')
    if (metaTheme) {
      metaTheme.setAttribute('content', theme === 'dark' ? '#161B22' : '#F4F3EF')
    }
  }, [theme])

  useEffect(() => {
    if (hasExplicitPreference || typeof window.matchMedia !== 'function') {
      return
    }
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    setThemeState(mediaQuery.matches ? 'dark' : 'light')
    const handleChange = (event: MediaQueryListEvent) => {
      setThemeState(event.matches ? 'dark' : 'light')
    }
    // addEventListener is the standard API; older WebKit builds expose only the
    // legacy addListener/removeListener pair, so use whichever is available.
    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    }
    const legacyQuery = mediaQuery as MediaQueryList & {
      addListener?: (listener: (event: MediaQueryListEvent) => void) => void
      removeListener?: (listener: (event: MediaQueryListEvent) => void) => void
    }
    if (typeof legacyQuery.addListener === 'function') {
      legacyQuery.addListener(handleChange)
      return () => legacyQuery.removeListener?.(handleChange)
    }
  }, [hasExplicitPreference])

  const setTheme = (nextTheme: Theme) => {
    try {
      window.localStorage.setItem('theme', nextTheme)
    } catch {
      // Ignore storage errors
    }
    setHasExplicitPreference(true)
    setThemeState(nextTheme)
  }

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <ThemeProviderContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
