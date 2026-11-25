import { Github, Linkedin, Mail, MapPin, ShoppingBag } from 'lucide-react'
import { Link } from 'wouter'
import { profile } from '@/data/profile'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-container">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Link href="/" className="wordmark" aria-label="Phil Greene home">
              <span>
                pg<span className="wordmark-dot">.</span>
              </span>
            </Link>
            <p className="mt-4 max-w-md text-sm leading-relaxed">
              Personal website and technical notebook of Phillip Greene—exploring data analytics,
              AI systems, automation, and practical software.
            </p>
            <p className="editorial-quote mt-5 text-sm">{profile.mantra}</p>
          </div>

          <div>
            <p className="font-mono-meta mb-3 text-xs uppercase tracking-wider text-[var(--text-secondary)]">
              Explore
            </p>
            <nav aria-label="Footer navigation" className="flex flex-col gap-2 text-sm">
              <Link href="/about" className="hover:text-[var(--accent-primary)]">
                About
              </Link>
              <Link href="/projects" className="hover:text-[var(--accent-primary)]">
                Projects
              </Link>
              <Link href="/writing" className="hover:text-[var(--accent-primary)]">
                Writing
              </Link>
              <Link href="/now" className="hover:text-[var(--accent-primary)]">
                Now
              </Link>
              <Link href="/resume" className="hover:text-[var(--accent-primary)]">
                Résumé
              </Link>
              <Link href="/contact" className="hover:text-[var(--accent-primary)]">
                Contact
              </Link>
            </nav>
          </div>

          <div>
            <p className="font-mono-meta mb-3 text-xs uppercase tracking-wider text-[var(--text-secondary)]">
              Connect
            </p>
            <div className="flex flex-col gap-2.5 text-sm text-[var(--text-secondary)]">
              <span className="inline-flex items-center gap-2">
                <MapPin size={15} aria-hidden="true" className="text-[var(--accent-secondary)]" />
                {profile.location}
              </span>
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 hover:text-[var(--accent-primary)]"
              >
                <Mail size={15} aria-hidden="true" className="text-[var(--accent-secondary)]" />
                {profile.email}
              </a>
              <div className="mt-2 flex items-center gap-3">
                <a
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Phil Greene on GitHub"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-[var(--border-default)] bg-[var(--bg-surface)] text-[var(--text-primary)] hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)]"
                >
                  <Github size={16} aria-hidden="true" />
                </a>
                <a
                  href={profile.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Phil Greene on LinkedIn"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-[var(--border-default)] bg-[var(--bg-surface)] text-[var(--text-primary)] hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)]"
                >
                  <Linkedin size={16} aria-hidden="true" />
                </a>
                <a
                  href={profile.gumroadUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Phil Greene Gumroad Shop"
                  title="Gumroad Shop"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-[var(--border-default)] bg-[var(--bg-surface)] text-[var(--text-primary)] hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)]"
                >
                  <ShoppingBag size={16} aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--border-default)] pt-6 text-xs text-[var(--text-secondary)]">
          <span>© {new Date().getFullYear()} {profile.name}</span>
          <div className="flex flex-wrap gap-5">
            <Link href="/privacy-policy" className="hover:text-[var(--text-primary)]">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-[var(--text-primary)]">
              Terms
            </Link>
            <Link href="/accessibility" className="hover:text-[var(--text-primary)]">
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
