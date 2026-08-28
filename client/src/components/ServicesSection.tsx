import { CalendarDays, FileText, MessageSquareReply, MessagesSquare, PhoneIncoming, UsersRound } from 'lucide-react'
import { useTrackedSection } from '@/hooks/use-tracked-section'

const services = [
  [FileText, 'Instant quote forms', 'Ask the right questions without making the customer work too hard.'],
  [MessagesSquare, 'Guided or live chat', 'Help visitors find answers and take a clear next step.'],
  [PhoneIncoming, 'Missed-call text-back', 'Acknowledge callers quickly when you cannot answer.'],
  [UsersRound, 'Simple CRM', 'Keep inquiries, notes, status, and next actions in one place.'],
  [CalendarDays, 'Appointment booking', 'Let ready customers choose an available time.'],
  [MessageSquareReply, 'Follow-up sequences', 'Use timely SMS and email reminders for inquiries and estimates.'],
] as const

export default function ServicesSection() {
  const sectionRef = useTrackedSection('services_viewed')
  return (
    <section ref={sectionRef} id="automation" className="services-section section" aria-labelledby="services-heading">
      <div className="site-container services-grid">
        <div className="section-heading services-intro"><p className="section-label">The differentiator</p><h2 id="services-heading">Lead capture and automation that supports the website.</h2><p>Once the foundation is right, I connect the practical pieces that help a busy owner respond faster and keep good opportunities moving.</p><a className="text-link" href="#packages">Compare the three starting points</a></div>
        <div className="service-list">{services.map(([Icon, title, text]) => <article key={title}><Icon aria-hidden="true" /><div><h3>{title}</h3><p>{text}</p></div></article>)}</div>
      </div>
    </section>
  )
}
