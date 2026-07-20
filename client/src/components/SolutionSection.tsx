import { BarChart3, CalendarCheck2, FileCheck2, MapPinned, MessageSquareText, Smartphone } from 'lucide-react'
import { trackEvent } from '@/lib/analytics'

const features = [
  [MessageSquareText, 'Clear messaging', 'A focused offer that helps the right customer quickly understand why they should call.'],
  [Smartphone, 'Mobile-first usability', 'Fast, readable pages with calls and quote requests always within reach.'],
  [FileCheck2, 'Better forms', 'Low-friction quote and contact forms designed around the information you actually need.'],
  [CalendarCheck2, 'Calls and bookings', 'Simple paths for customers who are ready to call, schedule, or request an estimate.'],
  [MapPinned, 'Local SEO foundations', 'Strong page structure, service-area signals, metadata, and crawlable content.'],
  [BarChart3, 'Useful analytics', 'See which pages and actions contribute to real inquiries—not just traffic.'],
] as const

export default function SolutionSection() {
  return (
    <section id="websites" className="solution-section section" aria-labelledby="solution-heading">
      <div className="site-container website-grid">
        <div className="section-heading website-intro">
          <p className="section-label">The core offer</p>
          <h2 id="solution-heading">High-converting websites built to turn attention into action.</h2>
          <p>Your website should make it easy to trust you, understand the service, and take the next step. That is the foundation everything else builds on.</p>
          <a className="text-link" href="#audit" onClick={() => trackEvent('website_audit_cta_clicked', { placement: 'websites' })}>Show me what my website is missing</a>
        </div>
        <div className="website-feature-grid">
          {features.map(([Icon, title, text]) => <article key={title}><Icon aria-hidden="true" /><h3>{title}</h3><p>{text}</p></article>)}
        </div>
      </div>
    </section>
  )
}
