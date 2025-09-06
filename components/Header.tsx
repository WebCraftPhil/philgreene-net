'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';
import { trackEvent } from '../lib/analytics';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navigation = [
    { name: 'Services', href: '/#services' },
    { name: 'Projects', href: '/projects' },
    { name: 'Blog', href: '/blog' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-accent/80 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-secondary text-secondary-foreground flex items-center justify-center logo-pulse shadow-md">
              <span className="text-sm font-bold">PG</span>
            </div>
            <span className="text-xl font-bold text-foreground font-display">
              Phil Greene
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            {navigation.map(item => {
              const active = item.href.startsWith('/#')
                ? pathname === '/'
                : pathname?.startsWith(item.href);
              const base =
                'text-sm font-medium transition-colors border-b-2 border-transparent pb-1 underline-grow';
              const inactive = 'text-foreground/80 hover:text-secondary';
              const activeCls = 'text-secondary border-secondary';
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`${base} ${active ? activeCls : inactive}`}
                >
                  {item.name}
                </Link>
              );
            })}
            <ThemeToggle />
            <Link
              href="/contact"
              onClick={() => trackEvent('book_call')}
              className="btn-primary"
            >
              Work with me
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden rounded-md p-2 text-foreground hover:bg-muted"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={
                  isMenuOpen
                    ? 'M6 18L18 6M6 6l12 12'
                    : 'M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
                }
              />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="space-y-1 pb-3 pt-2">
              {navigation.map(item => {
                const active = item.href.startsWith('/#')
                  ? pathname === '/'
                  : pathname?.startsWith(item.href);
                const base =
                  'block px-3 py-2 text-base font-medium transition-colors rounded-md border-l-2 border-transparent';
                const inactive = 'text-foreground/80 hover:bg-muted hover:text-secondary hover:border-secondary';
                const activeCls = 'bg-muted text-secondary border-secondary';
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`${base} ${active ? activeCls : inactive}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                );
              })}
              <div className="flex items-center justify-between px-3 py-2">
                <span className="text-sm text-foreground/70">
                  Theme
                </span>
                <ThemeToggle />
              </div>
              <Link
                href="/contact"
                className="mx-3 mt-4 block btn-primary text-center"
                onClick={() => {
                  trackEvent('book_call');
                  setIsMenuOpen(false);
                }}
              >
                Work with me
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
