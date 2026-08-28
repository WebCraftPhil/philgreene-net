import { Github, Linkedin, Mail, MapPin } from 'lucide-react'
import { trackEvent } from '@/lib/analytics'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-container footer-main">
        <div>
          <a className="footer-wordmark" href="/">Phil Greene</a>
          <p>Better websites and practical automation for local businesses that depend on calls, quotes, and booked work.</p>
        </div>
        <nav aria-label="Footer navigation">
          <a href="/#websites">Websites</a>
          <a href="/#how-it-works">How It Works</a>
          <a href="/#automation">Automation</a>
          <a href="/#packages">Packages</a>
          <a href="/projects">Work &amp; Demonstrations</a>
          <a href="/#audit">Contact</a>
        </nav>
        <div className="footer-contact">
          <span><MapPin aria-hidden="true" /> Manchester, New Hampshire</span>
          <a href="mailto:me@philgreene.net" onClick={() => trackEvent('email_link_clicked', { placement: 'footer' })}>
            <Mail aria-hidden="true" /> me@philgreene.net
          </a>
          <div className="social-links">
            <a href="https://github.com/WebCraftPhil" target="_blank" rel="noreferrer" aria-label="Phil Greene on GitHub"><Github aria-hidden="true" /></a>
            <a href="https://linkedin.com/in/phil.greene1" target="_blank" rel="noreferrer" aria-label="Phil Greene on LinkedIn"><Linkedin aria-hidden="true" /></a>
          </div>
        </div>
      </div>
      <div className="site-container footer-legal">
        <span>© {new Date().getFullYear()} Phil Greene</span>
        <div>
          <a href="/privacy-policy">Privacy Policy</a>
          <a href="/terms">Terms</a>
          <a href="/accessibility">Accessibility</a>
        </div>
      </div>
    </footer>
  )
}
