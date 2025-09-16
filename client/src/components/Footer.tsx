import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  Heart, 
  Coffee,
  ArrowUp
} from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Mail, href: 'mailto:hello@developer.com', label: 'Email' }
  ]

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    console.log('Scrolled to top')
  }

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2 space-y-4">
            <div className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Dev Portfolio
            </div>
            <p className="text-muted-foreground leading-relaxed max-w-md">
              Creating digital experiences that blend cutting-edge technology with human-centered design. 
              Available for freelance projects and collaborations.
            </p>
            <div className="flex items-center gap-2">
              <Coffee className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">
                Currently brewing: Next.js projects & ML models
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-card-foreground">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              {[
                { href: '#about', label: 'About' },
                { href: '#services', label: 'Services' },
                { href: '#projects', label: 'Projects' },
                { href: '#contact', label: 'Contact' }
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-muted-foreground hover:text-primary transition-colors w-fit hover-elevate px-1 py-1 rounded"
                  data-testid={`link-footer-${link.label.toLowerCase()}`}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <h3 className="font-semibold text-card-foreground">Connect</h3>
            <div className="flex flex-col space-y-3">
              {socialLinks.map((social) => {
                const IconComponent = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors group w-fit"
                    data-testid={`link-social-${social.label.toLowerCase()}`}
                  >
                    <IconComponent className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span className="text-sm">{social.label}</span>
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>© {currentYear} Dev Portfolio. Made with</span>
            <Heart className="w-4 h-4 text-primary fill-current animate-pulse" />
            <span>and lots of</span>
            <Coffee className="w-4 h-4 text-primary" />
          </div>

          <div className="flex items-center gap-4">
            <Badge variant="outline" className="hover-elevate">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
              Available for hire
            </Badge>
            
            <Button
              variant="outline"
              size="sm"
              onClick={scrollToTop}
              className="group"
              data-testid="button-scroll-to-top"
            >
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
              <span className="sr-only">Scroll to top</span>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  )
}