import {
  BarChart3,
  CalendarDays,
  FileText,
  MessageSquareReply,
  PanelsTopLeft,
  Settings2,
  Star,
  UsersRound,
} from 'lucide-react'
import { useTrackedSection } from '@/hooks/use-tracked-section'

const services = [
  { icon: PanelsTopLeft, title: 'Website and Landing Page Design', text: 'Clear pages built around calls, estimates, and appointments.' },
  { icon: MessageSquareReply, title: 'Missed-Call Text-Back', text: 'A fast, useful response when you cannot answer the phone.' },
  { icon: UsersRound, title: 'Lead Capture and CRM', text: 'Every inquiry organized in one simple pipeline.' },
  { icon: FileText, title: 'Estimate Follow-Up', text: 'Natural reminders that keep open quotes from disappearing.' },
  { icon: CalendarDays, title: 'Appointment Booking', text: 'An easy next step for leads who are ready to schedule.' },
  { icon: Star, title: 'Review Automation', text: 'Timely requests that make it easier for happy customers to respond.' },
  { icon: BarChart3, title: 'Lead Reporting', text: 'A plain-language view of sources, status, and outcomes.' },
  { icon: Settings2, title: 'Ongoing System Management', text: 'Monitoring, updates, and practical improvements after launch.' },
]

export default function ServicesSection() {
  const sectionRef = useTrackedSection('services_viewed')

  return (
    <section ref={sectionRef} id="services" className="services-section section" aria-labelledby="services-heading">
      <div className="site-container services-grid">
        <div className="section-heading services-intro">
          <h2 id="services-heading">Services that support the whole lead journey</h2>
          <p>
            I use the tools that fit the job. GoHighLevel can power the CRM, automation, booking,
            and reporting, but the software is only useful when the customer journey works.
          </p>
          <a className="text-link" href="#audit">Tell me where leads get stuck</a>
        </div>
        <div className="service-list">
          {services.map(({ icon: Icon, title, text }) => (
            <article key={title}>
              <Icon aria-hidden="true" />
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
