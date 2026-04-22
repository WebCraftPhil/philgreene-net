import { Link } from 'wouter'
import { Mail, Heart } from 'lucide-react'

const legalLinks = [
  { href: '/privacy-policy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms' },
  { href: '/cookie-policy', label: 'Cookie Policy' },
  { href: '/refund-policy', label: 'Refund Policy' },
  { href: '/disclaimer', label: 'Disclaimer' },
  { href: '/accessibility', label: 'Accessibility' },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <section aria-labelledby="footer-about" className="space-y-3">
            <h2 id="footer-about" className="text-lg font-semibold text-card-foreground">
              Phil Greene
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Personal developer portfolio and contact point for project inquiries.
            </p>
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              <Mail className="w-4 h-4" aria-hidden="true" />
              <a className="text-primary underline" href="mailto:me@philgreene.net">
                me@philgreene.net
              </a>
            </p>
          </section>

          <nav aria-label="Footer navigation" className="space-y-3">
            <h2 className="text-lg font-semibold text-card-foreground">Site Links</h2>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/#about" className="text-muted-foreground hover:text-primary transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="/#services" className="text-muted-foreground hover:text-primary transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="/#projects" className="text-muted-foreground hover:text-primary transition-colors">
                  Projects
                </a>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Legal links" className="space-y-3">
            <h2 className="text-lg font-semibold text-card-foreground">Legal & Compliance</h2>
            <ul className="space-y-2 text-sm">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-8 pt-6 border-t border-border space-y-2 text-sm text-muted-foreground">
          <p>Questions about privacy or accessibility? <Link href="/contact" className="text-primary underline">Contact me here</Link>.</p>
          <p className="flex items-center gap-2">© {currentYear} Phil Greene. Built with care <Heart className="w-4 h-4 text-primary" aria-hidden="true" />.</p>
        </div>
      </div>
    </footer>
  )
}
