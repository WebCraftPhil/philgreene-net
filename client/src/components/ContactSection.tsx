import { CheckCircle2, Mail } from 'lucide-react'
import { trackEvent } from '@/lib/analytics'

export default function ContactSection() {
  return (
    <section id="audit" className="audit-section section" aria-labelledby="audit-heading">
      <div className="site-container audit-grid">
        <div className="audit-copy">
          <p className="section-label">Free website audit</p>
          <h2 id="audit-heading">Find the clearest path to more calls and booked work.</h2>
          <p>
            I will review your website, messaging, mobile experience, lead capture, and follow-up
            process—then show you the most useful improvements to make first.
          </p>
          <ul>
            <li><CheckCircle2 aria-hidden="true" />A practical review of your website and customer journey</li>
            <li><CheckCircle2 aria-hidden="true" />Clear priorities, without a high-pressure sales call</li>
            <li><CheckCircle2 aria-hidden="true" />A direct recommendation on what to fix first</li>
          </ul>
          <div className="direct-contact">
            <Mail aria-hidden="true" />
            <div>
              <span>Prefer email?</span>
              <a href="mailto:me@philgreene.net" onClick={() => trackEvent('email_link_clicked', { placement: 'audit' })}>
                me@philgreene.net
              </a>
            </div>
          </div>
        </div>

        <div className="audit-form-wrap">
          <div className="success-state">
            <Mail aria-hidden="true" />
            <h3>Let’s talk by email.</h3>
            <p>Send a note with your website and what you’d like to improve, and I’ll follow up directly.</p>
            <a className="button button-primary" href="mailto:me@philgreene.net">Email me</a>
          </div>
        </div>
      </div>
    </section>
  )
}
