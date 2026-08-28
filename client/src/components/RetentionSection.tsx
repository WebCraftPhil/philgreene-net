import { MailCheck, MessageSquareHeart, RefreshCw, Star } from 'lucide-react'

const services = [
  [Star, 'Google review requests', 'Send a simple, timely request for an honest review after a successful job.'],
  [MessageSquareHeart, 'Review follow-up', 'Politely remind happy customers who meant to respond but got busy.'],
  [RefreshCw, 'Reactivation campaigns', 'Reconnect with past customers when a useful seasonal or follow-up service makes sense.'],
  [MailCheck, 'Email and SMS marketing', 'Stay in touch with relevant updates, reminders, and offers—with consent and sensible frequency.'],
] as const

export default function RetentionSection() {
  return (
    <section className="retention-section section" aria-labelledby="retention-heading">
      <div className="site-container retention-grid">
        <div className="section-heading"><p className="section-label">Reviews &amp; retention</p><h2 id="retention-heading">Turn a good customer experience into trust and repeat business.</h2><p>The system asks real customers for honest feedback and helps you stay useful after the first job.</p></div>
        <div className="retention-list">{services.map(([Icon, title, text]) => <article key={title}><Icon aria-hidden="true" /><div><h3>{title}</h3><p>{text}</p></div></article>)}</div>
      </div>
    </section>
  )
}
