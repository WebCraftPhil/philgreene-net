import { ArrowRight, Check } from 'lucide-react'
import { trackEvent } from '@/lib/analytics'

const included = [
  'One landing page or existing-site integration',
  'One lead form',
  'Missed-call text-back',
  'Basic CRM pipeline',
  'Short SMS and email follow-up sequence',
  'Tracking and results review',
]

export default function PilotSection() {
  return (
    <section className="pilot-section section" aria-labelledby="pilot-heading">
      <div className="site-container pilot-grid">
        <div>
          <p className="section-label">Limited pilot availability</p>
          <h2 id="pilot-heading">14-Day Lead Recovery Pilot</h2>
          <p>
            I will install a focused lead-capture and follow-up system for your business with no setup
            fee. At the end of the pilot, we will review what happened and decide whether continuing
            makes sense.
          </p>
          <a
            className="button button-primary"
            href="#audit"
            onClick={() => trackEvent('pilot_cta_clicked')}
          >
            Apply for a Pilot
            <ArrowRight aria-hidden="true" />
          </a>
        </div>
        <div className="pilot-scope">
          <h3>A focused, clearly bounded setup</h3>
          <ul>
            {included.map((item) => (
              <li key={item}><Check aria-hidden="true" /><span>{item}</span></li>
            ))}
          </ul>
          <p>The pilot does not include a full custom website or unlimited implementation work.</p>
        </div>
      </div>
    </section>
  )
}

