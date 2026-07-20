import {
  ArrowDown,
  ArrowRight,
  CalendarCheck,
  MailCheck,
  MessageSquareText,
  PhoneMissed,
  Star,
} from 'lucide-react'
import { trackEvent } from '@/lib/analytics'

const stages = [
  { icon: PhoneMissed, label: 'Lead comes in', detail: 'Missed call or form' },
  { icon: MessageSquareText, label: 'Immediate response', detail: 'Helpful confirmation' },
  { icon: MailCheck, label: 'Follow-up', detail: 'Text and email' },
  { icon: CalendarCheck, label: 'Booking or estimate', detail: 'Clear next step' },
  { icon: Star, label: 'Review request', detail: 'After the job' },
]

export default function HeroSection() {
  return (
    <section className="hero-section">
      <div className="site-container hero-grid">
        <div className="hero-copy">
          <h1>Stop Losing Good Leads to Slow Follow-Up</h1>
          <p>
            I build conversion-focused websites and automated follow-up systems for local service
            businesses. When someone calls, submits a form, or requests an estimate, your business
            responds quickly and keeps following up until the opportunity is won or closed.
          </p>
          <div className="button-row">
            <a
              className="button button-primary"
              href="#audit"
              onClick={() => trackEvent('hero_cta_clicked', { placement: 'hero' })}
            >
              Get a Free Lead-Loss Audit
              <ArrowRight aria-hidden="true" />
            </a>
            <a className="button button-secondary" href="#how-it-works">
              See How It Works
              <ArrowDown aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="workflow-demo" aria-label="Demonstration of a lead recovery workflow">
          <div className="demo-heading">
            <strong>Lead recovery workflow</strong>
            <span>Demonstration only</span>
          </div>
          <ol className="workflow-list">
            {stages.map((stage, index) => {
              const Icon = stage.icon
              return (
                <li key={stage.label}>
                  <div className="workflow-number">{index + 1}</div>
                  <div className="workflow-icon"><Icon aria-hidden="true" /></div>
                  <div>
                    <strong>{stage.label}</strong>
                    <span>{stage.detail}</span>
                  </div>
                  {index < stages.length - 1 && <ArrowRight className="workflow-arrow" aria-hidden="true" />}
                </li>
              )
            })}
          </ol>
          <div className="message-preview">
            <span>Example immediate response</span>
            <p>Hi, thanks for reaching out. I received your request and will be in touch shortly.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
