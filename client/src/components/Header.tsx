import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { useLocation } from 'wouter'
import { trackEvent } from '@/lib/analytics'

const navItems = [
  { href: 'services', label: 'Services' },
  { href: 'how-it-works', label: 'How It Works' },
  { href: 'who-its-for', label: "Who It's For" },
  { href: 'about', label: 'About' },
  { href: 'audit', label: 'Contact' },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [location] = useLocation()
  const homePrefix = location === '/' ? '' : '/'

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [isOpen])

  return (
    <header className="site-header">
      <div className="site-container header-inner">
        <a className="wordmark" href="/" aria-label="Phil Greene home">
          <span aria-hidden="true">PG</span>
          <strong>Phil Greene</strong>
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a key={item.href} href={`${homePrefix}#${item.href}`}>
              {item.label}
            </a>
          ))}
        </nav>

        <a
          className="button button-primary header-cta"
          href={`${homePrefix}#audit`}
          onClick={() => trackEvent('hero_cta_clicked', { placement: 'header' })}
        >
          Get a Free Audit
        </a>

        <button
          className="menu-button"
          type="button"
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
          onClick={() => setIsOpen((current) => !current)}
        >
          {isOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      {isOpen && (
        <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation">
          {navItems.map((item) => (
            <a key={item.href} href={`${homePrefix}#${item.href}`} onClick={() => setIsOpen(false)}>
              {item.label}
            </a>
          ))}
          <a
            className="button button-primary"
            href={`${homePrefix}#audit`}
            onClick={() => {
              trackEvent('hero_cta_clicked', { placement: 'mobile_header' })
              setIsOpen(false)
            }}
          >
            Get a Free Audit
          </a>
        </nav>
      )}
    </header>
  )
}
