import { useEffect, useRef } from 'react'

const SCRIPT_ID = 'cloudflare-turnstile-script'

type TurnstileApi = {
  render: (element: HTMLElement, options: Record<string, unknown>) => string
  remove: (id: string) => void
  reset: (id: string) => void
}

declare global {
  interface Window { turnstile?: TurnstileApi }
}

function loadTurnstile() {
  if (document.getElementById(SCRIPT_ID)) return
  const script = document.createElement('script')
  script.id = SCRIPT_ID
  script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
  script.async = true
  script.defer = true
  document.head.appendChild(script)
}

export default function TurnstileWidget({ onToken, resetKey }: { onToken: (token: string) => void; resetKey: number }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<string>()
  const siteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY?.trim() || (import.meta.env.DEV ? '1x00000000000000000000AA' : '')

  useEffect(() => {
    if (!siteKey) return
    loadTurnstile()
    let cancelled = false
    let attempts = 0
    const render = () => {
      if (cancelled || !containerRef.current) return
      if (!window.turnstile) {
        attempts += 1
        if (attempts < 80) window.setTimeout(render, 100)
        return
      }
      if (widgetIdRef.current) window.turnstile.remove(widgetIdRef.current)
      containerRef.current.replaceChildren()
      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey: siteKey,
        action: 'website_scan',
        theme: 'light',
        size: 'flexible',
        callback: (token: string) => onToken(token),
        'expired-callback': () => onToken(''),
        'error-callback': () => onToken(''),
        'refresh-expired': 'auto',
      })
    }
    render()
    return () => {
      cancelled = true
      if (widgetIdRef.current && window.turnstile) window.turnstile.remove(widgetIdRef.current)
      widgetIdRef.current = undefined
    }
  }, [onToken, resetKey, siteKey])

  if (!siteKey) return <p className="scanner-config-error" role="alert">Website verification is being configured. You can still request a manual audit below.</p>
  return <div ref={containerRef} className="turnstile-slot" aria-label="Website verification" />
}
