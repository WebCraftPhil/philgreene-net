import { ArrowRight, CalendarCheck2, Megaphone, MessageCircleReply, MousePointerClick, Repeat2, Star } from 'lucide-react'
import { useTrackedSection } from '@/hooks/use-tracked-section'

const steps = [
  [Megaphone, 'Attract', 'The right local customer finds a clear, credible offer.'],
  [MousePointerClick, 'Capture', 'A call, quote form, chat, or booking turns interest into a real lead.'],
  [MessageCircleReply, 'Respond', 'The customer gets a fast acknowledgement and a useful next step.'],
  [Repeat2, 'Follow up', 'Helpful reminders keep inquiries and estimates from disappearing.'],
  [CalendarCheck2, 'Book', 'A qualified customer schedules a call, estimate, or service.'],
  [Star, 'Request a review', 'A completed job triggers a timely request for honest feedback.'],
] as const

export default function ProcessSection() {
  const sectionRef = useTrackedSection('workflow_viewed')
  return (
    <section ref={sectionRef} id="how-it-works" className="process-section section" aria-labelledby="process-heading">
      <div className="site-container">
        <div className="section-heading section-heading-wide process-heading"><p className="section-label">How I recover lost leads</p><h2 id="process-heading">One connected journey from first click to finished job.</h2><p>The technology stays behind the scenes. What the customer experiences is a business that is clear, responsive, and easy to work with.</p></div>
        <ol className="journey-rail">
          {steps.map(([Icon, title, text], index) => <li key={title}><span>{index + 1}</span><Icon aria-hidden="true" /><h3>{title}</h3><p>{text}</p>{index < steps.length - 1 && <ArrowRight className="journey-arrow" aria-hidden="true" />}</li>)}
        </ol>
      </div>
    </section>
  )
}
