import { ArrowDown, ArrowRight, CheckCircle2 } from 'lucide-react'
import { trackEvent } from '@/lib/analytics'

export default function HeroSection() {
  return (
    <section className="hero-section">
      <div className="site-container hero-grid">
        <div className="hero-copy">
          <p className="hero-eyebrow">Websites &amp; Automation for Local Businesses</p>
          <h1>Better Websites.<br />More Calls.<br /><span>More Booked Jobs.</span></h1>
          <p>
            I build conversion-focused websites for owner-operated home-service businesses, then add
            lead capture, follow-up, AI reception, and reputation tools where they can genuinely help.
          </p>
          <div className="button-row">
            <a className="button button-primary" href="#audit" onClick={() => {
              trackEvent('hero_cta_clicked', { placement: 'hero' })
              trackEvent('website_audit_cta_clicked', { placement: 'hero' })
            }}>
              Get My Free Website Audit <ArrowRight aria-hidden="true" />
            </a>
            <a className="button button-secondary" href="#customer-loss">
              See Where Leads Get Lost <ArrowDown aria-hidden="true" />
            </a>
          </div>
          <ul className="hero-trust" aria-label="What the audit includes">
            <li><CheckCircle2 aria-hidden="true" />No-pressure review</li>
            <li><CheckCircle2 aria-hidden="true" />Clear priorities</li>
            <li><CheckCircle2 aria-hidden="true" />Built for local businesses</li>
          </ul>
        </div>

        <div className="hero-art" aria-hidden="true">
          <div className="hero-glow" />
          <img src="/pg-landscape-transparent.png" width="1200" height="630" alt="" />
          <div className="hero-art-note"><strong>Website first.</strong><span>Automation where it earns its keep.</span></div>
        </div>
      </div>
    </section>
  )
}
