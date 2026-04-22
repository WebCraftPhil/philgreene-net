import { useEffect, useState } from 'react'
import { Link } from 'wouter'

const STORAGE_KEY = 'cookie_notice_dismissed_v1'

export default function CookieNotice() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const dismissed = localStorage.getItem(STORAGE_KEY)
    setVisible(!dismissed)
  }, [])

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, 'true')
    setVisible(false)
  }

  if (!visible) {
    return null
  }

  return (
    <aside
      className="fixed bottom-4 left-4 right-4 md:left-auto md:max-w-md z-50 border border-border bg-card rounded-lg p-4 shadow-lg"
      aria-label="Cookie notice"
    >
      <p className="text-sm text-muted-foreground">
        This site uses minimal cookies/storage for essential functionality and optional analytics.
        See the{' '}
        <Link href="/cookie-policy" className="text-primary underline">
          Cookie Policy
        </Link>
        .
      </p>
      <button
        type="button"
        onClick={dismiss}
        className="mt-3 inline-flex items-center rounded-md border border-border px-3 py-1.5 text-sm hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        Got it
      </button>
    </aside>
  )
}
